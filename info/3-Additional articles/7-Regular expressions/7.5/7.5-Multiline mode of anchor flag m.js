// Perfeito! Vamos resumir o conceito de **multiline mode** com a flag `m` em expressões regulares, focando em como ela altera o comportamento dos **anchors** `^` e `$`.

// ---

// ## 🧷 Flag `m` (multiline): o que faz?

// Ativa o **modo multilinha**, alterando o comportamento dos **anchors**:

// | Anchor | Sem `m`                      | Com `m`                  |
// | ------ | ---------------------------- | ------------------------ |
// | `^`    | Início da **string inteira** | Início de **cada linha** |
// | `$`    | Fim da **string inteira**    | Fim de **cada linha**    |

// ---

// ## 📌 Exemplo: `^` com e sem flag `m`

// ```js
// let str = `1st place: Winnie
// 2nd place: Piglet
// 3rd place: Eeyore`;

// console.log(str.match(/^\d/g));   // ['1']  ← apenas no início da string
// console.log(str.match(/^\d/gm));  // ['1', '2', '3']  ← início de cada linha
// ```

// ---

// ## 📌 Exemplo: `$` com e sem flag `m`

// ```js
// let str = `Winnie: 1
// Piglet: 2
// Eeyore: 3`;

// console.log(str.match(/\d$/g));   // ['3']  ← apenas no final da string
// console.log(str.match(/\d$/gm));  // ['1', '2', '3']  ← fim de cada linha
// ```

// ---

// ## 🧠 Explicação técnica

// * **`^` com `m`** casa qualquer posição **logo após um `\n`** (ou no início da string).
// * **`$` com `m`** casa qualquer posição **logo antes de um `\n`** (ou no fim da string).

// ---

// ## 🆚 Diferença entre usar `^/$` e `\n`

// | Padrão   | Casa o quê?                           | Inclui `\n`? | Exemplo resultado |
// | -------- | ------------------------------------- | ------------ | ----------------- |
// | `/^\d/m` | Dígito no início de linha             | Não          | `['1', '2', '3']` |
// | `/\d\n/` | Dígito **seguido de** quebra de linha | Sim          | `['1\n', '2\n']`  |

// ---

// ## ✔️ Quando usar cada um?

// * Use `^` e `$` com flag `m` quando quiser **verificar posição** (início/fim da linha).
// * Use `\n` quando quiser **capturar a quebra de linha** no resultado.

// ---

// Se quiser, posso te mostrar exemplos com *replace*, *test*, ou aplicar isso a um caso real como validar linhas de um log, CSV ou código. Deseja isso?
