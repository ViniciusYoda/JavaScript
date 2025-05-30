// Comparações
// Conhecemos muitos operadores de comparação da matemática.

// Em JavaScript eles são escritos assim:

// Maior/menor que: a > b, a < b.
// Maior/menor que ou igual a: a >= b, a <= b.
// Igual a: a == b, observe que o sinal de igualdade duplo ==significa o teste de igualdade, enquanto um único sinal a = bsignifica uma atribuição.
// Diferente de: Em matemática a notação é ≠, mas em JavaScript é escrita como a != b.
// Neste artigo, aprenderemos mais sobre os diferentes tipos de comparações, como o JavaScript as faz, incluindo peculiaridades importantes.

// No final, você encontrará uma boa receita para evitar problemas relacionados a “peculiaridades do JavaScript”.

// Booleano é o resultado
// Todos os operadores de comparação retornam um valor booleano:

// true– significa “sim”, “correto” ou “a verdade”.
// false– significa “não”, “errado” ou “não é a verdade”.
// Por exemplo:

// alert( 2 > 1 );  // true (correct)
// alert( 2 == 1 ); // false (wrong)
// alert( 2 != 1 ); // true (correct)
// Um resultado de comparação pode ser atribuído a uma variável, assim como qualquer valor:

// let result = 5 > 4; // assign the result of the comparison
// alert( result ); // true
// Comparação de strings
// Para ver se uma string é maior que outra, o JavaScript usa a chamada ordem “de dicionário” ou “lexicográfica”.

// Em outras palavras, as strings são comparadas letra por letra.

// Por exemplo:

// alert( 'Z' > 'A' ); // true
// alert( 'Glow' > 'Glee' ); // true
// alert( 'Bee' > 'Be' ); // true
// O algoritmo para comparar duas strings é simples:

// Compare o primeiro caractere de ambas as strings.
// Se o primeiro caractere da primeira string for maior (ou menor) que o da outra string, então a primeira string será maior (ou menor) que a segunda. Pronto.
// Caso contrário, se os primeiros caracteres de ambas as strings forem iguais, compare os segundos caracteres da mesma maneira.
// Repita até o final de qualquer corda.
// Se ambas as sequências terminam no mesmo comprimento, então são iguais. Caso contrário, a sequência mais longa é maior.
// No primeiro exemplo acima, a comparação 'Z' > 'A'chega a um resultado na primeira etapa.

// A segunda comparação 'Glow'precisa 'Glee'de mais etapas, pois as strings são comparadas caractere por caractere:

// Gé o mesmo que G.
// lé o mesmo que l.
// oé maior que e. Pare aqui. A primeira string é maior que .
// Não é um dicionário real, mas sim uma ordem Unicode
// O algoritmo de comparação fornecido acima é aproximadamente equivalente ao usado em dicionários ou listas telefônicas, mas não é exatamente o mesmo.

// Por exemplo, a capitalização importa. Uma letra maiúscula "A"não é igual a uma minúscula "a". Qual é maior? A minúscula "a". Por quê? Porque o caractere minúsculo tem um índice maior na tabela de codificação interna que o JavaScript usa (Unicode). Voltaremos a detalhes específicos e às consequências disso no capítulo Strings .

// Comparação de diferentes tipos
// Ao comparar valores de tipos diferentes, o JavaScript converte os valores em números.

// Por exemplo:

// alert( '2' > 1 ); // true, string '2' becomes a number 2
// alert( '01' == 1 ); // true, string '01' becomes a number 1
// Para valores booleanos, truetorna-se 1e falsetorna-se 0.

// Por exemplo:

// alert( true == 1 ); // true
// alert( false == 0 ); // true
// Uma consequência engraçada
// É possível que ao mesmo tempo:

// Dois valores são iguais.
// Um deles é truecomo um booleano e o outro é falsecomo um booleano.
// Por exemplo:

// let a = 0;
// alert( Boolean(a) ); // false

// let b = "0";
// alert( Boolean(b) ); // true

// alert(a == b); // true!
// Do ponto de vista do JavaScript, esse resultado é bastante normal. Uma verificação de igualdade converte valores usando a conversão numérica (portanto, "0"torna-se 0), enquanto a Booleanconversão explícita usa outro conjunto de regras.

