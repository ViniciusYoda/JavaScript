// Os tipos de dados

// Um valor em JavaScript é sempre de um certo tipo. Por exemplo, uma string ou um número.

// Existem oito tipos de dados básicos em JavaScript. Aqui, vamos cobri-los em geral e nos próximos capítulos vamos falar sobre cada um deles em detalhes.

// Podemos colocar qualquer tipo em uma variável. Por exemplo, uma variável pode ser em um momento uma string e, em seguida, armazenar um número:

// // no error
// let message = "hello";
// message = 123456;

// Linguagens de programação que permitem tais coisas, como JavaScript, são chamadas de “tipos dinamicamente”, o que significa que existem tipos de dados, mas as variáveis não estão vinculadas a nenhuma delas.
// Número de pessoas

// let n = 123;
// n = 12.345;

// O tipo de número representa números inteiros e de ponto flutuante.

// Existem muitas operações para números, por exemplo, multiplicação *, divisão /, adiagem +, subtração -, e assim por diante.

// Além dos números regulares, existem os chamados “valores numéricos especiais” que também pertencem a este tipo de dados: Infinity,, , - A , de pé sobre o que sobre o rodeas de rodeas de rodeas de rodeas de rodeas, de , de conta. , de , de que sobre o que sobre -InfinityE a NaN- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comando

//     Infinityrepresenta o Infinito matemático . É um valor especial que é maior do que qualquer número.

//     Podemos obtê-lo como resultado da divisão por zero:

// alert( 1 / 0 ); // Infinity

// Ou apenas faça referência diretamente:

// alert( Infinity ); // Infinity

// NaNrepresenta um erro computacional. É um resultado de uma operação matemática incorreta ou indefinida, por exemplo:

// alert( "not a number" / 2 ); // NaN, such division is erroneous

// NaN- É pegajoso. Qualquer outra operação matemática em NaNDevoluções NaN:

//     alert( NaN + 1 ); // NaN
//     alert( 3 * NaN ); // NaN
//     alert( "not a number" / 2 - 1 ); // NaN

//     Então, se houver um NaNEm algum lugar em uma expressão matemática, ele se propaga para todo o resultado (há apenas uma exceção a isso: NaN ** 0É 1) Em que o assunto (em inglês, a e o . . . . em (e), a seguir em (em inglês), a e o.

// As operações matemáticas são seguras

// Fazer matemática é “seguro” em JavaScript. Podemos fazer qualquer coisa: dividir por zero, tratar strings não-numéricas como números, etc.

// O script nunca vai parar com um erro fatal (“morrer”). Na pior das hipóteses, nós vamos ter NaNComo resultado.

// Os valores numéricos especiais pertencem formalmente ao tipo “número”. Claro que eles não são números no senso comum desta palavra.

// Vamos ver mais sobre como trabalhar com números no capítulo Números.
// BigIntTradução

// Em JavaScript, o tipo “número” não pode representar com segurança valores inteiros maiores do que (253-1)(isso é 9007199254740991), ou menos do que -(253-1)para os negativos.

// Para ser realmente preciso, o tipo de “número” pode armazenar inteiros maiores (até 1.7976931348623157 * 10308), mas fora da faixa inteira segura ±(253-1)Haverá um erro de precisão, porque nem todos os dígitos se encaixam no armazenamento fixo de 64 bits. Assim, um valor “aproximado” pode ser armazenado.

// Por exemplo, esses dois números (logo acima do intervalo seguro) são os mesmos:

// console.log(9007199254740991 + 1); // 9007199254740992
// console.log(9007199254740991 + 2); // 9007199254740992

// Então, para dizer, todos os inteiros estranhos maiores do que (253-1)Não pode ser armazenado de forma alguma no tipo “número”.

// Para a maioria dos propósitos ±(253-1)O alcance é suficiente, mas às vezes precisamos de toda a gama de inteiros realmente grandes, por exemplo, para magnetografia ou mósforos de microssegundos-precisão.

// BigIntO tipo foi recentemente adicionado à linguagem para representar inteiros de comprimento arbitrário.

// A BigIntO valor é criado por anexar nAté ao final de um inteiro:

// // the "n" at the end means it's a BigInt
// const bigInt = 1234567890123456789012345678901234567890n;

