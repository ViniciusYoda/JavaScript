// ---
// ## Atribuição Via Desestruturação (Destructuring Assignment)

// As duas estruturas de dados mais usadas em JavaScript são **Object** e **Array**.

// * **Objetos** nos permitem criar uma única entidade que armazena itens de dados por chave.
// * **Arrays** nos permitem agrupar itens de dados em uma lista ordenada.

// No entanto, quando passamos esses dados para uma função, podemos não precisar de tudo. A função pode exigir apenas certos elementos ou propriedades.

// **Atribuição via desestruturação** é uma sintaxe especial que nos permite "desempacotar" arrays ou objetos em várias variáveis, pois às vezes isso é mais conveniente.

// A desestruturação também funciona bem com funções complexas que possuem muitos parâmetros, valores padrão e assim por diante. Em breve veremos isso.

// ---
// ### Desestruturação de Array

// Aqui está um exemplo de como um array é desestruturado em variáveis:

// ```javascript
// // temos um array com nome e sobrenome
// let arr = ["John", "Smith"];

// // atribuição via desestruturação
// // define firstName = arr[0]
// // e surname = arr[1]
// let [firstName, surname] = arr;

// alert(firstName); // John
// alert(surname);  // Smith
// ```

// Agora podemos trabalhar com variáveis em vez de membros do array.

// Isso fica ótimo quando combinado com `split` ou outros métodos que retornam arrays:

// ```javascript
// let [firstName, surname] = "John Smith".split(' ');
// alert(firstName); // John
// alert(surname);  // Smith
// ```

// Como você pode ver, a sintaxe é simples. No entanto, existem vários detalhes peculiares. Vamos ver mais exemplos para entender melhor.

// ---
// #### "Desestruturação" não significa "destrutivo".

// É chamado de "atribuição via desestruturação" porque ele "desestrutura" copiando itens para variáveis. No entanto, o array em si não é modificado.

// É apenas uma maneira mais curta de escrever:

// ```javascript
// // let [firstName, surname] = arr;
// let firstName = arr[0];
// let surname = arr[1];
// ```

// ---
// #### Ignorar elementos usando vírgulas

// Elementos indesejados do array também podem ser descartados por meio de uma vírgula extra:

// ```javascript
// // o segundo elemento não é necessário
// let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// alert( title ); // Consul
// ```

// No código acima, o segundo elemento do array é ignorado, o terceiro é atribuído a `title`, e o restante dos itens do array também são ignorados (pois não há variáveis para eles).

// ---
// #### Funciona com qualquer iterável no lado direito

// ...Na verdade, podemos usá-lo com qualquer iterável, não apenas arrays:

// ```javascript
// let [a, b, c] = "abc"; // ["a", "b", "c"]
// let [one, two, three] = new Set([1, 2, 3]);
// ```

// Isso funciona porque, internamente, uma atribuição via desestruturação funciona iterando sobre o valor à direita. É uma espécie de açúcar sintático para chamar `for..of` sobre o valor à direita de `=` e atribuir os valores.

// ---
// #### Atribuir a qualquer coisa no lado esquerdo

// Podemos usar qualquer "atribuível" no lado esquerdo.

// Por exemplo, uma propriedade de objeto:

// ```javascript
// let user = {};
// [user.name, user.surname] = "John Smith".split(' ');

// alert(user.name); // John
// alert(user.surname); // Smith
// ```

// ---
// #### Loop com `.entries()`

// No capítulo anterior, vimos o método `Object.entries(obj)`.

// Podemos usá-lo com desestruturação para iterar sobre as chaves e valores de um objeto:

// ```javascript
// let user = {
//   name: "John",
//   age: 30
// };

// // iterar sobre as chaves e valores
// for (let [key, value] of Object.entries(user)) {
//   alert(`${key}:${value}`); // name:John, then age:30
// }
// ```

// O código semelhante para um **Map** é mais simples, pois ele é iterável:

// ```javascript
// let user = new Map();
// user.set("name", "John");
// user.set("age", "30");

// // Map itera como pares [key, value], muito conveniente para desestruturação
// for (let [key, value] of user) {
//   alert(`${key}:${value}`); // name:John, then age:30
// }
// ```

// ---
// #### Truque de troca de variáveis

