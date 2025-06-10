// -----

// ## Strings

// No JavaScript, os dados textuais são armazenados como **strings**. Não existe um tipo separado para um único caractere.

// O formato interno para strings é sempre **UTF-16**, não estando vinculado à codificação da página.

// ### Aspas

// Vamos relembrar os tipos de aspas.

// Strings podem ser delimitadas por aspas simples, aspas duplas ou crases:

// ```javascript
// let single = 'com aspas simples';
// let double = "com aspas duplas";
// let backticks = `com crases`;
// ```

// Aspas simples e duplas são essencialmente as mesmas. As crases, no entanto, nos permitem **incorporar qualquer expressão na string**, envolvendo-a em `${…}`:

// ```javascript
// function sum(a, b) {
//   return a + b;
// }
// alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
// ```

// Outra vantagem de usar crases é que elas permitem que uma string se estenda por **múltiplas linhas**:

// ```javascript
// let guestList = `Convidados:
//  * João
//  * Pedro
//  * Maria`;
// alert(guestList); // uma lista de convidados, em várias linhas
// ```

// Parece natural, certo? Mas aspas simples ou duplas não funcionam dessa maneira.

// Se as usarmos e tentarmos usar várias linhas, haverá um erro:

// ```javascript
// let guestList = "Convidados: // Erro: Caractere inesperado ILLEGAL
//   * João";
// ```

// Aspas simples e duplas vêm de tempos antigos da criação da linguagem, quando a necessidade de strings multilinha não era levada em consideração. As crases apareceram muito depois e, portanto, são mais versáteis.

// As crases também nos permitem especificar uma "função de template" antes da primeira crase. A sintaxe é: `func`string\`\`. A função `func` é chamada automaticamente, recebe a string e as expressões incorporadas e pode processá-las. Essa funcionalidade é chamada de "template tags", é raramente vista, mas você pode ler sobre ela no MDN: [Template literals](https://www.google.com/search?q=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals%23tagged_templates).

// -----

// ### Caracteres especiais

// Ainda é possível criar strings multilinha com aspas simples e duplas usando um "caractere de nova linha", escrito como `\n`, que denota uma quebra de linha:

// ```javascript
// let guestList = "Convidados:\n * João\n * Pedro\n * Maria";
// alert(guestList); // uma lista de convidados multilinha, igual à acima
// ```

// Como um exemplo mais simples, estas duas linhas são iguais, apenas escritas de forma diferente:

// ```javascript
// let str1 = "Olá\nMundo"; // duas linhas usando um "símbolo de nova linha"

// // duas linhas usando uma nova linha normal e crases
// let str2 = `Olá
// Mundo`;

// alert(str1 == str2); // true
// ```

// Existem outros caracteres especiais menos comuns:

// | Caractere | Descrição                                                                                                                                                                                                                                                                                                                                 |
// | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
// | `\n`      | Nova linha                                                                                                                                                                                                                                                                                                                                |
// | `\r`      | Em arquivos de texto do Windows, uma combinação de dois caracteres `\r\n` representa uma nova quebra, enquanto em sistemas operacionais que não são Windows é apenas `\n`. Isso é por razões históricas, a maioria dos softwares Windows também entende `\n`.                                                                                 |
// | `\'`, `\"`, `` \`  `` | Aspas                                                                                                                                                                                                                                                                                                                                 |
// | `\\`      | Barra invertida                                                                                                                                                                                                                                                                                                                           |
// | `\t`      | Tabulação                                                                                                                                                                                                                                                                                                                                 |
// | `\b`, `\f`, `\v` | Backspace, Form Feed, Tabulação Vertical – mencionados para fins de completude, vindos de tempos antigos, não usados hoje em dia (você pode esquecê-los agora mesmo). |

// Como você pode ver, todos os caracteres especiais começam com um caractere de barra invertida `\`. Ele também é chamado de "caractere de escape".

// Por ser tão especial, se precisarmos mostrar uma barra invertida `\` real dentro da string, precisamos duplicá-la:

// ```javascript
// alert( `A barra invertida: \\` ); // A barra invertida: \
// ```

