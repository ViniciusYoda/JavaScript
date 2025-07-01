// -----

// ## WeakRef e FinalizationRegistry

// **Recursos "ocultos" da linguagem**

// Este artigo aborda um tópico muito específico, que a maioria dos desenvolvedores raramente encontra na prática (e pode até não ter conhecimento de sua existência).
// Recomendamos pular este capítulo se você acabou de começar a aprender JavaScript.

// Relembrando o conceito básico do [princípio de acessibilidade do capítulo Coleta de Lixo](https://www.google.com/search?q=https://javascript.info/garbage-collection%23reachability), podemos notar que o *engine* JavaScript tem garantia de manter em memória valores que são acessíveis ou estão em uso.

// Por exemplo:

// ```javascript
// // a variável user mantém uma referência forte para o objeto
// let user = { name: "João" };

// // vamos sobrescrever o valor da variável user
// user = null; // a referência é perdida e o objeto será excluído da memória
// ```

// Ou um código semelhante, mas ligeiramente mais complicado, com duas referências fortes:

// ```javascript
// // a variável user mantém uma referência forte para o objeto
// let user = { name: "João" };

// // copiamos a referência forte para o objeto na variável admin
// let admin = user;

// // vamos sobrescrever o valor da variável user
// user = null; // o objeto ainda é acessível através da variável admin
// ```

// O objeto `{ name: "João" }` seria excluído da memória apenas se não houvesse referências fortes a ele (se também sobrescrevêssemos o valor da variável `admin`).

// Em JavaScript, existe um conceito chamado **`WeakRef`**, que se comporta de forma ligeiramente diferente neste caso.

// -----

// #### Termos: "Referência Forte", "Referência Fraca"

// **Referência Forte** – é uma referência a um objeto ou valor, que os impede de serem excluídos pelo *garbage collector*. Desse modo, mantém o objeto ou valor na memória, para o qual aponta.

// Isso significa que o objeto ou valor permanece na memória e não é coletado pelo *garbage collector* enquanto houver referências fortes ativas para ele.
// Em JavaScript, referências comuns a objetos são referências fortes. Por exemplo:

// ```javascript
// // a variável user mantém uma referência forte para este objeto
// let user = { name: "João" };
// ```

// **Referência Fraca** – é uma referência a um objeto ou valor, que não os impede de serem excluídos pelo *garbage collector*.
// Um objeto ou valor pode ser excluído pelo *garbage collector* se as únicas referências restantes para eles forem referências fracas.

// -----

// ### WeakRef

// **Nota de cautela**

// Antes de mergulharmos nisso, vale a pena notar que o uso correto das estruturas discutidas neste artigo exige um pensamento muito cuidadoso, e é melhor evitá-las, se possível.

// **`WeakRef`** – é um objeto que contém uma referência fraca a outro objeto, chamado *target* ou *referent*.
// A peculiaridade de `WeakRef` é que ele não impede o *garbage collector* de excluir seu objeto-referente. Em outras palavras, um objeto `WeakRef` não mantém o objeto referente vivo.

// Agora vamos pegar a variável `user` como o "referente" e criar uma referência fraca dela para a variável `admin`.
// Para criar uma referência fraca, você precisa usar o construtor `WeakRef`, passando o objeto *target* (o objeto para o qual você deseja uma referência fraca).
// No nosso caso, esta é a variável `user`:

// ```javascript
// // a variável user mantém uma referência forte para o objeto
// let user = { name: "João" };

// // a variável admin mantém uma referência fraca para o objeto
// let admin = new WeakRef(user);
// ```

// O diagrama abaixo mostra dois tipos de referências: uma referência forte usando a variável `user` e uma referência fraca usando a variável `admin`:

// Então, em algum momento, paramos de usar a variável `user` – ela é sobrescrita, sai do escopo, etc., enquanto mantemos a instância `WeakRef` na variável `admin`:

// ```javascript
// // vamos sobrescrever o valor da variável user
// user = null;
// ```

// Uma referência fraca a um objeto não é suficiente para mantê-lo "vivo". Quando as únicas referências restantes a um objeto-referente são referências fracas, o *garbage collector* está livre para destruir este objeto e usar sua memória para outra coisa.

