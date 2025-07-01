// -----

// ## Tipo de Referência

// **Recurso de linguagem aprofundado**

// Este artigo aborda um tópico avançado, para entender melhor certos casos extremos. Não é importante. Muitos desenvolvedores experientes vivem bem sem conhecê-lo. Continue lendo se quiser saber como as coisas funcionam "por debaixo dos panos".

// Uma chamada de método avaliada dinamicamente pode perder o `this`.
// Por exemplo:

// ```javascript
// let user = {
//   name: "João",
//   hi() { alert(this.name); },
//   bye() { alert("Tchau"); }
// };

// user.hi(); // funciona

// // agora vamos chamar user.hi ou user.bye dependendo do nome
// (user.name == "João" ? user.hi : user.bye)(); // Erro!
// ```

// Na última linha, há um operador condicional que escolhe entre `user.hi` ou `user.bye`. Neste caso, o resultado é `user.hi`.
// Então o método é imediatamente chamado com parênteses `()`. Mas não funciona corretamente\!

// Como você pode ver, a chamada resulta em um erro, porque o valor de `"this"` dentro da chamada se torna `undefined`.

// Isso funciona (objeto ponto método):

// ```javascript
// user.hi();
// ```

// Isso não funciona (método avaliado):

// ```javascript
// (user.name == "João" ? user.hi : user.bye)(); // Erro!
// ```

// Por quê? Se quisermos entender por que isso acontece, vamos analisar como a chamada `obj.method()` funciona.

// -----

// ### Tipo de Referência explicado

// Olhando de perto, podemos notar duas operações na declaração `obj.method()`:

// 1.  Primeiro, o ponto `.` recupera a propriedade `obj.method`.
// 2.  Então os parênteses `()` a executam.

// Então, como a informação sobre `this` é passada da primeira parte para a segunda?
// Se colocarmos essas operações em linhas separadas, então `this` será perdido com certeza:

// ```javascript
// let user = {
//   name: "João",
//   hi() { alert(this.name); }
// };

// // separe a obtenção e a chamada do método em duas linhas
// let hi = user.hi;
// hi(); // Erro, porque this é undefined
// ```

// Aqui `hi = user.hi` coloca a função na variável, e então na última linha ela está completamente isolada, e assim não há `this`.

// Para fazer as chamadas `user.hi()` funcionarem, JavaScript usa um truque – o ponto `.` não retorna uma função, mas um valor do **Tipo de Referência** especial.

// O Tipo de Referência é um "tipo de especificação". Não podemos usá-lo explicitamente, mas ele é usado internamente pela linguagem.

// O valor do Tipo de Referência é uma combinação de três valores (`base`, `name`, `strict`), onde:

//   * `base` é o objeto.
//   * `name` é o nome da propriedade.
//   * `strict` é `true` se `use strict` estiver em vigor.

// O resultado de um acesso à propriedade `user.hi` não é uma função, mas um valor do Tipo de Referência. Para `user.hi` no modo estrito, é:

// ```javascript
// // Valor do Tipo de Referência
// (user, "hi", true)
// ```

// Quando os parênteses `()` são chamados no Tipo de Referência, eles recebem a informação completa sobre o objeto e seu método, e podem definir o `this` correto (neste caso, `user`).

// O tipo de referência é um tipo interno especial "intermediário", com o propósito de passar informações do ponto `.` para os parênteses de chamada `()`.

// Qualquer outra operação, como a atribuição `hi = user.hi`, descarta o tipo de referência como um todo, pega o valor de `user.hi` (uma função) e o passa adiante. Assim, qualquer operação futura "perde" o `this`.

// Então, como resultado, o valor de `this` é passado da maneira correta apenas se a função for chamada diretamente usando a sintaxe de ponto `obj.method()` ou colchetes `obj['method']()` (eles fazem o mesmo aqui). Existem várias maneiras de resolver esse problema, como `func.bind()`.

// -----

// ### Resumo

// O **Tipo de Referência** é um tipo interno da linguagem.

// A leitura de uma propriedade, como com o ponto `.` em `obj.method()`, não retorna exatamente o valor da propriedade, mas um valor especial de "tipo de referência" que armazena tanto o valor da propriedade quanto o objeto de onde ela foi retirada.

// Isso serve para que a chamada de método subsequente `()` obtenha o objeto e defina o `this` para ele.

// Para todas as outras operações, o tipo de referência se torna automaticamente o valor da propriedade (uma função em nosso caso).

// Todo o mecanismo está oculto aos nossos olhos. Só importa em casos sutis, como quando um método é obtido dinamicamente do objeto, usando uma expressão.

// -----

// Você já se deparou com algum problema prático onde a compreensão do Tipo de Referência foi útil, ou gostaria de explorar as diferentes maneiras de preservar o `this` em chamadas de método dinâmicas?-----

