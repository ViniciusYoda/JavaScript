// -----

// ## F.prototype

// Lembre-se, novos objetos podem ser criados com uma função construtora, como `new F()`.

// Se `F.prototype` for um objeto, então o operador `new` o usa para definir `[[Prototype]]` para o novo objeto.

// **Por favor, observe:**

// O JavaScript tinha herança prototípica desde o início. Era uma das características principais da linguagem.

// Mas nos tempos antigos, não havia acesso direto a ela. A única coisa que funcionava de forma confiável era uma propriedade `"prototype"` da função construtora, descrita neste capítulo. Então, há muitos scripts que ainda a usam.

// Observe que `F.prototype` aqui significa uma propriedade regular chamada `"prototype"` em `F`. Soa algo semelhante ao termo "protótipo", mas aqui realmente nos referimos a uma propriedade regular com esse nome.

// Aqui está o exemplo:

// ```javascript
// let animal = {
//   eats: true
// };

// function Rabbit(name) {
//   this.name = name;
// }

// Rabbit.prototype = animal;

// let rabbit = new Rabbit("White Rabbit"); // rabbit.__proto__ == animal
// alert( rabbit.eats ); // true
// ```

// Definir `Rabbit.prototype = animal` literalmente declara o seguinte: "Quando um `new Rabbit` é criado, atribua seu `[[Prototype]]` a `animal`".

// Essa é a imagem resultante:

// ```mermaid
// graph TD
//     A[função Rabbit] -->|propriedade "prototype"| B[objeto animal];
//     C[instância rabbit] -->|[[Prototype]]| B;
// ```

// Na imagem, `"prototype"` é uma seta horizontal, significando uma propriedade regular, e `[[Prototype]]` é vertical, significando a herança de `rabbit` de `animal`.

// -----

// ### F.prototype usado apenas no momento de `new F`

// A propriedade `F.prototype` é usada apenas quando `new F` é chamada, ela atribui `[[Prototype]]` do novo objeto.

// Se, após a criação, a propriedade `F.prototype` mudar (`F.prototype = <outro objeto>`), então novos objetos criados por `new F` terão outro objeto como `[[Prototype]]`, mas os objetos já existentes manterão o antigo.

// -----

// ### F.prototype Padrão, propriedade `constructor`

// Toda função tem a propriedade `"prototype"`, mesmo que não a forneçamos.

// O `"prototype"` padrão é um objeto com a única propriedade `constructor` que aponta de volta para a própria função.

// Assim:

// ```javascript
// function Rabbit() {}

// /* protótipo padrão
// Rabbit.prototype = { constructor: Rabbit };
// */
// ```

// Podemos verificar:

// ```javascript
// function Rabbit() {}

// // por padrão:
// // Rabbit.prototype = { constructor: Rabbit }
// alert( Rabbit.prototype.constructor == Rabbit ); // true
// ```

// Naturalmente, se não fizermos nada, a propriedade `constructor` estará disponível para todos os coelhos através de `[[Prototype]]`:

// ```javascript
// function Rabbit() {}

// // por padrão:
// // Rabbit.prototype = { constructor: Rabbit }
// let rabbit = new Rabbit(); // herda de {constructor: Rabbit}
// alert(rabbit.constructor == Rabbit); // true (do protótipo)
// ```

// Podemos usar a propriedade `constructor` para criar um novo objeto usando o mesmo construtor do existente.

// Como aqui:

// ```javascript
// function Rabbit(name) {
//   this.name = name;
//   alert(name);
// }

// let rabbit = new Rabbit("Coelho Branco");
// let rabbit2 = new rabbit.constructor("Coelho Preto");
// ```

// Isso é útil quando temos um objeto, não sabemos qual construtor foi usado para ele (por exemplo, ele vem de uma biblioteca de terceiros), e precisamos criar outro do mesmo tipo.

// Mas provavelmente o mais importante sobre `"constructor"` é que...

// ...o próprio JavaScript não garante o valor correto de `"constructor"`.

// Sim, ele existe no `"prototype"` padrão para funções, mas é só isso. O que acontece com ele depois – é totalmente responsabilidade nossa.

// Em particular, se substituirmos o protótipo padrão como um todo, não haverá `"constructor"` nele.

// Por exemplo:

// ```javascript
// function Rabbit() {}

// Rabbit.prototype = {
//   jumps: true
// };

// let rabbit = new Rabbit();
// alert(rabbit.constructor === Rabbit); // false
// ```

// Então, para manter o `"constructor"` correto, podemos optar por adicionar/remover propriedades ao `"prototype"` padrão em vez de sobrescrevê-lo como um todo:

// ```javascript
// function Rabbit() {}

// // Não sobrescreva Rabbit.prototype totalmente
// // apenas adicione a ele
// Rabbit.prototype.jumps = true
// // o Rabbit.prototype.constructor padrão é preservado
// ```

// Ou, alternativamente, recriar a propriedade `constructor` manualmente:

// ```javascript
// Rabbit.prototype = {
//   jumps: true,
//   constructor: Rabbit // agora o construtor também está correto, porque o adicionamos
// };
// ```

// -----

// ### Resumo

// Neste capítulo, descrevemos brevemente a forma de definir um `[[Prototype]]` para objetos criados através de uma função construtora. Mais tarde, veremos padrões de programação mais avançados que dependem disso.

// Tudo é bem simples, apenas algumas notas para deixar as coisas claras:

//   * A propriedade `F.prototype` (não a confunda com `[[Prototype]]`) define `[[Prototype]]` de novos objetos quando `new F()` é chamada.
//   * O valor de `F.prototype` deve ser um objeto ou `null`: outros valores não funcionarão.
//   * A propriedade `"prototype"` só tem esse efeito especial quando definida em uma função construtora e invocada com `new`.
//   * Em objetos regulares, o `prototype` não é nada especial:

// <!-- end list -->

// ```javascript
// let user = {
//   name: "John",
//   prototype: "Bla-bla" // sem mágica alguma
// };
// ```

//   * Por padrão, todas as funções têm `F.prototype = { constructor: F }`, então podemos obter o construtor de um objeto acessando sua propriedade `"constructor"`.