// No entanto, até que o objeto seja realmente destruído, a referência fraca pode retorná-lo, mesmo que não haja mais referências fortes para este objeto.
// Ou seja, nosso objeto se torna uma espécie de "gato de Schrödinger" – não podemos saber ao certo se está "vivo" ou "morto":

// Neste ponto, para obter o objeto da instância `WeakRef`, usaremos seu método `deref()`.
// O método `deref()` retorna o objeto-referente para o qual o `WeakRef` aponta, se o objeto ainda estiver na memória. Se o objeto foi excluído pelo *garbage collector*, então o método `deref()` retornará `undefined`:

// ```javascript
// let ref = admin.deref();
// if (ref) {
//   // o objeto ainda está acessível: podemos realizar qualquer manipulação com ele
// } else {
//   // o objeto foi coletado pelo garbage collector
// }
// ```

// -----

// ### Casos de uso de WeakRef

// `WeakRef` é tipicamente usado para criar **caches** ou **arrays associativos** que armazenam objetos que consomem muitos recursos.
// Isso permite evitar que esses objetos sejam coletados pelo *garbage collector* unicamente com base em sua presença no cache ou array associativo.

// Um dos principais exemplos – é uma situação em que temos vários objetos de imagem binários (por exemplo, representados como `ArrayBuffer` ou `Blob`), e queremos associar um nome ou caminho a cada imagem.
// Estruturas de dados existentes não são totalmente adequadas para esses fins:

//   * Usar `Map` para criar associações entre nomes e imagens, ou vice-versa, manterá os objetos de imagem na memória, já que eles estão presentes no `Map` como chaves ou valores.
//   * `WeakMap` também não é elegível para este objetivo: porque os objetos representados como chaves `WeakMap` usam referências fracas e não são protegidos da exclusão pelo *garbage collector*.

// Mas, nesta situação, precisamos de uma estrutura de dados que use referências fracas em seus valores.
// Para este propósito, podemos usar uma coleção `Map`, cujos valores são instâncias `WeakRef` referindo-se aos grandes objetos que precisamos.

// Consequentemente, não manteremos esses objetos grandes e desnecessários na memória por mais tempo do que deveriam.
// Caso contrário, esta é uma maneira de obter o objeto da imagem do cache se ele ainda for acessível.
// Se ele foi coletado pelo *garbage collector*, o regeneraremos ou faremos o *download* novamente.
// Dessa forma, menos memória é usada em algumas situações.

// -----

// #### Exemplo №1: Usando WeakRef para *caching*

// Abaixo está um trecho de código que demonstra a técnica de uso de `WeakRef`.
// Em resumo, usamos um `Map` com chaves de *string* e objetos `WeakRef` como seus valores.
// Se o objeto `WeakRef` não foi coletado pelo *garbage collector*, nós o obtemos do cache.
// Caso contrário, o baixamos novamente e o colocamos no cache para possível reutilização futura:

// ```javascript
// function fetchImg() {
//     // função abstrata para baixar imagens...
//     console.log("FETCHED_IMAGE"); // Apenas para demonstração
//     return { data: "imagem_baixada" + Math.random() }; // Simula o objeto da imagem
// }

// function weakRefCache(fetchImg) { // (1)
//     const imgCache = new Map(); // (2)

//     return (imgName) => { // (3)
//         const cachedImg = imgCache.get(imgName); // (4)

//         if (cachedImg?.deref()) { // (5)
//             console.log("CACHED_IMAGE"); // Apenas para demonstração
//             return cachedImg?.deref();
//         }

//         const newImg = fetchImg(imgName); // (6)
//         imgCache.set(imgName, new WeakRef(newImg)); // (7)

//         return newImg;
//     };
// }

// const getCachedImg = weakRefCache(fetchImg);

// // Exemplo de uso (adicionei para demonstrar)
// let img1 = getCachedImg("foto1.jpg");
// let img2 = getCachedImg("foto2.jpg");
// console.log("Primeira vez:", img1, img2);

// // Forçar coleta de lixo (apenas para teste em ambientes específicos)
// // global.gc();

// // Tentar obter novamente
// let img1_again = getCachedImg("foto1.jpg");
// console.log("Segunda vez (pode ser cached ou fetched):", img1_again);

// // Definir as imagens para null para liberar referências fortes
// img1 = null;
// img2 = null;
// img1_again = null;

