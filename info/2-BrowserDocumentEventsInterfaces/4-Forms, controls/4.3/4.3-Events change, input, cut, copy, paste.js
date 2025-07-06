// Aqui está a **versão adaptada para o português** do conteúdo sobre **eventos de mudança de dados em formulários**:

// ---

// ## ✏️ Eventos: `change`, `input`, `cut`, `copy`, `paste`

// Vamos explorar os principais eventos relacionados à **modificação de dados** nos formulários e campos de entrada.

// ---

// ## 🔁 Evento: `change`

// O evento `change` é disparado **quando o valor de um elemento é alterado e confirmado**.

// ### 🧠 Para `<input type="text">`:

// O evento `change` só ocorre **quando o campo perde o foco** (por exemplo, o usuário pressiona Tab ou clica fora).

// ```html
// <input type="text" onchange="alert(this.value)">
// <input type="button" value="Botão">
// ```

// Enquanto estiver digitando, **nenhum evento ocorre**. Apenas quando o foco sai do campo.

// ### ✅ Para `<select>` ou `<input type="checkbox" / radio>`:

// O evento ocorre **imediatamente após a mudança de valor/seleção**:

// ```html
// <select onchange="alert(this.value)">
//   <option value="">Selecione algo</option>
//   <option value="1">Opção 1</option>
//   <option value="2">Opção 2</option>
// </select>
// ```

// ---

// ## ⌨️ Evento: `input`

// O evento `input` é disparado **sempre que o valor de um campo é modificado** — seja por teclado, colar com o mouse, ditado por voz, etc.

// ### Exemplo:

// ```html
// <input type="text" id="input"> oninput: <span id="resultado"></span>

// <script>
//   input.oninput = function() {
//     resultado.innerHTML = input.value;
//   };
// </script>
// ```

// Esse evento é ideal para acompanhar a digitação **em tempo real** ou qualquer outra modificação do conteúdo.

// ### ⚠️ Observações:

// * O evento `input` **não detecta ações sem alteração de valor**, como pressionar as setas ← ou →.
// * Não é possível usar `event.preventDefault()` aqui, pois o evento ocorre **após** a mudança.

// ---

// ## ✂️ Eventos: `cut`, `copy`, `paste`

// Esses eventos ocorrem ao **recortar, copiar ou colar** valores nos campos.

// * Eles fazem parte da interface `ClipboardEvent`.
// * Podemos usar `event.preventDefault()` para **bloquear a ação**.
// * O acesso ao conteúdo ocorre via `event.clipboardData`.

// ### Exemplo prático:

// ```html
// <input type="text" id="input">

// <script>
//   input.onpaste = function(event) {
//     alert("Colado: " + event.clipboardData.getData('text/plain'));
//     event.preventDefault();
//   };

//   input.oncut = input.oncopy = function(event) {
//     alert(event.type + ' - ' + document.getSelection());
//     event.preventDefault();
//   };
// </script>
// ```

// ### ℹ️ Importante:

// * Durante `cut` e `copy`, `event.clipboardData.getData(...)` pode retornar **string vazia** — pois os dados **ainda não foram copiados**.
// * Por isso, usamos `document.getSelection()` para obter o texto selecionado.

// ---

// ## 📁 Colando arquivos, imagens e mais

// A área de transferência (`clipboardData`) permite **copiar/colar qualquer tipo de dado**, não apenas texto — inclusive **arquivos**, **imagens**, etc.

// Isso é possível porque `clipboardData` usa a interface `DataTransfer`, também usada para **drag and drop**.

// Para interações mais avançadas, existe a API moderna:
// 🔒 `navigator.clipboard`, que funciona com **permissões** e **de forma assíncrona** (exceto no Firefox).

// ---

// ## 🔒 Restrições de segurança

// Como a área de transferência é um recurso global do sistema operacional:

// * Navegadores **só permitem acesso durante ações do usuário**, como copiar/colar.
// * Não é permitido **disparar eventos personalizados de clipboard** via `dispatchEvent`, exceto no Firefox.
// * Tentativas de guardar `event.clipboardData` e usar depois **não funcionarão**.

// A alternativa moderna é usar:

// ```js
// navigator.clipboard.readText()
// navigator.clipboard.writeText("texto")
// ```

// Mas a API solicita permissão ao usuário.

// ---

// ## ✅ Resumo

// | Evento               | Descrição                          | Observações                                                                         |
// | -------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
// | `change`             | Valor foi alterado e confirmado.   | Em inputs de texto, ocorre ao perder o foco.                                        |
// | `input`              | Valor foi modificado.              | Disparado imediatamente após qualquer mudança.                                      |
// | `cut`/`copy`/`paste` | Ações de recortar, copiar e colar. | Permitem bloquear com `preventDefault`. Acesso aos dados via `event.clipboardData`. |

// > ⚠️ Use `input` para acompanhar alterações em tempo real, `change` para confirmar mudanças e os eventos de clipboard para controlar o comportamento de copiar/colar.

// ---

// Se quiser, posso preparar um exemplo interativo com todos esses eventos funcionando juntos num formulário real. Deseja?
