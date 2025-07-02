// Certo, `globus142`. Entendido. Vamos nos concentrar estritamente nas propriedades dos nós DOM, sem misturar com outros tópicos.

// -----

// ## Propriedades de Nós do DOM: Tipo, Tag e Conteúdo

// Este capítulo aprofunda a compreensão dos nós do DOM, explorando suas características e as propriedades mais frequentemente utilizadas.

// -----

// ### Classes de Nós DOM

// Diferentes nós DOM possuem propriedades distintas. Por exemplo, um nó de elemento que corresponde à *tag* `<a>` terá propriedades relacionadas a *links*, enquanto um nó de `<input>` terá propriedades associadas a campos de entrada de dados, e assim por diante. Nós de texto, por sua vez, diferem dos nós de elemento. No entanto, todos compartilham um conjunto de propriedades e métodos comuns, uma vez que as classes de nós DOM formam uma hierarquia unificada.

// Cada nó DOM pertence à sua respectiva classe interna. A raiz dessa hierarquia é `EventTarget`, da qual `Node` herda, e todos os demais nós DOM, por sua vez, herdam de `Node`.

// As classes são as seguintes:

//   * **`EventTarget`**: É a classe "abstrata" raiz para todos os objetos. Instâncias diretas dessa classe nunca são criadas. Ela serve como base para garantir que todos os nós DOM suportem o conceito de "eventos", que serão estudados posteriormente.

//   * **`Node`**: Também é uma classe "abstrata" que serve como base para os nós DOM. Ela oferece a funcionalidade essencial da árvore, como `parentNode`, `nextSibling` e `childNodes` (que são *getters*). Objetos da classe `Node` nunca são criados diretamente. Contudo, outras classes herdam dela, adquirindo assim a funcionalidade de `Node`.

//   * **`Document`** (historicamente, muitas vezes herdado por `HTMLDocument`, embora a especificação mais recente não o exija): Representa o documento HTML como um todo. O objeto global `document` pertence a essa classe e serve como ponto de entrada para o DOM.

//   * **`CharacterData`**: Uma classe "abstrata", herdada por:

//       * **`Text`**: A classe que corresponde ao texto dentro dos elementos, como "Olá" em `<p>Olá</p>`.
//       * **`Comment`**: A classe para comentários HTML. Embora não sejam exibidos na página, cada comentário se torna um membro do DOM.

//   * **`Element`**: É a classe base para todos os elementos DOM. Ela fornece métodos de navegação em nível de elemento, como `nextElementSibling` e `children`, e métodos de busca, como `getElementsByTagName` e `querySelector`. Um navegador suporta não apenas HTML, mas também XML e SVG. Assim, a classe `Element` serve como base para classes mais específicas, como `SVGElement`, `XMLElement` (que não são relevantes aqui) e `HTMLElement`.

//   * Finalmente, **`HTMLElement`** é a classe fundamental para todos os elementos HTML. É a classe com a qual você, `globus142`, trabalhará na maior parte do tempo. Ela é herdada por elementos HTML concretos, tais como:

//       * `HTMLInputElement`: A classe para elementos `<input>`.
//       * `HTMLBodyElement`: A classe para elementos `<body>`.
//       * `HTMLAnchorElement`: A classe para elementos `<a>`.
//       * …e assim por diante.

// Existem inúmeras outras *tags* com suas próprias classes que podem possuir propriedades e métodos específicos. Por outro lado, alguns elementos, como `<span>`, `<section>` e `<article>`, não têm propriedades específicas e, portanto, são instâncias da classe `HTMLElement`.

// Dessa forma, o conjunto completo de propriedades e métodos de um determinado nó é o resultado da sua cadeia de herança.
// Por exemplo, considere o objeto DOM para um elemento `<input>`. Ele pertence à classe `HTMLInputElement`. Suas propriedades e métodos são uma superposição das seguintes classes (listadas em ordem de herança):

