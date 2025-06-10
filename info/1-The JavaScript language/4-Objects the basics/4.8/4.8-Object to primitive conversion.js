// ---
// ## Conversão de Objeto para Primitivo

// O que acontece quando objetos são adicionados `obj1 + obj2`, subtraídos `obj1 - obj2` ou impressos usando `alert(obj)`?

// JavaScript não permite que você personalize como os operadores funcionam em objetos. Ao contrário de outras linguagens de programação, como Ruby ou C++, não podemos implementar um método de objeto especial para lidar com adição (ou outros operadores).

// No caso de tais operações, os objetos são **automaticamente convertidos para primitivos**, e então a operação é realizada sobre esses primitivos, resultando em um **valor primitivo**.

// Essa é uma limitação importante: o resultado de `obj1 + obj2` (ou outra operação matemática) **não pode ser outro objeto**!

// Por exemplo, não podemos criar objetos que representam vetores ou matrizes (ou conquistas ou o que quer que seja), adicioná-los e esperar um objeto "somado" como resultado. Tais "proezas" arquitetônicas são automaticamente "descartadas".

// Portanto, como tecnicamente não podemos fazer muito aqui, **não há matemática com objetos em projetos reais**. Quando isso acontece, com raras exceções, é devido a um erro de codificação.

// Neste capítulo, abordaremos como um objeto se converte em primitivo e como personalizar essa conversão.

// Temos dois propósitos:

// * Isso nos permitirá entender o que está acontecendo em caso de erros de codificação, quando tal operação aconteceu acidentalmente.
// * Existem exceções, onde tais operações são possíveis e parecem boas. Por exemplo, subtrair ou comparar datas (objetos `Date`). Nós as encontraremos mais tarde.

// ---
// ### Regras de Conversão

// No capítulo "Conversões de Tipo", vimos as regras para conversões numéricas, de string e booleanas de primitivos. Mas deixamos uma lacuna para objetos. Agora, como sabemos sobre métodos e símbolos, torna-se possível preenchê-la.

// Não há conversão para booleano. **Todos os objetos são `true` em um contexto booleano**, tão simples quanto isso. Existem apenas conversões numéricas e de string.

// A **conversão numérica** acontece quando subtraímos objetos ou aplicamos funções matemáticas. Por exemplo, objetos `Date` (a serem abordados no capítulo "Data e Hora") podem ser subtraídos, e o resultado de `date1 - date2` é a diferença de tempo entre duas datas.

// Quanto à **conversão de string** – geralmente acontece quando exibimos um objeto com `alert(obj)` e em contextos semelhantes.

// Podemos implementar a conversão de string e numérica por nós mesmos, usando métodos de objeto especiais.

// Agora vamos entrar nos detalhes técnicos, porque é a única maneira de cobrir o tópico em profundidade.

// ---
// ### Dicas (Hints)

// Como o JavaScript decide qual conversão aplicar?

// Existem três variantes de conversão de tipo que acontecem em várias situações. Elas são chamadas de "dicas" (`hints`), conforme descrito na especificação:

// * `"string"`
//     Para uma conversão de objeto para string, quando estamos fazendo uma operação em um objeto que espera uma string, como `alert`:

//     ```javascript
//     // saída
//     alert(obj);

//     // usando objeto como uma chave de propriedade
//     anotherObj[obj] = 123;
//     ```

// * `"number"`
//     Para uma conversão de objeto para número, como quando estamos fazendo cálculos matemáticos:

//     ```javascript
//     // conversão explícita
//     let num = Number(obj);

//     // matemática (exceto mais binário)
//     let n = +obj; // mais unário
//     let delta = date1 - date2;

//     // comparação menor/maior
//     let greater = user1 > user2;
//     ```
//     A maioria das funções matemáticas internas também inclui essa conversão.

// * `"default"`
//     Ocorre em casos raros quando o operador "não tem certeza" de qual tipo esperar.
//     Por exemplo, o mais binário `+` pode funcionar tanto com strings (concatenando-as) quanto com números (adicionando-os). Então, se um mais binário recebe um objeto como argumento, ele usa a dica `"default"` para convertê-lo.
//     Além disso, se um objeto é comparado usando `==` com uma string, número ou símbolo, também não está claro qual conversão deve ser feita, então a dica `"default"` é usada.

//     ```javascript
//     // mais binário usa a dica "default"
//     let total = obj1 + obj2;

