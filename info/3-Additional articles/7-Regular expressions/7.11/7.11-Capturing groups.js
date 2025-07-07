// Claro! Aqui está o conteúdo completamente **adaptado**, organizado e explicado de forma **clara, direta e com exemplos comentados em JavaScript**, focando em **capturing groups** (grupos de captura) e suas variações:

// ---

// ## 🎯 **Capturing Groups (Grupos de Captura)**

// ### 📦 O que são?

// Parênteses `( ... )` em uma expressão regular criam um **grupo de captura**:

// * Agrupam partes do padrão para aplicar quantificadores a tudo junto.
// * Permitem **acessar partes específicas** do match.

// ---

// ### 🔁 Exemplos básicos

// #### ✳️ Exemplo: `(go)+`

// ```js
// let str = 'Gogogo now!';
// let result = str.match(/(go)+/ig);
// alert(result); // ["Gogogo"]
// ```

// * `(go)+` significa repetir "go" uma ou mais vezes.
// * O grupo permite repetir a palavra inteira, não só a letra `o`.

// ---

// ### 🌐 Exemplo: Domínios

// ```js
// let str = "site.com my.site.com";
// let result = str.match(/(\w+\.)+\w+/g);
// alert(result); // ["site.com", "my.site.com"]
// ```

// * `(\w+\.)+` captura partes com ponto.
// * `\w+` no final captura o domínio final.

// 🛠️ Para aceitar hífens (como `my-site.com`), use:

// ```js
// /([\w-]+\.)+[\w-]+/g
// ```

// ---

// ### 📧 Exemplo: E-mails

// ```js
// let str = "my@mail.com his@site.com.uk";
// let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
// alert(str.match(regexp)); // ["my@mail.com", "his@site.com.uk"]
// ```

// * Parte antes do `@`: `[-.\w]+`
// * Domínio com pontos: `([\w-]+\.)+`
// * Final: `[\w-]+`

// ---

// ## 📥 Acessando os grupos capturados

// ### Exemplo:

// ```js
// let str = '<h1>Hello</h1>';
// let tag = str.match(/<(.*?)>/);

// alert(tag[0]); // <h1>
// alert(tag[1]); // h1
// ```

// * `match()` retorna:

//   * `[0]`: match completo
//   * `[1]`: conteúdo entre os `< >`

// ---

// ## 🪆 Grupos Aninhados

// ```js
// let str = '<span class="my">';
// let regexp = /<(([a-z]+)\s*([^>]*))>/;
// let result = str.match(regexp);

// alert(result[0]); // <span class="my">
// alert(result[1]); // span class="my"
// alert(result[2]); // span
// alert(result[3]); // class="my"
// ```

// * Os grupos são numerados da **esquerda para a direita**.

// ---

// ## ❓ Grupos opcionais

// ```js
// let match = 'a'.match(/a(z)?(c)?/);
// alert(match); // ["a", undefined, undefined]

// match = 'ac'.match(/a(z)?(c)?/);
// alert(match); // ["ac", undefined, "c"]
// ```

// * Mesmo que o grupo não exista na string, o índice aparece com `undefined`.

// ---

// ## 🔄 matchAll – todos os matches com grupos

// ### Problema com `.match()` + `g`:

// ```js
// let tags = '<h1> <h2>'.match(/<(.*?)>/g);
// alert(tags); // ["<h1>", "<h2>"] // não acessa os grupos
// ```

// ### Solução: `matchAll()`

// ```js
// let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
// results = Array.from(results);

// alert(results[0][0]); // <h1>
// alert(results[0][1]); // h1
// ```

// ---

// ### Iterando sobre `matchAll`

// ```js
// for (let [full, tag] of '<h1> <h2>'.matchAll(/<(.*?)>/gi)) {
//   console.log(full, tag);
// }
// ```

// ---

// ## 🏷️ Grupos nomeados

// Use `(?<nome>...)` para nomear grupos:

// ```js
// let str = "2023-07-07";
// let regexp = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

// let result = str.match(regexp).groups;
// alert(result.year);  // 2023
// alert(result.month); // 07
// alert(result.day);   // 07
// ```

// ---

// ### Usando `matchAll` com grupos nomeados:

// ```js
// let str = "2023-07-07 2024-01-01";
// let regexp = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;

// for (let { groups } of str.matchAll(regexp)) {
//   alert(`${groups.day}.${groups.month}.${groups.year}`);
// }
// ```

// ---

// ## 🔁 Substituições com grupos

// ### 📌 Por número:

// ```js
// let str = "John Bull";
// let result = str.replace(/(\w+) (\w+)/, '$2, $1');
// alert(result); // Bull, John
// ```

// ### 🏷️ Por nome:

// ```js
// let str = "2023-07-07, 2024-01-01";
// let regexp = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;

// let result = str.replace(regexp, '$<day>.$<month>.$<year>');
// alert(result); // 07.07.2023, 01.01.2024
// ```

// ---

// ## 🚫 Grupos não-capturáveis `(?:...)`

// Quando só queremos **agrupar**, mas **não capturar**:

// ```js
// let str = "Gogogo John!";
// let regexp = /(?:go)+ (\w+)/i;
// let result = str.match(regexp);

// alert(result[0]); // "Gogogo John"
// alert(result[1]); // "John"
// alert(result.length); // 2 (sem o grupo 'go')
// ```

// ---

// ## ✅ Resumo

// | Recurso            | Descrição                                                                   |
// | ------------------ | --------------------------------------------------------------------------- |
// | `(abc)`            | Grupo de captura – pode aplicar quantificadores e acessar via índice.       |
// | `(?:abc)`          | Grupo **não capturável** – apenas para agrupar, não aparece nos resultados. |
// | `(?<nome>abc)`     | Grupo **nomeado** – acessível via `.groups.nome`.                           |
// | `match()`          | Retorna **1ª ocorrência + grupos**, mas **sem grupos se usar flag `g`**.    |
// | `matchAll()`       | Retorna **todas as ocorrências**, **com grupos**, mesmo com flag `g`.       |
// | `replace($n)`      | Usa grupos por índice (`$1`, `$2`, etc.) na substituição.                   |
// | `replace($<nome>)` | Usa grupos nomeados.                                                        |

// ---

// Se quiser, posso criar:

// * Um **guia de exercícios** sobre grupos de captura
// * Uma **visualização animada** com regex101 ou um playground
// * Um **resumo PDF** com exemplos

// Qual dessas opções você prefere?
