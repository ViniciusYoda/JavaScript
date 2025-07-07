// Claro! Aqui está a **adaptação completa em português** do conteúdo sobre `XMLHttpRequest`:

// ---

// ## 📦 XMLHttpRequest

// O `XMLHttpRequest` é um objeto nativo do navegador que permite fazer requisições HTTP em JavaScript.

// Apesar de ter "XML" no nome, ele funciona com **qualquer tipo de dado**, não apenas XML. Com ele podemos enviar/receber arquivos, acompanhar o progresso e muito mais.

// Atualmente, existe uma alternativa mais moderna chamada [`fetch`](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API), que **substitui parcialmente** o `XMLHttpRequest`.

// ### Quando ainda usar XMLHttpRequest?

// * Por **razões históricas**, quando há scripts legados que usam `XMLHttpRequest`.
// * Para **compatibilidade com navegadores antigos** (sem precisar de polyfill).
// * Para recursos que `fetch` ainda **não oferece**, como acompanhar o progresso de *upload*.

// Se você se encontra em um desses casos, continue com `XMLHttpRequest`. Caso contrário, é melhor usar `fetch`.

// ---

// ## 🚀 O básico

// ### Etapas de uma requisição assíncrona:

// 1. **Criar o objeto:**

// ```js
// let xhr = new XMLHttpRequest();
// ```

// 2. **Inicializar com `open`:**

// ```js
// xhr.open(metodo, url, [assíncrono = true, usuario, senha])
// ```

// * `metodo`: geralmente `"GET"` ou `"POST"`.
// * `url`: string ou objeto `URL`.
// * `assíncrono`: se `false`, a requisição é síncrona (não recomendado).
// * `usuario`, `senha`: para autenticação básica, se necessário.

// > ⚠️ O `open` apenas **prepara** a requisição — a conexão só é aberta ao chamar `send()`.

// 3. **Enviar a requisição:**

// ```js
// xhr.send([corpo])
// ```

// * `corpo`: opcional, como uma string ou `FormData`.

// ---

// ### 🧠 Eventos principais

// ```js
// xhr.onload = function() {
//   alert(`Concluído: ${xhr.status} ${xhr.response}`);
// };

// xhr.onerror = function() {
//   alert("Erro de rede");
// };

// xhr.onprogress = function(event) {
//   alert(`Recebido ${event.loaded} de ${event.total}`);
// };
// ```

// ---

// ### 📋 Exemplo completo:

// ```js
// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/exemplo/dados.txt');
// xhr.send();

// xhr.onload = function() {
//   if (xhr.status != 200) {
//     alert(`Erro ${xhr.status}: ${xhr.statusText}`);
//   } else {
//     alert(`Sucesso, recebidos ${xhr.response.length} bytes`);
//   }
// };

// xhr.onprogress = function(event) {
//   if (event.lengthComputable) {
//     alert(`Recebidos ${event.loaded} de ${event.total} bytes`);
//   } else {
//     alert(`Recebidos ${event.loaded} bytes`);
//   }
// };

// xhr.onerror = function() {
//   alert("Falha na requisição");
// };
// ```

// ---

// ## 📦 Propriedades úteis

// * `xhr.status` → Código HTTP (200, 404, etc.)
// * `xhr.statusText` → Texto descritivo do status
// * `xhr.response` → Corpo da resposta (ou `xhr.responseText` em scripts antigos)
// * `xhr.timeout` → Tempo limite em milissegundos

// ---

// ## 🔎 Parâmetros na URL

// Use o objeto `URL` para adicionar parâmetros com codificação correta:

// ```js
// let url = new URL('https://google.com/search');
// url.searchParams.set('q', 'test me!');
// xhr.open('GET', url); // https://google.com/search?q=test+me%21
// ```

// ---

// ## 📄 Tipos de resposta

// Configure com `xhr.responseType`:

// * `""` ou `"text"` → string
// * `"arraybuffer"` → dados binários (ex: arquivos)
// * `"blob"` → arquivos binários
// * `"document"` → XML ou HTML
// * `"json"` → objeto JSON (já parseado)

// ```js
// xhr.responseType = 'json';
// ```

// ---

// ## 📶 Estados da requisição

// ```js
// xhr.readyState
// ```

// | Estado             | Valor | Significado                  |
// | ------------------ | ----- | ---------------------------- |
// | `UNSENT`           | 0     | Criado, mas não inicializado |
// | `OPENED`           | 1     | `open()` foi chamado         |
// | `HEADERS_RECEIVED` | 2     | Cabeçalhos recebidos         |
// | `LOADING`          | 3     | Transferência em andamento   |
// | `DONE`             | 4     | Concluído                    |

