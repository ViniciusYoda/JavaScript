// Claro! Aqui está a **versão adaptada para o português** da seção **Fetch: Requisições Cross-Origin (CORS)**:

// ---

// # Fetch: Requisições entre origens diferentes (CORS)

// Se tentarmos fazer uma requisição `fetch` para outro site (diferente da origem atual), ela provavelmente irá **falhar**.

// ### Exemplo:

// ```js
// try {
//   await fetch('http://example.com');
// } catch (err) {
//   alert(err); // Failed to fetch
// }
// ```

// A requisição falha, como esperado.

// ---

// ## Conceito principal: **Origem (Origin)**

// A origem é composta por **domínio + porta + protocolo**.
// Se qualquer um desses for diferente, a requisição é considerada **cross-origin** (entre origens diferentes).

// Requisições entre origens exigem **autorização do servidor de destino**, através de **headers específicos**. Essa política é chamada de:

// ## 🛡️ **CORS – Cross-Origin Resource Sharing (Compartilhamento de Recursos entre Origens Diferentes)**

// ---

// ## Por que o CORS existe?

// Para proteger os usuários de ataques maliciosos.

// Antigamente, scripts de um site não podiam acessar o conteúdo de outro. Isso era a base da segurança da web.

// Por exemplo, um script em `hacker.com` **não podia acessar** os e-mails em `gmail.com`. Era uma proteção simples e eficaz.

// JavaScript também **não tinha métodos de rede** naquela época — era usado apenas para "decorar" páginas.

// Mas os desenvolvedores queriam mais poder. Então vários truques foram criados para contornar essas limitações:

// ---

// ### Comunicação via `<form>`

// Era possível submeter dados para outros domínios com formulários:

// ```html
// <iframe name="iframe"></iframe>

// <form target="iframe" method="POST" action="http://outro-site.com/">
//   ...
// </form>
// ```

// No entanto, **não era possível ler a resposta** do servidor (por segurança).

// ---

// ### Comunicação via `<script>` + JSONP

// Outro truque era carregar um `<script>` de outro domínio com dados embutidos:

// ```js
// function receberClima({ temperatura, umidade }) {
//   alert(`Temperatura: ${temperatura}, Umidade: ${umidade}`);
// }

// let script = document.createElement('script');
// script.src = 'http://outro.com/clima.json?callback=receberClima';
// document.body.append(script);
// ```

// O servidor responde com um script que chama essa função:

// ```js
// receberClima({
//   temperatura: 25,
//   umidade: 78
// });
// ```

// Esse método (chamado JSONP) **ainda funciona** e é aceito por navegadores antigos.

// ---

// ## A chegada do `fetch` e novas regras

// Com o tempo, métodos de rede como `XMLHttpRequest` e `fetch` surgiram.

// Inicialmente, requisições cross-origin eram **proibidas**. Depois, foram **permitidas com restrições**, exigindo **permissão explícita** do servidor via CORS.

// ---

// ## Tipos de Requisição Cross-Origin

// ### ✅ Requisições **"seguras"** (safe requests)

// Podem ser feitas **sem pré-autorização** se:

// * O método for: `GET`, `POST` ou `HEAD`
// * Os **headers** forem apenas:

//   * `Accept`
//   * `Accept-Language`
//   * `Content-Language`
//   * `Content-Type`: somente com os valores:

//     * `application/x-www-form-urlencoded`
//     * `multipart/form-data`
//     * `text/plain`

// Essas requisições são semelhantes às que sempre foram possíveis com `<form>` ou `<script>`.

// ---

// ## 🔐 Requisições "inseguras" (unsafe)

// Qualquer uma que use:

// * Métodos como `PUT`, `DELETE`, `PATCH`, etc.
// * Headers personalizados como `Authorization`, `API-Key`, etc.
// * `Content-Type` diferente dos permitidos acima

// Para essas, o navegador envia primeiro uma **requisição preliminar (preflight)** com `OPTIONS`, para perguntar ao servidor se pode continuar.

// ---

// ## Como o navegador decide?