// As chamadas aspas "escapadas" `\'`, `\"`, `` \`  `` são usadas para inserir uma aspa dentro de uma string delimitada pelo mesmo tipo de aspas.

// Por exemplo:

// ```javascript
// alert( 'Eu sou o Walrus!' ); // Eu sou o Walrus!
// ```

// Como você pode ver, temos que preceder a aspa interna com a barra invertida `\'`, porque, caso contrário, ela indicaria o fim da string.

// Claro, apenas as aspas que são iguais às aspas de delimitação precisam ser escapadas. Então, como uma solução mais elegante, poderíamos mudar para aspas duplas ou crases:

// ```javascript
// alert( "Eu sou o Walrus!" ); // Eu sou o Walrus!
// ```

// Além desses caracteres especiais, também existe uma notação especial para códigos Unicode `\u…`, que é raramente usada e é abordada no capítulo opcional sobre [Unicode](https://javascript.info/unicode).

// -----

// ### Comprimento da string

// A propriedade `length` tem o comprimento da string:

// ```javascript
// alert( `Meu\n`.length ); // 3
// ```

// Observe que `\n` é um único caractere "especial", então o comprimento é realmente `3`.

// #### `length` é uma propriedade

// Pessoas com experiência em outras linguagens às vezes digitam incorretamente chamando `str.length()` em vez de apenas `str.length`. Isso não funciona.

// Observe que `str.length` é uma propriedade numérica, não uma função. Não há necessidade de adicionar parênteses depois dela. Não é `.length()`, mas sim `.length`.

// -----

// ### Acessando caracteres

// Para obter um caractere na posição `pos`, use colchetes `[pos]` ou chame o método `str.at(pos)`. O primeiro caractere começa da posição zero:

// ```javascript
// let str = `Olá`;

// // o primeiro caractere
// alert( str[0] );    // O
// alert( str.at(0) ); // O

// // o último caractere
// alert( str[str.length - 1] ); // á
// alert( str.at(-1) );         // á
// ```

// Como você pode ver, o método `.at(pos)` tem o benefício de permitir posições negativas. Se `pos` for negativo, então é contado a partir do final da string.

// Então `.at(-1)` significa o último caractere, e `.at(-2)` é o anterior a ele, etc.

// Os colchetes sempre retornam `undefined` para índices negativos, por exemplo:

// ```javascript
// let str = `Olá`;
// alert( str[-2] );    // undefined
// alert( str.at(-2) ); // l
// ```

// Também podemos iterar sobre os caracteres usando `for..of`:

// ```javascript
// for (let char of "Olá") {
//   alert(char); // O,l,á (char torna-se "O", depois "l", depois "á" etc)
// }
// ```

// -----

// ### Strings são imutáveis

// Strings não podem ser alteradas em JavaScript. É impossível mudar um caractere.

// Vamos tentar para mostrar que não funciona:

// ```javascript
// let str = 'Oi';

// str[0] = 'o'; // erro
// alert( str[0] ); // não funciona
// ```

// A solução usual é criar uma string completamente nova e atribuí-la a `str` em vez da antiga.

// Por exemplo:

// ```javascript
// let str = 'Oi';

// str = 'o' + str[1]; // substitui a string
// alert( str ); // oi
// ```

// Nas seções seguintes, veremos mais exemplos disso.

// -----

// ### Mudando o caso

// Os métodos `toLowerCase()` e `toUpperCase()` mudam o caso:

// ```javascript
// alert( 'Interface'.toUpperCase() ); // INTERFACE
// alert( 'Interface'.toLowerCase() ); // interface
// ```

// Ou, se quisermos um único caractere em minúsculas:

// ```javascript
// alert( 'Interface'[0].toLowerCase() ); // 'i'
// ```

// -----

// ### Procurando uma substring

// Existem várias maneiras de procurar uma substring dentro de uma string.

// #### `str.indexOf`

// O primeiro método é `str.indexOf(substr, pos)`.

// Ele procura por `substr` em `str`, começando da posição `pos` fornecida, e retorna a posição onde a correspondência foi encontrada ou `-1` se nada puder ser encontrado.

// Por exemplo:

