// Aqui está a adaptação completa para o português:

// **Decoradores e Encaminhamento de Chamadas, call/apply**

// O JavaScript oferece uma flexibilidade excepcional ao lidar com funções. Elas podem ser passadas como parâmetros, usadas como objetos e, agora, vamos ver como encaminhar chamadas entre elas e decorá-las.

// ### Cache Transparente

// Suponha que temos uma função `slow(x)` que consome bastante CPU, mas cujos resultados são estáveis. Ou seja, para o mesmo `x`, ela sempre retorna o mesmo resultado.

// Se a função for chamada com frequência, podemos querer guardar (cachear) os resultados para evitar o tempo gasto com recálculos.

// Mas, ao invés de adicionar essa funcionalidade dentro de `slow()`, vamos criar uma função wrapper que adiciona o cache. Como veremos, há muitas vantagens nisso.

// Veja o código com as explicações:

// ```javascript
// function slow(x) {
//   // pode haver um trabalho pesado de CPU aqui
//   alert(`Chamado com ${x}`);
//   return x;
// }

// function cachingDecorator(func) {
//   let cache = new Map();

//   return function(x) {
//     if (cache.has(x)) {    // se existe esse valor no cache
//       return cache.get(x); // lê o resultado dele
//     }

//     let result = func(x);  // caso contrário, chama func

//     cache.set(x, result);  // e guarda (cacheia) o resultado
//     return result;
//   };
// }

// slow = cachingDecorator(slow);

// alert( slow(1) ); // slow(1) é cacheado e o resultado retornado
// alert( "De novo: " + slow(1) ); // resultado de slow(1) vem do cache

// alert( slow(2) ); // slow(2) é cacheado
// alert( "De novo: " + slow(2) ); // resultado de slow(2) vem do cache
// ```

// No exemplo acima, `cachingDecorator` é um **decorador**: uma função especial que recebe outra função e altera o seu comportamento.

// A ideia é que podemos aplicar `cachingDecorator` a qualquer função, e ele retorna uma nova função com cache. Isso é ótimo, pois podemos ter várias funções que precisam desse recurso, e basta aplicar o decorador.

// Ao separar o cache do código principal, mantemos o código da função original mais simples.

// O resultado de `cachingDecorator(func)` é um **wrapper**: a função `(x)` que "envolve" a chamada de `func(x)` dentro de uma lógica de cache.

// Do ponto de vista do código externo, a função `slow` ainda parece a mesma. Apenas ganhou a capacidade de cache.

// **Resumindo**, as vantagens de usar um `cachingDecorator` separado em vez de alterar o código de `slow` são:

// * O `cachingDecorator` é reutilizável. Podemos aplicá-lo em outras funções.
// * A lógica de cache fica separada, não aumenta a complexidade da função original.
// * Podemos combinar múltiplos decoradores, se quisermos.

// ### Usando `func.call` para preservar o contexto

// O decorador acima não funciona bem com métodos de objetos.

// Por exemplo, veja este código onde `worker.slow()` para de funcionar depois da decoração:

// ```javascript
// let worker = {
//   someMethod() {
//     return 1;
//   },

//   slow(x) {
//     alert("Chamado com " + x);
//     return x * this.someMethod(); // (*)
//   }
// };

// function cachingDecorator(func) {
//   let cache = new Map();
//   return function(x) {
//     if (cache.has(x)) {
//       return cache.get(x);
//     }
//     let result = func(x); // (**)
//     cache.set(x, result);
//     return result;
//   };
// }

// alert( worker.slow(1) ); // funciona

// worker.slow = cachingDecorator(worker.slow); // tenta aplicar cache

// alert( worker.slow(2) ); // Erro: Cannot read property 'someMethod' of undefined
// ```

// O erro acontece na linha (\*) ao tentar acessar `this.someMethod`. Por quê?

// Porque o wrapper chama a função original como `func(x)` na linha (\*\*). E quando chamada assim, a função perde seu contexto: o `this` vira `undefined`.

// Seria como fazer:

// ```javascript
// let func = worker.slow;
// func(2);
// ```

// O wrapper está chamando a função, mas sem o contexto `this`. Por isso o erro.

// **A correção:** Usar `func.call(this, x)` para passar o contexto.

// A sintaxe de `func.call` é:

// ```javascript
// func.call(contexto, arg1, arg2, ...)
// ```

// Exemplo simples:

// ```javascript
// function sayHi() {
//   alert(this.name);
// }

// let user = { name: "João" };
// let admin = { name: "Admin" };

// sayHi.call(user);  // João
// sayHi.call(admin); // Admin
// ```

// Outro exemplo passando argumentos:

// ```javascript
// function say(frase) {
//   alert(this.name + ': ' + frase);
// }

// let user = { name: "João" };

// say.call(user, "Olá"); // João: Olá
// ```

// **Voltando ao caso anterior:**

// ```javascript
// let worker = {
//   someMethod() {
//     return 1;
//   },

//   slow(x) {
//     alert("Chamado com " + x);
//     return x * this.someMethod();
//   }
// };

// function cachingDecorator(func) {
//   let cache = new Map();
//   return function(x) {
//     if (cache.has(x)) {
//       return cache.get(x);
//     }
//     let result = func.call(this, x); // agora com o this correto
//     cache.set(x, result);
//     return result;
//   };
// }

