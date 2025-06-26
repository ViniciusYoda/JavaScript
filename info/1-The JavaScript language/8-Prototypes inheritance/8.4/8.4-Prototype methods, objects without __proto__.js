// -----

// ## Métodos de Protótipo, Objetos Sem `__proto__`

// No primeiro capítulo desta seção, mencionamos que existem métodos modernos para configurar um protótipo.

// Definir ou ler o protótipo com `obj.__proto__` é considerado obsoleto e, de certa forma, depreciado (movido para o chamado "Anexo B" do padrão JavaScript, destinado apenas a navegadores).

// Os métodos modernos para obter/definir um protótipo são:

//   * **`Object.getPrototypeOf(obj)`** – retorna o `[[Prototype]]` de `obj`.
//   * **`Object.setPrototypeOf(obj, proto)`** – define o `[[Prototype]]` de `obj` como `proto`.

// O único uso de `__proto__` que não é malvisto é como uma propriedade ao criar um novo objeto: `{ __proto__: ... }`.

// Embora, haja um método especial para isso também:

//   * **`Object.create(proto[, descriptors])`** – cria um objeto vazio com o `proto` dado como `[[Prototype]]` e descritores de propriedade opcionais.

// Por exemplo:

// ```javascript
// let animal = {
//   eats: true
// };

// // cria um novo objeto com animal como protótipo
// let rabbit = Object.create(animal); // o mesmo que {__proto__: animal}

// alert(rabbit.eats); // true
// alert(Object.getPrototypeOf(rabbit) === animal); // true

// Object.setPrototypeOf(rabbit, {}); // altera o protótipo de rabbit para {}
// ```

// O método `Object.create` é um pouco mais poderoso, pois possui um segundo argumento opcional: descritores de propriedade.

// Podemos fornecer propriedades adicionais ao novo objeto ali, assim:

// ```javascript
// let animal = {
//   eats: true
// };

// let rabbit = Object.create(animal, {
//   jumps: {
//     value: true
//   }
// });

// alert(rabbit.jumps); // true
// ```

// Os descritores estão no mesmo formato descrito no capítulo **Sinalizadores e Descritores de Propriedade**.

// Podemos usar `Object.create` para realizar uma clonagem de objeto mais poderosa do que copiar propriedades em `for..in`:

// ```javascript
// let clone = Object.create(
//   Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
// );
// ```

// Esta chamada cria uma cópia verdadeiramente exata de `obj`, incluindo todas as propriedades: enumeráveis e não enumeráveis, propriedades de dados e setters/getters – tudo, e com o `[[Prototype]]` correto.

// -----

// ### Breve história

// Existem tantas maneiras de gerenciar `[[Prototype]]`. Como isso aconteceu? Por quê?

// Isso se deve a razões históricas.

// A herança prototípica existia na linguagem desde o seu início, mas as formas de gerenciá-la evoluíram ao longo do tempo.

// A propriedade **`prototype` de uma função construtora** funciona desde tempos muito antigos. É a maneira mais antiga de criar objetos com um determinado protótipo.

// Mais tarde, no ano de 2012, **`Object.create`** apareceu no padrão. Ele deu a capacidade de criar objetos com um protótipo dado, mas não forneceu a capacidade de obtê-lo/defini-lo. Alguns navegadores implementaram o acessor não padrão `__proto__` que permitia ao usuário obter/definir um protótipo a qualquer momento, para dar mais flexibilidade aos desenvolvedores.

// Mais tarde, no ano de 2015, **`Object.setPrototypeOf`** e **`Object.getPrototypeOf`** foram adicionados ao padrão, para desempenhar a mesma funcionalidade que `__proto__`. Como `__proto__` foi de fato implementado em todos os lugares, ele foi meio que depreciado e encontrou seu caminho para o Anexo B do padrão, ou seja: opcional para ambientes que não sejam de navegador.

// Mais tarde, no ano de 2022, foi oficialmente permitido usar `__proto__` em literais de objeto `{...}` (removido do Anexo B), mas não como um getter/setter `obj.__proto__` (ainda no Anexo B).

// Por que `__proto__` foi substituído pelas funções `getPrototypeOf`/`setPrototypeOf`?

// Por que `__proto__` foi parcialmente reabilitado e seu uso permitido em `{...}`, mas não como um getter/setter?

// Essa é uma pergunta interessante, que exige que entendamos por que `__proto__` é ruim.

// E em breve teremos a resposta.

// -----

// ### Não altere `[[Prototype]]` em objetos existentes se a velocidade for importante

// Tecnicamente, podemos obter/definir `[[Prototype]]` a qualquer momento. Mas geralmente o definimos apenas uma vez no momento da criação do objeto e não o modificamos mais: `rabbit` herda de `animal`, e isso não vai mudar.

// E os motores JavaScript são altamente otimizados para isso. Mudar um protótipo "em tempo real" com `Object.setPrototypeOf` ou `obj.__proto__=` é uma operação muito lenta, pois quebra otimizações internas para operações de acesso a propriedades de objeto. Portanto, evite-o a menos que você saiba o que está fazendo, ou a velocidade do JavaScript não importe para você.

// -----

// ### Objetos "muito simples"

// Como sabemos, objetos podem ser usados como arrays associativos para armazenar pares chave/valor.

// ...Mas se tentarmos armazenar chaves fornecidas pelo usuário nele (por exemplo, um dicionário inserido pelo usuário), podemos ver uma falha interessante: todas as chaves funcionam bem, exceto `__proto__`.

// Confira o exemplo:

