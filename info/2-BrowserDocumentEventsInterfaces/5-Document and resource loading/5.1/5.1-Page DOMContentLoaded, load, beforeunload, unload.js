// Aqui está a tradução completa e adaptada para o **português** sobre os eventos de carregamento de página: `DOMContentLoaded`, `load`, `beforeunload` e `unload`.

// ---

// ## 🌐 Página: DOMContentLoaded, load, beforeunload, unload

// O ciclo de vida de uma página HTML possui **quatro eventos principais**:

// 1. **DOMContentLoaded** – quando o navegador carrega completamente o HTML e constrói a árvore DOM. Recursos externos como imagens e CSS ainda podem estar carregando.
// 2. **load** – quando **tudo** é carregado: HTML, imagens, estilos, etc.
// 3. **beforeunload** – quando o usuário está **prestes a sair** da página.
// 4. **unload** – quando o usuário **efetivamente sai** da página.

// ---

// ### 📌 Utilidade de cada evento:

// | Evento             | Quando ocorre         | Para que serve                                         |
// | ------------------ | --------------------- | ------------------------------------------------------ |
// | `DOMContentLoaded` | DOM está pronto       | Manipular elementos com JavaScript                     |
// | `load`             | Tudo foi carregado    | Saber quando imagens e estilos já foram aplicados      |
// | `beforeunload`     | Antes do usuário sair | Confirmar se ele quer sair (ex: alterações não salvas) |
// | `unload`           | O usuário está saindo | Executar ações rápidas, como enviar estatísticas       |

// ---

// ## 📥 DOMContentLoaded

// O evento `DOMContentLoaded` ocorre quando o DOM está **completamente carregado**, sem esperar por imagens ou estilos.

// **Como usar:**

// ```js
// document.addEventListener("DOMContentLoaded", () => {
//   alert("DOM pronto!");

//   // imagem ainda não carregou: tamanho será 0x0
//   alert(`Tamanho da imagem: ${img.offsetWidth}x${img.offsetHeight}`);
// });
// ```

// ```html
// <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
// ```

// ---

// ### 🧠 Detalhes importantes sobre `DOMContentLoaded`:

// * Scripts **bloqueiam** o evento `DOMContentLoaded` até serem executados:

// ```html
// <script>
//   document.addEventListener("DOMContentLoaded", () => alert("DOM pronto!"));
// </script>
// <script src="biblioteca.js"></script> <!-- esse script bloqueia o DOMContentLoaded -->
// ```

// * Scripts `async` ou adicionados dinamicamente **não bloqueiam** o DOMContentLoaded.

// * Estilos externos não bloqueiam o DOM, **mas podem atrasar scripts** que dependem deles:

// ```html
// <link rel="stylesheet" href="estilo.css">
// <script>
//   alert(getComputedStyle(document.body).marginTop);
// </script>
// ```

// * Preenchimento automático de formulários (autofill) por navegadores acontece **após** `DOMContentLoaded`.

// ---

// ## 🖼️ `window.onload`

// O evento `load` acontece **quando toda a página e seus recursos foram carregados**, incluindo imagens.

// **Exemplo:**

// ```js
// window.onload = () => {
//   alert("Página totalmente carregada");
//   alert(`Tamanho da imagem: ${img.offsetWidth}x${img.offsetHeight}`);
// };
// ```

// ```html
// <img id="img" src="https://en.js.cx/clipart/train.gif">
// ```

// ---

// ## 🔚 `window.onunload`

// O evento `unload` é disparado quando o usuário **deixa a página**.

// Recomenda-se **evitar operações demoradas** aqui. Mas podemos enviar dados via `navigator.sendBeacon`:

// ```js
// window.addEventListener("unload", () => {
//   navigator.sendBeacon("/estatisticas", JSON.stringify(dados));
// });
// ```

// * O envio ocorre **em segundo plano**.
// * Tamanho máximo: **64kb**.
// * **Sem retorno do servidor** (pois a página já foi fechada).

// ---

// ## ❗ `window.onbeforeunload`

// Usado quando você quer **alertar o usuário** antes dele sair da página, como em casos de formulários não salvos.

// ```js
// window.onbeforeunload = function() {
//   return "Você tem alterações não salvas. Deseja realmente sair?";
// };
// ```

// ### Observações:

// * Navegadores modernos **não exibem mais mensagens personalizadas**, apenas alertam que há alterações.
// * Usar `event.preventDefault()` aqui **não funciona**.
// * Em vez disso, use `event.returnValue = "..."`.

// ```js
// window.addEventListener("beforeunload", (event) => {
//   event.returnValue = "Você tem alterações não salvas.";
// });
// ```

// ---

// ## 📊 `document.readyState`

// Você pode verificar o estado de carregamento da página com:

// ```js
// console.log(document.readyState);
// ```

// Valores possíveis:

// * `"loading"` – a página ainda está carregando.
// * `"interactive"` – o DOM foi carregado.
// * `"complete"` – tudo foi carregado (DOM + recursos).

// ### Executar algo somente quando o DOM estiver pronto:

// ```js
// function iniciar() {
//   // código que depende do DOM
// }

// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", iniciar);
// } else {
//   iniciar();
// }
// ```

// ---

// ## 📝 Resumo final

// | Evento             | Quando acontece                                                     | Usos principais                                      |
// | ------------------ | ------------------------------------------------------------------- | ---------------------------------------------------- |
// | `DOMContentLoaded` | DOM totalmente carregado (sem imagens e CSS)                        | Interagir com elementos HTML                         |
// | `load`             | Tudo carregado (HTML, imagens, estilos, etc)                        | Trabalhar com imagens e tamanhos reais               |
// | `beforeunload`     | Quando o usuário tenta sair                                         | Mostrar aviso sobre alterações não salvas            |
// | `unload`           | O usuário sai da página                                             | Enviar estatísticas via `navigator.sendBeacon`       |
// | `readyState`       | Estado atual do carregamento (`loading`, `interactive`, `complete`) | Executar código baseado no progresso de carregamento |

// ---

// Se quiser, posso te mostrar um exemplo prático com todos esses eventos funcionando juntos. Deseja isso?
