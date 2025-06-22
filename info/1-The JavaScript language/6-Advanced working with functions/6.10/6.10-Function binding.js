// Aqui está a tradução adaptada de todo o conteúdo para o português:

// ---

// **Vinculando funções (Function binding)**

// Ao passar métodos de objetos como callbacks, por exemplo para o `setTimeout`, existe um problema conhecido: a “perda do this”.

// Neste capítulo, vamos ver formas de resolver esse problema.

// ### Perdendo o “this”

// Já vimos exemplos de como o `this` pode ser perdido. Sempre que um método é passado separadamente do objeto ao qual pertence, o `this` é perdido.

// Veja como isso pode acontecer com o `setTimeout`:

// ```javascript
// let user = {
//   firstName: "John",
//   sayHi() {
//     alert(`Olá, ${this.firstName}!`);
//   }
// };

// setTimeout(user.sayHi, 1000); // Olá, undefined!
// ```

// Como podemos ver, o resultado não mostra “John” como `this.firstName`, mas sim `undefined`!

// Isso acontece porque o `setTimeout` recebeu a função `user.sayHi` separada do objeto. A última linha pode ser reescrita assim:

// ```javascript
// let f = user.sayHi;
// setTimeout(f, 1000); // contexto de user perdido
// ```

// O método `setTimeout` no navegador é um pouco especial: ele define `this = window` durante a chamada da função (no Node.js, o `this` vira o objeto timer, mas isso não importa muito aqui). Então, quando executamos `this.firstName`, o código tenta acessar `window.firstName`, que não existe. Em outros casos similares, geralmente o `this` vira `undefined`.

// Esse tipo de situação é bem comum: queremos passar um método de um objeto para algum lugar (neste caso, para o agendador) onde ele será chamado depois. Como garantir que ele será chamado no contexto certo?

// ---

// ### Solução 1: Função wrapper

// A solução mais simples é usar uma função de “empacotamento”:

// ```javascript
// let user = {
//   firstName: "John",
//   sayHi() {
//     alert(`Olá, ${this.firstName}!`);
//   }
// };

// setTimeout(function() {
//   user.sayHi(); // Olá, John!
// }, 1000);
// ```

// Agora funciona, porque a função anônima tem acesso ao `user` pelo ambiente léxico externo, e então chama o método normalmente.

// De forma mais curta:

// ```javascript
// setTimeout(() => user.sayHi(), 1000); // Olá, John!
// ```

// Parece ótimo, mas há uma pequena vulnerabilidade nessa estrutura.

// E se, antes do `setTimeout` disparar (existe um atraso de 1 segundo!), o valor de `user` mudar? De repente, estaremos chamando o método no objeto errado!

// ```javascript
// let user = {
//   firstName: "John",
//   sayHi() {
//     alert(`Olá, ${this.firstName}!`);
//   }
// };

// setTimeout(() => user.sayHi(), 1000);

// // ... o valor de user muda dentro de 1 segundo
// user = {
//   sayHi() { alert("Outro usuário no setTimeout!"); }
// };

// // Resultado: Outro usuário no setTimeout!
// ```

// A próxima solução garante que isso não acontecerá.

// ---

// ### Solução 2: bind

// As funções oferecem um método nativo chamado `bind` que permite fixar o `this`.

// A sintaxe básica é:

// ```javascript
// let boundFunc = func.bind(context);
// ```

// O resultado de `func.bind(context)` é um “objeto exótico” (function-like), que pode ser chamado como uma função e redireciona a chamada para `func`, configurando o `this = context`.

// Em outras palavras, chamar `boundFunc` é como chamar `func`, mas com o `this` fixo.

// Por exemplo, aqui a `funcUser` passa a chamada para `func` com `this = user`:

// ```javascript
// let user = {
//   firstName: "John"
// };

// function func() {
//   alert(this.firstName);
// }

// let funcUser = func.bind(user);
// funcUser(); // John
// ```

// Aqui, `func.bind(user)` cria uma “versão vinculada” de `func`, com o `this` fixo para `user`.

// Todos os argumentos são passados para a `func` original “como estão”, por exemplo:

// ```javascript
// let user = {
//   firstName: "John"
// };

// function func(phrase) {
//   alert(phrase + ', ' + this.firstName);
// }

// let funcUser = func.bind(user);

// funcUser("Olá"); // Olá, John
// ```

// Agora vamos tentar com um método de objeto:

// ```javascript
// let user = {
//   firstName: "John",
//   sayHi() {
//     alert(`Olá, ${this.firstName}!`);
//   }
// };

// let sayHi = user.sayHi.bind(user); // (*)

// // podemos executá-lo sem objeto
// sayHi(); // Olá, John!

// setTimeout(sayHi, 1000); // Olá, John!

// // Mesmo que o valor de user mude dentro de 1 segundo
// // sayHi usa o valor pré-fixado que era referência ao user antigo
// user = {
//   sayHi() { alert("Outro usuário no setTimeout!"); }
// };
// ```

// Na linha (\*) pegamos o método `user.sayHi` e o vinculamos ao `user`. A função `sayHi` é uma função “vinculada” que pode ser chamada sozinha ou passada para o `setTimeout` – não importa, o contexto estará certo.

