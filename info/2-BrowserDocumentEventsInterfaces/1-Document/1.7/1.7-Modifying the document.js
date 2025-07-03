// Claro! Aqui está a tradução completa para o português do texto que você enviou:

// ---

// # Modificando o documento

// Modificar o DOM é a chave para criar páginas “vivas”.

// Aqui veremos como criar novos elementos “na hora” e modificar o conteúdo existente da página.

// ---

// ## Exemplo: mostrar uma mensagem

// Vamos demonstrar com um exemplo. Vamos adicionar uma mensagem na página que fique mais bonita do que um alert.

// Assim ficará:

// ```html
// <style>
// .alert {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <div class="alert">
//   <strong>Oi!</strong> Você leu uma mensagem importante.
// </div>
// ```

// Esse foi o exemplo em HTML. Agora vamos criar essa mesma `div` com JavaScript (supondo que o estilo já esteja no HTML/CSS).

// ---

// ## Criando um elemento

// Para criar nós DOM, existem dois métodos:

// * `document.createElement(tag)`

//   Cria um novo elemento com a tag dada, por exemplo:

//   ```js
//   let div = document.createElement('div');
//   ```

// * `document.createTextNode(text)`

//   Cria um novo nó de texto com o texto dado, por exemplo:

//   ```js
//   let textNode = document.createTextNode('Aqui estou');
//   ```

// Na maior parte das vezes criamos elementos, como a `div` da mensagem.

// ---

// ## Criando a mensagem

// Criar a `div` da mensagem envolve 3 passos:

// ```js
// // 1. Criar o elemento <div>
// let div = document.createElement('div');

// // 2. Definir sua classe para "alert"
// div.className = "alert";

// // 3. Preencher o conteúdo
// div.innerHTML = "<strong>Oi!</strong> Você leu uma mensagem importante.";
// ```

// Criamos o elemento, mas ele está só na variável `div`, ainda não está na página, então não podemos vê-lo.

// ---

// ## Métodos de inserção

// Para mostrar a `div` precisamos inseri-la em algum lugar do documento. Por exemplo, dentro do `<body>`, acessível por `document.body`.

// Existe um método especial para isso: `document.body.append(div)`.

// Código completo:

// ```html
// <style>
// .alert {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <script>
//   let div = document.createElement('div');
//   div.className = "alert";
//   div.innerHTML = "<strong>Oi!</strong> Você leu uma mensagem importante.";

//   document.body.append(div);
// </script>
// ```

// Chamamos `append` em `document.body`, mas podemos chamar `append` em qualquer elemento para inserir outro elemento dentro dele. Por exemplo: `div.append(anotherElement)`.

// ---

// ## Mais métodos de inserção

// Esses métodos indicam diferentes lugares para inserir:

// * `node.append(...nodes ou strings)` — adiciona nós ou textos no fim de `node`.
// * `node.prepend(...nodes ou strings)` — insere nós ou textos no começo de `node`.
// * `node.before(...nodes ou strings)` — insere nós ou textos antes de `node`.
// * `node.after(...nodes ou strings)` — insere nós ou textos depois de `node`.
// * `node.replaceWith(...nodes ou strings)` — substitui `node` pelos nós ou textos fornecidos.

// Os argumentos são uma lista arbitrária de nós DOM ou strings (que viram nós de texto automaticamente).

// ---

// ## Exemplo usando esses métodos

// ```html
// <ol id="ol">
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
// </ol>

// <script>
//   ol.before('antes'); // insere string "antes" antes do <ol>
//   ol.after('depois'); // insere string "depois" depois do <ol>

//   let liFirst = document.createElement('li');
//   liFirst.innerHTML = 'prepend';
//   ol.prepend(liFirst); // insere liFirst no começo do <ol>

//   let liLast = document.createElement('li');
//   liLast.innerHTML = 'append';
//   ol.append(liLast); // insere liLast no fim do <ol>
// </script>
// ```

// Resultado visual:

// ```
// antes
// <ol id="ol">
//   <li>prepend</li>
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
//   <li>append</li>
// </ol>
// depois
// ```

// ---

