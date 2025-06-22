// Aqui está a tradução completa e adaptada para o português:

// **Funções como Objetos e NFE (Named Function Expression)**

// Como já sabemos, uma função em JavaScript é um valor.

// E todo valor em JavaScript possui um tipo. Mas qual é o tipo de uma função?

// Em JavaScript, funções são objetos.

// Uma boa maneira de imaginar funções é como “objetos de ação” que podem ser chamados. Podemos não apenas executá-las (chamá-las), mas também tratá-las como objetos: adicionar/remover propriedades, passar por referência, etc.

// ### A propriedade “name”

// Objetos-função contêm algumas propriedades úteis.

// Por exemplo, o nome de uma função pode ser acessado pela propriedade `name`:

// ```javascript
// function sayHi() {
//   alert("Oi");
// }

// alert(sayHi.name); // sayHi
// ```

// Algo curioso: o mecanismo de atribuição de nomes é inteligente. Ele atribui um nome correto à função mesmo quando ela é criada anonimamente e logo em seguida atribuída a uma variável:

// ```javascript
// let sayHi = function() {
//   alert("Oi");
// };

// alert(sayHi.name); // sayHi (olha só, tem um nome!)
// ```

// Isso também funciona quando a atribuição é feita por um valor padrão de parâmetro:

// ```javascript
// function f(sayHi = function() {}) {
//   alert(sayHi.name); // sayHi (funciona!)
// }

// f();
// ```

// Na especificação, essa funcionalidade é chamada de “contextual name” (nome contextual). Se a função não tiver um nome próprio, o JavaScript tenta deduzir o nome a partir do contexto de atribuição.

// Métodos de objetos também têm nomes:

// ```javascript
// let user = {

//   sayHi() {
//     // ...
//   },

//   sayBye: function() {
//     // ...
//   }

// }

// alert(user.sayHi.name); // sayHi
// alert(user.sayBye.name); // sayBye
// ```

// Mas não há mágica: há casos em que o JavaScript simplesmente não consegue deduzir o nome. Nesse caso, a propriedade `name` fica vazia:

// ```javascript
// // função criada dentro de um array
// let arr = [function() {}];

// alert( arr[0].name ); // string vazia
// ```

// Na prática, porém, a maioria das funções tem um nome.

// ### A propriedade “length”

// Outra propriedade embutida é a `length`, que retorna o número de parâmetros declarados na função:

// ```javascript
// function f1(a) {}
// function f2(a, b) {}
// function many(a, b, ...more) {}

// alert(f1.length); // 1
// alert(f2.length); // 2
// alert(many.length); // 2
// ```

// Perceba que parâmetros rest (`...more`) não são contados.

// A propriedade `length` é usada às vezes para introspecção em funções que operam sobre outras funções.

// Por exemplo, no código abaixo, a função `ask` aceita uma pergunta e um número arbitrário de funções manipuladoras (handlers):

// ```javascript
// function ask(question, ...handlers) {
//   let isYes = confirm(question);

//   for(let handler of handlers) {
//     if (handler.length == 0) {
//       if (isYes) handler();
//     } else {
//       handler(isYes);
//     }
//   }
// }

// // Para uma resposta positiva, ambas são chamadas
// // Para uma negativa, apenas a segunda
// ask("Pergunta?", () => alert('Você disse sim'), result => alert(result));
// ```

// Isso é um caso particular de polimorfismo – tratar argumentos de forma diferente dependendo do tipo ou, como aqui, dependendo do número de parâmetros. Essa ideia é útil em várias bibliotecas JavaScript.

// ### Propriedades personalizadas

// Também podemos adicionar nossas próprias propriedades a funções.

// Veja como adicionar um contador para rastrear o número de vezes que a função foi chamada:

// ```javascript
// function sayHi() {
//   alert("Oi");

//   // Contar quantas vezes a função foi executada
//   sayHi.counter++;
// }
// sayHi.counter = 0; // valor inicial

// sayHi(); // Oi
// sayHi(); // Oi

// alert(`Chamado ${sayHi.counter} vezes`); // Chamado 2 vezes
// ```

// **Uma propriedade não é uma variável interna**

// Uma propriedade como `sayHi.counter = 0` não define uma variável local chamada `counter` dentro da função. Em outras palavras, uma propriedade `counter` e uma variável `let counter` são coisas completamente diferentes.

// Podemos tratar uma função como um objeto e guardar propriedades nela, mas isso não afeta as variáveis internas da função. Variáveis e propriedades são mundos separados.

// Propriedades de função às vezes podem substituir closures. Por exemplo, podemos reescrever o exemplo de contador usando uma propriedade de função em vez de uma variável de closure:

// ```javascript
// function makeCounter() {

//   function counter() {
//     return counter.count++;
//   };

//   counter.count = 0;

//   return counter;
// }

// let counter = makeCounter();
// alert( counter() ); // 0
// alert( counter() ); // 1
// ```