//   * **`HTMLInputElement`**: Esta classe fornece propriedades específicas para entradas de dados.
//   * **`HTMLElement`**: Fornece métodos comuns de elementos HTML (e *getters*/*setters*).
//   * **`Element`**: Oferece métodos genéricos para elementos.
//   * **`Node`**: Contém propriedades comuns de nós DOM.
//   * **`EventTarget`**: Habilita o suporte a eventos (a serem abordados posteriormente).
//   * …e, por fim, herda de `Object`, o que disponibiliza métodos de "objeto simples" como `hasOwnProperty`.

// Para determinar o nome da classe de um nó DOM, podemos nos lembrar que um objeto geralmente tem a propriedade `constructor`, que referencia o construtor da classe. O nome da classe é acessível via `constructor.name`:

// ```javascript
// alert( document.body.constructor.name ); // HTMLBodyElement
// ```

// Alternativamente, podemos simplesmente converter o objeto para *string*:

// ```javascript
// alert( document.body ); // [object HTMLBodyElement]
// ```

// Também é possível usar `instanceof` para verificar a cadeia de herança:

// ```javascript
// alert( document.body instanceof HTMLBodyElement ); // true
// alert( document.body instanceof HTMLElement );    // true
// alert( document.body instanceof Element );        // true
// alert( document.body instanceof Node );           // true
// alert( document.body instanceof EventTarget );    // true
// ```

// Como se pode observar, os nós DOM são objetos JavaScript comuns. Eles utilizam classes baseadas em protótipos para herança. Isso também é facilmente visível ao inspecionar um elemento com `console.dir(elem)` nas ferramentas de desenvolvedor do navegador, onde você pode ver `HTMLElement.prototype`, `Element.prototype`, etc.

// -----

// #### `console.dir(elem)` versus `console.log(elem)`

// A maioria dos navegadores oferece suporte a dois comandos em suas ferramentas de desenvolvedor: `console.log` e `console.dir`. Ambos exibem seus argumentos no console. Para objetos JavaScript, esses comandos geralmente se comportam de maneira similar.
// No entanto, para elementos DOM, eles apresentam diferenças:

//   * `console.log(elem)`: Exibe a árvore DOM do elemento.
//   * `console.dir(elem)`: Exibe o elemento como um objeto DOM, ideal para explorar suas propriedades.

// Experimente com `document.body` para ver a diferença.

// -----

// #### IDL na Especificação

// Na especificação, as classes DOM não são descritas usando JavaScript, mas sim uma linguagem especial de descrição de interface (IDL), que geralmente é fácil de entender. Em IDL, todas as propriedades são precedidas por seus tipos, como `DOMString` ou `boolean`.
// A seguir, um trecho de exemplo, com comentários:

// ```
// // Define HTMLInputElement
// // O dois pontos ":" indica que HTMLInputElement herda de HTMLElement
// interface HTMLInputElement: HTMLElement {
//   // aqui vão as propriedades e métodos dos elementos <input>
//   // "DOMString" significa que o valor de uma propriedade é uma string
//   attribute DOMString accept;
//   attribute DOMString alt;
//   attribute DOMString autocomplete;
//   attribute DOMString value;

//   // propriedade de valor booleano (true/false)
//   attribute boolean autofocus;
//   ...

//   // agora o método: "void" significa que o método não retorna valor
//   void select();
//   ...
// }
// ```

// -----

// ### A Propriedade `nodeType`

// A propriedade `nodeType` oferece uma maneira adicional e mais "tradicional" de determinar o "tipo" de um nó DOM. Ela possui um valor numérico:

//   * `elem.nodeType == 1`: para nós de elemento.
//   * `elem.nodeType == 3`: para nós de texto.
//   * `elem.nodeType == 9`: para o objeto `document`.
//   * Existem alguns outros valores especificados.

// Por exemplo:

// ```html
// <body>
//   <script>
//   let elem = document.body;