// ```javascript
// let str = 'Widget com id';
// alert( str.indexOf('Widget') ); // 0, porque 'Widget' é encontrado no início
// alert( str.indexOf('widget') ); // -1, não encontrado, a busca diferencia maiúsculas de minúsculas
// alert( str.indexOf("id") );     // 1, "id" é encontrado na posição 1 (..idget com id)
// ```

// O segundo parâmetro opcional nos permite começar a procurar a partir de uma determinada posição.

// Por exemplo, a primeira ocorrência de `"id"` está na posição `1`. Para procurar a próxima ocorrência, vamos começar a busca da posição `2`:

// ```javascript
// let str = 'Widget com id';
// alert( str.indexOf('id', 2) ) // 12
// ```

// Se estivermos interessados em todas as ocorrências, podemos executar `indexOf` em um loop. Cada nova chamada é feita com a posição após a correspondência anterior:

// ```javascript
// let str = 'Astuto como uma raposa, forte como um boi';
// let target = 'as'; // vamos procurar por isso
// let pos = 0;
// while (true) {
//   let foundPos = str.indexOf(target, pos);
//   if (foundPos == -1) break;

//   alert( `Encontrado em ${foundPos}` );
//   pos = foundPos + 1; // continua a busca a partir da próxima posição
// }
// ```

// O mesmo algoritmo pode ser apresentado de forma mais curta:

// ```javascript
// let str = "Astuto como uma raposa, forte como um boi";
// let target = "as";
// let pos = -1;
// while ((pos = str.indexOf(target, pos + 1)) != -1) {
//   alert( pos );
// }
// ```

// #### `str.lastIndexOf(substr, position)`

// Existe também um método semelhante `str.lastIndexOf(substr, position)` que pesquisa do final de uma string para o seu início.

// Ele listaria as ocorrências na ordem inversa.

// Há um pequeno inconveniente com `indexOf` no teste `if`. Não podemos colocá-lo no `if` assim:

// ```javascript
// let str = "Widget com id";
// if (str.indexOf("Widget")) {
//     alert("Encontramos"); // não funciona!
// }
// ```

// O `alert` no exemplo acima não aparece porque `str.indexOf("Widget")` retorna `0` (o que significa que encontrou a correspondência na posição inicial). Certo, mas `if` considera `0` como `false`.

// Então, devemos realmente verificar por `-1`, assim:

// ```javascript
// let str = "Widget com id";
// if (str.indexOf("Widget") != -1) {
//     alert("Encontramos"); // agora funciona!
// }
// ```

// #### `includes`, `startsWith`, `endsWith`

// O método mais moderno `str.includes(substr, pos)` retorna `true`/`false` dependendo se `str` contém `substr` dentro.

// É a escolha certa se precisamos testar a correspondência, mas não precisamos de sua posição:

// ```javascript
// alert( "Widget com id".includes("Widget") ); // true
// alert( "Olá".includes("Tchau") );          // false
// ```

// O segundo argumento opcional de `str.includes` é a posição de onde começar a pesquisa:

// ```javascript
// alert( "Widget".includes("id") );      // true
// alert( "Widget".includes("id", 3) ); // false, a partir da posição 3 não há "id"
// ```

// Os métodos `str.startsWith` e `str.endsWith` fazem exatamente o que dizem:

// ```javascript
// alert( "Widget".startsWith("Wid") ); // true, "Widget" começa com "Wid"
// alert( "Widget".endsWith("get") );   // true, "Widget" termina com "get"
// ```

// -----

// ### Obtendo uma substring

// Existem 3 métodos em JavaScript para obter uma substring: `substring`, `substr` e `slice`.

// #### `str.slice(start [, end])`

// Retorna a parte da string de `start` até (mas não incluindo) `end`.

// Por exemplo:

// ```javascript
// let str = "stringificar";
// alert( str.slice(0, 5) ); // 'strin', a substring de 0 a 5 (não incluindo 5)
// alert( str.slice(0, 1) ); // 's', de 0 a 1, mas não incluindo 1, então apenas o caractere na posição 0
// ```

// Se não houver um segundo argumento, `slice` vai até o final da string:

// ```javascript
// let str = "stringificar";
// alert( str.slice(2) ); // 'ringificar', da 2ª posição até o final
// ```