// Existe um truque bem conhecido para trocar valores de duas variáveis usando uma atribuição via desestruturação:

// ```javascript
// let guest = "Jane";
// let admin = "Pete";

// // Vamos trocar os valores: fazer guest=Pete, admin=Jane
// [guest, admin] = [admin, guest];

// alert(`${guest} ${admin}`); // Pete Jane (trocado com sucesso!)
// ```

// Aqui criamos um array temporário de duas variáveis e imediatamente o desestruturamos em ordem trocada.

// Podemos trocar mais de duas variáveis dessa maneira.

// ---
// #### O restante `...`

// Normalmente, se o array for mais longo que a lista à esquerda, os itens "extras" são omitidos.

// Por exemplo, aqui apenas dois itens são pegos, e o resto é simplesmente ignorado:

// ```javascript
// let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// alert(name1); // Julius
// alert(name2); // Caesar

// // Itens adicionais não são atribuídos a lugar nenhum
// ```

// Se quisermos também coletar tudo o que segue – podemos adicionar um parâmetro a mais que recebe "o resto" usando três pontos `...`:

// ```javascript
// let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// // rest é um array de itens, começando do 3º
// alert(rest[0]); // Consul
// alert(rest[1]); // of the Roman Republic
// alert(rest.length); // 2
// ```

// O valor de `rest` é o array dos elementos restantes do array.

// Podemos usar qualquer outro nome de variável no lugar de `rest`, apenas certifique-se de que ele tenha três pontos antes e seja o último na atribuição via desestruturação.

// ```javascript
// let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// // agora titles = ["Consul", "of the Roman Republic"]
// ```

// ---
// #### Valores padrão

// Se o array for mais curto que a lista de variáveis à esquerda, não haverá erros. Valores ausentes são considerados `undefined`:

// ```javascript
// let [firstName, surname] = [];

// alert(firstName); // undefined
// alert(surname); // undefined
// ```

// Se quisermos um valor "padrão" para substituir o ausente, podemos fornecê-lo usando `=`, assim:

// ```javascript
// // valores padrão
// let [name = "Guest", surname = "Anonymous"] = ["Julius"];

// alert(name);    // Julius (do array)
// alert(surname); // Anonymous (padrão usado)
// ```

// Os valores padrão podem ser expressões mais complexas ou até mesmo chamadas de função. Eles são avaliados apenas se o valor não for fornecido.

// Por exemplo, aqui usamos a função `prompt` para dois padrões:

// ```javascript
// // executa prompt apenas para surname
// let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

// alert(name);    // Julius (do array)
// alert(surname); // o que prompt obtiver
// ```

// Por favor, note: o `prompt` só será executado para o valor ausente (`surname`).

// ---
// ### Desestruturação de Objeto

// A atribuição via desestruturação também funciona com objetos.

// A sintaxe básica é:

// ```javascript
// let {var1, var2} = {var1:…, var2:…}
// ```

// Devemos ter um objeto existente no lado direito, que queremos dividir em variáveis. O lado esquerdo contém um "padrão" semelhante a um objeto para as propriedades correspondentes. No caso mais simples, é uma lista de nomes de variáveis em `{...}`.

// Por exemplo:

// ```javascript
// let options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };

// let {title, width, height} = options;

// alert(title);  // Menu
// alert(width);  // 100
// alert(height); // 200
// ```

// As propriedades `options.title`, `options.width` e `options.height` são atribuídas às variáveis correspondentes.

// A ordem não importa. Isso também funciona:

// ```javascript
// // ordem alterada em let {...}
// let {height, width, title} = { title: "Menu", height: 200, width: 100 }
// ```

// O padrão no lado esquerdo pode ser mais complexo e especificar o mapeamento entre propriedades e variáveis.

// Se quisermos atribuir uma propriedade a uma variável com outro nome, por exemplo, fazer `options.width` ir para a variável nomeada `w`, então podemos definir o nome da variável usando dois pontos:

// ```javascript
// let options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };

// // { propriedadeDeOrigem: variavelDeDestino }
// let {width: w, height: h, title} = options;

// // width -> w
// // height -> h
// // title -> title

// alert(title);  // Menu
// alert(w);      // 100
// alert(h);      // 200
// ```

// Os dois pontos mostram "o que : vai para onde". No exemplo acima, a propriedade `width` vai para `w`, a propriedade `height` vai para `h`, e `title` é atribuído ao mesmo nome.

