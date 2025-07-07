// Aqui está um **resumo prático e didático sobre classes de caracteres em expressões regulares (RegExp) no JavaScript**, com exemplos e explicações diretas:

// ---

// ## 🧱 O que são **classes de caracteres**?

// Classes de caracteres são **atalhos que representam grupos comuns de caracteres**, como dígitos, letras ou espaços.

// ---

// ## 🔹 As classes principais

// | Classe | Significado                         | Exemplo prático                                        |
// | ------ | ----------------------------------- | ------------------------------------------------------ |
// | `\d`   | **Dígito** (0 a 9)                  | `/\d/` → encontra "3" em `"a3b"`                       |
// | `\D`   | **Não dígito**                      | `/\D/` → encontra "a" em `"a3b"`                       |
// | `\s`   | **Espaço** (espaço, tab, \n...)     | `/\s/` → encontra " " em `"a b"`                       |
// | `\S`   | **Não espaço**                      | `/\S/` → encontra "a" em `" a"`                        |
// | `\w`   | **Caracter "de palavra"**           | letras latinas, números e `_`                          |
// | `\W`   | **Não "de palavra"**                | símbolos como `@`, `-`, espaço, etc.                   |
// | `.`    | **Qualquer caractere**, exceto `\n` | `/./` encontra qualquer coisa (menos quebras de linha) |

// ---

// ## ✏️ Exemplos rápidos

// ### 📞 Limpar um número de telefone

// ```js
// let str = "+7(903)-123-45-67";

// // Opção 1: pega todos os dígitos e junta
// let result = str.match(/\d/g).join('');
// console.log(result); // "79031234567"

// // Opção 2: remove tudo que **não** for dígito
// let result2 = str.replace(/\D/g, '');
// console.log(result2); // "79031234567"
// ```

// ---

// ## ⛔ Inversas com letras maiúsculas

// * `\d` → dígito
//   `\D` → **não** dígito
// * `\s` → espaço
//   `\S` → **não** espaço
// * `\w` → caractere de palavra
//   `\W` → **não** caractere de palavra

// Exemplo:

// ```js
// "abc123".match(/\D/g); // ['a', 'b', 'c']
// ```

// ---

// ## ⚫ O ponto `.`: **qualquer caractere (menos `\n`)**

// ```js
// "A1".match(/./g); // ['A', '1']
// "A\nB".match(/A.B/); // null (ponto NÃO casa com \n)
// ```

// ### ✅ Para que `.` case com qualquer caractere, inclusive `\n`:

// Use a flag `s`:

// ```js
// "A\nB".match(/A.B/s); // ["A\nB"]
// ```

// Ou use o truque compatível com qualquer navegador:

// ```js
// "A\nB".match(/A[\s\S]B/); // ["A\nB"]
// ```

// ---

// ## ⚠️ Espaços importam!

// RegExp **não ignora espaços automaticamente**. Eles precisam estar **exatamente no padrão**.

// Errado (sem considerar espaços):

// ```js
// "1 - 5".match(/\d-\d/); // null
// ```

// Correto:

// ```js
// "1 - 5".match(/\d\s-\s\d/); // ["1 - 5"]
// ```

// ---

// ## ✅ Resumo das principais classes

// | Classe | Significa                       |
// | ------ | ------------------------------- |
// | `\d`   | Dígitos \[0-9]                  |
// | `\D`   | Tudo exceto dígitos             |
// | `\s`   | Espaço, tab, nova linha, etc    |
// | `\S`   | Tudo exceto espaço              |
// | `\w`   | Letras latinas, números e `_`   |
// | `\W`   | Tudo exceto `\w`                |
// | `.`    | Qualquer caractere (menos `\n`) |

// ---

// Se quiser, posso te mostrar exemplos com **validação de CEP, CPF, e-mail, senhas**, etc, usando essas classes. Quer seguir por esse caminho?