// Valores negativos para `start`/`end` também são possíveis. Eles significam que a posição é contada a partir do final da string:

// ```javascript
// let str = "stringificar";
// // começa na 4ª posição da direita, termina na 1ª da direita
// alert( str.slice(-4, -1) ); // 'ica'
// ```

// #### `str.substring(start [, end])`

// Retorna a parte da string **entre** `start` e `end` (não incluindo `end`).

// Isso é quase o mesmo que `slice`, mas permite que `start` seja maior que `end` (neste caso, ele simplesmente troca os valores de `start` e `end`).

// Por exemplo:

// ```javascript
// let str = "stringificar";

// // estes são os mesmos para substring
// alert( str.substring(2, 6) ); // "ring"
// alert( str.substring(6, 2) ); // "ring"

// // ...mas não para slice:
// alert( str.slice(2, 6) ); // "ring" (o mesmo)
// alert( str.slice(6, 2) ); // "" (uma string vazia)
// ```

// Argumentos negativos (diferente de `slice`) não são suportados, eles são tratados como `0`.

// #### `str.substr(start [, length])`

// Retorna a parte da string de `start`, com o `length` fornecido.

// Em contraste com os métodos anteriores, este nos permite especificar o `length` em vez da posição final:

// ```javascript
// let str = "stringificar";
// alert( str.substr(2, 4) ); // 'ring', da 2ª posição obtem 4 caracteres
// ```

// O primeiro argumento pode ser negativo, para contar a partir do final:

// ```javascript
// let str = "stringificar";
// alert( str.substr(-4, 2) ); // 'ic', da 4ª posição obtem 2 caracteres
// ```

// Este método reside no **Anexo B** da especificação da linguagem. Isso significa que apenas os motores JavaScript hospedados em navegadores devem suportá-lo, e não é recomendado usá-lo. Na prática, ele é suportado em todos os lugares.

// Vamos recapitular esses métodos para evitar qualquer confusão:

// | método                | seleciona…                                  | negativos                               |
// | :-------------------- | :------------------------------------------ | :-------------------------------------- |
// | `slice(start, end)`   | de `start` até `end` (não incluindo `end`)  | permite negativos                       |
// | `substring(start, end)` | entre `start` e `end` (não incluindo `end`) | valores negativos significam `0`        |
// | `substr(start, length)` | de `start` obtém `length` caracteres      | permite `start` negativo                |

// #### Qual escolher?

// Todos eles podem fazer o trabalho. Formalmente, `substr` tem uma pequena desvantagem: ele não é descrito na especificação principal do JavaScript, mas no Anexo B, que cobre recursos apenas de navegador que existem principalmente por razões históricas. Portanto, ambientes não-navegador podem não suportá-lo. Mas na prática, ele funciona em todos os lugares.

// Das outras duas variantes, `slice` é um pouco mais flexível, permite argumentos negativos e é mais curto de escrever.

// Então, para uso prático, basta lembrar apenas `slice`.

// -----

// ### Comparando strings

// Como sabemos do capítulo [Comparações](https://javascript.info/comparison), as strings são comparadas caractere por caractere em ordem alfabética.

// No entanto, existem algumas peculiaridades.

// Uma letra minúscula é sempre maior que a maiúscula:

// ```javascript
// alert( 'a' > 'Z' ); // true
// ```

// Letras com marcas diacríticas estão "fora de ordem":

// ```javascript
// alert( 'Österreich' > 'Zealand' ); // true
// ```

// Isso pode levar a resultados estranhos se classificarmos esses nomes de países. Geralmente, as pessoas esperariam que **Zealand** viesse depois de **Österreich** na lista.

// Para entender o que acontece, devemos estar cientes de que as strings em JavaScript são codificadas usando **UTF-16**. Ou seja: cada caractere tem um código numérico correspondente.

// Existem métodos especiais que permitem obter o caractere para o código e vice-versa:

//   * **`str.codePointAt(pos)`**
//     Retorna um número decimal que representa o código do caractere na posição `pos`:

//     ```javascript
//     // letras maiúsculas e minúsculas têm códigos diferentes
//     alert( "Z".codePointAt(0) ); // 90
//     alert( "z".codePointAt(0) ); // 122
//     alert( "z".codePointAt(0).toString(16) ); // 7a (se precisarmos de um valor hexadecimal)
//     ```

