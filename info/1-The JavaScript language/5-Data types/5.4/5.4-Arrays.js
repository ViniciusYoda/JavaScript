// -----

// ## Arrays

// Objetos permitem armazenar coleções de valores com chaves. Isso é ótimo.

// Mas com bastante frequência, precisamos de uma **coleção ordenada**, onde temos um 1º, um 2º, um 3º elemento e assim por diante. Por exemplo, precisamos disso para armazenar uma lista de algo: usuários, produtos, elementos HTML, etc.

// Não é conveniente usar um objeto aqui, porque ele não fornece métodos para gerenciar a ordem dos elementos. Não podemos inserir uma nova propriedade "entre" as existentes. Objetos simplesmente não são feitos para esse uso.

// Existe uma estrutura de dados especial chamada **Array**, para armazenar coleções ordenadas.

// -----

// ### Declaração

// Existem duas sintaxes para criar um array vazio:

// ```javascript
// let arr = new Array();
// let arr = [];
// ```

// Quase sempre, a segunda sintaxe é usada. Podemos fornecer elementos iniciais entre colchetes:

// ```javascript
// let fruits = ["Maçã", "Laranja", "Ameixa"];
// ```

// Os elementos do array são numerados, começando com zero.

// Podemos obter um elemento pelo seu número entre colchetes:

// ```javascript
// let fruits = ["Maçã", "Laranja", "Ameixa"];
// alert( fruits[0] ); // Maçã
// alert( fruits[1] ); // Laranja
// alert( fruits[2] ); // Ameixa
// ```

// Podemos substituir um elemento:

// ```javascript
// fruits[2] = 'Pera'; // agora ["Maçã", "Laranja", "Pera"]
// ```

// …Ou adicionar um novo ao array:

// ```javascript
// fruits[3] = 'Limão'; // agora ["Maçã", "Laranja", "Pera", "Limão"]
// ```

// A contagem total dos elementos no array é sua **`length`**:

// ```javascript
// let fruits = ["Maçã", "Laranja", "Ameixa"];
// alert( fruits.length ); // 3
// ```

// Também podemos usar `alert` para mostrar o array inteiro.

// ```javascript
// let fruits = ["Maçã", "Laranja", "Ameixa"];
// alert( fruits ); // Maçã,Laranja,Ameixa
// ```

// Um array pode armazenar elementos de **qualquer tipo**.

// Por exemplo:

// ```javascript
// // mistura de valores
// let arr = [ 'Maçã', { name: 'João' }, true, function() { alert('olá'); } ];

// // obtém o objeto no índice 1 e então mostra seu nome
// alert( arr[1].name ); // João

// // obtém a função no índice 3 e a executa
// arr[3](); // olá
// ```

// #### Vírgula à direita

// Um array, assim como um objeto, pode terminar com uma vírgula:

// ```javascript
// let fruits = [
//   "Maçã",
//   "Laranja",
//   "Ameixa",
// ];
// ```

// O estilo de "vírgula à direita" facilita a inserção/remoção de itens, porque todas as linhas se tornam parecidas.

// -----

// ### Obtendo os últimos elementos com "at"

// #### Uma adição recente

// Esta é uma adição recente à linguagem. Navegadores antigos podem precisar de [polyfills](https://javascript.info/polyfills).

// Digamos que queremos o último elemento do array.

// Algumas linguagens de programação permitem o uso de índices negativos para o mesmo propósito, como `fruits[-1]`.

// No entanto, em JavaScript isso não funcionará. O resultado será `undefined`, porque o índice entre colchetes é tratado literalmente.

// Podemos calcular explicitamente o índice do último elemento e então acessá-lo: `fruits[fruits.length - 1]`.

// ```javascript
// let fruits = ["Maçã", "Laranja", "Ameixa"];
// alert( fruits[fruits.length-1] ); // Ameixa
// ```

// Um pouco complicado, não é? Precisamos escrever o nome da variável duas vezes.

// Felizmente, existe uma sintaxe mais curta: `fruits.at(-1)`:

// ```javascript
// let fruits = ["Maçã", "Laranja", "Ameixa"];
// // o mesmo que fruits[fruits.length-1]
// alert( fruits.at(-1) ); // Ameixa
// ```

// Em outras palavras, `arr.at(i)`:

//   * é exatamente o mesmo que `arr[i]`, se `i >= 0`.
//   * para valores negativos de `i`, ele retrocede a partir do final do array.

// -----

// ### Métodos `pop`/`push`, `shift`/`unshift`

// Uma **fila** é um dos usos mais comuns de um array. Na ciência da computação, isso significa uma coleção ordenada de elementos que suporta duas operações:

//   * `push` anexa um elemento ao final.
//   * `shift` obtém um elemento do início, avançando a fila, para que o 2º elemento se torne o 1º.

// Arrays suportam ambas as operações.

// Na prática, precisamos disso com muita frequência. Por exemplo, uma fila de mensagens que precisam ser exibidas na tela.

// Existe outro caso de uso para arrays – a estrutura de dados chamada **pilha**.

// Ela suporta duas operações:

//   * `push` adiciona um elemento ao final.
//   * `pop` retira um elemento do final.

// Então, novos elementos são adicionados ou retirados sempre do "final".

// Uma pilha é geralmente ilustrada como um baralho de cartas: novas cartas são adicionadas ao topo ou retiradas do topo:

// Para pilhas, o último item inserido é recebido primeiro, o que também é chamado de princípio LIFO (Last-In-First-Out - Último a Entrar, Primeiro a Sair). Para filas, temos FIFO (First-In-First-Out - Primeiro a Entrar, Primeiro a Sair).

// Arrays em JavaScript podem funcionar tanto como fila quanto como pilha. Eles permitem adicionar/remover elementos, tanto no/do início quanto no/do final.

// Na ciência da computação, a estrutura de dados que permite isso é chamada de **deque**.

// Métodos que funcionam com o final do array:

//   * **`pop`**
//     Extrai o último elemento do array e o retorna:

//     ```javascript
//     let fruits = ["Maçã", "Laranja", "Pera"];
//     alert( fruits.pop() ); // remove "Pera" e o exibe
//     alert( fruits ); // Maçã, Laranja
//     ```

//     Tanto `fruits.pop()` quanto `fruits.at(-1)` retornam o último elemento do array, mas `fruits.pop()` também modifica o array removendo-o.

//   * **`push`**
//     Anexa o elemento ao final do array:

//     ```javascript
//     let fruits = ["Maçã", "Laranja"];

//     fruits.push("Pera");
//     alert( fruits ); // Maçã, Laranja, Pera
//     ```

//     A chamada `fruits.push(...)` é equivalente a `fruits[fruits.length] = ....`

// Métodos que funcionam com o início do array:

//   * **`shift`**
//     Extrai o primeiro elemento do array e o retorna:

//     ```javascript
//     let fruits = ["Maçã", "Laranja", "Pera"];
//     alert( fruits.shift() ); // remove Maçã e o exibe
//     alert( fruits ); // Laranja, Pera
//     ```

//   * **`unshift`**
//     Adiciona o elemento ao início do array:

//     ```javascript
//     let fruits = ["Laranja", "Pera"];

//     fruits.unshift('Maçã');
//     alert( fruits ); // Maçã, Laranja, Pera
//     ```

// Os métodos `push` e `unshift` podem adicionar múltiplos elementos de uma vez:

// ```javascript
// let fruits = ["Maçã"];

// fruits.push("Laranja", "Pêssego");
// fruits.unshift("Abacaxi", "Limão");

// // ["Abacaxi", "Limão", "Maçã", "Laranja", "Pêssego"]
// alert( fruits );
// ```

// -----

// ### Detalhes Internos

// Um array é um tipo especial de objeto. Os colchetes usados para acessar uma propriedade `arr[0]` na verdade vêm da sintaxe de objeto. Isso é essencialmente o mesmo que `obj[key]`, onde `arr` é o objeto, enquanto números são usados como chaves.

// Eles estendem objetos, fornecendo métodos especiais para trabalhar com coleções ordenadas de dados e também a propriedade `length`. Mas no fundo, ainda é um objeto.

// Lembre-se, existem apenas oito tipos de dados básicos em JavaScript (veja o capítulo [Tipos de dados](https://javascript.info/data-types) para mais informações). Array é um objeto e, portanto, se comporta como um objeto.

// Por exemplo, ele é copiado por referência:

