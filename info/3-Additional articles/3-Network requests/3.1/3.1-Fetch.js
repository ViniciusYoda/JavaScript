// Claro! Aqui está a **versão traduzida e adaptada para o português** de todo o conteúdo sobre `fetch` em JavaScript:

// ---

// # `fetch`

// O JavaScript pode enviar requisições de rede para o servidor e carregar novas informações **sempre que necessário**, sem recarregar a página.

// Por exemplo, podemos usar uma requisição para:

// * Enviar um pedido;
// * Carregar informações do usuário;
// * Receber atualizações do servidor;
// * …entre outros.

// Esse conceito ficou conhecido como **AJAX** (JavaScript Assíncrono e XML). Apesar do nome, **não é necessário usar XML** — hoje, usamos mais JSON. O termo persiste por tradição.

// ---

// ## O método `fetch()`

// A forma mais moderna e versátil de fazer requisições é com o método `fetch()`.

// > Ele não é suportado por navegadores antigos (mas pode ser **polyfilled**), e tem **suporte completo nos navegadores modernos**.

// ### Sintaxe básica:

// ```js
// let promessa = fetch(url, [opcoes]);
// ```

// * `url` – o endereço para onde enviar a requisição;
// * `opcoes` – um objeto opcional com parâmetros como `method`, `headers`, `body`, etc.

// > Sem `opcoes`, o `fetch()` faz uma requisição `GET` simples.

// Ele retorna uma **Promise**, que será resolvida com um objeto `Response` quando o servidor responder (com os **headers**). O corpo ainda não estará disponível nesse momento.

// ### Verificando o status:

// ```js
// let resposta = await fetch(url);

// if (resposta.ok) { // status HTTP entre 200 e 299
//   let json = await resposta.json(); // lê e converte o corpo em JSON
// } else {
//   alert("Erro HTTP: " + resposta.status);
// }
// ```

// ---

// ## Métodos para ler o corpo da resposta:

// ```js
// await resposta.text();        // como texto
// await resposta.json();        // como JSON (objeto JS)
// await resposta.formData();    // como FormData (multipart)
// await resposta.blob();        // como Blob (dados binários com tipo)
// await resposta.arrayBuffer(); // como ArrayBuffer (baixo nível)
// ```

// > ⚠️ **Atenção:** só é possível **usar um único método de leitura** por resposta. Uma vez lido, o corpo é “consumido”.

// ---

// ### Exemplo – Carregar commits mais recentes do GitHub:

// ```js
// let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// let resposta = await fetch(url);
// let commits = await resposta.json();

// alert(commits[0].author.login);
// ```

// Ou com `.then()`:

// ```js
// fetch(url)
//   .then(res => res.json())
//   .then(commits => alert(commits[0].author.login));
// ```

// ### Ler como texto:

// ```js
// let resposta = await fetch(url);
// let texto = await resposta.text();

// alert(texto.slice(0, 80) + '...');
// ```

// ---

// ## Exemplo – Carregar e exibir uma imagem com `fetch`:

// ```js
// let resposta = await fetch('/logo-fetch.svg');
// let blob = await resposta.blob();

// let img = document.createElement('img');
// img.style = 'position:fixed;top:10px;left:10px;width:100px';
// document.body.append(img);
// img.src = URL.createObjectURL(blob);

// // Remove depois de 3 segundos
// setTimeout(() => {
//   img.remove();
//   URL.revokeObjectURL(img.src);
// }, 3000);
// ```

// ---

// ## Cabeçalhos da resposta

// Os cabeçalhos podem ser acessados por `resposta.headers`, que se comporta como um `Map`:

// ```js
// let resposta = await fetch(url);

// alert(resposta.headers.get('Content-Type')); // ex: application/json

// for (let [chave, valor] of resposta.headers) {
//   alert(`${chave} = ${valor}`);
// }
// ```

// ---

// ## Cabeçalhos da requisição

// Você pode adicionar cabeçalhos personalizados usando a opção `headers`:

// ```js
// let resposta = fetch(protectedUrl, {
//   headers: {
//     Authentication: 'secreto'
//   }
// });
// ```

// ### Cabeçalhos proibidos:

// O navegador **não permite** definir certos cabeçalhos por segurança, como:

// * Accept-Charset, Accept-Encoding
// * Content-Length
// * Cookie, Referer, Host, Origin, etc.
// * Headers começando com `Proxy-` ou `Sec-`

// ---

// ## Enviando dados com `POST`

// Para fazer uma requisição `POST` (ou outro método), use:

// ```js
// let user = {
//   nome: 'João',
//   sobrenome: 'Silva'
// };

// let resposta = await fetch('/usuario', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user)
// });

// let resultado = await resposta.json();
// alert(resultado.mensagem);
// ```

// > Obs: se `body` for uma string, o `Content-Type` padrão é `text/plain`. Por isso, para JSON usamos `application/json`.

// ---

// ## Enviando uma imagem com `fetch`

// Exemplo com `<canvas>`:

// ```html
// <body style="margin:0">
//   <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
//   <input type="button" value="Enviar" onclick="enviarImagem()">

//   <script>
//     canvasElem.onmousemove = function(e) {
//       let ctx = canvasElem.getContext('2d');
//       ctx.lineTo(e.clientX, e.clientY);
//       ctx.stroke();
//     };

//     async function enviarImagem() {
//       let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

//       let resposta = await fetch('/upload-imagem', {
//         method: 'POST',
//         body: blob
//       });

//       let resultado = await resposta.json();
//       alert(resultado.mensagem);
//     }
//   </script>
// </body>
// ```

// > Não é necessário definir manualmente o `Content-Type`, pois o objeto `Blob` já inclui essa informação.

// ---

// ## Resumo

// ### Passos típicos com `fetch`:

// ```js
// let resposta = await fetch(url, opcoes);  // obtém os headers
// let resultado = await resposta.json();    // lê e converte o corpo
// ```

// Ou com `.then()`:

// ```js
// fetch(url, opcoes)
//   .then(res => res.json())
//   .then(resultado => /* processar */);
// ```

// ### Principais propriedades de `Response`:

// * `response.status` – código HTTP (ex: 200)
// * `response.ok` – `true` se status estiver entre 200–299
// * `response.headers` – objeto estilo `Map` com os cabeçalhos

// ### Métodos para ler o corpo:

// * `response.text()` – como texto
// * `response.json()` – como objeto JSON
// * `response.blob()` – como Blob (binário)
// * `response.arrayBuffer()` – como ArrayBuffer (baixo nível)
// * `response.formData()` – como FormData (multipart)

// ### Opções do `fetch`:

// * `method` – método HTTP (`GET`, `POST`, etc.)
// * `headers` – cabeçalhos da requisição
// * `body` – corpo da requisição (string, FormData, Blob, etc.)

// ---

// Se quiser, posso complementar com exemplos reais de envio de formulários, upload de arquivos com `FormData`, ou tratamento de erros com `try...catch`. Deseja seguir com isso?
