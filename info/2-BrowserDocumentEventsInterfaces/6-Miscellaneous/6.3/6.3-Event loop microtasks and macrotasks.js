// # Loop de Eventos: Microtarefas e Macrotarefas

// A execução do JavaScript no navegador (e também no Node.js) é baseada em um loop de eventos.

// Entender como o loop de eventos funciona é essencial para otimizar código e construir uma boa arquitetura.

// ## Loop de Eventos

// O conceito de loop de eventos é simples: um laço infinito onde o mecanismo JavaScript espera por tarefas, executa-as, e volta a esperar.

// ### Algoritmo geral:

// 1. Enquanto houver tarefas:

//    * Execute a mais antiga.
// 2. Durma (espere) até que uma nova tarefa apareça e então volte ao passo 1.

// ### Exemplos de tarefas:

// * Carregamento de um script externo
// * Movimento do mouse (gera evento `mousemove`)
// * `setTimeout` concluído

// Essas tarefas são colocadas em uma **fila de macrotarefas** (ou "macrotask queue"). Elas são processadas por ordem de chegada.

// **Importante:** O navegador **não renderiza nada** enquanto uma tarefa está sendo executada. Se ela demorar demais, aparece o aviso "Página não responde".

// ---

// ## Caso prático 1: dividir tarefas pesadas

// Tarefas que exigem muito da CPU (como destacar código) travam a interface do navegador. Podemos resolver isso dividindo a tarefa em partes com `setTimeout`.

// ### Exemplo:

// ```js
// let i = 0;
// let start = Date.now();

// function contar() {
//   do {
//     i++;
//   } while (i % 1e6 != 0);

//   if (i == 1e9) {
//     alert("Concluído em " + (Date.now() - start) + 'ms');
//   } else {
//     setTimeout(contar); // agenda a próxima parte
//   }
// }

// contar();
// ```

// ### Otimizando:

// Agende o `setTimeout` **antes** de executar o trecho pesado para reduzir o delay:

// ```js
// function contar() {
//   if (i < 1e9 - 1e6) setTimeout(contar);

//   do {
//     i++;
//   } while (i % 1e6 != 0);

//   if (i == 1e9) alert("Concluído em " + (Date.now() - start) + 'ms');
// }
// ```

// ---

// ## Caso prático 2: mostrar progresso

// Alterar o DOM dentro de uma tarefa longa **não** atualiza visualmente a página até o fim da execução.

// ### Sem divisão:

// ```js
// for (let i = 0; i < 1e6; i++) {
//   progress.innerHTML = i;
// }
// ```

// ### Com `setTimeout`:

// ```js
// function contar() {
//   do {
//     i++;
//     progress.innerHTML = i;
//   } while (i % 1e3 != 0);

//   if (i < 1e7) setTimeout(contar);
// }
// contar();
// ```

// Agora o progresso é exibido gradualmente.

// ---

// ## Caso prático 3: fazer algo após o evento

// Use `setTimeout(..., 0)` para postergar uma ação até que o evento atual termine:

// ```js
// menu.onclick = function() {
//   let evento = new CustomEvent("menu-aberto", { bubbles: true });
//   setTimeout(() => menu.dispatchEvent(evento));
// };
// ```

// ---

// ## Microtarefas vs Macrotarefas

// ### Macrotarefas

// * `setTimeout`, eventos, etc.

// ### Microtarefas

// * Criadas via Promises ou `queueMicrotask()`
// * Executadas **após cada macrotarefa** e **antes de renderizar** ou processar qualquer outro evento

// ### Ordem de execução:

// ```js
// setTimeout(() => alert("timeout"));

// Promise.resolve().then(() => alert("promise"));

// alert("código");
// ```

// Saída:

// 1. "código"
// 2. "promise"
// 3. "timeout"

// ### Exemplo com `queueMicrotask`:

// ```js
// function contar() {
//   do {
//     i++;
//     progress.innerHTML = i;
//   } while (i % 1e3 != 0);

//   if (i < 1e6) queueMicrotask(contar);
// }
// ```

// Microtarefas são ótimas para executar algo "após o código atual", mas antes de qualquer outra coisa (como eventos ou render).

// ---

// ## Resumo do algoritmo do Event Loop

// 1. Retire e execute a macrotarefa mais antiga.
// 2. Execute **todas** as microtarefas.
// 3. Renderize se houver alterações.
// 4. Se a fila de macrotarefas estiver vazia, aguarde.
// 5. Volte ao passo 1.

// ### Para agendar:

// **Macrotarefa**:

// ```js
// setTimeout(f);
// ```

// **Microtarefa**:

// ```js
// queueMicrotask(f);
// // ou via .then
// Promise.resolve().then(f);
// ```

// ---

// ## Web Workers

// Para cálculos realmente pesados, use **Web Workers**.

// * Executam em outra thread
// * Não travam o loop de eventos
// * Não têm acesso ao DOM
// * Trocam mensagens com o código principal

// Ideais para tarefas como compressão de dados, manipulação de arquivos, etc.
