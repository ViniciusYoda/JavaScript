// Claro! Aqui está o texto completo adaptado para o português sobre o **Ataque de Clickjacking**:

// ---

// # Ataque de Clickjacking

// O ataque de **clickjacking** permite que uma página maliciosa clique em um site “vítima” em nome do visitante.

// Muitos sites foram atacados dessa forma, incluindo Twitter, Facebook, Paypal e outros. Todos já corrigiram essa vulnerabilidade, é claro.

// ---

// ## A ideia

// A ideia é muito simples.

// Veja como o clickjacking era feito com o Facebook:

// 1. O visitante é atraído para a página maliciosa, não importa como.
// 2. A página tem um link que parece inofensivo (como “fique rico agora” ou “clique aqui, é muito engraçado”).
// 3. Sobre esse link, a página maliciosa posiciona um `<iframe>` transparente com a URL do facebook.com, de modo que o botão “Curtir” fique exatamente sobre o link. Geralmente isso é feito usando `z-index`.
// 4. Quando o visitante tenta clicar no link, na verdade ele clica no botão do Facebook.

// ---

// ## A demonstração

// Aqui está como a página maliciosa aparece. Para deixar claro, o `<iframe>` está meio transparente (nas páginas reais é totalmente transparente):

// ```html
// <style>
// iframe { /* iframe do site vítima */
//   width: 400px;
//   height: 100px;
//   position: absolute;
//   top: 0; left: -20px;
//   opacity: 0.5; /* na realidade: 0 (transparente) */
//   z-index: 1;
// }
// </style>

// <div>Clique para ficar rico agora:</div>

// <!-- URL do site vítima -->
// <iframe src="/clickjacking/facebook.html"></iframe>

// <button>Clique aqui!</button>

// <div>...E você fica legal (na verdade, eu sou um hacker legal)!</div>
// ```

// Na demonstração, vemos o `<iframe>` semitransparente sobre o botão. Um clique no botão, na verdade, clica no iframe, mas o usuário não percebe porque ele está invisível.

// Se o visitante estiver autenticado no Facebook (“lembrar de mim” ativado), isso adiciona um “Curtir”. No Twitter, poderia ser um botão “Seguir”.

// ---

// Aqui está o mesmo exemplo, mas mais próximo da realidade, com `opacity:0` no iframe:

// ```html
// <!-- iframe totalmente invisível -->
// <iframe src="/clickjacking/facebook.html" style="opacity:0;"></iframe>
// ```

// Tudo que precisamos para o ataque é posicionar o iframe na página maliciosa de modo que o botão fique exatamente sobre o link. Quando o usuário clicar no link, clicará no botão invisível. Isso geralmente é fácil de fazer com CSS.

// ---

// ## Clickjacking é para cliques, não para teclado

// O ataque funciona só com ações de mouse (ou semelhantes, como toques em celular).

// Redirecionar entrada do teclado é muito mais difícil. Tecnicamente, se quisermos hackear um campo de texto, podemos posicionar um iframe para que os campos de texto se sobreponham. Assim, quando o visitante foca no campo visível, na verdade está focando no campo dentro do iframe.

// Mas aí há um problema: tudo que o visitante digita fica oculto, pois o iframe é invisível.

// Geralmente as pessoas param de digitar quando não veem os caracteres aparecendo na tela.

// ---

// ## Defesas antigas (fracas)

// A defesa mais antiga é um pouco de JavaScript que impede a página de abrir dentro de um frame (“framebusting”):

// ```js
// if (top != window) {
//   top.location = window.location;
// }
// ```

// Ou seja: se a janela descobrir que não está no topo, ela se força a subir para o topo.

// Isso não é uma defesa confiável, pois existem muitas formas de burlar. Vamos ver algumas.

// ---

// ## Bloqueando navegação para o topo (top-navigation)

// Podemos bloquear a mudança de `top.location` usando o evento `beforeunload` na página de cima (do atacante):

// ```js
// window.onbeforeunload = function() {
//   return false;
// };
// ```

// Quando o iframe tenta mudar `top.location`, o visitante vê uma mensagem perguntando se quer sair da página.

// Na maioria dos casos, o visitante nega, porque não sabe do iframe — só vê a página de cima, então não tem motivo para sair. Assim, a mudança em `top.location` não acontece.

// ---

// ## Atributo sandbox

// O atributo `sandbox` restringe ações dentro do iframe, inclusive navegação.

