// -----

// ## Promise API

// Existem 6 métodos estáticos na classe `Promise`. Abordaremos rapidamente seus casos de uso aqui.

// -----

// ### `Promise.all`

// Digamos que queremos que muitas promises sejam executadas em paralelo e esperemos até que todas estejam prontas.

// Por exemplo, baixar várias URLs em paralelo e processar o conteúdo assim que todas estiverem concluídas.

// Para isso serve o `Promise.all`.

// A sintaxe é:

// ```javascript
// let promise = Promise.all(iterable);
// ```

// `Promise.all` recebe um iterável (geralmente, um array de promises) e retorna uma nova promise.

// A nova promise é resolvida quando todas as promises listadas são resolvidas, e o array de seus resultados se torna seu resultado.

// Por exemplo, o `Promise.all` abaixo é resolvido após 3 segundos, e então seu resultado é um array `[1, 2, 3]`:

// ```javascript
// Promise.all([
//   new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
//   new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
//   new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
// ]).then(alert); // 1,2,3 quando as promises estão prontas: cada promise contribui com um membro do array
// ```

// Observe que a ordem dos membros do array resultante é a mesma das promises de origem. Mesmo que a primeira promise leve mais tempo para ser resolvida, ela ainda é a primeira no array de resultados.

// Um truque comum é mapear um array de dados de trabalho para um array de promises e, em seguida, encapsular isso em `Promise.all`.

// Por exemplo, se tivermos um array de URLs, podemos buscá-las todas assim:

// ```javascript
// let urls = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'https://api.github.com/users/jeresig'
// ];

// // mapeia cada url para a promise do fetch
// let requests = urls.map(url => fetch(url));

// // Promise.all espera até que todos os trabalhos sejam resolvidos
// Promise.all(requests)
//   .then(responses => responses.forEach(
//     response => alert(`${response.url}: ${response.status}`)
//   ));
// ```

// Um exemplo maior com a busca de informações de usuário para um array de usuários do GitHub por seus nomes (poderíamos buscar um array de produtos por seus IDs, a lógica é idêntica):

// ```javascript
// let names = ['iliakan', 'remy', 'jeresig'];

// let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

// Promise.all(requests)
//   .then(responses => {
//     // todas as respostas são resolvidas com sucesso
//     for(let response of responses) {
//       alert(`${response.url}: ${response.status}`); // mostra 200 para cada url
//     }

//     return responses;
//   })
//   // mapeia o array de respostas para um array de response.json() para ler seu conteúdo
//   .then(responses => Promise.all(responses.map(r => r.json())))
//   // todas as respostas JSON são analisadas: "users" é o array delas
//   .then(users => users.forEach(user => alert(user.name)));
// ```

// Se qualquer uma das promises for rejeitada, a promise retornada por `Promise.all` **imediatamente rejeita com esse erro**.

// Por exemplo:

// ```javascript
// Promise.all([
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Opa!")), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).catch(alert); // Error: Opa!
// ```

// Aqui a segunda promise rejeita em dois segundos. Isso leva a uma rejeição imediata de `Promise.all`, então `.catch` é executado: o erro de rejeição se torna o resultado de todo o `Promise.all`.

// -----

// #### Em Caso de Erro, Outras Promises São Ignoradas

// Se uma promise rejeita, `Promise.all` rejeita imediatamente, esquecendo completamente as outras na lista. Seus resultados são ignorados.

// Por exemplo, se houver várias chamadas `fetch`, como no exemplo acima, e uma falhar, as outras continuarão a ser executadas, mas `Promise.all` não as observará mais. Elas provavelmente se resolverão, mas seus resultados serão ignorados.

// `Promise.all` não faz nada para cancelá-los, pois não há conceito de "cancelamento" em promises. Em [outro capítulo](https://www.google.com/search?q=https://javascript.info/abort-controller) abordaremos o `AbortController` que pode ajudar com isso, mas não faz parte da API Promise.

// -----

// #### `Promise.all(iterable)` Permite Valores "Regulares" Não-Promise em `iterable`

// Normalmente, `Promise.all(...)` aceita um iterável (na maioria dos casos um array) de promises. Mas se algum desses objetos não for uma promise, ele é passado para o array resultante "como está".

