// Claro! Aqui está a tradução e adaptação completa para o português do texto sobre **Microtarefas (Microtasks)**:

// ---

// ## Microtarefas

// Os manipuladores de *Promises* — `.then`, `.catch`, `.finally` — **são sempre assíncronos**.

// Mesmo quando uma *Promise* é resolvida imediatamente, o código nas linhas **abaixo** de `.then`, `.catch` ou `.finally` será executado **antes** desses manipuladores.

// Veja esse exemplo:

// ```javascript
// let promise = Promise.resolve();

// promise.then(() => alert("promise resolvida!"));

// alert("código finalizado"); // este alert aparece primeiro
// ```

// Ao executar esse código, você verá primeiro "código finalizado", e só depois "promise resolvida!".

// Isso parece estranho, porque a *Promise* já foi resolvida desde o início.
// Por que então o `.then` foi executado depois? O que está acontecendo?

// ---

// ### A fila de microtarefas (microtask queue)

// Tarefas assíncronas precisam de uma forma adequada de gerenciamento.
// Para isso, o padrão ECMAScript especifica uma **fila interna** chamada `PromiseJobs`, mais conhecida como **fila de microtarefas** (ou *microtask queue*, termo usado no V8).

// Segundo a especificação:

// * A fila é **FIFO** (*first-in-first-out*): as tarefas adicionadas primeiro são executadas primeiro.
// * A execução de uma tarefa começa **somente quando nada mais estiver sendo executado** no momento.

// Em outras palavras: quando uma *Promise* está pronta, seus manipuladores `.then`, `.catch`, `.finally` são **colocados na fila**, mas **ainda não são executados**.
// O motor JavaScript espera o código atual terminar e, então, executa as tarefas da fila.

// **Por isso** vemos "código finalizado" antes de "promise resolvida!" no exemplo acima.

// > Todos os manipuladores de Promise passam por essa fila interna.

// Se houver uma cadeia com vários `.then/.catch/.finally`, **cada um deles** também será executado de forma assíncrona — ou seja, são enfileirados primeiro e executados depois que o código atual terminar e os handlers anteriores forem processados.

// ---

// ### E se a ordem for importante?

// E se quisermos que o "código finalizado" apareça **depois** da "promise resolvida!"?

// Simples: basta colocá-lo na cadeia do `.then`:

// ```javascript
// Promise.resolve()
//   .then(() => alert("promise resolvida!"))
//   .then(() => alert("código finalizado"));
// ```

// Agora, a ordem será exatamente como esperada.

// ---

// ## Rejeição não tratada (*Unhandled Rejection*)

// Você se lembra do evento `unhandledrejection` do artigo sobre **tratamento de erros com promises**?

// Agora podemos entender exatamente **como o JavaScript detecta uma rejeição não tratada**.

// Uma **rejeição não tratada** ocorre quando uma *Promise* é rejeitada e **nenhum `.catch` é adicionado até o final da fila de microtarefas**.

// Normalmente, se esperamos um erro, usamos `.catch` na cadeia para tratá-lo:

// ```javascript
// let promise = Promise.reject(new Error("Promise falhou!"));
// promise.catch(err => alert('erro tratado'));

// // Esse handler não será chamado porque o erro foi tratado
// window.addEventListener('unhandledrejection', event => alert(event.reason));
// ```

// Mas se **esquecermos** de adicionar `.catch`, o evento `unhandledrejection` será disparado **após o esvaziamento da fila de microtarefas**:

// ```javascript
// let promise = Promise.reject(new Error("Promise falhou!"));

// // Será exibido: "Promise falhou!"
// window.addEventListener('unhandledrejection', event => alert(event.reason));
// ```

// E se tratarmos o erro **tarde demais**, por exemplo com um `setTimeout`?

// ```javascript
// let promise = Promise.reject(new Error("Promise falhou!"));

// setTimeout(() => promise.catch(err => alert('erro tratado')), 1000);

// // Será exibido: "Promise falhou!"
// window.addEventListener('unhandledrejection', event => alert(event.reason));
// ```

// Nesse caso, ao executar, veremos:

// 1. "Promise falhou!" (evento `unhandledrejection`)
// 2. Depois de 1 segundo: "erro tratado" (via `.catch` no `setTimeout`)

// Se não soubéssemos sobre a **fila de microtarefas**, poderíamos nos perguntar:

// > "Mas por que o `unhandledrejection` foi chamado? Nós tratamos o erro!"

// Agora sabemos a resposta:
// O evento `unhandledrejection` é disparado **quando a fila de microtarefas é esvaziada**.
// Se, nesse momento, houver alguma *Promise* rejeitada **sem um `.catch`**, o evento será disparado.

// No exemplo acima, o `.catch` é adicionado **depois**, via `setTimeout`, quando a fila de microtarefas já foi processada — por isso **não impede** o evento.

// ---

// ## Resumo

// * O tratamento de *Promises* é sempre **assíncrono**.
// * Todos os manipuladores `.then`, `.catch` e `.finally` passam por uma **fila interna de microtarefas** (ou *PromiseJobs*).
// * Isso significa que eles são executados **somente depois** que o código atual termina de rodar.
// * Se você precisa garantir que algo seja executado **depois** de um `.then`, basta encadeá-lo com outro `.then`.
// * Em motores JavaScript como os usados em navegadores e no Node.js, o conceito de **microtarefas** está intimamente ligado ao **event loop** e às **macrotarefas**, que são abordados separadamente no artigo **Event Loop: microtarefas e macrotarefas**.

// ---

// Se quiser, posso também fazer um diagrama ou exemplo prático usando *macrotasks* (como `setTimeout`) para comparar com *microtasks*. Deseja isso?
