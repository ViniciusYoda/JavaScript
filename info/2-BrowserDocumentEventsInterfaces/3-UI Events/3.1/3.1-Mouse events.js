// Claro! Aqui está **toda a explicação sobre eventos do mouse (Mouse events)** traduzida e adaptada cuidadosamente para o português:

// ---

// ## 🖱 Eventos do Mouse

// Neste capítulo, vamos explorar com mais detalhes os **eventos do mouse** e suas propriedades.

// > 💡 **Observação:** esses eventos não vêm apenas de “dispositivos com mouse”, mas também são **simulados** em celulares e tablets para compatibilidade.

// ---

// ## 📚 Tipos de eventos do mouse

// Já vimos alguns deles:

// * **mousedown / mouseup** – o botão do mouse é pressionado/solto sobre um elemento.
// * **mouseover / mouseout** – o ponteiro do mouse entra ou sai de um elemento.
// * **mousemove** – cada movimento do mouse sobre um elemento dispara esse evento.
// * **click** – ocorre após `mousedown` e `mouseup` no **mesmo elemento**, com o **botão esquerdo**.
// * **dblclick** – ocorre após dois cliques rápidos no mesmo elemento. É pouco usado atualmente.
// * **contextmenu** – ocorre ao clicar com o **botão direito**. Também pode ser ativado por teclado (tecla do menu), então não é exclusivamente “do mouse”.

// Há outros eventos relacionados ao mouse que veremos mais adiante.

// ---

// ## 🔁 Ordem dos eventos

// Uma única ação do usuário pode disparar **vários eventos**.

// Exemplo: um clique com o botão esquerdo dispara:

// ```
// mousedown → mouseup → click
// ```

// Se você clicar num botão, verá os eventos nessa ordem. Em cliques duplos (`dblclick`), isso se repete rapidamente.

// ---

// ## 🧷 Propriedade `event.button` (qual botão foi clicado?)

// Eventos como `mousedown` e `mouseup` têm a propriedade `event.button` que identifica **qual botão do mouse** foi usado:

// | Botão do Mouse         | `event.button` |
// | ---------------------- | -------------- |
// | Botão esquerdo         | 0              |
// | Botão do meio (scroll) | 1              |
// | Botão direito          | 2              |
// | Botão “voltar” (X1)    | 3              |
// | Botão “avançar” (X2)   | 4              |

// > A maioria dos dispositivos só tem os botões **0 (esquerdo)** e **2 (direito)**.

// Há também `event.buttons` (com "s") que indica **quais botões estão pressionados ao mesmo tempo**, mas raramente é usado.

// ---

// ## ⚠️ `event.which` (obsoleto)

// Código antigo pode usar `event.which`:

// ```js
// event.which == 1 // botão esquerdo
// event.which == 2 // botão do meio
// event.which == 3 // botão direito
// ```

// ❌ Essa propriedade está **obsoleta**. Use `event.button`.

// ---

// ## 🔑 Teclas modificadoras: `shift`, `alt`, `ctrl`, `meta`

// Todos os eventos do mouse incluem informações sobre **teclas pressionadas** durante o evento:

// | Tecla           | Propriedade      |
// | --------------- | ---------------- |
// | Shift           | `event.shiftKey` |
// | Alt (ou Option) | `event.altKey`   |
// | Ctrl            | `event.ctrlKey`  |
// | Cmd (Mac)       | `event.metaKey`  |

// ```html
// <button id="botao">Alt + Shift + Clique</button>

// <script>
//   botao.onclick = function(evento) {
//     if (evento.altKey && evento.shiftKey) {
//       alert("Parabéns!");
//     }
//   };
// </script>
// ```

// ---

// ### 🧠 Atenção para usuários de Mac

// * Em **Windows/Linux**, usamos `Ctrl`.
// * Em **Mac**, geralmente usa-se `Cmd` (representado por `metaKey`).

// Para suportar todos os usuários:

// ```js
// if (event.ctrlKey || event.metaKey) {
//   // Aceita Ctrl no Windows e Cmd no Mac
// }
// ```

// > No Mac, **Ctrl+click** é interpretado como clique com o botão direito (gera `contextmenu`).

// ---

// ## 📍 Coordenadas do mouse

// Eventos do mouse fornecem **duas formas de coordenadas**:

// | Tipo                   | Propriedades         | Explicação                                  |
// | ---------------------- | -------------------- | ------------------------------------------- |
// | Relativas à janela     | `clientX`, `clientY` | Posição dentro da **janela visível**        |
// | Relativas ao documento | `pageX`, `pageY`     | Posição em relação ao **documento inteiro** |

// ```html
// <input onmousemove="this.value=event.clientX+':'+event.clientY" value="Passe o mouse aqui">
// ```

// > `clientX/Y` mudam conforme o scroll. Já `pageX/Y` não mudam.

// ---

// ## 🛑 Prevenir seleção de texto no `mousedown`

// Ao dar **duplo clique**, o navegador pode **selecionar o texto** — o que pode atrapalhar o design de alguns componentes.

// Exemplo:

// ```html
// <span ondblclick="alert('Duplo clique!')">Clique duas vezes</span>
// ```

// Também é possível iniciar uma seleção ao clicar e arrastar com o botão pressionado.

// ### ✅ Solução: impedir ação padrão no `mousedown`

// ```html
// <b ondblclick="alert('Clique!')" onmousedown="return false">
//   Clique duas vezes
// </b>
// ```

// Isso evita que o texto seja selecionado no duplo clique. O conteúdo ainda pode ser selecionado, mas só se o usuário começar a seleção **fora** do elemento.

// ---

// ## 📋 Impedir cópia de conteúdo com `oncopy`

// ```html
// <div oncopy="alert('Cópia não permitida!'); return false;">
//   Usuário querido,<br>
//   Copiar este conteúdo não é permitido.
// </div>
// ```

// O usuário verá um alerta ao tentar copiar. Embora a proteção **não seja absoluta**, pode desencorajar o usuário comum.

// ---

// ## ✅ Resumo

// * Eventos do mouse:

//   * `mousedown`, `mouseup`, `click`, `dblclick`, `contextmenu`, `mousemove`, etc.
// * Propriedade do botão clicado:

//   * `event.button`: 0 (esquerdo), 1 (meio), 2 (direito).
// * Teclas modificadoras:

//   * `shiftKey`, `altKey`, `ctrlKey`, `metaKey` (Cmd no Mac).
//   * Use `ctrlKey || metaKey` para suportar todos os sistemas.
// * Coordenadas:

//   * `clientX/clientY` → relativo à **janela**.
//   * `pageX/pageY` → relativo ao **documento**.
// * Use `onmousedown="return false"` para evitar seleção indesejada.
// * Use `oncopy="return false"` para tentar bloquear cópia de conteúdo.

// ---

// Se quiser, posso montar um **exemplo prático com todos esses eventos funcionando juntos** para estudo ou prática. Deseja isso?
