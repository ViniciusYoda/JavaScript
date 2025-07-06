// Claro! Aqui está a **adaptação completa em português** do conteúdo sobre **rolagem (scrolling)**:

// ---

// ## 📜 Rolagem (`scroll`)

// O evento `scroll` permite **reagir quando a página ou um elemento é rolado**. Existem várias aplicações interessantes para isso.

// Por exemplo:

// * Mostrar ou ocultar controles ou informações adicionais, dependendo de onde o usuário está na página.
// * Carregar mais conteúdo automaticamente quando o usuário chegar ao final da página (infinite scroll).

// ---

// ### 🔍 Exemplo simples: mostrar a posição da rolagem

// ```js
// window.addEventListener('scroll', function() {
//   document.getElementById('mostrarScroll').innerHTML = window.pageYOffset + 'px';
// });
// ```

// Se o usuário rolar a página, o conteúdo de `#mostrarScroll` será atualizado com o valor atual da rolagem vertical.

// **Resultado esperado:**

// > Rolagem atual = 714px

// ---

// ## 📌 Onde o evento `scroll` funciona?

// * Na `window` (janela do navegador)
// * Em **elementos com rolagem**, como `div` com `overflow: auto` ou `scroll`

// ---

// ## ⛔ Como impedir a rolagem?

// ### ✅ **Não** é possível usar `event.preventDefault()` no evento `scroll`, porque ele é disparado **depois** que a rolagem já aconteceu.

// ### 🛑 Mas é possível **prevenir a rolagem** interceptando os eventos que a causam, como:

// * `keydown` para as teclas `PageUp`, `PageDown`, `Setas`
// * `wheel` para rolagem do mouse

// ```js
// window.addEventListener('keydown', function(e) {
//   if (e.key === "PageDown" || e.key === "PageUp") {
//     e.preventDefault(); // impede a rolagem
//   }
// });
// ```

// ---

// ## ✅ Solução mais confiável: CSS

// Para tornar um elemento ou a página **não rolável**, use CSS com a propriedade `overflow`:

// ```css
// body {
//   overflow: hidden; /* impede qualquer rolagem */
// }
// ```

// Ou, para um elemento específico:

// ```css
// .caixa-scroll {
//   overflow: hidden;
// }
// ```

// ---

// ## 📚 Exemplos e tarefas com `onscroll`

// O evento `scroll` é muito utilizado em:

// * **Menus fixos** que aparecem apenas após certa rolagem.
// * **Botões "voltar ao topo"** que surgem depois que o usuário rola a página.
// * **Animações** ativadas com base na posição da rolagem.
// * **Carregamento infinito** (como redes sociais ou listas longas).
// * **Barra de progresso de leitura**, que mostra o quanto da página já foi lida.

// Se quiser, posso te mostrar exemplos práticos de cada um desses usos. Deseja isso?
