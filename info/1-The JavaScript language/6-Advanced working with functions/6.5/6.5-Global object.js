// -----

// ## Objeto Global

// O objeto global fornece variáveis e funções que estão disponíveis em qualquer lugar. Por padrão, são aquelas que vêm embutidas na linguagem ou no ambiente.

// Em um navegador, ele é chamado de **window**, para Node.js, é **global**, e para outros ambientes, pode ter outro nome.

// Recentemente, **globalThis** foi adicionado à linguagem como um nome padronizado para um objeto global, que deve ser suportado em todos os ambientes. Ele é suportado em todos os principais navegadores.

// Usaremos **window** aqui, assumindo que nosso ambiente é um navegador. Se o seu script puder ser executado em outros ambientes, é melhor usar **globalThis** em vez disso.

// Todas as propriedades do objeto global podem ser acessadas diretamente:

// ```javascript
// alert("Olá");
// // é o mesmo que
// window.alert("Olá");
// ```

// Em um navegador, funções globais e variáveis declaradas com **var** (não `let`/`const`\!) se tornam propriedade do objeto global:

// ```javascript
// var gVar = 5;
// alert(window.gVar); // 5 (tornou-se uma propriedade do objeto global)
// ```

// Declarações de função têm o mesmo efeito (declarações com a palavra-chave `function` no fluxo principal do código, não expressões de função).

// **Por favor, não dependa disso\!** Esse comportamento existe por razões de compatibilidade. Scripts modernos usam **módulos JavaScript** onde tal coisa não acontece.

// Se usássemos `let` em vez disso, tal coisa não aconteceria:

// ```javascript
// let gLet = 5;
// alert(window.gLet); // undefined (não se torna uma propriedade do objeto global)
// ```

// Se um valor é tão importante que você gostaria de torná-lo disponível globalmente, escreva-o diretamente como uma propriedade:

// ```javascript
// // torna a informação do usuário atual global, para permitir que todos os scripts a acessem
// window.currentUser = {
//   name: "John"
// };

// // em outro lugar no código
// alert(currentUser.name);  // John

// // ou, se tivermos uma variável local com o nome "currentUser"
// // obtenha-o da janela explicitamente (seguro!)
// alert(window.currentUser.name); // John
// ```

// Dito isso, o uso de variáveis globais é geralmente desencorajado. Deve haver o mínimo possível de variáveis globais. O design de código onde uma função recebe variáveis de "entrada" e produz um certo "resultado" é mais claro, menos propenso a erros e mais fácil de testar do que se usar variáveis externas ou globais.

// -----

// ### Uso para Polyfills

// Usamos o objeto global para testar o suporte a recursos modernos da linguagem.

// Por exemplo, testar se um objeto **Promise** embutido existe (ele não existe em navegadores realmente antigos):

// ```javascript
// if (!window.Promise) {
//   alert("Seu navegador é realmente antigo!");
// }
// ```

// Se não houver (digamos, estamos em um navegador antigo), podemos criar "polyfills": adicionar funções que não são suportadas pelo ambiente, mas existem no padrão moderno.

// ```javascript
// if (!window.Promise) {
//   window.Promise = ... // implementação personalizada do recurso de linguagem moderno
// }
// ```

// -----

// ### Resumo

// O objeto global contém variáveis que devem estar disponíveis em todos os lugares.

// Isso inclui recursos embutidos do JavaScript, como **Array**, e valores específicos do ambiente, como **window.innerHeight** – a altura da janela no navegador.

// O objeto global tem um nome universal **globalThis**.

// ...Mas é mais frequentemente referido por nomes específicos do ambiente "da velha guarda", como **window** (navegador) e **global** (Node.js).

// Devemos armazenar valores no objeto global apenas se eles forem verdadeiramente globais para o nosso projeto. E manter o número deles no mínimo.

// No navegador, a menos que estejamos usando **módulos**, funções globais e variáveis declaradas com **var** tornam-se uma propriedade do objeto global.

// Para tornar nosso código à prova de futuro e mais fácil de entender, devemos acessar as propriedades do objeto global diretamente, como `window.x`.