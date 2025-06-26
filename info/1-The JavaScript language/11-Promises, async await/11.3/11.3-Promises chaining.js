// -----

// ## Encadeamento de https://www.google.com/search?q=Promises

// Vamos retornar ao problema mencionado no capítulo [Introdução: callbacks](https://javascript.info/callbacks): temos uma sequência de tarefas assíncronas a serem executadas uma após a outra — por exemplo, carregar scripts. Como podemos codificá-lo bem?

// https://www.google.com/search?q=Promises fornecem algumas "receitas" para fazer isso.

// Neste capítulo, abordamos o **encadeamento de promises**.

// Parece com isto:

// ```javascript
// new Promise(function(resolve, reject) {

//   setTimeout(() => resolve(1), 1000); // (*)
// }).then(function(result) { // (**)

//   alert(result); // 1
//   return result * 2;
// }).then(function(result) { // (***)

//   alert(result); // 2
//   return result * 2;
// }).then(function(result) {

//   alert(result); // 4
//   return result * 2;
// });
// ```

// A ideia é que o **resultado é passado através da cadeia de manipuladores `.then`**.

// Aqui o fluxo é:

// 1.  A promise inicial é resolvida em 1 segundo `(*)`,
// 2.  Então o manipulador `.then` é chamado `(**)`, que por sua vez cria uma nova promise (resolvida com o valor `2`).
// 3.  O próximo `then` `(***)` obtém o resultado do anterior, o processa (dobra) e o passa para o próximo manipulador.
// 4.  ...e assim por diante.

// Como o resultado é passado ao longo da cadeia de manipuladores, podemos ver uma sequência de chamadas `alert`: `1` → `2` → `4`.

// Todo o processo funciona porque **cada chamada a um `.then` retorna uma nova promise**, de modo que podemos chamar o próximo `.then` nela.

// Quando um manipulador retorna um valor, ele se torna o resultado dessa promise, então o próximo `.then` é chamado com ele.

// -----

// ### Um Erro Clássico de Iniciante: Múltiplos `.then` na Mesma https://www.google.com/search?q=Promise

// Tecnicamente, também podemos adicionar muitos `.then` a uma única promise. **Isso não é encadeamento.**

// Por exemplo:

// ```javascript
// let promise = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// });

// promise.then(function(result) {
//   alert(result); // 1
//   return result * 2;
// });

// promise.then(function(result) {
//   alert(result); // 1
//   return result * 2;
// });

// promise.then(function(result) {
//   alert(result); // 1
//   return result * 2;
// });
// ```

// O que fizemos aqui foi apenas adicionar vários manipuladores a uma promise. Eles não passam o resultado uns para os outros; em vez disso, eles o processam independentemente.

// Aqui está a imagem (compare com o encadeamento acima):

// ```mermaid
// graph TD
//     A[Promise] --> B[then 1];
//     A --> C[then 2];
//     A --> D[then 3];
// ```

// Todos os `.then` na mesma promise obtêm o mesmo resultado – o resultado dessa promise. Então, no código acima, todos os `alert`s mostram o mesmo: `1`.

// Na prática, raramente precisamos de múltiplos manipuladores para uma promise. O encadeamento é usado muito mais frequentemente.

// -----

// ### Retornando https://www.google.com/search?q=Promises

// Um manipulador, usado em `.then(handler)`, pode criar e retornar uma promise.

// Nesse caso, os manipuladores posteriores esperam até que ela seja resolvida ou rejeitada, e então obtêm seu resultado.

// Por exemplo:

// ```javascript
// new Promise(function(resolve, reject) {

//   setTimeout(() => resolve(1), 1000);
// }).then(function(result) {

//   alert(result); // 1
//   return new Promise((resolve, reject) => { // (*)
//     setTimeout(() => resolve(result * 2), 1000);
//   });
// }).then(function(result) { // (**)

//   alert(result); // 2

//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(result * 2), 1000);
//   });
// }).then(function(result) {

//   alert(result); // 4
// });
// ```

// Aqui, o primeiro `.then` mostra `1` e retorna `new Promise(...)` na linha `(*)`. Após um segundo, ela é resolvida, e o resultado (o argumento de `resolve`, aqui é `result * 2`) é passado para o manipulador do segundo `.then`. Esse manipulador está na linha `(**)`, ele mostra `2` e faz a mesma coisa.

// Então a saída é a mesma do exemplo anterior: 1 → 2 → 4, mas agora com um atraso de 1 segundo entre as chamadas `alert`.

// **Retornar promises nos permite construir cadeias de ações assíncronas.**

// -----

// ### Exemplo: `loadScript`

