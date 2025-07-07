// ## Shadow DOM: Slots e Composição

// Muitos componentes como abas, menus, galerias de imagens e outros precisam de conteúdo para renderizar.

// Assim como o elemento do navegador `<select>` espera elementos `<option>`, um componente `<menu-personalizado>` pode esperar os itens do menu. Exemplo:

// ```html
// <menu-personalizado>
//   <titulo>Menu de Doces</titulo>
//   <item>Pirulito</item>
//   <item>Torrada de Frutas</item>
//   <item>Bolo de Copo</item>
// </menu-personalizado>
// ```

// Nosso componente deve renderizar isso corretamente, estilizar, lidar com eventos, etc.

// ### Usando `<slot>`

// O Shadow DOM oferece suporte ao elemento `<slot>`, que é preenchido automaticamente com o conteúdo do Light DOM (conteúdo "externo" do componente).

// #### Slots nomeados

// ```html
// <script>
// customElements.define('cartao-usuario', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.innerHTML = `
//       <div>Nome:
//         <slot name="nome"></slot>
//       </div>
//       <div>Aniversário:
//         <slot name="aniversario"></slot>
//       </div>
//     `;
//   }
// });
// </script>

// <cartao-usuario>
//   <span slot="nome">João Silva</span>
//   <span slot="aniversario">01/01/2001</span>
// </cartao-usuario>
// ```

// Para cada `<slot name="X">` no Shadow DOM, o navegador procura um elemento com `slot="X"` no Light DOM e o insere no lugar.

// Esse processo de "composição" forma o DOM "achatado" (flattened DOM), que é usado para renderização e eventos.

// > O DOM real não muda, os elementos não são fisicamente movidos, apenas representados visualmente nos slots.

// #### Somente filhos diretos

// Atributos `slot="..."` só funcionam para **filhos diretos** do componente. Elementos aninhados são ignorados.

// #### Vários elementos no mesmo slot

// Se vários elementos compartilham o mesmo nome de slot, são inseridos em sequência.

// ```html
// <cartao-usuario>
//   <span slot="nome">João</span>
//   <span slot="nome">Silva</span>
// </cartao-usuario>
// ```

// #### Conteúdo padrão do slot

// Podemos adicionar conteúdo padrão dentro do `<slot>`:

// ```html
// <slot name="nome">Anônimo</slot>
// ```

// Esse conteúdo será mostrado **caso nenhum elemento com `slot="nome"` seja fornecido**.

// #### Slot padrão (sem nome)

// O primeiro `<slot>` sem nome é o slot padrão. Ele recebe todo o conteúdo não alocado em outros slots.

// ```html
// <cartao-usuario>
//   <div>Gosto de nadar.</div>
//   <span slot="nome">João Silva</span>
//   <span slot="aniversario">01/01/2001</span>
//   <div>...E de jogar vôlei também!</div>
// </cartao-usuario>
// ```

// ### Exemplo prático: Menu

// ```html
// <menu-personalizado>
//   <span slot="titulo">Menu de Doces</span>
//   <li slot="item">Pirulito</li>
//   <li slot="item">Torrada de Frutas</li>
//   <li slot="item">Bolo de Copo</li>
// </menu-personalizado>
// ```

// Template do Shadow DOM:

// ```html
// <template id="modelo">
//   <style> /* estilos */ </style>
//   <div class="menu">
//     <slot name="titulo"></slot>
//     <ul><slot name="item"></slot></ul>
//   </div>
// </template>
// ```

// Comportamento:

// * Vários `<li slot="item">` serão inseridos no slot `item` sequencialmente.

// Comportamento de clique:

// ```javascript
// customElements.define('menu-personalizado', class extends HTMLElement {
//   connectedCallback() {
//     this.attachShadow({mode: 'open'});
//     this.shadowRoot.append(modelo.content.cloneNode(true));

//     this.shadowRoot.querySelector('slot[name="titulo"]').onclick = () => {
//       this.shadowRoot.querySelector('.menu').classList.toggle('fechado');
//     };
//   }
// });
// ```

// ### Atualização dinâmica e evento `slotchange`

// Mudanças no Light DOM são refletidas automaticamente no slot. Para reagir a essas mudanças:

// ```javascript
// this.shadowRoot.querySelector('slot[name="item"]').addEventListener('slotchange', e => {
//   console.log("Itens atualizados:", e.target.assignedElements());
// });
// ```

// ### API dos Slots

// * `node.assignedSlot` – retorna o `<slot>` ao qual o node está atribuído.
// * `slot.assignedNodes({flatten: true/false})` – retorna os nodes atribuídos ao slot.
// * `slot.assignedElements({flatten: true/false})` – retorna apenas os elementos.

// Esses métodos são úteis para gerenciar conteúdo dentro do componente.

// ### Resumo

// * Slots permitem exibir conteúdo externo (Light DOM) dentro do Shadow DOM.
// * `<slot name="..."></slot>` recebe elementos com `slot="..."`.
// * Primeiro `<slot>` sem nome recebe os elementos não atribuídos.
// * Vários elementos com o mesmo slot são inseridos em sequência.
// * O conteúdo dentro de `<slot>` funciona como fallback.
// * A "composição" visual é feita pelo navegador (DOM achatado), sem alterar a estrutura real do DOM.
// * Podemos acompanhar atualizações com o evento `slotchange` e a API dos slots.

// No próximo capítulo, veremos como **estilizar corretamente** elementos do Light DOM e do Shadow DOM.
