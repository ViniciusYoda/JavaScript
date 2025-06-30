// Aqui está a tradução completa e adaptada para o português de todo o conteúdo sobre **Generators (Geradores)** em JavaScript:

// ---

// ## Geradores

// Funções comuns retornam apenas **um único valor** (ou nada).

// **Geradores** podem retornar (“`yield`”) **múltiplos valores**, um após o outro, sob demanda. Eles funcionam muito bem com iteráveis, permitindo criar fluxos de dados com facilidade.

// ---

// ## Funções Geradoras

// Para criar um gerador, usamos uma sintaxe especial: `function*`, ou seja, uma **função geradora**.

// Veja como fica:

// ```javascript
// function* gerarSequencia() {
//   yield 1;
//   yield 2;
//   return 3;
// }
// ```

// Funções geradoras se comportam de maneira diferente das funções normais. Ao serem chamadas, **não executam o código imediatamente**. Em vez disso, retornam um **objeto gerador** especial que controla a execução.

// ### Exemplo:

// ```javascript
// function* gerarSequencia() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// let gerador = gerarSequencia();
// alert(gerador); // [object Generator]
// ```

// O código da função **ainda não começou a rodar** nesse ponto.

// ---

// ### Método `next()`

// O principal método de um gerador é `next()`. Quando chamado, ele executa o código **até o próximo `yield`**, pausa a execução e **retorna o valor produzido**.

// O resultado de `next()` é sempre um objeto com duas propriedades:

// * `value`: o valor produzido pelo `yield`.
// * `done`: `true` se a função terminou; caso contrário, `false`.

// #### Exemplo:

// ```javascript
// function* gerarSequencia() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// let gerador = gerarSequencia();

// let um = gerador.next();
// alert(JSON.stringify(um)); // {value: 1, done: false}

// let dois = gerador.next();
// alert(JSON.stringify(dois)); // {value: 2, done: false}

// let tres = gerador.next();
// alert(JSON.stringify(tres)); // {value: 3, done: true}
// ```

// Chamadas adicionais a `gerador.next()` retornarão `{done: true}` e não farão mais nada.

// ---

// ### `function* f(...)` ou `function *f(...)`?

// As duas sintaxes são válidas. Porém, a mais comum é `function* f(...)`, já que o `*` indica o **tipo da função** (geradora) e deve ficar junto do `function`.

// ---

// ## Geradores são Iteráveis

// Geradores implementam a interface de **iteráveis**, então você pode usá-los com `for..of`:

// ```javascript
// function* gerarSequencia() {
//   yield 1;
//   yield 2;
//   return 3;
// }

// let gerador = gerarSequencia();

// for (let valor of gerador) {
//   alert(valor); // 1, depois 2
// }
// ```

// > Note que o `return 3` **não aparece** no `for..of`, pois ele ignora o valor final quando `done: true`.

// Se quiser que todos os valores sejam exibidos, use `yield` em vez de `return`:

// ```javascript
// function* gerarSequencia() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// ```

// ---

// ### Usando o Operador Spread

// Como geradores são iteráveis, você pode usar o operador `...`:

// ```javascript
// function* gerarSequencia() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let sequencia = [0, ...gerarSequencia()];
// alert(sequencia); // 0,1,2,3
// ```

// ---

// ## Usando Geradores para Iteráveis

// Antes criamos um objeto iterável manualmente. Com geradores, o código fica muito mais simples:

// ```javascript
// let intervalo = {
//   from: 1,
//   to: 5,

//   *[Symbol.iterator]() {
//     for (let valor = this.from; valor <= this.to; valor++) {
//       yield valor;
//     }
//   }
// };

// alert([...intervalo]); // 1,2,3,4,5
// ```

// Essa versão é mais compacta e faz exatamente o mesmo que a versão longa.

// ---

// ## Geradores Podem Produzir Valores Infinitamente

// Podemos criar geradores que **nunca param**, como um gerador de números aleatórios. Porém, precisamos de um `break` ou `return` dentro de um `for..of`, senão o loop será infinito.

// ---

// ## Composição de Geradores

// Podemos usar `yield*` para **"encaixar"** um gerador dentro de outro:

// ```javascript
// function* gerarSequencia(inicio, fim) {
//   for (let i = inicio; i <= fim; i++) yield i;
// }

// function* gerarCodigosSenha() {
//   yield* gerarSequencia(48, 57);  // 0–9
//   yield* gerarSequencia(65, 90);  // A–Z
//   yield* gerarSequencia(97, 122); // a–z
// }

// let str = '';

// for (let code of gerarCodigosSenha()) {
//   str += String.fromCharCode(code);
// }

// alert(str); // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
// ```

// `yield*` **passa a execução** para o gerador interno e continua normalmente.

// ---

// ## `yield` é Uma Via de Mão Dupla

// Diferente das funções normais, os geradores **podem trocar dados com o código externo**.

// Você pode **enviar valores de volta para dentro do gerador** usando `generator.next(valor)`:

// ```javascript
// function* gen() {
//   let resultado = yield "2 + 2 = ?";
//   alert(resultado);
// }

// let g = gen();

// let pergunta = g.next().value; // "2 + 2 = ?"
// g.next(4); // 4 é passado como resultado para dentro do gerador
// ```

// > O primeiro `.next()` **sempre deve ser chamado sem argumentos**.

// Podemos até usar `setTimeout()` para continuar depois:

// ```javascript
// setTimeout(() => g.next(4), 1000);
// ```

// Outro exemplo com várias interações:

// ```javascript
// function* gen() {
//   let ask1 = yield "2 + 2 = ?";
//   alert(ask1); // 4

//   let ask2 = yield "3 * 3 = ?";
//   alert(ask2); // 9
// }

// let g = gen();
// alert(g.next().value);      // "2 + 2 = ?"
// alert(g.next(4).value);     // "3 * 3 = ?"
// alert(g.next(9).done);      // true
// ```

// ---

// ## `generator.throw`

// Você também pode **lançar um erro** dentro do gerador com `generator.throw(erro)`:

// ```javascript
// function* gen() {
//   try {
//     let resultado = yield "2 + 2 = ?";
//   } catch (e) {
//     alert(e); // mostra o erro
//   }
// }

// let g = gen();
// g.next(); // inicia o gerador
// g.throw(new Error("Resposta não encontrada no banco de dados"));
// ```

// Se o erro **não for tratado dentro do gerador**, ele será propagado para o código externo.

// ---

// ## `generator.return`

// Você pode **encerrar o gerador manualmente** com `generator.return(valor)`:

// ```javascript
// function* gen() {
//   yield 1;
//   yield 2;
//   yield 3;
// }

// let g = gen();
// g.next();          // { value: 1, done: false }
// g.return("fim");   // { value: "fim", done: true }
// g.next();          // { value: undefined, done: true }
// ```

// ---

// ## Resumo

// * Geradores são criados com `function* nome()`.
// * Dentro deles usamos `yield` para produzir valores.
// * O código externo e o gerador podem **trocar dados** com `next()` e `yield`.
// * Geradores são iteráveis e funcionam perfeitamente com `for..of`, spread, etc.
// * Também podem ser **compostos** com `yield*`.

// ---

// ### Observação final

// Apesar de não serem muito usados no dia a dia, geradores podem ser **muito úteis**, especialmente para **fluxos de dados complexos**, **composição de iteradores**, e — como veremos no próximo tópico — **leitura de dados assíncronos com async generators**.

// ---

// Se quiser, posso te ajudar a praticar geradores com exercícios ou criar exemplos mais aplicados!
