// No coração de um documento HTML estão as *tags*.

// De acordo com o **Document Object Model (DOM)**, cada *tag* HTML é um **objeto**. As *tags* aninhadas são "filhos" da que as envolve. O texto dentro de uma *tag* também é um objeto.

// Todos esses objetos são acessíveis usando JavaScript, e podemos usá-los para modificar a página.
// Por exemplo, `document.body` é o objeto que representa a *tag* `<body>`.
// Executar este código deixará o `<body>` vermelho por 3 segundos:

// ```javascript
// document.body.style.background = 'red'; // deixa o fundo vermelho
// setTimeout(() => document.body.style.background = '', 3000); // retorna ao normal
// ```

// Aqui usamos `style.background` para mudar a cor de fundo de `document.body`, mas existem muitas outras propriedades, como:

//   * `innerHTML` – o conteúdo HTML do nó.
//   * `offsetWidth` – a largura do nó (em pixels).
//   * …e assim por diante.

// Em breve, aprenderemos mais maneiras de manipular o DOM, mas primeiro precisamos conhecer sua estrutura.

// -----

// ## Um exemplo do DOM

// Vamos começar com o seguinte documento simples:

// ```html
// <!DOCTYPE HTML>
// <html>
// <head>
//   <title>Sobre alce</title>
// </head>
// <body>
//   A verdade sobre alce.
// </body>
// </html>
// ```

// O DOM representa o HTML como uma estrutura de árvore de *tags*. Veja como ela se parece:

// ```
// ▾ HTML
//   ▾ HEAD
//     #text ↵␣␣
//     ▾ TITLE
//       #text Sobre alce
//     #text ↵
//   #text ↵
//   ▾ BODY
//     #text ↵␣␣
//     #text A verdade sobre alce.
//     #text ↵
// ```

// Na imagem acima (representação textual), você pode "clicar" nos nós de elemento e seus filhos abrirão/colapsarão.

// Cada nó da árvore é um objeto.
// As *tags* são **nós de elemento** (ou apenas **elementos**) e formam a estrutura da árvore: `<html>` está na raiz, então `<head>` e `<body>` são seus filhos, etc.
// O texto dentro dos elementos forma **nós de texto**, rotulados como `#text`. Um nó de texto contém apenas uma *string*. Ele não pode ter filhos e é sempre uma folha da árvore.
// Por exemplo, a *tag* `<title>` tem o texto "Sobre alce".

// Por favor, observe os caracteres especiais em nós de texto:

//   * uma nova linha: `↵` (em JavaScript conhecido como `\n`)
//   * um espaço: `␣`

// Espaços e novas linhas são caracteres totalmente válidos, como letras e dígitos. Eles formam nós de texto e se tornam parte do DOM. Assim, por exemplo, no exemplo acima, a *tag* `<head>` contém alguns espaços antes de `<title>`, e esse texto se torna um nó `#text` (ele contém apenas uma nova linha e alguns espaços).

// Existem apenas duas exclusões de alto nível:

//   * Espaços e novas linhas antes de `<head>` são ignorados por razões históricas.
//   * Se colocarmos algo depois de `</body>`, então isso é automaticamente movido para dentro do `body`, no final, como a especificação HTML exige que todo o conteúdo deve estar dentro de `<body>`. Assim, não pode haver espaços depois de `</body>`.

// Em outros casos, tudo é direto – se houver espaços (assim como qualquer caractere) no documento, eles se tornam nós de texto no DOM, e se os removermos, não haverá nenhum.

// Aqui não há nós de texto apenas com espaços:

// ```html
// <!DOCTYPE HTML><html><head><title>Sobre alce</title></head><body>A verdade sobre alce.</body></html>
// ```

// ```
// ▾ HTML
//   ▾ HEAD
//     ▾ TITLE
//       #text Sobre alce
//   ▾ BODY
//     #text A verdade sobre alce.
// ```

// -----

// #### Espaços no início/fim da *string* e nós de texto apenas com espaços geralmente são ocultados em ferramentas

// As ferramentas do navegador (a serem abordadas em breve) que trabalham com o DOM geralmente não mostram espaços no início/fim do texto e nós de texto vazios (*line-breaks*) entre as *tags*. As ferramentas de desenvolvedor economizam espaço na tela dessa forma.
// Nas próximas imagens do DOM, às vezes as omitiremos quando forem irrelevantes. Tais espaços geralmente não afetam como o documento é exibido.

// -----

// ### Autocorreção

// Se o navegador encontrar HTML malformado, ele o corrige automaticamente ao criar o DOM.
// Por exemplo, a *tag* superior é sempre `<html>`. Mesmo que ela não exista no documento, ela existirá no DOM, porque o navegador a criará. O mesmo vale para `<body>`.

