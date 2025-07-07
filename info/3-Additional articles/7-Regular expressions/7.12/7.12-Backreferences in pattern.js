// Claro! Aqui está **todo o conteúdo adaptado, traduzido e explicado de forma clara** sobre **backreferences em expressões regulares**, incluindo exemplos com **`\1` e `\k<nome>`**, e observações importantes para evitar erros comuns.

// ---

// ## 🔁 **Backreferences em padrões** (`\1`, `\k<nome>`)

// Além de capturar partes de uma string com parênteses `( ... )`, podemos **referenciar esses grupos dentro da própria regex** — isso se chama **backreference** (ou retrovisão).

// ---

// ### 📌 **Backreference numérica**: `\N`

// Podemos acessar o valor capturado por um grupo anterior usando **`\1`**, **`\2`**, etc., onde o número corresponde à **ordem do grupo** na expressão regular.

// ---

// ### 🧪 **Exemplo: encontrar strings entre aspas simples ou duplas**

// #### ❌ Forma errada (resulta em erro):

// ```js
// let str = `He said: "She's the one!".`;
// let regexp = /['"](.*?)['"]/g;

// alert(str.match(regexp)); // ["She'"]
// ```

// * A regex encontra **qualquer aspas de abertura**, mas fecha com **qualquer outra aspas**, mesmo que diferente.
// * Resultado incorreto: `"She'` (mistura aspas duplas e simples)

// ---

// ### ✅ **Solução correta com backreference**:

// ```js
// let str = `He said: "She's the one!".`;
// let regexp = /(['"])(.*?)\1/g;

// alert(str.match(regexp)); // ["\"She's the one!\""]
// ```

// * `(['"])` → captura a **aspas de abertura**
// * `(.*?)` → captura o conteúdo dentro
// * `\1` → exige que a **mesma aspas usada para abrir** também seja usada para **fechar**

// ---

// ### ❗ Importante: grupos não capturáveis (`(?:...)`) **não podem ser referenciados**

// ```js
// (?:['"])  // ❌ Não pode usar \1 para isso
// (['"])    // ✅ Pode usar \1
// ```

// ---

// ### 🧠 Cuidado com a sintaxe:

// | Contexto              | Sintaxe    |
// | --------------------- | ---------- |
// | Dentro do **padrão**  | `\1`, `\2` |
// | Dentro do **replace** | `$1`, `$2` |

// ---

// ## 🏷️ **Backreference com nome**: `\k<nome>`

// Quando usamos **grupos nomeados** com `(?<nome>...)`, podemos referenciá-los com `\k<nome>`.

// ---

// ### 🔍 Exemplo com `\k<nome>`

// ```js
// let str = `He said: "She's the one!".`;

// let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

// alert(str.match(regexp)); // ["\"She's the one!\""]
// ```

// * `(?<quote>['"])` → grupo nomeado `quote`, captura a aspas de abertura
// * `\k<quote>` → exige que a aspas de fechamento seja **a mesma capturada**

// ---

// ### 🧪 Outro exemplo: identificar pares `<>`, `[]`, `()`

// ```js
// let str = "<tag> [value] (content)";
// let regexp = /(?<open>[<\[\(]).*?\k<open>/g;

// alert(str.match(regexp)); // null (porque o fechamento não está igual ao `open`)
// ```

// 👉 Nesse caso **não funciona**, pois o fechamento não é igual à abertura (e deve ser diferente). Se quiser validar **pares corretamente fechados**, teria que usar lookaheads ou abordagens diferentes.

// ---

// ## ✅ Resumo

// | Recurso          | Descrição                                                         |
// | ---------------- | ----------------------------------------------------------------- |
// | `(abc)`          | Grupo de captura                                                  |
// | `\1`, `\2`, etc. | Referência ao grupo capturado anteriormente por **número**        |
// | `(?<nome>...)`   | Grupo de captura com nome                                         |
// | `\k<nome>`       | Referência ao grupo capturado anteriormente por **nome**          |
// | `(?:...)`        | Grupo **não capturável** (não pode ser referenciado)              |
// | Em `replace()`   | Use `$1`, `$2` ou `$<nome>` para referenciar os grupos capturados |

// ---

// ### 🚀 Quer testar visualmente?

// Você pode usar sites como:

// * [regex101.com](https://regex101.com/)
// * [regexr.com](https://regexr.com/)

// Eles mostram **grupos, referências, e capturas em tempo real**.

// ---

// Se quiser, posso criar:

// * ✅ Um **resumo visual em PDF**
// * 💡 Exercícios práticos com `\1`, `\k<nome>`, `replace`
// * 🔍 Casos reais: como validar **aspas corretamente**, **tags HTML aninhadas**, etc.

// Qual você prefere agora?