// Igualdade estrita
// Uma verificação de igualdade regular ==tem um problema. Ela não consegue diferenciar 0entre false:

// alert( 0 == false ); // true
// A mesma coisa acontece com uma string vazia:

// alert( '' == false ); // true
// Isso acontece porque operandos de tipos diferentes são convertidos em números pelo operador de igualdade ==. Uma string vazia, assim como false, torna-se zero.

// O que fazer se quisermos diferenciar 0de false?

// Um operador de igualdade estrita ===verifica a igualdade sem conversão de tipo.

// Em outras palavras, se ae bforem de tipos diferentes, então a === bretorna imediatamente falsesem tentar convertê-los.

// Vamos tentar:

// alert( 0 === false ); // false, because the types are different
// Há também um operador de “não igualdade estrita” !==análogo a !=.

// O operador de igualdade estrita é um pouco mais longo para escrever, mas deixa claro o que está acontecendo e menos espaço para erros.

// Comparação com nulo e indefinido
// Há um comportamento não intuitivo quando nullou undefinedsão comparados a outros valores.

// Para uma verificação rigorosa da igualdade===
// Esses valores são diferentes, porque cada um deles é um tipo diferente.

// alert( null === undefined ); // false
// Para uma verificação não rigorosa==
// Há uma regra especial. Esses dois formam um "casal doce": eles se igualam (no sentido de ==), mas não em nenhum outro valor.

// alert( null == undefined ); // true
// Para matemática e outras comparações< > <= >=
// null/undefinedsão convertidos em números: nulltorna-se 0, enquanto undefinedtorna-se NaN.

// Agora vamos ver algumas coisas engraçadas que acontecem quando aplicamos essas regras. E, o mais importante, como não cair na armadilha delas.

// Resultado estranho: nulo vs 0
// Vamos comparar nullcom um zero:

// alert( null > 0 );  // (1) false
// alert( null == 0 ); // (2) false
// alert( null >= 0 ); // (3) true
// Matematicamente, isso é estranho. O último resultado afirma que " nullé maior ou igual a zero", então em uma das comparações acima deve ser true, mas ambas são falsas.

// O motivo é que uma verificação de igualdade ==e comparações > < >= <=funcionam de forma diferente. As comparações convertem nullpara um número, tratando-o como 0. É por isso que (3) null >= 0é verdadeiro e (1) null > 0é falso.

// Por outro lado, a verificação de igualdade ==para undefinede nullé definida de forma que, sem nenhuma conversão, eles se igualam e não se igualam a mais nada. É por isso que (2) null == 0é falsa.

// Um indefinido incomparável
// O valor undefinednão deve ser comparado a outros valores:

// alert( undefined > 0 ); // false (1)
// alert( undefined < 0 ); // false (2)
// alert( undefined == 0 ); // false (3)
// Por que ele odeia tanto o zero? Sempre falso!

// Obtemos esses resultados porque:

// Comparações (1)e (2)retorno falseporque undefinedé convertido para NaNe NaNé um valor numérico especial que retorna falsepara todas as comparações.
// A verificação de igualdade (3)retorna falseporque undefinedsomente é igual a null, undefinede nenhum outro valor.
// Evite problemas
// Por que revisamos esses exemplos? Devemos nos lembrar dessas peculiaridades o tempo todo? Bem, na verdade não. Na verdade, essas coisas complicadas se tornarão familiares com o tempo, mas há uma maneira sólida de evitar problemas com elas:

// Trate qualquer comparação, undefined/nullexceto a igualdade estrita, ===com cuidado excepcional.
// Não use comparações >= > < <=com uma variável que possa ser null/undefined, a menos que você tenha certeza do que está fazendo. Se uma variável puder ter esses valores, verifique-os separadamente.
// Resumo
// Operadores de comparação retornam um valor booleano.
// As strings são comparadas letra por letra na ordem do “dicionário”.
// Quando valores de tipos diferentes são comparados, eles são convertidos em números (com a exclusão de uma verificação de igualdade estrita).
// Os valores nulle undefinedsão iguais ==entre si e não são iguais a nenhum outro valor.
// Tenha cuidado ao usar comparações como >ou <com variáveis ​​que podem ocasionalmente ser null/undefined. Verificar null/undefinedseparadamente é uma boa ideia.