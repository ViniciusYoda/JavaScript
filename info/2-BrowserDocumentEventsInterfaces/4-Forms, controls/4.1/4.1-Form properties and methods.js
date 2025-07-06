// Aqui está a **versão em português** do conteúdo completo sobre **propriedades e métodos de formulários**:

// ---

// ## 📝 Propriedades e Métodos de Formulários

// Formulários e elementos de controle, como `<input>`, possuem **várias propriedades e eventos especiais**.

// Trabalhar com formulários se torna **muito mais fácil** ao conhecer essas funcionalidades.

// ---

// ## 🔄 Navegação: `form` e `elements`

// Todos os formulários da página estão disponíveis em `document.forms`.

// Essa é uma **coleção nomeada** (named collection): podemos acessar os formulários **pelo nome** ou pela **posição (índice)**.

// ```js
// document.forms.meuFormulario; // formulário com name="meuFormulario"
// document.forms[0]; // primeiro formulário do documento
// ```

// Dentro de um formulário, qualquer campo pode ser acessado com `form.elements`.

// ### Exemplo:

// ```html
// <form name="meuFormulario">
//   <input name="um" value="1">
//   <input name="dois" value="2">
// </form>

// <script>
//   let form = document.forms.meuFormulario;
//   let elem = form.elements.um;

//   alert(elem.value); // 1
// </script>
// ```

// ### Vários campos com o mesmo nome

// Se houver **múltiplos elementos com o mesmo `name`**, como botões de rádio ou checkboxes, então `form.elements[name]` será uma **coleção**.

// ```html
// <form>
//   <input type="radio" name="idade" value="10">
//   <input type="radio" name="idade" value="20">
// </form>

// <script>
//   let form = document.forms[0];
//   let idade = form.elements.idade;

//   alert(idade[0]); // [object HTMLInputElement]
// </script>
// ```

// A estrutura do HTML não interfere: **todos os controles de formulário ficam acessíveis em `form.elements`**, mesmo que estejam aninhados.

// ---

// ## 🧩 Fieldsets como "subformulários"

// Um formulário pode conter `<fieldset>`, que **também possui a propriedade `elements`** com os controles internos.

// ```html
// <form id="form">
//   <fieldset name="usuario">
//     <legend>Informações</legend>
//     <input name="login" type="text">
//   </fieldset>
// </form>

// <script>
//   alert(form.elements.login); // <input name="login">
//   let fieldset = form.elements.usuario;
//   alert(fieldset); // HTMLFieldSetElement
//   alert(fieldset.elements.login == form.elements.login); // true
// </script>
// ```

// ---

// ## ✨ Forma abreviada: `form.nome`

// Também é possível acessar elementos usando `form[nome]` diretamente:

// ```html
// <form id="form">
//   <input name="login">
// </form>

// <script>
//   alert(form.elements.login == form.login); // true

//   form.login.name = "usuario";

//   alert(form.elements.login);     // undefined
//   alert(form.elements.usuario);   // input
//   alert(form.usuario == form.login); // true
// </script>
// ```

// > ⚠️ Mesmo após mudar o `name`, o campo ainda é acessível pelo nome antigo. Isso raramente causa problemas, já que raramente se altera o `name` dinamicamente.

// ---

// ## 🔁 Referência reversa: `element.form`

// Todo campo de formulário possui uma propriedade `.form` que aponta para o formulário ao qual pertence.

// ```html
// <form id="form">
//   <input type="text" name="login">
// </form>

// <script>
//   let login = form.login;
//   alert(login.form); // HTMLFormElement
// </script>
// ```

// ---

// ## 🧩 Elementos de Formulário

// ### `<input>` e `<textarea>`

// * O valor de texto é acessado com `.value`
// * Para checkboxes e radios, usamos `.checked` (booleano)

// ```js
// input.value = "Novo valor";
// textarea.value = "Texto atualizado";
// input.checked = true;
// ```

// > ⚠️ **Nunca use `textarea.innerHTML`** para obter o valor. Use sempre `.value`.

// ---

// ### `<select>` e `<option>`

// Um `<select>` possui:

// * `select.options` → coleção de `<option>`
// * `select.value` → valor do `<option>` selecionado
// * `select.selectedIndex` → índice do `<option>` selecionado

// #### Três formas de selecionar um valor:

// ```js
// select.options[2].selected = true;
// select.selectedIndex = 2;
// select.value = "banana";
// ```

// > Opções começam do índice 0.

// #### Múltiplas opções selecionadas (`multiple`):

// ```html
// <select id="select" multiple>
//   <option value="blues" selected>Blues</option>
//   <option value="rock" selected>Rock</option>
//   <option value="classico">Clássico</option>
// </select>

// <script>
//   let selecionados = Array.from(select.options)
//     .filter(opcao => opcao.selected)
//     .map(opcao => opcao.value);

//   alert(selecionados); // blues,rock
// </script>
// ```

// ---

// ## 🆕 Criando `<option>` com `new Option`

// A forma rápida de criar uma `<option>`:

// ```js
// let opcao = new Option("Texto", "valor", true, true);
// // <option value="valor" selected>Texto</option>
// ```

// Parâmetros:

// * `text`: texto visível
// * `value`: valor enviado
// * `defaultSelected`: define atributo HTML `selected`
// * `selected`: define se a opção está selecionada

// Propriedades de `<option>`:

// * `option.selected` → está selecionada?
// * `option.index` → índice da opção
// * `option.text` → texto exibido

// ---

// ## 📚 Referência

// * Especificação: [https://html.spec.whatwg.org/multipage/forms.html#the-select-element](https://html.spec.whatwg.org/multipage/forms.html#the-select-element)

// ---

// ## ✅ Resumo

// ### Navegação:

// * `document.forms[name/índice]` → acessa formulários
// * `form.elements[name/índice]` → acessa campos do formulário
// * `form[nome]` → forma abreviada
// * `element.form` → acessa o formulário a partir do campo

// ### Valores:

// * `.value` → para inputs, textarea, select
// * `.checked` → para checkbox/radio
// * `.selectedIndex` e `.options` → para `<select>`

// Esses são os fundamentos para manipular formulários.
// No próximo capítulo, aprenderemos sobre os eventos `focus` e `blur`, que são essenciais ao lidar com campos de entrada.

// Se quiser, posso montar um mini formulário com tudo isso funcionando em um exemplo prático. Deseja?
