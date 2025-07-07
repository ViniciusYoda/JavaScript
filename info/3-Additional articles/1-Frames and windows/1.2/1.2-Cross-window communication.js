// Claro! Aqui está a adaptação completa para o português do texto sobre **Comunicação entre janelas (Cross-window communication)**:

// ---

// # Comunicação entre janelas

// A política de **“Mesma Origem”** (Same Origin Policy) limita o acesso que janelas e frames têm umas às outras.

// A ideia é: se o usuário tem duas páginas abertas — uma de `john-smith.com` e outra de `gmail.com` — ele não gostaria que um script de `john-smith.com` pudesse ler seus e-mails no `gmail.com`. Portanto, o objetivo da política de “Mesma Origem” é proteger o usuário contra roubo de informações.

// ---

// ## Mesma Origem

// Dizemos que duas URLs têm a **mesma origem** se tiverem o mesmo **protocolo**, **domínio** e **porta**.

// Essas URLs têm a mesma origem:

// * `http://site.com`
// * `http://site.com/`
// * `http://site.com/minha/pagina.html`

// Estas **não** têm a mesma origem:

// * `http://www.site.com` (domínio diferente, pois `www.` importa)
// * `http://site.org` (domínio diferente, `.org` importa)
// * `https://site.com` (protocolo diferente: `https`)
// * `http://site.com:8080` (porta diferente: `8080`)

// ---

// ## Regra da política de Mesma Origem

// * Se tivermos referência a outra janela, por exemplo um popup criado por `window.open` ou uma janela dentro de um `<iframe>`, e essa janela for da mesma origem, então temos acesso total a ela.
// * Caso contrário, se for de origem diferente, não podemos acessar seu conteúdo: variáveis, documento, nada.
//   **A única exceção** é a propriedade `location`: podemos **alterá-la** (redirecionando o usuário), mas não podemos **ler** seu valor (não conseguimos saber onde o usuário está, evitando vazamento de informação).

// ---

// ## Exemplo prático com iframe

// O elemento `<iframe>` hospeda uma janela embutida, com seu próprio `window` e `document`.

// Podemos acessar essas janelas via:

// * `iframe.contentWindow` — obtém o objeto window dentro do iframe.
// * `iframe.contentDocument` — obtém o documento dentro do iframe (equivale a `iframe.contentWindow.document`).

// Quando tentamos acessar algo dentro do iframe, o navegador verifica se ele tem a mesma origem. Se não, o acesso é negado (exceto para escrever em `location`, que ainda é permitido).

// Exemplo tentando ler/escrever num iframe de origem diferente:

// ```html
// <iframe src="https://example.com" id="iframe"></iframe>

// <script>
//   iframe.onload = function() {
//     let iframeWindow = iframe.contentWindow; // OK, conseguimos a referência

//     try {
//       let doc = iframe.contentDocument; // ERRO, acesso negado
//     } catch(e) {
//       alert(e); // Erro de segurança (origem diferente)
//     }

//     try {
//       let href = iframe.contentWindow.location.href; // ERRO, não podemos ler URL
//     } catch(e) {
//       alert(e); // Erro de segurança
//     }

//     // Podemos modificar a URL (redirecionar)
//     iframe.contentWindow.location = '/'; // OK

//     iframe.onload = null; // limpar o handler para não rodar após mudança de location
//   };
// </script>
// ```

// O código acima gera erro para todas as operações, exceto:

// * Obter referência ao objeto `iframe.contentWindow`
// * Escrever em `location` (redirecionar o iframe)

// ---

// ### E se o iframe for da mesma origem?

// Podemos fazer tudo:

// ```html
// <!-- iframe do mesmo site -->
// <iframe src="/" id="iframe"></iframe>

// <script>
//   iframe.onload = function() {
//     iframe.contentDocument.body.prepend("Olá, mundo!");
//   };
// </script>
// ```

// ---