// ```javascript
// let fruits = ["Banana"]
// let arr = fruits; // copia por referência (duas variáveis referenciam o mesmo array)
// alert( arr === fruits ); // true

// arr.push("Pera"); // modifica o array por referência
// alert( fruits ); // Banana, Pera - 2 itens agora
// ```

// …Mas o que torna os arrays realmente especiais é sua representação interna. O motor tenta armazenar seus elementos em uma área de memória contígua, um após o outro, assim como ilustrado nas imagens deste capítulo, e há outras otimizações também, para fazer os arrays funcionarem muito rápido.

// Mas todas elas se desfazem se pararmos de trabalhar com um array como uma "coleção ordenada" e começarmos a trabalhar com ele como se fosse um objeto regular.

// Por exemplo, tecnicamente podemos fazer isso:

// ```javascript
// let fruits = []; // cria um array

// fruits[99999] = 5; // atribui uma propriedade com um índice muito maior que seu comprimento

// fruits.age = 25; // cria uma propriedade com um nome arbitrário
// ```

// Isso é possível, porque arrays são objetos em sua base. Podemos adicionar qualquer propriedade a eles.

// Mas o motor verá que estamos trabalhando com o array como um objeto regular. Otimizações específicas de array não são adequadas para esses casos e serão desativadas, seus benefícios desaparecem.

// As maneiras de usar um array de forma inadequada:

//   * Adicionar uma propriedade não numérica como `arr.test = 5`.
//   * Criar "buracos", como: adicionar `arr[0]` e depois `arr[1000]` (e nada entre eles).
//   * Preencher o array na ordem inversa, como `arr[1000]`, `arr[999]` e assim por diante.

// Por favor, pense nos arrays como estruturas especiais para trabalhar com **dados ordenados**. Eles fornecem métodos especiais para isso. Os arrays são cuidadosamente ajustados nos motores JavaScript para trabalhar com dados ordenados contíguos; por favor, use-os dessa maneira. E se você precisar de chaves arbitrárias, é bem provável que você realmente precise de um objeto regular `{}`.

// -----

// ### Performance

// Os métodos `push`/`pop` são rápidos, enquanto `shift`/`unshift` são lentos.

// Por que é mais rápido trabalhar com o final de um array do que com o seu início? Vamos ver o que acontece durante a execução:

// ```javascript
// fruits.shift(); // retira 1 elemento do início
// ```

// Não é suficiente apenas retirar e remover o elemento com o índice `0`. Outros elementos precisam ser renumerados também.

// A operação `shift` deve fazer 3 coisas:

// 1.  Remover o elemento com o índice `0`.
// 2.  Mover todos os elementos para a esquerda, renumerando-os do índice `1` para `0`, do `2` para `1` e assim por diante.
// 3.  Atualizar a propriedade `length`.

// Quanto mais elementos no array, mais tempo para movê-los, mais operações na memória.
// A mesma coisa acontece com `unshift`: para adicionar um elemento ao início do array, precisamos primeiro mover os elementos existentes para a direita, aumentando seus índices.

// E quanto a `push`/`pop`? Eles não precisam mover nada. Para extrair um elemento do final, o método `pop` limpa o índice e encurta o `length`.
// As ações para a operação `pop`:

// ```javascript
// fruits.pop(); // retira 1 elemento do final
// ```

// O método `pop` não precisa mover nada, porque os outros elementos mantêm seus índices. É por isso que é extremamente rápido.
// O mesmo acontece com o método `push`.

// -----

// ### Laços (Loops)

// Uma das maneiras mais antigas de percorrer itens de array é o loop `for` sobre os índices:

// ```javascript
// let arr = ["Maçã", "Laranja", "Pera"];
// for (let i = 0; i < arr.length; i++) {
//   alert( arr[i] );
// }
// ```

// Mas para arrays existe outra forma de loop, o `for..of`:

// ```javascript
// let fruits = ["Maçã", "Laranja", "Ameixa"];

// // itera sobre os elementos do array
// for (let fruit of fruits) {
//   alert( fruit );
// }
// ```

// O `for..of` não dá acesso ao número do elemento atual, apenas ao seu valor, mas na maioria dos casos isso é suficiente. E é mais curto.

// Tecnicamente, como arrays são objetos, também é possível usar `for..in`:

// ```javascript
// let arr = ["Maçã", "Laranja", "Pera"];
// for (let key in arr) {
//   alert( arr[key] ); // Maçã, Laranja, Pera
// }
// ```

// Mas isso é na verdade uma má ideia. Existem problemas potenciais com isso:

//   * O loop `for..in` itera sobre **todas as propriedades**, não apenas as numéricas.
//     Existem os chamados objetos "semelhantes a array" no navegador e em outros ambientes, que **parecem arrays**. Ou seja, eles têm propriedades `length` e de índices, mas também podem ter outras propriedades e métodos não numéricos, que geralmente não precisamos. O loop `for..in`, no entanto, os listará. Então, se precisarmos trabalhar com objetos semelhantes a array, essas propriedades "extras" podem se tornar um problema.
//   * O loop `for..in` é otimizado para objetos genéricos, não arrays, e, portanto, é 10 a 100 vezes mais lento. Claro, ainda é muito rápido. O aumento de velocidade pode importar apenas em gargalos. Mas ainda devemos estar cientes da diferença.

// Geralmente, não devemos usar `for..in` para arrays.

// -----

// ### Uma palavra sobre "length"

// A propriedade `length` se atualiza automaticamente quando modificamos o array. Para ser preciso, na verdade não é a contagem de valores no array, mas o maior índice numérico mais um.

// Por exemplo, um único elemento com um índice grande resulta em um grande comprimento:

// ```javascript
// let fruits = [];
// fruits[123] = "Maçã";
// alert( fruits.length ); // 124
// ```

// Note que geralmente não usamos arrays dessa forma.

// Outra coisa interessante sobre a propriedade `length` é que ela é **gravável**.

// Se a aumentarmos manualmente, nada de interessante acontece. Mas se a diminuirmos, o array é truncado. O processo é irreversível, aqui está o exemplo:

// ```javascript
// let arr = [1, 2, 3, 4, 5];

// arr.length = 2; // trunca para 2 elementos
// alert( arr ); // [1, 2]

// arr.length = 5; // retorna o comprimento
// alert( arr[3] ); // undefined: os valores não retornam
// ```

// Então, a maneira mais simples de limpar o array é: `arr.length = 0;`.

// -----

// ### `new Array()`

// Existe mais uma sintaxe para criar um array:

// ```javascript
// let arr = new Array("Maçã", "Pera", "etc");
// ```

// É raramente usada, porque colchetes `[]` são mais curtos. Além disso, há uma funcionalidade complicada com ela.

// Se `new Array` for chamado com um único argumento que é um número, ele cria um array **sem itens**, mas com o comprimento dado.

// Vamos ver como alguém pode "atirar no próprio pé":

// ```javascript
// let arr = new Array(2); // irá criar um array de [2] ?
// alert( arr[0] ); // undefined! nenhum elemento.
// alert( arr.length ); // comprimento 2
// ```

// Para evitar tais surpresas, geralmente usamos colchetes, a menos que realmente saibamos o que estamos fazendo.

// -----

// ### Arrays Multidimensionais

// Arrays podem ter itens que também são arrays. Podemos usá-los para arrays multidimensionais, por exemplo, para armazenar matrizes:

// ```javascript
// let matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];

// alert( matrix[0][1] ); // 2, o segundo valor do primeiro array interno
// ```

// -----

// ### `toString`

// Arrays têm sua própria implementação do método `toString` que retorna uma lista de elementos separados por vírgulas.

// Por exemplo:

// ```javascript
// let arr = [1, 2, 3];
// alert( arr ); // 1,2,3
// alert( String(arr) === '1,2,3' ); // true
// ```

// Além disso, vamos tentar isso:

// ```javascript
// alert( [] + 1 );     // "1"
// alert( [1] + 1 );    // "11"
// alert( [1,2] + 1 ); // "1,21"
// ```

// Arrays não possuem `Symbol.toPrimitive`, nem um `valueOf` viável, eles implementam apenas a conversão `toString`, então aqui `[]` torna-se uma string vazia, `[1]` torna-se `"1"` e `[1,2]` torna-se `"1,2"`.

// Quando o operador binário `"+"` adiciona algo a uma string, ele também o converte para uma string, então o próximo passo se parece com isto:

// ```javascript
// alert( "" + 1 );     // "1"
// alert( "1" + 1 );    // "11"
// alert( "1,2" + 1 ); // "1,21"
// ```

