// Aqui está a **tradução completa e adaptada para o português** da seção sobre **tamanho de elementos e rolagem** com termos técnicos bem explicados:

// ---

// ## **Tamanho do Elemento e Rolagem (Element size and scrolling)**

// O JavaScript oferece várias propriedades para ler informações sobre a **largura, altura** e outras características geométricas dos elementos.

// Essas propriedades são muito úteis quando precisamos **mover** ou **posicionar** elementos dinamicamente.

// ---

// ## **Elemento de exemplo**

// Vamos usar o seguinte elemento de exemplo para demonstrar essas propriedades:

// ```html
// <div id="exemplo">
//   ...Texto...
// </div>
// <style>
//   #exemplo {
//     width: 300px;
//     height: 200px;
//     border: 25px solid #E8C48F;
//     padding: 20px;
//     overflow: auto;
//   }
// </style>
// ```

// Este elemento possui:

// * **Borda**
// * **Preenchimento (padding)**
// * **Barra de rolagem (scroll)**

// > ❌ **Não possui margens**, pois elas não fazem parte do "elemento em si" (são externas).

// ---

// ## **Atenção à barra de rolagem**

// Em navegadores que **reservam espaço para a barra de rolagem**, ela **consome parte da largura do conteúdo**.

// Por exemplo, sem a barra de rolagem, o conteúdo teria 300px. Com uma barra de 16px, sobram apenas **284px** visíveis.

// Por isso, muitos exemplos aqui assumem que **existe uma barra de rolagem**. Sem ela, os cálculos seriam mais simples.

// ---

// ## **O conteúdo pode ocupar o padding-bottom**

// O preenchimento (padding) normalmente é visualizado como "vazio", mas se houver muito texto e ele ultrapassar a altura visível, o navegador exibirá esse texto dentro da área de padding-bottom. Isso é esperado e normal.

// ---

// ## **Propriedades geométricas**

// Essas propriedades retornam **números em pixels**.

// Vamos começar pelas propriedades mais externas.

// ---

// ### 🟫 `offsetParent`, `offsetLeft`, `offsetTop`

// * **`offsetParent`**: é o ancestral mais próximo que serve como **referência de posição**. Pode ser:

//   * Um elemento com `position: relative`, `absolute`, `fixed` ou `sticky`
//   * `<td>`, `<th>` ou `<table>`
//   * `<body>`

// * **`offsetLeft` / `offsetTop`**: coordenadas do canto superior esquerdo do elemento **relativas ao seu `offsetParent`**.

// #### Exemplo:

// ```html
// <main style="position: relative" id="main">
//   <article>
//     <div id="exemplo" style="position: absolute; left: 180px; top: 180px">...</div>
//   </article>
// </main>

// <script>
//   alert(exemplo.offsetParent.id); // main
//   alert(exemplo.offsetLeft); // 180 (número, não "180px")
//   alert(exemplo.offsetTop);  // 180
// </script>
// ```

// 🧠 `offsetParent` será `null` se:

// * O elemento (ou ancestral) está com `display: none`
// * O elemento é o `<body>` ou `<html>`
// * O elemento usa `position: fixed`

// ---

// ### 📏 `offsetWidth`, `offsetHeight`

// Essas são as **dimensões totais** do elemento:

// * Incluem: conteúdo + padding + bordas
// * **Não incluem margens**

// No exemplo:

// * `offsetWidth = 390` → 300 (largura CSS) + 2×20 (padding) + 2×25 (borda)
// * `offsetHeight = 290`

// 🛑 Se o elemento estiver oculto ou não no DOM, essas propriedades retornam **0**.

// #### Checar se está oculto:

// ```js
// function estaOculto(elem) {
//   return !elem.offsetWidth && !elem.offsetHeight;
// }
// ```

// ---

// ### 🎯 `clientTop`, `clientLeft`

// Representam a distância da borda externa até a área de conteúdo (interna). Normalmente, são iguais à **largura da borda**.