// Como aproxucesso BigIntOs números raramente são necessários, não os cobrimos aqui, mas dedicamos a eles um capítulo separado BigInt. Leia quando precisar de números tão grandes.
// StringTradução

// Uma string em JavaScript deve ser cercada por citações.

// let str = "Hello";
// let str2 = 'Single quotes are ok too';
// let phrase = `can embed another ${str}`;

// Em JavaScript, existem três tipos de citações.

//     Citações duplas: "Hello"- A . (í a questão: e
//     Citação única: 'Hello'- A . (í a questão: e
//     Backticks (em inglês): `Hello`- A . (í a questão: e

// Citações duplas e únicas são citações “simples”. Não há praticamente nenhuma diferença entre eles em JavaScript.

// Backticks são citações de “funcionalidade estendida”. Eles nos permitem incorporar variáveis e expressões em uma cadeia, envolvendo-as embrulhando-as em ${…}, por exemplo:

// let name = "John";

// // embed a variable
// alert( `Hello, ${name}!` ); // Hello, John!

// // embed an expression
// alert( `the result is ${1 + 2}` ); // the result is 3

// A expressão dentro ${…}é avaliado e o resultado torna-se uma parte da cadeia. Nós podemos colocar qualquer coisa lá: uma variável como nameou uma expressão aritmética como 1 + 2ou algo mais complexo.

// Por favor, note que isso só pode ser feito em backticks. Outras citações não têm essa funcionalidade de incorporação!

// alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)

// Vamos cobrir as cordas mais completamente no capítulo Cordas.
// Não existe um tipo de personagem.

// Em alguns idiomas, existe um tipo “caráter” especial para um único caractere. Por exemplo, na linguagem C e em Java é chamado de “char”.

// Em JavaScript, não existe esse tipo. Só há um tipo: string- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . Uma string pode consistir em caracteres zero (seja vazio), um personagem ou muitos deles.
// Booleano (tipo lógico)

// O tipo booleano tem apenas dois valores: trueE a false- A . (í a questão: es. , , , íntepe

// Este tipo é comumente usado para armazenar valores de sim/não: truesignifica “sim, correto”, e falseSignifica “não, incorreto”.

// Por exemplo:

// let nameFieldChecked = true; // yes, name field is checked
// let ageFieldChecked = false; // no, age field is not checked

// Os valores booleanos também vêm como resultado de comparações:

// let isGreater = 4 > 1;

// alert( isGreater ); // true (the comparison result is "yes")

// Vamos cobrir os booleanos mais profundamente no capítulo Operadores lógicos.
// O valor “nulo”

// O especial nullO valor não pertence a nenhum dos tipos descritos acima.

// Ele forma um tipo separado próprio que contém apenas o seu próprio tipo que contém apenas o nullValor geral:

// let age = null;

// Em JavaScript, nullNão é uma “referência a um objeto não existente” ou um “ponder nulo” como em algumas outras línguas.

// É apenas um valor especial que representa “nada”, “vazio” ou “valor desconhecido”.

// O código acima diz que ageÉ desconhecido.
// O valor “indefinido”

// O valor especial undefinedTambém se destaca. Ele faz um tipo próprio, assim como null- A . (í a questão: es. , , , íntepe

// O significado de undefinedÉ “valor não é atribuído”.

// Se uma variável é declarada, mas não atribuída, então seu valor é undefined:

// let age;

// alert(age); // shows "undefined"

// Tecnicamente, é possível atribuir explicitamente undefinedPara uma variável:

// let age = 100;

// // change the value to undefined
// age = undefined;

// alert(age); // "undefined"

// Mas não recomendamos fazer isso. Normalmente, um deles usa nullatribuir um valor “vazio” ou “desconhecido” a uma variável, enquanto undefinedé reservado como um valor inicial padrão para coisas não atribuídas.
// Os objetos e os símbolos

// O que é objectO tipo é especial.

// Todos os outros tipos são chamados de “primitivos” porque seus valores podem conter apenas uma única coisa (seja uma cadeia de caracteres ou um número ou qualquer outra coisa). Em contraste, objetos são usados para armazenar coleções de dados e entidades mais complexas.