// Vamos usar esse recurso com a função `loadScript` "promisificada", definida no [capítulo anterior](https://www.google.com/search?q=Promise), para carregar scripts um por um, em sequência:

// ```javascript
// loadScript("/article/promise-chaining/one.js")
//   .then(function(script) {
//     return loadScript("/article/promise-chaining/two.js");
//   })
//   .then(function(script) {
//     return loadScript("/article/promise-chaining/three.js");
//   })
//   .then(function(script) {
//     // usar funções declaradas em scripts
//     // para mostrar que eles realmente carregaram
//     one();
//     two();
//     three();
//   });
// ```

// Este código pode ser um pouco mais curto com funções de seta (arrow functions):

// ```javascript
// loadScript("/article/promise-chaining/one.js")
//   .then(script => loadScript("/article/promise-chaining/two.js"))
//   .then(script => loadScript("/article/promise-chaining/three.js"))
//   .then(script => {
//     // scripts carregados, podemos usar funções declaradas lá
//     one();
//     two();
//     three();
//   });
// ```

// Aqui, cada chamada `loadScript` retorna uma promise, e o próximo `.then` é executado quando ela é resolvida. Então, ele inicia o carregamento do próximo script. Assim, os scripts são carregados um após o outro.

// Podemos adicionar mais ações assíncronas à cadeia. Observe que o código ainda é "plano" — ele cresce para baixo, não para a direita. Não há sinais da "pirâmide da perdição".

// Tecnicamente, poderíamos adicionar `.then` diretamente a cada `loadScript`, assim:

// ```javascript
// loadScript("/article/promise-chaining/one.js").then(script1 => {
//   loadScript("/article/promise-chaining/two.js").then(script2 => {
//     loadScript("/article/promise-chaining/three.js").then(script3 => {
//       // esta função tem acesso às variáveis script1, script2 e script3
//       one();
//       two();
//       three();
//     });
//   });
// });
// ```

// Este código faz a mesma coisa: carrega 3 scripts em sequência. Mas ele "cresce para a direita". Então, temos o mesmo problema das callbacks.

// Pessoas que começam a usar promises às vezes não sabem sobre o encadeamento, então escrevem dessa forma. Geralmente, o encadeamento é preferido.

// Às vezes, é aceitável escrever `.then` diretamente, porque a função aninhada tem acesso ao escopo externo. No exemplo acima, o callback mais aninhado tem acesso a todas as variáveis `script1`, `script2`, `script3`. Mas essa é uma exceção, não uma regra.

// -----

// ### Thenables

// Para ser preciso, um manipulador pode retornar não exatamente uma promise, mas um objeto chamado **"thenable"** – um objeto arbitrário que possui um método `.then`. Ele será tratado da mesma forma que uma promise.

// A ideia é que bibliotecas de terceiros podem implementar seus próprios objetos "compatíveis com promise". Eles podem ter um conjunto estendido de métodos, mas também serem compatíveis com promises nativas, porque implementam `.then`.

// Aqui está um exemplo de um objeto thenable:

// ```javascript
// class Thenable {
//   constructor(num) {
//     this.num = num;
//   }
//   then(resolve, reject) {
//     alert(resolve); // function() { native code }
//     // resolve com this.num*2 após 1 segundo
//     setTimeout(() => resolve(this.num * 2), 1000); // (**)
//   }
// }

// new Promise(resolve => resolve(1))
//   .then(result => {
//     return new Thenable(result); // (*)
//   })
//   .then(alert); // mostra 2 após 1000ms
// ```

// JavaScript verifica o objeto retornado pelo manipulador `.then` na linha `(*)`: se ele tiver um método chamável chamado `then`, ele chamará esse método fornecendo funções nativas `resolve`, `reject` como argumentos (semelhante a um executor) e esperará até que uma delas seja chamada. No exemplo acima, `resolve(2)` é chamado após 1 segundo `(**)`. Então o resultado é passado para a frente na cadeia.

// Este recurso nos permite integrar objetos personalizados com cadeias de promise sem precisar herdar de `Promise`.

// -----

// ### Exemplo Maior: `fetch`

// Na programação frontend, promises são frequentemente usadas para requisições de rede. Então, vamos ver um exemplo estendido disso.

// Usaremos o método `fetch` para carregar as informações do usuário de um servidor remoto. Ele tem muitos parâmetros opcionais cobertos em [capítulos separados](https://javascript.info/fetch), mas a sintaxe básica é bastante simples:

// ```javascript
// let promise = fetch(url);
// ```

// Isso faz uma requisição de rede para a `url` e retorna uma promise. A promise é resolvida com um objeto `response` quando o servidor remoto responde com cabeçalhos, mas **antes que a resposta completa seja baixada**.