//   // vamos examinar: qual o tipo de nó em elem?
//   alert(elem.nodeType); // 1 => elemento

//   // e seu primeiro filho é...
//   alert(elem.firstChild.nodeType); // 3 => texto

//   // para o objeto document, o tipo é 9
//   alert( document.nodeType ); // 9
//   </script>
// </body>
// ```

// Em *scripts* modernos, embora `instanceof` e outros testes baseados em classes possam ser usados para verificar o tipo de nó, `nodeType` pode ser mais simples em algumas situações. `nodeType` é uma propriedade somente leitura e não pode ser alterada.

// -----

// ### Tag: `nodeName` e `tagName`

// Dado um nó DOM, seu nome de *tag* pode ser lido das propriedades `nodeName` ou `tagName`:
// Por exemplo:

// ```javascript
// alert( document.body.nodeName ); // BODY
// alert( document.body.tagName );  // BODY
// ```

// Há alguma diferença entre `tagName` e `nodeName`?
// Sim, a diferença é sutil e se reflete em seus nomes.

//   * A propriedade **`tagName`** existe **apenas para nós `Element`**.
//   * A propriedade **`nodeName`** é definida para **qualquer `Node`**:
//       * Para elementos, significa o mesmo que `tagName`.
//       * Para outros tipos de nó (texto, comentário, etc.), ela contém uma *string* com o tipo do nó.

// Em outras palavras, `tagName` é suportado exclusivamente por nós de elemento (pois é originado da classe `Element`), enquanto `nodeName` pode fornecer informações sobre outros tipos de nós.
// Por exemplo, vamos comparar `tagName` e `nodeName` para o `document` e um nó de comentário:

// ```html
// <body><script>
//     // para comentário
//     alert( document.body.firstChild.tagName ); // undefined (não é um elemento)
//     alert( document.body.firstChild.nodeName ); // #comment

//     // para document
//     alert( document.tagName ); // undefined (não é um elemento)
//     alert( document.nodeName ); // #document
//   </script>
// </body>
// ```

// Se você trabalha apenas com elementos, pode usar tanto `tagName` quanto `nodeName` indistintamente, pois não haverá diferença.

// -----

// #### O nome da *tag* é sempre em maiúsculas, exceto no modo XML

// O navegador opera em dois modos para processar documentos: HTML e XML. Geralmente, o modo HTML é empregado para páginas da web. O modo XML é ativado quando o navegador recebe um documento XML com o cabeçalho `Content-Type: application/xml+xhtml`.
// No modo HTML, `tagName`/`nodeName` estará sempre em maiúsculas: será `BODY` tanto para `<body>` quanto para `<BoDy>`. No modo XML, a capitalização original é mantida. Atualmente, o modo XML é pouco utilizado.

// -----

// ### `innerHTML`: o Conteúdo

// A propriedade `innerHTML` permite obter o HTML interno de um elemento como uma *string*. Também é possível modificá-la, tornando-a uma das maneiras mais poderosas de alterar o conteúdo de uma página.
// O exemplo a seguir mostra como ler e depois substituir completamente o conteúdo de `document.body`:

// ```html
// <body>
//   <p>Um parágrafo</p>
//   <div>Uma div</div>

//   <script>
//     alert( document.body.innerHTML ); // lê o conteúdo atual
//     document.body.innerHTML = 'O NOVO BODY!'; // o substitui
//   </script>
// </body>
// ```

// Se tentarmos inserir HTML inválido, o navegador tentará corrigir os erros:

// ```html
// <body>
//   <script>
//     document.body.innerHTML = '<b>teste'; // esqueceu de fechar a tag
//     alert( document.body.innerHTML ); // <b>teste</b> (corrigido)
//   </script>
// </body>
// ```

// -----

// #### *Scripts* não são executados

// Se `innerHTML` inserir uma *tag* `<script>` no documento, ela se tornará parte do HTML, mas **não será executada**.

// -----

