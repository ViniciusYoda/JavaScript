// **Objetos**

// Como vimos no capítulo sobre *Tipos de Dados*, existem oito tipos de dados em JavaScript. Sete deles são chamados de “primitivos”, porque seus valores contêm apenas uma única informação (seja uma string, um número ou outro valor simples).

// Em contraste, objetos são usados para armazenar coleções associadas de dados e entidades mais complexas. Em JavaScript, os objetos estão presentes em praticamente todos os aspectos da linguagem. Por isso, é essencial compreendê-los bem antes de avançar em outros tópicos.

// Um objeto pode ser criado com chaves `{…}`, contendo uma lista opcional de propriedades. Uma propriedade é um par “chave: valor”, onde a chave é uma string (também chamada de “nome da propriedade”) e o valor pode ser qualquer tipo de dado.

// Podemos imaginar um objeto como um armário com arquivos etiquetados. Cada dado é guardado em um arquivo, identificado por sua chave. É fácil localizar, adicionar ou remover arquivos por nome.

// Um objeto vazio (“armário vazio”) pode ser criado de duas formas:

// ```javascript
// let user = new Object(); // sintaxe do "construtor de objeto"
// let user = {};           // sintaxe do "literal de objeto"
// ```

// Normalmente, usa-se a segunda forma com as chaves `{...}` — essa é chamada de literal de objeto.

// ### Literais e propriedades

// Podemos inserir propriedades diretamente no objeto usando pares “chave: valor”:

// ```javascript
// let user = {
//   name: "João",
//   age: 30
// };
// ```

// Nesse exemplo, o objeto `user` tem duas propriedades: `name` com valor `"João"` e `age` com valor `30`.

// As propriedades são acessadas com a notação de ponto:

// ```javascript
// alert(user.name); // João
// alert(user.age);  // 30
// ```

// O valor pode ser de qualquer tipo. Podemos adicionar, por exemplo, um valor booleano:

// ```javascript
// user.isAdmin = true;
// ```

// Para remover uma propriedade, usamos o operador `delete`:

// ```javascript
// delete user.age;
// ```

// Propriedades com nomes compostos (com espaços) devem ser escritas entre aspas:

// ```javascript
// let user = {
//   name: "João",
//   age: 30,
//   "gosta de pássaros": true
// };
// ```

// O uso de vírgula ao final da última propriedade (chamada “vírgula pendente”) é permitido:

// ```javascript
// let user = {
//   name: "João",
//   age: 30,
// }
// ```

// Isso facilita a adição e reorganização de propriedades.

// ### Colchetes

// Para acessar ou definir propriedades com nomes compostos, usamos a notação com colchetes:

// ```javascript
// user["gosta de pássaros"] = true;
// alert(user["gosta de pássaros"]); // true
// delete user["gosta de pássaros"];
// ```

// Podemos também usar variáveis dentro dos colchetes:

// ```javascript
// let chave = "gosta de pássaros";
// user[chave] = true;
// ```

// Ou até interagir com o usuário dinamicamente:

// ```javascript
// let key = prompt("O que você quer saber sobre o usuário?", "name");
// alert(user[key]);
// ```

// Mas isso **não funciona** com notação de ponto:

// ```javascript
// alert(user.key); // undefined
// ```

// ### Propriedades computadas

// Podemos usar colchetes também dentro da declaração do objeto para propriedades dinâmicas:

// ```javascript
// let fruta = prompt("Qual fruta comprar?", "maçã");

// let sacola = {
//   [fruta]: 5
// };

// alert(sacola.maçã); // 5, se fruta for "maçã"
// ```

// Inclusive com expressões mais complexas:

// ```javascript
// let fruta = "maçã";
// let sacola = {
//   [fruta + "Computador"]: 5
// };
// ```

// Apesar de mais poderosa, a notação com colchetes é mais verbosa. Por isso, usamos ponto para nomes simples e colchetes para nomes dinâmicos ou inválidos como identificadores.

// ### Atalho para valores de propriedade

// Quando os nomes das propriedades são iguais aos nomes das variáveis, podemos usar um atalho:

// ```javascript
// function criarUsuario(name, age) {
//   return {
//     name,
//     age
//   };
// }

// let user = criarUsuario("João", 30);
// alert(user.name); // João
// ```

// Também podemos misturar propriedades normais e com atalho:

// ```javascript
// let user = {
//   name,
//   age: 30
// };
// ```

