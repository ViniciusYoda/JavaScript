// Claro! Aqui está a **tradução completa e adaptada para o português** da seção **Fetch: Abort (Abortar requisições fetch)**:

// ---

// # Fetch: Cancelando (Abortando) uma Requisição

// Como sabemos, `fetch` retorna uma **Promise**. E o JavaScript **não possui um conceito nativo de “cancelar” uma Promise**.

// Então como cancelar uma requisição `fetch` em andamento? Por exemplo, se as ações do usuário indicarem que ela não é mais necessária?

// ## A solução: AbortController

// Existe um objeto especial embutido para isso: **`AbortController`**.

// Ele pode ser usado para **cancelar não apenas fetch**, mas **qualquer tarefa assíncrona cancelável**.

// ---

// ### Criando um AbortController

// ```js
// let controller = new AbortController();
// ```

// Esse `controller` tem:

// * Um método: **`abort()`** – que dispara o cancelamento.
// * Uma propriedade: **`signal`** – usada para escutar eventos de cancelamento.

// Quando `controller.abort()` é chamado:

// * O evento `"abort"` é disparado em `controller.signal`.
// * A propriedade `controller.signal.aborted` se torna `true`.

// ---

// ## Como funciona

// Em geral, temos **duas partes**:

// 1. A parte que **realiza uma operação cancelável** → escuta `signal`.
// 2. A parte que **cancela a operação** → chama `abort()`.

// ### Exemplo básico (sem fetch ainda):

// ```js
// let controller = new AbortController();
// let signal = controller.signal;

// signal.addEventListener('abort', () => alert("Abortado!"));

// controller.abort(); // dispara o evento

// alert(signal.aborted); // true
// ```

// ---

// ## Usando com `fetch`

// Para que o `fetch` possa ser cancelado, **passamos `controller.signal` como opção**:

// ```js
// let controller = new AbortController();

// fetch(url, {
//   signal: controller.signal
// });
// ```

// Depois, podemos cancelar assim:

// ```js
// controller.abort();
// ```

// Quando isso acontece:

// * A requisição `fetch` é abortada.
// * A Promise é rejeitada com o erro `AbortError`.

// ---

// ### Exemplo completo: cancelar fetch após 1 segundo

// ```js
// let controller = new AbortController();

// setTimeout(() => controller.abort(), 1000); // aborta em 1s

// try {
//   let response = await fetch('/artigo/exemplo', {
//     signal: controller.signal
//   });
// } catch (err) {
//   if (err.name == 'AbortError') {
//     alert("Requisição abortada!");
//   } else {
//     throw err; // outros erros
//   }
// }
// ```

// ---

// ## Cancelando várias requisições ao mesmo tempo

// `AbortController` é **escalável**: podemos cancelar **várias requisições fetch** com um único `controller`.

// ```js
// let urls = ['url1', 'url2', 'url3'];

// let controller = new AbortController();

// let requisicoes = urls.map(url =>
//   fetch(url, { signal: controller.signal })
// );

// // Se precisarmos cancelar tudo:
// controller.abort();

// // Todas as fetches acima serão abortadas
// ```

// ---

// ## Cancelando `fetch` + outras tarefas assíncronas

// Você também pode usar `AbortController` para **cancelar suas próprias tarefas assíncronas**:

// ```js
// let controller = new AbortController();

// let minhaTarefa = new Promise((resolve, reject) => {
//   // nosso processo
//   controller.signal.addEventListener('abort', () => {
//     reject(new Error("Tarefa cancelada"));
//   });
// });

// let requisicoes = urls.map(url =>
//   fetch(url, { signal: controller.signal })
// );

// // Executa tudo em paralelo
// let resultados = await Promise.all([...requisicoes, minhaTarefa]);
// ```

// Se `controller.abort()` for chamado de qualquer lugar, ele cancela todas as fetches **e também** `minhaTarefa`.

// ---

// ## Resumo

// * `AbortController` é um objeto simples com:

//   * `abort()` → chama o cancelamento.
//   * `signal` → escutamos esse sinal.
// * O `fetch` **tem suporte nativo a `AbortController`**.

//   * Basta passar `signal` como opção na requisição.
//   * Ao chamar `abort()`, a requisição é cancelada.
// * A Promise de `fetch` será rejeitada com `AbortError`.
// * Podemos usar `AbortController` para cancelar:

//   * Várias requisições ao mesmo tempo.
//   * Tarefas assíncronas personalizadas no nosso código.

// ---

// Se quiser, posso montar um exemplo prático com HTML e barra de carregamento cancelável. Deseja?