//     // obj == number usa a dica "default"
//     if (user == 1) { ... };
//     ```
//     Os operadores de comparação maior e menor, como `<` `>`, também podem funcionar com strings e números. No entanto, eles usam a dica `"number"`, não `"default"`. Isso por razões históricas.

// Na prática, porém, as coisas são um pouco mais simples.

// Todos os objetos internos, exceto em um caso (o objeto `Date`, aprenderemos mais tarde), implementam a conversão `"default"` da mesma forma que `"number"`. E provavelmente devemos fazer o mesmo.

// Ainda assim, é importante saber sobre as 3 dicas, em breve veremos por quê.

// Para fazer a conversão, o JavaScript tenta encontrar e chamar três métodos de objeto:

// 1.  Chamar `obj[Symbol.toPrimitive](hint)` – o método com a chave simbólica `Symbol.toPrimitive` (símbolo do sistema), se tal método existir.
// 2.  Caso contrário, se a dica for `"string"`
//     tente chamar `obj.toString()` ou `obj.valueOf()`, o que existir.
// 3.  Caso contrário, se a dica for `"number"` ou `"default"`
//     tente chamar `obj.valueOf()` ou `obj.toString()`, o que existir.

// ---
// ### Symbol.toPrimitive

// Vamos começar pelo primeiro método. Existe um símbolo interno chamado `Symbol.toPrimitive` que deve ser usado para nomear o método de conversão, assim:

// ```javascript
// obj[Symbol.toPrimitive] = function(hint) {
//   // aqui vai o código para converter este objeto para um primitivo
//   // ele deve retornar um valor primitivo
//   // hint = um de "string", "number", "default"
// };
// ```
// Se o método `Symbol.toPrimitive` existir, ele será usado para todas as dicas, e nenhum outro método será necessário.

// Por exemplo, aqui o objeto `user` o implementa:

// ```javascript
// let user = {
//   name: "John",
//   money: 1000,

//   [Symbol.toPrimitive](hint) {
//     alert(`hint: ${hint}`);
//     return hint == "string" ? `{name: "${this.name}"}` : this.money;
//   }
// };

// // demonstração de conversões:
// alert(user);        // hint: string -> {name: "John"}
// alert(+user);       // hint: number -> 1000
// alert(user + 500);  // hint: default -> 1500
// ```
// Como podemos ver no código, `user` se torna uma string auto-descritiva ou um valor monetário, dependendo da conversão. O único método `user[Symbol.toPrimitive]` lida com todos os casos de conversão.

// ---
// ### toString/valueOf

// Se não houver `Symbol.toPrimitive`, o JavaScript tenta encontrar os métodos `toString` e `valueOf`:

// * Para a dica `"string"`: chame o método `toString`, e se ele não existir ou se retornar um objeto em vez de um valor primitivo, chame `valueOf` (então `toString` tem prioridade para conversões de string).
// * Para outras dicas: chame `valueOf`, e se ele não existir ou se retornar um objeto em vez de um valor primitivo, chame `toString` (então `valueOf` tem prioridade para matemática).

// Os métodos `toString` e `valueOf` vêm de tempos antigos. Eles não são símbolos (símbolos não existiam há tanto tempo), mas sim métodos "regulares" com nomes de string. Eles fornecem uma maneira alternativa "antiga" de implementar a conversão.

// Esses métodos devem retornar um valor primitivo. Se `toString` ou `valueOf` retornar um objeto, então ele é ignorado (como se não houvesse método).

// Por padrão, um objeto simples tem os seguintes métodos `toString` e `valueOf`:

// * O método `toString` retorna uma string `"[object Object]"`.
// * O método `valueOf` retorna o próprio objeto.

// Aqui está a demonstração:

// ```javascript
// let user = {name: "John"};
// alert(user); // [object Object]
// alert(user.valueOf() === user); // true
// ```
// Então, se tentarmos usar um objeto como uma string, como em um `alert` ou algo assim, por padrão veremos `[object Object]`.

// O `valueOf` padrão é mencionado aqui apenas por uma questão de completude, para evitar qualquer confusão. Como você pode ver, ele retorna o próprio objeto, e por isso é ignorado. Não me pergunte por que, é por razões históricas. Então, podemos presumir que ele não existe.

// Vamos implementar esses métodos para personalizar a conversão.

