// O modo moderno, "use rigoroso"

// Por muito tempo, o JavaScript evoluiu sem problemas de compatibilidade. Novos recursos foram adicionados ao idioma, enquanto a funcionalidade antiga não mudou.

// Isso teve o benefício de nunca quebrar o código existente. Mas a desvantagem foi que qualquer erro ou uma decisão imperfeita tomada pelos criadores do JavaScript ficou presa na linguagem para sempre.

// Este foi o caso até 2009, quando o ECMAScript 5 (ES5) apareceu. Ele adicionou novos recursos ao idioma e modificou alguns dos existentes. Para manter o código antigo funcionando, a maioria dessas modificações está desativada por padrão. Você precisa capacitá-los explicitamente com uma diretiva especial: "use strict"- A . (í a questão: es. , , , íntepeo. . E. . es. sobre
// “Use-o estrito”

// A diretiva parece uma string: "use strict"ou a 'use strict'- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio Quando está localizado no topo de um roteiro, todo o roteiro funciona da maneira “moderna”.

// Por exemplo:

// "use strict";

// // this code works the modern way
// ...

// Muito em breve vamos aprender funções (uma maneira de agrupar comandos), então vamos notar com antecedência que "use strict"pode ser colocado no início de uma função. Isso permite o modo estrito apenas nessa função. Mas geralmente as pessoas usam para todo o script.
// Certifique-se de que “use rigoroso” está no topo

// Por favor, certifique-se de que "use strict"está no topo de seus scripts, caso contrário, o modo estrito pode não estar habilitado.

// O modo Strict não está ativado aqui:

// alert("some code");
// // "use strict" below is ignored--it must be at the top

// "use strict";

// // strict mode is not activated

// Apenas comentários podem aparecer acima "use strict"- A . (í a questão: es.
// Não há como cancelar use strict

// Não há nenhuma diretiva como "no use strict"que reverte o motor para um comportamento antigo.

// Uma vez que entramos no modo estrito, não há como voltar atrás.
// Console de navegador

// Quando você usa um console de desenvolvedor para executar o código, observe que ele não use strictpor padrão.

// Por vezes, quando use strictfaz a diferença, você vai obter resultados incorretos.

// Então, como realmente use strictNo console?

// Primeiro, você pode tentar pressionar Shift+Enterpara inserir várias linhas e colocar use strictPor cima, assim:

// 'use strict'; <Shift+Enter for a newline>
// //  ...your code
// <Enter to run>

// Ele funciona na maioria dos navegadores, nomeadamente Firefox e Chrome.

// Se isso não acontecer, por exemplo, em um navegador antigo, há uma maneira feia, mas confiável, de garantir que use strict- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comandos e. . sobre Coloque-o dentro deste tipo de invólucro:

// (function() {
//   'use strict';

//   // ...your code here...
// })()

// Devemos “usar estrito”?

// A pergunta pode parecer óbvia, mas não é assim.

// Pode-se recomendar para iniciar scripts com "use strict"Mas você sabe o que é legal?

// O JavaScript moderno suporta “classes” e “módulos” – estruturas de linguagem avançadas (certamente chegaremos a elas), que permitem use strictde forma automática. Portanto, não precisamos adicionar o "use strict"directiva, se os utilizarmos.

// Então, por enquanto "use strict";É um convidado bem-vindo no topo de seus scripts. Mais tarde, quando o seu código é tudo em classes e módulos, você pode omiti-lo.

// A partir de agora, temos que saber sobre use strictem geral.

// Nos próximos capítulos, à medida que aprendemos as características da linguagem, veremos as diferenças entre os modos estritos e antigos. Felizmente, não há muitos e eles realmente melhoram nossas vidas.

// Todos os exemplos neste tutorial assumem o modo estrito, a menos que (muito raramente) especificado de outra forma.
