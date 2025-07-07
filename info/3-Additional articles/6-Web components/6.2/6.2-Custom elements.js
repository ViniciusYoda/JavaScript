// Claro! Aqui está a tradução e adaptação completa para o português do conteúdo sobre **Custom Elements (Elementos Personalizados)**:

// ---

// ## Elementos personalizados

// Podemos criar elementos HTML personalizados, definidos por nossa própria classe, com seus próprios métodos, propriedades, eventos, e assim por diante.

// Uma vez definido, um elemento personalizado pode ser usado da mesma forma que qualquer elemento HTML padrão.

// Isso é ótimo, pois o "dicionário" de tags HTML é rico, mas não infinito. Não existem tags como `<abas-fáceis>`, `<carrossel-deslizante>`, `<upload-bonito>`… Basta imaginar qualquer tag que gostaríamos de usar.

// Podemos definir esses elementos com uma classe especial e usá-los como se sempre fizessem parte da linguagem HTML.

// ### Tipos de elementos personalizados

// Existem dois tipos:

// * **Elementos personalizados autônomos** – elementos totalmente novos, que estendem a classe abstrata `HTMLElement`.
// * **Elementos personalizados embutidos** – elementos que estendem elementos nativos do HTML, como um botão personalizado baseado em `HTMLButtonElement`.

// Vamos começar pelos autônomos e depois veremos os personalizados embutidos.

// ---

// ### Criando um elemento personalizado

// Para criar um elemento personalizado, precisamos informar ao navegador alguns detalhes sobre ele: como ele deve ser exibido, o que fazer quando for adicionado ou removido da página, etc.

// Fazemos isso criando uma classe com métodos especiais. Isso é simples, pois são poucos métodos e todos opcionais.

// #### Estrutura básica:

// ```javascript
// class MeuElemento extends HTMLElement {
//   constructor() {
//     super(); // Elemento criado
//   }

//   connectedCallback() {
//     // Chamado quando o elemento é adicionado ao documento
//   }

//   disconnectedCallback() {
//     // Chamado quando o elemento é removido do documento
//   }

//   static get observedAttributes() {
//     return [/* lista de atributos a observar */];
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     // Chamado quando um dos atributos listados for modificado
//   }

//   adoptedCallback() {
//     // Chamado quando o elemento é movido para outro documento (raro)
//   }

//   // Outros métodos e propriedades também podem ser definidos
// }
// ```

// #### Registrando o elemento:

// ```javascript
// customElements.define("meu-elemento", MeuElemento);
// ```

// Depois disso, qualquer `<meu-elemento>` no HTML criará uma instância da classe `MeuElemento`.

// Também podemos criar via JavaScript com `document.createElement("meu-elemento")`.

// ⚠️ **O nome do elemento personalizado deve conter um hífen** (`-`), como `meu-elemento` ou `super-botao`. Isso evita conflitos com elementos nativos.

// ---

// ## Exemplo: `<tempo-formatado>`

// O elemento HTML `<time>` já existe, mas ele **não** faz nenhum tipo de formatação. Vamos criar um elemento `<tempo-formatado>` que mostre o tempo de forma amigável e sensível ao idioma:

// ```html
// <script>
//   class TempoFormatado extends HTMLElement {
//     connectedCallback() {
//       let data = new Date(this.getAttribute('datetime') || Date.now());

//       this.innerHTML = new Intl.DateTimeFormat("default", {
//         year: this.getAttribute('year') || undefined,
//         month: this.getAttribute('month') || undefined,
//         day: this.getAttribute('day') || undefined,
//         hour: this.getAttribute('hour') || undefined,
//         minute: this.getAttribute('minute') || undefined,
//         second: this.getAttribute('second') || undefined,
//         timeZoneName: this.getAttribute('time-zone-name') || undefined,
//       }).format(data);
//     }
//   }

//   customElements.define("tempo-formatado", TempoFormatado);
// </script>

// <tempo-formatado datetime="2019-12-01"
//   year="numeric" month="long" day="numeric"
//   hour="numeric" minute="numeric" second="numeric"
//   time-zone-name="short">
// </tempo-formatado>
// ```

// ### Por que usamos `connectedCallback()` e não o `constructor`?

// Porque no `constructor`, os atributos ainda não foram processados pelo navegador. Então, acessar `getAttribute()` retornaria `null`. Além disso, adiar o trabalho até o momento necessário é mais eficiente.

// ---

// ## Observando atributos

// No exemplo acima, após a renderização inicial, mudanças nos atributos não têm efeito. Isso não é natural para um elemento HTML. Vamos corrigir isso:

