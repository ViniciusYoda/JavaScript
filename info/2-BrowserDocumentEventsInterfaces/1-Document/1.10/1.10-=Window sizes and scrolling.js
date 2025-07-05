// Aqui está a **tradução completa e adaptada para o português** da seção sobre **Tamanhos da Janela e Rolagem (Window sizes and scrolling)**:

// ---

// ## **Tamanhos da Janela e Rolagem**

// Como podemos descobrir a largura e altura da janela do navegador?
// Como obtemos a largura/altura total do documento (incluindo a parte rolada)?
// Como fazemos a rolagem da página via JavaScript?

// Para isso, podemos usar o **elemento raiz do documento**, `document.documentElement` (que representa a tag `<html>`), além de métodos específicos e algumas particularidades.

// ---

// ## 📏 Largura e altura da janela

// Para obter a **largura e altura visível** da janela (sem a barra de rolagem), usamos:

// ```js
// document.documentElement.clientWidth
// document.documentElement.clientHeight
// ```

// #### Exemplo:

// ```js
// alert(document.documentElement.clientHeight); // altura da janela visível
// ```

// ---

// ### 🆚 `window.innerWidth` / `innerHeight`

// Existem também `window.innerWidth` e `innerHeight`. Eles incluem a **barra de rolagem**, enquanto `clientWidth/clientHeight` não.

// #### Diferença:

// ```js
// alert(window.innerWidth);                   // largura total da janela
// alert(document.documentElement.clientWidth); // largura - barra de rolagem
// ```

// ✅ Na maioria dos casos, **queremos a área disponível para conteúdo**, então usamos `documentElement.clientWidth/clientHeight`.

// ---

// ### ⚠️ Atenção ao DOCTYPE

// Atenção: propriedades de geometria de alto nível podem se comportar **estranhamente** se o HTML **não tiver o `<!DOCTYPE html>`** no topo.

// 👉 Sempre inclua `<!DOCTYPE html>` no seu HTML.

// ---

// ## 📜 Largura e altura total do documento

// A princípio, poderíamos usar:

// ```js
// document.documentElement.scrollHeight
// ```

// Mas **isso não é confiável em todos os navegadores**. Por exemplo, no Chrome ou Safari, se **não houver rolagem**, `scrollHeight` pode ser **menor** que `clientHeight`!

// 🧠 Para obter a altura total do documento, usamos:

// ```js
// let scrollHeight = Math.max(
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );
// ```

// ---

// ## 🔎 Posição atual da rolagem

// Para saber **quanto o documento foi rolado**, usamos:

// ```js
// window.pageYOffset // rolagem vertical
// window.pageXOffset // rolagem horizontal
// ```

// Essas propriedades são **somente leitura**.

// #### Também disponíveis como:

// ```js
// window.scrollY === window.pageYOffset
// window.scrollX === window.pageXOffset
// ```

// Ambas funcionam igual. Use a que preferir.

// ---

// ## 🔄 Rolando a página via JavaScript

// Antes de rolar a página, **ela deve estar totalmente carregada (DOM pronto)**. Se tentar rolar no `<head>`, **não funcionará**.

// ---

// ### 📍 Métodos para rolar:

// #### `window.scrollTo(x, y)`

// Rola para uma posição absoluta na página.

// ```js
// window.scrollTo(0, 0); // rola até o topo da página
// window.scrollTo(0, 500); // rola até 500px do topo
// ```

// #### `window.scrollBy(x, y)`

// Rola **relativamente** à posição atual.

// ```js
// window.scrollBy(0, 100); // rola 100px para baixo
// ```

// ---

// ### 📌 `elem.scrollIntoView(top)`

// Rola a página para que o elemento fique visível.

// ```js
// elem.scrollIntoView(true);  // alinha o topo do elemento com o topo da janela
// elem.scrollIntoView(false); // alinha a parte inferior do elemento com a parte inferior da janela
// ```

// ---

// ## 🧊 Como impedir a rolagem da página

// Às vezes, queremos **congelar a rolagem** (por exemplo, ao exibir um modal):

// ```js
// document.body.style.overflow = "hidden";
// ```

// ✅ A rolagem é travada.

// 🔓 Para voltar ao normal:

// ```js
// document.body.style.overflow = "";
// ```

// ### ❗ Cuidado: desaparecimento da barra de rolagem

// Ao remover a barra de rolagem, o conteúdo da página **pode "pular"** para ocupar o espaço que ela usava. Para evitar isso:

// 1. Compare o `clientWidth` antes e depois do bloqueio.
// 2. Se ele aumentou, adicione um `padding-right` igual à largura da barra.

// ---

// ## ✅ Resumo

// ### 📐 Geometria

// | O que medir                       | Como obter                                                         |
// | --------------------------------- | ------------------------------------------------------------------ |
// | Área visível da janela            | `document.documentElement.clientWidth/Height`                      |
// | Altura/largura total do documento | `Math.max(...)` com `scrollHeight`, `offsetHeight`, `clientHeight` |

// ### ↕️ Rolagem

// | Ação                                   | Código                                       |
// | -------------------------------------- | -------------------------------------------- |
// | Obter rolagem atual                    | `window.pageYOffset` (ou `scrollY`)          |
// | Rolar para posição absoluta            | `window.scrollTo(x, y)`                      |
// | Rolar relativamente                    | `window.scrollBy(x, y)`                      |
// | Rolar para exibir um elemento          | `elem.scrollIntoView(true/false)`            |
// | Bloquear/desbloquear rolagem da página | `document.body.style.overflow = "hidden"/""` |

// ---

// Se quiser, posso montar um **arquivo PDF ou HTML** com todos esses resumos organizados. Deseja?