// ```javascript
// let obj = {};
// let key = prompt("Qual é a chave?", "__proto__");

// obj[key] = "algum valor";
// alert(obj[key]); // [object Object], não "algum valor"!
// ```

// Aqui, se o usuário digitar `__proto__`, a atribuição na linha 4 é ignorada\!

// Isso poderia certamente ser surpreendente para um não desenvolvedor, mas bastante compreensível para nós. A propriedade `__proto__` é especial: deve ser um objeto ou `null`. Uma string não pode se tornar um protótipo. É por isso que atribuir uma string a `__proto__` é ignorado.

// Mas não **pretendíamos** implementar tal comportamento, certo? Queremos armazenar pares chave/valor, e a chave chamada `"__proto__"` não foi salva corretamente. Então isso é um bug\!

// Aqui as consequências não são terríveis. Mas em outros casos, podemos estar armazenando objetos em vez de strings em `obj`, e então o protótipo será realmente alterado. Como resultado, a execução dará errado de maneiras totalmente inesperadas.

// O que é pior – geralmente os desenvolvedores não pensam nessa possibilidade. Isso torna esses bugs difíceis de notar e até os transforma em vulnerabilidades, especialmente quando o JavaScript é usado no lado do servidor.

// Coisas inesperadas também podem acontecer ao atribuir a `obj.toString`, pois é um método de objeto embutido.

// Como podemos evitar esse problema?

// Primeiro, podemos simplesmente mudar para usar **`Map`** para armazenamento em vez de objetos simples, então tudo fica bem:

// ```javascript
// let map = new Map();
// let key = prompt("Qual é a chave?", "__proto__");

// map.set(key, "algum valor");
// alert(map.get(key)); // "algum valor" (conforme o pretendido)
// ```

// ...Mas a sintaxe do **`Object`** é frequentemente mais atraente, pois é mais concisa.

// Felizmente, **podemos** usar objetos, porque os criadores da linguagem pensaram nesse problema há muito tempo.

// Como sabemos, `__proto__` não é uma propriedade de um objeto, mas uma propriedade acessora de `Object.prototype`:

// ```mermaid
// graph TD
//     A[obj] -->|[[Prototype]]| B[Object.prototype];
//     B -- get __proto__(), set __proto__() --> C[acessores];
// ```

// Então, se `obj.__proto__` é lido ou definido, o getter/setter correspondente é chamado de seu protótipo, e ele obtém/define `[[Prototype]]`.

// Como foi dito no início desta seção do tutorial: `__proto__` é uma forma de acessar `[[Prototype]]`, não é o `[[Prototype]]` em si.

// Agora, se pretendemos usar um objeto como um array associativo e nos livrar de tais problemas, podemos fazê-lo com um pequeno truque:

// ```javascript
// let obj = Object.create(null);
// // ou: obj = { __proto__: null }

// let key = prompt("Qual é a chave?", "__proto__");

// obj[key] = "algum valor";
// alert(obj[key]); // "algum valor"
// ```

// `Object.create(null)` cria um objeto vazio sem um protótipo (`[[Prototype]]` é `null`):

// ```mermaid
// graph TD
//     A[obj] -->|[[Prototype]]| B[null];
// ```

// Então, não há getter/setter herdado para `__proto__`. Agora ele é processado como uma propriedade de dados regular, então o exemplo acima funciona corretamente.

// Podemos chamar esses objetos de objetos "muito simples" ou "dicionário puro", porque são ainda mais simples do que o objeto simples regular `{...}`.

// A desvantagem é que esses objetos não possuem métodos de objeto embutidos, por exemplo, `toString`:

// ```javascript
// let obj = Object.create(null);
// alert(obj); // Erro (sem toString)
// ```

// ...Mas isso geralmente não é um problema para arrays associativos.

// Observe que a maioria dos métodos relacionados a objetos são `Object.something(...)`, como `Object.keys(obj)` – eles não estão no protótipo, então continuarão funcionando nesses objetos:

// ```javascript
// let chineseDictionary = Object.create(null);
// chineseDictionary.hello = "你好";
// chineseDictionary.bye = "再见";

// alert(Object.keys(chineseDictionary)); // hello,bye
// ```

// -----

// ### Resumo

// Para criar um objeto com o protótipo dado, use:

//   * sintaxe literal: **`{ __proto__: ... }`**, permite especificar múltiplas propriedades
//   * ou **`Object.create(proto[, descriptors])`**, permite especificar descritores de propriedade.

// O `Object.create` fornece uma maneira fácil de fazer uma cópia rasa de um objeto com todos os descritores:

// ```javascript
// let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
// ```

// Os métodos modernos para obter/definir o protótipo são:

//   * **`Object.getPrototypeOf(obj)`** – retorna o `[[Prototype]]` de `obj` (o mesmo que o getter `__proto__`).
//   * **`Object.setPrototypeOf(obj, proto)`** – define o `[[Prototype]]` de `obj` como `proto` (o mesmo que o setter `__proto__`).

// Obter/definir o protótipo usando o getter/setter embutido `__proto__` não é recomendado; agora ele está no Anexo B da especificação.

// Também abordamos objetos sem protótipo, criados com `Object.create(null)` ou `{__proto__: null}`.

// Esses objetos são usados como dicionários, para armazenar quaisquer chaves (possivelmente geradas pelo usuário).

// Normalmente, os objetos herdam métodos embutidos e o getter/setter `__proto__` de `Object.prototype`, tornando as chaves correspondentes "ocupadas" e potencialmente causando efeitos colaterais. Com o protótipo `null`, os objetos são verdadeiramente vazios.