// Aqui está a **versão em português** do conteúdo completo sobre **foco: eventos `focus` e `blur`**:

// ---

// ## 🔍 Foco: `focus` / `blur`

// Um elemento recebe **foco** quando o usuário clica nele ou navega até ele usando a tecla **Tab**.
// Também é possível definir o foco automaticamente com o atributo HTML `autofocus` ou via JavaScript.

// Receber foco geralmente significa: "**pronto para receber dados**", o que pode ser o momento ideal para rodar alguma lógica de inicialização.

// Perder o foco (evento `blur`) geralmente indica: "**entrada finalizada**", e podemos validar ou salvar os dados, por exemplo.

// Há particularidades importantes ao trabalhar com foco, que veremos a seguir.

// ---

// ## 🎯 Eventos `focus` e `blur`

// * `focus` ocorre **ao focar** o elemento.
// * `blur` ocorre **ao perder o foco**.

// ### Exemplo de validação de email:

// ```html
// <style>
//   .invalid { border-color: red; }
//   #error { color: red }
// </style>

// Seu email: <input type="email" id="input">
// <div id="error"></div>

// <script>
// input.onblur = function() {
//   if (!input.value.includes('@')) {
//     input.classList.add('invalid');
//     error.innerHTML = 'Por favor, insira um email válido.';
//   }
// };

// input.onfocus = function() {
//   if (this.classList.contains('invalid')) {
//     this.classList.remove('invalid');
//     error.innerHTML = '';
//   }
// };
// </script>
// ```

// > ⚠️ HTML moderno já permite validações com `required`, `pattern`, etc.
// > Use JavaScript quando precisar de **maior flexibilidade**.

// ---

// ## 📌 Métodos `focus()` e `blur()`

// * `elem.focus()` → aplica o foco ao elemento.
// * `elem.blur()` → remove o foco do elemento.

// ### Exemplo: impedir que o usuário saia do campo sem digitar um email válido:

// ```html
// <style>
//   .error { background: red; }
// </style>

// Seu email: <input type="email" id="input">
// <input type="text" placeholder="Tente focar aqui sem email válido">

// <script>
// input.onblur = function() {
//   if (!this.value.includes('@')) {
//     this.classList.add("error");
//     input.focus(); // força o foco de volta
//   } else {
//     this.classList.remove("error");
//   }
// };
// </script>
// ```

// > ❗ Não é possível impedir `blur` com `event.preventDefault()`, pois ele ocorre **depois** da perda de foco.

// Use com cuidado. Evitar a navegação do usuário pode ser irritante. Prefira exibir mensagens e **permitir que o usuário continue preenchendo** os demais campos.

// ---

// ## 💡 Perda de foco iniciada por JavaScript

// Além do clique ou Tab, o foco pode ser perdido por causas indiretas:

// * Um `alert()` tira o foco do campo e o retorna depois que é fechado.
// * Remover o elemento do DOM causa perda de foco. Se o campo for reinserido, o foco não volta automaticamente.

// Esses comportamentos podem gerar problemas com os eventos `focus` / `blur`.
// ⚠️ Seja cauteloso ao usá-los para evitar comportamentos indesejados.

// ---

// ## 📌 Torne qualquer elemento focável: `tabindex`

// Por padrão, **nem todos os elementos podem receber foco**.

// Elementos interativos como `<button>`, `<input>`, `<select>`, `<a>` **podem**.

// Elementos como `<div>`, `<span>`, `<table>` **não podem**, a menos que tenham o atributo `tabindex`.

// ### Funcionamento do `tabindex`:

// * `tabindex="1"`, `tabindex="2"` → define ordem de navegação com Tab.
// * `tabindex="0"` → torna o elemento focável **na ordem padrão** do documento.
// * `tabindex="-1"` → focável **apenas via JavaScript** (`.focus()`), não com Tab.

// ### Exemplo:

// ```html
// <ul>
//   <li tabindex="1">Um</li>
//   <li tabindex="0">Zero</li>
//   <li tabindex="2">Dois</li>
//   <li tabindex="-1">Menos um</li>
// </ul>

// <style>
//   li { cursor: pointer; }
//   :focus { outline: 1px dashed green; }
// </style>
// ```

// > Ordem ao pressionar Tab: 1 → 2 → 0.
// > O item com `tabindex="-1"` **não recebe foco com Tab**, apenas com JavaScript.

// ### Em JavaScript: `elem.tabIndex`

// Também é possível definir programaticamente:

// ```js
// elemento.tabIndex = 2;
// ```

// ---

// ## 🎯 Delegação com `focusin` / `focusout`

// Os eventos `focus` e `blur` **não propagam (bubble)**.

// ### Exemplo **que NÃO funciona**:

// ```html
// <form onfocus="this.className='focused'">
//   <input name="nome" type="text">
//   <input name="sobrenome" type="text">
// </form>

// <style>
//   .focused { outline: 1px solid red; }
// </style>
// ```

// > O `form` **não recebe o evento**, apenas o `<input>`.

// ### Solução 1: usar **fase de captura**

// ```js
// form.addEventListener("focus", () => form.classList.add('focused'), true);
// form.addEventListener("blur", () => form.classList.remove('focused'), true);
// ```

// > O `true` final ativa a **captura**, funcionando mesmo sem bubbling.

// ### Solução 2: usar `focusin` / `focusout`

// Eles **propagam normalmente**, mas devem ser registrados com `addEventListener`:

// ```js
// form.addEventListener("focusin", () => form.classList.add('focused'));
// form.addEventListener("focusout", () => form.classList.remove('focused'));
// ```

// ---

// ## ✅ Resumo

// * Eventos `focus` e `blur` ocorrem quando o elemento **recebe/perde foco**.
// * **Não propagam (não têm bubbling)**. Use:

//   * Fase de **captura** (`true` no `addEventListener`)
//   * Ou os eventos alternativos: `focusin` / `focusout`.
// * Use `tabindex` para tornar qualquer elemento focável.
// * O elemento atualmente focado está disponível em:

//   ```js
//   document.activeElement
//   ```

// ---

// Se quiser, posso montar um exemplo prático com validação completa usando `focus`, `blur`, `focusin`, `tabindex` e até envio automático ao servidor. Deseja?