// ## Tipo de Referência

// **Recurso de linguagem aprofundado**

// Este artigo aborda um tópico avançado, para entender melhor certos casos extremos. Não é importante. Muitos desenvolvedores experientes vivem bem sem conhecê-lo. Continue lendo se quiser saber como as coisas funcionam "por debaixo dos panos".

// Uma chamada de método avaliada dinamicamente pode perder o `this`.
// Por exemplo:

// ```javascript
// let user = {
//   name: "João",
//   hi() { alert(this.name); },
//   bye() { alert("Tchau"); }
// };

// user.hi(); // funciona

// // agora vamos chamar user.hi ou user.bye dependendo do nome
// (user.name == "João" ? user.hi : user.bye)(); // Erro!
// ```

// Na última linha, há um operador condicional que escolhe entre `user.hi` ou `user.bye`. Neste caso, o resultado é `user.hi`.
// Então o método é imediatamente chamado com parênteses `()`. Mas não funciona corretamente\!

// Como você pode ver, a chamada resulta em um erro, porque o valor de `"this"` dentro da chamada se torna `undefined`.

// Isso funciona (objeto ponto método):

// ```javascript
// user.hi();
// ```

// Isso não funciona (método avaliado):

// ```javascript
// (user.name == "João" ? user.hi : user.bye)(); // Erro!
// ```

// Por quê? Se quisermos entender por que isso acontece, vamos analisar como a chamada `obj.method()` funciona.

// -----

// ### Tipo de Referência explicado

// Olhando de perto, podemos notar duas operações na declaração `obj.method()`:

// 1.  Primeiro, o ponto `.` recupera a propriedade `obj.method`.
// 2.  Então os parênteses `()` a executam.

// Então, como a informação sobre `this` é passada da primeira parte para a segunda?
// Se colocarmos essas operações em linhas separadas, então `this` será perdido com certeza:

// ```javascript
// let user = {
//   name: "João",
//   hi() { alert(this.name); }
// };

// // separe a obtenção e a chamada do método em duas linhas
// let hi = user.hi;
// hi(); // Erro, porque this é undefined
// ```

// Aqui `hi = user.hi` coloca a função na variável, e então na última linha ela está completamente isolada, e assim não há `this`.

// Para fazer as chamadas `user.hi()` funcionarem, JavaScript usa um truque – o ponto `.` não retorna uma função, mas um valor do **Tipo de Referência** especial.

// O Tipo de Referência é um "tipo de especificação". Não podemos usá-lo explicitamente, mas ele é usado internamente pela linguagem.

// O valor do Tipo de Referência é uma combinação de três valores (`base`, `name`, `strict`), onde:

//   * `base` é o objeto.
//   * `name` é o nome da propriedade.
//   * `strict` é `true` se `use strict` estiver em vigor.

// O resultado de um acesso à propriedade `user.hi` não é uma função, mas um valor do Tipo de Referência. Para `user.hi` no modo estrito, é:

// ```javascript
// // Valor do Tipo de Referência
// (user, "hi", true)
// ```

// Quando os parênteses `()` são chamados no Tipo de Referência, eles recebem a informação completa sobre o objeto e seu método, e podem definir o `this` correto (neste caso, `user`).

// O tipo de referência é um tipo interno especial "intermediário", com o propósito de passar informações do ponto `.` para os parênteses de chamada `()`.

// Qualquer outra operação, como a atribuição `hi = user.hi`, descarta o tipo de referência como um todo, pega o valor de `user.hi` (uma função) e o passa adiante. Assim, qualquer operação futura "perde" o `this`.

// Então, como resultado, o valor de `this` é passado da maneira correta apenas se a função for chamada diretamente usando a sintaxe de ponto `obj.method()` ou colchetes `obj['method']()` (eles fazem o mesmo aqui). Existem várias maneiras de resolver esse problema, como `func.bind()`.

// -----

// ### Resumo

// O **Tipo de Referência** é um tipo interno da linguagem.

// A leitura de uma propriedade, como com o ponto `.` em `obj.method()`, não retorna exatamente o valor da propriedade, mas um valor especial de "tipo de referência" que armazena tanto o valor da propriedade quanto o objeto de onde ela foi retirada.

// Isso serve para que a chamada de método subsequente `()` obtenha o objeto e defina o `this` para ele.

// Para todas as outras operações, o tipo de referência se torna automaticamente o valor da propriedade (uma função em nosso caso).

// Todo o mecanismo está oculto aos nossos olhos. Só importa em casos sutis, como quando um método é obtido dinamicamente do objeto, usando uma expressão.

// -----

// Você já se deparou com algum problema prático onde a compreensão do Tipo de Referência foi útil, ou gostaria de explorar as diferentes maneiras de preservar o `this` em chamadas de método dinâmicas?