// Excelente! Aqui vai um **resumo claro, prático e direto** sobre **quantificadores greedy vs lazy** em expressões regulares JavaScript:

// ---

// ## 🔁 Greedy vs Lazy Quantifiers

// ### 🧃 **Greedy (ganancioso)** – **padrão**

// * Tenta **capturar o máximo possível**, e depois **volta (backtrack)** se necessário.

// ```js
// /.+/
// ```

// ```js
// let str = 'a "witch" and her "broom" is one';
// str.match(/".+"/g); // ["\"witch\" and her \"broom\""]
// ```

// ---

// ### 💤 **Lazy (preguiçoso)** – com `?` após o quantificador

// * Tenta **capturar o mínimo necessário** e **expande se precisar**.

// ```js
// /.+?/
// ```

// ```js
// let str = 'a "witch" and her "broom" is one';
// str.match(/".+?"/g); // ["\"witch\"", "\"broom\""]
// ```

// ---

// ## 🔢 Quantificadores suportam lazy

// | Greedy  | Lazy     | Significado    |
// | ------- | -------- | -------------- |
// | `+`     | `+?`     | Um ou mais     |
// | `*`     | `*?`     | Zero ou mais   |
// | `?`     | `??`     | Zero ou um     |
// | `{n,m}` | `{n,m}?` | De n a m vezes |

// ---

// ## ⚠️ Exemplo de erro comum com `.*`

// ```js
// let str = '<a href="link1" class="doc">... <a href="link2" class="doc">';
// str.match(/<a href=".*" class="doc">/g);
// // ERRO: junta os dois links num só match
// ```

// ### ✅ Correto com lazy `.*?`

// ```js
// str.match(/<a href=".*?" class="doc">/g);
// // OK: ["<a href=\"link1\" class=\"doc\">", "<a href=\"link2\" class=\"doc\">"]
// ```

// ### ❌ Lazy também pode falhar!

// ```js
// let str = '<a href="link1" class="wrong">... <p class="doc">';
// str.match(/<a href=".*?" class="doc">/g);
// // ERRO: casa até <p class="doc">
// ```

// ---

// ## 🛠️ **Solução alternativa mais precisa**:

// Use conjuntos de exclusão:

// ```js
// /<a href="[^"]*" class="doc">/
// ```

// * `[^"]*` = tudo **menos aspas** → evita invadir outros atributos/tags

// ```js
// let str = '<a href="link1" class="doc"> <a href="link2" class="doc">';
// str.match(/<a href="[^"]*" class="doc">/g);
// // ✅ ["<a href=\"link1\" class=\"doc\">", "<a href=\"link2\" class=\"doc\">"]
// ```

// ---

// ## ✅ Resumo Final

// | Conceito      | Greedy                                                  | Lazy                                              |
// | ------------- | ------------------------------------------------------- | ------------------------------------------------- |
// | Sintaxe       | `+`, `*`, `?`, `{n,m}`                                  | `+?`, `*?`, `??`, `{n,m}?`                        |
// | Comportamento | Pega tudo e volta se preciso                            | Pega o mínimo e cresce se necessário              |
// | Quando usar   | Quando você **quer tudo** ou sabe o limite da repetição | Quando precisa **delimitar capturas específicas** |

// ---

// Se quiser, posso te ajudar a:

// * Criar um **validador online**
// * Treinar com **exercícios**
// * Gerar **animações do comportamento do regex passo a passo**

// Deseja seguir por algum desses caminhos?