// #### Cuidado: "`innerHTML+=`" faz uma sobrescrita completa

// É possível adicionar HTML a um elemento usando `elem.innerHTML += "mais html"`.
// Por exemplo:

// ```javascript
// chatDiv.innerHTML += "<div>Olá<img src='sorriso.gif'/> !</div>";
// chatDiv.innerHTML += "Como vai?";
// ```

// No entanto, é crucial ter muito cuidado ao fazer isso, pois o que realmente ocorre não é uma adição, mas uma **sobrescrita completa**.
// Tecnicamente, as duas linhas a seguir produzem o mesmo efeito:

// ```javascript
// elem.innerHTML += "...";
// // é uma forma mais curta de escrever:
// elem.innerHTML = elem.innerHTML + "..."
// ```

// Em outras palavras, `innerHTML +=` executa os seguintes passos:

// 1.  O conteúdo antigo é removido.
// 2.  O novo `innerHTML` é escrito em seu lugar (uma concatenação do conteúdo antigo e do novo).

// Como o conteúdo é "zerado" e reescrito do zero, todas as imagens e outros recursos serão recarregados. No exemplo `chatDiv` acima, a linha `chatDiv.innerHTML+="Como vai?"` recria o conteúdo HTML e recarrega `smile.gif` (espera-se que esteja em cache). Se `chatDiv` contiver muito texto e outras imagens, o recarregamento será claramente perceptível.
// Existem também outros efeitos colaterais. Por exemplo, se o texto existente foi selecionado com o mouse, a maioria dos navegadores removerá a seleção ao reescrever `innerHTML`. E se houver um `<input>` com texto digitado pelo visitante, esse texto será removido. E assim por diante.
// Felizmente, existem outras maneiras de adicionar HTML além de `innerHTML`, e estas serão abordadas em breve.

// -----

// ### `outerHTML`: HTML Completo do Elemento

// A propriedade `outerHTML` contém o HTML completo do elemento, o que inclui o `innerHTML` e o próprio elemento.
// Aqui está um exemplo:

// ```html
// <div id="elem">Olá <b>Mundo</b></div>
// <script>
//   alert(elem.outerHTML); // <div id="elem">Olá <b>Mundo</b></div>
// </script>
// ```

// **Cuidado**: Ao contrário de `innerHTML`, a escrita em `outerHTML` **não modifica o elemento em si**. Em vez disso, ela o substitui no DOM.
// Sim, parece estranho, e é realmente estranho, por isso fazemos uma nota separada aqui. Dê uma olhada.
// Considere o exemplo:

// ```html
// <div>Olá, mundo!</div>
// <script>
//   let div = document.querySelector('div');

//   // substitui div.outerHTML por <p>...</p>
//   div.outerHTML = '<p>Um novo elemento</p>'; // (*)

//   // Uau! 'div' ainda é o mesmo!
//   alert(div.outerHTML); // <div>Olá, mundo!</div> (**)
// </script>
// ```

// Parece realmente incomum, certo?
// Na linha `(*)` substituímos `div` por `<p>Um novo elemento</p>`. No documento externo (o DOM), podemos ver o novo conteúdo no lugar da `<div>`. No entanto, como podemos observar na linha `(**)`, o valor da antiga variável `div` não foi alterado\!
// A atribuição `outerHTML` **não modifica o elemento DOM** (o objeto referenciado, neste caso, pela variável 'div'), mas sim o remove do DOM e insere o novo HTML em seu lugar.
// Assim, o que ocorreu em `div.outerHTML=...` foi:

// 1.  `div` foi removido do documento.
// 2.  Outro trecho de HTML, `<p>Um novo elemento</p>`, foi inserido em seu lugar.
// 3.  `div` ainda mantém seu valor antigo. O novo HTML não foi salvo em nenhuma variável.

