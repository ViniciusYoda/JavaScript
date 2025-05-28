// Conversões de tipo

// Na maioria das vezes, os operadores e as funções convertem automaticamente os valores dados a eles no tipo certo.

// Por exemplo, alertconverte automaticamente qualquer valor em uma string para mostrá-lo. As operações matemáticas convertem valores em números.

// Há também casos em que precisamos converter explicitamente um valor para o tipo esperado.
// Ainda não estou falando de objetos

// Neste capítulo, não vamos cobrir objetos. Por enquanto, falaremos apenas de primitivos.

// Mais tarde, depois de aprendermos sobre objetos, no capítulo Objeto para conversão primitiva, veremos como os objetos se encaixam.
// Conversão de string

// A conversão de string acontece quando precisamos da forma de string de um valor.

// Por exemplo, alert(value)Faça isso para mostrar o valor.

// Também podemos chamar o String(value)Função para converter um valor em uma string:

// let value = true;
// alert(typeof value); // boolean

// value = String(value); // now value is a string "true"
// alert(typeof value); // string

// A conversão de cordas é na maior parte óbvia. A falseTorna-se "false",, , - A , de pé sobre o que sobre o nullTorna-se "null", etc.
// Conversão numérica

// A conversão numérica em funções e expressões matemáticas acontece automaticamente.

// Por exemplo, quando a divisão /é aplicado aos não-números:

// alert( "6" / "2" ); // 3, strings are converted to numbers

// Nós podemos usar o Number(value)Função para converter explicitamente a valuePara um número:

// let str = "123";
// alert(typeof str); // string

// let num = Number(str); // becomes a number 123

// alert(typeof num); // number

// A conversão explícita geralmente é necessária quando lemos um valor de uma fonte baseada em strings, como um formulário de texto, mas esperamos que um número seja inserido.

// Se a string não for um número válido, o resultado de tal conversão é NaN- A . (í a questão: es. , , , íntepeo. . E. . es. sobre Por exemplo:

// let age = Number("an arbitrary string instead of a number");

// alert(age); // NaN, conversion failed

// Regras de conversão numérica:
// Valor de propriedade 	Torna-se ...
// undefined 	NaN
// null 	0
// true and false 	1E a 0
// string 	Espaços em branco (inclui espaços, guias \t, newlines (em inglês) \netc.) desde o início e fim são removidos. Se a string restante estiver vazia, o resultado será 0- A . (í a questão: es. , , , íntepeo. . Caso contrário, o número é “ler” da cadeia de caracteres. Um erro dá NaN- A . (í a questão: es. , , , íntepeo. .

// Exemplos de informações:

// alert( Number("   123   ") ); // 123
// alert( Number("123z") );      // NaN (error reading a number at "z")
// alert( Number(true) );        // 1
// alert( Number(false) );       // 0

// Por favor, note que nullE a undefinedComporte-se de forma diferente aqui: nulltorna-se zero enquanto undefinedTorna-se NaN- A . (í a questão: e

// A maioria dos operadores matemáticos também realiza essa conversão, veremos isso no próximo capítulo.
// Conversão booleana

// A conversão booleana é a mais simples.

// Acontece em operações lógicas (mais tarde, vamos atender a testes de condição e outras coisas semelhantes), mas também pode ser realizado explicitamente com uma chamada para Boolean(value)- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comandos e. . sobre a questão , ,

// A regra da conversão:

//     Valores que são intuitivamente “vazios”, como 0, uma corda vazia, null,, , - A , de pé sobre o que sobre o rodeas de rodeas de rodeas undefined, e NaN, tornar-se false- A . (í a questão: es. , , , íntepeo.
//     Outros valores tornam-se true- A . (í a questão

// Por exemplo:

// alert( Boolean(1) ); // true
// alert( Boolean(0) ); // false

// alert( Boolean("hello") ); // true
// alert( Boolean("") ); // false

// Por favor, note: a string com zero "0"É true

// Algumas linguagens (nomeadamente PHP) tratam "0"Como a false- A . (í a questão: es. , , , íntepeo. . Mas em JavaScript, uma string não vazia é sempre true- A . (í a questão: es. , , , íntepeo. .

// alert( Boolean("0") ); // true
// alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)

// Sumário

// As três conversões de tipo mais utilizadas são para string, número e booleano.

// String ConversionOcorre quando produzimos algo. Pode ser realizado com String(value)- A . (í a questão: es. , , , íntepeo. A conversão para string é geralmente óbvia para valores primitivos.

// Numeric ConversionOcorre em operações de matemática. Pode ser realizado com Number(value)- A . (í a questão: es. , , ,

// A conversão segue as regras:
// Valor de propriedade 	Torna-se ...
// undefined 	NaN
// null 	0
// true / false 	1 / 0
// string 	A cadeia de caracteres é lida “como está”, espaços em branco (inclui espaços, guias \t, newlines (em inglês) \netc.) de ambos os lados são ignorados. Uma corda vazia se torna 0- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em Um erro dá NaN- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em

// Boolean Conversion– Ocorre em operações lógicas. Pode ser realizado com Boolean(value)- A . (í a questão: es. , , ,

// Segue as regras:
// Valor de propriedade 	Torna-se ...
// 0,, , - null,, , - undefined,, , - NaN,, , - "" 	false
// de qualquer outro valor 	true

// A maioria dessas regras é fácil de entender e memorizar. As exceções notáveis em que as pessoas geralmente cometem erros são:

//     undefinedÉ NaNcomo um número, não 0- A . (í a questão: es.
//     "0"e cordas somente de espaço como " "Eles são verdadeiros como um booleano.

// Os objetos não são cobertos aqui. Voltaremos a eles mais tarde no capítulo Objeto para a conversão primitiva que é dedicada exclusivamente a objetos depois de aprendermos coisas mais básicas sobre JavaScript.