// Para ler a resposta completa, devemos chamar o método `response.text()`: ele retorna uma promise que é resolvida quando o texto completo é baixado do servidor remoto, com esse texto como resultado.

// O código abaixo faz uma requisição para `user.json` e carrega seu texto do servidor:

// ```javascript
// fetch('/article/promise-chaining/user.json')
//   // .then abaixo é executado quando o servidor remoto responde
//   .then(function(response) {
//     // response.text() retorna uma nova promise que é resolvida com o texto completo da resposta
//     // quando ele carrega
//     return response.text();
//   })
//   .then(function(text) {
//     // ...e aqui está o conteúdo do arquivo remoto
//     alert(text); // {"name": "iliakan", "isAdmin": true}
//   });
// ```

// O objeto `response` retornado por `fetch` também inclui o método `response.json()` que lê os dados remotos e os analisa como JSON. No nosso caso, isso é ainda mais conveniente, então vamos mudar para ele.

// Também usaremos funções de seta para brevidade:

// ```javascript
// // igual ao anterior, mas response.json() analisa o conteúdo remoto como JSON
// fetch('/article/promise-chaining/user.json')
//   .then(response => response.json())
//   .then(user => alert(user.name)); // iliakan, obteve o nome do usuário
// ```

// Agora, vamos fazer algo com o usuário carregado.

// Por exemplo, podemos fazer mais uma requisição ao GitHub, carregar o perfil do usuário e mostrar o avatar:

// ```javascript
// // Faz uma requisição para user.json
// fetch('/article/promise-chaining/user.json')
//   // Carrega como json
//   .then(response => response.json())
//   // Faz uma requisição ao GitHub
//   .then(user => fetch(`https://api.github.com/users/${user.name}`))
//   // Carrega a resposta como json
//   .then(response => response.json())
//   // Mostra a imagem do avatar (githubUser.avatar_url) por 3 segundos (talvez animá-la)
//   .then(githubUser => {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => img.remove(), 3000); // (*)
//   });
// ```

// O código funciona; veja os comentários sobre os detalhes. No entanto, há um problema potencial nele, um erro típico para quem começa a usar promises.

// Olhe para a linha `(*)`: como podemos fazer algo **depois** que o avatar terminar de aparecer e for removido? Por exemplo, gostaríamos de mostrar um formulário para editar esse usuário ou algo mais. Atualmente, não há como.

// Para tornar a cadeia extensível, precisamos **retornar uma promise que se resolve quando o avatar termina de aparecer**.

// Assim:

// ```javascript
// fetch('/article/promise-chaining/user.json')
//   .then(response => response.json())
//   .then(user => fetch(`https://api.github.com/users/${user.name}`))
//   .then(response => response.json())
//   .then(githubUser => new Promise(function(resolve, reject) { // (*)
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser); // (**)
//     }, 3000);
//   }))
//   // dispara após 3 segundos
//   .then(githubUser => alert(`Terminou de mostrar ${githubUser.name}`));
// ```

// Ou seja, o manipulador `.then` na linha `(*)` agora retorna `new Promise`, que só se torna resolvida ou rejeitada após a chamada de `resolve(githubUser)` em `setTimeout` `(**)`. O próximo `.then` na cadeia esperará por isso.

// Como boa prática, uma ação assíncrona deve sempre retornar uma promise. Isso possibilita planejar ações depois dela; mesmo que não planejemos estender a cadeia agora, podemos precisar dela mais tarde.

// Finalmente, podemos dividir o código em funções reutilizáveis:

// ```javascript
// function loadJson(url) {
//   return fetch(url)
//     .then(response => response.json());
// }

// function loadGithubUser(name) {
//   return loadJson(`https://api.github.com/users/${name}`);
// }

// function showAvatar(githubUser) {
//   return new Promise(function(resolve, reject) {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser);
//     }, 3000);
//   });
// }

// // Use-as:
// loadJson('/article/promise-chaining/user.json')
//   .then(user => loadGithubUser(user.name))
//   .then(showAvatar)
//   .then(githubUser => alert(`Terminou de mostrar ${githubUser.name}`));
//   // ...
// ```

// -----

// ### Resumo

// Se um manipulador `.then` (ou `catch`/`finally`, não importa) retorna uma promise, o restante da cadeia espera até que ela seja resolvida ou rejeitada. Quando isso acontece, seu resultado (ou erro) é passado adiante.

// Aqui está uma imagem completa:

// ```mermaid
// graph LR
//     A[Promise inicial] --> B{then (handler 1)};
//     B --> C{then (handler 2)};
//     C --> D{then (handler 3)};
//     B -- return value --> C;
//     C -- return value --> D;
// ```