// Para propriedades potencialmente ausentes, podemos definir valores padrão usando `=`, assim:

// ```javascript
// let options = {
//   title: "Menu"
// };

// let {width = 100, height = 200, title} = options;

// alert(title);  // Menu
// alert(width);  // 100
// alert(height); // 200
// ```

// Assim como em arrays ou parâmetros de função, os valores padrão podem ser quaisquer expressões ou até mesmo chamadas de função. Eles serão avaliados se o valor não for fornecido.

// No código abaixo, `prompt` pergunta por `width`, mas não por `title`:

// ```javascript
// let options = {
//   title: "Menu"
// };

// let {width = prompt("width?"), title = prompt("title?")} = options;

// alert(title);  // Menu
// alert(width);  // (qualquer que seja o resultado do prompt)
// ```

// Também podemos combinar os dois pontos e a igualdade:

// ```javascript
// let options = {
//   title: "Menu"
// };

// let {width: w = 100, height: h = 200, title} = options;

// alert(title);  // Menu
// alert(w);      // 100
// alert(h);      // 200
// ```

// Se tivermos um objeto complexo com muitas propriedades, podemos extrair apenas o que precisamos:

// ```javascript
// let options = {
//   title: "Menu",
//   width: 100,
//   height: 200
// };

// // extrair apenas o título como uma variável
// let { title } = options;

// alert(title); // Menu
// ```

// ---
// #### O padrão "rest" `...`

// E se o objeto tiver mais propriedades do que temos variáveis? Podemos pegar algumas e então atribuir o "resto" em algum lugar?

// Podemos usar o padrão "rest", assim como fizemos com arrays. Ele não é suportado por alguns navegadores mais antigos (IE, use Babel para polyfill), mas funciona nos modernos.

// Ele se parece com isto:

// ```javascript
// let options = {
//   title: "Menu",
//   height: 200,
//   width: 100
// };

// // title = propriedade nomeada title
// // rest = objeto com o resto das propriedades
// let {title, ...rest} = options;

// // agora title="Menu", rest={height: 200, width: 100}
// alert(rest.height);  // 200
// alert(rest.width);   // 100
// ```

// ---
// #### Pega se não houver `let`

// Nos exemplos acima, as variáveis foram declaradas diretamente na atribuição: `let {...} = {...}`. Claro, poderíamos usar variáveis existentes também, sem `let`. Mas há uma pegadinha.

// Isso não funcionará:

// ```javascript
// let title, width, height;

// // erro nesta linha
// {title, width, height} = {title: "Menu", width: 200, height: 100};
// ```

// O problema é que o JavaScript trata `{...}` no fluxo de código principal (não dentro de outra expressão) como um bloco de código. Tais blocos de código podem ser usados para agrupar instruções, assim:

// ```javascript
// {
//   // um bloco de código
//   let message = "Hello";
//   // ...
//   alert( message );
// }
// ```

// Então, aqui o JavaScript assume que temos um bloco de código, por isso há um erro. Queremos desestruturação.

// Para mostrar ao JavaScript que não é um bloco de código, podemos envolver a expressão em parênteses `(...)`:

// ```javascript
// let title, width, height;

// // ok agora
// ({title, width, height} = {title: "Menu", width: 200, height: 100});

// alert( title ); // Menu
// ```

// ---
// ### Desestruturação Aninhada

// Se um objeto ou um array contém outros objetos e arrays aninhados, podemos usar padrões mais complexos no lado esquerdo para extrair partes mais profundas.

// No código abaixo, `options` tem outro objeto na propriedade `size` e um array na propriedade `items`. O padrão no lado esquerdo da atribuição tem a mesma estrutura para extrair valores deles:

// ```javascript
// let options = {
//   size: {
//     width: 100,
//     height: 200
//   },
//   items: ["Cake", "Donut"],
//   extra: true
// };

// // atribuição via desestruturação dividida em várias linhas para clareza
// let {
//   size: { // colocar size aqui
//     width,
//     height
//   },
//   items: [item1, item2], // atribuir items aqui
//   title = "Menu" // não presente no objeto (valor padrão é usado)
// } = options;

// alert(title);  // Menu
// alert(width);  // 100
// alert(height); // 200
// alert(item1);  // Cake
// alert(item2);  // Donut
// ```

