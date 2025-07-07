// Aqui está um **resumo completo e didático sobre Expressões Regulares em JavaScript**, com foco em **patterns**, **flags** e os **métodos principais**:

// ---

// ## 🧾 O que é uma Expressão Regular?

// Uma **expressão regular** (ou *regexp*) é um padrão utilizado para buscar, testar ou substituir trechos de texto.

// ### ✏️ Como criar uma expressão regular?

// Você pode criar de duas formas:

// #### ✅ Forma curta (mais comum):

// ```js
// let regex = /padrao/flags;
// ```

// #### ✅ Forma longa (usada quando o padrão é dinâmico):

// ```js
// let regex = new RegExp("padrao", "flags");
// ```

// Exemplo com entrada do usuário:

// ```js
// let tag = prompt("Qual tag?");
// let regex = new RegExp(`<${tag}>`);
// ```

// ---

// ## 🚩 Flags disponíveis

// | Flag | Significado | Explicação                              |
// | ---- | ----------- | --------------------------------------- |
// | `g`  | Global      | Encontra **todas** as ocorrências       |
// | `i`  | Ignore case | Ignora **maiúsculas/minúsculas**        |
// | `m`  | Multiline   | Permite `^` e `$` em várias linhas      |
// | `s`  | DotAll      | Permite que `.` também combine com `\n` |
// | `u`  | Unicode     | Suporte completo a Unicode e emojis     |
// | `y`  | Sticky      | Procura na **posição exata** onde parou |

// ---

// ## 🔍 Métodos mais usados

// ### 🔹 `str.match(regexp)`

// * Retorna as correspondências encontradas.
// * Se usar `g`, retorna **todas**.
// * Sem `g`, retorna **apenas a primeira**, com detalhes.

// ```js
// "Olá mundo!".match(/o/gi); // ["O", "o"]
// "Olá mundo!".match(/o/i);  // ["O"] (com detalhes)
// ```

// ⚠️ Se **não encontrar nada**, retorna `null` (não array):

// ```js
// let result = "JS".match(/html/i); // null
// let result = "JS".match(/html/i) || []; // [] ← forma segura
// ```

// ---

// ### 🔹 `str.replace(regexp, replacement)`

// * Substitui as correspondências pelo `replacement`.

// ```js
// "Olá mundo!".replace(/mundo/, "JavaScript"); // "Olá JavaScript!"
// ```

// Com flag `g` substitui todas:

// ```js
// "Olá mundo mundo".replace(/mundo/g, "JS"); // "Olá JS JS"
// ```

// #### 🪄 Caracteres especiais em `replacement`:

// | Símbolo   | Significado                         |
// | --------- | ----------------------------------- |
// | `$&`      | O trecho que casou (match completo) |
// | \`$\`\`   | Parte antes da match                |
// | `$'`      | Parte depois da match               |
// | `$$`      | Insere um `$` literal               |
// | `$n`      | Conteúdo da *n*-ésima captura       |
// | `$<name>` | Conteúdo do grupo nomeado           |

// ```js
// "I love HTML".replace(/HTML/, "$& and JS");
// // Resultado: "I love HTML and JS"
// ```

// ---

// ### 🔹 `regexp.test(str)`

// * Retorna `true` se **encontrar pelo menos uma correspondência**, `false` caso contrário.

// ```js
// let regex = /js/i;
// regex.test("JavaScript"); // true
// regex.test("HTML");       // false
// ```

// ---

// ## 🧠 Resumo final

// * Use `/padrão/flags` para criar expressões regulares.
// * As flags controlam o comportamento (global, case-insensitive, multiline, etc).
// * `str.match(regexp)` busca correspondências.
// * `str.replace(regexp, replacement)` substitui trechos com base na regexp.
// * `regexp.test(str)` verifica se há pelo menos uma correspondência.

// ---

// Se quiser, posso te mostrar uma tabela com exemplos práticos de expressões comuns (como validar e-mails, senhas, CEP, etc). Deseja isso?
