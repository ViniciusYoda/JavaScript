// Excelente resumo sobre **escaping** e **caracteres especiais** em expressões regulares! Vamos organizar as informações em um guia prático e direto:

// ---

// ## 🧨 Caracteres especiais em RegExp

// Estes têm **significado especial** e **precisam de escape** se usados literalmente:

// ```
// [ \ ^ $ . | ? * + ( ) { } ]
// ```

// E também a **barra normal** `/` quando usamos a notação `/.../`.

// ---

// ## ✅ Para usar literalmente:

// | Símbolo que você quer encontrar | RegExp correta                             |      |
// | ------------------------------- | ------------------------------------------ | ---- |
// | ponto `.`                       | `\.`                                       |      |
// | parênteses `()`                 | `\(` e `\)`                                |      |
// | barra `\`                       | `\\`                                       |      |
// | barra normal `/`                | `\/` (em `/.../`) ou `"/"` no `new RegExp` |      |
// | cifrão `$`                      | `\$`                                       |      |
// | circunflexo `^`                 | `\^`                                       |      |
// | colchetes `[]`                  | `\[` e `\]`                                |      |
// | chaves `{}`                     | `\{` e `\}`                                |      |
// | pipe \`                         | \`                                         | `\|` |
// | mais `+`                        | `\+`                                       |      |
// | interrogação `?`                | `\?`                                       |      |
// | asterisco `*`                   | `\*`                                       |      |

// ---

// ## ⚠️ Strings no `new RegExp()`

// Strings no JavaScript **consomem a barra invertida** `\`, então:

// ```js
// // errado:
// new RegExp("\d\.\d") // vira "d.d"

// // correto:
// new RegExp("\\d\\.\\d") // vira \d\.\d corretamente
// ```

// ---

// ## ✅ Exemplos práticos

// ```js
// // Encontrar número no formato 5.1
// console.log("Capítulo 5.1".match(/\d\.\d/)); // 5.1

// // Criar dinamicamente com new RegExp
// let pattern = "\\d\\.\\d";
// let regex = new RegExp(pattern);
// console.log("Capítulo 5.1".match(regex)); // 5.1

// // Encontrar barra invertida
// console.log("Caminho: C:\\Users\\Vinicius".match(/\\/g)); // [ '\\', '\\' ]

// // Encontrar barra normal '/'
// console.log("/".match(/\//)); // [ '/' ]
// console.log("/".match(new RegExp("/"))); // [ '/' ]
// ```

// ---

// ## ✅ Resumo final

// * **Escape com `\`** para usar caracteres especiais literalmente.
// * **Dobre a barra invertida (`\\`)** se estiver passando uma string para `new RegExp()`.
// * **`\` é especial tanto no RegExp quanto em strings JS**, então tenha atenção dupla ao usá-la!

// Se quiser, posso te dar uma tabela visual pronta para imprimir ou usar como referência rápida. Deseja isso?
