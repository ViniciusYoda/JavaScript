// Ótima explicação sobre o **word boundary** `\b`! Vou resumir e complementar para facilitar o entendimento:

// ---

// # Word boundary `\b` – definição e comportamento

// * É um **teste posicional** (como `^` e `$`), ou seja, **não consome caracteres**.
// * Verifica se a posição atual na string é uma **fronteira entre “caracteres de palavra” e “não palavra”**.

// ---

// # Quando uma posição é um word boundary?

// 1. No início da string, se o primeiro caractere for “de palavra” (`\w`).
// 2. No fim da string, se o último caractere for “de palavra” (`\w`).
// 3. Entre dois caracteres onde **um é `\w` e o outro não é `\w`**.

// ---

// # O que é caractere `\w`?

// * Letras latinas (a-z, A-Z),
// * Dígitos (0-9),
// * Underscore `_`.

// Não inclui caracteres como letras cirílicas, chinesas, emojis, etc.

// ---

// # Exemplos:

// ```js
// alert("Hello, Java!".match(/\bJava\b/));      // "Java"
// alert("Hello, JavaScript!".match(/\bJava\b/)); // null (Java não é palavra isolada)

// alert("1 23 456 78".match(/\b\d\d\b/g));      // ["23", "78"]
// alert("12,34,56".match(/\b\d\d\b/g));          // ["12", "34", "56"]
// ```

// ---

// # Importante:

// * `\b` só funciona para **palavras formadas por caracteres latinos, dígitos e underscore**.
// * Não funciona para alfabetos não latinos (ex: cirílico, chinês) nem para símbolos Unicode que não sejam `\w`.

// ---

// # Visualização para `"Hello, Java!"`

// | Posição | Caracteres ao redor                   | É word boundary? |
// | ------- | ------------------------------------- | ---------------- |
// | 0       | Antes do H (string start) e H (`\w`)  | Sim              |
// | 5       | Entre o o (`\w`) e vírgula (não `\w`) | Sim              |
// | 7       | Entre espaço (não `\w`) e J (`\w`)    | Sim              |
// | 11      | Entre a (`\w`) e ! (não `\w`)         | Sim              |

// ---

// Se quiser, posso ajudar a construir regex para casos com palavras em alfabetos não latinos (usando Unicode `\p{...}`) ou outras dúvidas! Quer?
