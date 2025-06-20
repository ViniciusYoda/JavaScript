// -----

// ## O antigo "var"

// Este artigo serve para entender scripts antigos.

// A informação contida neste artigo é útil para **entender scripts antigos**.

// Não é assim que escrevemos código novo.

// No primeiro capítulo sobre **variáveis**, mencionamos três formas de declaração de variáveis:

//   * `let`
//   * `const`
//   * `var`

// A declaração `var` é semelhante a `let`. Na maioria das vezes, podemos substituir `let` por `var` ou vice-versa e esperar que as coisas funcionem:

// ```javascript
// var message = "Olá";
// alert(message); // Olá
// ```

// Mas internamente, `var` é uma criatura muito diferente, que se origina de tempos muito antigos. Geralmente não é usada em scripts modernos, mas ainda espreita nos antigos.

// Se você não planeja encontrar tais scripts, pode até pular este capítulo ou adiá-lo.

// Por outro lado, é importante entender as diferenças ao migrar scripts antigos de `var` para `let`, para evitar erros estranhos.

// -----

// ### "var" não tem escopo de bloco

// Variáveis, declaradas com `var`, têm escopo de função ou escopo global. Elas são visíveis através de blocos.

// Por exemplo:

// ```javascript
// if (true) {
//   var test = true; // usa "var" em vez de "let"
// }
// alert(test); // true, a variável vive depois do if
// ```

// Como `var` ignora blocos de código, temos uma variável global `test`.

// Se usássemos `let test` em vez de `var test`, então a variável seria visível apenas dentro do `if`:

// ```javascript
// if (true) {
//   let test = true; // usa "let"
// }
// alert(test); // ReferenceError: test is not defined
// ```

// O mesmo para loops: `var` não pode ser local de bloco ou de loop:

// ```javascript
// for (var i = 0; i < 10; i++) {
//   var one = 1;
//   // ...
// }
// alert(i);   // 10, "i" é visível após o loop, é uma variável global
// alert(one); // 1, "one" é visível após o loop, é uma variável global
// ```

// Se um bloco de código estiver dentro de uma função, então `var` se torna uma variável de nível de função:

// ```javascript
// function sayHi() {
//   if (true) {
//     var phrase = "Hello";
//   }

//   alert(phrase); // funciona
// }
// sayHi();
// alert(phrase); // ReferenceError: phrase is not defined
// ```

// Como podemos ver, `var` "atravessa" `if`, `for` ou outros blocos de código. Isso ocorre porque há muito tempo no JavaScript, os blocos não tinham Ambientes Léxicos, e `var` é um remanescente disso.

// -----

// ### "var" tolera redeclarações

// Se declararmos a mesma variável com `let` duas vezes no mesmo escopo, isso é um erro:

// ```javascript
// let user;
// let user; // SyntaxError: 'user' has already been declared
// ```

// Com `var`, podemos redeclarar uma variável quantas vezes quisermos. Se usarmos `var` com uma variável já declarada, ela é simplesmente ignorada:

// ```javascript
// var user = "Pete";
// var user = "John"; // este "var" não faz nada (já declarado)
//                   // ...não dispara um erro
// alert(user); // John
// ```

// -----

// ### Variáveis "var" podem ser declaradas abaixo de seu uso

// As declarações `var` são processadas quando a função começa (ou o script começa para variáveis globais).

// Em outras palavras, as variáveis `var` são definidas desde o início da função, não importa onde a definição esteja (assumindo que a definição não esteja em uma função aninhada).

// Então este código:

// ```javascript
// function sayHi() {
//   phrase = "Hello";

//   alert(phrase);
//   var phrase;
// }
// sayHi();
// ```

// ...É tecnicamente o mesmo que este (moveu `var phrase` para cima):

// ```javascript
// function sayHi() {
//   var phrase;

//   phrase = "Hello";

//   alert(phrase);
// }
// sayHi();
// ```

// ...Ou mesmo como este (lembre-se, blocos de código são ignorados):

// ```javascript
// function sayHi() {
//   phrase = "Hello"; // (*)

//   if (false) {
//     var phrase;
//   }

//   alert(phrase);
// }
// sayHi();
// ```

// As pessoas também chamam esse comportamento de "hoisting" (elevação), porque todos os `var` são "içados" (elevados) para o topo da função.