// Sendo tão importantes, os objetos merecem um tratamento especial. Vamos lidar com eles mais adiante no capítulo Objetos, depois de aprendermos mais sobre primitivos.

// O que é symbolO tipo é usado para criar identificadores exclusivos para objetos. Temos que mencioná-lo aqui por uma questão de completude, mas também adiar os detalhes até conhecermos os objetos.
// O tipo de operador

// O que é typeofO operador retorna o tipo de operando. É útil quando queremos processar valores de diferentes tipos de forma diferente ou apenas queremos fazer uma verificação rápida.

// Uma chamada para typeof xretorna uma string com o nome do tipo:

// typeof undefined // "undefined"

// typeof 0 // "number"

// typeof 10n // "bigint"

// typeof true // "boolean"

// typeof "foo" // "string"

// typeof Symbol("id") // "symbol"

// typeof Math // "object"  (1)

// typeof null // "object"  (2)

// typeof alert // "function"  (3)

// As três últimas linhas podem precisar de explicações adicionais:

//     Mathé um objeto interno que fornece operações matemáticas. Vamos aprender isso no capítulo Números. Aqui, ele serve apenas como um exemplo de um objeto.
//     O resultado de typeof nullÉ "object"- A . (í a questão: es. , , , íntepeo. . E. . Isso é um erro oficialmente reconhecido em typeof, vindo de dias muito cedo de JavaScript e mantido para compatibilidade. Definitivamente, nullNão é um objeto. É um valor especial com um tipo separado de seu próprio. O comportamento de typeof- Está errado aqui.
//     O resultado de typeof alertÉ "function", porque alertÉ uma função. Estudaremos funções nos próximos capítulos onde também veremos que não há tipo especial de “função” em JavaScript. As funções pertencem ao tipo de objeto. - Mas a questão. Atrasa typeoftrata-os de forma diferente, retornando "function"- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comandos e. . sobre a questão , , Isso também vem dos primeiros dias do JavaScript. Tecnicamente, esse comportamento não é correto, mas pode ser conveniente na prática.

// O que é typeof(x)Sintaxe

// Você também pode encontrar outra sintaxe: typeof(x)- A . (í a questão: es. , , , íntepe É o mesmo que typeof x- A . (í a questão: es. , , , íntepe

// Para colocá-lo claro: typeofé um operador, não uma função. Os parênteses aqui não fazem parte typeof- A . (í a questão: es. , , , íntepeo. . E. . es É o tipo de parênteses usados para o agrupamento matemático.

// Normalmente, tais parênteses contêm uma expressão matemática, como (2 + 2)Mas aqui eles contêm apenas um argumento (x)- A . (í a questão: es. , , , íntepeo. . E. Sintaticamente, eles permitem evitar um espaço entre o typeofOperador e seu argumento, e algumas pessoas gostam dele.

// Algumas pessoas preferem typeof(x), apesar do typeof xA sintaxe é muito mais comum.
// Sumário

// Existem 8 tipos básicos de dados em JavaScript.

//     Sete tipos de dados primitivos:
//         numberpara números de qualquer tipo: inteiros ou pontos flutuantes, os inteiros são limitados por ±(253-1)- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio
//         bigintpara números inteiros de comprimento arbitrário.
//         stringpara as cordas. Uma string pode ter zero ou mais caracteres, não há nenhum tipo de personagem único separado.
//         booleanpara true/ / A informação a quefalse- A . (í
//         nullpara valores desconhecidos – um tipo autônomo que tem um único valor null- A . (í a questão: es. , , , íntepeo. . E. .
//         undefinedpara valores não atribuídos – um tipo autônomo que tem um único valor undefined- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão
//         symbolpara identificadores únicos.
//     E um tipo de dados não primitivo:
//         objectpara estruturas de dados mais complexas.

// O que é typeofO operador nos permite ver qual tipo é armazenado em uma variável.

//     Geralmente usado como typeof x, mas a typeof(x)também é possível.
//     Retorna uma string com o nome do tipo, como "string"- A . (í a questão: es. , , , íntepeo. .
//     Para nullDevoluções "object"– Isso é um erro na linguagem, não é realmente um objeto.

// Nos próximos capítulos, vamos nos concentrar em valores primitivos e, uma vez familiarizados com eles, passaremos para os objetos.