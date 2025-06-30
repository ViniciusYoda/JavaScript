// Claro! Abaixo está a tradução adaptada para o português de todo o conteúdo sobre **async/await**:

// ---

// ## Async/Await

// Há uma sintaxe especial para trabalhar com *Promises* de forma mais confortável, chamada **async/await**. Ela é surpreendentemente fácil de entender e usar.

// ---

// ## Funções `async`

// Vamos começar com a palavra-chave `async`. Ela pode ser colocada antes de uma função, assim:

// ```javascript
// async function f() {
//   return 1;
// }
// ```

// A palavra **`async`** antes de uma função significa uma coisa simples:
// Essa função **sempre retorna uma *Promise***.
// Outros valores retornados são automaticamente empacotados em uma *Promise* resolvida.

// Por exemplo, esta função retorna uma *Promise* resolvida com o valor `1`. Vamos testar:

// ```javascript
// async function f() {
//   return 1;
// }

// f().then(alert); // exibe: 1
// ```

// ...Também poderíamos retornar uma *Promise* explicitamente, e o resultado seria o mesmo:

// ```javascript
// async function f() {
//   return Promise.resolve(1);
// }

// f().then(alert); // exibe: 1
// ```

// Portanto, o `async` garante que a função retorna uma *Promise*, mesmo que você retorne um valor comum.
// Simples, certo? Mas tem mais — a palavra-chave `await`, que só funciona dentro de funções `async`, e é muito útil.

// ---

// ## `await`

// ### Sintaxe:

// ```javascript
// let valor = await promise; // só funciona dentro de funções async
// ```

// A palavra **`await`** faz o JavaScript **esperar até que a *Promise* seja resolvida**, e então retorna seu resultado.

// Exemplo com uma *Promise* que se resolve após 1 segundo:

// ```javascript
// async function f() {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("pronto!"), 1000);
//   });

//   let resultado = await promise; // espera a resolução da promise

//   alert(resultado); // exibe "pronto!"
// }

// f();
// ```

// A execução da função é "pausada" na linha do `await` e **só continua quando a *Promise* estiver resolvida**.
// Ou seja, o código acima mostra "pronto!" após 1 segundo.

// Importante: o `await` **suspende a execução da função** até que a *Promise* se resolva, mas **sem bloquear a CPU** — o motor JavaScript pode continuar executando outros scripts, tratando eventos, etc.

// Isso é uma forma **muito mais elegante** de obter o resultado de uma *Promise* do que usando `.then`, além de ser mais legível.

// ---

// ## Não é possível usar `await` em funções comuns

// Se tentarmos usar `await` fora de uma função `async`, teremos um erro de sintaxe:

// ```javascript
// function f() {
//   let promise = Promise.resolve(1);
//   let resultado = await promise; // Erro de sintaxe!
// }
// ```

// Esse erro normalmente ocorre quando esquecemos de colocar `async` na função.
// Como dito antes, `await` **só pode ser usado dentro de funções `async`**.

// ---

// ## Reescrevendo um exemplo com `async/await`

// Vamos reescrever o exemplo `showAvatar()` do capítulo de *Encadeamento de Promises*, agora usando `async/await`:

// ```javascript
// async function showAvatar() {
//   // Lê nosso JSON
//   let response = await fetch('/article/promise-chaining/user.json');
//   let user = await response.json();

//   // Busca usuário do GitHub
//   let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
//   let githubUser = await githubResponse.json();

//   // Mostra o avatar
//   let img = document.createElement('img');
//   img.src = githubUser.avatar_url;
//   img.className = "promise-avatar-example";
//   document.body.append(img);

//   // Espera 3 segundos
//   await new Promise(resolve => setTimeout(resolve, 3000));

//   img.remove();

//   return githubUser;
// }

// showAvatar();
// ```

// Muito mais limpo e legível, certo?

// ---

// ## Navegadores modernos permitem `await` no topo de módulos

// Em navegadores modernos, podemos usar `await` diretamente no escopo global **se estivermos dentro de um módulo (module)**:

// ```javascript
// // Suponha que isso esteja num módulo
// let response = await fetch('/article/promise-chaining/user.json');
// let user = await response.json();

// console.log(user);
// ```

// Caso não estejamos usando módulos (ou para compatibilidade com navegadores antigos), podemos envolver o código em uma função anônima `async`:

