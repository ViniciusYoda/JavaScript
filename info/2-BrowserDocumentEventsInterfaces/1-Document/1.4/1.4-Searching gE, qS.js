// -----

// As propriedades de navegação do DOM são ótimas quando os elementos estão próximos uns dos outros. E se não estiverem? Como obter um elemento arbitrário da página?
// Existem métodos de pesquisa adicionais para isso.

// -----

// ## `document.getElementById` ou apenas `id`

// Se um elemento tem o atributo **`id`**, podemos obter o elemento usando o método **`document.getElementById(id)`**, não importa onde ele esteja.
// Por exemplo:

// ```html
// <div id="elem">
//   <div id="elem-content">Elemento</div>
// </div>
// <script>
//   // pega o elemento
//   let elem = document.getElementById('elem');

//   // deixa seu fundo vermelho
//   elem.style.background = 'red';
// </script>
// ```

// Além disso, existe uma variável global nomeada pelo `id` que referencia o elemento:

// ```html
// <div id="elem">
//   <div id="elem-content">Elemento</div>
// </div>
// <script>
//   // elem é uma referência ao elemento DOM com id="elem"
//   elem.style.background = 'red';

//   // id="elem-content" tem um hífen, então não pode ser um nome de variável
//   // ...mas podemos acessá-lo usando colchetes: window['elem-content']
// </script>
// ```

// …Isso, a menos que declaremos uma variável JavaScript com o mesmo nome, então ela terá precedência:

// ```html
// <div id="elem"></div>
// <script>
//   let elem = 5; // agora elem é 5, não uma referência a <div id="elem">

//   alert(elem); // 5
// </script>
// ```

// -----

// #### Por favor, não use variáveis globais nomeadas por `id` para acessar elementos

// Esse comportamento é descrito na especificação, mas é suportado principalmente por compatibilidade.
// O navegador tenta nos ajudar misturando espaços de nomes de JS e DOM. Isso é bom para *scripts* simples, embutidos em HTML, mas geralmente não é uma boa ideia. Pode haver conflitos de nomes. Além disso, quando alguém lê o código JS e não tem o HTML à vista, não é óbvio de onde a variável vem.
// Aqui no tutorial, usamos o `id` para referenciar diretamente um elemento por brevidade, quando é óbvio de onde o elemento vem.
// Na vida real, `document.getElementById` é o método preferido.

// -----

// #### O `id` deve ser único

// O `id` deve ser **único**. Pode haver apenas um elemento no documento com o `id` fornecido.
// Se houver vários elementos com o mesmo `id`, o comportamento dos métodos que o utilizam é imprevisível, por exemplo, `document.getElementById` pode retornar qualquer um desses elementos aleatoriamente. Então, por favor, siga a regra e mantenha o `id` único.

// -----

// #### Apenas `document.getElementById`, não `anyElem.getElementById`

// O método `getElementById` pode ser chamado apenas no objeto **`document`**. Ele procura o `id` fornecido em todo o documento.

// -----

// ## `querySelectorAll`

// De longe, o método mais versátil, **`elem.querySelectorAll(css)`** retorna todos os elementos dentro de `elem` que correspondem ao seletor CSS fornecido.
// Aqui procuramos todos os elementos `<li>` que são os últimos filhos:

// ```html
// <ul>
//   <li>O</li>
//   <li>teste</li>
// </ul>
// <ul>
//   <li>foi</li>
//   <li>aprovado</li>
// </ul>
// <script>
//   let elements = document.querySelectorAll('ul > li:last-child');

//   for (let elem of elements) {
//     alert(elem.innerHTML); // "teste", "aprovado"
//   }
// </script>
// ```

// Este método é realmente poderoso, pois qualquer seletor CSS pode ser usado.

// -----

// #### Pode usar pseudo-classes também

// Pseudo-classes no seletor CSS como `:hover` e `:active` também são suportadas. Por exemplo, `document.querySelectorAll(':hover')` retornará a coleção com os elementos sobre os quais o ponteiro está agora (em ordem de aninhamento: do `<html>` mais externo ao mais aninhado).

// -----