// ### Exemplo de requisição segura:

// ```js
// fetch('https://api.site.com/dados');
// ```

// O navegador **adiciona o header `Origin`**:

// ```
// Origin: https://meusite.com
// ```

// O servidor deve responder com:

// ```
// Access-Control-Allow-Origin: https://meusite.com
// ```

// Ou com:

// ```
// Access-Control-Allow-Origin: *
// ```

// Se **isso não for feito**, o navegador bloqueia a resposta por segurança.

// ---

// ## Headers de resposta visíveis

// Por padrão, o JS só pode ler headers considerados **seguros**, como:

// * `Cache-Control`
// * `Content-Language`
// * `Content-Length`
// * `Content-Type`
// * `Expires`
// * `Last-Modified`
// * `Pragma`

// Para permitir o acesso a outros headers, o servidor deve usar:

// ```
// Access-Control-Expose-Headers: X-Nome, Outro-Header
// ```

// ---

// ## Requisição com método não seguro (exemplo completo)

// ```js
// let response = await fetch('https://site.com/servico', {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//     'API-Key': 'segredo123'
//   }
// });
// ```

// Essa requisição será considerada **insegura**, então o navegador primeiro faz:

// ---

// ### Etapa 1: Preflight (OPTIONS)

// ```
// OPTIONS /servico
// Origin: https://meusite.com
// Access-Control-Request-Method: PATCH
// Access-Control-Request-Headers: Content-Type, API-Key
// ```

// ---

// ### Etapa 2: Resposta do servidor

// ```
// HTTP/1.1 200 OK
// Access-Control-Allow-Origin: https://meusite.com
// Access-Control-Allow-Methods: PATCH
// Access-Control-Allow-Headers: Content-Type, API-Key
// Access-Control-Max-Age: 86400
// ```

// Se tudo estiver permitido, o navegador **envia a requisição real**.

// `Access-Control-Max-Age` diz por quanto tempo pode **reusar essa permissão** (em segundos).

// ---

// ### Etapa 3: Requisição real

// ```
// PATCH /servico
// Content-Type: application/json
// API-Key: segredo123
// Origin: https://meusite.com
// ```

// ---

// ### Etapa 4: Resposta real

// O servidor deve incluir **novamente** o header:

// ```
// Access-Control-Allow-Origin: https://meusite.com
// ```

// ---

// ## Enviando **cookies** e **credenciais**

// Por padrão, requisições cross-origin feitas por `fetch` **não enviam cookies**.

// Para **incluir credenciais**:

// ```js
// fetch('https://outro.com/api', {
//   credentials: 'include'
// });
// ```

// E o servidor deve permitir:

// ```
// Access-Control-Allow-Origin: https://meusite.com
// Access-Control-Allow-Credentials: true
// ```

// **Importante:** quando há credenciais, **`Access-Control-Allow-Origin` não pode ser `*`**, precisa ser o domínio exato.

// ---

// ## ✅ Resumo (CORS com fetch)

// ### 🔸 Requisições "seguras"

// * Métodos: `GET`, `POST`, `HEAD`
// * Headers: somente padrão
// * O navegador envia o header `Origin`
// * O servidor deve responder com `Access-Control-Allow-Origin`

// ### 🔸 Requisições "inseguras"

// * Envolvem headers personalizados ou métodos como `PUT`, `PATCH`, `DELETE`
// * O navegador **faz um `OPTIONS` antes** (preflight)
// * O servidor deve responder com:

//   * `Access-Control-Allow-Origin`
//   * `Access-Control-Allow-Methods`
//   * `Access-Control-Allow-Headers`
//   * (Opcional) `Access-Control-Max-Age`

// ### 🔸 Enviar cookies e autenticação:

// * `credentials: 'include'` no fetch
// * `Access-Control-Allow-Credentials: true` na resposta
// * `Access-Control-Allow-Origin` **não pode ser `*`**

// ---

// Se quiser, posso montar exemplos reais com Express, Django, ou configurar CORS corretamente para APIs REST. Deseja isso?