// Então, no exemplo acima, o ramo `if (false)` nunca é executado, mas isso não importa. O `var` dentro dele é processado no início da função, então no momento de `(*)` a variável existe.

// -----

// #### Declarações são içadas, mas atribuições não.

// Isso é melhor demonstrado com um exemplo:

// ```javascript
// function sayHi() {
//   alert(phrase);
//   var phrase = "Hello";
// }
// sayHi();
// ```

// A linha `var phrase = "Hello"` tem duas ações:

// 1.  **Declaração de variável** `var`.
// 2.  **Atribuição de variável** `=`.

// A declaração é processada no início da execução da função ("içada"), mas a atribuição sempre funciona no local onde aparece. Então o código funciona essencialmente assim:

// ```javascript
// function sayHi() {
//   var phrase; // a declaração funciona no início...

//   alert(phrase); // undefined
//   phrase = "Hello"; // ...a atribuição - quando a execução a alcança.
// }
// sayHi();
// ```

// Como todas as declarações `var` são processadas no início da função, podemos referenciá-las em qualquer lugar. Mas as variáveis são `undefined` até as atribuições.

// Em ambos os exemplos acima, o `alert` é executado sem erro, porque a variável `phrase` existe. Mas seu valor ainda não foi atribuído, então ele mostra `undefined`.

// -----

// ### IIFE

// No passado, como havia apenas `var`, e ele não tem visibilidade em nível de bloco, os programadores inventaram uma maneira de emulá-lo. O que eles fizeram foi chamado de "immediately-invoked function expressions" (abreviado como IIFE).

// Isso não é algo que devemos usar hoje em dia, mas você pode encontrá-los em scripts antigos.

// Uma IIFE se parece com isso:

// ```javascript
// (function() {

//   var message = "Hello";

//   alert(message); // Hello

// })();
// ```

// Aqui, uma Expressão de Função é criada e imediatamente chamada. Assim, o código é executado imediatamente e tem suas próprias variáveis privadas.

// A Expressão de Função é envolvida por parênteses `(function {...})`, porque quando o motor JavaScript encontra `"function"` no código principal, ele o entende como o início de uma Declaração de Função. Mas uma Declaração de Função deve ter um nome, então esse tipo de código dará um erro:

// ```javascript
// // Tenta declarar e chamar imediatamente uma função
// function() { // <-- SyntaxError: Function statements require a function name

//   var message = "Hello";

//   alert(message); // Hello
// }();
// ```

// Mesmo se dissermos: "ok, vamos adicionar um nome", isso não funcionará, pois o JavaScript não permite que as Declarações de Função sejam chamadas imediatamente:

// ```javascript
// // erro de sintaxe por causa dos parênteses abaixo
// function go() {}(); // <-- não é possível chamar a Declaração de Função imediatamente
// ```

// Então, os parênteses ao redor da função são um truque para mostrar ao JavaScript que a função é criada no contexto de outra expressão, e, portanto, é uma Expressão de Função: ela não precisa de nome e pode ser chamada imediatamente.

// Existem outras maneiras além dos parênteses para dizer ao JavaScript que queremos uma Expressão de Função:

// ```javascript
// // Maneiras de criar IIFE

// (function() {
//   alert("Parênteses ao redor da função");
// })();

// (function() {
//   alert("Parênteses ao redor de tudo");
// }());

// !function() {
//   alert("Operador NOT bit a bit inicia a expressão");
// }();

// +function() {
//   alert("Sinal de mais unário inicia a expressão");
// }();
// ```

// Em todos os casos acima, declaramos uma Expressão de Função e a executamos imediatamente. Vamos notar novamente: hoje em dia não há razão para escrever tal código.

// -----

// ### Resumo

// Existem duas diferenças principais entre `var` e `let`/`const`:

// 1.  Variáveis `var` não têm **escopo de bloco**, sua visibilidade é restrita à função atual, ou global, se declaradas fora da função.
// 2.  Declarações `var` são processadas no início da função (início do script para globais).

// Há mais uma diferença muito pequena relacionada ao objeto global, que abordaremos no próximo capítulo.

// Essas diferenças tornam `var` pior que `let` na maioria das vezes. Variáveis em nível de bloco são algo ótimo. É por isso que `let` foi introduzido no padrão há muito tempo e agora é a principal forma (junto com `const`) de declarar uma variável.