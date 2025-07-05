// Aqui está um **resumo completo e organizado** da introdução aos **eventos no navegador com JavaScript**, baseado no conteúdo que você forneceu:

// ---

// ## 📢 Introdução aos Eventos no Navegador

// ### 🔔 O que é um evento?

// Um **evento** é um sinal de que algo aconteceu (ex: clique do mouse, tecla pressionada, formulário enviado etc).
// Quase todos os elementos do DOM geram eventos — e podemos reagir a eles com **funções chamadas *event handlers***.

// ---

// ## 📋 Tipos Comuns de Eventos

// ### 🖱️ Eventos do mouse:

// * `click` – clique comum
// * `contextmenu` – clique direito
// * `mouseover` / `mouseout` – mouse entra / sai do elemento
// * `mousedown` / `mouseup` – botão do mouse pressionado / solto
// * `mousemove` – movimento do mouse

// ### ⌨️ Eventos de teclado:

// * `keydown` / `keyup` – tecla pressionada / solta

// ### 📄 Eventos de formulário:

// * `submit` – formulário enviado
// * `focus` – elemento ganhou foco (ex: `input`)

// ### 🧱 Eventos do documento:

// * `DOMContentLoaded` – HTML carregado e DOM construído

// ### 🎨 Eventos de CSS:

// * `transitionend` – fim de uma transição CSS

// ---

// ## 🧑‍💻 Como adicionar handlers (manipuladores)

// ### 1. Via atributo HTML:

// ```html
// <input type="button" onclick="alert('Clique!')" value="Clique aqui">
// ```

// > ⚠️ Cuidado com aspas dentro do atributo!

// Você também pode chamar uma função:

// ```html
// <input type="button" onclick="dizerOi()" value="Clique">
// <script>
//   function dizerOi() {
//     alert("Oi!");
//   }
// </script>
// ```

// ---

// ### 2. Via propriedade DOM:

// ```html
// <input id="btn" type="button" value="Clique aqui">
// <script>
//   btn.onclick = function() {
//     alert("Obrigado!");
//   };
// </script>
// ```

// > ⚠️ Apenas **um handler** pode ser atribuído por propriedade DOM. O novo substitui o antigo.

// ---

// ### 3. Via `addEventListener` (modo recomendado):

// ```js
// btn.addEventListener("click", () => {
//   alert("Olá!");
// });
// ```

// ✅ Permite **vários handlers** para o mesmo evento.

// #### Opções extras:

// ```js
// element.addEventListener("click", handler, {
//   once: true,      // dispara uma vez só
//   capture: false,  // captura (veremos depois)
//   passive: true    // não chama preventDefault()
// });
// ```

// ### ❌ Erros comuns:

// ```js
// btn.onclick = minhaFuncao(); // errado — executa na hora
// btn.onclick = minhaFuncao;   // certo — referência à função
// ```

// ---

// ## 🧹 Remover event handler

// Somente funciona se a **mesma função** for passada:

// ```js
// function dizerOi() {
//   alert("Oi!");
// }
// btn.addEventListener("click", dizerOi);

// // mais tarde...
// btn.removeEventListener("click", dizerOi); // funciona
// ```

// ```js
// btn.removeEventListener("click", () => alert("Oi")); // ❌ diferente função
// ```

// ---

// ## 🎯 O objeto `event`

// Quando um evento acontece, um objeto `event` é passado ao handler com **informações úteis**:

// ```js
// btn.onclick = function(event) {
//   alert(event.type);          // tipo (ex: "click")
//   alert(event.currentTarget); // elemento que recebeu o evento
//   alert(event.clientX);       // posição X do cursor
//   alert(event.clientY);       // posição Y do cursor
// };
// ```

// ✅ Mesmo com `onclick="..."`, você pode usar `event`:

// ```html
// <input onclick="alert(event.type)" type="button" value="Teste">
// ```

// ---

// ## 🧱 Objetos com `handleEvent()`

// Você pode passar um objeto como handler:

// ```js
// const obj = {
//   handleEvent(event) {
//     alert(event.type + " no " + event.currentTarget.id);
//   }
// };

// elem.addEventListener("click", obj);
// ```

// Também funciona com classes:

// ```js
// class Menu {
//   handleEvent(event) {
//     if (event.type === 'mousedown') {
//       elem.innerHTML = "Pressionou o mouse";
//     } else if (event.type === 'mouseup') {
//       elem.innerHTML += "... e soltou.";
//     }
//   }
// }

// const menu = new Menu();
// elem.addEventListener("mousedown", menu);
// elem.addEventListener("mouseup", menu);
// ```

// ---

// ## ✅ Resumo Final

// | Forma                  | Vantagens                    | Desvantagens                         |
// | ---------------------- | ---------------------------- | ------------------------------------ |
// | `onclick="..."`        | Simples, rápido              | Mistura JS com HTML, código limitado |
// | `element.onclick = fn` | Fácil de usar                | Permite apenas **um handler**        |
// | `addEventListener`     | Flexível, múltiplos handlers | Sintaxe mais longa                   |

// 💡 **Sempre que possível, prefira `addEventListener`**, por ser mais moderno e poderoso.

// ---

// Se quiser, posso gerar uma **tabela PDF interativa**, uma página HTML com exemplos práticos ou exercícios sobre eventos. Deseja?