// Por exemplo, aqui os resultados são `[1, 2, 3]`:

// ```javascript
// Promise.all([
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(1), 1000)
//   }),
//   2,
//   3
// ]).then(alert); // 1, 2, 3
// ```

// Assim, somos capazes de passar valores prontos para `Promise.all` onde for conveniente.

// -----

// ### `Promise.allSettled`

// **Uma adição recente**

// Esta é uma adição recente à linguagem. Navegadores antigos podem precisar de [polyfills](https://www.google.com/search?q=https://caniuse.com/%23feat%3Dpromise-allsettled).

// `Promise.all` rejeita como um todo se alguma promise rejeitar. Isso é bom para casos de "tudo ou nada", quando precisamos de **todos** os resultados bem-sucedidos para prosseguir:

// ```javascript
// Promise.all([
//   fetch('/template.html'),
//   fetch('/style.css'),
//   fetch('/data.json')
// ]).then(render); // o método render precisa dos resultados de todos os fetches
// ```

// `Promise.allSettled` simplesmente espera que todas as promises sejam resolvidas ou rejeitadas, independentemente do resultado. O array resultante contém:

//   * `{status:"fulfilled", value:result}` para respostas bem-sucedidas,
//   * `{status:"rejected", reason:error}` para erros.

// Por exemplo, gostaríamos de buscar informações sobre vários usuários. Mesmo que uma requisição falhe, ainda estamos interessados nas outras.

// Vamos usar `Promise.allSettled`:

// ```javascript
// let urls = [
//   'https://api.github.com/users/iliakan',
//   'https://api.github.com/users/remy',
//   'https://no-such-url'
// ];

// Promise.allSettled(urls.map(url => fetch(url)))
//   .then(results => { // (*)
//     results.forEach((result, num) => {
//       if (result.status == "fulfilled") {
//         alert(`${urls[num]}: ${result.value.status}`);
//       }
//       if (result.status == "rejected") {
//         alert(`${urls[num]}: ${result.reason}`);
//       }
//     });
//   });
// ```

// Os `results` na linha `(*)` acima serão:

// ```javascript
// [
//   {status: 'fulfilled', value: ...response...},
//   {status: 'fulfilled', value: ...response...},
//   {status: 'rejected', reason: ...error object...}
// ]
// ```

// Então, para cada promise, obtemos seu status e `value`/`error`.

// -----

// #### Polyfill

// Se o navegador não suporta `Promise.allSettled`, é fácil fazer um polyfill:

// ```javascript
// if (!Promise.allSettled) {
//   const rejectHandler = reason => ({ status: 'rejected', reason });

//   const resolveHandler = value => ({ status: 'fulfilled', value });

//   Promise.allSettled = function (promises) {
//     const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
//     return Promise.all(convertedPromises);
//   };
// }
// ```

// Neste código, `promises.map` pega os valores de entrada, os transforma em promises (caso um não-promise tenha sido passado) com `p => Promise.resolve(p)`, e então adiciona o manipulador `.then` a cada um.

// Esse manipulador transforma um `value` de resultado bem-sucedido em `{status:'fulfilled', value}`, e um `reason` de erro em `{status:'rejected', reason}`. Esse é exatamente o formato de `Promise.allSettled`.

// Agora podemos usar `Promise.allSettled` para obter os resultados de **todas** as promises dadas, mesmo que algumas delas sejam rejeitadas.

// -----

// ### `Promise.race`

// Semelhante a `Promise.all`, mas espera apenas pela primeira promise resolvida ou rejeitada e obtém seu resultado (ou erro).

// A sintaxe é:

// ```javascript
// let promise = Promise.race(iterable);
// ```

// Por exemplo, aqui o resultado será `1`:

// ```javascript
// Promise.race([
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Opa!")), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // 1
// ```

// A primeira promise aqui foi a mais rápida, então ela se tornou o resultado. Após a primeira promise resolvida ou rejeitada "vencer a corrida", todos os resultados/erros posteriores são ignorados.

// -----

// ### `Promise.any`

// Semelhante a `Promise.race`, mas espera apenas pela primeira promise **cumprida** (resolvida) e obtém seu resultado. Se todas as promises dadas forem rejeitadas, a promise retornada é rejeitada com `AggregateError` – um objeto de erro especial que armazena todos os erros das promises em sua propriedade `errors`.

