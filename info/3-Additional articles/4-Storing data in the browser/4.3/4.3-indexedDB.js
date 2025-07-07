// # IndexedDB (em Português)

// ## O que é IndexedDB?

// IndexedDB é um banco de dados incorporado ao navegador, muito mais poderoso que o `localStorage`.

// * Armazena quase qualquer tipo de valor por chaves (inclusive vários tipos de chave).
// * Suporta transações para garantir confiabilidade.
// * Suporta consultas por intervalo de chaves e índices.
// * Pode armazenar volumes muito maiores de dados que o `localStorage`.

// Ideal para **aplicações offline**, geralmente combinadas com `ServiceWorkers`.

// ## Interface Nativa

// A interface nativa do IndexedDB é baseada em **eventos** ([https://www.w3.org/TR/IndexedDB](https://www.w3.org/TR/IndexedDB)).

// Para tornar mais fácil, pode-se usar wrappers com `Promises` como: [https://github.com/jakearchibald/idb](https://github.com/jakearchibald/idb) (não cobre todos os casos, mas é muito conveniente).

// ## Onde os dados são armazenados?

// Geralmente no diretório do usuário, junto com configurações do navegador.
// Cada navegador e usuário têm seu próprio armazenamento isolado.

// ## Abrir um banco de dados

// ```js
// let openRequest = indexedDB.open(nome, versao);
// ```

// * `nome`: nome da base.
// * `versao`: inteiro positivo, por padrão 1.

// ### Eventos:

// * `onsuccess`: banco está pronto, usar `openRequest.result`.
// * `onerror`: erro na abertura.
// * `onupgradeneeded`: chamado se é a primeira vez ou a versão local é menor.

// ```js
// let openRequest = indexedDB.open("loja", 1);

// openRequest.onupgradeneeded = function() {
//   // inicialização do banco
// };

// openRequest.onerror = function() {
//   console.error("Erro", openRequest.error);
// };

// openRequest.onsuccess = function() {
//   let db = openRequest.result;
//   // banco está pronto
// };
// ```

// ## Atualização de versão

// Se a versão local for menor, `onupgradeneeded` é chamado. Ali fazemos:

// * Migração de dados.
// * Criação de novas stores, índices, etc.

// ## Excluir banco de dados

// ```js
// let deleteRequest = indexedDB.deleteDatabase(nome);
// ```

// ## Problemas com versões em abas diferentes

// Se uma aba está usando a versão antiga e outra tenta atualizar:

// * Evento `versionchange` é disparado na antiga: precisamos fechar a conexão.
// * Se não fecharmos, a nova conexão ficará bloqueada (`onblocked`).

// ```js
// openRequest.onsuccess = function() {
//   let db = openRequest.result;

//   db.onversionchange = function() {
//     db.close();
//     alert("Banco desatualizado, recarregue a página.");
//   };
// };
// ```

// ## Object Store

// O "store" é como uma tabela. Podemos ter vários por banco.

// ```js
// db.createObjectStore("livros", { keyPath: "id" });
// ```

// * `keyPath`: campo usado como chave.
// * `autoIncrement`: true, se desejar gerar chaves automaticamente.

// **Somente pode ser criado/removido dentro de `onupgradeneeded`.**

// ### Checando stores existentes:

// ```js
// if (!db.objectStoreNames.contains("livros")) {
//   db.createObjectStore("livros", { keyPath: "id" });
// }
// ```

// ## Transações

// Tudo no IndexedDB é feito dentro de uma **transação**:

// ```js
// let tx = db.transaction("livros", "readwrite");
// let store = tx.objectStore("livros");

// let request = store.add({ id: "js", preco: 10 });

// request.onsuccess = () => console.log("Livro adicionado");
// request.onerror = () => console.error(request.error);
// ```

// * `add`: insere, mas falha se a chave já existir.
// * `put`: insere ou substitui.

// ### Finalização

// As transações são **autocommitadas**. Ao final do código/microtasks, se não houver mais operações, ela é automaticamente finalizada.

// ```js
// tx.oncomplete = () => console.log("Transação concluída");
// tx.onerror = () => console.log("Erro", tx.error);
// ```

// Evite usar `fetch`, `setTimeout` no meio da transação (causa commit prematuro).

// ## Tratamento de Erros

// Erros abortam a transação por padrão, mas podemos evitar:

// ```js
// request.onerror = function(event) {
//   if (request.error.name == "ConstraintError") {
//     event.preventDefault();
//     event.stopPropagation();
//   }
// };
// ```

// ## Busca por chaves

// ```js
// store.get("js")
// store.getAll(IDBKeyRange.bound("a", "z"))
// store.getAllKeys(IDBKeyRange.lowerBound("html", true))
// ```

// ## Indexes (para buscar por outros campos)

// ```js
// let livros = db.createObjectStore("livros", { keyPath: "id" });
// livros.createIndex("preco_idx", "preco");
// ```

// Depois:

// ```js
// let index = store.index("preco_idx");
// index.getAll(10); // livros com preco = 10
// ```

// ## Deleção

// ```js
// store.delete("js");
// store.clear();
// ```

// ## Cursores

// Permitem ler um grande volume de dados, um por vez:

// ```js
// let request = store.openCursor();
// request.onsuccess = function() {
//   let cursor = request.result;
//   if (cursor) {
//     console.log(cursor.key, cursor.value);
//     cursor.continue();
//   }
// };
// ```

// ## Usando o Wrapper `idb`

// ```js
// let db = await idb.openDB("loja", 1, {
//   upgrade(db) {
//     db.createObjectStore("livros", { keyPath: "id" });
//   }
// });

// let tx = db.transaction("livros", "readwrite");
// await tx.store.add({ id: "js", preco: 10 });
// await tx.done;
// ```

// ### Tratamento de erros com promessas

// ```js
// window.addEventListener("unhandledrejection", event => {
//   alert("Erro: " + event.reason.message);
// });
// ```

// ## Resumo

// * IndexedDB é ideal para aplicações offline e grandes volumes.
// * Use `onupgradeneeded` para criar stores e índices.
// * Todas operações precisam estar em uma transação.
// * Use `idb` para facilitar com `async/await`.
// * Use cursores para dados grandes.

// ### Exemplo completo

// ```html
// <script src="https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js"></script>
// <button onclick="adicionarLivro()">Adicionar livro</button>
// <button onclick="limparLivros()">Limpar</button>
// <ul id="lista"></ul>
// <script>
// let db;
// init();

// async function init() {
//   db = await idb.openDb('livrosDb', 1, db => {
//     db.createObjectStore('livros', { keyPath: 'nome' });
//   });
//   listar();
// }

// async function listar() {
//   let tx = db.transaction('livros');
//   let store = tx.objectStore('livros');
//   let livros = await store.getAll();
//   lista.innerHTML = livros.length ? livros.map(l => `<li>${l.nome}: R$${l.preco}</li>`).join('') : '<li>Nenhum livro</li>';
// }

// async function limparLivros() {
//   await db.transaction('livros', 'readwrite').objectStore('livros').clear();
//   listar();
// }

// async function adicionarLivro() {
//   let nome = prompt("Nome do livro?");
//   let preco = +prompt("Preço?");
//   let tx = db.transaction('livros', 'readwrite');
//   try {
//     await tx.objectStore('livros').add({ nome, preco });
//     await listar();
//   } catch (err) {
//     if (err.name == 'ConstraintError') {
//       alert("Livro já existe");
//     } else {
//       throw err;
//     }
//   }
// }
// </script>
// ```
