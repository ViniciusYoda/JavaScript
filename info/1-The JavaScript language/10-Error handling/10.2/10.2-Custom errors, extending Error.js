// -----

// ## Erros Personalizados, Estendendo `Error`

// Ao desenvolvermos algo, frequentemente precisamos de nossas próprias classes de erro para refletir coisas específicas que podem dar errado em nossas tarefas. Para erros em operações de rede, podemos precisar de `HttpError`, para operações de banco de dados, `DbError`, para operações de busca, `NotFoundError` e assim por diante.

// Nossos erros devem suportar propriedades de erro básicas como `message`, `name` e, de preferência, `stack`. Mas eles também podem ter outras propriedades próprias, por exemplo, objetos `HttpError` podem ter uma propriedade `statusCode` com um valor como `404` ou `403` ou `500`.

// JavaScript permite usar `throw` com qualquer argumento, então tecnicamente nossas classes de erro personalizadas não precisam herdar de `Error`. Mas se herdarmos, então se torna possível usar `obj instanceof Error` para identificar objetos de erro. Então é melhor herdar dela.

// À medida que a aplicação cresce, nossos próprios erros naturalmente formam uma hierarquia. Por exemplo, `HttpTimeoutError` pode herdar de `HttpError`, e assim por diante.

// -----

// ### Estendendo `Error`

// Como exemplo, vamos considerar uma função `readUser(json)` que deve ler JSON com dados de usuário.

// Aqui está um exemplo de como um `json` válido pode se parecer:

// ```javascript
// let json = `{ "name": "John", "age": 30 }`;
// ```

// Internamente, usaremos `JSON.parse`. Se ele receber um `json` malformado, ele lançará `SyntaxError`. Mas mesmo que o `json` esteja sintaticamente correto, isso não significa que seja um usuário válido, certo? Pode faltar os dados necessários. Por exemplo, pode não ter as propriedades `name` e `age` que são essenciais para nossos usuários.

// Nossa função `readUser(json)` não só lerá JSON, mas também verificará ("validará") os dados. Se não houver campos necessários, ou o formato estiver errado, então isso é um erro. E isso não é um `SyntaxError`, porque os dados estão sintaticamente corretos, mas outro tipo de erro. Vamos chamá-lo de `ValidationError` e criar uma classe para ele. Um erro desse tipo também deve conter a informação sobre o campo ofensivo.

// Nossa classe `ValidationError` deve herdar da classe `Error`.

// A classe `Error` é embutida, mas aqui está seu código aproximado para que possamos entender o que estamos estendendo:

// ```javascript
// // O "pseudocódigo" para a classe Error embutida definida pelo próprio JavaScript
// class Error {
//   constructor(message) {
//     this.message = message;
//     this.name = "Error"; // (nomes diferentes para diferentes classes de erro embutidas)
//     this.stack = <call stack>; // não padrão, mas a maioria dos ambientes suporta
//   }
// }
// ```

// Agora vamos herdar `ValidationError` dela e experimentá-la em ação:

// ```javascript
// class ValidationError extends Error {
//   constructor(message) {
//     super(message); // (1)
//     this.name = "ValidationError"; // (2)
//   }
// }

// function test() {
//   throw new ValidationError("Opa!");
// }

// try {
//   test();
// } catch(err) {
//   alert(err.message); // Opa!
//   alert(err.name);    // ValidationError
//   alert(err.stack);   // uma lista de chamadas aninhadas com números de linha para cada
// }
// ```

// Observe: na linha `(1)`, chamamos o construtor pai. JavaScript exige que chamemos `super` no construtor filho, então isso é obrigatório. O construtor pai define a propriedade `message`.

// O construtor pai também define a propriedade `name` como `"Error"`, então na linha `(2)` a redefinimos para o valor correto.

// Vamos tentar usá-lo em `readUser(json)`:

// ```javascript
// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "ValidationError";
//   }
// }

// // Uso
// function readUser(json) {
//   let user = JSON.parse(json);

//   if (!user.age) {
//     throw new ValidationError("Nenhum campo: idade");
//   }
//   if (!user.name) {
//     throw new ValidationError("Nenhum campo: nome");
//   }

//   return user;
// }

// // Exemplo funcionando com try..catch
// try {
//   let user = readUser('{ "age": 25 }');
// } catch (err) {
//   if (err instanceof ValidationError) {
//     alert("Dados inválidos: " + err.message); // Dados inválidos: Nenhum campo: nome
//   } else if (err instanceof SyntaxError) { // (*)
//     alert("Erro de sintaxe JSON: " + err.message);
//   } else {
//     throw err; // erro desconhecido, relançá-lo (**)
//   }
// }
// ```