// Você pode usar `xhr.onreadystatechange` para acompanhar esses estados (embora seja obsoleto nos projetos modernos).

// ---

// ## ❌ Cancelar requisição

// ```js
// xhr.abort(); // cancela
// ```

// Dispara o evento `abort` e `xhr.status` vira 0.

// ---

// ## ⛔ Requisições síncronas (não recomendado)

// ```js
// xhr.open('GET', '/dados.txt', false);
// xhr.send();
// ```

// ⚠️ Bloqueia toda a execução JavaScript da página até o fim da resposta. Pode travar a rolagem ou exibir alertas do navegador.

// ---

// ## 📬 Cabeçalhos HTTP

// ### Enviar cabeçalhos personalizados:

// ```js
// xhr.setRequestHeader('Content-Type', 'application/json');
// ```

// > Alguns cabeçalhos como `Referer` e `Host` são protegidos e não podem ser modificados.

// ### Ler cabeçalhos da resposta:

// ```js
// xhr.getResponseHeader('Content-Type');
// ```

// ### Todos os cabeçalhos:

// ```js
// xhr.getAllResponseHeaders();
// ```

// Para transformá-los em objeto:

// ```js
// let headers = xhr.getAllResponseHeaders()
//   .split('\r\n')
//   .reduce((acc, line) => {
//     let [chave, valor] = line.split(': ');
//     if (chave) acc[chave] = valor;
//     return acc;
//   }, {});
// ```

// ---

// ## 📤 Enviando dados com `POST`

// ### Com `FormData` (formulário):

// ```html
// <form name="pessoa">
//   <input name="nome" value="João">
//   <input name="sobrenome" value="Silva">
// </form>

// <script>
//   let formData = new FormData(document.forms.pessoa);
//   formData.append("idade", 30);

//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", "/api/usuarios");
//   xhr.send(formData);
// </script>
// ```

// ### Com JSON:

// ```js
// let xhr = new XMLHttpRequest();
// xhr.open("POST", "/api/usuarios");

// xhr.setRequestHeader('Content-Type', 'application/json');

// let json = JSON.stringify({ nome: "João", sobrenome: "Silva" });

// xhr.send(json);
// ```

// ---

// ## 📈 Progresso de upload

// ```js
// xhr.upload.onprogress = function(event) {
//   alert(`Enviado ${event.loaded} de ${event.total} bytes`);
// };
// xhr.upload.onload = function() {
//   alert("Upload concluído com sucesso.");
// };
// xhr.upload.onerror = function() {
//   alert("Erro no upload.");
// };
// ```

// ### Exemplo real:

// ```html
// <input type="file" onchange="enviarArquivo(this.files[0])">

// <script>
// function enviarArquivo(arquivo) {
//   let xhr = new XMLHttpRequest();

//   xhr.upload.onprogress = e => console.log(`Enviado ${e.loaded} de ${e.total}`);
//   xhr.onloadend = () => console.log(xhr.status == 200 ? "Sucesso" : `Erro ${xhr.status}`);

//   xhr.open("POST", "/upload");
//   xhr.send(arquivo);
// }
// </script>
// ```

// ---

// ## 🌍 Requisições Cross-Origin

// Para permitir envio de cookies/autenticação em requisições entre domínios, ative:

// ```js
// xhr.withCredentials = true;
// ```

// ---

// ## ✅ Resumo

// ```js
// let xhr = new XMLHttpRequest();

// xhr.open('GET', '/dados');
// xhr.send();

// xhr.onload = () => {
//   if (xhr.status != 200) {
//     alert(`Erro: ${xhr.status}`);
//   } else {
//     alert(xhr.response);
//   }
// };

// xhr.onerror = () => alert("Erro de rede");
// xhr.onprogress = (e) => alert(`Progresso: ${e.loaded} de ${e.total}`);
// ```

// ---

// ### 🧩 Eventos comuns:

// | Evento      | Descrição                              |
// | ----------- | -------------------------------------- |
// | `loadstart` | Requisição começou                     |
// | `progress`  | Dados estão sendo recebidos            |
// | `abort`     | Cancelada via `xhr.abort()`            |
// | `error`     | Erro de conexão                        |
// | `timeout`   | Tempo limite excedido                  |
// | `load`      | Requisição concluída com sucesso       |
// | `loadend`   | Fim da requisição (com ou sem sucesso) |

// ---

// Se quiser, posso montar um **template reutilizável de requisição com XMLHttpRequest** para seus projetos. Deseja que eu faça?