// // Tentar obter novamente após liberar referências fortes e potencial GC
// // global.gc(); // Pode precisar ser invocado manualmente em alguns ambientes para simular o GC
// let img1_final = getCachedImg("foto1.jpg");
// console.log("Terceira vez (provavelmente fetched):", img1_final);
// ```

// Vamos nos aprofundar nos detalhes do que aconteceu aqui:

// 1.  `weakRefCache` – é uma função de ordem superior que recebe outra função, `fetchImg`, como argumento. Neste exemplo, podemos negligenciar uma descrição detalhada da função `fetchImg`, já que pode ser qualquer lógica para baixar imagens.
// 2.  `imgCache` – é um cache de imagens, que armazena resultados em cache da função `fetchImg`, na forma de chaves de *string* (nome da imagem) e objetos `WeakRef` como seus valores.
// 3.  Retorna uma função anônima que recebe o nome da imagem como argumento. Este argumento será usado como uma chave para a imagem em cache.
// 4.  Tenta obter o resultado em cache do cache, usando a chave fornecida (nome da imagem).
// 5.  Se o cache contiver um valor para a chave especificada e o objeto `WeakRef` não tiver sido excluído pelo *garbage collector*, retorna o resultado em cache.
// 6.  Se não houver uma entrada no cache com a chave solicitada, ou o método `deref()` retornar `undefined` (significando que o objeto `WeakRef` foi coletado pelo *garbage collector*), a função `fetchImg` baixa a imagem novamente.
// 7.  Coloca a imagem baixada no cache como um objeto `WeakRef`.

// Agora temos uma coleção `Map`, onde as chaves são nomes de imagens como *strings*, e os valores são objetos `WeakRef` contendo as próprias imagens.
// Essa técnica ajuda a evitar a alocação de uma grande quantidade de memória para objetos que consomem muitos recursos e que ninguém mais usa.
// Também economiza memória e tempo em caso de reutilização de objetos em cache.

// Aqui está uma representação visual de como este código se parece:

// Mas, esta implementação tem suas desvantagens: com o tempo, o `Map` será preenchido com *strings* como chaves, que apontam para um `WeakRef`, cujo objeto-referente já foi coletado pelo *garbage collector*:

// Uma maneira de lidar com este problema – é limpar periodicamente o cache e remover as entradas "mortas".
// Outra maneira – é usar *finalizers*, que exploraremos a seguir.

// -----

// #### Exemplo №2: Usando WeakRef para rastrear objetos DOM

// Outro caso de uso para `WeakRef` – é o rastreamento de objetos DOM.
// Vamos imaginar um cenário onde algum código ou biblioteca de terceiros interage com elementos em nossa página enquanto eles existirem no DOM.
// Por exemplo, poderia ser um utilitário externo para monitorar e notificar sobre o estado do sistema (comumente chamado de "logger" – um programa que envia mensagens informativas chamadas "logs").

// **Exemplo Interativo:**
// *(O texto original inclui um exemplo interativo com botões "Start sending messages" e "Close", e abas para index.js, index.css, index.html. Como não posso renderizar UI, vou descrever a lógica e o comportamento)*

// Quando o botão "Start sending messages" é clicado, na chamada "janela de exibição de logs" (um elemento com a classe `.window__body`), as mensagens (logs) começam a aparecer.
// Mas, assim que este elemento é excluído do DOM, o *logger* deve parar de enviar mensagens.
// Para reproduzir a remoção deste elemento, basta clicar no botão "Close" no canto superior direito.

// Para não complicar nosso trabalho, e não notificar o código de terceiros toda vez que nosso elemento DOM estiver disponível, e quando não estiver, será suficiente criar uma referência fraca para ele usando `WeakRef`.
// Uma vez que o elemento é removido do DOM, o *logger* notará e parará de enviar mensagens.

// Agora vamos dar uma olhada mais de perto no código-fonte (aba `index.js` no exemplo interativo):

