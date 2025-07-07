// Claro! Aqui está a **adaptação completa em português** do conteúdo sobre **Catastrophic Backtracking** (Retrocesso catastrófico) em expressões regulares:

// ---

// ## 💥 **Catastrophic Backtracking** (Retrocesso Catastrófico)

// Algumas expressões regulares parecem simples, **mas podem demorar MUITO para rodar**, ou até mesmo “travar” o mecanismo de JavaScript.

// **Sintoma típico:** o regex funciona bem na maioria das vezes, mas com certas strings, ele **trava o navegador**, consome 100% da CPU, e às vezes até paralisa o servidor (no backend).

// ---

// ## 😱 Exemplo de travamento

// Suponha que queremos verificar se uma string contém **palavras (`\w+`) separadas opcionalmente por espaço (`\s?`)**.

// A regex mais direta seria:

// ```js
// let regexp = /^(\w+\s?)*$/;

// alert( regexp.test("Frase válida") ); // true
// alert( regexp.test("Caracteres inválidos: @#!") ); // false
// ```

// Até aqui, parece funcionar. Mas com certas entradas… **trava tudo!**

// ```js
// let regexp = /^(\w+\s?)*$/;
// let str = "Uma string que leva muito tempo ou até trava o regex!";

// alert( regexp.test(str) ); // ⚠️ PODE TRAVAR O NAVEGADOR!
// ```

// ---

// ## 🧠 O que está acontecendo?

// Para entender, vamos **simplificar**:

// * Removendo espaços: `^(\w+)*$`
// * Substituindo `\w` por `\d` (dígitos): `^(\d+)*$`

// ```js
// let regexp = /^(\d+)*$/;
// let str = "01234567890123456789z";

// alert( regexp.test(str) ); // ⚠️ Muito lento!
// ```

// Por quê?

// A engine tenta encontrar TODAS as **combinações possíveis** de repetições de `\d+`, mesmo sabendo que a string termina com `z`, que quebra a validação.

// Exemplos de combinações que ela tenta:

// * (123456789)z
// * (12345678)(9)z
// * (1234)(56789)z
// * (12)(34)(56789)z
// * ... centenas de outras!

// 💡 Para uma sequência com `n` dígitos, há **2ⁿ⁻¹** combinações possíveis.

// ---

// ## 🔁 Mesma coisa com palavras

// A regex `^(\w+\s?)*$` em uma string como `"input que trava!"` sofre do mesmo problema:

// * Porque "input" pode ser:

//   * (input)
//   * (in)(put)
//   * (i)(n)(p)(u)(t)
//   * e assim por diante…

// Tudo isso é tentado **porque o espaço é opcional** com `\s?`.

// ---

// ## ✅ Como resolver?

// ### 1. **Reduzir o número de combinações possíveis**

// Torne o espaço **obrigatório** entre palavras, exceto a última:

// ```js
// let regexp = /^(\w+\s)*\w*$/;
// let str = "Uma string que não trava!";

// alert( regexp.test(str) ); // true
// ```

// * `(\w+\s)*` → palavras seguidas de espaço
// * `\w*` → última palavra, opcionalmente sem espaço

// ✅ A performance melhora muito!

// ---

// ### 2. **Evitar backtracking (retrocesso)**

// Podemos impedir que o `+` retroceda, simulando um comportamento **possessivo**.

// JavaScript não suporta quantificadores possessivos diretamente (`\w++`), mas podemos **emular** com **lookahead**:

// ```js
// let regexp = /^((?=(\w+))\2\s?)*$/;

// alert( regexp.test("Frase válida") ); // true
// ```

// * `(?=(\w+))` → lookahead para capturar a palavra inteira
// * `\2` → repete a palavra exata
// * `\s?` → espaço opcional

// ➡️ Isso impede que a engine tente dividir as palavras de forma forçada (evita `backtracking`).

// ---

// ### ✅ Versão com grupos nomeados (mais legível):

// ```js
// let regexp = /^((?=(?<palavra>\w+))\k<palavra>\s?)*$/;

// let str = "Uma string que trava o regex!";
// alert( regexp.test(str) ); // false

// alert( regexp.test("Uma string correta") ); // true
// ```

// ---

// ## 🧨 Por que isso trava?

// Resumo:

// * A regex engine tenta combinar todas as formas possíveis de dividir a string em partes que "encaixem" na expressão.
// * Se houver muitas combinações possíveis (como `(\d+)*` ou `(\w+\s?)*`), isso pode gerar **milhões ou bilhões de tentativas**.
// * Isso é chamado de **Retrocesso Catastrófico** (*Catastrophic Backtracking*).

// ---

// ## 🛡️ Como evitar retrocesso catastrófico

// | Estratégia                           | Descrição                                                               |
// | ------------------------------------ | ----------------------------------------------------------------------- |
// | ✅ Refatorar a regex                  | Reduza as combinações. Ex: torne espaços obrigatórios.                  |
// | ✅ Emular quantificadores possessivos | Use `(?=(\w+))\1` para capturar uma palavra inteira e impedir divisões. |
// | ⚠️ Evite `*` ou `+` aninhados        | Como `(\w+)*` — isso aumenta exponencialmente as combinações.           |
// | ❌ Não confie em `+?` (lazy)          | Isso muda a ordem, mas **não resolve** o problema.                      |

// ---

// ## 📌 Conclusão

// **Catastrophic Backtracking** pode ser evitado com boas práticas:

// * Reescreva regexes para **reduzir caminhos possíveis**
// * Use **lookaheads com grupos capturadores** para simular possessividade
// * Evite expressões como `(\w+)*`, `(\d+)*` e similares

// Se quiser, posso:

// * ✅ Otimizar regexes específicas do seu projeto
// * ⚠️ Testar regexes que estejam travando
// * 📈 Criar validações eficientes para formulários, senhas, emails etc.

// Quer que eu revise alguma expressão sua que esteja travando ou lenta?
