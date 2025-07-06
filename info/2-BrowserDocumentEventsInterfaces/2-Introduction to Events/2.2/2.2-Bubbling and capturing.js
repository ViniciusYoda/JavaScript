// Aqui está um **resumo completo, organizado e didático** sobre **Bubbling e Capturing** em eventos JavaScript:

// ---

// ## 🔄 Bubbling e Capturing em Eventos DOM

// ### 📌 O que acontece quando um evento ocorre?

// Quando um evento (ex: `click`) ocorre, ele segue uma **trajetória em fases** pela árvore DOM:

// ```
// 1. Fase de Captura (Capturing) – do document até o alvo
// 2. Fase de Alvo (Target) – no elemento onde o evento aconteceu
// 3. Fase de Borbulhamento (Bubbling) – do alvo até o document
// ```

// ---

// ## 🧪 Exemplo visual:

// ```html
// <form onclick="alert('form')">FORM
//   <div onclick="alert('div')">DIV
//     <p onclick="alert('p')">P</p>
//   </div>
// </form>
// ```

// Se clicar em `<p>`, a ordem de alertas será:

// ```
// p → div → form
// ```

// 👉 Esse é o **bubbling**, onde o evento "borbulha" dos elementos internos até os externos.

// ---

// ## 🔁 Bubbling (Borbulhamento)

// * **Padrão** em quase todos os eventos DOM.
// * O evento sobe na hierarquia DOM chamando todos os `event handlers` encontrados no caminho.

// 📌 A maioria dos eventos (como `click`, `keydown`, `submit`) fazem bubbling.
// 🔕 Mas alguns, como `focus` e `blur`, **não** borbulham.

// ---

// ## 🎯 `event.target` vs `this` (ou `event.currentTarget`)

// | Propriedade                     | O que representa                          |
// | ------------------------------- | ----------------------------------------- |
// | `event.target`                  | O **elemento real** que disparou o evento |
// | `this` ou `event.currentTarget` | O **elemento com o handler atual**        |

// ```js
// form.onclick = function(event) {
//   alert("Alvo real: " + event.target.tagName);
//   alert("Handler em: " + this.tagName);
// };
// ```

// ---

// ## 🛑 Parando o Bubbling

// ### 👉 `event.stopPropagation()`

// Impede que o evento suba para elementos ancestrais.

// ```html
// <body onclick="alert('Corpo')">
//   <button onclick="event.stopPropagation()">Clique</button>
// </body>
// ```

// > Clicando no botão, o `onclick` do `<body>` não será executado.

// ---

// ### 👉 `event.stopImmediatePropagation()`

// * Além de parar o bubbling,
// * **impede outros handlers no mesmo elemento** de rodarem.

// ---

// ## ⚠️ Quando **não** usar `stopPropagation`

// Evite usar a menos que seja **realmente necessário**.
// Impede outros códigos (ex: de analytics, tracking ou bibliotecas) de capturarem eventos.

// ---

// ## 👇 Capturing (Captura)

// * Acontece **antes** do evento atingir o alvo.
// * Raramente usada, mas pode ser útil.

// ### ✅ Como usar:

// ```js
// elem.addEventListener("click", handler, { capture: true });
// // ou simplesmente:
// elem.addEventListener("click", handler, true);
// ```

// ### 🧭 Ordem dos eventos:

// Se você clicar em `<p>` dentro de `<div>` dentro de `<form>`:

// ```
// 1. Captura: HTML → BODY → FORM → DIV → P
// 2. Bubbling: P → DIV → FORM → BODY → HTML
// ```

// 📌 O elemento `<p>` aparece **duas vezes** se houver listener em ambas fases.

// ---

// ## 📊 `event.eventPhase` (fase atual)

// | Valor | Fase                     |
// | ----- | ------------------------ |
// | 1     | Captura                  |
// | 2     | Alvo (target)            |
// | 3     | Bubbling (borbulhamento) |

// Geralmente não é usado, pois já sabemos em qual fase estamos baseado no código.

// ---

// ## 🔄 Removendo handlers

// Use a **mesma configuração** da fase ao remover:

// ```js
// elem.addEventListener("click", handler, true);
// elem.removeEventListener("click", handler, true); // ok ✅
// ```

// ---

// ## 📌 Ordem de execução

// Se você adicionar múltiplos listeners para o mesmo evento e fase:

// ```js
// elem.addEventListener("click", () => alert(1));
// elem.addEventListener("click", () => alert(2));
// ```

// Eles serão executados **na ordem em que foram adicionados**.

// ---

// ## ✅ Resumo

// | Conceito                           | Descrição                                               |
// | ---------------------------------- | ------------------------------------------------------- |
// | `event.target`                     | Elemento mais interno que iniciou o evento              |
// | `event.currentTarget`              | Elemento que está processando o evento                  |
// | `event.stopPropagation()`          | Para o bubbling                                         |
// | `event.stopImmediatePropagation()` | Para o bubbling **e** outros handlers no mesmo elemento |
// | Captura (`capture: true`)          | Executa o handler **na ida**                            |
// | Bubbling (padrão)                  | Executa o handler **na volta**                          |
// | `event.eventPhase`                 | Informa em qual fase o evento está (1, 2, 3)            |

// ---

// ## 🧠 Dica Final

// > Use bubbling por padrão — é mais natural e previsível.
// > Capturing só quando precisar de controle antes do evento atingir o elemento alvo.

// ---

// Se quiser, posso criar um **exercício prático com HTML/JS**, gerar um infográfico com o fluxo dos eventos, ou preparar **exemplos interativos com capture/bubbling** para você testar. Deseja algum desses?
