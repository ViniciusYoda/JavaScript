// Aqui está a tradução completa do conteúdo para o **português**, com termos adaptados ao contexto do desenvolvimento web:

// ---

// ## **Estilos e classes**

// Antes de entrarmos nas formas que o JavaScript oferece para lidar com **estilos** e **classes**, há uma regra importante que vale a pena destacar (mesmo sendo óbvia para muitos).

// ### Existem geralmente duas formas de estilizar um elemento:

// 1. Criar uma **classe CSS** e adicioná-la: `<div class="...">`
// 2. Escrever estilos diretamente no atributo `style`: `<div style="...">`

// O JavaScript pode modificar **tanto as classes quanto os estilos inline**.

// Devemos sempre **preferir o uso de classes CSS**. O uso de estilos inline (`style`) deve ser reservado apenas para casos onde as classes não são suficientes.

// **Exemplo válido para usar `style`:**

// Quando calculamos dinamicamente a posição de um elemento, como:

// ```js
// let top = /* cálculos complexos */;
// let left = /* cálculos complexos */;

// elem.style.left = left; // ex: '123px'
// elem.style.top = top;   // ex: '456px'
// ```

// Para outras situações, como mudar a cor do texto ou adicionar um ícone de fundo, o ideal é **criar uma classe no CSS** e então adicioná-la via JavaScript. Isso é mais flexível e fácil de manter.

// ---

// ## **className e classList**

// Modificar classes é uma ação comum em scripts JavaScript.

// Antigamente, como "class" era uma palavra reservada, não podia ser usada como propriedade. Por isso, surgiu `className`, que corresponde ao atributo `class`.

// ### Exemplo:

// ```html
// <body class="principal pagina">
//   <script>
//     alert(document.body.className); // principal pagina
//   </script>
// </body>
// ```

// Atribuir um valor a `elem.className` substitui **todas** as classes do elemento. Mas muitas vezes queremos apenas **adicionar ou remover uma única classe**.

// Para isso usamos `elem.classList`, que é um objeto especial com métodos:

// * `add("classe")` – adiciona a classe
// * `remove("classe")` – remove a classe
// * `toggle("classe")` – adiciona se não existe, remove se já existe
// * `contains("classe")` – retorna `true` ou `false` se a classe estiver presente

// ### Exemplo:

// ```html
// <body class="principal pagina">
//   <script>
//     document.body.classList.add('artigo');
//     alert(document.body.className); // principal pagina artigo
//   </script>
// </body>
// ```

// Você pode iterar sobre as classes com `for..of`:

// ```js
// for (let nome of document.body.classList) {
//   alert(nome); // principal, depois pagina, depois artigo
// }
// ```

// ---

// ## **Estilo do elemento (`style`)**

// A propriedade `elem.style` representa o conteúdo do atributo `style`.

// ### Propriedades com múltiplas palavras usam camelCase:

// | CSS               | JavaScript              |
// | ----------------- | ----------------------- |
// | background-color  | `style.backgroundColor` |
// | z-index           | `style.zIndex`          |
// | border-left-width | `style.borderLeftWidth` |

// ### Exemplo:

// ```js
// document.body.style.backgroundColor = prompt('Cor de fundo?', 'green');
// ```

// ---

// ## **Propriedades com prefixos de navegador**

// Propriedades como `-moz-border-radius` ou `-webkit-border-radius` seguem o mesmo padrão:

// ```js
// button.style.MozBorderRadius = '5px';
// button.style.WebkitBorderRadius = '5px';
// ```

// ---

// ## **Removendo uma propriedade de estilo**

// Para esconder um elemento:

// ```js
// document.body.style.display = "none";
// setTimeout(() => document.body.style.display = "", 1000); // volta ao normal
// ```

// Ou usando:

// ```js
// document.body.style.removeProperty('background');
// ```

// ---

// ## **Reescrevendo todos os estilos com `style.cssText`**

// `style.cssText` permite definir todos os estilos como uma string única:

// ```html
// <div id="div">Botão</div>
// <script>
//   div.style.cssText = `
//     color: red !important;
//     background-color: yellow;
//     width: 100px;
//     text-align: center;
//   `;
//   alert(div.style.cssText);
// </script>
// ```

// ⚠️ **Atenção:** essa abordagem **substitui todos os estilos anteriores**.

// ---

// ## **Não esqueça as unidades!**

// Sempre adicione unidades CSS como `px`, `em`, etc. Exemplo errado:

// ```js
// document.body.style.margin = 20; // Ignorado!
// ```

// Exemplo correto:

// ```js
// document.body.style.margin = '20px';
// ```

// ---

// ## **Estilos computados: `getComputedStyle`**

// Modificar estilos é fácil, mas como **ler** o estilo final aplicado?

// `elem.style` mostra apenas o que está diretamente no atributo `style`, ignorando o CSS aplicado por classes.

// ### Exemplo onde `style` não vê nada:

// ```html
// <head>
//   <style> body { color: red; margin: 5px } </style>
// </head>
// <body>
//   <script>
//     alert(document.body.style.color); // vazio
//     alert(document.body.style.marginTop); // vazio
//   </script>
// </body>
// ```

// ### Solução: usar `getComputedStyle`

// ```js
// let estilos = getComputedStyle(document.body);
// alert(estilos.marginTop); // 5px
// alert(estilos.color);     // rgb(255, 0, 0)
// ```

// ---

// ## **Valores computados vs resolvidos**

// * **Valor computado:** após aplicação de todas regras CSS, pode ser relativo (ex: `1em`, `125%`)
// * **Valor resolvido:** valor final absoluto, geralmente em `px`, pronto para renderização.

// Hoje, `getComputedStyle` retorna o **valor resolvido** (mais útil).

// ---

// ## **Atenção: use o nome exato da propriedade**

// Use nomes completos como `paddingLeft`, `marginTop`, etc. Usar `padding` pode não funcionar corretamente.

// ---

// ## **Privacidade de links visitados**

// CSS permite estilizar links visitados com `:visited`, mas o JavaScript **não pode acessar esses estilos** (por questões de privacidade).

// Além disso, CSS impede aplicar estilos que alterem o layout visualmente nesses links.

// ---

// ## **Resumo**

// ### Manipular classes:

// * `className`: acessa ou define a string completa de classes
// * `classList`: manipula individualmente (add, remove, toggle, contains)

// ### Alterar estilos:

// * `style`: objeto com propriedades camelCase para estilos inline
// * `style.cssText`: define todos os estilos como string única

// ### Ler estilos finais aplicados:

// * `getComputedStyle(elem, [pseudo])`: retorna objeto com estilos finais, incluindo os aplicados por classes e CSS herdado (apenas leitura)

// ---

// Se quiser, posso te enviar isso em PDF, Markdown ou outro formato. Deseja?
