// Aqui está **toda a explicação traduzida e adaptada para o português** sobre **estilização no Shadow DOM**, com exemplos práticos e comentários claros:

// ---

// ## 🌑 Shadow DOM: Estilização

// O **Shadow DOM** pode conter estilos locais através das tags `<style>` ou `<link rel="stylesheet" href="…">`. Quando usamos `<link>`, as folhas de estilo são armazenadas em cache (HTTP cache), o que evita o download repetido quando múltiplos componentes usam o mesmo template.

// ### ⚙️ Regras gerais:

// * **Estilos locais** (dentro do Shadow DOM) afetam **apenas** o conteúdo do shadow.
// * **Estilos do documento** (fora do Shadow DOM) afetam apenas o que está **fora** do shadow.

// Mas há exceções e formas específicas de **interação entre estilos internos e externos**. Vamos a elas:

// ---

// ## 🧩 `:host` – Estilizando o próprio componente

// O seletor `:host` permite estilizar o **elemento que contém o Shadow DOM**, ou seja, o próprio custom element.

// ### Exemplo: Centralizando um `<custom-dialog>` com `:host`

// ```html
// <template id="tmpl">
//   <style>
//     :host {
//       position: fixed;
//       left: 50%;
//       top: 50%;
//       transform: translate(-50%, -50%);
//       display: inline-block;
//       border: 1px solid red;
//       padding: 10px;
//     }
//   </style>
//   <slot></slot>
// </template>

// <script>
// customElements.define('custom-dialog', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
//   }
// });
// </script>

// <custom-dialog>Hello!</custom-dialog>
// ```

// O componente é estilizado de dentro do Shadow DOM via `:host`.

// ---

// ### 🧬 Cascata (cascading)

// O host (ex: `<custom-dialog>`) **ainda está no DOM principal**, então os estilos externos **também se aplicam**.

// > Se um estilo está definido tanto no `:host` quanto no CSS externo, **o CSS do documento tem prioridade**, a não ser que `!important` seja usado no estilo interno.

// ```css
// /* Estilo externo */
// custom-dialog {
//   padding: 0;
// }
// ```

// ---

// ### 🎯 `:host(selector)`

// Permite aplicar estilos ao host **apenas se ele corresponder a um seletor**.

// ```html
// <template id="tmpl">
//   <style>
//     :host([centered]) {
//       position: fixed;
//       left: 50%;
//       top: 50%;
//       transform: translate(-50%, -50%);
//       border-color: blue;
//     }

//     :host {
//       display: inline-block;
//       border: 1px solid red;
//       padding: 10px;
//     }
//   </style>
//   <slot></slot>
// </template>
// ```

// Assim, o componente `<custom-dialog centered>` será centralizado, mas `<custom-dialog>` simples, não.

// ---

// ## 🎰 Estilizando conteúdo **slotted**

// Os elementos que vêm do light DOM (fora do Shadow) **entram nos `<slot>`**, mas **não herdam estilos locais** do shadow por padrão.

// ### Exemplo:

// ```html
// <style>
//   span { font-weight: bold; }
// </style>

// <user-card>
//   <div slot="username"><span>John Smith</span></div>
// </user-card>
// ```

// ```js
// customElements.define('user-card', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `
//       <style>
//         span { background: red; }
//       </style>
//       Name: <slot name="username"></slot>
//     `;
//   }
// });
// ```

// > Resultado: o texto fica em **negrito** (por estilo externo), mas **não fica com fundo vermelho** (estilo local do Shadow DOM).

// ---

// ### 🧩 Solução 1: Estilo no próprio `<slot>`

// ```html
// <style>
//   slot[name="username"] { font-weight: bold; }
// </style>
// ```

// Algumas propriedades como `font-weight` são **herdadas**, então isso funciona.

// ---

// ### 🧩 Solução 2: `::slotted(selector)`

// ```css
// ::slotted(div) {
//   border: 1px solid red;
// }
// ```

// * **`::slotted(div)`** aplica o estilo ao elemento `<div slot="username">`
// * Mas **não consegue atingir os filhos** (como `<div span>` ou `div > p`)

// ⚠️ **Limitações** do `::slotted`:

// * Só alcança o **elemento slotted direto**
// * Não pode ir "mais fundo" no light DOM
// * Não pode ser usado em `querySelector`

// ---

// ## 🧪 Estilização via **CSS Custom Properties**

// Podemos permitir que estilos sejam controlados **de fora** usando **variáveis CSS** (ex: `--nome-do-estilo`). Isso age como uma “API de estilo”.

// ### Exemplo:

// ```css
// /* Estilo externo */
// user-card {
//   --user-card-field-color: green;
// }
// ```

// ```html
// <template id="tmpl">
//   <style>
//     .field {
//       color: var(--user-card-field-color, black);
//     }
//   </style>
//   <div class="field">Name: <slot name="username"></slot></div>
//   <div class="field">Birthday: <slot name="birthday"></slot></div>
// </template>
// ```

// Assim, o componente pode ser personalizado **sem alterar seu código interno**.

// ---

// ## 📌 Resumo

// ### ✅ O que estilos **locais** podem afetar:

// * Todo conteúdo **dentro do Shadow DOM**
// * O host via `:host` ou `:host(selector)`
// * Elementos slotted via `::slotted(selector)` (limitado ao primeiro nível)

// ### ✅ O que estilos **externos (documento)** podem afetar:

// * O host (ex: `<custom-dialog>`)
// * Conteúdo que foi slotted (pois ainda está no light DOM)

// ### 📊 Prioridade:

// * Estilos do documento vencem os do shadow, **exceto** se o estilo local tiver `!important`.

// ### 🎨 CSS Custom Properties:

// * **Passam por todo o Shadow DOM**
// * Funcionam como **“ganchos de estilo” públicos** dos componentes
// * Podem ser documentadas como parte da API do componente

// ---

// Se quiser, posso preparar um **PDF completo** com todos os capítulos traduzidos e diagramados. Deseja isso?
