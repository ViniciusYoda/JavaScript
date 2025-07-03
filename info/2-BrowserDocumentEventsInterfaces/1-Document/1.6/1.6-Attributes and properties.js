// Claro! Aqui está a tradução completa para o português do texto que você enviou:

// ---

// # Atributos e propriedades

// Quando o navegador carrega a página, ele “lê” (ou seja, “analisa” — parseia) o HTML e gera objetos DOM a partir dele. Para nós elementos, a maioria dos atributos HTML padrão automaticamente se tornam propriedades dos objetos DOM.

// Por exemplo, se a tag é `<body id="page">`, então o objeto DOM terá `body.id = "page"`.

// Mas o mapeamento entre atributo e propriedade **não é um-para-um!** Neste capítulo, vamos prestar atenção para separar essas duas noções, para entender como trabalhar com elas, quando são iguais e quando são diferentes.

// ---

// ## Propriedades do DOM

// Já vimos propriedades embutidas do DOM. Existem muitas. Mas tecnicamente ninguém nos limita, e se não houver propriedades suficientes, podemos criar as nossas próprias.

// Nós podemos alterar nós DOM, pois eles são objetos JavaScript normais.

// Por exemplo, vamos criar uma nova propriedade em `document.body`:

// ```js
// document.body.myData = {
//   name: 'Caesar',
//   title: 'Imperator'
// };

// alert(document.body.myData.title); // Imperator
// ```

// Também podemos adicionar um método:

// ```js
// document.body.sayTagName = function() {
//   alert(this.tagName);
// };

// document.body.sayTagName(); // BODY (o valor de "this" dentro do método é document.body)
// ```

// Podemos modificar também protótipos embutidos como `Element.prototype` e adicionar métodos para todos os elementos:

// ```js
// Element.prototype.sayHi = function() {
//   alert(`Olá, eu sou ${this.tagName}`);
// };

// document.documentElement.sayHi(); // Olá, eu sou HTML
// document.body.sayHi(); // Olá, eu sou BODY
// ```

// Ou seja, propriedades e métodos DOM se comportam como os de objetos JavaScript comuns:

// * Podem ter qualquer valor.
// * São sensíveis a maiúsculas e minúsculas (escreva `elem.nodeType`, não `elem.NoDeTyPe`).

// ---

// ## Atributos HTML

// No HTML, tags podem ter atributos. Quando o navegador analisa o HTML para criar objetos DOM para as tags, ele reconhece os atributos padrão e cria propriedades DOM a partir deles.

// Então, quando um elemento tem `id` ou outro atributo padrão, a propriedade correspondente é criada. Mas isso não acontece se o atributo for não padrão.

// Por exemplo:

// ```html
// <body id="test" something="non-standard">
//   <script>
//     alert(document.body.id); // test
//     // atributo não padrão não gera propriedade
//     alert(document.body.something); // undefined
//   </script>
// </body>
// ```

// Observe que um atributo padrão para um elemento pode ser desconhecido para outro. Por exemplo, `"type"` é padrão para `<input>` (HTMLInputElement), mas não para `<body>` (HTMLBodyElement). A lista de atributos padrão está na especificação para cada tipo de elemento.

// Exemplo:

// ```html
// <body id="body" type="...">
//   <input id="input" type="text">
//   <script>
//     alert(input.type); // text
//     alert(body.type); // undefined: propriedade DOM não criada, pois é atributo não padrão
//   </script>
// </body>
// ```

// Portanto, se o atributo não for padrão, não haverá propriedade DOM correspondente. Mas como acessar esses atributos?

// Claro, todos os atributos são acessíveis pelos métodos:

// * `elem.hasAttribute(name)` — verifica se existe.
// * `elem.getAttribute(name)` — obtém o valor.
// * `elem.setAttribute(name, value)` — define o valor.
// * `elem.removeAttribute(name)` — remove o atributo.

// Esses métodos trabalham exatamente com o que está escrito no HTML.

// Também podemos ler todos os atributos usando `elem.attributes`: uma coleção de objetos da classe `Attr` embutida, com propriedades `name` e `value`.

