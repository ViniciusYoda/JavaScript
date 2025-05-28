// Operadores básicos, matemática

// Conhecemos muitos operadores da escola. São coisas como adição +, multiplicação *, subtração -, e assim por diante.

// Neste capítulo, começaremos com operadores simples e, em seguida, nos concentraremos em aspectos específicos de JavaScript, não cobertos pela aritmética da escola.
// Termos: “unary”, “binary”, “operand”

// Antes de seguir em frente, vamos entender alguma terminologia comum.

//     Um operando é o que os operadores são aplicados. Por exemplo, na multiplicação de 5 * 2Há dois operandos: o operando à esquerda é 5E o operando certo é 2- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão Por vezes, as pessoas chamam esses “argumentos” em vez de “operands”.

//     Um operador é unário se tiver um único operando. Por exemplo, a negação unária -inverte o sinal de um número:

// let x = 1;

// x = -x;
// alert( x ); // -1, unary negation was applied

// Um operador é binário se tiver dois operandos. O mesmo menos existe também na forma binária:

//     let x = 1, y = 3;
//     alert( y - x ); // 2, binary minus subtracts values

//     Formalmente, nos exemplos acima temos dois operadores diferentes que compartilham o mesmo símbolo: o operador de negação, um operador unário que inverte o sinal e o operador de subtração, um operador binário que subtrai um número de outro.

// Matemática

// As seguintes operações matemáticas são suportadas:

//     Adição +,, , -
//     Subtração -,, , -
//     Multiplicação *,, , - A
//     Divisão /,, , -
//     RemainderTradução %,, , - A
//     Exposição de exposição **- A . (í a questão: e

// Os quatro primeiros são simples, enquanto %E a **Preciso de algumas palavras sobre eles.
// Permanecer %

// O restante operador %, apesar de sua aparência, não está relacionado com por cento.

// O resultado de a % bé o restante da divisão inteira de aPor a sua forma de b- A . (í a questão: es. , , , íntepe

// Por exemplo:

// alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
// alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
// alert( 8 % 4 ); // 0, the remainder of 8 divided by 4

// Exposição de exposição ?

// O operador da exponenciação a ** braises (tradução) apara o poder de b- A . (í a questão: es. ,

// Na matemática escolar, escrevemos isso como bb.

// Por exemplo:

// alert( 2 ** 2 ); // 2² = 4
// alert( 2 ** 3 ); // 2³ = 8
// alert( 2 ** 4 ); // 2⁴ = 16

// Assim como em matemática, o operador de exponenciação é definido para números não inteiros também.

// Por exemplo, uma raiz quadrada é uma exponenciação por 1x2:

// alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
// alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)

// Convenção estridente com binário +

// Vamos conhecer os recursos dos operadores JavaScript que estão além dos aritméticos escolares.

// Normalmente, o operador plus +Números de somas.

// Mas se o binário +é aplicado em strings, funde (concatenate) eles:

// let s = "my" + "string";
// alert(s); // mystring

// Note que se qualquer um dos operandos é uma cadeia de caracteres, então o outro é convertido em uma string também.

// Por exemplo:

// alert( '1' + 2 ); // "12"
// alert( 2 + '1' ); // "21"

// Veja, não importa se o primeiro operando é uma string ou a segunda.

// Aqui está um exemplo mais complexo:

// alert(2 + 2 + '1' ); // "41" and not "221"

// Aqui, os operadores trabalham um após o outro. O primeiro +soma dois números, então ele retorna 4, então o próximo +adiciona a corda 1para isso, então é como 4 + '1' = '41'- A . (í a questão: es. , , ,

// alert('1' + 2 + 2); // "122" and not "14"

// Aqui, o primeiro operando é uma corda, o compilador trata os outros dois operandos como cordas também. O que é 2Fica concatenado para '1', então é como '1' + 2 = "12"E a "12" + 2 = "122"- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comandos e. . sobre

// O binário +é o único operador que suporta strings dessa maneira. Outros operadores aritméticos trabalham apenas com números e sempre convertem seus operandos em números.

// Aqui está a demonstração para subtração e divisão:

// alert( 6 - '2' ); // 4, converts '2' to a number
// alert( '6' / '2' ); // 3, converts both operands to numbers

// Conversão numérica, unário +

