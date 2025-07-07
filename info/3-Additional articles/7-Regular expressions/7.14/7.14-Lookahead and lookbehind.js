// Claro! Aqui está a **adaptação completa em português** do conteúdo sobre **Lookahead e Lookbehind** (também chamados de *lookarounds*) em expressões regulares:

// ---

// ## 👀 Lookahead e Lookbehind (Lookaround)

// Às vezes, precisamos encontrar um padrão **somente se ele for seguido ou precedido por outro padrão**.

// Para isso, usamos **lookahead** (olhar à frente) e **lookbehind** (olhar para trás), juntos chamados de **lookaround**.

// ---

// ## 🔮 Lookahead (olhar à frente)

// ### ✅ Sintaxe:

// ```
// X(?=Y)
// ```

// Significa: **procure X apenas se for seguido por Y**.
// ⚠️ O conteúdo de `(?=Y)` **não entra no resultado final**.

// ### 🧪 Exemplo prático:

// ```js
// let str = "1 peru custa 30€";

// let resultado = str.match(/\d+(?=€)/);

// alert(resultado); // 30
// ```

// * `\d+` encontra o número.
// * `(?=€)` exige que venha um "€" logo depois.
// * Mas **o "€" não aparece no resultado**.

// ---

// ### 🧠 Lookahead com múltiplas condições

// Você pode usar **vários lookaheads** em sequência:

// ```js
// let str = "1 peru custa 30€";

// let resultado = str.match(/\d+(?=\s)(?=.*30)/);

// alert(resultado); // 1
// ```

// * `(?=\s)` exige um espaço após o número.
// * `(?=.*30)` verifica se existe "30" depois, em qualquer parte da string.

// ---

// ## ❌ Lookahead negativo

// ### 🔥 Sintaxe:

// ```
// X(?!Y)
// ```

// Significa: **procure X apenas se NÃO for seguido por Y**.

// ### 🧪 Exemplo:

// ```js
// let str = "2 perus custam 60€";

// let resultado = str.match(/\d+\b(?!€)/g);

// alert(resultado); // 2
// ```

// * Encontra **números que não são seguidos por "€"**.

// ---

// ## 🔙 Lookbehind (olhar para trás)

// > ⚠️ **Compatibilidade:** Nem todos os navegadores suportam Lookbehind. Está disponível apenas em **navegadores com motor V8**, como o Chrome.

// ### ✅ Sintaxe:

// * **Lookbehind positivo:** `(?<=Y)X` → casa com `X`, **se for precedido por `Y`**
// * **Lookbehind negativo:** `(?<!Y)X` → casa com `X`, **se NÃO for precedido por `Y`**

// ---

// ### 🧪 Exemplo de Lookbehind positivo:

// ```js
// let str = "1 peru custa $30";

// let resultado = str.match(/(?<=\$)\d+/);

// alert(resultado); // 30
// ```

// * `(?<=\$)` exige que antes do número venha um **\$**.
// * O símbolo **\$ não aparece no resultado**.

// ---

// ### 🧪 Exemplo de Lookbehind negativo:

// ```js
// let str = "2 perus custam $60";

// let resultado = str.match(/(?<!\$)\b\d+/g);

// alert(resultado); // 2
// ```

// * Encontra **números que não vêm depois de um \$**.

// ---

// ## 🎯 Capturando conteúdo dentro do lookaround

// Normalmente, o conteúdo do lookaround **não aparece no resultado**. Mas você pode **capturá-lo** com um par de parênteses adicionais.

// ### 🧪 Exemplo com lookahead e captura:

// ```js
// let str = "1 peru custa 30€";

// let regexp = /\d+(?=(€|kr))/;

// alert(str.match(regexp)); // 30, €
// ```

// * O valor (€ ou kr) é capturado, pois está entre parênteses.

// ---

// ### 🧪 Exemplo com lookbehind e captura:

// ```js
// let str = "1 peru custa $30";

// let regexp = /(?<=(\$|£))\d+/;

// alert(str.match(regexp)); // 30, $
// ```

// ---

// ## 📋 Resumo dos tipos de lookaround

// | Expressão | Tipo                | Significado                                |
// | --------- | ------------------- | ------------------------------------------ |
// | `X(?=Y)`  | Lookahead positivo  | Casa com `X`, se seguido por `Y`           |
// | `X(?!Y)`  | Lookahead negativo  | Casa com `X`, se **não** seguido por `Y`   |
// | `(?<=Y)X` | Lookbehind positivo | Casa com `X`, se precedido por `Y`         |
// | `(?<!Y)X` | Lookbehind negativo | Casa com `X`, se **não** precedido por `Y` |

// ---

// ## 🛠️ Alternativa sem lookaround

// Se o seu navegador não suportar lookbehind, você pode:

// * **Usar `matchAll`** e checar o contexto via `index` no resultado.
// * **Fazer um filtro manual** após o `match` tradicional.

// ---

// Se quiser, posso:

// * 🧪 Criar exercícios com lookahead/lookbehind
// * 💡 Criar regex para validar CPF, preços, e-mails etc.
// * ✅ Indicar onde o lookaround melhora a legibilidade

// Deseja ver algum exemplo aplicado ao seu código real?
