// -----

// Para manipular elementos e seus conteúdos no DOM, primeiro precisamos acessar o objeto DOM correspondente. Todas as operações no DOM começam com o objeto **`document`**, que é o principal "ponto de entrada" para o DOM. A partir dele, podemos acessar qualquer nó.

// Aqui está uma representação visual dos links que permitem a navegação entre os nós do DOM:

// Vamos discuti-los em mais detalhes.

// -----

// ## No topo: `documentElement` e `body`

// Os nós da árvore mais superiores estão disponíveis diretamente como propriedades do `document`:

//   * `<html>` = **`document.documentElement`**: O nó do documento mais superior é `document.documentElement`. Este é o nó DOM da *tag* `<html>`.
//   * `<body>` = **`document.body`**: Outro nó DOM amplamente utilizado é o elemento `<body>` – `document.body`.
//   * `<head>` = **`document.head`**: A *tag* `<head>` está disponível como `document.head`.

// -----

// #### Atenção: `document.body` pode ser `null`

// Um *script* não pode acessar um elemento que não existe no momento da execução.
// Em particular, se um *script* estiver dentro de `<head>`, então `document.body` estará indisponível, porque o navegador ainda não o leu.
// Assim, no exemplo abaixo, o primeiro `alert` mostra `null`:

// ```html
// <html>
// <head>
//   <script>
//     alert( "Do HEAD: " + document.body ); // null, ainda não há <body>
//   </script>
// </head>
// <body>
//   <script>
//     alert( "Do BODY: " + document.body ); // HTMLBodyElement, agora existe
//   </script>
// </body>
// </html>
// ```

// -----

// #### No mundo DOM, `null` significa "não existe"

// No DOM, o valor `null` significa "não existe" ou "nenhum nó desse tipo".

// -----

// ## Filhos: `childNodes`, `firstChild`, `lastChild`

// Existem dois termos que usaremos daqui para frente:

//   * **Nós filhos (ou *children*)**: elementos que são filhos diretos. Em outras palavras, eles estão aninhados exatamente no elemento dado. Por exemplo, `<head>` e `<body>` são filhos do elemento `<html>`.
//   * **Descendentes**: todos os elementos que estão aninhados no elemento dado, incluindo filhos, seus filhos e assim por diante.

// Por exemplo, aqui `<body>` tem filhos `<div>` e `<ul>` (e alguns nós de texto em branco):

// ```html
// <html>
// <body>
//   <div>Início</div>

//   <ul>
//     <li>
//       <b>Informação</b>
//     </li>
//   </ul>
// </body>
// </html>
// ```

// …E os descendentes de `<body>` não são apenas os filhos diretos `<div>`, `<ul>`, mas também elementos mais profundamente aninhados, como `<li>` (um filho de `<ul>`) e `<b>` (um filho de `<li>`) – toda a subárvore.

// A coleção **`childNodes`** lista todos os nós filhos, incluindo nós de texto.
// O exemplo abaixo mostra os filhos de `document.body`:

// ```html
// <html>
// <body>
//   <div>Início</div>

//   <ul>
//     <li>Informação</li>
//   </ul>

//   <div>Fim</div>

//   <script>
//     for (let i = 0; i < document.body.childNodes.length; i++) {
//       alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
//     }
//   </script>
//   ...mais coisas...
// </body>
// </html>
// ```

// Observe um detalhe interessante aqui. Se executarmos o exemplo acima, o último elemento mostrado é `<script>`.
// Na verdade, o documento tem mais coisas abaixo, mas no momento da execução do *script*, o navegador ainda não as leu, então o *script* não as vê.

// As propriedades **`firstChild`** e **`lastChild`** fornecem acesso rápido aos primeiros e últimos filhos.
// São apenas atalhos. Se existirem nós filhos, então o seguinte é sempre verdadeiro:

// ```javascript
// elem.childNodes[0] === elem.firstChild
// elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
// ```

// Há também uma função especial **`elem.hasChildNodes()`** para verificar se há algum nó filho.

// -----

// ### Coleções DOM

// Como podemos ver, `childNodes` parece um *array*. Mas, na verdade, não é um *array*, mas sim uma **coleção** – um objeto iterável especial, semelhante a um *array*.
// Existem duas consequências importantes:

// 1.  Podemos usar `for..of` para iterar sobre ele:

//     ```javascript
//     for (let node of document.body.childNodes) {
//       alert(node); // mostra todos os nós da coleção
//     }
//     ```

//     Isso porque ele é iterável (fornece a propriedade `Symbol.iterator`, conforme necessário).

// 2.  Métodos de *array* não funcionarão, porque não é um *array*:

//     ```javascript
//     alert(document.body.childNodes.filter); // undefined (não há método filter!)
//     ```

// A primeira coisa é boa. A segunda é tolerável, porque podemos usar `Array.from` para criar um *array* "real" a partir da coleção, se quisermos métodos de *array*:

// ```javascript
// alert( Array.from(document.body.childNodes).filter ); // function
// ```

// -----

// #### Coleções DOM são somente leitura

// As coleções DOM, e mais ainda – todas as propriedades de navegação listadas neste capítulo, são **somente leitura**.
// Não podemos substituir um filho por outra coisa atribuindo `childNodes[i] = ....`.
// Alterar o DOM exige outros métodos. Nós os veremos no próximo capítulo.

// -----

// #### Coleções DOM são "ao vivo" (*live*)

// Quase todas as coleções DOM, com pequenas exceções, são **"ao vivo"**. Em outras palavras, elas refletem o estado atual do DOM.
// Se mantivermos uma referência a `elem.childNodes`, e adicionarmos/removermos nós no DOM, então eles aparecem na coleção automaticamente.

// -----

// #### Não use `for..in` para percorrer coleções

// As coleções são iteráveis usando `for..of`. Às vezes, as pessoas tentam usar `for..in` para isso.
// Por favor, não o faça. O laço `for..in` itera sobre todas as propriedades enumeráveis. E as coleções têm algumas propriedades "extras" raramente usadas que geralmente não queremos obter:

// ```html
// <body><script>
//   // mostra 0, 1, length, item, values e mais.
//   for (let prop in document.body.childNodes) alert(prop);
// </script></body>
// ```

// -----

// ## Irmãos e o pai

// **Irmãos** são nós que são filhos do mesmo pai.
// Por exemplo, aqui `<head>` e `<body>` são irmãos:

// ```html
// <html>
//   <head>...</head>
//   <body>...</body>
// </html>
// ```

// `<body>` é considerado o irmão "próximo" ou "direito" de `<head>`,
// `<head>` é considerado o irmão "anterior" ou "esquerdo" de `<body>`.

// O próximo irmão está na propriedade **`nextSibling`**, e o anterior – em **`previousSibling`**.
// O pai está disponível como **`parentNode`**.

// Por exemplo:

// ```javascript
// // pai de <body> é <html>
// alert( document.body.parentNode === document.documentElement ); // true

// // depois de <head> vem <body>
// alert( document.head.nextSibling ); // HTMLBodyElement

// // antes de <body> vem <head>
// alert( document.body.previousSibling ); // HTMLHeadElement
// ```

// -----

// ## Navegação somente por elementos

// As propriedades de navegação listadas acima referem-se a todos os nós. Por exemplo, em `childNodes` podemos ver nós de texto, nós de elemento e até nós de comentário, se existirem.
// Mas para muitas tarefas, não queremos nós de texto ou comentários. Queremos manipular **nós de elemento** que representam *tags* e formam a estrutura da página.

// Então, vamos ver mais links de navegação que levam em conta apenas nós de elemento:

// Os links são semelhantes aos dados acima, apenas com a palavra `Element` dentro:

//   * **`children`** – apenas os filhos que são nós de elemento.
//   * **`firstElementChild`**, **`lastElementChild`** – primeiro e último filhos de elemento.
//   * **`previousElementSibling`**, **`nextElementSibling`** – elementos vizinhos.
//   * **`parentElement`** – elemento pai.

// -----

// #### Por que `parentElement`? O pai pode não ser um elemento?

// A propriedade `parentElement` retorna o pai "elemento", enquanto `parentNode` retorna o pai "qualquer nó". Essas propriedades geralmente são as mesmas: ambas obtêm o pai.
// Com a única exceção de `document.documentElement`:

// ```javascript
// alert( document.documentElement.parentNode ); // document
// alert( document.documentElement.parentElement ); // null
// ```

// A razão é que o nó raiz `document.documentElement` (`<html>`) tem `document` como seu pai. Mas `document` não é um nó de elemento, então `parentNode` o retorna e `parentElement` não.
// Este detalhe pode ser útil quando queremos subir de um elemento arbitrário `elem` até `<html>`, mas não até o `document`:

// ```javascript
// while(elem = elem.parentElement) { // sobe até <html>
//   alert( elem );
// }
// ```

// Vamos modificar um dos exemplos acima: substituir `childNodes` por `children`. Agora ele mostra apenas elementos:

// ```html
// <html>
// <body>
//   <div>Início</div>

//   <ul>
//     <li>Informação</li>
//   </ul>

//   <div>Fim</div>

//   <script>
//     for (let elem of document.body.children) {
//       alert(elem); // DIV, UL, DIV, SCRIPT
//     }
//   </script>
//   ...
// </body>
// </html>
// ```

// -----

// ## Mais links: tabelas

// Até agora, descrevemos as propriedades básicas de navegação.
// Certos tipos de elementos DOM podem fornecer propriedades adicionais, específicas ao seu tipo, por conveniência.
// As tabelas são um ótimo exemplo disso e representam um caso particularmente importante:
// O elemento `<table>` suporta (além dos já mencionados) estas propriedades:

//   * **`table.rows`**: a coleção de elementos `<tr>` da tabela.
//   * **`table.caption`** / **`tHead`** / **`tFoot`**: referências aos elementos `<caption>`, `<thead>`, `<tfoot>`.
//   * **`table.tBodies`**: a coleção de elementos `<tbody>` (pode haver muitos de acordo com o padrão, mas sempre haverá pelo menos um – mesmo que não esteja no HTML de origem, o navegador o colocará no DOM).

// Os elementos `<thead>`, `<tfoot>`, `<tbody>` fornecem a propriedade `rows`:

//   * **`tbody.rows`**: a coleção de `<tr>` dentro.

// Para `<tr>`:

//   * **`tr.cells`**: a coleção de células `<td>` e `<th>` dentro do `<tr>` dado.
//   * **`tr.sectionRowIndex`**: a posição (*índice*) do `<tr>` dado dentro do `<thead>`/`<tbody>`/`<tfoot>` que o envolve.
//   * **`tr.rowIndex`**: o número do `<tr>` na tabela como um todo (incluindo todas as linhas da tabela).

// Para `<td>` e `<th>`:

//   * **`td.cellIndex`**: o número da célula dentro do `<tr>` que a envolve.

// Um exemplo de uso:

// ```html
// <table id="table">
//   <tr>
//     <td>um</td><td>dois</td>
//   </tr>
//   <tr>
//     <td>três</td><td>quatro</td>
//   </tr>
// </table>

// <script>
//   // pega td com "dois" (primeira linha, segunda coluna)
//   let td = table.rows[0].cells[1];
//   td.style.backgroundColor = "red"; // o destaca
// </script>
// ```

// A especificação: [tabular data](https://html.spec.whatwg.org/multipage/tables.html).
// Existem também propriedades de navegação adicionais para formulários HTML. Olharemos para elas mais tarde, quando começarmos a trabalhar com formulários.

// -----

// ## Resumo

// Dado um nó DOM, podemos ir para seus vizinhos imediatos usando propriedades de navegação.
// Existem dois conjuntos principais delas:

// 1.  **Para todos os nós**: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
// 2.  **Para nós de elemento apenas**: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

// Alguns tipos de elementos DOM, por exemplo, tabelas, fornecem propriedades e coleções adicionais para acessar seu conteúdo.

// -----

// Considerando que o front-end exibe os dados de abastecimento utilizando o React Query e o componente `MainTable.Main`, qual é o papel dessas propriedades de "caminhada" do DOM no contexto de uma aplicação React? Em que cenários um desenvolvedor React precisaria usar essas propriedades de navegação diretamente, em vez de depender da abstração do React?