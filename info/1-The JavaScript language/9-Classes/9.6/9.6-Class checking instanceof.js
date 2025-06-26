// -----

// ## Verificação de Classe: "instanceof"

// O operador `instanceof` permite verificar se um objeto pertence a uma determinada classe. Ele também leva em consideração a herança.

// Essa verificação pode ser necessária em muitos casos. Por exemplo, pode ser usada para construir uma função **polimórfica**, que trata os argumentos de forma diferente dependendo do seu tipo.

// -----

// ### O operador `instanceof`

// A sintaxe é:

// ```javascript
// obj instanceof Class
// ```

// Ele retorna `true` se `obj` pertence à `Class` ou a uma classe que herda dela.

// Por exemplo:

// ```javascript
// class Rabbit {}
// let rabbit = new Rabbit();

// // é um objeto da classe Rabbit?
// alert( rabbit instanceof Rabbit ); // true
// ```

// Também funciona com funções construtoras:

// ```javascript
// // em vez de class
// function Rabbit() {}
// alert( new Rabbit() instanceof Rabbit ); // true
// ```

// ...E com classes nativas como `Array`:

// ```javascript
// let arr = [1, 2, 3];
// alert( arr instanceof Array ); // true
// alert( arr instanceof Object ); // true
// ```

// Observe que `arr` também pertence à classe `Object`. Isso ocorre porque `Array` herda prototipicamente de `Object`.

// Normalmente, `instanceof` examina a cadeia de protótipos para a verificação. Também podemos definir uma lógica personalizada no método estático `Symbol.hasInstance`.

// O algoritmo de `obj instanceof Class` funciona aproximadamente da seguinte forma:

// 1.  Se houver um método estático `Symbol.hasInstance`, basta chamá-lo: `Class[Symbol.hasInstance](obj)`. Ele deve retornar `true` ou `false`, e terminamos. É assim que podemos personalizar o comportamento de `instanceof`.

//     Por exemplo:

//     ```javascript
//     // configura a verificação instanceof que assume que
//     // qualquer coisa com a propriedade canEat é um animal
//     class Animal {
//       static [Symbol.hasInstance](obj) {
//         if (obj.canEat) return true;
//       }
//     }

//     let obj = { canEat: true };
//     alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) é chamado
//     ```

// 2.  A maioria das classes não tem `Symbol.hasInstance`. Nesse caso, a lógica padrão é usada: `obj instanceof Class` verifica se `Class.prototype` é igual a um dos protótipos na cadeia de protótipos de `obj`.

//     Em outras palavras, compare um após o outro:

//     ```
//     obj.__proto__ === Class.prototype?
//     obj.__proto__.__proto__ === Class.prototype?
//     obj.__proto__.__proto__.__proto__ === Class.prototype?
//     ...
//     // se alguma resposta for true, retorna true
//     // caso contrário, se chegamos ao final da cadeia, retorna false
//     ```

//     No exemplo acima, `rabbit.__proto__ === Rabbit.prototype`, o que dá a resposta imediatamente.

//     No caso de uma herança, a correspondência estará na segunda etapa:

//     ```javascript
//     class Animal {}
//     class Rabbit extends Animal {}

//     let rabbit = new Rabbit();
//     alert(rabbit instanceof Animal); // true

//     // rabbit.__proto__ === Animal.prototype (sem correspondência)
//     // rabbit.__proto__.__proto__ === Animal.prototype (correspondência!)
//     ```

//     Aqui está a ilustração do que `rabbit instanceof Animal` compara com `Animal.prototype`:

//     ```mermaid
//     graph TD
//         A[instância rabbit] -->|[[Prototype]]| B[Rabbit.prototype];
//         B -->|[[Prototype]]| C[Animal.prototype];
//         D[Class.prototype (Animal.prototype)]
//         C === D;
//     ```

//     A propósito, também existe um método `objA.isPrototypeOf(objB)`, que retorna `true` se `objA` estiver em algum lugar na cadeia de protótipos para `objB`. Então o teste de `obj instanceof Class` pode ser reformulado como `Class.prototype.isPrototypeOf(obj)`.