// O bloco `try..catch` no código acima lida tanto com nosso `ValidationError` quanto com o `SyntaxError` embutido de `JSON.parse`.

// Por favor, observe como usamos `instanceof` para verificar o tipo de erro específico na linha `(*)`.

// Também poderíamos olhar para `err.name`, assim:

// ```javascript
// // ...
// // em vez de (err instanceof SyntaxError)} else if (err.name == "SyntaxError") { // (*)
// // ...
// ```

// A versão `instanceof` é muito melhor, porque no futuro vamos estender `ValidationError`, criar subtipos dela, como `PropertyRequiredError`. E a verificação `instanceof` continuará funcionando para novas classes herdeiras. Então, isso é à prova de futuro.

// Também é importante que, se `catch` encontrar um erro desconhecido, ele o relance na linha `(**)`. O bloco `catch` só sabe como lidar com erros de validação e sintaxe, outros tipos (causados por um erro de digitação no código ou outras razões desconhecidas) devem passar.

// -----

// ### Herança adicional

// A classe `ValidationError` é muito genérica. Muitas coisas podem dar errado. A propriedade pode estar ausente ou pode estar em um formato errado (como um valor de string para `age` em vez de um número). Vamos criar uma classe mais concreta, `PropertyRequiredError`, exatamente para propriedades ausentes. Ela carregará informações adicionais sobre a propriedade que está faltando.

// ```javascript
// class ValidationError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "ValidationError";
//   }
// }

// class PropertyRequiredError extends ValidationError {
//   constructor(property) {
//     super("Nenhuma propriedade: " + property);
//     this.name = "PropertyRequiredError";
//     this.property = property;
//   }
// }

// // Uso
// function readUser(json) {
//   let user = JSON.parse(json);

//   if (!user.age) {
//     throw new PropertyRequiredError("age");
//   }
//   if (!user.name) {
//     throw new PropertyRequiredError("name");
//   }

//   return user;
// }

// // Exemplo funcionando com try..catch
// try {
//   let user = readUser('{ "age": 25 }');
// } catch (err) {
//   if (err instanceof ValidationError) {
//     alert("Dados inválidos: " + err.message); // Dados inválidos: Nenhuma propriedade: name
//     alert(err.name);    // PropertyRequiredError
//     alert(err.property); // name
//   } else if (err instanceof SyntaxError) {
//     alert("Erro de sintaxe JSON: " + err.message);
//   } else {
//     throw err; // erro desconhecido, relançá-lo
//   }
// }
// ```

// A nova classe `PropertyRequiredError` é fácil de usar: precisamos apenas passar o nome da propriedade: `new PropertyRequiredError(property)`. A `message` legível por humanos é gerada pelo construtor.

// Observe que `this.name` no construtor de `PropertyRequiredError` é novamente atribuído manualmente. Isso pode se tornar um pouco tedioso – atribuir `this.name = <class name>` em cada classe de erro personalizada. Podemos evitá-lo criando nossa própria classe de "erro básico" que atribui `this.name = this.constructor.name`. E então herdar todos os nossos erros personalizados dela.

// Vamos chamá-la de `MyError`.

// Aqui está o código com `MyError` e outras classes de erro personalizadas, simplificado:

// ```javascript
// class MyError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = this.constructor.name;
//   }
// }

// class ValidationError extends MyError { }

// class PropertyRequiredError extends ValidationError {
//   constructor(property) {
//     super("Nenhuma propriedade: " + property);
//     this.property = property;
//   }
// }

// // o nome está correto
// alert( new PropertyRequiredError("campo").name ); // PropertyRequiredError
// ```

// Agora, os erros personalizados são muito mais curtos, especialmente `ValidationError`, pois nos livramos da linha `"this.name = ..."` no construtor.

// -----

// ### Empacotamento de Exceções

// O propósito da função `readUser` no código acima é "ler os dados do usuário". Diferentes tipos de erros podem ocorrer durante o processo. Atualmente, temos `SyntaxError` e `ValidationError`, mas no futuro a função `readUser` pode crescer e provavelmente gerar outros tipos de erros.

// O código que chama `readUser` deve lidar com esses erros. Atualmente, ele usa múltiplos `if`s no bloco `catch`, que verificam a classe e tratam os erros conhecidos e relançam os desconhecidos.

