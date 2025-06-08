// **Testes Automatizados com Mocha**

// Testes automatizados serão utilizados em tarefas futuras e também são amplamente utilizados em projetos reais.

// **Por que precisamos de testes?**

// Quando escrevemos uma função, normalmente conseguimos imaginar o que ela deve fazer: quais parâmetros produzem quais resultados.

// Durante o desenvolvimento, podemos verificar o funcionamento da função executando-a e comparando o resultado com o esperado. Por exemplo, podemos fazer isso no console.

// Se algo estiver errado, corrigimos o código, executamos novamente, verificamos o resultado — e assim por diante, até funcionar.

// Mas essas “reexecuções” manuais são imperfeitas.

// Ao testar o código manualmente, é fácil esquecer algo. Por exemplo, criamos uma função `f`, testamos: `f(1)` funciona, mas `f(2)` não. Corrigimos o código e agora `f(2)` funciona. Tudo certo? Esquecemos de re-testar `f(1)`. Isso pode causar erro.

// Isso é comum. Ao desenvolver algo, consideramos vários casos de uso possíveis. Mas não é realista esperar que um programador verifique todos eles manualmente após cada mudança. Fica fácil corrigir uma coisa e quebrar outra.

// Testes automatizados significam que os testes são escritos separadamente, além do código. Eles executam nossas funções de várias formas e comparam os resultados com os esperados.

// **Desenvolvimento Guiado por Comportamento (BDD)**

// Vamos começar com uma técnica chamada Desenvolvimento Guiado por Comportamento, ou BDD (Behavior Driven Development).

// BDD é três coisas em uma: testes, documentação e exemplos.

// Para entender BDD, vamos ver um caso prático de desenvolvimento.

// **Desenvolvimento da função “pow”: o especificação**

// Suponha que queremos criar uma função `pow(x, n)` que eleva `x` a uma potência inteira `n`. Assumimos que `n ≥ 0`.

// Este é apenas um exemplo: o operador `**` do JavaScript faz isso, mas queremos focar no fluxo de desenvolvimento.

// Antes de implementar o código de `pow`, podemos descrever o que ela deve fazer.

// Essa descrição é chamada de **especificação**, ou **spec**, e inclui casos de uso e testes, como:

// ```javascript
// describe("pow", function() {
//   it("eleva à potência n", function() {
//     assert.equal(pow(2, 3), 8);
//   });
// });
// ```

// A spec tem três blocos principais:

// * `describe("título", function() {...})`: define o que estamos testando. Aqui, a função `pow`. Agrupa os blocos `it`.
// * `it("descrição do caso de uso", function() {...})`: descreve o caso de uso e define o teste.
// * `assert.equal(valor1, valor2)`: verifica se os valores são iguais. Se não forem, dá erro.

// Essa especificação pode ser executada e testará o que está dentro do `it`.

// **Fluxo de desenvolvimento**

// O fluxo típico é:

// 1. Escrevemos uma spec inicial com testes básicos.
// 2. Criamos a implementação inicial.
// 3. Executamos a ferramenta de testes Mocha. Se algo não estiver certo, corrigimos até passar.
// 4. Temos uma versão funcional com testes.
// 5. Adicionamos mais casos na spec. Alguns falharão.
// 6. Voltamos ao passo 3 e repetimos até tudo funcionar.

// Esse ciclo se repete: escrevemos spec, implementamos, testamos, ajustamos.

// **Executando a spec**

// Vamos usar três bibliotecas JavaScript:

// * **Mocha**: o framework de testes que fornece `describe`, `it` e executa os testes.
// * **Chai**: fornece asserções como `assert.equal`.
// * **Sinon**: biblioteca para espiar funções, simular comportamentos etc. Usaremos depois.

// Essas bibliotecas funcionam tanto no navegador quanto no servidor. Aqui usaremos no navegador.

// Exemplo de página HTML com as bibliotecas e a spec de `pow`:

// ```html
// <!DOCTYPE html>
// <html>
// <head>
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
//   <script>mocha.setup('bdd');</script>
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
//   <script>let assert = chai.assert;</script>
// </head>
// <body>

