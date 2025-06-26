// -----

// ## Tratamento de Erros com Promises

// Cadeias de promises são ótimas para tratamento de erros. Quando uma promise é rejeitada, o controle salta para o manipulador de rejeição mais próximo. Isso é muito conveniente na prática.

// Por exemplo, no código abaixo a URL para `fetch` está errada (não existe tal site) e `.catch` lida com o erro:

// ```javascript
// fetch('https://no-such-server.blabla') // rejeita
//   .then(response => response.json())
//   .catch(err => alert(err)); // TypeError: failed to fetch (o texto pode variar)
// ```

// Como você pode ver, o `.catch` não precisa ser imediato. Ele pode aparecer depois de um ou talvez vários `.then`.

// Ou, talvez, esteja tudo bem com o site, mas a resposta não é um JSON válido. A maneira mais fácil de capturar todos os erros é anexar `.catch` ao final da cadeia:

// ```javascript
// fetch('/article/promise-chaining/user.json')
//   .then(response => response.json())
//   .then(user => fetch(`https://api.github.com/users/${user.name}`))
//   .then(response => response.json())
//   .then(githubUser => new Promise((resolve, reject) => {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser);
//     }, 3000);
//   }))
//   .catch(error => alert(error.message));
// ```

// Normalmente, tal `.catch` não é acionado. Mas se alguma das promises acima for rejeitada (um problema de rede ou JSON inválido ou o que quer que seja), então ele a capturará.

// -----

// ### `try...catch` Implícito

// O código de um executor de promise e manipuladores de promise tem um "`try..catch` invisível" ao seu redor. Se uma exceção ocorrer, ela é capturada e tratada como uma rejeição.

// Por exemplo, este código:

// ```javascript
// new Promise((resolve, reject) => {
//   throw new Error("Opa!");
// }).catch(alert); // Error: Opa!
// ```

// ...funciona exatamente da mesma forma que este:

// ```javascript
// new Promise((resolve, reject) => {
//   reject(new Error("Opa!"));
// }).catch(alert); // Error: Opa!
// ```

// O "`try..catch` invisível" ao redor do executor automaticamente captura o erro e o transforma em uma promise rejeitada.

// Isso acontece não apenas na função do executor, mas também em seus manipuladores. Se lançarmos (`throw`) dentro de um manipulador `.then`, isso significa uma promise rejeitada, então o controle salta para o manipulador de erro mais próximo.

// Aqui está um exemplo:

// ```javascript
// new Promise((resolve, reject) => {
//   resolve("ok");
// }).then((result) => {
//   throw new Error("Opa!"); // rejeita a promise
// }).catch(alert); // Error: Opa!
// ```

// Isso acontece para todos os erros, não apenas aqueles causados pela instrução `throw`. Por exemplo, um erro de programação:

// ```javascript
// new Promise((resolve, reject) => {
//   resolve("ok");
// }).then((result) => {
//   blabla(); // não existe tal função
// }).catch(alert); // ReferenceError: blabla is not defined
// ```

// O `.catch` final não só captura rejeições explícitas, mas também erros acidentais nos manipuladores acima.

// -----

// ### Relançamento (`Rethrowing`)

// Como já notamos, `.catch` no final da cadeia é semelhante a `try..catch`. Podemos ter quantos manipuladores `.then` quisermos e, em seguida, usar um único `.catch` no final para lidar com erros em todos eles.

// Em um `try..catch` regular, podemos analisar o erro e talvez relançá-lo se não puder ser tratado. A mesma coisa é possível para promises.

//   * Se lançarmos (`throw`) dentro de `.catch`, o controle vai para o próximo manipulador de erros mais próximo.
//   * E se tratarmos o erro e finalizarmos normalmente, a execução continua para o próximo manipulador `.then` bem-sucedido mais próximo.

// No exemplo abaixo, o `.catch` lida com o erro com sucesso:

// ```javascript
// // a execução: catch -> then
// new Promise((resolve, reject) => {

//   throw new Error("Opa!");
// }).catch(function(error) {

//   alert("O erro foi tratado, continue normalmente");
// }).then(() => alert("O próximo manipulador de sucesso é executado"));
// ```

