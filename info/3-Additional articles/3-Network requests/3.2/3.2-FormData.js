// Claro! Aqui está a tradução adaptada para o português do conteúdo sobre `FormData`:

// ---

// # FormData

// Este capítulo trata do **envio de formulários HTML**, com ou sem arquivos, com campos adicionais e assim por diante.

// O objeto `FormData` facilita essa tarefa. Como o nome sugere, ele representa os dados de um formulário HTML.

// ---

// ## Criando um FormData

// ```js
// let formData = new FormData([formulario]);
// ```

// * Se você passar um elemento `<form>` como argumento, o `FormData` irá automaticamente capturar todos os campos dele.

// O grande diferencial do `FormData` é que métodos de rede, como `fetch()`, aceitam um `FormData` como corpo da requisição. Ele será automaticamente codificado como `Content-Type: multipart/form-data`.

// > Do ponto de vista do servidor, isso é igual a um envio de formulário tradicional.

// ---

// ## Enviando um formulário simples

// Veja como é simples enviar um formulário:

// ```html
// <form id="formElem">
//   <input type="text" name="nome" value="João">
//   <input type="text" name="sobrenome" value="Silva">
//   <input type="submit">
// </form>

// <script>
//   formElem.onsubmit = async (e) => {
//     e.preventDefault();

//     let resposta = await fetch('/usuario', {
//       method: 'POST',
//       body: new FormData(formElem)
//     });

//     let resultado = await resposta.json();
//     alert(resultado.mensagem);
//   };
// </script>
// ```

// ---

// ## Métodos do FormData

// Você pode modificar os campos de um `FormData` com os métodos:

// ```js
// formData.append(nome, valor);                   // Adiciona um campo
// formData.append(nome, blob, nomeArquivo);       // Adiciona como se fosse um <input type="file">
// formData.delete(nome);                          // Remove o campo
// formData.get(nome);                             // Retorna o valor do campo
// formData.has(nome);                             // Verifica se o campo existe
// formData.set(nome, valor);                      // Substitui todos os campos com o mesmo nome
// formData.set(nome, blob, nomeArquivo);          // Substitui como arquivo
// ```

// ⚠️ O `set` substitui todos os campos com o mesmo nome, enquanto `append` apenas adiciona outro.

// ---

// ### Iterar sobre os campos:

// ```js
// let formData = new FormData();
// formData.append('chave1', 'valor1');
// formData.append('chave2', 'valor2');

// for (let [nome, valor] of formData) {
//   alert(`${nome} = ${valor}`);
// }
// ```

// ---

// ## Enviando formulário com arquivo

// Formulários enviados com `FormData` usam automaticamente `multipart/form-data`, o que permite o envio de arquivos.

// ```html
// <form id="formElem">
//   <input type="text" name="primeiroNome" value="João">
//   Foto: <input type="file" name="foto" accept="image/*">
//   <input type="submit">
// </form>

// <script>
//   formElem.onsubmit = async (e) => {
//     e.preventDefault();

//     let resposta = await fetch('/upload-foto', {
//       method: 'POST',
//       body: new FormData(formElem)
//     });

//     let resultado = await resposta.json();
//     alert(resultado.mensagem);
//   };
// </script>
// ```

// ---

// ## Enviando formulário com dados Blob (imagem gerada dinamicamente)

// Você pode adicionar um `Blob` (ex: imagem gerada em um `<canvas>`) ao `FormData`, junto com outros campos:

// ```html
// <body style="margin:0">
//   <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
//   <input type="button" value="Enviar" onclick="enviar()">

//   <script>
//     canvasElem.onmousemove = function(e) {
//       let ctx = canvasElem.getContext('2d');
//       ctx.lineTo(e.clientX, e.clientY);
//       ctx.stroke();
//     };

//     async function enviar() {
//       let imagemBlob = await new Promise(resolve =>
//         canvasElem.toBlob(resolve, 'image/png')
//       );

//       let formData = new FormData();
//       formData.append("primeiroNome", "João");
//       formData.append("imagem", imagemBlob, "desenho.png");

//       let resposta = await fetch('/enviar-imagem', {
//         method: 'POST',
//         body: formData
//       });

//       let resultado = await resposta.json();
//       alert(resultado.mensagem);
//     }
//   </script>
// </body>
// ```

// > Neste exemplo, `formData.append("imagem", imagemBlob, "desenho.png")` simula o envio de um arquivo como se o usuário tivesse usado um campo `<input type="file" name="imagem">`.

// ---

// ## Resumo

// O objeto `FormData` é usado para capturar dados de um formulário HTML e enviá-los via `fetch` ou outro método de rede.

// Você pode:

// ### Criar:

// ```js
// new FormData(formulario); // baseado em um <form>
// new FormData();            // vazio
// ```

// ### Adicionar campos:

// ```js
// formData.append(nome, valor);
// formData.append(nome, blob, nomeArquivo);
// formData.set(nome, valor);
// formData.set(nome, blob, nomeArquivo);
// ```

// ### Outras operações:

// ```js
// formData.delete(nome);
// formData.get(nome);
// formData.has(nome);
// ```

// ### Observações:

// * `set` substitui campos anteriores com o mesmo nome. `append` apenas adiciona.
// * Para enviar um arquivo com nome, use 3 argumentos no `append` ou `set`.

// ---

// Se quiser, posso mostrar exemplos com `FormData` em uploads múltiplos, pré-visualização de imagens, ou integração com `express`/`Django` no backend. Deseja?