// worker.slow = cachingDecorator(worker.slow);

// alert( worker.slow(2) ); // funciona
// alert( worker.slow(2) ); // cacheado
// ```

// **Como o `this` é passado:**

// Depois da decoração, `worker.slow` agora é o wrapper. Quando chamamos `worker.slow(2)`, o `this` dentro do wrapper é `worker`. E o wrapper passa esse contexto corretamente ao chamar a função original com `func.call(this, x)`.

// ### Trabalhando com Múltiplos Argumentos

// Agora vamos tornar o `cachingDecorator` mais universal, funcionando com funções que recebem vários argumentos.

// Exemplo:

// ```javascript
// let worker = {
//   slow(min, max) {
//     return min + max; // função que simula ser lenta
//   }
// };

// worker.slow = cachingDecorator(worker.slow);
// ```

// Antes, com um único argumento, usamos o valor `x` como chave do cache. Mas agora precisamos guardar o resultado para uma combinação de argumentos `(min, max)`.

// **Soluções possíveis:**

// 1. Criar uma estrutura de cache mais avançada que suporte múltiplas chaves.
// 2. Usar Mapas aninhados (por exemplo: `cache.get(min).get(max)`).
// 3. Unir os valores em uma única string, tipo `"min,max"`, como chave.

// Para muitos casos práticos, a terceira opção é suficiente.

// Além disso, precisamos passar todos os argumentos para `func.call`. Isso pode ser feito com `func.call(this, ...arguments)`.

// Aqui o decorador mais poderoso:

// ```javascript
// let worker = {
//   slow(min, max) {
//     alert(`Chamado com ${min},${max}`);
//     return min + max;
//   }
// };

// function cachingDecorator(func, hash) {
//   let cache = new Map();
//   return function() {
//     let key = hash(arguments); // (*)
//     if (cache.has(key)) {
//       return cache.get(key);
//     }

//     let result = func.call(this, ...arguments); // (**)

//     cache.set(key, result);
//     return result;
//   };
// }

// function hash(args) {
//   return args[0] + ',' + args[1];
// }

// worker.slow = cachingDecorator(worker.slow, hash);

// alert( worker.slow(3, 5) ); // funciona
// alert( "De novo " + worker.slow(3, 5) ); // cacheado
// ```

// **Mudanças principais:**

// * Na linha (\*), usamos `hash` para criar uma chave única a partir dos argumentos.
// * Na linha (\*\*), usamos `func.call(this, ...arguments)` para passar o contexto e todos os argumentos.

// ### Usando `func.apply`

// Podemos substituir:

// ```javascript
// func.call(this, ...arguments);
// ```

// Por:

// ```javascript
// func.apply(this, arguments);
// ```

// A diferença entre `call` e `apply`:

// * `call`: espera uma lista de argumentos separados por vírgula.
// * `apply`: espera um objeto array-like (como `arguments`).

// Exemplo de equivalência:

// ```javascript
// func.call(context, ...args);
// func.apply(context, args);
// ```

// Quando queremos apenas encaminhar todos os argumentos com o contexto, o padrão mais comum é:

// ```javascript
// let wrapper = function() {
//   return func.apply(this, arguments);
// };
// ```

// ### Fazendo o Hash com Qualquer Número de Argumentos

// Nossa função `hash` estava assim:

// ```javascript
// function hash(args) {
//   return args[0] + ',' + args[1];
// }
// ```

// Mas isso só funciona com dois argumentos. Melhor seria usar `join`:

// ```javascript
// function hash(args) {
//   return [].join.call(args);
// }
// ```

// Isso funciona porque estamos **"emprestando"** o método `join` de um array, aplicando-o ao objeto `arguments` (que é array-like, mas não um array de verdade).

// Exemplo demonstrativo:

// ```javascript
// function hash() {
//   alert( [].join.call(arguments) ); // funciona com qualquer número de argumentos
// }

// hash(1, 2, 3); // exibe: 1,2,3
// ```

// Esse truque é chamado de **method borrowing** (empréstimo de método).

// ### Decoradores e Propriedades de Função

// Geralmente é seguro substituir uma função original por uma decorada. Porém, se a função original tiver propriedades (como `func.calledCount`), a decorada não as terá. Porque a decorada é apenas um wrapper.

// Se você precisa preservar as propriedades da função original, isso pode ser feito usando um objeto especial chamado **Proxy**, assunto para um capítulo futuro.

// ### Resumo

// **Decorador** é um wrapper ao redor de uma função que altera o seu comportamento. A função principal continua fazendo o trabalho principal.

// Decoradores podem ser vistos como **recursos extras** que adicionamos a uma função, sem alterar seu código.

// Para implementar o `cachingDecorator`, estudamos os métodos:

// * `func.call(contexto, arg1, arg2, …)`
// * `func.apply(contexto, argumentos)`

// Encaminhamento genérico de chamadas normalmente usa `apply`:

// ```javascript
// let wrapper = function() {
//   return original.apply(this, arguments);
// };
// ```

// Vimos também o exemplo de **method borrowing**, usando métodos de array com `arguments`. Alternativamente, poderíamos usar os parâmetros rest (`...args`), que geram arrays reais.

// Existem muitos decoradores por aí. Teste seu conhecimento resolvendo os exercícios deste capítulo!