// 1.  Obtém o elemento DOM do botão "Start sending messages".
// 2.  Obtém o elemento DOM do botão "Close".
// 3.  Obtém o elemento DOM da janela de exibição de logs usando o construtor `new WeakRef()`. Dessa forma, a variável `windowElementRef` mantém uma referência fraca ao elemento DOM.
// 4.  Adiciona um *event listener* no botão "Start sending messages", responsável por iniciar o *logger* quando clicado.
// 5.  Adiciona um *event listener* no botão "Close", responsável por fechar a janela de exibição de logs quando clicado.
// 6.  Usa `setInterval` para começar a exibir uma nova mensagem a cada segundo.
// 7.  Se o elemento DOM da janela de exibição de logs ainda estiver acessível e mantido na memória, cria e envia uma nova mensagem.
// 8.  Se o método `deref()` retornar `undefined`, significa que o elemento DOM foi excluído da memória. Neste caso, o *logger* para de exibir mensagens e limpa o *timer*.
// 9.  Um `alert`, que será chamado depois que o elemento DOM da janela de exibição de logs for excluído da memória (ou seja, depois de clicar no botão "Close"). Observe que a exclusão da memória pode não acontecer imediatamente, pois depende apenas dos mecanismos internos do *garbage collector*.

// Não podemos controlar este processo diretamente do código. No entanto, apesar disso, ainda temos a opção de forçar a coleta de lixo a partir do navegador.
// No Google Chrome, por exemplo, para fazer isso, você precisa abrir as ferramentas do desenvolvedor (Ctrl + Shift + J no Windows/Linux ou Option + ⌘ + J no macOS), ir para a aba "Desempenho" e clicar no botão do ícone da lixeira – "Coletar lixo".

// *(Imagem do Google Chrome Developer Tools corrompida no texto original)*

// Esta funcionalidade é suportada na maioria dos navegadores modernos. Após as ações serem tomadas, o `alert` será acionado imediatamente.

// -----

// ### FinalizationRegistry

// Agora é hora de falar sobre *finalizers*. Antes de prosseguir, vamos esclarecer a terminologia:

//   * **`Cleanup callback` (finalizer)** – é uma função que é executada quando um objeto, registrado no `FinalizationRegistry`, é excluído da memória pelo *garbage collector*.
//     Seu propósito – é fornecer a capacidade de realizar operações adicionais, relacionadas ao objeto, depois que ele foi finalmente excluído da memória.
//   * **`Registry` (ou `FinalizationRegistry`)** – é um objeto especial em JavaScript que gerencia o registro e o cancelamento de registro de objetos e seus *cleanup callbacks*.
//     Este mecanismo permite registrar um objeto para rastrear e associar um *cleanup callback* a ele.
//     Essencialmente, é uma estrutura que armazena informações sobre objetos registrados e seus *cleanup callbacks*, e então invoca automaticamente esses *callbacks* quando os objetos são excluídos da memória.

// Para criar uma instância de `FinalizationRegistry`, é necessário chamar seu construtor, que recebe um único argumento – o *cleanup callback* (finalizer).

// **Sintaxe:**

// ```javascript
// function cleanupCallback(heldValue) {
//   // código do cleanup callback
// }
// const registry = new FinalizationRegistry(cleanupCallback);
// ```

// Aqui:

//   * `cleanupCallback` – um *cleanup callback* que será automaticamente chamado quando um objeto registrado for excluído da memória.
//   * `heldValue` – o valor que é passado como argumento para o *cleanup callback*. Se `heldValue` for um objeto, o registro mantém uma referência forte a ele.
//   * `registry` – uma instância de `FinalizationRegistry`.

// **Métodos de FinalizationRegistry:**

//   * `register(target, heldValue [, unregisterToken])` – usado para registrar objetos no registro.
//       * `target` – o objeto sendo registrado para rastreamento. Se o *target* for coletado pelo *garbage collector*, o *cleanup callback* será chamado com `heldValue` como seu argumento.
//       * `unregisterToken` (opcional) – um token de cancelamento de registro. Ele pode ser passado para cancelar o registro de um objeto antes que o *garbage collector* o exclua. Tipicamente, o objeto *target* é usado como `unregisterToken`, o que é a prática padrão.
//   * `unregister(unregisterToken)` – o método `unregister` é usado para cancelar o registro de um objeto. Ele recebe um argumento – `unregisterToken` (o token de cancelamento de registro que foi obtido ao registrar o objeto).

// Agora vamos a um exemplo simples. Vamos usar o já conhecido objeto `user` e criar uma instância de `FinalizationRegistry`:

// ```javascript
// let user = { name: "João" };
// const registry = new FinalizationRegistry((heldValue) => {
//   console.log(`${heldValue} foi coletado pelo garbage collector.`);
// });
// ```

// Então, vamos registrar o objeto que requer um *cleanup callback* chamando o método `register`:

// ```javascript
// registry.register(user, user.name);
// ```

// O registro não mantém uma referência forte ao objeto sendo registrado, pois isso anularia seu propósito. Se o registro mantivesse uma referência forte, o objeto nunca seria coletado pelo *garbage collector*.

// Se o objeto for excluído pelo *garbage collector*, nosso *cleanup callback* pode ser chamado em algum momento no futuro, com o `heldValue` passado para ele:

// ```javascript
// // Quando o objeto user for excluído pelo garbage collector, a seguinte mensagem será impressa no console:
// "João foi coletado pelo garbage collector."
// ```

// Existem também situações em que, mesmo em implementações que usam um *cleanup callback*, há uma chance de que ele não seja chamado.
// Por exemplo:

//   * Quando o programa encerra totalmente sua operação (por exemplo, ao fechar uma aba em um navegador).
//   * Quando a própria instância `FinalizationRegistry` não é mais acessível ao código JavaScript.
//   * Se o objeto que cria a instância `FinalizationRegistry` sair do escopo ou for excluído, os *cleanup callbacks* registrados nesse registro também podem não ser invocados.

// -----

// ### Caching com FinalizationRegistry

// Voltando ao nosso exemplo de cache fraco, podemos notar o seguinte:

//   * Mesmo que os valores envolvidos em `WeakRef` tenham sido coletados pelo *garbage collector*, ainda há um problema de "vazamento de memória" na forma das chaves restantes, cujos valores foram coletados pelo *garbage collector*.

// Aqui está um exemplo de *caching* aprimorado usando `FinalizationRegistry`:

// ```javascript
// function fetchImg() {
//   // função abstrata para baixar imagens...
//   console.log("FETCHED_IMAGE"); // Apenas para demonstração
//   return { data: "imagem_baixada_" + Math.random() }; // Simula o objeto da imagem
// }

// function weakRefCache(fetchImg) {
//   const imgCache = new Map();
//   const registry = new FinalizationRegistry((imgName) => { // (1)
//     const cachedImg = imgCache.get(imgName);
//     if (cachedImg && !cachedImg.deref()) {
//       imgCache.delete(imgName);
//       console.log(`CLEANED_IMAGE: ${imgName} removido do cache.`); // Apenas para demonstração
//     }
//   });

//   return (imgName) => {
//     const cachedImg = imgCache.get(imgName);

//     if (cachedImg?.deref()) {
//       console.log(`CACHED_IMAGE: ${imgName} obtido do cache.`); // Apenas para demonstração
//       return cachedImg?.deref();
//     }

//     const newImg = fetchImg(imgName);
//     imgCache.set(imgName, new WeakRef(newImg));
//     registry.register(newImg, imgName); // (2)

//     return newImg;
//   };
// }

// const getCachedImg = weakRefCache(fetchImg);

// // Exemplo de uso (adicionei para demonstrar o comportamento)
// console.log("\n--- Primeira rodada ---");
// let imgA = getCachedImg("imgA.jpg");
// let imgB = getCachedImg("imgB.jpg");
// let imgC = getCachedImg("imgC.jpg");

// // Simula a remoção de referências fortes e o GC agindo (necessita de GC manual em alguns ambientes)
// imgA = null;
// imgB = null;
// // global.gc(); // Descomentar em ambientes que suportam forçar GC

// console.log("\n--- Segunda rodada ---");
// let imgA2 = getCachedImg("imgA.jpg"); // Pode ser fetched ou cached
// let imgC2 = getCachedImg("imgC.jpg"); // Pode ser fetched ou cached
// let imgD = getCachedImg("imgD.jpg");

// // global.gc(); // Descomentar

// console.log("\n--- Terceira rodada ---");
// let imgA3 = getCachedImg("imgA.jpg");
// let imgC3 = getCachedImg("imgC.jpg");
// let imgD2 = getCachedImg("imgD.jpg");
// let imgE = getCachedImg("imgE.jpg");
// ```

// Para gerenciar a limpeza de entradas de cache "mortas", quando os objetos `WeakRef` associados são coletados pelo *garbage collector*, criamos um registro de limpeza `FinalizationRegistry`.