// ### Limitações nos nomes das propriedades

// Diferente de variáveis, os nomes de propriedades podem usar palavras reservadas da linguagem:

// ```javascript
// let obj = {
//   for: 1,
//   let: 2,
//   return: 3
// };

// alert(obj.for + obj.let + obj.return); // 6
// ```

// Ou seja, praticamente qualquer string pode ser usada como nome de propriedade. Outros tipos (como números) são convertidos automaticamente para strings:

// ```javascript
// let obj = {
//   0: "teste" // equivalente a "0": "teste"
// };

// alert(obj[0]);      // teste
// alert(obj["0"]);    // teste
// ```

// A exceção é a propriedade especial `__proto__`, que não pode receber valores primitivos:

// ```javascript
// let obj = {};
// obj.__proto__ = 5;
// alert(obj.__proto__); // ainda é um objeto, não mudou como esperado
// ```

// ### Verificando existência de propriedade: operador `"in"`

// Diferente de muitas linguagens, acessar uma propriedade inexistente em JavaScript **não gera erro** — apenas retorna `undefined`:

// ```javascript
// let user = {};
// alert(user.naoExiste === undefined); // true
// ```

// Para verificar com mais precisão, usamos o operador `"in"`:

// ```javascript
// let user = { name: "João", age: 30 };
// alert("age" in user);     // true
// alert("blabla" in user);  // false
// ```

// Se usarmos uma variável, não esquecemos de omitir as aspas:

// ```javascript
// let chave = "age";
// alert(chave in user); // true
// ```

// Esse operador é útil quando a propriedade existe, mas tem valor `undefined`:

// ```javascript
// let obj = {
//   teste: undefined
// };

// alert(obj.teste);         // undefined
// alert("teste" in obj);    // true
// ```

// ### Laço "for..in"

// Para percorrer todas as propriedades de um objeto, usamos o laço `for..in`:

// ```javascript
// let user = {
//   name: "João",
//   age: 30,
//   isAdmin: true
// };

// for (let chave in user) {
//   alert(chave);          // name, age, isAdmin
//   alert(user[chave]);    // João, 30, true
// }
// ```

// A variável usada no laço pode ter qualquer nome — `chave`, `propriedade`, `campo`, etc.

// ### Ordem das propriedades

// Objetos **são ordenados de forma especial**:

// * Propriedades com nomes inteiros (como `"1"`, `"44"`) são ordenadas numericamente.
// * As demais são exibidas na ordem de criação.

// Exemplo:

// ```javascript
// let codigos = {
//   "49": "Alemanha",
//   "41": "Suíça",
//   "44": "Reino Unido",
//   "1": "EUA"
// };

// for (let codigo in codigos) {
//   alert(codigo); // 1, 41, 44, 49
// }
// ```

// Isso acontece porque `"1"`, `"44"`, etc., são consideradas propriedades inteiras.

// Para manter a ordem de criação, basta torná-las não inteiras (ex: adicionando um "+"):

// ```javascript
// let codigos = {
//   "+49": "Alemanha",
//   "+41": "Suíça",
//   "+44": "Reino Unido",
//   "+1": "EUA"
// };

// for (let codigo in codigos) {
//   alert(+codigo); // 49, 41, 44, 1
// }
// ```

// ### Resumo

// Objetos são arrays associativos com recursos especiais. Eles armazenam pares chave-valor, onde:

// * As chaves são strings ou símbolos.
// * Os valores podem ser de qualquer tipo.

// Para acessar uma propriedade:

// * Use `obj.propriedade` (notação de ponto).
// * Ou `obj["propriedade"]` (notação com colchetes), que permite usar variáveis como chave.

// Operadores úteis:

// * `delete obj.prop` remove uma propriedade.
// * `"chave" in obj` verifica a existência.
// * `for (let chave in obj)` percorre todas as propriedades.

// O que vimos neste capítulo são os chamados “objetos simples” ou apenas `Object`.

// Existem outros tipos de objetos em JavaScript, como:

// * `Array` para listas ordenadas,
// * `Date` para datas,
// * `Error` para erros,
// * E muitos outros.

// Apesar de possuírem características próprias, todos pertencem ao tipo de dado "object" e o estendem.

// Objetos são um dos pilares do JavaScript — o que aprendemos aqui é apenas o começo. Estudaremos muito mais sobre eles nos próximos capítulos.