//     É engraçado, mas o próprio construtor da `Class` não participa da verificação\! Apenas a cadeia de protótipos e `Class.prototype` importam.

//     Isso pode levar a consequências interessantes quando uma propriedade `prototype` é alterada após a criação do objeto.

//     Como aqui:

//     ```javascript
//     function Rabbit() {}
//     let rabbit = new Rabbit();

//     // protótipo alterado
//     Rabbit.prototype = {};

//     // ...não é mais um coelho!
//     alert( rabbit instanceof Rabbit ); // false
//     ```

// -----

// ### Bônus: `Object.prototype.toString` para o tipo

// Já sabemos que objetos simples são convertidos para string como `[object Object]`:

// ```javascript
// let obj = {};
// alert(obj); // [object Object]
// alert(obj.toString()); // o mesmo
// ```

// Essa é a implementação deles de `toString`. Mas há um recurso oculto que torna `toString` na verdade muito mais poderoso do que isso. Podemos usá-lo como um `typeof` estendido e uma alternativa para `instanceof`.

// Parece estranho? De fato. Vamos desmistificar.

// Pela [especificação](https://www.google.com/search?q=https://tc39.es/ecma262/%23sec-object.prototype.tostring), o `toString` embutido pode ser extraído do objeto e executado no contexto de qualquer outro valor. E seu resultado depende desse valor.

//   * Para um número, será `[object Number]`
//   * Para um booleano, será `[object Boolean]`
//   * Para `null`: `[object Null]`
//   * Para `undefined`: `[object Undefined]`
//   * Para arrays: `[object Array]`
//   * ...etc (customizável).

// Vamos demonstrar:

// ```javascript
// // copia o método toString para uma variável por conveniência
// let objectToString = Object.prototype.toString;

// // que tipo é este?
// let arr = [];
// alert( objectToString.call(arr) ); // [object Array]
// ```

// Aqui usamos `call` como descrito no capítulo [Decorators e encaminhamento, call/apply](https://javascript.info/call-apply-decorators) para executar a função `objectToString` no contexto `this=arr`.

// Internamente, o algoritmo `toString` examina `this` e retorna o resultado correspondente. Mais exemplos:

// ```javascript
// let s = Object.prototype.toString;
// alert( s.call(123) ); // [object Number]
// alert( s.call(null) ); // [object Null]
// alert( s.call(alert) ); // [object Function]
// ```

// -----

// #### `Symbol.toStringTag`

// O comportamento de `Object.prototype.toString` pode ser personalizado usando uma propriedade de objeto especial `Symbol.toStringTag`.

// Por exemplo:

// ```javascript
// let user = {
//   [Symbol.toStringTag]: "User"
// };

// alert( {}.toString.call(user) ); // [object User]
// ```

// Para a maioria dos objetos específicos do ambiente, existe essa propriedade. Aqui estão alguns exemplos específicos do navegador:

// ```javascript
// // toStringTag para o objeto e classe específicos do ambiente:
// alert( window[Symbol.toStringTag]); // Window
// alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

// alert( {}.toString.call(window) ); // [object Window]
// alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
// ```

// Como você pode ver, o resultado é exatamente `Symbol.toStringTag` (se existir), envolvido em `[object ...]`.

// No final, temos um "typeof com esteroides" que não apenas funciona para tipos de dados primitivos, mas também para objetos nativos e até pode ser customizado.

// Podemos usar `{}.toString.call` em vez de `instanceof` para objetos nativos quando queremos obter o tipo como uma string em vez de apenas verificar.

// -----

// ### Resumo

// Vamos resumir os métodos de verificação de tipo que conhecemos:

// | Método        | Funciona para           | Retorna              |
// | :------------ | :---------------------- | :------------------- |
// | `typeof`      | primitivos              | string               |
// | `{}.toString` | primitivos, objetos nativos, objetos com `Symbol.toStringTag` | string               |
// | `instanceof`  | objetos                 | true/false           |

// Como podemos ver, `{}.toString` é tecnicamente um `typeof` "mais avançado".

// E o operador `instanceof` realmente se destaca quando estamos trabalhando com uma hierarquia de classes e queremos verificar a classe levando em conta a herança.

// -----