// O ponto importante aqui é que, no *cleanup callback*, deve ser verificado se a entrada foi excluída pelo *garbage collector* e não readicionada, para não excluir uma entrada "viva".

// Uma vez que o novo valor (imagem) é baixado e colocado no cache, nós o registramos no registro do *finalizer* para rastrear o objeto `WeakRef`.
// Esta implementação contém apenas pares chave/valor reais ou "vivos".
// Neste caso, cada objeto `WeakRef` é registrado no `FinalizationRegistry`.
// E depois que os objetos são limpos pelo *garbage collector*, o *cleanup callback* excluirá todos os valores `undefined`.

// Aqui está uma representação visual do código atualizado:

// Um aspecto chave da implementação atualizada é que os *finalizers* permitem que processos paralelos sejam criados entre o programa "principal" e os *cleanup callbacks*.
// No contexto do JavaScript, o programa "principal" – é o nosso código JavaScript, que é executado em nossa aplicação ou página web.

// Portanto, desde o momento em que um objeto é marcado para exclusão pelo *garbage collector* até a execução real do *cleanup callback*, pode haver um certo intervalo de tempo.
// É importante entender que, durante esse intervalo de tempo, o programa principal pode fazer quaisquer alterações no objeto ou até mesmo trazê-lo de volta à memória.
// É por isso que, no *cleanup callback*, devemos verificar se uma entrada foi adicionada de volta ao cache pelo programa principal para evitar a exclusão de entradas "vivas".
// Da mesma forma, ao procurar uma chave no cache, há uma chance de que o valor tenha sido excluído pelo *garbage collector*, mas o *cleanup callback* ainda não foi executado.
// Tais situações exigem atenção especial se você estiver trabalhando com `FinalizationRegistry`.

// -----

// ### Usando WeakRef e FinalizationRegistry na prática

// Passando da teoria para a prática, imagine um cenário da vida real, onde um usuário sincroniza suas fotos em um dispositivo móvel com algum serviço de nuvem (como iCloud ou Google Fotos),
// e deseja visualizá-las de outros dispositivos. Além da funcionalidade básica de visualização de fotos, esses serviços oferecem muitos recursos adicionais, por exemplo:

//   * Edição de fotos e efeitos de vídeo.
//   * Criação de "memórias" e álbuns.
//   * Montagem de vídeo a partir de uma série de fotos.
//   * …e muito mais.

// Aqui, como exemplo, usaremos uma implementação bastante primitiva de tal serviço.
// O ponto principal – é mostrar um cenário possível de uso de `WeakRef` e `FinalizationRegistry` juntos na vida real.
// É assim que se parece:

// *(A imagem "weakref-finalizationregistry-demo-01.png" está corrompida no texto original. Descreverei o cenário)*

// À esquerda, há uma biblioteca de fotos na nuvem (elas são exibidas como miniaturas).
// Podemos selecionar as imagens que precisamos e criar uma colagem, clicando no botão "Criar colagem" no lado direito da página.
// Então, a colagem resultante pode ser baixada como uma imagem.

// Para aumentar a velocidade de carregamento da página, seria razoável baixar e exibir miniaturas de fotos em qualidade compactada.
// Mas, para criar uma colagem a partir das fotos selecionadas, baixar e usá-las em qualidade de tamanho completo.

// Abaixo, podemos ver que o tamanho intrínseco das miniaturas é de 240x240 pixels.
// O tamanho foi escolhido de propósito para aumentar a velocidade de carregamento.
// Além disso, não precisamos de fotos em tamanho completo no modo de visualização.

// *(A imagem "weakref-finalizationregistry-demo-02.png" está corrompida no texto original. Descreverei o cenário)*

// Vamos assumir que precisamos criar uma colagem de 4 fotos: nós as selecionamos e, em seguida, clicamos no botão "Criar colagem".
// Nesta etapa, a função `weakRefCache` (já conhecida por nós) verifica se a imagem necessária está no cache.
// Caso contrário, ela baixa da nuvem e a coloca no cache para uso posterior.
// Isso acontece para cada imagem selecionada:

// *(A imagem "weakref-finalizationregistry-demo-03.gif" está corrompida no texto original. Descreverei o cenário)*

