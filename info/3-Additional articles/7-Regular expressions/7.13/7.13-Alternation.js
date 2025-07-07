// Claro! Aqui está **todo o conteúdo adaptado em português, com explicações claras e exemplos comentados** sobre **alternação (`|`) em expressões regulares (RegExp)**:

// ---

// ## 🔁 Alternação (OU) com `|`

// A **alternação** permite que você busque por **várias opções diferentes** dentro da mesma expressão regular. É o equivalente a um **“OU” lógico**.

// ---

// ### 📌 Sintaxe

// A alternação é representada por uma **barra vertical**: `|`.

// ```js
// html|php|java(script)?
// ```

// Essa expressão casa com:

// * `"html"`
// * `"php"`
// * `"java"`
// * ou `"javascript"` (o `(script)?` torna a parte `"script"` opcional)

// ---

// ### 🧪 Exemplo prático

// ```js
// let regexp = /html|php|css|java(script)?/gi;
// let str = "First HTML appeared, then CSS, then JavaScript";

// alert(str.match(regexp)); // ['HTML', 'CSS', 'JavaScript']
// ```

// ---

// ## 📦 Comparação: Alternação `|` vs Colchetes `[ ]`

// | Constructo | Significa                              |                                           |         |
// | ---------- | -------------------------------------- | ----------------------------------------- | ------- |
// | `[ae]`     | Um **único caractere**, 'a' **ou** 'e' |                                           |         |
// | \`a        | e\`                                    | A string inteira 'a' **ou** a string 'e'  |         |
// | `gr[ae]y`  | Cor cinza: "gray" ou "grey"            |                                           |         |
// | \`gr(a     | e)y\`                                  | Exatamente o mesmo de cima, mas usando \` | `e`()\` |
// | \`gra      | ey\`                                   | Casa com "gra" ou "ey"                    |         |

// ---

// ## 🧠 Uso com Parênteses

// Os **parênteses** controlam **qual parte** da expressão o `|` afeta.

// | Expressão      | Casamentos possíveis |                                   |
// | -------------- | -------------------- | --------------------------------- |
// | \`I love HTML  | CSS\`                | `"I love HTML"` ou `"CSS"`        |
// | \`I love (HTML | CSS)\`               | `"I love HTML"` ou `"I love CSS"` |

// ---

// ## ⏰ Exemplo: Validar Horário `hh:mm`

// ### ❌ Versão imprecisa:

// ```js
// /\d\d:\d\d/   // casa com 25:99 (tempo inválido)
// ```

// ---

// ### ✅ Versão correta com alternação

// Vamos dividir o horário em duas partes:

// #### **Horas (`hh`) válidas**:

// * `00` a `19` → `[01]\d`
// * `20` a `23` → `2[0-3]`

// ```js
// ([01]\d|2[0-3])
// ```

// #### **Minutos (`mm`) válidos**:

// * `00` a `59` → `[0-5]\d`

// ```js
// [0-5]\d
// ```

// ---

// ### 🧩 Juntando tudo:

// Cuidado: se não usarmos parênteses corretamente, o `|` afeta o lugar errado!

// ```js
// [01]\d|2[0-3]:[0-5]\d   // ❌ Errado! O | não se limita às horas
// ```

// ### ✅ Correto (parênteses no lugar certo):

// ```js
// /([01]\d|2[0-3]):[0-5]\d/g
// ```

// ---

// ### 🧪 Testando na prática:

// ```js
// let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

// let str = "00:00 10:10 23:59 25:99 1:2";

// alert(str.match(regexp)); // ["00:00", "10:10", "23:59"]
// ```

// * `25:99` → ❌ inválido
// * `1:2` → ❌ formato incorreto

// ---

// ## ✅ Resumo

// | Recurso        | Significado         |                                                 |                          |
// | -------------- | ------------------- | ----------------------------------------------- | ------------------------ |
// | \`             | \`                  | Alternância (OU lógico)                         |                          |
// | \`a            | b                   | c\`                                             | Casa com "a", "b" ou "c" |
// | \`gr(a         | e)y\`               | Equivale a `gr[ae]y`, casa com "gray" ou "grey" |                          |
// | \`I love (HTML | CSS)\`              | Casa com "I love HTML" ou "I love CSS"          |                          |
// | \`(\[01]\d     | 2\[0-3]):\[0-5]\d\` | Expressão robusta para horários válidos `hh:mm` |                          |

// ---

// Se quiser, posso criar:

// * ✅ Exercícios de Regex com alternação
// * 🧪 Exemplos com nomes, arquivos, URLs etc.
// * 📊 Um quadro visual de diferenças entre `|`, `[ ]` e `()`

// Quer continuar com outro tema de regex ou testar algum caso específico?
