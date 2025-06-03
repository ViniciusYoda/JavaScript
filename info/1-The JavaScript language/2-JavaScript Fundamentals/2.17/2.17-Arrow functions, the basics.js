// **Funções seta (arrow functions), o básico**

// Existe uma sintaxe muito simples e concisa para criar funções em JavaScript, que muitas vezes é melhor do que as Expressões de Função tradicionais. Essa sintaxe é chamada de **funções seta** (*arrow functions*), por causa do símbolo `=>` que lembra uma seta.

// A forma geral é:

// ```javascript
// let func = (arg1, arg2, ..., argN) => expressão;
// ```

// Isso cria uma função `func` que aceita os argumentos `arg1` até `argN`, avalia a expressão à direita e retorna seu resultado. Em outras palavras, é uma versão mais curta de:

// ```javascript
// let func = function(arg1, arg2, ..., argN) {
//   return expressão;
// };
// ```

// **Exemplo concreto:**

// ```javascript
// let soma = (a, b) => a + b;

// alert(soma(1, 2)); // 3
// ```

// Como se vê, `(a, b) => a + b` define uma função que recebe dois argumentos e retorna o resultado de `a + b`.

// Se a função tiver **apenas um argumento**, os parênteses podem ser omitidos:

// ```javascript
// let dobrar = n => n * 2;

// alert(dobrar(3)); // 6
// ```

// Se a função **não tiver argumentos**, os parênteses devem estar presentes, ainda que vazios:

// ```javascript
// let dizerOi = () => alert("Olá!");

// dizerOi();
// ```

// As funções seta podem ser usadas da mesma forma que as expressões de função. Por exemplo, para criar uma função dinamicamente:

// ```javascript
// let idade = prompt("Qual é a sua idade?", 18);

// let boasVindas = (idade < 18) ?
//   () => alert("Olá!") :
//   () => alert("Saudações!");

// boasVindas();
// ```

// No início, as arrow functions podem parecer estranhas ou pouco legíveis, mas com o tempo os olhos se acostumam com essa estrutura. Elas são muito úteis para ações simples, especialmente quando não queremos escrever muito.

// ---

// **Funções seta com múltiplas linhas**

// As arrow functions vistas até agora foram simples, com apenas uma linha e um retorno implícito. No entanto, às vezes precisamos de algo mais complexo, com várias instruções. Nesse caso, usamos chaves `{}` para definir o corpo da função, e precisamos usar `return` explicitamente para retornar um valor.

// **Exemplo:**

// ```javascript
// let soma = (a, b) => {
//   let resultado = a + b;
//   return resultado; // o return é obrigatório se usarmos chaves
// };

// alert(soma(1, 2)); // 3
// ```

// ---

// **Mais por vir**

// Aqui, vimos as funções seta principalmente por sua brevidade. Mas elas têm outras características interessantes, que serão exploradas mais adiante no capítulo “Funções seta revisadas”. Por enquanto, você já pode usá-las para ações simples e como callbacks.

// ---

// **Resumo**

// As funções seta são úteis para ações simples, especialmente expressões de uma linha. Elas vêm em duas formas:

// * **Sem chaves**: `(...args) => expressão` – a expressão à direita é avaliada e retornada automaticamente. Os parênteses podem ser omitidos se houver apenas um argumento, por exemplo: `n => n * 2`.

// * **Com chaves**: `(...args) => { corpo }` – com chaves, é possível escrever várias instruções, mas é necessário usar `return` para retornar algo.
