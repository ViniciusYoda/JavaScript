// Claro! Abaixo está a **adaptação completa para o português** da seção sobre a **Fetch API**, incluindo explicações e opções avançadas:

// ---

// # 📦 Fetch API – Visão Completa

// Até agora, já aprendemos bastante sobre `fetch`. Agora vamos explorar o restante da API para entender todas as suas capacidades.

// > ⚠️ **Nota:** A maioria dessas opções são raramente utilizadas. Você pode pular esta seção e continuar utilizando `fetch` normalmente.
// > Ainda assim, é útil saber o que ela pode fazer, caso precise usar esses recursos no futuro.

// ---

// ## ✅ Lista completa de opções do `fetch`

// ```js
// let promessa = fetch(url, {
//   method: "GET", // POST, PUT, DELETE, etc.
//   headers: {
//     "Content-Type": "text/plain;charset=UTF-8"
//   },
//   body: undefined, // string, FormData, Blob, BufferSource ou URLSearchParams
//   referrer: "about:client", // ou "" para não enviar o header Referer
//   referrerPolicy: "strict-origin-when-cross-origin", // outras: no-referrer, origin, same-origin, etc.
//   mode: "cors", // same-origin, no-cors
//   credentials: "same-origin", // omit, include
//   cache: "default", // no-store, reload, no-cache, force-cache, only-if-cached
//   redirect: "follow", // manual, error
//   integrity: "", // hash como "sha256-abc123..."
//   keepalive: false, // true para permitir requisições em segundo plano
//   signal: undefined, // AbortController para cancelar a requisição
//   window: window // null (obsoleto)
// });
// ```

// ---

// ## 🛰️ `referrer` e `referrerPolicy`

// Controlam o envio do **header `Referer`**.

// ### `referrer`

// Define um referenciador específico (deve ser da mesma origem) ou `""` para **não enviar**:

// ```js
// fetch('/pagina', {
//   referrer: "" // não envia o header Referer
// });
// ```

// ### `referrerPolicy`

// Define **regras gerais** para como o `Referer` será enviado:

// | Valor                                        | Para mesma origem  | Para outra origem  | HTTPS → HTTP       |
// | -------------------------------------------- | ------------------ | ------------------ | ------------------ |
// | `"no-referrer"`                              | ❌                  | ❌                  | ❌                  |
// | `"no-referrer-when-downgrade"`               | ✅ (completo)       | ✅ (completo)       | ❌                  |
// | `"origin"`                                   | ✅ (somente origem) | ✅ (somente origem) | ✅ (somente origem) |
// | `"origin-when-cross-origin"`                 | ✅ (completo)       | ✅ (somente origem) | ✅ (somente origem) |
// | `"same-origin"`                              | ✅ (completo)       | ❌                  | ❌                  |
// | `"strict-origin"`                            | ✅ (somente origem) | ✅ (somente origem) | ❌                  |
// | `"strict-origin-when-cross-origin"` (padrão) | ✅ (completo)       | ✅ (somente origem) | ❌                  |
// | `"unsafe-url"`                               | ✅ (completo)       | ✅ (completo)       | ✅ (completo)       |

// > Exemplo:

// ```js
// fetch('https://outro.com/pagina', {
//   referrerPolicy: "origin-when-cross-origin"
// });
// ```

// ---

// ## 🔒 `mode`

// Define **restrições de segurança** para requisições cross-origin:

// * `"cors"` – padrão; permite requisições entre origens com CORS
// * `"same-origin"` – proíbe requisições entre origens diferentes
// * `"no-cors"` – só permite métodos e headers "seguros" para origens diferentes

// ---

// ## 🍪 `credentials`

// Controla se **cookies e headers de autenticação** são enviados:

// * `"same-origin"` – (padrão) envia apenas se for mesma origem
// * `"include"` – sempre envia (necessário `Access-Control-Allow-Credentials: true`)
// * `"omit"` – nunca envia, nem para mesma origem

// ```js
// fetch('https://exemplo.com', {
//   credentials: 'include'
// });
// ```

// ---

// ## 📦 `cache`

// Controla o uso do **cache HTTP**:

// * `"default"` – uso padrão baseado nos headers HTTP
// * `"no-store"` – ignora completamente o cache
// * `"reload"` – ignora cache, mas armazena a nova resposta
// * `"no-cache"` – verifica no cache e envia condicionalmente
// * `"force-cache"` – usa cache, mesmo que esteja desatualizado
// * `"only-if-cached"` – usa cache ou falha (só com `mode: "same-origin"`)

// ---

// ## 🔁 `redirect`

// Controla como redirecionamentos HTTP são tratados:

// * `"follow"` – (padrão) segue redirecionamentos automaticamente
// * `"error"` – gera erro se houver redirecionamento
// * `"manual"` – retorna `opaqueredirect`, permitindo tratar manualmente

// ---

// ## 🔐 `integrity`

// Verifica a **integridade da resposta** via hash (substitui conteúdo manipulado):

// ```js
// fetch('http://site.com/arquivo.js', {
//   integrity: 'sha256-abcdef...'
// });
// ```

// Se a hash não bater, o fetch falha.

// ---

// ## 🔄 `keepalive`

// Permite que a requisição continue **mesmo após o usuário sair da página**.

// Muito útil para envio de estatísticas no `onunload`:

// ```js
// window.onunload = () => {
//   fetch('/estatisticas', {
//     method: 'POST',
//     body: "cliques=32&tempo=123",
//     keepalive: true
//   });
// };
// ```

// > ⚠️ Limites:

// * Tamanho máximo: 64KB no corpo da requisição (somando todas)
// * Não é possível acessar a resposta depois que a página fecha

// ---

// ## 📴 `signal`

// Já abordado em [Fetch: Abort](https://developer.mozilla.org/pt-BR/docs/Web/API/AbortController). Usado para **cancelar requisições** com `AbortController`.

// ```js
// let controller = new AbortController();
// fetch('/dados', { signal: controller.signal });
// controller.abort(); // cancela
// ```

// ---

// ## 🔚 `window`

// Campo reservado (obsoleto), relacionado ao ambiente de navegação.
// Deve ser deixado como `window` ou `null`.

// ---

// ## ✅ Resumo

// A Fetch API é **muito poderosa** e flexível. Mesmo que você use só `fetch(url)`, saiba que pode personalizar praticamente todos os comportamentos de uma requisição HTTP, incluindo:

// * Segurança (`credentials`, `referrerPolicy`, `mode`)
// * Cache (`cache`)
// * Redirecionamento (`redirect`)
// * Cancelamento (`signal`)
// * Integridade (`integrity`)
// * Requisições em segundo plano (`keepalive`)

// Se quiser, posso montar um **template reutilizável** com essas opções ou integrar isso a uma função genérica `apiFetch()`. Deseja isso?