// Por exemplo, aqui `user` faz o mesmo que acima usando uma combinação de `toString` e `valueOf` em vez de `Symbol.toPrimitive`:

// ```javascript
// let user = {
//   name: "John",
//   money: 1000,

//   // para hint="string"
//   toString() {
//     return `{name: "${this.name}"}`;
//   },

//   // para hint="number" ou "default"
//   valueOf() {
//     return this.money;
//   }
// };

// alert(user);        // toString -> {name: "John"}
// alert(+user);       // valueOf -> 1000
// alert(user + 500);  // valueOf -> 1500
// ```
// Como podemos ver, o comportamento é o mesmo do exemplo anterior com `Symbol.toPrimitive`.

// Frequentemente, queremos um único local "coringa" para lidar com todas as conversões primitivas. Nesse caso, podemos implementar apenas `toString`, assim:

// ```javascript
// let user = {
//   name: "John",

//   toString() {
//     return this.name;
//   }
// };

// alert(user);        // toString -> John
// alert(user + 500);  // toString -> John500
// ```
// Na ausência de `Symbol.toPrimitive` e `valueOf`, `toString` lidará com todas as conversões primitivas.

// ---
// ### Uma conversão pode retornar qualquer tipo primitivo

// O importante a saber sobre todos os métodos de conversão primitiva é que eles não precisam necessariamente retornar o primitivo "sugerido" pela dica.

// Não há controle se `toString` retorna exatamente uma string, ou se o método `Symbol.toPrimitive` retorna um número para a dica `"number"`.

// A única coisa obrigatória: esses métodos devem retornar um **valor primitivo**, não um objeto.

// ---
// ### Notas Históricas

// Por razões históricas, se `toString` ou `valueOf` retornar um objeto, não há erro, mas tal valor é ignorado (como se o método não existisse). Isso ocorre porque em tempos antigos não havia um bom conceito de "erro" em JavaScript.

// Em contraste, `Symbol.toPrimitive` é mais rigoroso, ele **deve** retornar um primitivo, caso contrário, haverá um erro.

// ---
// ### Outras Conversões

// Como já sabemos, muitos operadores e funções realizam conversões de tipo, por exemplo, a multiplicação `*` converte operandos para números.

// Se passarmos um objeto como argumento, há duas etapas de cálculos:

// 1.  O objeto é convertido para um primitivo (usando as regras descritas acima).
// 2.  Se necessário para cálculos posteriores, o primitivo resultante também é convertido.

// Por exemplo:

// ```javascript
// let obj = {
//   // toString lida com todas as conversões na ausência de outros métodos
//   toString() {
//     return "2";
//   }
// };

// alert(obj * 2); // 4, objeto convertido para o primitivo "2", então a multiplicação o tornou um número
// ```
// A multiplicação `obj * 2` primeiro converte o objeto para primitivo (que é uma string `"2"`).
// Então `"2" * 2` se torna `2 * 2` (a string é convertida para número).

// O mais binário concatenará strings na mesma situação, pois aceita uma string de bom grado:

// ```javascript
// let obj = {
//   toString() {
//     return "2";
//   }
// };

// alert(obj + 2); // "22" ("2" + 2), a conversão para primitivo retornou uma string => concatenação
// ```

// ---
// ### Resumo

// A conversão de objeto para primitivo é chamada automaticamente por muitas funções e operadores internos que esperam um primitivo como valor.

// Existem 3 tipos (dicas) de conversão:

// * `"string"` (para `alert` e outras operações que precisam de uma string)
// * `"number"` (para matemática)
// * `"default"` (poucos operadores, geralmente os objetos implementam da mesma forma que `"number"`)

// A especificação descreve explicitamente qual operador usa qual dica.

// O algoritmo de conversão é:

// 1.  Chamar `obj[Symbol.toPrimitive](hint)` se o método existir.
// 2.  Caso contrário, se a dica for `"string"`:
//     tente chamar `obj.toString()` ou `obj.valueOf()`, o que existir.
// 3.  Caso contrário, se a dica for `"number"` ou `"default"`:
//     tente chamar `obj.valueOf()` ou `obj.toString()`, o que existir.

// Todos esses métodos devem retornar um primitivo para funcionar (se definidos).

// Na prática, muitas vezes é suficiente implementar apenas `obj.toString()` como um método "coringa" para conversões de string que deve retornar uma representação "legível por humanos" de um objeto, para fins de registro ou depuração.