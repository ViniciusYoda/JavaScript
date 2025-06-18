// ---
// ## WeakMap e WeakSet

// Como sabemos do capítulo sobre **Coleta de Lixo**, o motor JavaScript mantém um valor na memória enquanto ele for "alcançável" e puder ser potencialmente usado.

// Por exemplo:

// ```javascript
// let john = { name: "John" };

// // o objeto pode ser acessado, john é a referência para ele
// // sobrescrever a referência
// john = null;

// // o objeto será removido da memória
// ```

// Normalmente, propriedades de um objeto ou elementos de um array ou outra estrutura de dados são considerados alcançáveis e mantidos na memória enquanto essa estrutura de dados estiver na memória.

// Por exemplo, se colocarmos um objeto em um array, enquanto o array estiver "vivo", o objeto também estará, mesmo que não haja outras referências a ele.

// Assim:

// ```javascript
// let john = { name: "John" };
// let array = [ john ];

// john = null; // sobrescrever a referência

// // o objeto previamente referenciado por john é armazenado dentro do array
// // portanto, não será coletado pelo coletor de lixo
// // podemos obtê-lo como array[0]
// ```

// Da mesma forma, se usarmos um objeto como chave em um **Map** regular, enquanto o **Map** existir, esse objeto também existirá. Ele ocupa memória e pode não ser coletado pelo coletor de lixo.

// Por exemplo:

// ```javascript
// let john = { name: "John" };
// let map = new Map();
// map.set(john, "...");

// john = null; // sobrescrever a referência

// // john é armazenado dentro do mapa,
// // podemos obtê-lo usando map.keys()
// ```

// **WeakMap** é fundamentalmente diferente nesse aspecto. Ele não impede a coleta de lixo de objetos-chave.

// Vamos ver o que isso significa em exemplos.

// ---
// ### WeakMap

// A primeira diferença entre **Map** e **WeakMap** é que as chaves devem ser **objetos**, não valores primitivos:

// ```javascript
// let weakMap = new WeakMap();
// let obj = {};

// weakMap.set(obj, "ok"); // funciona bem (chave de objeto)

// // não é possível usar uma string como chave
// weakMap.set("test", "Whoops"); // Erro, porque "test" não é um objeto
// ```

// Agora, se usarmos um objeto como chave nele, e não houver outras referências a esse objeto – ele será removido da memória (e do mapa) automaticamente.

// ```javascript
// let john = { name: "John" };
// let weakMap = new WeakMap();
// weakMap.set(john, "...");

// john = null; // sobrescrever a referência

// // john é removido da memória!
// ```

// Compare com o exemplo de **Map** regular acima. Agora, se `john` existir apenas como chave de um **WeakMap** – ele será automaticamente excluído do mapa (e da memória).

// **WeakMap** não suporta iteração e os métodos `keys()`, `values()`, `entries()`, então não há como obter todas as chaves ou valores dele.

// **WeakMap** tem apenas os seguintes métodos:

// * `weakMap.set(key, value)`
// * `weakMap.get(key)`
// * `weakMap.delete(key)`
// * `weakMap.has(key)`

// Por que tal limitação? Isso é por razões técnicas. Se um objeto perdeu todas as outras referências (como `john` no código acima), ele deve ser coletado pelo coletor de lixo automaticamente. Mas tecnicamente, não é exatamente especificado **quando a limpeza acontece**.

// O motor JavaScript decide isso. Ele pode optar por realizar a limpeza da memória imediatamente ou esperar e fazer a limpeza mais tarde, quando mais exclusões ocorrerem. Por essa razão, os métodos que acessam todas as chaves/valores não são suportados.

// Agora, onde precisamos de tal estrutura de dados?

// ---
// #### Caso de uso: dados adicionais

// A principal área de aplicação para **WeakMap** é um **armazenamento de dados adicionais**.

// Se estamos trabalhando com um objeto que "pertence" a outro código, talvez até mesmo uma biblioteca de terceiros, e gostaríamos de armazenar alguns dados associados a ele, que só devem existir enquanto o objeto estiver "vivo" – então **WeakMap** é exatamente o que é necessário.

// Colocamos os dados em um **WeakMap**, usando o objeto como chave, e quando o objeto é coletado pelo coletor de lixo, esses dados desaparecerão automaticamente também.

// ```javascript
// weakMap.set(john, "documentos secretos");
// // se john "morrer", os documentos secretos serão destruídos automaticamente
// ```

// Vamos ver um exemplo.

// Por exemplo, temos um código que mantém uma contagem de visitas para usuários. A informação é armazenada em um mapa: um objeto de usuário é a chave e a contagem de visitas é o valor. Quando um usuário sai (seu objeto é coletado pelo coletor de lixo), não queremos mais armazenar sua contagem de visitas.

// Aqui está um exemplo de uma função de contagem com **Map**:

// ```javascript
// // 📁 visitsCount.js
// let visitsCountMap = new Map(); // map: user => visits count

// // aumentar a contagem de visitas
// function countUser(user) {
//   let count = visitsCountMap.get(user) || 0;
//   visitsCountMap.set(user, count + 1);
// }
// ```

// E aqui está outra parte do código, talvez outro arquivo usando-o:

// ```javascript
// // 📁 main.js
// let john = { name: "John" };
// countUser(john); // contar suas visitas

// // mais tarde john nos deixa
// john = null;
// ```

// Agora, o objeto `john` deveria ser coletado pelo coletor de lixo, mas permanece na memória, pois é uma chave em `visitsCountMap`.