// -----

// ### Não compare arrays com `==`

// Arrays em JavaScript, ao contrário de algumas outras linguagens de programação, não devem ser comparados com o operador `==`.

// Este operador não tem tratamento especial para arrays, ele funciona com eles como com quaisquer objetos.

// Vamos relembrar as regras:

//   * Dois objetos são iguais `==` somente se forem referências para o **mesmo objeto**.
//   * Se um dos argumentos de `==` é um objeto e o outro é um primitivo, então o objeto é convertido para primitivo, conforme explicado no capítulo [Conversão de objeto para primitivo](https://www.google.com/search?q=https://javascript.info/object-to-primitive-conversion).
//   * …Com uma exceção de `null` e `undefined` que são iguais `==` entre si e nada mais.

// A comparação estrita `===` é ainda mais simples, pois não converte tipos.

// Então, se compararmos arrays com `==`, eles nunca serão os mesmos, a menos que comparemos duas variáveis que referenciam exatamente o mesmo array.

// Por exemplo:

// ```javascript
// alert( [] == [] );   // false
// alert( [0] == [0] ); // false
// ```

// Esses arrays são tecnicamente objetos diferentes. Portanto, não são iguais. O operador `==` não faz comparação item a item.

// A comparação com primitivos também pode dar resultados aparentemente estranhos:

// ```javascript
// alert( 0 == [] );    // true
// alert('0' == [] ); // false
// ```

// Aqui, em ambos os casos, comparamos um primitivo com um objeto array. Então o array `[]` é convertido para primitivo para fins de comparação e se torna uma string vazia `''`.

// Então o processo de comparação continua com os primitivos, conforme descrito no capítulo [Conversões de Tipo](https://javascript.info/type-conversions):

// ```javascript
// // depois que [] foi convertido para ''
// alert( 0 == '' );    // true, pois '' é convertido para o número 0
// alert('0' == '' ); // false, sem conversão de tipo, strings diferentes
// ```

// Então, como comparar arrays?
// É simples: não use o operador `==`. Em vez disso, compare-os item a item em um loop ou usando métodos de iteração explicados no próximo capítulo.

// -----

// ### Resumo

//   * **Array** é um tipo especial de objeto, adequado para armazenar e gerenciar itens de dados **ordenados**.
//   * A declaração:
//     ```javascript
//     // colchetes (o usual)
//     let arr = [item1, item2...];

//     // new Array (excepcionalmente raro)
//     let arr = new Array(item1, item2...);
//     ```
//   * A chamada para `new Array(número)` cria um array com o comprimento dado, mas sem elementos.
//   * A propriedade **`length`** é o comprimento do array ou, para ser preciso, seu último índice numérico mais um. Ela é ajustada automaticamente pelos métodos do array.
//   * Se encurtarmos `length` manualmente, o array é **truncado**.
//   * **Obtendo os elementos**:
//       * podemos obter o elemento por seu índice, como `arr[0]`.
//       * também podemos usar o método `at(i)` que permite índices negativos. Para valores negativos de `i`, ele retrocede a partir do final do array. Se `i >= 0`, funciona da mesma forma que `arr[i]`.
//   * Podemos usar um array como um deque com as seguintes operações:
//       * **`push(...items)`**: adiciona `items` ao final.
//       * **`pop()`**: remove o elemento do final e o retorna.
//       * **`shift()`**: remove o elemento do início e o retorna.
//       * **`unshift(...items)`**: adiciona `items` ao início.
//   * Para iterar sobre os elementos do array:
//       * `for (let i=0; i<arr.length; i++)` – funciona mais rápido, compatível com navegadores antigos.
//       * `for (let item of arr)` – a sintaxe moderna apenas para itens.
//       * `for (let i in arr)` – **nunca use**.
//   * Para comparar arrays, **não use o operador `==`** (assim como `>`, `<`, e outros), pois eles não têm tratamento especial para arrays. Eles os tratam como quaisquer objetos, e não é isso que geralmente queremos.
//   * Em vez disso, você pode usar o loop `for..of` para comparar arrays item a item.

// Continuaremos com arrays e estudaremos mais métodos para adicionar, remover, extrair elementos e classificar arrays no próximo capítulo **Métodos de Array**.