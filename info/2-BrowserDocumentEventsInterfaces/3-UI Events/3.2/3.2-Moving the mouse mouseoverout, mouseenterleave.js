// Claro! Abaixo está **todo o conteúdo traduzido e adaptado para o português**, com explicações claras sobre os eventos de movimento do mouse: `mouseover`, `mouseout`, `mouseenter` e `mouseleave`.

// ---

// ## 🎯 Movimento do mouse: `mouseover/out`, `mouseenter/leave`

// Vamos nos aprofundar nos eventos que ocorrem quando o ponteiro do mouse se move entre elementos.

// ---

// ## 🧭 Eventos `mouseover` / `mouseout` e a propriedade `relatedTarget`

// * `mouseover`: ocorre quando o mouse entra em um elemento.
// * `mouseout`: ocorre quando o mouse sai de um elemento.

// Esses eventos têm uma propriedade especial chamada `relatedTarget`, que **complementa** `target`.

// ### Entenda:

// * No `mouseover`:

//   * `event.target` → é o **elemento onde o mouse entrou**.
//   * `event.relatedTarget` → é o **elemento de onde o mouse saiu**.

// * No `mouseout`:

//   * `event.target` → é o **elemento que o mouse saiu**.
//   * `event.relatedTarget` → é o **novo elemento onde o mouse entrou**.

// ### Exemplo:

// Se o mouse sai de um botão e entra num parágrafo:

// * `mouseout` do botão:

//   * `target` = botão
//   * `relatedTarget` = parágrafo

// ---

// ## ⚠️ `relatedTarget` pode ser `null`

// Às vezes, `relatedTarget` será `null`. Isso significa que o mouse:

// * Entrou na página vindo de **fora da janela** do navegador.
// * Ou saiu da página completamente.

// > Importante verificar se `relatedTarget` é nulo antes de acessar algo como `relatedTarget.tagName`.

// ---

// ## ⏩ Pulando elementos ao mover o mouse

// O evento `mousemove` é disparado **somente em alguns momentos**, não a cada pixel movido.

// Se o usuário mover o mouse muito rápido, o navegador pode **pular elementos intermediários**:

// Por exemplo, se o ponteiro vai direto do elemento `#de` para `#para`, o `mouseout` pode ser disparado em `#de` e logo depois o `mouseover` em `#para`, **sem eventos nos elementos do meio**.

// ✅ Isso melhora o desempenho.
// ❗ Mas significa que nem todos os elementos ao longo do caminho serão "visitados".

// ---

// ## ✅ Garantia: se houve `mouseover`, haverá `mouseout`

// Mesmo em movimentos rápidos, se o ponteiro entrou oficialmente em um elemento (gerando `mouseover`), **haverá `mouseout`** quando ele sair.

// ---

// ## 🧬 `mouseout` ao entrar em um filho

// Quando o mouse sai de um elemento e entra em **um filho**, o evento `mouseout` ainda será disparado no pai.

// ```html
// <div id="pai">
//   <div id="filho">...</div>
// </div>
// ```

// Ao mover o mouse do `#pai` para `#filho`, o navegador interpreta como:

// 1. Sair do `#pai` → `mouseout` no pai.
// 2. Entrar no `#filho` → `mouseover` no filho (que **bolha** para o pai).

// ### Isso acontece porque:

// O navegador considera que o ponteiro **só pode estar sobre um único elemento por vez**, o mais profundo (mais interno) visualmente.

// ---

// ## 🧪 Solução para detectar *realmente* sair do elemento

// Se você quer evitar ações como animações quando o ponteiro **apenas entra em um filho**, você pode verificar o `relatedTarget`.

// ```js
// elemento.onmouseout = function(event) {
//   if (event.relatedTarget && elemento.contains(event.relatedTarget)) {
//     // o ponteiro ainda está dentro do elemento (em um filho)
//     return; // ignore o evento
//   }

//   // agora sim, o mouse saiu de verdade
// };
// ```

// ---

// ## 🚪 Eventos `mouseenter` e `mouseleave`

// São versões **mais simples** e específicas de `mouseover` / `mouseout`.

// Diferenças principais:

// |                     | `mouseover`/`mouseout`                   | `mouseenter`/`mouseleave`          |
// | ------------------- | ---------------------------------------- | ---------------------------------- |
// | Considera filhos?   | ✅ Sim (dispara ao entrar/sair de filhos) | ❌ Não (ignora transições internas) |
// | Bolha?              | ✅ Sim                                    | ❌ Não                              |
// | Usa `relatedTarget` | ✅ Sim                                    | ✅ Sim                              |

// ### Exemplo:

// ```js
// elemento.onmouseenter = () => console.log('Entrou no elemento');
// elemento.onmouseleave = () => console.log('Saiu do elemento');
// ```

// Mesmo que o mouse vá de um filho para outro, **não dispara de novo**.

// ---

// ## 🧰 Delegação de eventos com `mouseover/out`

// Os eventos `mouseenter/leave` **não propagam (não bolham)**, então **não servem para delegação**.

// Exemplo: queremos detectar entrada/saída em várias `<td>` de uma `<table>`, sem colocar um handler em cada célula.

// Solução: usar `mouseover`/`mouseout` e filtrar manualmente.

// ---

// ## 👇 Exemplo com delegação em `<table>`

// ```js
// let elementoAtual = null;

// tabela.onmouseover = function(event) {
//   if (elementoAtual) return;

//   let alvo = event.target.closest('td');
//   if (!alvo || !tabela.contains(alvo)) return;

//   elementoAtual = alvo;
//   aoEntrar(elementoAtual);
// };

// tabela.onmouseout = function(event) {
//   if (!elementoAtual) return;

//   let destino = event.relatedTarget;
//   while (destino) {
//     if (destino === elementoAtual) return;
//     destino = destino.parentNode;
//   }

//   aoSair(elementoAtual);
//   elementoAtual = null;
// };

// function aoEntrar(elem) {
//   elem.style.background = 'pink';
// }

// function aoSair(elem) {
//   elem.style.background = '';
// }
// ```

// > Isso garante que a célula `<td>` só seja destacada ao entrar/sair **como um todo**, e **não** ao ir de um filho para outro.

// ---

// ## ✅ Resumo

// * Eventos:

//   * `mouseover` / `mouseout` → **disparam ao mover entre qualquer elemento**, inclusive filhos. Têm `relatedTarget` e propagam.
//   * `mouseenter` / `mouseleave` → **disparam só ao entrar/sair diretamente** do elemento. Não propagam.

// * Use `relatedTarget` para verificar **de onde veio ou para onde vai o mouse**.

// * Para delegação (ex: uma tabela com muitas `<td>`), use `mouseover`/`mouseout` + filtros manuais.

// * Movimentos rápidos do mouse **podem pular elementos**.

// ---

// Se quiser, posso criar um exemplo completo com `<table>` e destaque de células para você testar. Deseja isso?
