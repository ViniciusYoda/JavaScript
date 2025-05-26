// Uma introdução ao JavaScript

// Vamos ver o que há de tão especial no JavaScript, no que podemos alcançar com ele e quais outras tecnologias funcionam bem com ele.
// O que é JavaScript?

// O JavaScript foi inicialmente criado para “tornar as páginas da web vivas”.

// Os programas nessa linguagem são chamados de scripts. Eles podem ser escritos diretamente no HTML de uma página da web e executado automaticamente conforme a página.

// Os scripts são fornecidos e executados como texto simples. Eles não precisam de preparação ou compilação especial para funcionar.

// Neste aspecto, JavaScript é muito diferente de outra linguagem chamada Java.
// Por que é chamado Java Script?

// Quando o JavaScript foi criado, inicialmente tinha outro nome: “LiveScript”. Mas Java era muito popular naquela época, então foi decidido que posicionar uma nova linguagem como um “irmão mais jovem” do Java ajudaria.

// Mas à medida que evoluiu, o JavaScript tornou-se uma linguagem totalmente independente com sua própria especificação chamada ECMAScript, e agora não tem nenhuma relação com Java.

// Hoje, o JavaScript pode executar não apenas no navegador, mas também no servidor, ou realmente em qualquer dispositivo que tenha um programa especial chamado mecanismo JavaScript.

// O navegador tem um mecanismo incorporado às vezes chamado de “máquina virtual do JavaScript”.

// Diferentes motores têm diferentes “codinomes”. Por exemplo:

//     V8 – no Chrome, Opera e Edge.
//     SpiderMonkey – no Firefox.
//     ...Existem outros codinomes como “Chakra” para IE, “JavaScriptCore”, “Nitro” e “SquirrelFish” para o Safari, etc.

// Os termos acima são bons para lembrar porque eles são usados em artigos de desenvolvedores na internet. Nós também vamos usá-los. Por exemplo, se “um recurso X é suportado pelo V8”, provavelmente funciona no Chrome, Opera e Edge.
// Como funcionam os motores?

// Os motores são complicados. Mas o básico é fácil.

//     O mecanismo (embutido se for um navegador) lê (“apeta”) o script.
//     Em seguida, converte (“compile”) o script em código de máquina.
//     E então o código da máquina funciona, muito rápido.

// O motor aplica otimizações em cada etapa do processo. Ele até observa o script compilado à medida que é executado, analisa os dados que fluem através dele e otimiza ainda mais o código da máquina com base nesse conhecimento.
// O que o JavaScript in-browser pode fazer?

// JavaScript moderno é uma linguagem de programação “segura”. Ele não fornece acesso de baixo nível à memória ou à CPU, porque foi inicialmente criado para navegadores que não o exigem.

// As capacidades do JavaScript dependem muito do ambiente em que está sendo executado. Por exemplo, o Node.js suporta funções que permitem ao JavaScript ler/gravar arquivos arbitrários, executar solicitações de rede, etc.

// JavaScript pode fazer tudo relacionado à manipulação da página da web, interação com o usuário e o servidor web.

// Por exemplo, o in-browser JavaScript é capaz de:

//     Adicionar novo HTML à página, alterar o conteúdo existente, modificar estilos.
//     Reaja às ações do usuário, execute cliques do mouse, movimentos do ponteiro, pressionamentos de teclas.
//     Enviar solicitações pela rede para servidores remotos, baixar e carregar arquivos (chamadas tecnologias AJAX e COMET).
//     Obter e definir cookies, fazer perguntas ao visitante, mostrar mensagens.
//     Lembre-se dos dados no lado do cliente (“armazenamento local”).

// O que não pode fazer JavaScript no navegador?

// As habilidades do JavaScript no navegador são limitadas para proteger a segurança do usuário. O objetivo é evitar que uma página da web malvada acesse informações privadas ou prejudique os dados do usuário.

// Exemplos de tais restrições incluem:

//     JavaScript em uma página da Web não pode ler/gravar arquivos arbitrários no disco rígido, copiá-los ou executar programas. Não tem acesso direto às funções do SO.

//     Os navegadores modernos permitem que ele funcione com arquivos, mas o acesso é limitado e só é fornecido se o usuário fizer certas ações, como “deixar cair” um arquivo em uma janela do navegador ou selecioná-lo por meio de um <input>- Tag.