// A sintaxe é:

// ```javascript
// let promise = Promise.any(iterable);
// ```

// Por exemplo, aqui o resultado será `1`:

// ```javascript
// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Opa!")), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // 1
// ```

// A primeira promise aqui foi a mais rápida, mas foi rejeitada, então a segunda promise se tornou o resultado. Após a primeira promise cumprida "vencer a corrida", todos os resultados posteriores são ignorados.

// Aqui está um exemplo quando todas as promises falham:

// ```javascript
// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ai!")), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Erro!")), 2000))
// ]).catch(error => {
//   console.log(error.constructor.name); // AggregateError
//   console.log(error.errors[0]); // Error: Ai!
//   console.log(error.errors[1]); // Error: Erro!
// });
// ```

// Como você pode ver, os objetos de erro para promises que falharam estão disponíveis na propriedade `errors` do objeto `AggregateError`.

// -----

// ### `Promise.resolve`/`reject`

// Os métodos `Promise.resolve` e `Promise.reject` são raramente necessários em código moderno, porque a sintaxe `async/await` (abordaremos isso [um pouco mais tarde](https://javascript.info/async-await)) os torna um tanto obsoletos.

// Nós os abordamos aqui para completude e para aqueles que não podem usar `async/await` por algum motivo.

// -----

// #### `Promise.resolve`

// `Promise.resolve(value)` cria uma promise resolvida com o resultado `value`.

// O mesmo que:

// ```javascript
// let promise = new Promise(resolve => resolve(value));
// ```

// O método é usado para compatibilidade, quando se espera que uma função retorne uma promise.

// Por exemplo, a função `loadCached` abaixo busca uma URL e lembra (armazena em cache) seu conteúdo. Para chamadas futuras com a mesma URL, ela imediatamente obtém o conteúdo anterior do cache, mas usa `Promise.resolve` para criar uma promise a partir dele, de modo que o valor retornado seja sempre uma promise:

// ```javascript
// let cache = new Map();

// function loadCached(url) {
//   if (cache.has(url)) {
//     return Promise.resolve(cache.get(url)); // (*)
//   }

//   return fetch(url)
//     .then(response => response.text())
//     .then(text => {
//       cache.set(url,text);
//       return text;
//     });
// }
// ```

// Podemos escrever `loadCached(url).then(...)`, porque a função tem a garantia de retornar uma promise. Sempre podemos usar `.then` após `loadCached`. Esse é o propósito de `Promise.resolve` na linha `(*)`.

// -----

// #### `Promise.reject`

// `Promise.reject(error)` cria uma promise rejeitada com `error`.

// O mesmo que:

// ```javascript
// let promise = new Promise((resolve, reject) => reject(error));
// ```

// Na prática, este método quase nunca é usado.

// -----

// ### Resumo

// Existem 6 métodos estáticos da classe `Promise`:

//   * `Promise.all(promises)` – espera que todas as promises sejam resolvidas e retorna um array de seus resultados. Se alguma das promises dadas for rejeitada, ela se torna o erro de `Promise.all`, e todos os outros resultados são ignorados.
//   * `Promise.allSettled(promises)` (método adicionado recentemente) – espera que todas as promises sejam resolvidas ou rejeitadas e retorna seus resultados como um array de objetos com:
//       * `status`: `"fulfilled"` ou `"rejected"`
//       * `value` (se cumprida) ou `reason` (se rejeitada).
//   * `Promise.race(promises)` – espera pela primeira promise a ser resolvida ou rejeitada, e seu resultado/erro se torna o desfecho.
//   * `Promise.any(promises)` (método adicionado recentemente) – espera pela primeira promise a ser cumprida (resolvida), e seu resultado se torna o desfecho. Se todas as promises dadas forem rejeitadas, `AggregateError` se torna o erro de `Promise.any`.
//   * `Promise.resolve(value)` – cria uma promise resolvida com o valor dado.
//   * `Promise.reject(error)` – cria uma promise rejeitada com o erro dado.

// De todos esses, `Promise.all` é provavelmente o mais comum na prática.