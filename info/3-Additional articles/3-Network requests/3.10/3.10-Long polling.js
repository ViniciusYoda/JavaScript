// Claro! Aqui está a adaptação completa para o português do texto sobre **Long Polling**:

// ---

// ## Long Polling (Consulta Longa)

// Long polling é a forma mais simples de manter uma conexão persistente com o servidor, sem usar protocolos específicos como WebSocket ou Server-Sent Events.

// Por ser muito fácil de implementar, é suficiente para muitos casos.

// ---

// ### Polling Regular

// A forma mais simples de obter novas informações do servidor é o polling periódico. Ou seja, enviar requisições regulares para o servidor: “Olá, estou aqui, tem alguma informação para mim?”. Por exemplo, a cada 10 segundos.

// Na resposta, o servidor:

// 1. Registra que o cliente está online.
// 2. Envia os pacotes de mensagens que recebeu até aquele momento.

// Isso funciona, mas tem desvantagens:

// * As mensagens chegam com atraso de até 10 segundos (dependendo do intervalo entre as requisições).
// * Mesmo quando não há mensagens novas, o servidor recebe requisições a cada 10 segundos, mesmo que o usuário tenha saído da página ou esteja dormindo, o que gera uma carga desnecessária no servidor.

// Portanto, para serviços muito pequenos, essa abordagem pode funcionar, mas em geral, precisa ser melhorada.

// ---

// ### Long Polling

// O chamado “long polling” é uma forma muito melhor de fazer polling.

// Também é fácil de implementar e entrega mensagens **sem atrasos**.

// #### Fluxo do long polling:

// 1. O cliente envia uma requisição para o servidor.
// 2. O servidor **não fecha a conexão** até ter uma mensagem para enviar.
// 3. Quando uma mensagem surge, o servidor responde à requisição com essa mensagem.
// 4. O navegador imediatamente faz uma nova requisição.

// Nesta técnica, o navegador mantém uma requisição pendente com o servidor, que só é fechada quando uma mensagem é entregue — então, a conexão é reestabelecida para aguardar a próxima mensagem.

// Se a conexão for perdida (por exemplo, por erro de rede), o navegador envia uma nova requisição imediatamente.

// ---

// ### Exemplo de função `subscribe` no cliente usando long polling:

// ```js
// async function subscribe() {
//   let response = await fetch("/subscribe");

//   if (response.status == 502) {
//     // Erro 502 significa timeout na conexão,
//     // pode acontecer se a conexão ficou pendente tempo demais
//     // e o servidor ou proxy remoto fechou a conexão
//     // vamos reconectar
//     await subscribe();
//   } else if (response.status != 200) {
//     // Outro erro - mostramos a mensagem
//     showMessage(response.statusText);
//     // Reconectar após 1 segundo
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     await subscribe();
//   } else {
//     // Recebe e mostra a mensagem
//     let message = await response.text();
//     showMessage(message);
//     // Chama subscribe() novamente para receber a próxima mensagem
//     await subscribe();
//   }
// }

// subscribe();
// ```

// Como você pode ver, a função `subscribe` faz uma requisição `fetch`, espera a resposta, trata o resultado e chama ela mesma para continuar recebendo mensagens.

// ---

// ### O servidor precisa suportar muitas conexões pendentes

// A arquitetura do servidor deve suportar muitas conexões simultâneas abertas e pendentes.

// Algumas arquiteturas criam um processo por conexão, consumindo muita memória, e muitas conexões acabam esgotando os recursos do servidor. Isso é comum em backends escritos em PHP e Ruby.

// Servidores escritos em Node.js geralmente não têm esse problema, pois são baseados em eventos e não criam processos para cada conexão.

// Mas isso não é questão da linguagem de programação em si — muitas linguagens modernas, inclusive PHP e Ruby, podem implementar servidores que suportem muitas conexões simultâneas, desde que a arquitetura seja adequada.

// ---

// ### Demonstração: um chat

// Aqui está uma demo de chat usando long polling. Você pode baixar e executar localmente se conhece Node.js e sabe instalar módulos.

// Arquivos:

// * `server.js` (servidor)
// * `browser.js` (código do navegador)
// * `index.html`

// ---

// ### Quando usar long polling

// Long polling funciona muito bem quando as mensagens são **raras**.

// Se as mensagens chegam muito frequentemente, o padrão de requisição-resposta fica parecido com um “serra elétrica” (muitas requisições seguidas).

// Cada mensagem implica uma requisição separada, com cabeçalhos, autenticação e outras sobrecargas.

// Nesses casos, é melhor usar métodos mais eficientes, como **WebSocket** ou **Server-Sent Events**.

// ---

// Se quiser, posso ajudar a montar uma implementação básica de long polling para seu projeto! Quer?
