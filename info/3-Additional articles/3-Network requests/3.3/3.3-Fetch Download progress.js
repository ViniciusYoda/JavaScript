// Claro! Aqui está a versão traduzida e adaptada para o português do conteúdo **Fetch: Acompanhamento de progresso de download**:

// ---

// # Fetch: Acompanhamento de Progresso de Download

// O método `fetch` permite **monitorar o progresso do download** de dados da rede.

// > ⚠️ **Importante**: atualmente, **não é possível** acompanhar o progresso de **upload** com `fetch`. Para isso, utilize `XMLHttpRequest` (veremos isso mais adiante).

// ---

// ## Acessando os dados aos poucos

// Para acompanhar o progresso do download, usamos a propriedade `response.body`.

// Ela é um **ReadableStream** – um objeto especial que fornece o corpo da resposta **em partes** (chunks), conforme os dados vão chegando. Streams são descritas na especificação da **Streams API**.

// Diferente de `response.text()` ou `response.json()`, que esperam os dados completos para processar, com `response.body` temos **controle total** sobre o processo de leitura, e podemos medir quanto já foi baixado a qualquer momento.

// ---

// ## Exemplo básico de leitura com progressão

// ```js
// const reader = response.body.getReader();

// while (true) {
//   const { done, value } = await reader.read();

//   if (done) break;

//   console.log(`Recebido ${value.length} bytes`);
// }
// ```

// * `reader.read()` retorna um objeto com:

//   * `done`: `true` quando a leitura terminou.
//   * `value`: um `Uint8Array` com os bytes recebidos.

// > Obs: existe uma forma mais moderna de fazer essa leitura com `for await...of`, mas ainda não é amplamente suportada em todos os navegadores. Por isso usamos `while`.

// ---

// ## Exemplo completo: Exibindo progresso de download

// ```js
// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

// const reader = response.body.getReader();
// const contentLength = +response.headers.get('Content-Length');

// let recebido = 0;
// let partes = [];

// while (true) {
//   const { done, value } = await reader.read();

//   if (done) break;

//   partes.push(value);
//   recebido += value.length;

//   console.log(`Recebido ${recebido} de ${contentLength}`);
// }

// let todosBytes = new Uint8Array(recebido);
// let posicao = 0;

// for (let parte of partes) {
//   todosBytes.set(parte, posicao);
//   posicao += parte.length;
// }

// let texto = new TextDecoder("utf-8").decode(todosBytes);
// let commits = JSON.parse(texto);

// alert(commits[0].author.login);
// ```

// ---

// ## Etapas explicadas

// 1. **Início**: fazemos o `fetch` normalmente, mas ao invés de `response.json()`, usamos `response.body.getReader()` para ler os dados em partes.
// 2. **Tamanho total**: tentamos obter o tamanho da resposta usando `Content-Length`. Pode estar ausente em alguns casos, como requisições entre domínios.
// 3. **Leitura**: usamos `reader.read()` em um laço `while` até que `done` seja `true`.
// 4. **Acúmulo de partes**: guardamos cada parte em um array `partes`.
// 5. **Juntando tudo**:

//    * Criamos `todosBytes` com o tamanho total.
//    * Usamos `.set()` para copiar cada parte na posição correta.
// 6. **Decodificando os bytes**: usamos `TextDecoder("utf-8")` para transformar o `Uint8Array` em string.
// 7. **Parsing JSON**: por fim, usamos `JSON.parse()` para interpretar os dados como JSON.

// ---

// ## E se eu quiser o conteúdo como Blob?

// Simples! Substitua os passos 4 e 5 por:

// ```js
// let blob = new Blob(partes);
// ```

// Assim você terá o conteúdo final como um arquivo binário (`Blob`), pronto para ser exibido, baixado ou enviado novamente.

// ---

// ## Observações finais

// * ✅ **Funciona para acompanhar o progresso de download.**
// * ❌ **Não funciona para uploads** (use `XMLHttpRequest` para isso).
// * Se não souber o tamanho total (`Content-Length`), monitore `recebido` e defina um limite para evitar consumo excessivo de memória.
// * Após o corpo da resposta ser lido com `getReader()`, **não é mais possível usar** `response.json()` ou `response.text()` – o conteúdo já foi consumido.

// ---

// Se quiser, posso adaptar esse exemplo para mostrar uma barra de progresso visual no navegador com HTML/CSS. Deseja?