// É muito fácil cometer um erro aqui: modificar `div.outerHTML` e então continuar a trabalhar com `div` como se ele contivesse o novo conteúdo. Mas não é o caso. Tal comportamento é correto para `innerHTML`, mas não para `outerHTML`.
// Podemos escrever em `elem.outerHTML`, mas devemos ter em mente que isso não altera o elemento ao qual estamos escrevendo ('elem'). Em vez disso, ele insere o novo HTML em seu lugar. Podemos obter referências aos novos elementos consultando o DOM.

// -----

// ### `nodeValue`/`data`: Conteúdo do Nó de Texto

// A propriedade `innerHTML` é válida apenas para nós de elemento.
// Outros tipos de nós, como os nós de texto, têm suas contrapartes: as propriedades `nodeValue` e `data`. Essas duas são praticamente idênticas para uso prático, com apenas pequenas diferenças na especificação. Portanto, usaremos `data` por ser mais curto.
// Um exemplo de leitura do conteúdo de um nó de texto e de um comentário:

// ```html
// <body>
//   Olá
//   <script>
//     let text = document.body.firstChild;
//     alert(text.data); // Olá

//     let comment = text.nextSibling;
//     alert(comment.data); // Comentário
//   </script>
// </body>
// ```

// Para nós de texto, podemos imaginar uma razão para lê-los ou modificá-los, mas por que comentários?
// Às vezes, os desenvolvedores incorporam informações ou instruções de modelo em HTML através deles, como neste exemplo:

// ```html
// <div>Bem-vindo, Admin!</div>
// ```

// …Então o JavaScript pode lê-los da propriedade `data` e processar as instruções incorporadas.

// -----

// ### `textContent`: Texto Puro

// A propriedade `textContent` oferece acesso ao texto dentro do elemento: apenas o texto, sem nenhuma *tag* HTML.
// Por exemplo:

// ```html
// <div id="news">
//   <h1>Manchete!</h1>
//   <p>Marcianos atacam pessoas!</p>
// </div>
// <script>
//   // Manchete! Marcianos atacam pessoas!
//   alert(news.textContent);
// </script>
// ```

// Como podemos observar, apenas o texto é retornado, como se todas as `<tags>` tivessem sido removidas, mas seu conteúdo de texto permanecesse. Na prática, a leitura de tal texto raramente é necessária.
// Escrever em `textContent` é muito mais útil, pois permite inserir texto de maneira "segura".
// Digamos que temos uma *string* arbitrária, por exemplo, inserida por um usuário, e queremos exibi-la.

//   * Com `innerHTML`, ela seria inserida "como HTML", com todas as *tags* HTML.
//   * Com `textContent`, ela seria inserida "como texto", e todos os símbolos seriam tratados literalmente.

// Compare os dois:

// ```html
// <div id="elem1"></div>
// <div id="elem2"></div>
// <script>
//   let name = prompt("Qual é o seu nome?", "<b>Ursinho Pooh!</b>");

//   elem1.innerHTML = name;
//   elem2.textContent = name;
// </script>
// ```

// A primeira `<div>` recebe o nome "como HTML": todas as *tags* se tornam *tags* de fato, então vemos o nome em negrito.
// A segunda `<div>` recebe o nome "como texto", então literalmente vemos `<b>Ursinho Pooh!</b>`.
// Na maioria dos casos, esperamos um texto do usuário e queremos tratá-lo como texto. Não desejamos HTML inesperado em nosso *site*. Uma atribuição a `textContent` faz exatamente isso.

// -----

// ### A Propriedade `hidden`

// O atributo `hidden` e a propriedade DOM especificam se o elemento está visível ou não.
// Podemos usá-lo em HTML ou atribuí-lo usando JavaScript, da seguinte forma:

// ```html
// <div>Ambas as divs abaixo estão ocultas</div>
// <div hidden>Com o atributo "hidden"</div>
// <div id="elem">JavaScript atribuiu a propriedade "hidden"</div>
// <script>
//   elem.hidden = true;
// </script>
// ```

