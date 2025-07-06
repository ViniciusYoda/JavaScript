// Aqui está **todo o conteúdo traduzido e adaptado para o português** sobre **arrastar e soltar (Drag’n’Drop)** com eventos do mouse — explicação clara, didática e pronta para aplicar:

// ---

// ## 🖱️ Arrastar e Soltar (Drag’n’Drop) com eventos do mouse

// Drag’n’Drop é uma excelente solução de interface. Arrastar algo e soltar em outro lugar é uma forma intuitiva e prática de realizar ações como:

// * Mover documentos,
// * Adicionar produtos ao carrinho,
// * Reorganizar itens na tela.

// O HTML moderno tem suporte nativo para *drag and drop*, com eventos como `dragstart`, `dragend`, entre outros.

// ---

// ### ❌ Limitações do Drag and Drop nativo:

// * Não é possível bloquear a área onde pode ser arrastado.
// * Não dá para restringir o movimento apenas na horizontal ou vertical.
// * Suporte fraco em dispositivos móveis.
// * Dificuldade em customizações mais complexas.

// ---

// ## ✅ Solução alternativa: usar eventos do mouse

// A forma manual (e mais flexível) de implementar Drag’n’Drop com eventos de mouse é:

// ### 🧠 Algoritmo básico:

// 1. **`mousedown`** → Preparar o elemento para ser arrastado (posicionamento, aparência).
// 2. **`mousemove`** → Mover o elemento com `position: absolute` alterando `left` e `top`.
// 3. **`mouseup`** → Finalizar o arrasto, limpar eventos, aplicar ações.

// ---

// ## 🎓 Exemplo: arrastando uma bola

// ```js
// ball.onmousedown = function(event) {
//   ball.style.position = 'absolute';
//   ball.style.zIndex = 1000;
//   document.body.append(ball);

//   function moveAt(pageX, pageY) {
//     ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
//     ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
//   }

//   moveAt(event.pageX, event.pageY);

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   document.addEventListener('mousemove', onMouseMove);

//   ball.onmouseup = function() {
//     document.removeEventListener('mousemove', onMouseMove);
//     ball.onmouseup = null;
//   };
// };
// ```

// ---

// ### ⚠️ Problema: o navegador tenta "clonar" o elemento arrastado

// O navegador pode tentar aplicar seu próprio comportamento nativo de drag’n’drop (especialmente em imagens), fazendo parecer que você está arrastando uma cópia.

// Para desativar isso:

// ```js
// ball.ondragstart = function() {
//   return false;
// };
// ```

// ---

// ## 🖼️ Posicionamento correto do elemento

// No exemplo anterior, a bola sempre ficava centralizada sob o ponteiro.

// Mas se você clicar nas bordas da bola, ela "salta" para o centro do ponteiro. Não é uma boa experiência.

// ### ✅ Solução: manter o deslocamento inicial

// Armazene a distância entre o ponteiro e o canto superior esquerdo da bola no momento do clique:

// ```js
// let shiftX = event.clientX - ball.getBoundingClientRect().left;
// let shiftY = event.clientY - ball.getBoundingClientRect().top;
// ```

// Use esse deslocamento ao mover a bola:

// ```js
// ball.style.left = event.pageX - shiftX + 'px';
// ball.style.top = event.pageY - shiftY + 'px';
// ```

// ---

// ### 🔁 Código completo com posicionamento refinado:

// ```js
// ball.onmousedown = function(event) {
//   let shiftX = event.clientX - ball.getBoundingClientRect().left;
//   let shiftY = event.clientY - ball.getBoundingClientRect().top;

//   ball.style.position = 'absolute';
//   ball.style.zIndex = 1000;
//   document.body.append(ball);

//   moveAt(event.pageX, event.pageY);

//   function moveAt(pageX, pageY) {
//     ball.style.left = pageX - shiftX + 'px';
//     ball.style.top = pageY - shiftY + 'px';
//   }

//   function onMouseMove(event) {
//     moveAt(event.pageX, event.pageY);
//   }

//   document.addEventListener('mousemove', onMouseMove);

//   ball.onmouseup = function() {
//     document.removeEventListener('mousemove', onMouseMove);
//     ball.onmouseup = null;
//   };
// };

// ball.ondragstart = () => false;
// ```

// ---

// ## 🎯 Alvos de soltar (droppables)

// Na prática, geralmente arrastamos um elemento e o soltamos **sobre outro** (ex: item → carrinho, arquivo → pasta).

// ### O que precisamos saber:

// 1. **Onde** o elemento foi solto → para executar uma ação.
// 2. **Sobre qual alvo** estamos passando durante o arrasto → para destacar visualmente.

// ---

// ## ❌ Tentativa que não funciona

// Você pode pensar: *"vou usar `mouseover` nos elementos que podem receber o item arrastado..."*

// Mas **isso falha**, porque o elemento sendo arrastado **fica por cima** dos demais. Logo, os eventos de mouse **não chegam nos elementos abaixo**.

// ---

// ### ✅ Solução: usar `document.elementFromPoint(x, y)`

// Essa função retorna o **elemento mais interno** no ponto `x, y` (coordenadas relativas à janela).

// Exemplo:

// ```js
// ball.hidden = true;
// let elemAbaixo = document.elementFromPoint(event.clientX, event.clientY);
// ball.hidden = false;
// ```

// ---

// ### 🧠 Por que esconder o elemento?

// Se não escondermos, `elementFromPoint` sempre retorna a própria bola — porque ela está no topo.

// ---

// ### 👇 Código completo de `onMouseMove` com detecção de droppables:

// ```js
// let currentDroppable = null;

// function onMouseMove(event) {
//   moveAt(event.pageX, event.pageY);

//   ball.hidden = true;
//   let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
//   ball.hidden = false;

//   if (!elemBelow) return;

//   let droppableBelow = elemBelow.closest('.droppable');

//   if (currentDroppable !== droppableBelow) {
//     if (currentDroppable) {
//       leaveDroppable(currentDroppable);
//     }
//     currentDroppable = droppableBelow;
//     if (currentDroppable) {
//       enterDroppable(currentDroppable);
//     }
//   }
// }
// ```

// Funções de entrada e saída do alvo:

// ```js
// function enterDroppable(elem) {
//   elem.style.background = 'lightgreen';
// }

// function leaveDroppable(elem) {
//   elem.style.background = '';
// }
// ```

// ---

// ## 🧾 Resumo

// ### 🧱 Fundamentos do arrastar e soltar com mouse:

// * `mousedown` no item → começa o arrasto.
// * `mousemove` no `document` → movimenta o item.
// * `mouseup` → finaliza o arrasto.
// * `ondragstart` → retornando `false` desativa o comportamento nativo do navegador.

// ### 🎯 Dicas:

// * Use `shiftX` e `shiftY` para manter o elemento na mesma posição sob o ponteiro.
// * Use `elementFromPoint` para detectar o que está abaixo do item arrastado.
// * Use classes como `.droppable` para identificar alvos válidos de soltar.
// * Destaque visualmente os elementos com `enterDroppable` / `leaveDroppable`.

// ---

// Se quiser, posso montar um exemplo HTML + CSS + JS com esse sistema funcionando (drag + droppable com destaque). Deseja isso?