// Como exemplo, se o arquivo HTML for a única palavra "Olá", o navegador a envolverá em `<html>` e `<body>`, e adicionará o `<head>` necessário, e o DOM será:

// ```
// ▾ HTML
//   ▾ HEAD
//   ▾ BODY
//     #text Olá
// ```

// Ao gerar o DOM, os navegadores processam automaticamente erros no documento, fecham *tags* e assim por diante.
// Um documento com *tags* não fechadas:

// ```html
// <p>Olá<li>Mãe<li>e<li>Pai
// ```

// …se tornará um DOM normal, pois o navegador lê as *tags* e restaura as partes que faltam:

// ```
// ▾ HTML
//   ▾ HEAD
//   ▾ BODY
//     ▾ P
//       #text Olá
//     ▾ LI
//       #text Mãe
//     ▾ LI
//       #text e
//     ▾ LI
//       #text Pai
// ```

// -----

// #### Tabelas sempre têm `<tbody>`

// Um "caso especial" interessante são as tabelas. Pela especificação do DOM, elas devem ter a *tag* `<tbody>`, mas o texto HTML pode omiti-la. Então o navegador cria `<tbody>` no DOM automaticamente.
// Para o HTML:

// ```html
// <table id="table"><tr><td>1</td></tr></table>
// ```

// A estrutura do DOM será:

// ```
// ▾ TABLE
//   ▾ TBODY
//     ▾ TR
//       ▾ TD
//         #text 1
// ```

// Você viu? O `<tbody>` apareceu do nada. Devemos ter isso em mente ao trabalhar com tabelas para evitar surpresas.

// -----

// ### Outros tipos de nó

// Existem alguns outros tipos de nó além de elementos e nós de texto.
// Por exemplo, comentários:

// ```html
// <!DOCTYPE HTML>
// <html>
// <body>
//   A verdade sobre alce.
//   <ol>
//     <li>Um alce é inteligente</li>
//     <li>...e um animal astuto!</li>
//   </ol>
// </body>
// </html>
// ```

// ```
// ▾ HTML
//   ▾ HEAD
//   ▾ BODY
//     #text ↵␣␣
//     #text A verdade sobre alce.↵␣␣
//     ▾ OL
//       #text ↵␣␣␣␣
//       ▾ LI
//         #text Um alce é inteligente
//       #text ↵␣␣␣␣
//       #comment comentário
//       #text ↵␣␣␣␣
//       ▾ LI
//         #text ...e um animal astuto!
//       #text ↵␣␣
//     #text ↵↵↵
// ```

// Podemos ver aqui um novo tipo de nó de árvore – **nó de comentário**, rotulado como `#comment`, entre dois nós de texto.
// Podemos pensar – por que um comentário é adicionado ao DOM? Ele não afeta a representação visual de forma alguma. Mas há uma regra – se algo está em HTML, então também deve estar na árvore DOM.

// Tudo em HTML, até mesmo comentários, torna-se parte do DOM.
// Até mesmo a diretiva `<!DOCTYPE...>` no início do HTML também é um nó DOM. Ela está na árvore DOM logo antes de `<html>`. Poucas pessoas sabem disso. Não vamos tocar nesse nó, nem o desenhamos em diagramas, mas ele está lá.
// O objeto `document` que representa o documento inteiro é, formalmente, também um nó DOM.

// Existem 12 tipos de nó. Na prática, geralmente trabalhamos com 4 deles:

// 1.  **`document`** – o "ponto de entrada" no DOM.
// 2.  **Nós de elemento** – *tags* HTML, os blocos de construção da árvore.
// 3.  **Nós de texto** – contêm texto.
// 4.  **Comentários** – às vezes podemos colocar informações lá, elas não serão mostradas, mas o JS pode lê-las do DOM.

// -----

// ### Veja por si mesmo

// Para ver a estrutura do DOM em tempo real, experimente o [Live DOM Viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/). Basta digitar o documento, e ele aparecerá como um DOM instantaneamente.

// Outra forma de explorar o DOM é usar as **ferramentas de desenvolvedor do navegador**. Na verdade, é isso que usamos no desenvolvimento.
// Para fazer isso, abra a página `elk.html` (o documento de exemplo), ative as ferramentas de desenvolvedor do navegador e mude para a aba **Elements**.

// Deve parecer algo assim:

// *(A imagem da aba Elements das ferramentas de desenvolvedor do Chrome está corrompida no texto original. Descreverei o que ela mostra.)*

