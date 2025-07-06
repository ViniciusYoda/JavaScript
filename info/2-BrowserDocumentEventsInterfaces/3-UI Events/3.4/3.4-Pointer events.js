// Aqui está a **tradução completa e adaptada para o português** do artigo sobre **Pointer Events (Eventos de Ponteiro)**, explicada de forma clara e prática:

// ---

// ## 🖱️ Pointer Events – Manipulando diferentes tipos de entrada

// Os *Pointer Events* (Eventos de Ponteiro) são uma forma moderna de lidar com entradas de diversos dispositivos apontadores, como:

// * Mouse
// * Caneta (stylus)
// * Tela sensível ao toque (touchscreen)
// * ...e outros

// ---

// ## 🕰️ Um breve histórico

// Vamos revisar rapidamente a evolução, para entender onde os *Pointer Events* se encaixam:

// 1. **Antigamente**, só existiam eventos de mouse (`mousedown`, `mouseup`, etc).
// 2. Com a chegada dos **dispositivos touch**, como celulares e tablets:

//    * Os navegadores passaram a gerar eventos de mouse para manter compatibilidade (por exemplo, um toque gerava `mousedown`).
// 3. No entanto, **eventos de mouse não suportam multitoque**, gestos, pressão etc.
// 4. Foram criados os **eventos touch** (`touchstart`, `touchmove`, `touchend`) com mais recursos.
// 5. Ainda assim, surgiu a necessidade de **unificar** os eventos de entrada — mouse, toque e caneta — num só sistema.

// 💡 Foi aí que nasceu o **padrão Pointer Events**, que resolve todas essas limitações.

// ---

// ## 🌐 Suporte

// * A especificação **Pointer Events Level 2** já é compatível com todos os navegadores modernos.
// * O **Level 3** está sendo desenvolvido e é compatível com o Level 2.
// * A menos que você precise dar suporte ao **Internet Explorer 10** ou **Safari 12 ou anterior**, não há mais necessidade de usar `mouse` ou `touch` — use `pointer`.

// ---

// ## 🎯 Tipos de eventos Pointer

// Os nomes são similares aos eventos de mouse:

// | Evento Pointer       | Equivalente Mouse   |
// | -------------------- | ------------------- |
// | `pointerdown`        | `mousedown`         |
// | `pointerup`          | `mouseup`           |
// | `pointermove`        | `mousemove`         |
// | `pointerover`        | `mouseover`         |
// | `pointerout`         | `mouseout`          |
// | `pointerenter`       | `mouseenter`        |
// | `pointerleave`       | `mouseleave`        |
// | `pointercancel`      | *(sem equivalente)* |
// | `gotpointercapture`  | *(sem equivalente)* |
// | `lostpointercapture` | *(sem equivalente)* |

// ---

// ## 🔁 Substituindo eventos de mouse

// Você pode **substituir eventos `mouse` por `pointer`** no seu código e tudo continuará funcionando — **e ainda ganhará suporte a toque e caneta**.

// Exemplo:

// ```js
// element.onpointerdown = function(event) {
//   // funciona com mouse, touch e caneta
// };
// ```

// ⚠️ Pode ser necessário adicionar `touch-action: none;` no CSS para evitar comportamentos nativos indesejados (explicado mais adiante).

// ---

// ## 🧬 Propriedades dos eventos Pointer

// Assim como eventos de mouse, eles têm `clientX`, `clientY`, `target`, etc. Mas também incluem:

// * `pointerId`: identificador único de cada ponteiro (ideal para multitouch).
// * `pointerType`: tipo de dispositivo, valores possíveis:

//   * `"mouse"`
//   * `"touch"`
//   * `"pen"`
// * `isPrimary`: `true` para o ponteiro principal (ex: o primeiro dedo no multitouch).

// Outras propriedades avançadas:

// * `width` e `height`: área de contato (ex: dedo).
// * `pressure`: pressão do toque (de 0 a 1).
// * `tiltX`, `tiltY`, `twist`: ângulos e rotação (para canetas).
// * `tangentialPressure`: pressão tangencial (raro).

// Essas propriedades funcionam em dispositivos que suportam esses recursos (canetas, touch com pressão, etc).

// ---