// ```javascript
// (async () => {
//   let response = await fetch('/article/promise-chaining/user.json');
//   let user = await response.json();
//   console.log(user);
// })();
// ```

// ---

// ## `await` aceita “thenables”

// Assim como `.then`, o `await` funciona com objetos que **implementam o método `.then()`**, mesmo que não sejam *Promises* reais — esses objetos são chamados **thenables**.

// Exemplo de uma classe `Thenable`:

// ```javascript
// class Thenable {
//   constructor(num) {
//     this.num = num;
//   }

//   then(resolve, reject) {
//     setTimeout(() => resolve(this.num * 2), 1000);
//   }
// }

// async function f() {
//   let result = await new Thenable(1); // espera 1 segundo
//   alert(result); // exibe: 2
// }

// f();
// ```

// O `await` detecta que o objeto tem `.then()` e o trata como uma *Promise*.

// ---

// ## Métodos `async` em classes

// Você pode declarar métodos `async` em classes:

// ```javascript
// class Waiter {
//   async wait() {
//     return await Promise.resolve(1);
//   }
// }

// new Waiter()
//   .wait()
//   .then(alert); // exibe: 1
// ```

// Mesmo significado: o método retorna uma *Promise* e pode usar `await`.

// ---

// ## Tratamento de erros

// Se a *Promise* for rejeitada, o `await` lança o erro — como se fosse um `throw`.

// Exemplo:

// ```javascript
// async function f() {
//   await Promise.reject(new Error("Ops!"));
// }
// ```

// É o mesmo que:

// ```javascript
// async function f() {
//   throw new Error("Ops!");
// }
// ```

// Você pode tratar erros com `try..catch`:

// ```javascript
// async function f() {
//   try {
//     let response = await fetch('http://url-inexistente');
//   } catch (err) {
//     alert(err); // TypeError: failed to fetch
//   }
// }
// ```

// Ou capturar múltiplas linhas:

// ```javascript
// async function f() {
//   try {
//     let response = await fetch('/no-user-here');
//     let user = await response.json();
//   } catch (err) {
//     alert(err); // captura erro do fetch ou do .json()
//   }
// }
// ```

// Sem `try..catch`, a função `async` retorna uma *Promise* rejeitada:

// ```javascript
// async function f() {
//   let response = await fetch('http://url-inexistente');
// }

// f().catch(alert); // captura o erro aqui
// ```

// Se esquecermos do `.catch`, teremos um erro de *Promise não tratada*, que pode ser capturado com o evento global `unhandledrejection`.

// ---

// ## `async/await` vs `.then/.catch`

// Com `async/await`, raramente precisamos usar `.then`, pois o `await` já cuida disso.
// Em vez de `.catch`, usamos `try..catch`.

// Mas fora de funções `async`, precisamos usar `.then/.catch`, pois não podemos usar `await` no escopo global (a menos que seja num módulo).

// ---

// ## Funciona bem com `Promise.all`

// Quando precisamos aguardar várias *Promises* ao mesmo tempo, podemos usar `Promise.all` com `await`:

// ```javascript
// let resultados = await Promise.all([
//   fetch(url1),
//   fetch(url2),
//   ...
// ]);
// ```

// Se alguma das *Promises* falhar, o erro se propaga normalmente para o `try..catch`.

// ---

// ## Resumo

// * A palavra-chave `async` antes de uma função:

//   1. Faz com que ela sempre retorne uma *Promise*;
//   2. Permite o uso de `await` dentro dela.

// * A palavra-chave `await` antes de uma *Promise*:

//   1. Faz com que o JavaScript **espere** até que a *Promise* seja resolvida;
//   2. Se a *Promise* for rejeitada, lança uma exceção — como um `throw`.

// Juntas, `async` e `await` fornecem uma forma **mais simples e legível** de escrever código assíncrono.

// Apesar de quase não precisarmos mais de `.then` e `.catch`, eles ainda são importantes em casos onde `await` não pode ser usado (por exemplo, no escopo global).
// Além disso, `Promise.all` é muito útil para lidar com múltiplas tarefas assíncronas ao mesmo tempo.

// ---

// Se quiser, posso criar exemplos interativos ou visuais para explicar o fluxo de execução com `await` vs `.then`. Deseja isso?