//   * **`String.fromCodePoint(code)`**
//     Cria um caractere por seu `code` numérico.

//     ```javascript
//     alert( String.fromCodePoint(90) );   // Z
//     alert( String.fromCodePoint(0x5a) ); // Z (podemos também usar um valor hexadecimal como argumento)
//     ```

// Agora vamos ver os caracteres com códigos `65..220` (o alfabeto latino e um pouco mais) criando uma string com eles:

// ```javascript
// let str = '';
// for (let i = 65; i <= 220; i++) {
//   str += String.fromCodePoint(i);
// }
// alert( str );
// // Saída:
// // ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// // ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
// ```

// Viu? Caracteres maiúsculos vêm primeiro, depois alguns especiais, depois caracteres minúsculos, e **Ö** perto do final da saída.

// Agora fica óbvio por que `a > Z`.

// Os caracteres são comparados por seu código numérico. O código maior significa que o caractere é maior. O código para `a` (97) é maior que o código para `Z` (90).

// Todas as letras minúsculas vêm depois das letras maiúsculas porque seus códigos são maiores.

// Algumas letras como **Ö** se destacam do alfabeto principal. Aqui, seu código é maior que qualquer coisa de `a` a `z`.

// #### Comparações corretas

// O algoritmo "certo" para fazer comparações de strings é mais complexo do que pode parecer, porque os alfabetos são diferentes para diferentes idiomas.

// Então, o navegador precisa saber o idioma para comparar.

// Felizmente, os navegadores modernos suportam o padrão de internacionalização **ECMA-402**.

// Ele fornece um método especial para comparar strings em diferentes idiomas, seguindo suas regras.

// A chamada `str.localeCompare(str2)` retorna um inteiro indicando se `str` é menor, igual ou maior que `str2` de acordo com as regras do idioma:

//   * Retorna um número negativo se `str` for menor que `str2`.
//   * Retorna um número positivo se `str` for maior que `str2`.
//   * Retorna `0` se forem equivalentes.

// Por exemplo:

// ```javascript
// alert( 'Österreich'.localeCompare('Zealand') ); // -1
// ```

// Este método realmente possui dois argumentos adicionais especificados na [documentação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare), que permitem especificar o idioma (por padrão, é retirado do ambiente, a ordem das letras depende do idioma) e configurar regras adicionais como sensibilidade a maiúsculas e minúsculas ou se "a" e "á" devem ser tratados como iguais, etc.

// -----

// ### Resumo

//   * Existem 3 tipos de aspas. As **crases** permitem que uma string se estenda por várias linhas e incorpore expressões `${…}`.
//   * Podemos usar **caracteres especiais**, como uma quebra de linha `\n`.
//   * Para obter um caractere, use: `[]` ou o método `at`.
//   * Para obter uma substring, use: `slice` ou `substring`.
//   * Para colocar uma string em minúsculas/maiúsculas, use: `toLowerCase`/`toUpperCase`.
//   * Para procurar uma substring, use: `indexOf`, ou `includes`/`startsWith`/`endsWith` para verificações simples.
//   * Para comparar strings de acordo com o idioma, use: `localeCompare`, caso contrário, elas são comparadas por códigos de caracteres.

// Existem vários outros métodos úteis em strings:

//   * `str.trim()` – remove ("trim") espaços do início e do final da string.
//   * `str.repeat(n)` – repete a string `n` vezes.
//   * …e mais a ser encontrado no [manual](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

// Strings também possuem métodos para fazer pesquisa/substituição com expressões regulares. Mas esse é um tópico grande, então é explicado em uma seção de tutorial separada [Expressões regulares](https://www.google.com/search?q=https://javascript.info/regexp).

// Além disso, a partir de agora é importante saber que as strings são baseadas na codificação Unicode e, portanto, há problemas com comparações. Há mais sobre Unicode no capítulo [Unicode, String internals](https://javascript.info/unicode).

// -----

// Espero que esta adaptação para o português seja útil\! Há algo mais que você gostaria de explorar sobre strings em JavaScript?