// ## 👆 Suporte a multitoque

// Eventos de mouse **não** oferecem suporte a múltiplos toques ao mesmo tempo. Mas os *Pointer Events* sim!

// Quando você toca com **vários dedos**, o navegador gera:

// * Um `pointerdown` para cada dedo com um `pointerId` diferente.
// * O primeiro dedo recebe `isPrimary = true`.
// * Eventos subsequentes (`pointermove`, `pointerup`) vêm com o mesmo `pointerId`.

// 👉 Com isso, você pode controlar vários dedos/ponteiros simultaneamente com base no `pointerId`.

// ---

// ## ❌ Evento: `pointercancel`

// O evento `pointercancel` ocorre quando uma interação com ponteiro é **interrompida à força**, por exemplo:

// * Dispositivo foi desconectado ou desativado.
// * A orientação do aparelho foi alterada (girar o tablet).
// * O navegador assumiu o controle (ex: gesto nativo, zoom, arrastar imagem).

// Exemplo:

// 1. Usuário pressiona e arrasta uma imagem.
// 2. Começam a ser disparados eventos `pointermove`.
// 3. O navegador assume o controle (por exemplo, inicia o drag nativo da imagem).
// 4. Isso dispara `pointercancel`.
// 5. Seu código não recebe mais nenhum evento.

// ---

// ### ✅ Como evitar o `pointercancel`

// 1. Desative o *drag nativo*:

// ```js
// img.ondragstart = () => false;
// ```

// 2. Adicione no CSS:

// ```css
// #elemento {
//   touch-action: none;
// }
// ```

// Assim, o navegador **não irá interferir** e seu código poderá controlar tudo, mesmo em dispositivos touch.

// ---

// ## 🎯 Pointer Capturing

// **Pointer Capturing** é um recurso especial que redireciona todos os eventos de um `pointerId` para um único elemento, mesmo que o ponteiro saia dele.

// ### Uso:

// ```js
// element.setPointerCapture(event.pointerId);
// ```

// Depois disso, todos os eventos como `pointermove`, `pointerup` **serão direcionados para `element`**, mesmo se o usuário mover o dedo para fora.

// A captura é encerrada automaticamente quando:

// * O `pointerup` ou `pointercancel` acontece,
// * O elemento é removido do DOM,
// * Ou manualmente com `releasePointerCapture(pointerId)`.

// ---

// ### 🛠️ Exemplo prático: Slider

// HTML:

// ```html
// <div class="slider">
//   <div class="thumb"></div>
// </div>
// ```

// JS:

// ```js
// thumb.onpointerdown = function(event) {
//   thumb.setPointerCapture(event.pointerId);

//   thumb.onpointermove = function(event) {
//     let novoX = event.clientX - slider.getBoundingClientRect().left;
//     thumb.style.left = novoX + 'px';
//   };

//   thumb.onpointerup = function(event) {
//     thumb.onpointermove = null;
//     thumb.onpointerup = null;
//   };
// };
// ```

// ### ✅ Vantagens:

// * Não precisamos mais adicionar `document.onmousemove`.
// * Eventos de outros elementos não são acionados acidentalmente durante o arrasto.
// * Código mais limpo e seguro.

// ---

// ## 📌 Eventos relacionados ao Pointer Capture

// * `gotpointercapture`: disparado quando a captura começa (`setPointerCapture`).
// * `lostpointercapture`: disparado quando a captura termina (automática ou manual).

// ---

// ## ✅ Resumo Final

// Os *Pointer Events* permitem controlar **mouse, toque e caneta** com **um único conjunto de eventos**.

// ### Vantagens:

// * Substituem com facilidade os eventos de mouse.
// * Suporte a **multitoque** com `pointerId` e `isPrimary`.
// * Acesso a propriedades avançadas (pressão, ângulo, área de toque).
// * Evitam interferência do navegador com `touch-action: none`.
// * Captura de ponteiro com `setPointerCapture`.

// ---

// ### 🚀 Use Pointer Events sempre que possível!

// Eles já são suportados por todos os navegadores modernos e simplificam bastante o desenvolvimento de interfaces complexas e interativas.

// Se quiser, posso montar um exemplo real com drag'n'drop e pointer events funcionando — quer?