// ## `querySelector`

// A chamada para **`elem.querySelector(css)`** retorna o **primeiro** elemento para o seletor CSS fornecido.
// Em outras palavras, o resultado é o mesmo que `elem.querySelectorAll(css)[0]`, mas este último está procurando por todos os elementos e escolhendo um, enquanto `elem.querySelector` apenas procura por um. Então é mais rápido e também mais curto de escrever.

// -----

// ## `matches`

// Os métodos anteriores estavam pesquisando o DOM.
// O método **`elem.matches(css)`** não procura por nada, ele simplesmente verifica se `elem` corresponde ao seletor CSS fornecido. Ele retorna `true` ou `false`.
// O método é útil quando estamos iterando sobre elementos (como em um *array* ou algo assim) e tentando filtrar aqueles que nos interessam.
// Por exemplo:

// ```html
// <a href="http://example.com/arquivo.zip">...</a>
// <a href="http://google.com">...</a>
// <script>
//   // pode ser qualquer coleção em vez de document.body.children
//   for (let elem of document.body.children) {
//     if (elem.matches('a[href$="zip"]')) {
//       alert("A referência do arquivo: " + elem.href );
//     }
//   }
// </script>
// ```

// -----

// ## `closest`

// **Ancestrais** de um elemento são: pai, o pai do pai, o pai deste e assim por diante. Os ancestrais juntos formam a cadeia de pais do elemento até o topo.
// O método **`elem.closest(css)`** procura o ancestral mais próximo que corresponde ao seletor CSS. O próprio `elem` também é incluído na busca.
// Em outras palavras, o método `closest` sobe a partir do elemento e verifica cada um dos pais. Se corresponder ao seletor, a busca para e o ancestral é retornado.
// Por exemplo:

// ```html
// <h1>Conteúdo</h1>
// <div class="conteudo">
//   <ul class="livro">
//     <li class="capitulo">Capítulo 1</li>
//     <li class="capitulo">Capítulo 2</li>
//   </ul>
// </div>
// <script>
//   let capitulo = document.querySelector('.capitulo'); // LI

//   alert(capitulo.closest('.livro')); // UL
//   alert(capitulo.closest('.conteudo')); // DIV

//   alert(capitulo.closest('h1')); // null (porque h1 não é um ancestral)
// </script>
// ```

// -----

// ## `getElementsBy*`

// Existem também outros métodos para procurar nós por *tag*, classe, etc.
// Hoje, eles são principalmente históricos, pois `querySelector` é mais poderoso e mais curto de escrever.
// Então, aqui os cobrimos principalmente para fins de completude, embora você ainda possa encontrá-los em *scripts* antigos.

//   * **`elem.getElementsByTagName(tag)`**: procura elementos com a *tag* fornecida e retorna a coleção deles. O parâmetro `tag` também pode ser um asterisco `*` para "qualquer *tag*".
//   * **`elem.getElementsByClassName(className)`**: retorna elementos que possuem a classe CSS fornecida.
//   * **`document.getElementsByName(name)`**: retorna elementos com o atributo `name` fornecido, em todo o documento. Muito raramente usado.

// Por exemplo:

// ```javascript
// // pega todas as divs no documento
// let divs = document.getElementsByTagName('div');
// ```

// Vamos encontrar todas as *tags* `input` dentro da tabela:

// ```html
// <table id="table">
//   <tr>
//     <td>Sua idade:</td>
//     <td>
//       <label>
//         <input type="radio" name="age" value="young" checked> menos de 18
//       </label>
//       <label>
//         <input type="radio" name="age" value="mature"> de 18 a 50
//       </label>
//       <label>
//         <input type="radio" name="age" value="senior"> mais de 60
//       </label>
//     </td>
//   </tr>
// </table>
// <script>
//   let inputs = table.getElementsByTagName('input');

//   for (let input of inputs) {
//     alert( input.value + ': ' + input.checked );
//   }
// </script>
// ```

// -----

// #### Não esqueça a letra "s"\!