// ## iframe.onload vs iframe.contentWindow\.onload

// O evento `iframe.onload` (no elemento `<iframe>`) é basicamente igual a `iframe.contentWindow.onload` (no objeto window embutido). Ele dispara quando o iframe termina de carregar todos os recursos.

// Porém, não conseguimos acessar `iframe.contentWindow.onload` se o iframe for de origem diferente. Por isso, devemos usar `iframe.onload`.

// ---

// ## Janelas em subdomínios: `document.domain`

// Por definição, URLs com domínios diferentes têm origens diferentes.

// Mas, se as janelas compartilham o mesmo domínio de segundo nível, por exemplo:

// * `john.site.com`
// * `peter.site.com`
// * `site.com`

// Podemos fazer o navegador **ignorar essa diferença** para que sejam tratadas como da mesma origem para comunicação entre janelas.

// Para isso, cada página deve rodar:

// ```js
// document.domain = 'site.com';
// ```

// Assim, elas poderão interagir livremente.

// ---

// ### Nota importante: deprecated, mas ainda funciona

// A propriedade `document.domain` está sendo removida da especificação, e a comunicação via mensagens (postMessage, explicado a seguir) é o método recomendado.

// Ainda assim, todos os navegadores atuais suportam `document.domain` para compatibilidade com código antigo.

// ---

// ## Cuidado: iframe com documento errado

// Quando um iframe é da mesma origem e podemos acessar seu documento, há um problema: o iframe **já tem um documento** ao ser criado, mas esse documento **não é o que será carregado depois**.

// Se tentarmos manipular esse documento logo no início, provavelmente será perdido.

// Exemplo:

// ```html
// <iframe src="/" id="iframe"></iframe>

// <script>
//   let docAntigo = iframe.contentDocument;
//   iframe.onload = function() {
//     let docNovo = iframe.contentDocument;
//     alert(docAntigo == docNovo); // false, são documentos diferentes
//   };
// </script>
// ```

// Ou seja: não devemos mexer no documento do iframe antes do carregamento (`onload`), pois não é o documento final.

// ---

// ## Como detectar quando o documento está pronto?

// O documento correto estará disponível quando `iframe.onload` disparar.

// Se quiser detectar antes, pode usar uma verificação periódica com `setInterval`:

// ```js
// let docAntigo = iframe.contentDocument;

// let timer = setInterval(() => {
//   let docNovo = iframe.contentDocument;
//   if (docNovo == docAntigo) return;

//   alert("Novo documento carregado!");

//   clearInterval(timer); // para a checagem
// }, 100);
// ```

// ---

// ## Coleção window\.frames

// Outra forma de acessar janelas de iframes é via coleção `window.frames`:

// * Por índice: `window.frames[0]` — a janela do primeiro frame no documento.
// * Por nome: `window.frames.nomeDoIframe` — a janela do iframe com `name="nomeDoIframe"`.

// Exemplo:

// ```html
// <iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

// <script>
//   alert(iframe.contentWindow == frames[0]); // true
//   alert(iframe.contentWindow == frames.win); // true
// </script>
// ```

// Se um iframe tem outros iframes dentro, suas janelas formam uma hierarquia.

// Navegação entre janelas:

// * `window.frames` — coleção de janelas filhas (iframes aninhados)
// * `window.parent` — referência para a janela pai (externa)
// * `window.top` — referência para a janela mais externa (top-level)

// Exemplo para saber se a janela atual está dentro de um frame:

// ```js
// if (window == top) {
//   alert('Este script está na janela principal, não em um frame');
// } else {
//   alert('Este script está rodando dentro de um frame!');
// }
// ```

// ---

// ## Atributo sandbox no iframe

// O atributo `sandbox` permite restringir o que um iframe pode fazer para evitar execução de código não confiável.

// Ele “coloca o iframe em uma caixa de areia” (sandbox), fazendo-o ser tratado como se viesse de uma origem diferente e/ou aplicando outras limitações.

