// Aqui está a **adaptação completa para o português** sobre o **MutationObserver**:

// ---

// ## 👁️‍🗨️ MutationObserver

// `MutationObserver` é um objeto nativo do JavaScript que permite **observar mudanças em elementos do DOM** e executar um **callback** sempre que uma alteração é detectada.

// ---

// ## 📌 Sintaxe

// Usar `MutationObserver` é simples:

// ### 1. Criamos o observador com uma função de callback:

// ```js
// let observer = new MutationObserver(callback);
// ```

// ### 2. Associamos esse observador a um nó do DOM:

// ```js
// observer.observe(elemento, config);
// ```

// ### 🔧 Configuração (`config`)

// É um objeto com opções booleanas que definem **o que será observado**:

// * `childList`: mudanças nos **filhos diretos** do elemento.
// * `subtree`: mudanças em **todos os descendentes** (filhos, netos etc).
// * `attributes`: alterações nos **atributos** do elemento.
// * `attributeFilter`: um array com **nomes de atributos específicos** para observar.
// * `characterData`: observa mudanças no **conteúdo textual** do nó (`node.data`).

// Outras opções úteis:

// * `attributeOldValue`: se `true`, envia o **valor antigo** do atributo (requer `attributes`).
// * `characterDataOldValue`: se `true`, envia o **valor antigo** do texto (requer `characterData`).

// ---

// ## 🔍 Callback e registros de mutação

// Quando algo muda, a função de callback é chamada com:

// * Uma **lista de objetos `MutationRecord`** (primeiro argumento).
// * O próprio observador (segundo argumento).

// Cada `MutationRecord` contém informações como:

// | Propriedade                       | Descrição                                                      |
// | --------------------------------- | -------------------------------------------------------------- |
// | `type`                            | Tipo da mutação (`attributes`, `childList` ou `characterData`) |
// | `target`                          | Elemento ou nó onde ocorreu a mudança                          |
// | `addedNodes` / `removedNodes`     | Nós adicionados ou removidos                                   |
// | `previousSibling` / `nextSibling` | Irmãos anterior/próximo ao nó afetado                          |
// | `attributeName`                   | Nome do atributo alterado                                      |
// | `oldValue`                        | Valor anterior (se configurado)                                |

// ---

// ## 💡 Exemplo básico

// ```html
// <div contentEditable id="elem">Clique e <b>edite</b>, por favor</div>
// ```

// ```js
// let observer = new MutationObserver(mutations => {
//   console.log(mutations); // imprime alterações
// });

// observer.observe(elem, {
//   childList: true,
//   subtree: true,
//   characterDataOldValue: true
// });
// ```

// Se você editar o conteúdo dentro da `<div>`, o console exibirá as mudanças, como:

// ```js
// [{
//   type: "characterData",
//   oldValue: "edite",
//   target: <nó de texto>
// }]
// ```

// Se você apagar a tag `<b>edite</b>`, pode haver vários registros:

// ```js
// [{
//   type: "childList",
//   removedNodes: [<b>]
// }, {
//   type: "characterData"
// }]
// ```

// ---

// ## ⚙️ Uso para Integrações

// Imagine que você adiciona um script de terceiros que insere um anúncio como:

// ```html
// <div class="ads">Anúncio indesejado</div>
// ```

// O script não oferece opção para remover o anúncio.

// Usando `MutationObserver`, você pode detectar quando esse `<div>` é adicionado ao DOM e removê-lo automaticamente.

// Outro caso comum é adaptar seu layout dinamicamente quando um script de terceiros insere elementos.

// ---

// ## 🧱 Uso na Arquitetura

// Vamos supor que seu site exiba **códigos fonte**, como:

// ```html
// <pre class="language-javascript"><code>let hello = "world";</code></pre>
// ```

// Para realçar a sintaxe, usamos bibliotecas como `Prism.js`. Com isso, aplicamos o destaque com:

// ```js
// document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElement);
// ```

// Mas se o conteúdo for **carregado dinamicamente** via AJAX, como:

// ```js
// articleElem.innerHTML = artigoHtml;
// ```

// Você terá que chamar `Prism.highlightElement()` após **cada carregamento**. Isso se torna repetitivo e pouco escalável.

// A solução: **usar `MutationObserver` para detectar quando novos trechos de código são inseridos no DOM** e aplicar o destaque automaticamente.

// ---

// ## 🧪 Exemplo de destaque dinâmico

// ```js
// let observer = new MutationObserver(mutations => {
//   for(let mutation of mutations) {
//     for(let node of mutation.addedNodes) {
//       if (!(node instanceof HTMLElement)) continue;

//       if (node.matches('pre[class*="language-"]')) {
//         Prism.highlightElement(node);
//       }

//       for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
//         Prism.highlightElement(elem);
//       }
//     }
//   }
// });

// let demoElem = document.getElementById('highlight-demo');

// observer.observe(demoElem, {childList: true, subtree: true});
// ```

// E depois:

// ```js
// demoElem.innerHTML = `
//   Trecho de código abaixo:
//   <pre class="language-javascript"><code>let hello = "world!";</code></pre>
//   <div>Outro exemplo:</div>
//   <pre class="language-css"><code>.classe { margin: 5px; }</code></pre>
// `;
// ```

// O código acima observa a `div#highlight-demo` e aplica automaticamente o destaque em qualquer `<pre>` inserido dinamicamente.

// ---

// ## 🧯 Métodos adicionais

// * `observer.disconnect()` → para parar a observação.
// * `observer.takeRecords()` → retorna uma lista de mutações **não processadas** ainda.

// Exemplo:

// ```js
// let pendentes = observer.takeRecords();
// observer.disconnect();
// ```

// > As mutações retornadas por `takeRecords()` **não serão mais passadas ao callback**.

// ---

// ## 🗑️ Coleta de Lixo (Garbage Collection)

// O `MutationObserver` **usa referências fracas** aos nós observados.
// Se um nó for removido do DOM e **não houver mais referências a ele**, ele será coletado normalmente.

// ---

// ## ✅ Resumo

// * `MutationObserver` observa **mudanças no DOM**: adição/remoção de nós, atributos, textos, etc.
// * Útil para:

//   * Detectar alterações feitas por scripts externos
//   * Automatizar tarefas, como aplicar realce de código
//   * Criar reações dinâmicas a mudanças na interface
// * Permite manter **a lógica centralizada**, sem repetir código por toda a aplicação.

// ---

// Se quiser, posso montar uma versão prática com botão "Carregar conteúdo" para ver o `MutationObserver` funcionando em tempo real. Deseja?
