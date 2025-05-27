// // Olá, mundo!

// // Esta parte do tutorial é sobre o núcleo JavaScript, a linguagem em si.

// // Mas precisamos de um ambiente de trabalho para executar nossos scripts e, como este livro está online, o navegador é uma boa escolha. Vamos manter a quantidade de comandos específicos do navegador (como alert) ao mínimo para que você não gaste tempo com eles se planeja se concentrar em outro ambiente (como Node.js). Vamos focar no JavaScript no navegador na próxima parte do tutorial.

// // Então, primeiro, vamos ver como anexamos um script a uma página da web. Para ambientes do lado do servidor (como Node.js), você pode executar o script com um comando como "node my.js"- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e
// // A tag “roteiro”

// // Os programas JavaScript podem ser inseridos em praticamente qualquer lugar em um documento HTML usando o <script>- Tag.

// // Por exemplo:

// // <!DOCTYPE HTML>
// // <html>

// // <body>

// //   <p>Before the script...</p>

// //   <script>
// //     alert( 'Hello, world!' );
// //   </script>

// //   <p>...After the script.</p>

// // </body>

// // </html>

// // Você pode executar o exemplo clicando no botão "Play" no canto superior direito da caixa acima.

// // O que é <script>A tag contém código JavaScript que é executado automaticamente quando o navegador processa a tag.
// // Marcação moderna

// // O que é <script>tag tem alguns atributos que raramente são usados hoje em dia, mas ainda pode ser encontrado em código antigo:

// // O que é typeatributo: <script type=…>

// //     O antigo padrão HTML, HTML4, exigia um script para ter um type- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio Geralmente era type="text/javascript"- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio Já não é necessário. Além disso, o padrão HTML moderno mudou totalmente o significado deste atributo. Agora, pode ser usado para módulos JavaScript. Mas esse é um tópico avançado, vamos falar sobre módulos em outra parte do tutorial.
// // O que é languageatributo: <script language=…>

// //     Este atributo foi concebido para mostrar a linguagem do script. Esse atributo não faz mais sentido porque o JavaScript é o idioma padrão. Não há necessidade de usá-lo.
// // Comentários antes e depois dos scripts.

// //     Em livros e guias realmente antigos, você pode encontrar comentários dentro <script>Tags, como esta:

// {/* <script type="text/javascript"><!--
//     ...
// //--></script> */}

//     Este truque não é usado em JavaScript moderno. Esses comentários escondem o código JavaScript de navegadores antigos que não sabiam como processar o <script>- Tag. Como os navegadores lançados nos últimos 15 anos não têm esse problema, esse tipo de comentário pode ajudá-lo a identificar código muito antigo.

// Roteiros externos

// Se tivermos muito código JavaScript, podemos colocá-lo em um arquivo separado.

// Os arquivos de script são anexados ao HTML com o srcatributo:

// <script src="/path/to/script.js"></script>

// Aqui, /path/to/script.jsé um caminho absoluto para o script a partir da raiz do site. Pode-se também fornecer um caminho relativo a partir da página atual. Por exemplo, src="script.js", assim como src="./script.js", significaria um ficheiro "script.js"na pasta atual.

// Também podemos dar uma URL completa. Por exemplo:

// <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>

// Para anexar vários scripts, use várias tags:

// <script src="/js/script1.js"></script>
// <script src="/js/script2.js"></script>
// …

// Por favor, note:

// Como regra, apenas os scripts mais simples são colocados em HTML. Os mais complexos residem em arquivos separados.

// O benefício de um arquivo separado é que o navegador irá baixá-lo e armazená-lo em seu cache.

// Outras páginas que fazem referência ao mesmo script o levarão do cache em vez de baixá-lo, de modo que o arquivo seja baixado apenas uma vez.

// Isso reduz o tráfego e torna as páginas mais rápidas.
// Se for srcÉ definido, o conteúdo do script é ignorado.

// Um single <script>Tag não pode ter ambos os srcatributo e código dentro.

// Isso não vai funcionar:

// <script src="file.js">
//   alert(1); // the content is ignored, because src is set
// </script>

// Devemos escolher qualquer um dos produtos externos <script src="…">ou um regular <script>com o código.

// O exemplo acima pode ser dividido em dois scripts para trabalhar:

// <script src="file.js"></script>
// <script>
//   alert(1);
// </script>

// Sumário

//     Nós podemos usar a <script>tag para adicionar código JavaScript a uma página.
//     O que é typeE a languageOs atributos não são necessários.
//     Um script em um arquivo externo pode ser inserido com <script src="path/to/script.js"></script>- A . (í a questão: es. , , , íntepe

// Há muito mais a saber sobre scripts de navegador e sua interação com a página da web. Mas vamos ter em mente que esta parte do tutorial é dedicada à linguagem JavaScript, por isso não devemos nos distrair com implementações específicas do navegador. Vamos usar o navegador como uma maneira de executar JavaScript, o que é muito conveniente para leitura online, mas apenas um de muitos.