// Desenvolvedores iniciantes às vezes esquecem a letra "s". Ou seja, eles tentam chamar `getElementByTagName` em vez de `getElementsByTagName`.
// A letra "s" está ausente em `getElementById`, porque ele retorna um único elemento. Mas `getElementsByTagName` retorna uma coleção de elementos, então há um "s" ali.

// -----

// #### Retorna uma coleção, não um elemento\!

// Outro erro comum de iniciante é escrever:

// ```javascript
// // não funciona
// document.getElementsByTagName('input').value = 5;
// ```

// Isso não funcionará, porque ele pega uma coleção de *inputs* e atribui o valor a ela, em vez de aos elementos dentro dela.
// Devemos iterar sobre a coleção ou obter um elemento por seu índice e, em seguida, atribuir, assim:

// ```javascript
// // deve funcionar (se houver um input)
// document.getElementsByTagName('input')[0].value = 5;
// ```

// Procurando por elementos `.article`:

// ```html
// <form name="my-form">
//   <div class="article">Artigo</div>
//   <div class="long article">Artigo longo</div>
// </form>
// <script>
//   // encontra pelo atributo name
//   let form = document.getElementsByName('my-form')[0];

//   // encontra pela classe dentro do formulário
//   let articles = form.getElementsByClassName('article');
//   alert(articles.length); // 2, encontrou dois elementos com a classe "article"
// </script>
// ```

// -----

// ## Coleções `Live` vs. `Static`

// Todos os métodos `getElementsBy*` retornam uma **coleção "ao vivo" (live collection)**. Tais coleções sempre refletem o estado atual do documento e se "auto-atualizam" quando ele muda.
// No exemplo abaixo, há dois *scripts*.

// O primeiro cria uma referência à coleção de `<div>`. Por enquanto, seu `length` é 1.
// O segundo *script* é executado depois que o navegador encontra mais um `<div>`, então seu `length` é 2.

// ```html
// <div>Primeira div</div>
// <script>
//   let divs = document.getElementsByTagName('div');
//   alert(divs.length); // 1
// </script>
// <div>Segunda div</div>
// <script>
//   alert(divs.length); // 2
// </script>
// ```

// Em contraste, **`querySelectorAll`** retorna uma **coleção estática**. É como um *array* fixo de elementos.
// Se o usarmos, ambos os *scripts* exibem 1:

// ```html
// <div>Primeira div</div>
// <script>
//   let divs = document.querySelectorAll('div');
//   alert(divs.length); // 1
// </script>
// <div>Segunda div</div>
// <script>
//   alert(divs.length); // 1
// </script>
// ```

// Agora podemos ver facilmente a diferença. A coleção estática não aumentou após o aparecimento de uma nova `div` no documento.

// -----

// ## Resumo

// Existem 6 métodos principais para pesquisar nós no DOM:

// | Método            | Procura por...     | Pode chamar em um elemento? | Live? |
// | :---------------- | :----------------- | :-------------------------- | :---- |
// | `querySelector`     | Seletor CSS        | ✔                           | ✖     |
// | `querySelectorAll`  | Seletor CSS        | ✔                           | ✖     |
// | `getElementById`    | `id`               | ✖                           | ✖     |
// | `getElementsByName` | `name`             | ✖                           | ✔     |
// | `getElementsByTagName`| `tag` ou `*`       | ✔                           | ✔     |
// | `getElementsByClassName`| `class`            | ✔                           | ✔     |

// De longe, os mais usados são `querySelector` e `querySelectorAll`, mas `getElement(s)By*` podem ser esporadicamente úteis ou encontrados em *scripts* antigos.

// Além disso:

//   * Existe **`elem.matches(css)`** para verificar se `elem` corresponde ao seletor CSS fornecido.
//   * Existe **`elem.closest(css)`** para procurar o ancestral mais próximo que corresponde ao seletor CSS fornecido. O próprio `elem` também é verificado.

// E vamos mencionar mais um método aqui para verificar a relação pai-filho, pois às vezes é útil:

//   * **`elemA.contains(elemB)`**: retorna `true` se `elemB` estiver dentro de `elemA` (um descendente de `elemA`) ou quando `elemA == elemB`.

// -----