// Todas as propriedades do objeto `options`, exceto `extra` que está ausente na parte esquerda, são atribuídas às variáveis correspondentes:

// Finalmente, temos `width`, `height`, `item1`, `item2` e `title` do valor padrão.

// Observe que não há variáveis para `size` e `items`, pois pegamos o conteúdo delas.

// ---
// ### Parâmetros de Função Inteligentes

// Há momentos em que uma função tem muitos parâmetros, a maioria dos quais são opcionais. Isso é especialmente verdade para interfaces de usuário. Imagine uma função que cria um menu. Ela pode ter uma largura, uma altura, um título, uma lista de itens e assim por diante.

// Aqui está uma maneira ruim de escrever essa função:

// ```javascript
// function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
//   // ...
// }
// ```

// Na vida real, o problema é como lembrar a ordem dos argumentos. Normalmente, as IDEs tentam nos ajudar, especialmente se o código estiver bem documentado, mas ainda assim... Outro problema é como chamar uma função quando a maioria dos parâmetros está ok por padrão.

// Assim?

// ```javascript
// // undefined onde os valores padrão estão ok
// showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
// ```

// Isso é feio. E se torna ilegível quando lidamos com mais parâmetros.

// A desestruturação vem ao resgate!

// Podemos passar parâmetros como um objeto, e a função os desestrutura imediatamente em variáveis:

// ```javascript
// // passamos o objeto para a função
// let options = {
//   title: "My menu",
//   items: ["Item1", "Item2"]
// };

// // ...e ele imediatamente o expande para variáveis
// function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
//   // title, items – retirados de options,
//   // width, height – padrões usados
//   alert( `${title} ${width} ${height}` ); // My Menu 200 100
//   alert( items ); // Item1, Item2
// }

// showMenu(options);
// ```

// Também podemos usar desestruturação mais complexa com objetos aninhados e mapeamentos de dois pontos:

// ```javascript
// let options = {
//   title: "My menu",
//   items: ["Item1", "Item2"]
// };

// function showMenu({
//   title = "Untitled",
//   width: w = 100,  // width vai para w
//   height: h = 200, // height vai para h
//   items: [item1, item2] // o primeiro elemento de items vai para item1, o segundo para item2
// }) {
//   alert( `${title} ${w} ${h}` ); // My Menu 100 200
//   alert( item1 ); // Item1
//   alert( item2 ); // Item2
// }

// showMenu(options);
// ```

// A sintaxe completa é a mesma de uma atribuição via desestruturação:

// ```javascript
// function({
//   incomingProperty: varName = defaultValue
//   ...
// })
// ```

// Então, para um objeto de parâmetros, haverá uma variável `varName` para a propriedade `incomingProperty`, com `defaultValue` por padrão.

// Por favor, note que essa desestruturação assume que `showMenu()` tem um argumento. Se quisermos todos os valores por padrão, então devemos especificar um objeto vazio:

// ```javascript
// showMenu({}); // ok, todos os valores são padrão
// showMenu();   // isso daria um erro
// ```

// Podemos corrigir isso tornando `{}` o valor padrão para todo o objeto de parâmetros:

// ```javascript
// function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
//   alert( `${title} ${width} ${height}` );
// }

// showMenu(); // Menu 100 200
// ```

// No código acima, todo o objeto de argumentos é `{}` por padrão, então sempre há algo para desestruturar.

// ---
// ### Resumo

// A **atribuição via desestruturação** permite mapear instantaneamente um objeto ou array para muitas variáveis.

// A sintaxe completa do objeto:

// ```javascript
// let {prop : varName = defaultValue, ...rest} = object
// ```

// Isso significa que a propriedade `prop` deve ir para a variável `varName` e, se tal propriedade não existir, o valor `defaultValue` deve ser usado.

// As propriedades do objeto que não possuem mapeamento são copiadas para o objeto `rest`.

// A sintaxe completa do array:

// ```javascript
// let [item1 = defaultValue, item2, ...rest] = array
// ```

// O primeiro item vai para `item1`; o segundo vai para `item2`, e todo o resto forma o array `rest`.

// É possível extrair dados de arrays/objetos aninhados; para isso, o lado esquerdo deve ter a mesma estrutura que o lado direito.