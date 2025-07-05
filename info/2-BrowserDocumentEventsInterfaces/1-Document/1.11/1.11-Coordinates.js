// Aqui está a **tradução completa e explicada** do conteúdo sobre **Coordenadas em JavaScript** para manipular e posicionar elementos com precisão:

// ---

// ## 📍 Coordenadas

// Para mover elementos, precisamos entender **sistemas de coordenadas**.

// ### Existem dois sistemas principais:

// 1. **Coordenadas relativas à janela** (viewport) → como `position: fixed`
//    Chamadas de `clientX`, `clientY`.

// 2. **Coordenadas relativas ao documento** (página inteira) → como `position: absolute` no `body`
//    Chamadas de `pageX`, `pageY`.

// ---

// ### ✨ Quando a página **não está rolada**, `clientY === pageY`.

// Mas ao rolar a página:

// * `pageY` continua igual (é relativo ao documento inteiro).
// * `clientY` muda (é relativo ao topo da janela visível).

// ---

// ## 📐 Coordenadas do elemento: `getBoundingClientRect()`

// O método:

// ```js
// elem.getBoundingClientRect()
// ```

// Retorna um objeto `DOMRect` com as **coordenadas e dimensões do elemento relativas à janela**.

// ### Propriedades principais:

// * `x` e `y`: posição X/Y da borda superior esquerda do elemento.
// * `width` e `height`: largura e altura do elemento.
// * `top`, `left`, `right`, `bottom`: bordas específicas (iguais a `x/y + width/height`).

// #### Exemplo:

// ```js
// let coords = elem.getBoundingClientRect();
// console.log(coords.top, coords.left);
// ```

// 💡 As coordenadas **podem ser decimais** (ex: `10.5`) e **podem ser negativas** se o elemento estiver acima ou à esquerda da janela visível.

// ---

// ### ❓ Por que `top` e `left` existem se já temos `x` e `y`?

// Tecnicamente são equivalentes, mas `top/left/right/bottom` são **derivações convenientes** para manipular posicionamento com mais clareza.

// ---

// ### ⚠️ Internet Explorer não suporta `x` e `y`

// Nesse caso, use `top` e `left`, que funcionam igual quando `width` e `height` são positivos.

// ---

// ## 🧠 Atenção: `right` e `bottom` ≠ CSS

// Em CSS, `right: 0` significa "encostado na borda direita".
// Mas em JavaScript, `right` é a **distância do canto esquerdo da janela até a borda direita do elemento**.

// ---

// ## 🧪 Obter o elemento em coordenadas específicas: `elementFromPoint(x, y)`

// Esse método retorna o **elemento mais profundo** (mais interno) no ponto `(x, y)` da **janela**:

// ```js
// let elem = document.elementFromPoint(x, y);
// ```

// #### Exemplo: pegar o elemento no centro da tela

// ```js
// let centerX = document.documentElement.clientWidth / 2;
// let centerY = document.documentElement.clientHeight / 2;

// let elem = document.elementFromPoint(centerX, centerY);
// alert(elem.tagName);
// ```

// ⚠️ Se o ponto estiver **fora da janela visível**, retorna `null`.

// ---

// ## 🧱 Usando coordenadas para posicionar elementos

// ### Exemplo: mostrar uma mensagem abaixo de um botão

// ```js
// function createMessageUnder(elem, html) {
//   let message = document.createElement('div');
//   message.style.cssText = "position:fixed; color:red;";

//   let coords = elem.getBoundingClientRect();
//   message.style.left = coords.left + "px";
//   message.style.top = coords.bottom + "px";

//   message.innerHTML = html;
//   return message;
// }
// ```

// #### Inserindo:

// ```js
// let msg = createMessageUnder(document.querySelector('#meuBotao'), 'Olá!');
// document.body.append(msg);
// setTimeout(() => msg.remove(), 5000);
// ```

// 🔁 Porém, com `position:fixed`, se você **rolar a página**, a mensagem **não se move com o botão**!

// ---

// ## 📄 Coordenadas relativas ao documento

// Para resolver isso, usamos coordenadas relativas ao documento (como `position:absolute`):

// ```js
// function getCoords(elem) {
//   let box = elem.getBoundingClientRect();

//   return {
//     top: box.top + window.pageYOffset,
//     right: box.right + window.pageXOffset,
//     bottom: box.bottom + window.pageYOffset,
//     left: box.left + window.pageXOffset
//   };
// }
// ```

// ### Versão corrigida da função:

// ```js
// function createMessageUnder(elem, html) {
//   let message = document.createElement('div');
//   message.style.cssText = "position:absolute; color:red;";

//   let coords = getCoords(elem);
//   message.style.left = coords.left + "px";
//   message.style.top = coords.bottom + "px";

//   message.innerHTML = html;
//   return message;
// }
// ```

// ✅ Agora a mensagem **fica ancorada ao botão**, mesmo ao rolar a página.

// ---

// ## ✅ Resumo

// | Tipo de coordenada        | Como obter                         | Uso comum                     |
// | ------------------------- | ---------------------------------- | ----------------------------- |
// | **Relativa à janela**     | `elem.getBoundingClientRect()`     | Com `position: fixed`         |
// | **Relativa ao documento** | `getBoundingClientRect() + scroll` | Com `position: absolute`      |
// | **Coordenadas do cursor** | `event.clientX / pageX`            | Eventos de clique/mousemove   |
// | **Elemento no ponto X/Y** | `document.elementFromPoint(x, y)`  | Hover, menus flutuantes, etc. |

// ---

// Se quiser, posso criar uma **tabela visual com exemplos interativos** ou um **resumo PDF/HTML** com tudo isso organizado. Deseja?