// ## Inserir múltiplos nós e textos

// Esses métodos aceitam múltiplos nós e textos de uma vez.

// Exemplo:

// ```html
// <div id="div"></div>
// <script>
//   div.before('<p>Olá</p>', document.createElement('hr'));
// </script>
// ```

// Note que a string é inserida **como texto**, e não como HTML. Caracteres como `<` e `>` são escapados.

// Ou seja, o HTML final fica:

// ```html
// &lt;p&gt;Olá&lt;/p&gt;
// <hr>
// <div id="div"></div>
// ```

// Strings são inseridas de forma segura, como faria `elem.textContent`.

// ---

// ## Inserir HTML como HTML: insertAdjacentHTML

// Para inserir uma string **como HTML** (com tags funcionando), usamos:

// ```js
// elem.insertAdjacentHTML(where, html);
// ```

// Onde `where` pode ser:

// * `"beforebegin"` — antes do próprio elemento.
// * `"afterbegin"` — dentro do elemento, no começo.
// * `"beforeend"` — dentro do elemento, no fim.
// * `"afterend"` — depois do próprio elemento.

// Exemplo:

// ```html
// <div id="div"></div>
// <script>
//   div.insertAdjacentHTML('beforebegin', '<p>Olá</p>');
//   div.insertAdjacentHTML('afterend', '<p>Tchau</p>');
// </script>
// ```

// Resultado:

// ```html
// <p>Olá</p>
// <div id="div"></div>
// <p>Tchau</p>
// ```

// ---

// ## Métodos relacionados

// Existem também:

// * `elem.insertAdjacentText(where, text)` — insere texto como texto.
// * `elem.insertAdjacentElement(where, elem)` — insere um elemento.

// Eles servem para uniformizar a sintaxe, mas raramente são usados — normalmente usamos `append`, `prepend`, etc.

// ---

// ## Exemplo alternativo de mostrar mensagem

// ```html
// <style>
// .alert {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <script>
//   document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
//     <strong>Oi!</strong> Você leu uma mensagem importante.
//   </div>`);
// </script>
// ```

// ---

// ## Remover nós: node.remove()

// Para remover um nó, usamos:

// ```js
// node.remove();
// ```

// Exemplo para a mensagem desaparecer após 1 segundo:

// ```html
// <style>
// .alert {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <script>
//   let div = document.createElement('div');
//   div.className = "alert";
//   div.innerHTML = "<strong>Oi!</strong> Você leu uma mensagem importante.";

//   document.body.append(div);
//   setTimeout(() => div.remove(), 1000);
// </script>
// ```

// ---

// ## Mover elemento sem remover explicitamente

// Para mover um elemento para outro lugar, não precisamos removê-lo antes.

// Todos os métodos de inserção removem o nó da posição antiga automaticamente.

// Exemplo:

// ```html
// <div id="first">Primeiro</div>
// <div id="second">Segundo</div>

// <script>
//   // não precisa chamar remove
//   second.after(first); // insere #first depois de #second
// </script>
// ```

// ---

// ## Clonar nós: cloneNode

// Quer inserir outra mensagem parecida?

// Podemos criar uma função, ou clonar a existente:

// * `elem.cloneNode(true)` — clona o elemento e todos os filhos (clone profundo).
// * `elem.cloneNode(false)` — clona só o elemento, sem filhos.

// Exemplo:

// ```html
// <style>
// .alert {
//   padding: 15px;
//   border: 1px solid #d6e9c6;
//   border-radius: 4px;
//   color: #3c763d;
//   background-color: #dff0d8;
// }
// </style>

// <div class="alert" id="div">
//   <strong>Oi!</strong> Você leu uma mensagem importante.
// </div>

// <script>
//   let div2 = div.cloneNode(true); // clona a mensagem
//   div2.querySelector('strong').innerHTML = 'Tchau!'; // altera o clone

//   div.after(div2); // mostra o clone após a div existente
// </script>
// ```

// ---

// ## DocumentFragment

// `DocumentFragment` é um nó DOM especial que serve para agrupar vários nós.

