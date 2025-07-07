// Claro! Aqui está a versão adaptada para o português do texto sobre **Popups e métodos de janela (window methods)**:

// ---

// # Popups e métodos de janela

// Uma janela popup é um dos métodos mais antigos para mostrar um documento adicional ao usuário.

// Basicamente, você só precisa executar:

// ```js
// window.open('https://javascript.info/')
// ```

// E isso abrirá uma nova janela com a URL fornecida. A maioria dos navegadores modernos está configurada para abrir essa URL em uma nova aba, em vez de uma janela separada.

// Popups existem desde muito tempo atrás. A ideia inicial era mostrar outro conteúdo sem fechar a janela principal. Hoje em dia, existem outras formas para isso: podemos carregar conteúdo dinamicamente com fetch e mostrar em um `<div>` gerado dinamicamente. Então, popups não são algo que usamos todo dia.

// Além disso, popups são complicados em dispositivos móveis, que não mostram várias janelas ao mesmo tempo.

// Ainda assim, existem situações onde popups são usados, por exemplo, para autorização OAuth (login com Google/Facebook/…), porque:

// * Um popup é uma janela separada que tem seu próprio ambiente JavaScript independente. Então abrir um popup de um site externo, não confiável, é seguro.
// * É muito fácil abrir um popup.
// * Um popup pode navegar (mudar URL) e enviar mensagens para a janela que o abriu.

// ---

// ## Bloqueio de popups

// No passado, sites maliciosos abusavam muito dos popups, abrindo dezenas de janelas de anúncios. Por isso, a maioria dos navegadores bloqueia popups automaticamente para proteger o usuário.

// A maioria dos navegadores bloqueia popups se eles não forem chamados dentro de um evento disparado pelo usuário, como um clique (`onclick`).

// Por exemplo:

// ```js
// // popup bloqueado
// window.open('https://javascript.info');

// // popup permitido
// button.onclick = () => {
//   window.open('https://javascript.info');
// };
// ```

// Dessa forma, o usuário fica protegido de popups indesejados, mas a funcionalidade não fica totalmente bloqueada.

// ---

// ## window\.open

// A sintaxe para abrir um popup é:

// ```js
// window.open(url, nome, parâmetros)
// ```

// * **url**
//   A URL a ser carregada na nova janela.

// * **nome**
//   O nome da nova janela. Cada janela tem `window.name`. Se já existir uma janela com esse nome, a URL será carregada nela. Caso contrário, uma nova janela será aberta.

// * **parâmetros**
//   Uma string de configuração para a nova janela, com configurações separadas por vírgulas, sem espaços. Exemplo: `"width=200,height=100"`.

// ### Configurações para parâmetros:

// **Posição:**

// * `left` / `top` (números) — coordenadas do canto superior esquerdo da janela na tela. Limitação: a nova janela não pode ser posicionada fora da tela.
// * `width` / `height` (números) — largura e altura da nova janela. Existe limite mínimo para largura e altura, então não é possível criar uma janela invisível.

// **Recursos da janela:**

// * `menubar` (yes/no) — mostra ou oculta o menu do navegador na nova janela.
// * `toolbar` (yes/no) — mostra ou oculta a barra de navegação (voltar, avançar, recarregar, etc).
// * `location` (yes/no) — mostra ou oculta o campo URL na nova janela. Firefox e IE geralmente não permitem esconder.
// * `status` (yes/no) — mostra ou oculta a barra de status (a maioria dos navegadores força para mostrar).
// * `resizable` (yes/no) — permite desabilitar o redimensionamento da janela (não recomendado).
// * `scrollbars` (yes/no) — permite desabilitar as barras de rolagem (não recomendado).

// Existem outros recursos específicos para alguns navegadores, geralmente pouco usados. Veja a documentação do [window.open no MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/open) para exemplos.

// ---

// ## Exemplo: janela minimalista

// ```js
// let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
// width=0,height=0,left=-1000,top=-1000`;

// open('/', 'teste', params);
// ```

// Aqui a maioria dos recursos está desabilitada e a janela é posicionada fora da tela. Experimente rodar para ver o que o navegador faz. A maioria "corrige" coisas estranhas como largura/altura zero ou posição fora da tela — por exemplo, o Chrome abre uma janela com largura/altura máximas para ocupar toda a tela.

// Vamos usar posições e tamanhos normais:

// ```js
// let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
// width=600,height=300,left=100,top=100`;

// open('/', 'teste', params);
// ```

// A maioria dos navegadores abrirá a janela conforme o esperado.

// ---

// ## Regras para configurações omitidas

// * Se não houver o terceiro argumento ou ele estiver vazio, são usados os parâmetros padrão da janela.
// * Se houver uma string de parâmetros, mas algumas opções `yes/no` forem omitidas, elas serão consideradas com valor `no`.
// * Se `left` e `top` forem omitidos, o navegador tentará abrir a nova janela próximo à última janela aberta.
// * Se `width` e `height` forem omitidos, a nova janela terá o mesmo tamanho da última aberta.

// ---

// ## Acessando popup a partir da janela principal

// O `window.open` retorna uma referência para a nova janela, que pode ser usada para manipular suas propriedades, mudar localização, etc.

// Exemplo gerando conteúdo via JavaScript:

// ```js
// let novaJanela = window.open("about:blank", "ola", "width=200,height=200");

// novaJanela.document.write("Olá, mundo!");
// ```

// Modificando o conteúdo após o carregamento:

// ```js
// let novaJanela = open('/', 'exemplo', 'width=300,height=300');
// novaJanela.focus();

