// Aqui está a **adaptação completa para o português** do conteúdo sobre **carregamento de recursos com `onload` e `onerror`**:

// ---

// ## 📦 Carregamento de Recursos: `onload` e `onerror`

// O navegador permite acompanhar o **carregamento de recursos externos** – como scripts, iframes, imagens e mais.

// Existem dois eventos principais para isso:

// * `onload` – quando o recurso foi carregado com sucesso.
// * `onerror` – quando ocorre um erro no carregamento.

// ---

// ### 🔌 Carregando um Script

// Suponha que você precise carregar um script de terceiros e usar uma função definida nele.

// Você pode carregá-lo dinamicamente assim:

// ```js
// let script = document.createElement('script');
// script.src = "meu-script.js";
// document.head.append(script);
// ```

// Mas… **como garantir que o script foi carregado antes de usar suas funções?**

// A resposta está nos eventos `onload` e `onerror`.

// ---

// ### ✅ `script.onload`

// O evento `onload` é acionado **quando o script foi baixado e executado com sucesso**.

// Exemplo:

// ```js
// let script = document.createElement('script');
// script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js";
// document.head.append(script);

// script.onload = function() {
//   alert(_.VERSION); // mostra a versão da biblioteca
// };
// ```

// No `onload`, já podemos **usar variáveis e funções** definidas no script.

// ---

// ### ❌ `script.onerror`

// Se o carregamento falhar (por exemplo, erro 404 ou servidor indisponível), o evento `onerror` é acionado:

// ```js
// let script = document.createElement('script');
// script.src = "https://exemplo.com/nao-existe.js";
// document.head.append(script);

// script.onerror = function() {
//   alert("Erro ao carregar " + this.src);
// };
// ```

// > ⚠️ **Importante:** `onerror` **não fornece detalhes** sobre o tipo de erro HTTP. Só sabemos que **falhou**.

// ---

// ### ⚠️ Erros de Execução

// O `onload` é acionado mesmo que o script contenha **erros de programação**.
// Para rastrear esses erros, use o manipulador global `window.onerror`.

// ---

// ## 🖼 Outros Recursos

// Os eventos `load` e `error` funcionam também para:

// * Imagens (`<img>`)
// * Estilos (`<link>`)
// * Iframes (`<iframe>`)
// * Scripts (`<script>`)

// ### Exemplo com imagem:

// ```js
// let img = document.createElement('img');
// img.src = "https://js.cx/clipart/train.gif";

// img.onload = function() {
//   alert(`Imagem carregada, tamanho: ${img.width}x${img.height}`);
// };

// img.onerror = function() {
//   alert("Erro ao carregar a imagem");
// };
// ```

// > 📌 Observação: imagens **começam a carregar assim que o `src` é definido** (sem precisar estar no DOM).
// > Já o `<iframe>` **sempre aciona `onload`**, mesmo se o carregamento falhar – por razões históricas.

// ---

// ## 🌐 Política de Origem Cruzada (Crossorigin)

// O navegador **bloqueia o acesso entre origens diferentes** por segurança.

// Por exemplo:

// * Um script de `https://facebook.com` **não pode acessar** dados de `https://gmail.com`.

// Isso vale para **todos os recursos** (scripts, imagens, estilos etc).

// ### Exemplo de script com erro:

// ```js
// // Arquivo error.js
// noSuchFunction(); // função inexistente
// ```

// #### ✅ Carregando do mesmo domínio:

// ```html
// <script>
// window.onerror = function(msg, url, linha, coluna, erro) {
//   alert(`${msg}\n${url}, ${linha}:${coluna}`);
// };
// </script>

// <script src="/scripts/error.js"></script>
// ```

// > Resultado:

// ```
// Uncaught ReferenceError: noSuchFunction is not defined
// /scripts/error.js, 1:1
// ```

// #### ❌ Carregando de outro domínio:

// ```html
// <script>
// window.onerror = function(msg, url, linha, coluna, erro) {
//   alert(`${msg}\n${url}, ${linha}:${coluna}`);
// };
// </script>

// <script src="https://outro-site.com/error.js"></script>
// ```

// > Resultado:

// ```
// Script error.
// , 0:0
// ```

// Ou seja: **sem detalhes do erro**, pois o script veio de outro domínio.

// ---

// ### 🛡 Como permitir acesso entre origens?

// Use o atributo `crossorigin` no `<script>` **e** o servidor deve enviar os cabeçalhos corretos (CORS):

// #### Níveis de acesso:

// | Atributo                        | O que faz                                                                 |
// | ------------------------------- | ------------------------------------------------------------------------- |
// | *(sem atributo)*                | Acesso proibido                                                           |
// | `crossorigin="anonymous"`       | Acesso permitido se o servidor enviar `Access-Control-Allow-Origin`       |
// | `crossorigin="use-credentials"` | Envia cookies/autenticação, precisa de `Access-Control-Allow-Credentials` |

// ### Exemplo com `anonymous`:

// ```html
// <script>
// window.onerror = function(msg, url, linha, coluna, erro) {
//   alert(`${msg}\n${url}, ${linha}:${coluna}`);
// };
// </script>

// <script crossorigin="anonymous" src="https://outro-site.com/error.js"></script>
// ```

// > ✅ Se o servidor responder com o cabeçalho `Access-Control-Allow-Origin`, o erro será detalhado corretamente.

// ---

// ## 📌 Resumo

// * Os eventos `load` e `error` permitem rastrear o **carregamento de recursos** externos.
// * Eles funcionam para: `<script>`, `<img>`, `<link>`, `<iframe>`, etc.
// * `onload` → recurso carregado com sucesso.
//   `onerror` → falha no carregamento.
// * Scripts de **outros domínios** **não fornecem detalhes de erro** sem CORS.
// * Para obter detalhes, use `crossorigin="anonymous"` ou `crossorigin="use-credentials"` com cabeçalhos no servidor.

// ---

// Se quiser, posso montar um exemplo prático em HTML com `script.onload`, `script.onerror`, e também com imagem. Deseja?
