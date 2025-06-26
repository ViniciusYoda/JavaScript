// -----

// ## Getters e Setters de Propriedades

// Existem dois tipos de propriedades de objeto.

// O primeiro tipo são as **propriedades de dados**. Já sabemos como trabalhar com elas. Todas as propriedades que usamos até agora eram propriedades de dados.

// O segundo tipo de propriedade é algo novo. É uma **propriedade acessora**. Elas são essencialmente funções que são executadas ao obter e definir um valor, mas parecem propriedades regulares para um código externo.

// -----

// ### Getters e Setters

// Propriedades acessoras são representadas por métodos "getter" e "setter". Em um literal de objeto, elas são denotadas por `get` e `set`:

// ```javascript
// let obj = {
//   get propName() {
//     // getter, o código executado ao obter obj.propName
//   },

//   set propName(value) {
//     // setter, o código executado ao definir obj.propName = value
//   }
// };
// ```

// O getter funciona quando `obj.propName` é lido, o setter – quando é atribuído.

// Por exemplo, temos um objeto `user` com `name` e `surname`:

// ```javascript
// let user = {
//   name: "John",
//   surname: "Smith"
// };
// ```

// Agora queremos adicionar uma propriedade `fullName`, que deve ser `"John Smith"`. Claro, não queremos copiar e colar informações existentes, então podemos implementá-la como um acessor:

// ```javascript
// let user = {
//   name: "John",
//   surname: "Smith",

//   get fullName() {
//     return `${this.name} ${this.surname}`;
//   }
// };

// alert(user.fullName); // John Smith
// ```

// De fora, uma propriedade acessora se parece com uma propriedade regular. Essa é a ideia das propriedades acessoras. Não **chamamos** `user.fullName` como uma função, nós **lêmos** normalmente: o getter é executado nos bastidores.

// Até agora, `fullName` tem apenas um getter. Se tentarmos atribuir `user.fullName=`, haverá um erro:

// ```javascript
// let user = {
//   get fullName() {
//     return `...`;
//   }
// };

// user.fullName = "Test"; // Erro (propriedade tem apenas um getter)
// ```

// Vamos corrigir isso adicionando um setter para `user.fullName`:

// ```javascript
// let user = {
//   name: "John",
//   surname: "Smith",

//   get fullName() {
//     return `${this.name} ${this.surname}`;
//   },

//   set fullName(value) {
//     [this.name, this.surname] = value.split(" ");
//   }
// };

// // o setter fullName é executado com o valor fornecido.
// user.fullName = "Alice Cooper";

// alert(user.name);    // Alice
// alert(user.surname); // Cooper
// ```

// Como resultado, temos uma propriedade "virtual" `fullName`. Ela é legível e escrevível.

// -----

// ### Descritores de Acessor

// Descritores para propriedades acessoras são diferentes daqueles para propriedades de dados.

// Para propriedades acessoras, não há `value` ou `writable`, mas em vez disso, há funções `get` e `set`.

// Ou seja, um descritor de acessor pode ter:

//   * `get` – uma função sem argumentos, que funciona quando uma propriedade é lida,
//   * `set` – uma função com um argumento, que é chamada quando a propriedade é definida,
//   * `enumerable` – o mesmo que para propriedades de dados,
//   * `configurable` – o mesmo que para propriedades de dados.

// Por exemplo, para criar um acessor `fullName` com `defineProperty`, podemos passar um descritor com `get` e `set`:

// ```javascript
// let user = {
//   name: "John",
//   surname: "Smith"
// };

// Object.defineProperty(user, 'fullName', {
//   get() {
//     return `${this.name} ${this.surname}`;
//   },

//   set(value) {
//     [this.name, this.surname] = value.split(" ");
//   }
// });

// alert(user.fullName); // John Smith

// for(let key in user) alert(key); // name, surname
// ```

// Observe que uma propriedade pode ser um acessor (ter métodos `get`/`set`) ou uma propriedade de dados (ter um `value`), não ambos.

// Se tentarmos fornecer `get` e `value` no mesmo descritor, haverá um erro:

// ```javascript
// // Erro: Descritor de propriedade inválido.
// Object.defineProperty({}, 'prop', {
//   get() {
//     return 1
//   },

//   value: 2
// });
// ```

// -----

// ### Getters/Setters Mais Inteligentes

// Getters/setters podem ser usados como invólucros sobre valores de propriedades "reais" para obter mais controle sobre as operações com eles.

// Por exemplo, se quisermos proibir nomes muito curtos para `user`, podemos ter um setter `name` e manter o valor em uma propriedade separada `_name`:

// ```javascript
// let user = {
//   get name() {
//     return this._name;
//   },

//   set name(value) {
//     if (value.length < 4) {
//       alert("O nome é muito curto, precisa de pelo menos 4 caracteres");
//       return;
//     }
//     this._name = value;
//   }
// };

// user.name = "Pete";
// alert(user.name); // Pete

// user.name = ""; // O nome é muito curto...
// ```

// Assim, o nome é armazenado na propriedade `_name`, e o acesso é feito através do getter e do setter.

// Tecnicamente, o código externo pode acessar o nome diretamente usando `user._name`. Mas existe uma convenção amplamente conhecida de que propriedades que começam com um sublinhado `_` são internas e não devem ser tocadas de fora do objeto.

// -----

// ### Usando para Compatibilidade

// Um dos grandes usos dos acessores é que eles permitem assumir o controle de uma propriedade de dados "regular" a qualquer momento, substituindo-a por um getter e um setter e ajustando seu comportamento.

// Imagine que começamos a implementar objetos de usuário usando propriedades de dados `name` e `age`:

// ```javascript
// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }

// let john = new User("John", 25);
// alert( john.age ); // 25
// ```

// ...Mas, mais cedo ou mais tarde, as coisas podem mudar. Em vez de `age`, podemos decidir armazenar `birthday`, porque é mais preciso e conveniente:

// ```javascript
// function User(name, birthday) {
//   this.name = name;
//   this.birthday = birthday;
// }

// let john = new User("John", new Date(1992, 6, 1));
// ```

// Agora, o que fazer com o código antigo que ainda usa a propriedade `age`?

// Podemos tentar encontrar todos esses lugares e corrigi-los, mas isso leva tempo e pode ser difícil de fazer se esse código for usado por muitas outras pessoas. E, além disso, `age` é algo legal de ter no `user`, certo?

// Vamos mantê-lo.

// Adicionar um getter para `age` resolve o problema:

// ```javascript
// function User(name, birthday) {
//   this.name = name;
//   this.birthday = birthday;

//   // age é calculado a partir da data atual e do aniversário
//   Object.defineProperty(this, "age", {
//     get() {
//       let todayYear = new Date().getFullYear();
//       return todayYear - this.birthday.getFullYear();
//     }
//   });
// }

// let john = new User("John", new Date(1992, 6, 1));

// alert( john.birthday ); // birthday está disponível
// alert( john.age );      // ...assim como a idade
// ```

// Agora o código antigo também funciona e temos uma propriedade adicional agradável.