// Aqui também podemos ver que os argumentos são passados “como estão”, apenas o `this` é fixado pelo `bind`:

// ```javascript
// let user = {
//   firstName: "John",
//   say(phrase) {
//     alert(`${phrase}, ${this.firstName}!`);
//   }
// };

// let say = user.say.bind(user);

// say("Olá"); // Olá, John!
// say("Tchau"); // Tchau, John!
// ```

// ---

// ### Método prático: bindAll

// Se um objeto tem muitos métodos e planejamos passá-los para outros lugares com frequência, podemos vincular todos eles em um loop:

// ```javascript
// for (let key in user) {
//   if (typeof user[key] == 'function') {
//     user[key] = user[key].bind(user);
//   }
// }
// ```

// Bibliotecas JavaScript também fornecem funções para fazer essa vinculação em massa de forma prática, como o `_.bindAll(object, methodNames)` da Lodash.

// ---

// ### Funções parciais

// Até agora falamos apenas de vincular o `this`. Vamos avançar mais um passo.

// Podemos vincular não só o `this`, mas também os argumentos da função. Isso é raro, mas pode ser útil em algumas situações.

// A sintaxe completa do `bind` é:

// ```javascript
// let bound = func.bind(context, [arg1], [arg2], ...);
// ```

// Isso permite fixar o contexto `this` e também os argumentos iniciais da função.

// Por exemplo, temos uma função de multiplicação `mul(a, b)`:

// ```javascript
// function mul(a, b) {
//   return a * b;
// }

// let double = mul.bind(null, 2);

// alert( double(3) ); // = mul(2, 3) = 6
// alert( double(4) ); // = mul(2, 4) = 8
// alert( double(5) ); // = mul(2, 5) = 10
// ```

// A chamada `mul.bind(null, 2)` cria uma nova função `double` que chama `mul`, fixando `null` como contexto e `2` como primeiro argumento. Os argumentos seguintes são passados normalmente.

// Isso se chama **aplicação parcial de função** – criamos uma nova função fixando alguns parâmetros da original.

// Perceba que, nesse caso, nem usamos o `this`. Mas o `bind` exige um contexto, então passamos `null`.

// Outro exemplo, agora com uma função que triplica o valor:

// ```javascript
// function mul(a, b) {
//   return a * b;
// }

// let triple = mul.bind(null, 3);

// alert( triple(3) ); // 9
// alert( triple(4) ); // 12
// alert( triple(5) ); // 15
// ```

// Por que criar uma função parcial?

// A vantagem é que podemos criar uma função independente com um nome mais descritivo (como `double`, `triple`). Assim, podemos usá-la sem precisar fornecer o primeiro argumento sempre, já que ele está fixado.

// Em outros casos, a aplicação parcial é útil quando temos uma função muito genérica e queremos uma versão menos genérica dela por questão de praticidade.

// Por exemplo, temos uma função `send(from, to, text)`. Dentro de um objeto `user`, podemos querer uma versão parcial: `sendTo(to, text)` que sempre usa o usuário atual como remetente.

// ---

// ### Fazendo uma parcial sem alterar o contexto (this)

// E se quisermos fixar alguns argumentos, mas **não** o contexto `this`? Por exemplo, para um método de objeto.

// O `bind` nativo **não permite** isso. Não podemos simplesmente pular o contexto e fixar apenas os argumentos.

// Felizmente, podemos implementar uma função `partial` para vincular apenas os argumentos.

// Assim:

// ```javascript
// function partial(func, ...argsBound) {
//   return function(...args) {
//     return func.call(this, ...argsBound, ...args);
//   }
// }
// ```

// Uso:

// ```javascript
// let user = {
//   firstName: "John",
//   say(time, phrase) {
//     alert(`[${time}] ${this.firstName}: ${phrase}!`);
//   }
// };

// // adicionando um método parcial com o horário fixo
// user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

// user.sayNow("Olá");
// // Exemplo de saída:
// // [10:00] John: Olá!
// ```

// O resultado de `partial(func[, arg1, arg2...])` é um wrapper que chama `func` com:

// 1. O mesmo `this` que recebeu (no caso de `user.sayNow`, é `user`).
// 2. Os argumentos fixos definidos na criação (`"10:00"`).
// 3. Os argumentos passados depois, ao chamar (`"Olá"`).

// Super fácil de fazer com a sintaxe de spread, certo?

// Também existe uma implementação pronta chamada `_.partial` na biblioteca Lodash.

// ---

// ### Resumo

// O método `func.bind(context, ...args)` retorna uma **“variante vinculada”** da função `func`, que fixa o contexto `this` e os primeiros argumentos, se fornecidos.

// Normalmente usamos o `bind` para fixar o `this` de um método de objeto, de modo que possamos passá-lo para outros lugares, como para o `setTimeout`.

// Quando fixamos alguns argumentos de uma função existente, a nova função resultante (menos genérica) é chamada de **parcialmente aplicada** ou **partial**.

// As parciais são convenientes quando não queremos repetir os mesmos argumentos o tempo todo. Por exemplo, se temos uma função `send(from, to)` e queremos sempre usar o mesmo `from`, podemos criar uma parcial e usá-la facilmente.

// ---

// Se quiser, posso montar exemplos de código adicionais ou exercícios para praticar. Quer?