// Aqui, o bloco `.catch` termina normalmente. Então o próximo manipulador `.then` bem-sucedido é chamado.

// No exemplo abaixo, vemos a outra situação com `.catch`. O manipulador `(*)` captura o erro e simplesmente não consegue lidar com ele (por exemplo, ele só sabe como lidar com `URIError`), então ele o lança novamente:

// ```javascript
// // a execução: catch -> catch
// new Promise((resolve, reject) => {

//   throw new Error("Opa!");
// }).catch(function(error) { // (*)

//   if (error instanceof URIError) {
//     // trata
//   } else {
//     alert("Não consigo lidar com esse erro");
//     throw error; // lançar este ou outro erro salta para o próximo catch
//   }
// }).then(function() {
//   /* não executa aqui */
// }).catch(error => { // (**)

//   alert(`O erro desconhecido ocorreu: ${error}`);
//   // não retorna nada => a execução segue o caminho normal
// });
// ```

// A execução salta do primeiro `.catch` `(*)` para o próximo `(**)` na cadeia.

// -----

// ### Rejeições Não Tratadas

// O que acontece quando um erro não é tratado? Por exemplo, esquecemos de anexar `.catch` ao final da cadeia, como aqui:

// ```javascript
// new Promise(function() {
//   noSuchFunction(); // Erro aqui (não existe tal função)
// })
//   .then(() => {
//     // manipuladores de promise bem-sucedidos, um ou mais
//   }); // sem .catch no final!
// ```

// Em caso de erro, a promise é rejeitada, e a execução deve saltar para o manipulador de rejeição mais próximo. Mas não há nenhum. Então o erro fica "preso". Não há código para tratá-lo.

// Na prática, assim como com erros não tratados regulares no código, significa que algo deu terrivelmente errado.

// O que acontece quando um erro regular ocorre e não é capturado por `try..catch`? O script morre com uma mensagem no console. Uma coisa semelhante acontece com rejeições de promise não tratadas.

// O motor JavaScript rastreia essas rejeições e gera um erro global nesse caso. Você pode vê-lo no console se executar o exemplo acima.

// No navegador, podemos capturar esses erros usando o evento `unhandledrejection`:

// ```javascript
// window.addEventListener('unhandledrejection', function(event) {
//   // o objeto event tem duas propriedades especiais:
//   alert(event.promise); // [object Promise] - a promise que gerou o erro
//   alert(event.reason);  // Error: Opa! - o objeto de erro não tratado
// });

// new Promise(function() {
//   throw new Error("Opa!");
// }); // sem catch para lidar com o erro
// ```

// O evento faz parte do [padrão HTML](https://www.google.com/search?q=https://html.spec.whatwg.org/%23event-handler-attributes).

// Se ocorrer um erro e não houver `.catch`, o manipulador `unhandledrejection` é acionado e recebe o objeto `event` com as informações sobre o erro, para que possamos fazer algo.

// Geralmente, esses erros são irrecuperáveis, então nossa melhor saída é informar o usuário sobre o problema e provavelmente relatar o incidente ao servidor.

// Em ambientes não-navegador como Node.js, existem outras maneiras de rastrear erros não tratados.

// -----

// ### Resumo

//   * `.catch` lida com erros em promises de todos os tipos: seja uma chamada `reject()`, ou um erro lançado em um manipulador.
//   * `.then` também captura erros da mesma forma, se receber o segundo argumento (que é o manipulador de erros).
//   * Devemos colocar `.catch` exatamente nos locais onde queremos tratar erros e sabemos como tratá-los. O manipulador deve analisar os erros (classes de erro personalizadas ajudam) e relançar os desconhecidos (talvez sejam erros de programação).
//   * É aceitável não usar `.catch` de forma alguma, se não houver como se recuperar de um erro.
//   * Em qualquer caso, devemos ter o manipulador de eventos `unhandledrejection` (para navegadores, e análogos para outros ambientes) para rastrear erros não tratados e informar o usuário (e provavelmente nosso servidor) sobre eles, para que nosso aplicativo nunca "simplesmente morra".