// Agora o valor `count` está armazenado diretamente na função, e não no seu ambiente léxico externo.

// **Isso é melhor ou pior que usar closure?**

// A principal diferença é que, se o valor de `count` estiver numa variável externa, o código externo não poderá acessá-lo diretamente. Só funções internas poderiam alterá-lo. Mas se o valor estiver como propriedade da função, qualquer código com acesso à função pode modificá-lo:

// ```javascript
// function makeCounter() {

//   function counter() {
//     return counter.count++;
//   };

//   counter.count = 0;

//   return counter;
// }

// let counter = makeCounter();

// counter.count = 10;
// alert( counter() ); // 10
// ```

// Então, a escolha depende do que queremos fazer.

// ### Named Function Expression (NFE)

// NFE (Named Function Expression) é um termo usado para expressões de função que têm nome.

// Por exemplo, uma função anônima normal seria:

// ```javascript
// let sayHi = function(who) {
//   alert(`Olá, ${who}`);
// };
// ```

// Agora, vamos adicionar um nome:

// ```javascript
// let sayHi = function func(who) {
//   alert(`Olá, ${who}`);
// };
// ```

// **Qual o sentido de adicionar esse nome extra "func"?**

// Antes de tudo, mesmo com o nome, ainda continuamos tendo uma Function Expression. Adicionar o nome não a transforma numa Function Declaration, pois ela ainda faz parte de uma expressão de atribuição.

// E o nome também não quebra nada.

// A função continua disponível como `sayHi()`:

// ```javascript
// let sayHi = function func(who) {
//   alert(`Olá, ${who}`);
// };

// sayHi("João"); // Olá, João
// ```

// Agora, as duas vantagens principais do nome interno `func` são:

// 1. Permite que a função se auto-referencie internamente.
// 2. O nome não fica visível fora da função.

// Por exemplo, aqui usamos o nome interno `func` para chamar a si mesma:

// ```javascript
// let sayHi = function func(who) {
//   if (who) {
//     alert(`Olá, ${who}`);
//   } else {
//     func("Convidado"); // uso interno de func
//   }
// };

// sayHi(); // Olá, Convidado

// func(); // Erro, func não é definido fora da função
// ```

// **Por que não usar apenas `sayHi` dentro da função?**

// Em muitos casos, até podemos:

// ```javascript
// let sayHi = function(who) {
//   if (who) {
//     alert(`Olá, ${who}`);
//   } else {
//     sayHi("Convidado");
//   }
// };
// ```

// Mas o problema aparece se `sayHi` mudar fora da função:

// ```javascript
// let sayHi = function(who) {
//   if (who) {
//     alert(`Olá, ${who}`);
//   } else {
//     sayHi("Convidado"); // Erro: sayHi não é mais uma função
//   }
// };

// let welcome = sayHi;
// sayHi = null;

// welcome(); // Erro
// ```

// Isso acontece porque a função busca o `sayHi` do ambiente léxico externo, e naquele momento, `sayHi` vale `null`.

// O uso de NFE resolve exatamente esse tipo de problema:

// ```javascript
// let sayHi = function func(who) {
//   if (who) {
//     alert(`Olá, ${who}`);
//   } else {
//     func("Convidado"); // Agora funciona
//   }
// };

// let welcome = sayHi;
// sayHi = null;

// welcome(); // Olá, Convidado (chamada interna funciona)
// ```

// Isso funciona porque o nome `func` é local à função. Ele não vem de fora e também não é visível de fora. A especificação garante que `func` sempre apontará para a própria função.

// **Obs:** Isso só é possível com Function Expressions. Não existe uma forma de dar um “nome interno” separado para uma Function Declaration. Por isso, quando precisamos de um nome interno confiável, às vezes vale a pena reescrever a declaração como uma NFE.

// ### Resumo

// Funções são objetos.

// Aqui vimos algumas de suas propriedades principais:

// * **name** – O nome da função. Normalmente vem da definição, mas se não houver, o JavaScript tenta adivinhar pelo contexto.
// * **length** – O número de argumentos declarados na função. Parâmetros rest (`...`) não são contados.

// Se a função for criada como uma **Function Expression** e tiver um nome, ela se chama **Named Function Expression (NFE)**. Esse nome pode ser usado internamente para auto-referência, como em chamadas recursivas.

// Além disso, funções podem ter propriedades personalizadas. Muitas bibliotecas JavaScript famosas exploram isso bastante.

// Por exemplo, a biblioteca **jQuery** cria uma função chamada `$`. A biblioteca **lodash** cria uma função `_`, e depois adiciona várias funções utilitárias como `_.clone`, `_.keyBy`, etc. Eles fazem isso para reduzir a poluição do espaço global – uma única variável global carrega todas as funções internas.

// Ou seja: uma função pode não só realizar uma tarefa, mas também carregar um conjunto de outras funcionalidades em suas propriedades.
