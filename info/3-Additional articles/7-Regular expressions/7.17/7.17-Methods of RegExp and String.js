// Claro! Aqui está a adaptação completa para português, explicando os métodos de **RegExp** e **String** que trabalham com expressões regulares em JavaScript:

// ---

// # Métodos de RegExp e String

// Neste artigo vamos detalhar vários métodos que trabalham com expressões regulares (regexps).

// ---

// ## `str.match(regexp)`

// O método `str.match(regexp)` busca correspondências do `regexp` dentro da string `str`.

// Ele tem 3 modos de funcionamento:

// 1. **Se o regexp NÃO tiver a flag `g`**, retorna o **primeiro resultado da busca**, como um array que contém:

//    * O texto completo que casou,
//    * Os grupos capturados (se houver),
//    * Propriedades extras:

//      * `index` — posição onde o match foi encontrado,
//      * `input` — a string original.

// Exemplo:

// ```js
// let str = "I love JavaScript";

// let result = str.match(/Java(Script)/);

// alert(result[0]);     // "JavaScript" (match completo)
// alert(result[1]);     // "Script" (primeiro grupo capturado)
// alert(result.length); // 2

// alert(result.index);  // 7 (posição do match)
// alert(result.input);  // "I love JavaScript"
// ```

// 2. **Se o regexp tiver a flag `g`**, retorna um array com **todas as correspondências encontradas**, só os textos, sem grupos capturados nem detalhes.

// Exemplo:

// ```js
// let str = "I love JavaScript";

// let result = str.match(/Java(Script)/g);

// alert(result[0]);     // "JavaScript"
// alert(result.length); // 1
// ```

// 3. **Se não houver correspondências**, retorna `null` (não um array vazio).

// Exemplo:

// ```js
// let str = "I love JavaScript";

// let result = str.match(/HTML/);

// alert(result);       // null
// alert(result.length); // ERRO: não dá para acessar length de null
// ```

// Para evitar erro, podemos fazer:

// ```js
// let result = str.match(regexp) || [];
// ```

// ---

// ## `str.matchAll(regexp)`

// É um método recente (navegadores antigos podem precisar de polyfill).

// É uma versão **mais poderosa** do `str.match` para buscar todas as ocorrências **com grupos capturados**.

// Diferenças principais:

// * Retorna um **iterável** (não um array), que pode ser convertido para array com `Array.from`.
// * Cada match é um array com grupos capturados (igual a `str.match` sem flag `g`).
// * Se não houver resultados, retorna um iterável vazio, não `null`.

// Exemplo:

// ```js
// let str = '<h1>Hello, world!</h1>';
// let regexp = /<(.*?)>/g;

// let matchAll = str.matchAll(regexp);

// console.log(matchAll); // objeto iterável, não array

// matchAll = Array.from(matchAll); // agora sim é array

// let firstMatch = matchAll[0];
// alert(firstMatch[0]);  // "<h1>"
// alert(firstMatch[1]);  // "h1"
// alert(firstMatch.index);  // 0
// alert(firstMatch.input);  // "<h1>Hello, world!</h1>"
// ```

// Também podemos iterar diretamente:

// ```js
// for (let match of str.matchAll(regexp)) {
//   console.log(match);
// }
// ```

// ---

// ## `str.split(regexp|substr, limit)`

// Divide a string usando um **regexp** ou uma substring como delimitador.

// Exemplo com string:

// ```js
// alert('12-34-56'.split('-')); // ['12', '34', '56']
// ```

// Exemplo com regexp:

// ```js
// alert('12, 34, 56'.split(/,\s*/)); // ['12', '34', '56']
// ```

// ---

// ## `str.search(regexp)`

// Retorna a **posição do primeiro match** ou `-1` se não encontrou nada.

// Exemplo:

// ```js
// let str = "A drop of ink may make a million think";

// alert(str.search(/ink/i)); // 10 (posição do primeiro match)
// ```

// Limitação: encontra só o primeiro match.

// Para achar todos, use `str.matchAll`.

// ---

// ## `str.replace(str|regexp, str|func)`

// Método para buscar e substituir partes da string. Muito útil!

// Podemos usar para substituir substrings simples:

// ```js
// alert('12-34-56'.replace("-", ":")); // "12:34-56"
// ```

// Mas atenção: quando o primeiro argumento é uma string, só substitui a **primeira ocorrência**.

// Para substituir todas, use regexp com flag `g`:

// ```js
// alert('12-34-56'.replace(/-/g, ":")); // "12:34:56"
// ```

// ---

// ### Caracteres especiais na string de substituição:

// | Símbolo   | Ação na substituição                                       |
// | --------- | ---------------------------------------------------------- |
// | `$&`      | Insere o texto que casou completo                          |
// | ``$` ``   | Insere o texto antes da correspondência                    |
// | `$'`      | Insere o texto depois da correspondência                   |
// | `$n`      | Insere o conteúdo do n-ésimo grupo capturado (1-2 dígitos) |
// | `$<nome>` | Insere o conteúdo do grupo nomeado                         |
// | `$$`      | Insere o caractere `$`                                     |

