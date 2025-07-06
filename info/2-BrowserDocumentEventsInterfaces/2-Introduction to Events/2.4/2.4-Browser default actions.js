// Claro! Aqui está **toda a explicação traduzida e adaptada para o português**, mantendo a fidelidade ao conteúdo original, mas com clareza e fluidez para um leitor brasileiro:

// ---

// ## ✅ Ações padrão do navegador

// Muitos eventos disparam **ações automáticas do navegador**.

// Por exemplo:

// * Um clique em um link `<a>` inicia a navegação para a URL.
// * Um clique em um botão de envio `<button type="submit">` envia o formulário.
// * Pressionar o botão do mouse e arrastar sobre um texto seleciona o texto.

// Mas nem sempre queremos esse comportamento. Se tratarmos um evento com JavaScript, talvez queiramos **impedir a ação padrão do navegador** e executar um comportamento personalizado.

// ---

// ## 🔒 Impedindo ações padrão

// Existem **duas formas principais** de evitar que o navegador execute a ação padrão:

// 1. **Usando o objeto do evento:**
//    Chame o método `event.preventDefault()`.

// 2. **Retornando `false`:**
//    Funciona somente quando o manipulador de evento é definido diretamente com `on<evento>` no HTML ou DOM.

// ### Exemplo:

// ```html
// <a href="/" onclick="return false">Clique aqui</a>
// <!-- ou -->
// <a href="/" onclick="event.preventDefault()">Clique aqui</a>
// ```

// Neste caso, ao clicar no link, **nada acontece**, porque impedimos a navegação.

// ---

// ### ⚠️ `return false` é uma exceção

// Normalmente, o valor retornado por um manipulador de eventos **é ignorado**.

// A **única exceção** é quando o manipulador foi definido com `on<evento>`. Nesse caso, retornar `false` funciona como `event.preventDefault()` + `event.stopPropagation()`.

// ---

// ## 📌 Exemplo: menu com links

// ```html
// <ul id="menu" class="menu">
//   <li><a href="/html">HTML</a></li>
//   <li><a href="/javascript">JavaScript</a></li>
//   <li><a href="/css">CSS</a></li>
// </ul>
// ```

// Como usamos `<a>` (links), precisamos evitar que o navegador navegue. Exemplo:

// ```javascript
// menu.onclick = function(evento) {
//   if (evento.target.nodeName !== 'A') return;

//   const href = evento.target.getAttribute('href');
//   alert(`Navegar para: ${href}`);

//   return false; // impede a navegação
// };
// ```

// Se omitirmos `return false`, o navegador vai seguir o link normalmente **após** o nosso `alert()`.

// ---

// ## 🔄 Eventos encadeados

// Alguns eventos levam naturalmente a outros. Se o **primeiro evento for bloqueado**, os seguintes não acontecem.

// ### Exemplo:

// ```html
// <input value="Foco funciona" onfocus="this.value=''">
// <input onmousedown="return false" onfocus="this.value=''" value="Clique aqui">
// ```

// No segundo `<input>`, o clique **não ativa o foco**, porque o `mousedown` foi impedido.

// O foco ainda pode acontecer por outros meios (ex: pressionar `Tab`), mas **não por clique**.

// ---

// ## 🚀 O parâmetro `passive: true`

// Ao usar `addEventListener`, você pode passar a opção `passive: true`. Isso **informa ao navegador** que seu código **não usará `preventDefault()`**.

// Isso melhora o desempenho em eventos como `touchmove`, pois o navegador não precisa esperar todos os handlers antes de rolar a tela.

// ```javascript
// element.addEventListener('touchmove', handler, { passive: true });
// ```

// * O navegador rola imediatamente.
// * O handler ainda é executado.

// ---

// ## ✅ `event.defaultPrevented`

// Essa propriedade retorna `true` se `preventDefault()` foi chamado, ou `false` caso contrário.

// ### Exemplo prático: menus de contexto

// ```html
// <button id="btn">Clique com o botão direito</button>

// <script>
//   btn.oncontextmenu = function(evento) {
//     evento.preventDefault();
//     alert("Menu do botão");
//   };

//   document.oncontextmenu = function(evento) {
//     evento.preventDefault();
//     alert("Menu do documento");
//   };
// </script>
// ```

// O problema: clicar com o botão direito no botão mostra **dois alerts**.

// ### Solução ruim:

// ```javascript
// btn.oncontextmenu = function(evento) {
//   evento.preventDefault();
//   evento.stopPropagation(); // impede o bubbling
//   alert("Menu do botão");
// };
// ```

// Mas isso **impede outros códigos** de reagirem a esse evento (ex: sistemas de análise ou plugins).

// ---

// ### ✅ Solução ideal: checar `event.defaultPrevented`

// ```javascript
// btn.oncontextmenu = function(evento) {
//   evento.preventDefault();
//   alert("Menu do botão");
// };

// document.oncontextmenu = function(evento) {
//   if (evento.defaultPrevented) return;

//   evento.preventDefault();
//   alert("Menu do documento");
// };
// ```

// Assim, o navegador só mostra o menu **mais próximo**, e o código externo continua funcionando corretamente.

// ---

// ## ⚠️ `event.preventDefault()` vs `event.stopPropagation()`

// São coisas **totalmente diferentes**:

// * `preventDefault()` impede a ação padrão do navegador.
// * `stopPropagation()` impede que o evento suba (bubbling) para elementos pais.

// ---

// ## 💡 Menu de contexto com arquitetura global

// Outra abordagem seria criar um **objeto global** para gerenciar os menus de contexto:

// ```javascript
// const MenuGerenciador = {
//   handlers: [],

//   adicionar(handler) {
//     this.handlers.push(handler);
//   },

//   executar(evento) {
//     for (const h of this.handlers) {
//       if (h.condicao(evento)) {
//         evento.preventDefault();
//         h.executar(evento);
//         break;
//       }
//     }
//   }
// };

// document.oncontextmenu = (evento) => MenuGerenciador.executar(evento);
// ```

// Cada componente pode se registrar nesse sistema. Evita conflitos e centraliza o controle dos menus.

// ---

// ## 🧾 Resumo

// * Existem **várias ações padrão do navegador** (como clique, envio de formulário, foco, contexto…).
// * Você pode **impedi-las** usando `event.preventDefault()` ou `return false` (este último apenas com `on<evento>`).
// * Use `passive: true` quando quiser garantir desempenho em eventos de rolagem, como `touchmove`.
// * Para saber se a ação foi impedida por outro handler, use `event.defaultPrevented`.
// * Evite usar `stopPropagation()` sem necessidade — ele pode quebrar outros comportamentos importantes.
// * Sempre que possível, **mantenha a semântica do HTML**. Use `<a>` para navegação e `<button>` para ações. Isso melhora a acessibilidade e compatibilidade com o navegador.

// ---

// Se quiser, posso montar um exemplo prático com todos esses conceitos juntos (menu, preventDefault, delegation etc). Deseja isso?