// O esquema é assim:

// ```javascript
// try {
//   // ...
//   readUser() // a fonte potencial de erro
//   // ...
// } catch (err) {
//   if (err instanceof ValidationError) {
//     // trata erros de validação
//   } else if (err instanceof SyntaxError) {
//     // trata erros de sintaxe
//   } else {
//     throw err; // erro desconhecido, relança-o
//   }
// }
// ```

// No código acima, podemos ver dois tipos de erros, mas pode haver mais.

// Se a função `readUser` gera vários tipos de erros, então devemos nos perguntar: realmente queremos verificar todos os tipos de erro um por um a cada vez?

// Muitas vezes a resposta é "Não": gostaríamos de estar "um nível acima de tudo isso". Queremos apenas saber se houve um "erro de leitura de dados" – o porquê exatamente aconteceu é muitas vezes irrelevante (a mensagem de erro o descreve). Ou, melhor ainda, gostaríamos de ter uma maneira de obter os detalhes do erro, mas apenas se precisarmos.

// A técnica que descrevemos aqui é chamada de "empacotamento de exceções".

// Faremos uma nova classe `ReadError` para representar um erro genérico de "leitura de dados".

// A função `readUser` capturará erros de leitura de dados que ocorrem dentro dela, como `ValidationError` e `SyntaxError`, e gerará um `ReadError` em vez disso.

// O objeto `ReadError` manterá a referência ao erro original em sua propriedade `cause`.

// Então o código que chama `readUser` só terá que verificar por `ReadError`, não por cada tipo de erro de leitura de dados. E se precisar de mais detalhes de um erro, pode verificar sua propriedade `cause`.

// Aqui está o código que define `ReadError` e demonstra seu uso em `readUser` e `try..catch`:

// ```javascript
// class ReadError extends Error {
//   constructor(message, cause) {
//     super(message);
//     this.cause = cause;
//     this.name = 'ReadError';
//   }
// }

// class ValidationError extends Error { /*...*/ }
// class PropertyRequiredError extends ValidationError { /* ... */ }

// function validateUser(user) {
//   if (!user.age) {
//     throw new PropertyRequiredError("age");
//   }

//   if (!user.name) {
//     throw new PropertyRequiredError("name");
//   }
// }

// function readUser(json) {
//   let user;

//   try {
//     user = JSON.parse(json);
//   } catch (err) {
//     if (err instanceof SyntaxError) {
//       throw new ReadError("Erro de sintaxe", err);
//     } else {
//       throw err;
//     }
//   }

//   try {
//     validateUser(user);
//   } catch (err) {
//     if (err instanceof ValidationError) {
//       throw new ReadError("Erro de validação", err);
//     } else {
//       throw err;
//     }
//   }
// }

// try {
//   readUser('{json ruim}');
// } catch (e) {
//   if (e instanceof ReadError) {
//     alert(e);
//     // Erro original: SyntaxError: Unexpected token b in JSON at position 1
//     alert("Erro original: " + e.cause);
//   } else {
//     throw e;
//   }
// }
// ```

// No código acima, `readUser` funciona exatamente como descrito – captura erros de sintaxe e validação e lança erros `ReadError` em vez disso (erros desconhecidos são relançados como de costume).

// Assim, o código externo verifica `instanceof ReadError` e pronto. Não há necessidade de listar todos os tipos de erro possíveis.

// A abordagem é chamada de "empacotamento de exceções", porque pegamos exceções de "baixo nível" e as "empacotamos" em um `ReadError` mais abstrato. É amplamente utilizada em programação orientada a objetos.

// -----

// ### Resumo

// Podemos herdar de `Error` e de outras classes de erro embutidas normalmente. Precisamos apenas cuidar da propriedade `name` e não esquecer de chamar `super`.

// Podemos usar `instanceof` para verificar erros específicos. Ele também funciona com herança. Mas às vezes temos um objeto de erro vindo de uma biblioteca de terceiros e não há uma maneira fácil de obter sua classe. Então a propriedade `name` pode ser usada para tais verificações.

// **Empacotamento de exceções** é uma técnica difundida: uma função lida com exceções de baixo nível e cria erros de nível superior em vez de vários erros de baixo nível. Exceções de baixo nível às vezes se tornam propriedades desse objeto, como `err.cause` nos exemplos acima, mas isso não é estritamente necessário.

// -----