// Precisamos limpar `visitsCountMap` quando removemos usuários, caso contrário, ele crescerá na memória indefinidamente. Essa limpeza pode se tornar uma tarefa tediosa em arquiteturas complexas.

// Podemos evitar isso mudando para **WeakMap** em vez disso:

// ```javascript
// // 📁 visitsCount.js
// let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// // aumentar a contagem de visitas
// function countUser(user) {
//   let count = visitsCountMap.get(user) || 0;
//   visitsCountMap.set(user, count + 1);
// }
// ```

// Agora não precisamos limpar `visitsCountMap`. Depois que o objeto `john` se torna inalcançável, por todos os meios, exceto como uma chave de **WeakMap**, ele é removido da memória, juntamente com as informações por essa chave do **WeakMap**.

// ---
// #### Caso de uso: cache

// Outro exemplo comum é o cache. Podemos armazenar ("cachear") resultados de uma função, para que chamadas futuras no mesmo objeto possam reutilizá-los.

// Para conseguir isso, podemos usar **Map** (cenário não ideal):

// ```javascript
// // 📁 cache.js
// let cache = new Map();

// // calcular e lembrar o resultado
// function process(obj) {
//   if (!cache.has(obj)) {
//     let result = /* cálculos do resultado para */ obj;

//     cache.set(obj, result);
//     return result;
//   }

//   return cache.get(obj);
// }

// // Agora usamos process() em outro arquivo:
// // 📁 main.js
// let obj = {/* digamos que temos um objeto */};
// let result1 = process(obj); // calculado

// // ...mais tarde, de outro lugar do código...
// let result2 = process(obj); // resultado lembrado tirado do cache

// // ...mais tarde, quando o objeto não é mais necessário:
// obj = null;
// alert(cache.size); // 1 (Ops! O objeto ainda está no cache, ocupando memória!)
// ```

// Para várias chamadas de `process(obj)` com o mesmo objeto, ele só calcula o resultado na primeira vez e depois apenas o pega do `cache`. A desvantagem é que precisamos limpar o `cache` quando o objeto não é mais necessário.

// Se substituirmos **Map** por **WeakMap**, então esse problema desaparece. O resultado em cache será removido da memória automaticamente depois que o objeto for coletado pelo coletor de lixo.

// ```javascript
// // 📁 cache.js
// let cache = new WeakMap();

// // calcular e lembrar o resultado
// function process(obj) {
//   if (!cache.has(obj)) {
//     let result = /* calcular o resultado para */ obj;

//     cache.set(obj, result);
//     return result;
//   }

//   return cache.get(obj);
// }

// // 📁 main.js
// let obj = {/* algum objeto */};
// let result1 = process(obj);
// let result2 = process(obj);

// // ...mais tarde, quando o objeto não é mais necessário:
// obj = null;

// // Não é possível obter cache.size, pois é um WeakMap,
// // mas é 0 ou em breve será 0
// // Quando obj for coletado pelo coletor de lixo, os dados em cache também serão removidos
// ```

// ---
// ### WeakSet

// **WeakSet** se comporta de forma semelhante:

// * É análogo ao **Set**, mas só podemos adicionar **objetos** a um **WeakSet** (não primitivos).
// * Um objeto existe no conjunto enquanto for alcançável de algum outro lugar.
// * Como o **Set**, ele suporta `add`, `has` e `delete`, mas não `size`, `keys()` e não há iterações.

// Sendo "fraco", ele também serve como armazenamento adicional. Mas não para dados arbitrários, e sim para fatos de "sim/não". Uma associação em um **WeakSet** pode significar algo sobre o objeto.

// Por exemplo, podemos adicionar usuários ao **WeakSet** para acompanhar aqueles que visitaram nosso site:

// ```javascript
// let visitedSet = new WeakSet();

// let john = { name: "John" };
// let pete = { name: "Pete" };
// let mary = { name: "Mary" };

// visitedSet.add(john); // John nos visitou
// visitedSet.add(pete); // Então Pete
// visitedSet.add(john); // John novamente

// // visitedSet tem 2 usuários agora
// // verificar se John visitou?
// alert(visitedSet.has(john)); // true

// // verificar se Mary visitou?
// alert(visitedSet.has(mary)); // false

// john = null;
// // visitedSet será limpo automaticamente
// ```

// A limitação mais notável de **WeakMap** e **WeakSet** é a ausência de iterações e a incapacidade de obter todo o conteúdo atual. Isso pode parecer inconveniente, mas não impede que **WeakMap**/**WeakSet** façam seu trabalho principal – ser um armazenamento "adicional" de dados para objetos que são armazenados/gerenciados em outro lugar.

// ---
// ### Resumo

// **WeakMap** – é uma coleção semelhante a **Map** que permite apenas objetos como chaves e os remove juntamente com o valor associado assim que se tornam inacessíveis por outros meios.

// **WeakSet** – é uma coleção semelhante a **Set** que armazena apenas objetos e os remove assim que se tornam inacessíveis por outros meios.

// Suas principais vantagens são que eles possuem uma **referência fraca** a objetos, de modo que podem ser facilmente removidos pelo coletor de lixo.

// Isso tem o custo de não ter suporte para `clear`, `size`, `keys`, `values`...

// **WeakMap** e **WeakSet** são usados como estruturas de dados "secundárias" em adição ao armazenamento de objetos "primário". Uma vez que o objeto é removido do armazenamento primário, se ele for encontrado apenas como a chave de um **WeakMap** ou em um **WeakSet**, ele será limpo automaticamente.