// O mais +existe em duas formas: a forma binária que usamos acima e a forma unária.

// O plus unário ou, em outras palavras, o operador plus +Aplicado a um único valor, não faz nada para números. Mas se o operando não é um número, o unário mais converte em um número.

// Por exemplo:

// // No effect on numbers
// let x = 1;
// alert( +x ); // 1

// let y = -2;
// alert( +y ); // -2

// // Converts non-numbers
// alert( +true ); // 1
// alert( +"" );   // 0

// Ele realmente faz a mesma coisa que Number(...), mas é mais curto.

// A necessidade de converter strings em números surge com muita frequência. Por exemplo, se estamos obtendo valores de campos de formulário HTML, eles são geralmente strings. E se quisermos somorrá-los?

// O binário plus iria adicioná-los como strings:

// let apples = "2";
// let oranges = "3";

// alert( apples + oranges ); // "23", the binary plus concatenates strings

// Se quisermos tratá-los como números, precisamos convertê-los e, em seguida, soma-los:

// let apples = "2";
// let oranges = "3";

// // both values converted to numbers before the binary plus
// alert( +apples + +oranges ); // 5

// // the longer variant
// // alert( Number(apples) + Number(oranges) ); // 5

// Do ponto de vista de um matemático, a abundância de vantagens pode parecer estranha. Mas do ponto de vista de um programador, não há nada de especial: as vantagens unárias são aplicadas primeiro, elas convertem strings em números e, em seguida, o binário mais as resume.

// Por que os pluses unários são aplicados a valores antes dos binários? Como vamos ver, isso é por causa de sua maior precedência.
// Previsão do operador

// Se uma expressão tiver mais de um operador, a ordem de execução é definida pela sua precedência ou, em outras palavras, pela ordem de prioridade padrão dos operadores.

// Da escola, todos sabemos que a multiplicação na expressão 1 + 2 * 2deve ser calculado antes da adição. Essa é exatamente a coisa de precedência. Diz-se que a multiplicação tem uma precedência maior do que a adição.

// Os parênteses anulam qualquer precedência, por isso, se não estivermos satisfeitos com a ordem padrão, podemos usá-los para alterá-la. Por exemplo, escreva (1 + 2) * 2- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comandos e. . sobre a questão , , .

// Existem muitos operadores em JavaScript. Cada operador tem um número de precedência correspondente. O que tem o maior número é executado primeiro. Se a precedência for a mesma, a ordem de execução é da esquerda para a direita.

// Aqui está um extrato da tabela de precedência (você não precisa se lembrar disso, mas observe que os operadores unários são maiores do que os binários correspondentes):
// A precedência 	Nome 	Assinar
// ... 	... 	...
// 14 	unary plus (em inglês) 	+
// 14 	Negação unary 	-
// 13 - O que 	Exponenciação 	**
// 12 	multiplicação 	*
// 12 	A divisão 	/
// 11 	Adição 	+
// 11 	Subtração 	-
// ... 	... 	...
// 2 	atribuição 	=
// ... 	... 	...

// Como podemos ver, o “unary plus” tem uma prioridade de 14que é mais alto do que o 11de “adiação” (binária mais). É por isso que, na expressão "+apples + +oranges", pluses unary funcionam antes da adição.
// Atribuição

// Vamos notar que uma tarefa =É também um operador. Está listado na tabela de precedência com a prioridade muito baixa de 2- A . (í a questão: es. , , , íntepeo. . E. .

// É por isso que, quando atribuímos uma variável, como x = 2 * 2 + 1, os cálculos são feitos primeiro e, em seguida, o =é avaliado, armazenando o resultado em x- A . (í a questão: es. , , , íntepeo. .

// let x = 2 * 2 + 1;

// alert( x ); // 5

// Atribuição ? retorna um valor

// O fato de =sendo um operador, não uma construção de linguagem “mágica” tem uma implicação interessante.

// Todos os operadores em JavaScript retornam um valor. Isso é óbvio para +E a -, mas também é verdade para =- A . (í a questão: es. , , ,

// A chamada x = valueEscreve o valueEm que você xE depois o devolve.

// Aqui está uma demonstração que usa uma atribuição como parte de uma expressão mais complexa:

// let a = 1;
// let b = 2;