// Um iframe com sandbox não pode mudar `top.location`.

// Podemos adicionar o iframe assim:

// ```html
// <iframe sandbox="allow-scripts allow-forms" src="facebook.html"></iframe>
// ```

// Isso permite scripts e formulários, mas proíbe navegação para o topo (`top.location`).

// ---

// ## X-Frame-Options

// No servidor, o cabeçalho HTTP **X-Frame-Options** pode permitir ou bloquear a exibição da página dentro de um frame.

// Ele deve ser enviado como cabeçalho HTTP, pois o navegador ignora se estiver em `<meta>` no HTML.

// Os valores possíveis são:

// * **DENY**
//   Nunca mostrar a página dentro de um frame.
// * **SAMEORIGIN**
//   Permitir mostrar em frame apenas se a página pai for da mesma origem.
// * **ALLOW-FROM domain**
//   Permitir mostrar em frame apenas se a página pai for do domínio especificado.

// Por exemplo, o Twitter usa `X-Frame-Options: SAMEORIGIN`.

// Se tentarmos:

// ```html
// <iframe src="https://twitter.com"></iframe>
// ```

// Dependendo do navegador, o iframe ficará vazio ou mostrará um alerta que não é permitido carregar a página dentro de um frame.

// ---

// ## Mostrar com funcionalidade desabilitada

// O cabeçalho X-Frame-Options tem um efeito colateral: outros sites não conseguem mostrar nossa página em iframe, mesmo que tenham motivos legítimos.

// Por isso, há outras soluções. Por exemplo, podemos “cobrir” a página com uma `<div>` que ocupa 100% da tela para interceptar todos os cliques. Essa `<div>` é removida se estivermos no topo (janela principal) ou se detectarmos que a proteção não é necessária.

// Exemplo:

// ```html
// <style>
//   #protetor {
//     height: 100%;
//     width: 100%;
//     position: absolute;
//     left: 0;
//     top: 0;
//     z-index: 99999999;
//   }
// </style>

// <div id="protetor">
//   <a href="/" target="_blank">Ir para o site</a>
// </div>

// <script>
//   // Pode gerar erro se a janela top for de origem diferente, mas tudo bem
//   if (top.document.domain == document.domain) {
//     protector.remove();
//   }
// </script>
// ```

// ---

// ## Atributo SameSite do cookie

// O atributo **SameSite** dos cookies também pode prevenir ataques de clickjacking.

// Um cookie com essa propriedade só é enviado se o site for aberto diretamente, não dentro de um iframe ou via outro site.

// Por exemplo, se o Facebook tivesse seu cookie de autenticação com `SameSite`:

// ```
// Set-Cookie: authorization=secret; SameSite
// ```

// Esse cookie não seria enviado quando o Facebook fosse aberto dentro de um iframe em outro site, fazendo o ataque falhar.

// ---

// **Importante:** o atributo SameSite não afeta cookies que não são usados para autenticação, o que pode permitir que páginas públicas sejam exibidas em iframes de outros sites.

// Além disso, ataques de clickjacking ainda podem funcionar em casos limitados, como em sites de votação anônima que usam IP para evitar votos duplicados, já que não dependem de cookies para autenticar.

// ---

// ## Resumo

// Clickjacking é uma técnica para “enganar” usuários a clicarem em um site vítima sem perceber o que está acontecendo.

// Isso é perigoso quando o clique ativa ações importantes.

// O atacante pode espalhar o link para sua página maliciosa ou atrair visitantes de outras formas. Existem muitas variações do ataque.

// De um lado, o ataque parece simples — só interceptar um clique. De outro, se o atacante souber que outro controle aparece após o clique, ele pode usar mensagens astutas para levar o usuário a clicar também nesse controle.

// É muito perigoso, porque quando desenvolvemos interfaces geralmente não pensamos que um atacante pode clicar em nome do usuário, então vulnerabilidades podem estar em lugares inesperados.

// **Recomenda-se usar o cabeçalho HTTP `X-Frame-Options: SAMEORIGIN` em páginas (ou sites inteiros) que não devem ser exibidas em frames.**

// Se quisermos permitir exibir as páginas em iframes, mas manter a segurança, use uma `<div>` cobrindo a página para interceptar cliques, removendo-a somente quando estiver na janela principal.

// ---

// Se quiser, posso ajudar com exemplos de código ou explicações adicionais! Quer?