// ```html
// <script>
//   class TempoFormatado extends HTMLElement {
//     renderizar() {
//       let data = new Date(this.getAttribute('datetime') || Date.now());

//       this.innerHTML = new Intl.DateTimeFormat("default", {
//         year: this.getAttribute('year') || undefined,
//         month: this.getAttribute('month') || undefined,
//         day: this.getAttribute('day') || undefined,
//         hour: this.getAttribute('hour') || undefined,
//         minute: this.getAttribute('minute') || undefined,
//         second: this.getAttribute('second') || undefined,
//         timeZoneName: this.getAttribute('time-zone-name') || undefined,
//       }).format(data);
//     }

//     connectedCallback() {
//       if (!this.renderizado) {
//         this.renderizar();
//         this.renderizado = true;
//       }
//     }

//     static get observedAttributes() {
//       return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
//     }

//     attributeChangedCallback(name, oldValue, newValue) {
//       this.renderizar();
//     }
//   }

//   customElements.define("tempo-formatado", TempoFormatado);
// </script>

// <tempo-formatado id="relogio" hour="numeric" minute="numeric" second="numeric"></tempo-formatado>

// <script>
//   setInterval(() => {
//     relogio.setAttribute("datetime", new Date());
//   }, 1000);
// </script>
// ```

// Agora o elemento se atualiza automaticamente quando os atributos mudam.

// ---

// ## Ordem de renderização

// Quando o navegador interpreta o HTML, os elementos são processados de cima para baixo. Primeiro os pais, depois os filhos.

// Exemplo:

// ```html
// <script>
//   customElements.define("usuario-info", class extends HTMLElement {
//     connectedCallback() {
//       alert(this.innerHTML); // vazio
//     }
//   });
// </script>

// <usuario-info>João</usuario-info>
// ```

// A mensagem será vazia porque os filhos ainda não foram processados.

// Para resolver isso, podemos usar `setTimeout` com tempo zero:

// ```html
// <script>
//   customElements.define("usuario-info", class extends HTMLElement {
//     connectedCallback() {
//       setTimeout(() => alert(this.innerHTML)); // "João"
//     }
//   });
// </script>
// ```

// Atenção: se usarmos isso com elementos aninhados, os externos podem ser inicializados antes dos internos.

// ```html
// <script>
//   customElements.define("usuario-info", class extends HTMLElement {
//     connectedCallback() {
//       alert(`${this.id} conectado.`);
//       setTimeout(() => alert(`${this.id} inicializado.`));
//     }
//   });
// </script>

// <usuario-info id="externo">
//   <usuario-info id="interno"></usuario-info>
// </usuario-info>
// ```

// Resultado:

// 1. externo conectado
// 2. interno conectado
// 3. externo inicializado
// 4. interno inicializado

// ---

// ## Elementos personalizados embutidos

// Elementos como `<tempo-formatado>` **não têm semântica** para mecanismos de busca e acessibilidade. Mas às vezes queremos manter essas características.

// Por exemplo, se queremos criar um botão especial, podemos estender o elemento `<button>`:

// ```javascript
// class OlaBotao extends HTMLButtonElement {
//   constructor() {
//     super();
//     this.addEventListener("click", () => alert("Olá!"));
//   }
// }

// customElements.define("ola-botao", OlaBotao, { extends: "button" });
// ```

// Uso no HTML:

// ```html
// <button is="ola-botao">Clique aqui</button>
// <button is="ola-botao" disabled>Desabilitado</button>
// ```

// Nosso botão personalizado herda o estilo e funcionalidades como `disabled`.

// ---

// ## Resumo

// ### Tipos de elementos personalizados:

// #### 1. **Autônomos** – novos elementos:

// ```js
// class MeuElemento extends HTMLElement {
//   constructor() { super(); }
//   connectedCallback() { }
//   disconnectedCallback() { }
//   static get observedAttributes() { return []; }
//   attributeChangedCallback(name, oldValue, newValue) { }
//   adoptedCallback() { }
// }

// customElements.define("meu-elemento", MeuElemento);
// // <meu-elemento>
// ```

// #### 2. **Personalizados embutidos** – extensão de elementos existentes:

// ```js
// class MeuBotao extends HTMLButtonElement { /* ... */ }

// customElements.define("meu-botao", MeuBotao, { extends: "button" });
// // <button is="meu-botao">
// ```

// ### Compatibilidade

// A maioria dos navegadores modernos oferece suporte nativo a **Custom Elements**. Para suporte total em navegadores mais antigos, use este [polyfill oficial](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs).

// ---

// Se quiser, posso converter isso em um PDF, documento de estudo ou até aplicar um exemplo prático com React ou Vanilla JS. Deseja isso?
