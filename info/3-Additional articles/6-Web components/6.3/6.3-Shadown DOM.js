// Claro! Aqui está a **tradução e adaptação completa para o português** do conteúdo sobre **Shadow DOM (DOM Sombra)**:

// ---

// ## Shadow DOM (DOM Sombra)

// O **Shadow DOM** serve para **encapsulamento**. Ele permite que um componente tenha sua própria árvore DOM “sombra”, que:

// * Não pode ser acessada acidentalmente pelo restante do documento,
// * Pode ter estilos locais,
// * E muito mais.

// ---

// ### Shadow DOM interno (nativo)

// Você já se perguntou como os controles dos navegadores são criados e estilizados?

// Por exemplo, `<input type="range">` (um controle deslizante):

// ➡️ O navegador usa DOM e CSS internamente para renderizá-lo.
// Essa estrutura DOM é normalmente oculta de nós, mas pode ser vista nas ferramentas de desenvolvedor (DevTools).

// No **Chrome**, por exemplo, você precisa ativar a opção:

// > **"Show user agent shadow DOM"** (Mostrar DOM sombra do agente do usuário)

// Aí o `<input type="range">` se parece com isso:

// *(imagem corrompida)*

// O que aparece dentro de `#shadow-root` é o chamado **"Shadow DOM"**.

// Esses elementos do DOM sombra **não podem ser acessados via JavaScript comum ou seletores**. Eles não são filhos normais, mas sim parte de uma poderosa técnica de encapsulamento.

// Nesse exemplo, vemos também um atributo útil chamado `pseudo`, que é **não padronizado** (existe por motivos históricos). Podemos usá-lo para estilizar partes internas com CSS, como:

// ```css
// /* deixa a faixa do controle deslizante vermelha */
// input::-webkit-slider-runnable-track {
//   background: red;
// }
// ```

// ⚠️ Esse atributo é experimental. Os navegadores começaram a usar estruturas DOM internas antes do Shadow DOM ser padronizado.

// Hoje usamos o padrão moderno do Shadow DOM, conforme especificado na especificação DOM.

// ---

// ## Árvore Sombra

// Um elemento DOM pode ter dois tipos de subárvores:

// * **Árvore "light" (leve)** – DOM tradicional, formado pelos filhos definidos no HTML.
// * **Árvore "shadow" (sombra)** – DOM oculto, **não refletido no HTML**, escondido do restante do documento.

// Se um elemento tiver ambas, o navegador **renderiza apenas a árvore sombra**. Mas é possível compor as duas (veremos isso no capítulo sobre slots).

// A árvore sombra pode ser usada com **elementos personalizados** para esconder a estrutura interna e aplicar estilos locais.

// ---

// ### Exemplo: `<mostrar-ola>`

// ```html
// <script>
// customElements.define('mostrar-ola', class extends HTMLElement {
//   connectedCallback() {
//     const sombra = this.attachShadow({mode: 'open'});
//     sombra.innerHTML = `<p>Olá, ${this.getAttribute('name')}</p>`;
//   }
// });
// </script>

// <mostrar-ola name="João"></mostrar-ola>
// ```

// 💡 Resultado no Chrome DevTools: o conteúdo fica sob `#shadow-root`.

// #### A chamada:

// ```js
// elem.attachShadow({mode: 'open'})
// ```

// ...cria a árvore sombra.

// ---

// ### Restrições:

// 1. **Apenas um shadow root por elemento.**
// 2. O elemento deve ser personalizado ou um dos seguintes:
//    `article`, `aside`, `blockquote`, `body`, `div`, `footer`, `h1–h6`, `header`, `main`, `nav`, `p`, `section`, ou `span`.
//    Tags como `<img>` **não podem** hospedar um shadow root.

// ---

// ### O parâmetro `mode` define o nível de encapsulamento:

// * `"open"` → acessível via `elem.shadowRoot`
// * `"closed"` → `elem.shadowRoot` sempre será `null`
//   (só pode ser acessado pela referência retornada por `attachShadow`)

// 💡 O Shadow DOM nativo de elementos como `<input type="range">` é do tipo **"closed"** – **não há como acessá-lo.**

// ---

// ### Shadow root funciona como um elemento:

// Podemos usar `innerHTML`, `append`, `querySelector`, etc.

// ```js
// elem.shadowRoot.innerHTML = '<p>Olá</p>';
// alert(elem.shadowRoot.host === elem); // true
// ```

// ---

// ## Encapsulamento

// O Shadow DOM é fortemente isolado do documento principal:

// * Elementos dentro do shadow **não são visíveis por seletores como `querySelector` no documento principal**.
// * IDs podem se repetir dentro e fora da sombra, pois são únicos apenas dentro do shadow.
// * **Estilos externos não se aplicam** ao conteúdo do shadow.

// ---

// ### Exemplo:

// ```html
// <style>
//   /* Este estilo NÃO afeta o shadow DOM */
//   p { color: red; }
// </style>

// <div id="elem"></div>

// <script>
//   elem.attachShadow({mode: 'open'});
//   elem.shadowRoot.innerHTML = `
//     <style> p { font-weight: bold; } </style>
//     <p>Olá, João!</p>
//   `;

//   alert(document.querySelectorAll('p').length); // 0
//   alert(elem.shadowRoot.querySelectorAll('p').length); // 1
// </script>
// ```

// * O estilo do documento **não afeta** o shadow.
// * O estilo definido **dentro** do shadow funciona normalmente.
// * Para acessar elementos do shadow, usamos `elem.shadowRoot.querySelector`.

// ---

// ## Referências

// * Especificação DOM:
//   📄 [https://dom.spec.whatwg.org/#shadow-trees](https://dom.spec.whatwg.org/#shadow-trees)
// * Compatibilidade entre navegadores:
//   ✅ [https://caniuse.com/#feat=shadowdomv1](https://caniuse.com/#feat=shadowdomv1)

// ---

// ## Resumo

// * **Shadow DOM** é uma maneira de criar um **DOM isolado e encapsulado**, exclusivo do componente.

// ### Como criar:

// ```js
// const shadowRoot = elem.attachShadow({ mode: 'open' });
// ```

// * Se `mode = 'open'`, o DOM pode ser acessado por `elem.shadowRoot`.
// * Podemos preencher o conteúdo com `innerHTML`, `appendChild`, etc.

// ### Características:

// * Elementos do Shadow DOM:

//   * Têm **espaço próprio para IDs**,
//   * São **invisíveis para seletores externos** (`querySelector`, etc),
//   * Usam **estilos locais**, ignorando estilos do documento principal.

// * Se o Shadow DOM estiver presente, ele **substitui** a árvore DOM tradicional na renderização.

// ➡️ No capítulo **Slots e Composição com Shadow DOM**, veremos como combinar o conteúdo do DOM principal com o DOM sombra.

// ---

// Se quiser, posso preparar um exemplo prático com slot, CSS isolado e interação entre Shadow DOM e atributos. Deseja isso?