// Prestando atenção à saída no console, você pode ver quais das fotos foram baixadas da nuvem – isso é indicado por **`FETCHED_IMAGE`**.
// Como esta é a primeira tentativa de criar uma colagem, isso significa que, nesta etapa, o "cache fraco" ainda estava vazio, e todas as fotos foram baixadas da nuvem e colocadas nele.

// Mas, juntamente com o processo de download de imagens, há também um processo de limpeza de memória pelo *garbage collector*.
// Isso significa que o objeto armazenado no cache, ao qual nos referimos usando uma referência fraca, é excluído pelo *garbage collector*.
// E nosso *finalizer* é executado com sucesso, excluindo assim a chave pela qual a imagem foi armazenada no cache. **`CLEANED_IMAGE`** nos notifica sobre isso:

// *(A imagem "weakref-finalizationregistry-demo-04.jpg" está corrompida no texto original. Descreverei o cenário)*

// Em seguida, percebemos que não gostamos da colagem resultante e decidimos mudar uma das imagens e criar uma nova.
// Para fazer isso, basta desmarcar a imagem desnecessária, selecionar outra e clicar no botão "Criar colagem" novamente:

// *(A imagem "weakref-finalizationregistry-demo-05.gif" está corrompida no texto original. Descreverei o cenário)*

// Mas desta vez nem todas as imagens foram baixadas da rede, e uma delas foi retirada do cache fraco: a mensagem **`CACHED_IMAGE`** nos informa sobre isso.
// Isso significa que, no momento da criação da colagem, o *garbage collector* ainda não havia excluído nossa imagem, e nós a pegamos do cache, reduzindo o número de solicitações de rede e acelerando o tempo total do processo de criação da colagem:

// *(A imagem "weakref-finalizationregistry-demo-06.jpg" está corrompida no texto original. Descreverei o cenário)*

// Vamos "brincar" um pouco mais, substituindo uma das imagens novamente e criando uma nova colagem:

// *(A imagem "weakref-finalizationregistry-demo-07.gif" está corrompida no texto original. Descreverei o cenário)*

// Desta vez, o resultado é ainda mais impressionante. Das 4 imagens selecionadas, 3 foram tiradas do cache fraco, e apenas uma teve que ser baixada da rede.
// A redução na carga da rede foi de cerca de 75%. Impressionante, não é?

// *(A imagem "weakref-finalizationregistry-demo-08.jpg" está corrompida no texto original. Descreverei o cenário)*

// Claro, é importante lembrar que tal comportamento não é garantido e depende da implementação e operação específicas do *garbage collector*.
// Com base nisso, surge imediatamente uma pergunta completamente lógica: por que não usamos um cache comum, onde podemos gerenciar suas entidades nós mesmos, em vez de depender do *garbage collector*?

// Isso mesmo, na grande maioria dos casos não há necessidade de usar `WeakRef` e `FinalizationRegistry`.
// Aqui, simplesmente demonstramos uma implementação alternativa de funcionalidade semelhante, usando uma abordagem não trivial com recursos interessantes da linguagem.
// Ainda assim, não podemos confiar neste exemplo se precisarmos de um resultado constante e previsível.

// Você pode abrir este exemplo na [sandbox](https://www.google.com/search?q=https://javascript.info/weakref-finalizationregistry%23using-weakref-and-finalizationregistry-in-practice).

// -----

// ### Resumo

//   * **`WeakRef`** – projetado para criar referências fracas a objetos, permitindo que eles sejam excluídos da memória pelo *garbage collector* se não houver mais referências fortes a eles.
//     Isso é benéfico para lidar com o uso excessivo de memória e otimizar a utilização de recursos do sistema em aplicativos.
//   * **`FinalizationRegistry`** – é uma ferramenta para registrar *callbacks* que são executados quando objetos que não são mais fortemente referenciados são destruídos.
//     Isso permite liberar recursos associados ao objeto ou realizar outras operações necessárias antes de excluir o objeto da memória.

// -----

// Considerando que o front-end exibe os dados de abastecimento utilizando React Query e um componente de tabela genérico, você consegue imaginar um cenário onde `WeakRef` ou `FinalizationRegistry` poderiam ser úteis para otimizar a exibição ou o gerenciamento de dados de grandes volumes de abastecimento?