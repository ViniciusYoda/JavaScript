// Estrutura de código

// A primeira coisa que vamos estudar são os blocos de construção do código.
// Declarações de informação

// Declarações são construções de sintaxe e comandos que executam ações.

// Já vimos uma declaração, alert('Hello, world!'), que mostra a mensagem “Olá, mundo!”.

// Podemos ter tantas declarações em nosso código quanto quisermos. As declarações podem ser separadas com um ponto e vírgula.

// Por exemplo, aqui dividimos “Hello World” em dois alertas:

// alert('Hello'); alert('World');

// Normalmente, as instruções são escritas em linhas separadas para tornar o código mais legível:

// alert('Hello');
// alert('World');

// E-vícono de ponto vír

// Um ponto e vírgula pode ser omitido na maioria dos casos quando existe uma quebra de linha.

// Isso também funcionaria:

// alert('Hello')
// alert('World')

// Aqui, o JavaScript interpreta a quebra de linha como um ponto e vírgula “implícita”. Isso é chamado de inserção automática do ponto e vírgula.

// Na maioria dos casos, uma nova linha implica um ponto e vírgula. Mas “na maioria dos casos” não significa “sempre”!

// Há casos em que uma nova linha não significa um ponto e vírgula. Por exemplo:

// alert(3 +
// 1
// + 2);

// As saídas de código 6porque o JavaScript não insere ponto e vírgula aqui. É intuitivamente óbvio que se a linha termina com um plus "+", então é uma “expressão incompleta”, então um ponto e vírgula seria incorreto. E neste caso, isso funciona como pretendido.

// Mas há situações em que o JavaScript “não” assume um ponto e vírgula onde é realmente necessário.

// Erros que ocorrem em tais casos são bastante difíceis de encontrar e corrigir.
// Um exemplo de erro

// Se você está curioso para ver um exemplo concreto de tal erro, verifique este código:

// alert("Hello");

// [1, 2].forEach(alert);

// Não há necessidade de pensar sobre o significado dos colchetes []E a forEachAinda assim. Vamos estudá-los mais tarde. Por enquanto, lembre-se do resultado da execução do código: ele mostra Hello, então 1, então 2- A . (í a questão: es. , , , íntepeo. . E. .

// Agora vamos remover o ponto e-mail do ponto de vista alert:

// alert("Hello")

// [1, 2].forEach(alert);

// A diferença em relação ao código acima é apenas um caractere: o ponto e vírgula no final da primeira linha desapareceu.

// Se executarmos este código, somente o primeiro Hellomostra (e há um erro, talvez seja necessário abrir o console para vê-lo). Já não há números.

// Isso porque o JavaScript não assume um ponto-e-vírgula antes de colchetes [...]- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão Assim, o código no último exemplo é tratado como uma única instrução.

// Veja como o motor vê:

// alert("Hello")[1, 2].forEach(alert);

// Parece estranho, não é? Tal fusão neste caso é simplesmente errada. Precisamos colocar um ponto e vírgula depois alertpara o código funcionar corretamente.

// Isso pode acontecer em outras situações também.

// Recomendamos colocar ponto e-tocólitros entre as declarações, mesmo que estejam separadas por newlines. Esta regra é amplamente adotada pela comunidade. Vamos notar mais uma vez – é possível deixar de fora ponto e vírgula na maior parte do tempo. Mas é mais seguro – especialmente para um iniciante – usá-los.
// Comentários

// Com o passar do tempo, os programas se tornam cada vez mais complexos. Torna-se necessário adicionar comentários que descrevem o que o código faz e por quê.

// Comentários podem ser colocados em qualquer lugar de um script. Eles não afetam sua execução porque o motor simplesmente os ignora.

// Comentários de uma linha começam com dois personagens de barramento para a frente //- A . (í a questão: es. , , , íntepeo. .

// O resto da linha é um comentário. Pode ocupar uma linha completa própria ou seguir uma declaração.

// Como aqui:

// // This comment occupies a line of its own
// alert('Hello');

// alert('World'); // This comment follows the statement

// Comentários multiline começam com uma barra para a frente e um asterisco /*e terminar com um asterisco e uma barra para a frente */- A . (í a questão: es. , , , íntepeo. . E. . es

// Assim:

// /* An example with two messages.
// This is a multiline comment.
// */
// alert('Hello');
// alert('World');

// O conteúdo dos comentários é ignorado, por isso, se colocarmos o código dentro /* … */, não vai executar.

// Por vezes, pode ser útil para desativar temporariamente uma parte do código:

// /* Commenting out the code
// alert('Hello');
// */
// alert('World');

// Use as teclas de atalho!

// Na maioria dos editores, uma linha de código pode ser comentada pressionando a Ctrl+/tecla de atalho para um comentário de linha única e algo como Ctrl+Shift+/- para comentários multilinha (selecione um pedaço de código e pressione a tecla de atalho). Para Mac, tente Cmdem vez de Ctrle Optionem vez de Shift.
// Comentários aninhados não são suportados!

// Pode não haver /*...*/Dentro de outro /*...*/- A . (í a questão: e

// Esse código morrerá com um erro:

// /*
//   /* nested comment ?!? */
// */
// alert( 'World' );

// Não hesite em comentar o seu código.

// Os comentários aumentam a pegada de código geral, mas isso não é um problema. Existem muitas ferramentas que minificam o código antes de publicar em um servidor de produção. Eles removem comentários, para que não apareçam nos scripts de trabalho. Portanto, os comentários não têm efeitos negativos sobre a produção.

// Mais adiante no tutorial, haverá uma qualidade de código de capítulo que também explica como escrever melhores comentários.