//     Existem maneiras de interagir com a câmera / microfone e outros dispositivos, mas eles exigem a permissão explícita de um usuário. Assim, uma página habilitada para JavaScript pode não permitir sorrateiramente uma câmera da web, observar o ambiente e enviar as informações para a NSA.

//     Diferentes guias / janelas geralmente não sabem um sobre o outro. Algumas vezes eles fazem, por exemplo, quando uma janela usa JavaScript para abrir a outra. Mas mesmo neste caso, o JavaScript de uma página pode não acessar a outra página se eles vierem de sites diferentes (de um domínio, protocolo ou porta diferente).

//     Isso é chamado de “Política de Minha Origem”. Para contornar isso, ambas as páginas devem concordar com a troca de dados e devem conter um código JavaScript especial que o trate. Vamos cobrir isso no tutorial.

//     Esta limitação é, novamente, para a segurança do usuário. Uma página a partir de http://anysite.comO qual um usuário abriu não deve ser capaz de acessar outra guia do navegador com o URL http://gmail.com, por exemplo, e roubar informações de lá.

//     JavaScript pode facilmente se comunicar através da rede para o servidor de onde a página atual veio. Mas sua capacidade de receber dados de outros sites / domínios é aleijada. Embora possível, requer acordo explícito (expresso em cabeçalhos HTTP) do lado remoto. Mais uma vez, isso é uma limitação de segurança.

// Essas limitações não existem se o JavaScript for usado fora do navegador, por exemplo, em um servidor. Os navegadores modernos também permitem plugins/extensões que podem solicitar permissões estendidas.
// O que torna o JavaScript único?

// Há pelo menos três coisas boas sobre JavaScript:

//     Integração total com HTML/CSS.
//     Coisas simples são feitas simplesmente.
//     Suportado por todos os principais navegadores e habilitado por padrão.

// O JavaScript é a única tecnologia de navegador que combina essas três coisas.

// Isso é o que torna o JavaScript único. É por isso que é a ferramenta mais difundida para criar interfaces de navegador.

// Isso é dito, JavaScript pode ser usado para criar servidores, aplicativos móveis, etc.
// Idiomas "over" JavaScript

// A sintaxe do JavaScript não se adequa às necessidades de todos. Pessoas diferentes querem características diferentes.

// Isso é de se esperar, porque os projetos e requisitos são diferentes para todos.

// Assim, recentemente uma infinidade de novos idiomas apareceram, que são translacionados (convertidos) para JavaScript antes de serem executados no navegador.

// As ferramentas modernas tornam a transpilação muito rápida e transparente, na verdade, permitindo que os desenvolvedores codifiquem em outro idioma e o convertam automaticamente “sob o capô”.

// Exemplos de tais linguagens:

//     CoffeeScript é “açúcar desintético” para JavaScript. Ele introduz uma sintaxe mais curta, permitindo-nos escrever um código mais claro e preciso. Normalmente, os desenvolvedores Ruby gostam.
//     O TypeScript está concentrado em adicionar “indimplementação de dados” para simplificar o desenvolvimento e o suporte de sistemas complexos. É desenvolvido pela Microsoft.
//     O fluxo também adiciona a digitação de dados, mas de uma maneira diferente. Desenvolvido pelo Facebook.
//     Dart é uma linguagem autônoma que tem seu próprio motor que funciona em ambientes não-navegadores (como aplicativos móveis), mas também pode ser translacionado para JavaScript. Desenvolvido pelo Google.
//     Brython é um translacionador Python para JavaScript que permite a escrita de aplicativos em Python puro sem JavaScript.
//     Kotlin é uma linguagem de programação moderna, concisa e segura que pode segmentar o navegador ou o Node.

// Há mais. Claro, mesmo que usemos uma dessas linguagens transpiladas, também devemos conhecer o JavaScript para realmente entender o que estamos fazendo.
// Sumário

//     O JavaScript foi inicialmente criado como uma linguagem apenas para navegador, mas agora é usado em muitos outros ambientes também.
//     Hoje, o JavaScript tem uma posição única como a linguagem de navegador mais amplamente adotada, totalmente integrada com HTML/CSS.
//     Existem muitos idiomas que são “trapulados” para JavaScript e fornecem certos recursos. Recomenda-se dar uma olhada neles, pelo menos brevemente, depois de dominar o JavaScript.

