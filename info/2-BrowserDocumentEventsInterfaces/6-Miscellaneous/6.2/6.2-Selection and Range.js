// # Seleção e Range (Intervalo)

// Neste capítulo, vamos explorar a seleção em documentos, bem como em campos de formulário, como `<input>`.

// O JavaScript pode acessar seleções existentes, selecionar/deselecionar nós DOM inteiros ou parciais, remover o conteúdo selecionado do documento, envolvê-lo em uma tag e muito mais.

// ### Conceito básico: `Range`

// O objeto `Range` representa um intervalo com dois pontos: início e fim.

// ```js
// let range = new Range();
// range.setStart(node, offset);
// range.setEnd(node, offset);
// ```

// Se o `node` for de texto, o `offset` é a posição dentro do texto. Se for um elemento, o `offset` representa o índice dos filhos.

// ### Exemplo: Selecionar "ll" em "Hello"

// ```html
// <p id="p">Hello</p>
// <script>
//   let range = new Range();
//   range.setStart(p.firstChild, 2);
//   range.setEnd(p.firstChild, 4);
//   console.log(range.toString()); // "ll"
// </script>
// ```

// ### Exemplo: Selecionar elementos inteiros

// ```html
// <p id="p">Exemplo: <i>itálico</i> e <b>negrito</b></p>
// <script>
//   let range = new Range();
//   range.setStart(p, 0);
//   range.setEnd(p, 2);
//   document.getSelection().addRange(range);
// </script>
// ```

// ### Seleção entre nós diferentes

// ```js
// range.setStart(p.firstChild, 2);
// range.setEnd(p.querySelector('b').firstChild, 3);
// console.log(range.toString()); // "emplo: itálico e neg"
// ```

// ### Propriedades do `Range`

// * `startContainer`, `startOffset`
// * `endContainer`, `endOffset`
// * `collapsed` (booleano)
// * `commonAncestorContainer`

// ### Métodos de `Range`

// * `setStart`, `setEnd`
// * `setStartBefore`, `setStartAfter`
// * `selectNode`, `selectNodeContents`
// * `collapse()`, `cloneRange()`
// * `deleteContents()`, `extractContents()`, `cloneContents()`
// * `insertNode(node)`, `surroundContents(node)`

// ### Exemplo: Testar métodos de edição

// ```js
// range.deleteContents();
// range.extractContents();
// range.cloneContents();
// range.insertNode(document.createElement("u"));
// range.surroundContents(document.createElement("u"));
// ```

// ---

// ## `Selection`

// O objeto `Selection` representa a seleção visual feita na tela e é obtido com `window.getSelection()` ou `document.getSelection()`.

// ### Propriedades:

// * `anchorNode`, `anchorOffset` (início)
// * `focusNode`, `focusOffset` (fim)
// * `isCollapsed`
// * `rangeCount`

// ### Diferença entre `Selection` e `Range`

// Seleções podem ser feitas em qualquer direção (esquerda-direita ou direita-esquerda), enquanto `Range` sempre vai do início para o fim.

// ### Eventos de seleção

// * `onselectstart` em elementos
// * `document.onselectionchange`

// ### Exemplo: monitorar seleção

// ```js
// document.onselectionchange = function() {
//   let sel = document.getSelection();
//   console.log(sel.anchorNode, sel.anchorOffset);
//   console.log(sel.focusNode, sel.focusOffset);
// };
// ```

// ### Copiando seleção

// * Como texto: `document.getSelection().toString()`
// * Como DOM: `selection.getRangeAt(0).cloneContents()`

// ### Métodos de `Selection`

// * `getRangeAt(i)`, `addRange(range)`, `removeRange(range)`, `removeAllRanges()`, `empty()`
// * `collapse(node, offset)`, `setPosition(node, offset)`
// * `collapseToStart()`, `collapseToEnd()`
// * `extend(node, offset)`
// * `setBaseAndExtent(...)`
// * `selectAllChildren(node)`
// * `deleteFromDocument()`
// * `containsNode(node, allowPartialContainment)`

// ---

// ## Seleção em `<input>` e `<textarea>`

// Não usam `Selection`/`Range`, pois lidam apenas com texto puro.

// ### Propriedades:

// * `input.selectionStart`, `input.selectionEnd`, `input.selectionDirection`

// ### Eventos:

// * `input.onselect`

// ### Métodos:

// * `input.select()`
// * `input.setSelectionRange(start, end, direction)`
// * `input.setRangeText(text, [start], [end], [mode])`

// #### Modos de `setRangeText`:

// * `"select"`, `"start"`, `"end"`, `"preserve"`

// ### Exemplo: monitorar seleção

// ```js
// area.onselect = () => {
//   from.value = area.selectionStart;
//   to.value = area.selectionEnd;
// };
// ```

// ### Exemplo: mover cursor

// ```js
// area.selectionStart = area.selectionEnd = 10;
// ```

// ### Exemplo: substituir texto

// ```js
// input.setRangeText(`*${selected}*`);
// ```

// ### Exemplo: inserir no cursor

// ```js
// input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
// ```

// ---

// ## Tornar algo não selecionável

// 1. CSS: `user-select: none`
// 2. `onselectstart` retornando `false`
// 3. Limpar seleção com `getSelection().empty()` (evite piscadas)

// ---

// ## Resumo

// Duas APIs para seleção:

// * Para documentos: `Selection` e `Range`
// * Para `input` e `textarea`: propriedades e métodos próprios

// ### Exemplo comum: clonar seleção DOM

// ```js
// let selection = document.getSelection();
// for (let i = 0; i < selection.rangeCount; i++) {
//   destino.append(selection.getRangeAt(i).cloneContents());
// }
// ```

// ### Exemplo comum: definir seleção

// ```js
// let selection = document.getSelection();
// selection.removeAllRanges();
// selection.addRange(range);
// ```

// ### Exemplo: controlar cursor

// ```js
// input.selectionStart = input.selectionEnd = 15;
// ```

// ---

// ## Referências

// * [DOM Range API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Range)
// * [Selection API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Selection)
// * [HTML spec - Text Selection APIs](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)

// ---

// Se quiser exemplos visuais ou interativos para praticar esses conceitos, posso montar para você!