// Exemplo lendo um atributo não padrão:

// ```html
// <body something="non-standard">
//   <script>
//     alert(document.body.getAttribute('something')); // non-standard
//   </script>
// </body>
// ```

// Características dos atributos HTML:

// * Os nomes são case-insensitive (id é igual a ID).
// * Os valores são sempre strings.

// Exemplo estendido:

// ```html
// <body>
//   <div id="elem" about="Elephant"></div>

//   <script>
//     alert(elem.getAttribute('About')); // (1) 'Elephant', leitura

//     elem.setAttribute('Test', 123); // (2), escrita

//     alert(elem.outerHTML); // (3), veja se o atributo aparece no HTML (sim)

//     for (let attr of elem.attributes) { // (4) lista todos
//       alert(`${attr.name} = ${attr.value}`);
//     }
//   </script>
// </body>
// ```

// Observações:

// * `getAttribute('About')` funciona mesmo com maiúscula, pois nomes de atributos são case-insensitive.
// * Podemos atribuir qualquer valor a um atributo, mas ele vira string. Aqui, `123` vira `"123"`.
// * Todos os atributos, inclusive os que definimos, aparecem em `outerHTML`.
// * A coleção `attributes` é iterável e contém todos os atributos do elemento, padrão e não padrão, como objetos com `name` e `value`.

// ---

// ## Sincronização entre propriedade e atributo

// Quando um atributo padrão muda, a propriedade DOM correspondente é atualizada automaticamente e vice-versa (com exceções).

// Exemplo, modificando o atributo `id`:

// ```html
// <input>

// <script>
//   let input = document.querySelector('input');

//   // atributo → propriedade
//   input.setAttribute('id', 'id');
//   alert(input.id); // id (atualizado)

//   // propriedade → atributo
//   input.id = 'newId';
//   alert(input.getAttribute('id')); // newId (atualizado)
// </script>
// ```

// Mas há exceções, por exemplo, `input.value` sincroniza só de atributo para propriedade, mas não o contrário:

// ```html
// <input>

// <script>
//   let input = document.querySelector('input');

//   // atributo → propriedade
//   input.setAttribute('value', 'text');
//   alert(input.value); // text

//   // NÃO propriedade → atributo
//   input.value = 'newValue';
//   alert(input.getAttribute('value')); // text (não mudou)
// </script>
// ```

// Ou seja:

// * Mudar o atributo atualiza a propriedade.
// * Mudar a propriedade **não** altera o atributo.

// Isso pode ser útil porque ações do usuário mudam o valor, mas o valor "original" do HTML fica no atributo.

// ---

// ## Propriedades DOM têm tipos

// Propriedades DOM nem sempre são strings. Por exemplo, `input.checked` (checkbox) é booleano:

// ```html
// <input id="input" type="checkbox" checked> checkbox

// <script>
//   alert(input.getAttribute('checked')); // valor do atributo: string vazia
//   alert(input.checked); // valor da propriedade: true
// </script>
// ```

// Outro exemplo: o atributo `style` é string, mas a propriedade `style` é objeto:

// ```html
// <div id="div" style="color:red;font-size:120%">Olá</div>

// <script>
//   alert(div.getAttribute('style')); // string: color:red;font-size:120%

//   alert(div.style); // objeto CSSStyleDeclaration
//   alert(div.style.color); // red
// </script>
// ```

// A maioria das propriedades é string, porém.

// Raramente, mesmo que a propriedade DOM seja string, pode diferir do atributo. Por exemplo, a propriedade `href` sempre retorna a URL completa, mesmo que o atributo contenha uma URL relativa ou só um hash.

// Exemplo:

// ```html
// <a id="a" href="#hello">link</a>
// <script>
//   alert(a.getAttribute('href')); // #hello

//   alert(a.href); // URL completa, ex: http://site.com/pagina#hello
// </script>
// ```

// Se quisermos o valor exato do atributo, usamos `getAttribute`.

// ---

// ## Atributos não padrão, dataset

// No HTML usamos muitos atributos padrão. E atributos não padrão, customizados, para que servem?