// Exemplo:

// ```js
// let str = "John Smith";

// // Inverte nome e sobrenome
// alert(str.replace(/(john) (smith)/i, '$2, $1')); // "Smith, John"
// ```

// ---

// ### Substituição com função

// O segundo argumento pode ser uma função, chamada para cada correspondência.

// Assinatura da função:

// ```js
// func(match, p1, p2, ..., pn, offset, input, groups)
// ```

// * `match`: texto que casou
// * `p1, p2, ...`: grupos capturados
// * `offset`: posição do match
// * `input`: string original
// * `groups`: objeto com grupos nomeados

// Se não há grupos, recebe só `(str, offset, input)`.

// Exemplos:

// * Converter matches para maiúsculas:

// ```js
// let str = "html and css";
// let result = str.replace(/html|css/gi, s => s.toUpperCase());
// alert(result); // "HTML and CSS"
// ```

// * Substituir por posição na string:

// ```js
// alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // "0-3-6"
// ```

// * Com vários grupos:

// ```js
// let str = "John Smith";

// let result = str.replace(/(\w+) (\w+)/, (match, nome, sobrenome) => `${sobrenome}, ${nome}`);

// alert(result); // "Smith, John"
// ```

// * Usando rest parameters para grupos:

// ```js
// let result = str.replace(/(\w+) (\w+)/, (...m) => `${m[2]}, ${m[1]}`);

// alert(result); // "Smith, John"
// ```

// * Com grupos nomeados:

// ```js
// let result = str.replace(/(?<nome>\w+) (?<sobrenome>\w+)/, (...m) => {
//   let groups = m.pop();
//   return `${groups.sobrenome}, ${groups.nome}`;
// });

// alert(result); // "Smith, John"
// ```

// ---

// ## `str.replaceAll(str|regexp, str|func)`

// Semelhante ao `replace`, mas:

// * Se o primeiro argumento for uma **string**, substitui **todas** as ocorrências (não só a primeira).
// * Se for regexp, deve ter a flag `g` obrigatoriamente.

// Exemplo:

// ```js
// alert('12-34-56'.replaceAll("-", ":")); // "12:34:56"
// ```

// ---

// ## `regexp.exec(str)`

// É um método do regexp (não da string).

// Se não tiver flag `g`, funciona como `str.match(regexp)`, retornando o primeiro match.

// Se tiver flag `g`:

// * A cada chamada, busca a próxima correspondência **a partir de** `regexp.lastIndex`.
// * Atualiza `regexp.lastIndex` para a posição após o match.
// * Retorna `null` quando acabar e reseta `lastIndex` para zero.

// Exemplo para achar todas as ocorrências:

// ```js
// let str = 'More about JavaScript at https://javascript.info';
// let regexp = /javascript/ig;

// let result;

// while (result = regexp.exec(str)) {
//   alert(`Found ${result[0]} at position ${result.index}`);
// }
// ```

// ---

// Também podemos controlar a posição da busca definindo manualmente `regexp.lastIndex`:

// ```js
// let str = 'Hello, world!';
// let regexp = /\w+/g;

// regexp.lastIndex = 5; // começar a buscar na posição 5 (vírgula)
// alert(regexp.exec(str)); // "world"
// ```

// Se a flag for `"y"` (sticky), a busca só ocorre **exatamente** na posição `lastIndex`, sem avançar.

// Exemplo:

// ```js
// let regexp = /\w+/y;
// regexp.lastIndex = 5;
// alert(regexp.exec('Hello, world!')); // null, pois posição 5 é vírgula
// ```

// ---

// ## `regexp.test(str)`

// Verifica se o regexp casa com `str`, retornando `true` ou `false`.

// Exemplo:

// ```js
// let str = "I love JavaScript";

// alert(/love/i.test(str));          // true
// alert(str.search(/love/i) != -1); // true
// ```

// Se o regexp tem flag `g`, `test` usa `regexp.lastIndex` e atualiza ela igual ao `exec`.

// Exemplo para busca a partir de uma posição:

// ```js
// let regexp = /love/gi;
// let str = "I love JavaScript";

// regexp.lastIndex = 10;
// alert(regexp.test(str)); // false (não achou depois da posição 10)
// ```

// ---

// ### Cuidado: uso repetido de regexp global em diferentes strings

// Exemplo problemático:

// ```js
// let regexp = /javascript/g;

// alert(regexp.test("javascript")); // true, lastIndex = 10
// alert(regexp.test("javascript")); // false, lastIndex = 10 (não reiniciado)
// ```

// A solução: sempre resetar `lastIndex` antes de usar:

// ```js
// regexp.lastIndex = 0;
// regexp.test("javascript"); 
// ```

// Ou usar métodos da string (`match`, `search`), que não dependem de `lastIndex`.

// ---

// Se quiser, posso ajudar com exemplos práticos ou código traduzido para aplicar esses métodos. Quer?