// Se usado como `<iframe sandbox src="...">`, aplica o conjunto padrão de restrições.

// Podemos relaxar algumas restrições listando valores separados por espaços, como:

// ```html
// <iframe sandbox="allow-forms allow-popups"></iframe>
// ```

// ### Restrições comuns:

// * `allow-same-origin`
//   Remove a restrição que força o iframe a ser tratado como origem diferente.
// * `allow-top-navigation`
//   Permite o iframe mudar `parent.location`.
// * `allow-forms`
//   Permite enviar formulários.
// * `allow-scripts`
//   Permite rodar scripts.
// * `allow-popups`
//   Permite abrir popups com `window.open`.

// ---

// ## Comunicação entre janelas com mensagens (postMessage)

// A interface `postMessage` permite que janelas conversem, independentemente da origem.

// É uma forma de **burlar a política de Mesma Origem**, permitindo comunicação segura se ambas as janelas concordarem.

// ---

// ### postMessage

// A janela que quer enviar a mensagem chama o método `postMessage` da janela alvo.

// Exemplo: para enviar mensagem para `win`:

// ```js
// win.postMessage(dados, origemAlvo);
// ```

// * `dados` — os dados a enviar, pode ser qualquer objeto (exceto no IE que suporta só strings, então é bom usar `JSON.stringify` para objetos complexos).
// * `origemAlvo` — especifica a origem da janela destino para segurança. A mensagem só será recebida se a janela destino estiver naquela origem.

// Esse parâmetro é importante porque o usuário pode navegar para outro site na janela destino, e o remetente não saberia. Assim, restringir a origem previne envio errado de dados sensíveis.

// Exemplo:

// ```html
// <iframe src="http://example.com" name="example"></iframe>

// <script>
//   let win = window.frames.example;

//   win.postMessage("mensagem", "http://example.com");
// </script>
// ```

// Se não quiser checar a origem, use `"*"` no lugar de `origemAlvo`:

// ```js
// win.postMessage("mensagem", "*");
// ```

// ---

// ### onmessage

// Para receber mensagens, a janela alvo deve escutar o evento `message`:

// ```js
// window.addEventListener("message", function(event) {
//   if (event.origin !== 'http://javascript.info') {
//     // ignorar mensagens de origem desconhecida
//     return;
//   }

//   alert("Recebido: " + event.data);

//   // pode responder usando event.source.postMessage(...)
// });
// ```

// O objeto `event` tem propriedades especiais:

// * `data` — dados enviados pelo `postMessage`.
// * `origin` — origem da janela remetente (ex: `http://javascript.info`).
// * `source` — referência para a janela remetente, útil para responder.

// ---

// ## Resumo

// * Para chamar métodos e acessar conteúdo de outra janela, primeiro precisamos de uma referência para ela.

// * Para popups:

//   * A janela que abre chama `window.open` e recebe referência.
//   * A janela popup pode acessar a que abriu via `window.opener`.

// * Para iframes:

//   * Podemos acessar janelas filhas via `window.frames`.
//   * `window.parent` e `window.top` referenciam janelas pai e topo.
//   * `iframe.contentWindow` é a janela dentro do iframe.

// * Se as janelas têm a mesma origem (host, porta, protocolo), elas podem interagir livremente.

// * Caso contrário, só podem:

//   * Mudar a localização (`location`) da outra janela (somente escrita).
//   * Enviar mensagens com `postMessage`.

// * Exceções:

//   * Janelas com o mesmo domínio de segundo nível podem usar `document.domain` para se tratar como mesma origem.
//   * Iframes com `sandbox` são forçados a origem diferente, exceto se tiverem `allow-same-origin`.

// * `postMessage` permite comunicação segura entre janelas de qualquer origem, com confirmação da origem na recepção da mensagem.

// ---

// Se quiser posso ajudar com exemplos práticos de código ou esclarecer dúvidas específicas! Quer?