//   <script>
//     function pow(x, n) {
//       /* implementação vazia */
//     }
//   </script>

//   <script src="test.js"></script>

//   <div id="mocha"></div>

//   <script>
//     mocha.run();
//   </script>
// </body>
// </html>
// ```

// Essa página está dividida em partes:

// 1. `<head>` – inclui bibliotecas e estilos.
// 2. Script com a função `pow`.
// 3. Testes (em `test.js`).
// 4. `<div id="mocha">` – exibe os resultados dos testes.
// 5. `mocha.run()` – inicia os testes.

// Como `pow` ainda não tem implementação, o teste falha.

// **Implementação inicial**

// Vamos fazer uma implementação simples:

// ```javascript
// function pow(x, n) {
//   return 8; // estamos "trapaceando"
// }
// ```

// O teste passa, mas a função não funciona corretamente para outros valores.

// **Melhorando a spec**

// Adicionamos mais testes:

// ```javascript
// describe("pow", function() {
//   it("2 elevado a 3 é 8", function() {
//     assert.equal(pow(2, 3), 8);
//   });

//   it("3 elevado a 4 é 81", function() {
//     assert.equal(pow(3, 4), 81);
//   });
// });
// ```

// Agora o segundo teste falha, como esperado. O ideal é que cada teste verifique uma coisa só. Se uma asserção falhar, o restante do `it` não é executado.

// **Melhorando a implementação**

// ```javascript
// function pow(x, n) {
//   let resultado = 1;
//   for (let i = 0; i < n; i++) {
//     resultado *= x;
//   }
//   return resultado;
// }
// ```

// Agora funciona. Podemos automatizar vários testes:

// ```javascript
// describe("pow", function() {
//   describe("eleva x à potência 3", function() {
//     function makeTest(x) {
//       let esperado = x * x * x;
//       it(`${x} elevado a 3 é ${esperado}`, function() {
//         assert.equal(pow(x, 3), esperado);
//       });
//     }

//     for (let x = 1; x <= 5; x++) {
//       makeTest(x);
//     }
//   });
// });
// ```

// **before/after e beforeEach/afterEach**

// Usamos essas funções para executar código antes/depois dos testes:

// ```javascript
// describe("teste", function() {
//   before(() => alert("Antes de todos os testes"));
//   after(() => alert("Depois de todos os testes"));
//   beforeEach(() => alert("Antes de cada teste"));
//   afterEach(() => alert("Depois de cada teste"));

//   it("teste 1", () => alert(1));
//   it("teste 2", () => alert(2));
// });
// ```

// **Estendendo a spec**

// Vamos lidar com entradas inválidas:

// ```javascript
// describe("pow", function() {
//   // ...
//   it("com n negativo retorna NaN", function() {
//     assert.isNaN(pow(2, -1));
//   });

//   it("com n não inteiro retorna NaN", function() {
//     assert.isNaN(pow(2, 1.5));
//   });
// });
// ```

// Precisamos ajustar `pow`:

// ```javascript
// function pow(x, n) {
//   if (n < 0) return NaN;
//   if (Math.round(n) != n) return NaN;

//   let resultado = 1;
//   for (let i = 0; i < n; i++) {
//     resultado *= x;
//   }
//   return resultado;
// }
// ```

// Agora todos os testes passam.

// **Resumo**

// No BDD, a especificação vem antes da implementação. No final, temos código e testes.

// A spec serve como:

// * **Testes** – verificam se o código funciona.
// * **Documentação** – os títulos explicam o que a função faz.
// * **Exemplos** – os testes mostram como usar a função.

// Com testes, podemos mudar o código com segurança, mesmo em projetos grandes.

// Sem testes, ou cometemos erros ou ficamos com medo de modificar funções. Testes automatizados evitam isso.

// Além disso, código testável tem melhor arquitetura: funções bem definidas com entradas e saídas claras.

// Mesmo que nem sempre seja fácil escrever testes antes do código, eles tornam o desenvolvimento mais rápido e seguro.

// Nos próximos capítulos, veremos mais tarefas com testes prontos. Mesmo que ainda não seja exigido escrever testes, já é importante entender como lê-los.