// alert(novaJanela.location.href); // about:blank, ainda não carregou

// novaJanela.onload = function() {
//   let html = `<div style="font-size:30px">Bem-vindo!</div>`;
//   novaJanela.document.body.insertAdjacentHTML('afterbegin', html);
// };
// ```

// **Atenção:** imediatamente após `window.open`, a nova janela ainda não está carregada (alerta mostra `about:blank`). Por isso usamos o evento `onload` para modificar seu conteúdo.

// ---

// ## Política de mesma origem (Same origin policy)

// Janelas podem acessar o conteúdo uma da outra livremente **somente se** forem da mesma origem (mesmo protocolo://domínio\:porta).

// Por exemplo, se a janela principal é de `site.com` e o popup de `gmail.com`, o acesso é proibido por segurança.

// ---

// ## Acessando a janela principal a partir do popup

// Um popup pode acessar a janela que o abriu via `window.opener`. Essa propriedade é `null` para todas as janelas que não sejam popups.

// Exemplo que substitui o conteúdo da janela principal:

// ```js
// let novaJanela = window.open("about:blank", "ola", "width=200,height=200");

// novaJanela.document.write(
//   "<script>window.opener.document.body.innerHTML = 'Teste'<\/script>"
// );
// ```

// Assim, a conexão entre as janelas é bidirecional: janela principal e popup têm referência uma da outra.

// ---

// ## Fechando um popup

// Para fechar uma janela: `win.close()`.

// Para verificar se uma janela está fechada: `win.closed` (retorna `true` ou `false`).

// O método `close()` funciona em qualquer janela tecnicamente, mas a maioria dos navegadores ignora se a janela não foi aberta via `window.open()`. Então só funciona em popups.

// Exemplo que carrega e fecha a janela:

// ```js
// let novaJanela = open('/', 'exemplo', 'width=300,height=300');

// novaJanela.onload = function() {
//   novaJanela.close();
//   alert(novaJanela.closed); // true
// };
// ```

// ---

// ## Movendo e redimensionando a janela

// Métodos para mover/redimensionar:

// * `win.moveBy(x,y)` — move a janela x pixels para direita e y pixels para baixo (valores negativos movem para esquerda/cima).
// * `win.moveTo(x,y)` — move a janela para a posição (x,y) na tela.
// * `win.resizeBy(largura,altura)` — redimensiona a janela aumentando/reduzindo largura e altura.
// * `win.resizeTo(largura,altura)` — redimensiona a janela para tamanho fixo.

// Existe também o evento `window.onresize`.

// **Apenas popups**: esses métodos só funcionam em popups que você abriu, para evitar abuso.

// ---

// ## Sem minimizar/maximizar

// JavaScript não tem como minimizar ou maximizar janelas. Isso é função do sistema operacional e não é acessível ao frontend.

// ---

// ## Rolagem de janelas

// Métodos para rolar a janela:

// * `win.scrollBy(x,y)` — rola x pixels para direita e y para baixo a partir da posição atual (valores negativos funcionam).
// * `win.scrollTo(x,y)` — rola para as coordenadas (x,y) na página.
// * `elem.scrollIntoView(top = true)` — rola para que o elemento apareça no topo (ou no fundo se `false`).

// Existe o evento `window.onscroll`.

// ---

// ## Foco e desfoco de janelas

// Existem os métodos `window.focus()` e `window.blur()` para focar e desfocar uma janela, além dos eventos `focus` e `blur` para detectar quando o visitante muda o foco para outra janela ou volta.

// Porém, esses métodos são severamente limitados hoje, porque antigamente eram usados para “prender” o usuário numa janela (exemplo abaixo):

// ```js
// window.onblur = () => window.focus();
// ```

// Este código tentava evitar que o usuário saísse da janela, focando-a de volta imediatamente.

// Por isso os navegadores impuseram muitas restrições para evitar abusos, principalmente em dispositivos móveis, onde `window.focus()` geralmente é ignorado.

// Ainda assim, em alguns casos eles funcionam e são úteis, como:

// * Quando abrimos um popup, chamar `newWindow.focus()` pode garantir que o usuário vá para a nova janela.
// * Para rastrear se o visitante está usando a aplicação, podemos usar eventos `onfocus` e `onblur` para pausar/retomar animações ou outras atividades.

// **Lembre-se:** o evento `blur` significa que o visitante saiu da janela, mas ela ainda pode estar visível em segundo plano.

// ---

// ## Resumo

// * Popups são usados raramente hoje, pois temos outras formas de mostrar conteúdo, como carregar dinamicamente na mesma página ou usar iframes.
// * Se for abrir popup, é bom avisar o usuário (ícone ao lado do link, por exemplo), para não confundir com mudança de foco.
// * O método para abrir é `open(url, nome, parâmetros)`, que retorna a referência para a janela.
// * Navegadores bloqueiam chamadas de `open` fora de eventos disparados pelo usuário, mostrando aviso para permitir.
// * Por padrão, abrimos uma nova aba, mas se passarmos tamanho, vira popup.
// * Popup pode acessar a janela que o abriu por `window.opener`.
// * Janelas só podem se acessar livremente se forem da mesma origem.
// * Para fechar popup, usar `close()`. Usuário pode fechar a qualquer momento.
// * Métodos `focus()` e `blur()` funcionam, mas com limitações.
// * Eventos `focus` e `blur` permitem detectar quando a janela ganha ou perde foco, mas janela pode estar visível mesmo com foco perdido.

// ---

// Se quiser, posso ajudar com exemplos práticos, códigos ou dúvidas específicas sobre popups! Quer?