// Você pode ver o DOM, clicar nos elementos, ver seus detalhes e assim por diante.
// Observe que a estrutura do DOM nas ferramentas de desenvolvedor é simplificada. Nós de texto são mostrados apenas como texto. E não há nós de texto "em branco" (apenas espaços) de forma alguma. Isso é bom, porque na maioria das vezes estamos interessados em nós de elemento.

// Clicar no ícone de "selecionar elemento" (geralmente uma seta com um quadrado, no canto superior esquerdo da aba Elements) permite escolher um nó da página da web usando o mouse (ou outros dispositivos apontadores) e "inspecioná-lo" (rolar até ele na aba Elements). Isso funciona muito bem quando temos uma página HTML enorme (e um DOM enorme correspondente) e gostaríamos de ver o local de um elemento específico nela.

// Outra maneira de fazer isso seria simplesmente clicar com o botão direito do mouse em uma página da web e selecionar "Inspecionar" no menu de contexto.

// *(Imagem do menu de contexto "Inspect" está corrompida no texto original. Descreverei o que ela mostra.)*

// Na parte direita das ferramentas, há as seguintes sub-abas:

//   * **Styles**: Podemos ver o CSS aplicado ao elemento atual regra por regra, incluindo regras embutidas (cinza). Quase tudo pode ser editado no local, incluindo as dimensões/margens/preenchimentos da caixa abaixo.
//   * **Computed**: Para ver o CSS aplicado ao elemento por propriedade: para cada propriedade podemos ver uma regra que a define (incluindo herança CSS e tal).
//   * **Event Listeners**: Para ver os *event listeners* anexados aos elementos DOM (abordaremos isso na próxima parte do tutorial).
//   * …e assim por diante.

// A melhor forma de estudá-los é clicando. A maioria dos valores são editáveis no local.

// -----

// ### Interação com o console

// Enquanto trabalhamos com o DOM, também podemos querer aplicar JavaScript a ele. Como: obter um nó e executar algum código para modificá-lo, para ver o resultado. Aqui estão algumas dicas para transitar entre a aba Elements e o console.
// Para começar:

// 1.  Selecione o primeiro `<li>` na aba Elements.
// 2.  Pressione `Esc` – ele abrirá o console logo abaixo da aba Elements.
// 3.  Agora o último elemento selecionado está disponível como `$0`, o anteriormente selecionado é `$1` etc.

// Podemos executar comandos neles. Por exemplo, `$0.style.background = 'red'` deixa o item da lista selecionado vermelho, assim:

// *(Imagem do console do Chrome com `$0.style.background = 'red'` sendo digitado e o resultado no navegador está corrompida no texto original. Descreverei o que ela mostra.)*

// É assim que se obtém um nó de Elements no Console.
// Há também um caminho de volta. Se houver uma variável referenciando um nó DOM, podemos usar o comando `inspect(node)` no Console para vê-lo no painel Elements.
// Ou podemos simplesmente exibir o nó DOM no console e explorar "no local", como `document.body` abaixo:

// *(Imagem do console do Chrome com `document.body` sendo digitado e o resultado expandido no console está corrompida no texto original. Descreverei o que ela mostra.)*

// Isso é para fins de depuração, é claro. A partir do próximo capítulo, acessaremos e modificaremos o DOM usando JavaScript.
// As ferramentas de desenvolvedor do navegador são uma grande ajuda no desenvolvimento: podemos explorar o DOM, experimentar coisas e ver o que dá errado.

// -----

// ## Resumo

// Um documento HTML/XML é representado dentro do navegador como a **árvore DOM**.

//   * As *tags* se tornam **nós de elemento** e formam a estrutura.
//   * O texto se torna **nós de texto**.
//   * …etc, tudo em HTML tem seu lugar no DOM, até mesmo comentários.

// Podemos usar as ferramentas de desenvolvedor para inspecionar o DOM e modificá-lo manualmente.
// Aqui cobrimos o básico, as ações mais usadas e importantes para começar. Há uma documentação extensa sobre as Ferramentas de Desenvolvedor do Chrome em [https://developers.google.com/web/tools/chrome-devtools](https://developers.google.com/web/tools/chrome-devtools). A melhor maneira de aprender as ferramentas é clicar aqui e ali, ler os menus: a maioria das opções é óbvia. Mais tarde, quando você as conhecer em geral, leia a documentação e aprenda o resto.

// Os nós DOM possuem propriedades e métodos que nos permitem navegar entre eles, modificá-los, mover-nos pela página e muito mais. Abordaremos isso nos próximos capítulos.

// -----

// Considerando que o front-end exibe os dados de abastecimento utilizando React Query e um componente de tabela genérico (`MainTable.Main`), como a estrutura da árvore DOM se relaciona com a forma como esses dados são "desenhados" na tela? Você pode descrever o papel do DOM no processo de renderização desses componentes?