// Podemos adicionar outros nós nele, mas quando inserimos o fragmento no DOM, é o conteúdo dele que vai para o lugar.

// Exemplo gerando itens para uma lista:

// ```html
// <ul id="ul"></ul>

// <script>
// function getListContent() {
//   let fragment = new DocumentFragment();

//   for(let i=1; i<=3; i++) {
//     let li = document.createElement('li');
//     li.append(i);
//     fragment.append(li);
//   }

//   return fragment;
// }

// ul.append(getListContent());
// </script>
// ```

// O resultado:

// ```html
// <ul>
//   <li>1</li>
//   <li>2</li>
//   <li>3</li>
// </ul>
// ```

// ---

// ## Alternativa ao DocumentFragment

// Podemos retornar um array de nós e usar spread operator:

// ```js
// function getListContent() {
//   let result = [];

//   for(let i=1; i<=3; i++) {
//     let li = document.createElement('li');
//     li.append(i);
//     result.push(li);
//   }

//   return result;
// }

// ul.append(...getListContent());
// ```

// ---

// ## Métodos antigos (old-school)

// São métodos antigos para manipular DOM, ainda encontrados em scripts legados:

// * `parentElem.appendChild(node)` — adiciona `node` como último filho de `parentElem`.

// Exemplo:

// ```html
// <ol id="list">
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
// </ol>

// <script>
//   let newLi = document.createElement('li');
//   newLi.innerHTML = 'Olá, mundo!';

//   list.appendChild(newLi);
// </script>
// ```

// * `parentElem.insertBefore(node, nextSibling)` — insere `node` antes de `nextSibling` dentro de `parentElem`.

// Exemplo:

// ```js
// list.insertBefore(newLi, list.children[1]);
// ```

// Para inserir como primeiro filho:

// ```js
// list.insertBefore(newLi, list.firstChild);
// ```

// * `parentElem.replaceChild(node, oldChild)` — substitui `oldChild` por `node`.

// * `parentElem.removeChild(node)` — remove `node` de `parentElem`.

// Exemplo removendo o primeiro filho:

// ```js
// let li = list.firstElementChild;
// list.removeChild(li);
// ```

// ---

// ## Sobre `document.write`

// Método muito antigo para adicionar conteúdo à página:

// ```html
// <p>Algum texto...</p>
// <script>
//   document.write('<b>Olá do JS</b>');
// </script>
// <p>Fim</p>
// ```

// Escreve o HTML na página exatamente onde é chamado, em tempo de carregamento.

// ---

// ## Limitação do document.write

// Só funciona durante o carregamento da página.

// Se chamado depois que a página carregar, ele apaga todo o conteúdo da página e escreve só o que foi passado.

// Exemplo:

// ```html
// <p>Depois de 1 segundo, o conteúdo será substituído...</p>
// <script>
//   setTimeout(() => document.write('<b>...Por isto.</b>'), 1000);
// </script>
// ```

// ---

// ## Resumo

// * Criar nós:

//   * `document.createElement(tag)`
//   * `document.createTextNode(text)` (raro)
//   * `elem.cloneNode(deep)` — clone com descendentes se `deep` for true

// * Inserir e remover:

//   * `node.append(...)`, `node.prepend(...)`
//   * `node.before(...)`, `node.after(...)`
//   * `node.replaceWith(...)`
//   * `node.remove()`

// * Strings são inseridas como texto, escapadas


// .

// * Métodos antigos:

//   * `parent.appendChild(node)`
//   * `parent.insertBefore(node, nextSibling)`
//   * `parent.removeChild(node)`
//   * `parent.replaceChild(newElem, node)`

// * `elem.insertAdjacentHTML(where, html)` insere HTML relativo a `elem`:

//   * `"beforebegin"`, `"afterbegin"`, `"beforeend"`, `"afterend"`

// * `elem.insertAdjacentText` e `elem.insertAdjacentElement` existem, mas raramente usados.

// * `document.write(html)` escreve HTML durante o carregamento, mas apaga a página se usado depois.

// ---

// Se quiser, posso ajudar com exemplos em português, ou tirar dúvidas! Quer?