// No exemplo:

// * `clientTop = 25` → borda superior
// * `clientLeft = 25` → borda esquerda

// 📝 Em sistemas com layout da direita para a esquerda (ex: árabe, hebraico), o `clientLeft` pode **incluir a largura da barra de rolagem**.

// ---

// ### 🧩 `clientWidth`, `clientHeight`

// Representam a **área visível do conteúdo**, **incluindo o padding**, mas **sem incluir a barra de rolagem**.

// No exemplo:

// * `clientHeight = 240` → 200 (altura CSS) + 2×20 (padding)
// * `clientWidth = 284 + 2×20 = 324` → 300 (largura CSS) - 16 (scroll) + 2×20 (padding)

// Se não houver padding, `clientWidth/Height` é igual à área visível do conteúdo.

// ---

// ### 📜 `scrollWidth`, `scrollHeight`

// Incluem **todo o conteúdo**, inclusive o que está oculto devido à rolagem.

// * `scrollHeight = 723` → altura total interna, mesmo que parte esteja invisível
// * `scrollWidth = 324` → igual ao `clientWidth` se não houver scroll horizontal

// ### Expandir um elemento para sua altura total:

// ```js
// element.style.height = `${element.scrollHeight}px`;
// ```

// ---

// ### 🔽 `scrollTop`, `scrollLeft`

// Indicam **quanto o conteúdo já foi rolado** vertical ou horizontalmente.

// * `scrollTop` → quanto foi rolado **para cima**
// * `scrollLeft` → quanto foi rolado **para a esquerda**

// ✅ Essas propriedades **podem ser modificadas** para **forçar a rolagem**:

// ```js
// elem.scrollTop += 10; // rola 10px para baixo
// elem.scrollTop = 0;   // rola para o topo
// elem.scrollTop = 1e9; // rola até o fim
// ```

// ---

// ## ❗ Não confie na largura/altura do CSS

// Podemos usar `getComputedStyle(elem).width` para obter a largura CSS, mas **isso tem desvantagens**:

// ### Por que não usar?

// 1. **Depende de `box-sizing`**, que altera o significado de `width` e `height`. Pode causar inconsistências.

// 2. CSS pode ter `width: auto`, o que é inválido para cálculos em JavaScript:

// ```html
// <span id="elem">Olá!</span>
// <script>
//   alert(getComputedStyle(elem).width); // auto
// </script>
// ```

// 3. A **barra de rolagem** pode causar divergências entre navegadores:

// * Firefox retorna `width: 300px` (valor CSS)
// * Chrome/Edge retornam `284px` (área real, sem scrollbar)

// Por isso, é mais **seguro usar** propriedades como `clientWidth`, `offsetWidth`, etc.

// ---

// ## ✅ Resumo final

// | Propriedade                   | O que retorna                                                                     |
// | ----------------------------- | --------------------------------------------------------------------------------- |
// | `offsetParent`                | Ancestral posicionado mais próximo                                                |
// | `offsetLeft`, `offsetTop`     | Posição em relação ao `offsetParent`                                              |
// | `offsetWidth`, `offsetHeight` | Tamanho total incluindo bordas                                                    |
// | `clientLeft`, `clientTop`     | Largura da borda esquerda/superior (ou distância da borda externa até o conteúdo) |
// | `clientWidth`, `clientHeight` | Área visível do conteúdo (conteúdo + padding - scrollbar)                         |
// | `scrollWidth`, `scrollHeight` | Tamanho total do conteúdo (inclusive a parte oculta)                              |
// | `scrollLeft`, `scrollTop`     | Quanto já foi rolado (horizontal/vertical)                                        |

// 🔒 Todas essas propriedades são **somente leitura**, exceto `scrollLeft` e `scrollTop`, que podem ser modificadas para rolar o conteúdo.

// ---

// Se quiser, posso formatar essa tradução em PDF, HTML, Markdown ou outro formato. Deseja?