// Às vezes usamos atributos não padrão para passar dados customizados do HTML para JavaScript, ou para "marcar" elementos para scripts.

// Exemplo:

// ```html
// <!-- marca o div para mostrar "name" -->
// <div show-info="name"></div>
// <!-- e aqui a idade -->
// <div show-info="age"></div>

// <script>
//   let user = {
//     name: "Pete",
//     age: 25
//   };

//   for (let div of document.querySelectorAll('[show-info]')) {
//     let field = div.getAttribute('show-info');
//     div.innerHTML = user[field]; // coloca "Pete" no name, 25 no age
//   }
// </script>
// ```

// Também podem ser usados para estilizar via CSS.

// Por exemplo, para estado do pedido, o atributo `order-state`:

// ```html
// <style>
//   .order[order-state="new"] {
//     color: green;
//   }

//   .order[order-state="pending"] {
//     color: blue;
//   }

//   .order[order-state="canceled"] {
//     color: red;
//   }
// </style>

// <div class="order" order-state="new">Um pedido novo.</div>
// <div class="order" order-state="pending">Um pedido pendente.</div>
// <div class="order" order-state="canceled">Um pedido cancelado.</div>
// ```

// Por que usar atributo é melhor que classes `.order-state-new`, `.order-state-pending`, `.order-state-canceled`?

// Porque o atributo é mais fácil de gerenciar. O estado muda assim:

// ```js
// // mais simples do que remover e adicionar classes
// div.setAttribute('order-state', 'canceled');
// ```

// Mas pode ter problema usar atributos não padrão: e se o padrão HTML criar um atributo igual no futuro com outro significado?

// Para evitar conflitos, existem os atributos `data-*`.

// Todos os atributos que começam com `data-` são reservados para uso do programador. Eles aparecem na propriedade `dataset`.

// Por exemplo, um atributo `data-about` vira `elem.dataset.about`.

// Exemplo:

// ```html
// <body data-about="Elephants">
// <script>
//   alert(document.body.dataset.about); // Elephants
// </script>
// </body>
// ```

// Atributos com várias palavras como `data-order-state` viram camelCase: `dataset.orderState`.

// Exemplo reescrito do estado do pedido:

// ```html
// <style>
//   .order[data-order-state="new"] {
//     color: green;
//   }

//   .order[data-order-state="pending"] {
//     color: blue;
//   }

//   .order[data-order-state="canceled"] {
//     color: red;
//   }
// </style>

// <div id="order" class="order" data-order-state="new">Um pedido novo.</div>

// <script>
//   alert(order.dataset.orderState); // new

//   order.dataset.orderState = "pending"; // muda para pending
// </script>
// ```

// Usar `data-*` é uma forma válida e segura de passar dados customizados.

// Note que podemos não só ler, mas modificar os `data-*`. O CSS atualiza a visualização automaticamente, como no exemplo acima.

// ---

// ## Resumo

// * **Atributos** — o que está escrito no HTML.
// * **Propriedades** — o que está no objeto DOM.

// | Propriedades                                                                     | Atributos             |
// | -------------------------------------------------------------------------------- | --------------------- |
// | Qualquer tipo de valor, propriedades padrão têm tipos descritos na especificação | Sempre string         |
// | Nome case-sensitive                                                              | Nome case-insensitive |

// Métodos para trabalhar com atributos:

// * `elem.hasAttribute(name)` — verifica existência.
// * `elem.getAttribute(name)` — obtém valor.
// * `elem.setAttribute(name, value)` — define valor.
// * `elem.removeAttribute(name)` — remove atributo.
// * `elem.attributes` — coleção com todos os atributos.

// Na maioria dos casos, usar propriedades DOM é preferível. Devemos recorrer a atributos quando:

// * Precisamos de um atributo não padrão (mas se começar com `data-`, use `dataset`).
// * Queremos ler o valor exatamente como está no HTML, pois o valor da propriedade pode ser diferente (ex: href).

// ---

// Se quiser, posso ajudar com exemplos em português ou tirar dúvidas sobre esse assunto! Quer?
