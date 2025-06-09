// **Referências de objetos e cópias**

// Uma das diferenças fundamentais entre objetos e valores primitivos é que os objetos são armazenados e copiados “por referência”, enquanto os valores primitivos — como strings, números, booleanos, etc. — são sempre copiados “como um valor completo”.

// Isso é fácil de entender se olharmos um pouco mais a fundo o que acontece quando copiamos um valor.

// Vamos começar com um valor primitivo, como uma string.

// Aqui, colocamos uma cópia de `message` dentro de `phrase`:

// ```javascript
// let message = "Olá!";
// let phrase = message;
// ```

// Como resultado, temos duas variáveis independentes, cada uma armazenando a string `"Olá!"`.

// Um resultado bem óbvio, certo?

// Com objetos, não é assim.

// Uma variável atribuída a um objeto não armazena o objeto em si, mas sim seu “endereço na memória” — ou seja, uma “referência” a ele.

// Vamos ver um exemplo de uma variável assim:

// ```javascript
// let user = {
//   name: "João"
// };
// ```

// Na memória, o objeto é armazenado em algum lugar, e a variável `user` possui uma “referência” para esse local.

// Podemos imaginar uma variável de objeto, como `user`, como uma folha de papel com o endereço do objeto escrito.

// Quando fazemos algo com o objeto, como acessar a propriedade `user.name`, o mecanismo do JavaScript olha para o que está naquele endereço e realiza a operação sobre o objeto real.

// E aqui está o motivo disso ser importante:

// Quando uma variável de objeto é copiada, a referência é copiada, mas o objeto em si **não** é duplicado.

// Por exemplo:

// ```javascript
// let user = { name: "João" };

// let admin = user; // copia a referência
// ```

// Agora temos duas variáveis armazenando uma referência ao mesmo objeto:

// ```javascript
// let user = { name: 'João' };

// let admin = user;

// admin.name = 'Pedro'; // modificado via "admin"

// alert(user.name); // 'Pedro', a mudança é vista via "user"
// ```

// É como se tivéssemos um armário com duas chaves: usamos uma (admin) para abrir e modificar o conteúdo. Depois, usamos a outra (user) para ver o conteúdo alterado — pois se trata do mesmo armário.

// **Comparação por referência**

// Dois objetos só são considerados iguais se forem o **mesmo** objeto.

// Por exemplo, aqui `a` e `b` referenciam o mesmo objeto, então são iguais:

// ```javascript
// let a = {};
// let b = a;

// alert( a == b ); // true
// alert( a === b ); // true
// ```

// Agora, dois objetos independentes, mesmo que com conteúdo idêntico, não são iguais:

// ```javascript
// let a = {};
// let b = {};

// alert( a == b ); // false
// ```

// Em comparações como `obj1 > obj2` ou comparações contra um primitivo, como `obj == 5`, os objetos são convertidos para valores primitivos. Mas essas comparações são raras e, geralmente, indicam um erro de programação.

// **Objetos const podem ser modificados**

// Um efeito colateral importante de armazenar objetos por referência é que objetos declarados com `const` **podem ser modificados**.

// Por exemplo:

// ```javascript
// const user = {
//   name: "João"
// };

// user.name = "Pedro"; // (*)

// alert(user.name); // Pedro
// ```

// Pode parecer que a linha marcada (\*) causaria um erro, mas não causa. A constante `user` sempre precisa referenciar o mesmo objeto, mas as **propriedades** do objeto podem ser modificadas à vontade.

// Se quisermos tornar as propriedades de um objeto constantes, isso também é possível, mas com métodos diferentes, que veremos no capítulo sobre *flags* e descritores de propriedades.

// **Clonagem e mesclagem: Object.assign**

// Copiar uma variável de objeto cria apenas mais uma referência ao mesmo objeto.

// Mas e se quisermos **duplicar** o objeto?

// Podemos criar um novo objeto e replicar a estrutura do original, iterando sobre suas propriedades e copiando-as em nível primitivo:

// ```javascript
// let user = {
//   name: "João",
//   age: 30
// };

// let clone = {};

// for (let key in user) {
//   clone[key] = user[key];
// }

// clone.name = "Pedro";

// alert(user.name); // ainda "João"
// ```

// Também podemos usar `Object.assign`.

// A sintaxe é:

// ```javascript
// Object.assign(destino, ...fontes)
// ```

// O primeiro argumento é o objeto de destino. Os demais são objetos de origem, cujas propriedades serão copiadas para o destino.

// Exemplo:

// ```javascript
// let user = { name: "João" };

// let permissions1 = { canView: true };
// let permissions2 = { canEdit: true };

// Object.assign(user, permissions1, permissions2);

// alert(user.name); // João
// alert(user.canView); // true
// alert(user.canEdit); // true
// ```

// Se uma propriedade já existir, ela será sobrescrita:

// ```javascript
// let user = { name: "João" };

// Object.assign(user, { name: "Pedro" });

// alert(user.name); // Pedro
// ```

// Também podemos usar `Object.assign` para clonar objetos simples:

// ```javascript
// let user = {
//   name: "João",
//   age: 30
// };

// let clone = Object.assign({}, user);

// alert(clone.name); // João
// alert(clone.age); // 30
// ```

// Outras formas incluem o uso do *spread syntax*: `let clone = {...user}` — que será abordado mais adiante.

// **Clonagem profunda (nested cloning)**

// Até agora, assumimos que todas as propriedades são primitivas. Mas e se uma propriedade for um objeto?

// ```javascript
// let user = {
//   name: "João",
//   sizes: {
//     height: 182,
//     width: 50
//   }
// };
// ```

// Copiar com `Object.assign` nesse caso não é suficiente:

// ```javascript
// let clone = Object.assign({}, user);

// alert(user.sizes === clone.sizes); // true
// ```

// Ou seja, `user` e `clone` compartilham o mesmo objeto interno `sizes`. Uma alteração em um afeta o outro.

// Para evitar isso, precisamos de uma “clonagem profunda” — replicando também os objetos internos.

// **structuredClone**

// A função `structuredClone(objeto)` realiza uma clonagem profunda, incluindo propriedades aninhadas.

// Exemplo:

// ```javascript
// let user = {
//   name: "João",
//   sizes: {
//     height: 182,
//     width: 50
//   }
// };

// let clone = structuredClone(user);

// alert(user.sizes === clone.sizes); // false

// user.sizes.width = 60;
// alert(clone.sizes.width); // 50
// ```

// `structuredClone` suporta a maioria dos tipos de dados, inclusive arrays, objetos e valores primitivos. Também lida com **referências circulares**:

// ```javascript
// let user = {};
// user.me = user;

// let clone = structuredClone(user);

// alert(clone.me === clone); // true
// ```

// A referência circular foi clonada corretamente.

// Mas há limitações: `structuredClone` **não** funciona com funções, por exemplo:

// ```javascript
// structuredClone({
//   f: function() {}
// }); // erro
// ```

// Para esses casos mais complexos, é necessário usar métodos personalizados ou bibliotecas como `_.cloneDeep(obj)` da biblioteca **lodash**.

// **Resumo**

// Objetos são atribuídos e copiados **por referência**. Ou seja, uma variável não armazena o “valor do objeto”, mas sim um **endereço na memória**.

// Todas as operações feitas a partir de referências copiadas afetam o mesmo objeto.

// Para fazer uma **cópia real** (clonagem), podemos usar `Object.assign` para uma cópia superficial (que não clona objetos internos) ou `structuredClone` para uma cópia profunda. Também é possível usar implementações personalizadas ou bibliotecas como `lodash`.