// Tecnicamente, `hidden` funciona de maneira semelhante a `style="display:none"`, mas é mais conciso de escrever.
// Aqui está um exemplo de um elemento piscando:

// ```html
// <div id="elem">Um elemento piscando</div>
// <script>
//   setInterval(() => elem.hidden = !elem.hidden, 1000);
// </script>
// ```

// -----

// ### Mais Propriedades

// Os elementos DOM também possuem propriedades adicionais, em particular aquelas que dependem da classe:

//   * **`value`**: O valor para `<input>`, `<select>` e `<textarea>` (`HTMLInputElement`, `HTMLSelectElement`…).
//   * **`href`**: O "href" para `<a href="...">` (`HTMLAnchorElement`).
//   * **`id`**: O valor do atributo "id", para todos os elementos (`HTMLElement`).
//   * …e muito mais…

// Por exemplo:

// ```html
// <input type="text" id="elem" value="valor">
// <script>
//   alert(elem.type);  // "text"
//   alert(elem.id);    // "elem"
//   alert(elem.value); // valor
// </script>
// ```

// A maioria dos atributos HTML padrão possui uma propriedade DOM correspondente, e podemos acessá-la dessa forma.
// Se você deseja conhecer a lista completa de propriedades suportadas para uma determinada classe, pode encontrá-las na especificação. Por exemplo, `HTMLInputElement` está documentado em [https://html.spec.whatwg.org/\#htmlinputelement](https://html.spec.whatwg.org/#htmlinputelement).
// Alternativamente, para obter informações rapidamente ou se estiver interessado em uma especificação de navegador específica, você sempre pode exibir o elemento usando `console.dir(elem)` e ler suas propriedades, ou explorar as "DOM properties" na aba Elementos das ferramentas de desenvolvedor do navegador.

// -----

// ### Resumo

// Cada nó DOM pertence a uma classe específica, e essas classes formam uma hierarquia. O conjunto completo de propriedades e métodos de um nó é o resultado dessa herança.

// As principais propriedades dos nós DOM são:

//   * **`nodeType`**:
//     Pode ser usado para determinar se um nó é de texto ou de elemento. Possui um valor numérico: 1 para elementos, 3 para nós de texto, e alguns outros para outros tipos de nó. É somente leitura.

//   * **`nodeName`/`tagName`**:
//     Para elementos, é o nome da *tag* (em maiúsculas, a menos que esteja no modo XML). Para nós que não são elementos, `nodeName` descreve seu tipo. É somente leitura.

//   * **`innerHTML`**:
//     O conteúdo HTML do elemento. Pode ser modificado.

//   * **`outerHTML`**:
//     O HTML completo do elemento. Uma operação de escrita em `elem.outerHTML` não modifica o próprio `elem`. Em vez disso, ele é substituído pelo novo HTML no contexto externo.

//   * **`nodeValue`/`data`**:
//     O conteúdo de um nó que não é elemento (texto, comentário). Essas duas propriedades são quase idênticas; geralmente `data` é mais utilizada. Podem ser modificadas.

//   * **`textContent`**:
//     O texto dentro do elemento: HTML sem as `<tags>`. Escrever nessa propriedade insere o texto dentro do elemento, tratando todos os caracteres especiais e *tags* literalmente. Isso permite inserir texto gerado pelo usuário com segurança e protege contra inserções de HTML indesejadas.

//   * **`hidden`**:
//     Quando definida como `true`, funciona de forma semelhante a `CSS display:none`.

// Os nós DOM também possuem outras propriedades que variam de acordo com sua classe. Por exemplo, elementos `<input>` (`HTMLInputElement`) suportam `value` e `type`, enquanto elementos `<a>` (`HTMLAnchorElement`) suportam `href`, etc. A maioria dos atributos HTML padrão possui uma propriedade DOM correspondente.

// No entanto, é importante notar que atributos HTML e propriedades DOM nem sempre são idênticos, como será visto no próximo capítulo.