// let c = 3 - (a = b + 1);

// alert( a ); // 3
// alert( c ); // 0

// No exemplo acima, o resultado da expressão (a = b + 1)é o valor que foi atribuído a a(isso é 3) Em que o assunto (em inglês, a e o . . . Em seguida, é usado para novas avaliações.

// Código engraçado, não é? Devemos entender como funciona, porque às vezes o vemos em bibliotecas JavaScript.

// Mas, por favor, não escreva o código assim. Esses truques definitivamente não deixam o código mais claro ou legível.
// Atribuições de acorrentado

// Outra característica interessante é a capacidade de acorrentar atribuições:

// let a, b, c;

// a = b = c = 2 + 2;

// alert( a ); // 4
// alert( b ); // 4
// alert( c ); // 4

// As atribuições em cadeia avaliam da direita para a esquerda. Em primeiro lugar, a expressão mais correta 2 + 2é avaliado e, em seguida, atribuído às variáveis à esquerda: c,, , - A , de pé sobre o que sobre o rodeas de rodeas de rodeas de rode bE a a- A . (í a questão: es. , , , íntepeo. . No final, todas as variáveis compartilham um único valor.

// Mais uma vez, para fins de legibilidade, é melhor dividir esse código em poucas linhas:

// c = 2 + 2;
// b = c;
// a = c;

// Isso é mais fácil de ler, especialmente quando escanear o código rapidamente.
// Modificar-no-lo

// Muitas vezes, precisamos aplicar um operador a uma variável e armazenar o novo resultado na mesma variável.

// Por exemplo:

// let n = 2;
// n = n + 5;
// n = n * 2;

// Esta notação pode ser encurtada usando os operadores +=E a *=:

// let n = 2;
// n += 5; // now n = 7 (same as n = n + 5)
// n *= 2; // now n = 14 (same as n = n * 2)

// alert( n ); // 14

// Operadores curtos de “modify-and-assign” existem para todos os operadores aritméticos e bits: /=,, , - A , de pé sobre o que sobre o rodeas de rodeas de rodeas de rodeas de rodeas, de , de conta. , de , de que sobre o que sobre o que sobre o -=, etc.

// Esses operadores têm a mesma precedência que uma atribuição normal, então eles são executados após a maioria dos outros cálculos:

// let n = 2;

// n *= 3 + 5; // right part evaluated first, same as n *= 8

// alert( n ); // 16

// Incremento / decretamento

// Aumentar ou diminuir um número por um está entre as operações numéricas mais comuns.

// Então, existem operadores especiais para isso:

//     Incremento ++Aumenta uma variável em 1:

// let counter = 2;
// counter++;        // works the same as counter = counter + 1, but is shorter
// alert( counter ); // 3

// Decremento --Diminui uma variável em 1:

//     let counter = 2;
//     counter--;        // works the same as counter = counter - 1, but is shorter
//     alert( counter ); // 1

// Importante:

// O incremento/cremento só pode ser aplicado a variáveis. Tentando usá-lo em um valor como 5++Vai dar um erro.

// Os operadores ++E a --pode ser colocado antes ou depois de uma variável.

//     Quando o operador vai atrás da variável, está em “forma pósfixa”: counter++- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão
//     O “formulamento de prefixo” é quando o operador vai antes da variável: ++counter- A . (í a questão: es. , , , íntepeo. . E. . es

// Ambas as afirmações fazem a mesma coisa: aumento counterPor a sua forma de 1- A . (í a questão: es. , , , íntepe

// Há alguma diferença? Sim, mas só podemos vê-lo se usarmos o valor retornado de ++/--- A . (í a questão: es. , , , íntepeo. . E. . es

// Vamos esclarecer. Como sabemos, todos os operadores retornam um valor. Incremento/descremento não é exceção. O formulário de prefixo retorna o novo valor enquanto o formulário postfix retorna o valor antigo (antes de incrementar/decremento).

// Para ver a diferença, aqui está um exemplo:

// let counter = 1;
// let a = ++counter; // (*)

// alert(a); // 2

// Na linha (*), a forma do prefixo ++counterincrementos countere retorna o novo valor, 2- A . (í a questão: es. , Então, o alertMostras 2- A . (í a questão: es. ,

// Agora, vamos usar o formulário postfix:

// let counter = 1;
// let a = counter++; // (*) changed ++counter to counter++

// alert(a); // 1

// Na linha (*), o formulário de postfix counter++também incrementos countermas retorna o valor antigo (antes de incrementar). Então, o alertMostras 1- A . (í a questão: es. , , , íntepeo.

// Para resumir:

//     Se o resultado do incremento/descremento não for usado, não há diferença em que forma usar:

// let counter = 0;
// counter++;
// ++counter;
// alert( counter ); // 2, the lines above did the same

// Se quisermos aumentar um valor e usar imediatamente o resultado do operador, precisamos do formulário de prefixo:

// let counter = 0;
// alert( ++counter ); // 1

// Se quisermos incrementar um valor, mas usar seu valor anterior, precisamos do formulário postfix:

//     let counter = 0;
//     alert( counter++ ); // 0

// Incremento/descrição entre outros operadores

// Os operadores ++/--também pode ser usado dentro de expressões. Sua precedência é maior do que a maioria das outras operações aritméticas.

// Por exemplo:

// let counter = 1;
// alert( 2 * ++counter ); // 4

// Compare com:

// let counter = 1;
// alert( 2 * counter++ ); // 2, because counter++ returns the "old" value

// Embora tecnicamente ok, tal notação geralmente torna o código menos legível. Uma linha faz várias coisas – não é bom.

// Ao ler o código, um rápido visual “vertical” pode facilmente perder algo como counter++e não será óbvio que a variável aumentou.

// Aconselhamos um estilo de “uma linha – uma ação”:

// let counter = 1;
// alert( 2 * counter );
// counter++;

// Operadores da Bitwise

// Os operadores Bitwise tratam argumentos como números inteiros de 32 bits e trabalham no nível de sua representação binária.

// Esses operadores não são JavaScript-específicos. Eles são suportados na maioria das linguagens de programação.

// A lista de operadores:

//     E ( &) - Em relação
//     OU ( |) - Em relação
//     XOR ( ^) - Em relação .
//     Não ( ~) - Em relação
//     SELVAR DE ESQUERDA ( <<) - Em relação . . . )
//     ENVIO DIREITO ( >>) - Em relação . . . )
//     ZERO-FILL DIREITO SHIFT ( >>>) - Em relação . . . )

// Esses operadores são usados muito raramente, quando precisamos mexer com números no nível mais baixo (bits). Não precisaremos desses operadores em breve, pois o desenvolvimento web tem pouco uso deles, mas em algumas áreas especiais, como criptografia, elas são úteis. Você pode ler o capítulo Bitwise Operators sobre MDN quando surge uma necessidade.
// Comama

// O operador da vírgula ,é um dos operadores mais raros e incomuns. Por vezes, é usado para escrever um código mais curto, por isso precisamos de o saber para entender o que está acontecendo.

// O operador de vírgula permite-nos avaliar várias expressões, dividindo-as com uma vírgula ,- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . Cada um deles é avaliado, mas apenas o resultado do último é devolvido.

// Por exemplo:

// let a = (1 + 2, 3 + 4);

// alert( a ); // 7 (the result of 3 + 4)

// Aqui, a primeira expressão 1 + 2é avaliado e seu resultado é descartado. Então, 3 + 4é avaliado e retornado como resultado.
// A vírgula tem uma precedência muito baixa

// Por favor, note que o operador da vírgula tem uma precedência muito baixa, inferior a =, assim, parênteses são importantes no exemplo acima.

// Sem eles: a = 1 + 2, 3 + 4que avalia +Em primeiro lugar, somando os números em a = 3, 7, então o operador de atribuição =cessionários a = 3E o resto é ignorado. É como (a = 1 + 2), 3 + 4- A . (í a questão: es. , , ,

// Por que precisamos de um operador que jogue fora tudo, exceto a última expressão?

// Por vezes, as pessoas usam-no em construtos mais complexos para colocar várias ações numa linha.

// Por exemplo:

// // three operations in one line
// for (a = 1, b = 3, c = a * b; a < 10; a++) {
//  ...
// }

// Tais truques são usados em muitos frameworks JavaScript. É por isso que estamos mencionando-os. Mas geralmente eles não melhoram a legibilidade do código, então devemos pensar bem antes de usá-los.