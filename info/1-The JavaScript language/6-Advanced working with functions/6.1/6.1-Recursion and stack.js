// Aqui está a tradução completa e adaptada para o português:

// ---

// **Recursão e Pilha de Execução**

// Vamos voltar ao tema das funções e estudá-las de forma mais aprofundada.

// Nosso primeiro tópico será a recursão.

// Se você já tem alguma experiência com programação, provavelmente esse conceito já lhe é familiar e pode até pular este capítulo.

// Recursão é um padrão de programação útil em situações onde uma tarefa pode ser naturalmente dividida em várias tarefas do mesmo tipo, mas mais simples. Ou quando uma tarefa pode ser simplificada em uma ação fácil, mais uma versão reduzida da mesma tarefa. Ou ainda, como veremos em breve, quando estamos lidando com certas estruturas de dados.

// Quando uma função resolve uma tarefa, ela pode chamar várias outras funções durante o processo. Um caso particular disso é quando uma função chama a si mesma. Isso se chama recursão.

// **Duas formas de pensar**

// Para começar de forma simples, vamos escrever uma função `pow(x, n)` que calcula a potência de `x` elevado a `n`. Ou seja, multiplica `x` por ele mesmo `n` vezes.

// Exemplos:

// ```
// pow(2, 2) = 4
// pow(2, 3) = 8
// pow(2, 4) = 16
// ```

// Existem duas formas de implementar isso:

// **Pensamento iterativo: usando um loop `for`:**

// ```javascript
// function pow(x, n) {
//   let resultado = 1;

//   for (let i = 0; i < n; i++) {
//     resultado *= x;
//   }

//   return resultado;
// }

// alert( pow(2, 3) ); // 8
// ```

// **Pensamento recursivo: simplificando a tarefa e chamando a si mesma:**

// ```javascript
// function pow(x, n) {
//   if (n == 1) {
//     return x;
//   } else {
//     return x * pow(x, n - 1);
//   }
// }

// alert( pow(2, 3) ); // 8
// ```

// Repare como a versão recursiva é fundamentalmente diferente.

// Quando chamamos `pow(x, n)`, a execução se divide em dois caminhos:

// ```
//           se n==1  → x
//          /
// pow(x, n)
//          \
//           senão → x * pow(x, n - 1)
// ```

// * Se `n == 1`, temos o caso trivial. Chamamos isso de **caso base da recursão**, pois gera o resultado óbvio de imediato: `pow(x, 1)` retorna `x`.
// * Caso contrário, transformamos o problema em uma tarefa menor: `x * pow(x, n - 1)`. Em matemática seria: `xⁿ = x * xⁿ⁻¹`. Esse é o **passo recursivo**, onde simplificamos o problema e chamamos a função com um valor menor de `n`.

// Por exemplo, ao calcular `pow(2, 4)` a recursão segue os passos:

// ```
// pow(2, 4) = 2 * pow(2, 3)
// pow(2, 3) = 2 * pow(2, 2)
// pow(2, 2) = 2 * pow(2, 1)
// pow(2, 1) = 2
// ```

// Assim, a recursão reduz o problema a casos cada vez mais simples até atingir o caso base.

// **Recursão geralmente é mais curta**

// A solução recursiva costuma ser mais curta que a iterativa.

// Podemos ainda deixar o código mais compacto usando o operador ternário:

// ```javascript
// function pow(x, n) {
//   return (n == 1) ? x : (x * pow(x, n - 1));
// }
// ```

// A quantidade máxima de chamadas aninhadas (incluindo a primeira) é chamada de **profundidade da recursão**. No nosso caso, será exatamente `n`.

// A profundidade máxima de recursão é limitada pelo motor JavaScript. Normalmente o limite é em torno de 10.000 chamadas, mas pode variar. Existem otimizações automáticas como a **otimização de chamadas de cauda**, mas não são suportadas em todos os lugares e só funcionam em casos simples.

// Isso limita um pouco o uso da recursão, mas ainda assim ela é muito utilizada. Muitos problemas podem ser resolvidos de forma mais simples e com código mais legível usando recursão.

// **Contexto de execução e pilha**

// Agora vamos ver como as chamadas recursivas funcionam por dentro.

// As informações sobre a execução de uma função em andamento ficam armazenadas em sua **pilha de execução**.

// O **contexto de execução** é uma estrutura interna que guarda detalhes como: em qual ponto do código estamos, os valores das variáveis locais, o valor de `this` (não usamos aqui) e outros detalhes internos.

// Cada chamada de função cria um novo contexto de execução.

// Quando uma função faz uma chamada aninhada, o que acontece:

// 1. A função atual é pausada.
// 2. Seu contexto de execução é salvo na pilha de execução.
// 3. A chamada interna é executada.
// 4. Quando ela termina, o contexto anterior é recuperado e a execução continua.

// Exemplo com `pow(2, 3)`:

// Ao chamar `pow(2, 3)`:

// ```
// Contexto: { x: 2, n: 3, linha 1 } pow(2, 3)
// ```

// Como `n != 1`, seguimos para a linha onde ocorre a chamada recursiva:

// ```
// Contexto: { x: 2, n: 3, linha 5 } pow(2, 3)
// ```

// Chamamos então `pow(2, 2)`, salvando o contexto anterior na pilha:

// ```
// Topo da pilha:
// { x: 2, n: 2, linha 1 } pow(2, 2)
// { x: 2, n: 3, linha 5 } pow(2, 3)
// ```

// O processo segue até `pow(2, 1)`. Quando o caso base é atingido, a função retorna, o contexto é removido da pilha e a execução volta ao contexto anterior, continuando de onde parou.

// A profundidade da recursão, neste exemplo, foi 3.

// Importante lembrar que cada contexto ocupa memória. Por isso, algoritmos baseados em loops geralmente consomem menos memória:

// ```javascript
// function pow(x, n) {
//   let resultado = 1;

//   for (let i = 0; i < n; i++) {
//     resultado *= x;
//   }

//   return resultado;
// }
// ```

// Esse código usa apenas um único contexto.

// Qualquer recursão pode ser reescrita como um loop. Mas às vezes essa reescrita é difícil ou desnecessária.

// **Percursos recursivos**

// Outro ótimo uso da recursão é o **percurso recursivo** de estruturas de dados.

// Imagine uma empresa com a seguinte estrutura:

// ```javascript
// let company = {
//   vendas: [
//     { nome: 'João', salario: 1000 },
//     { nome: 'Alice', salario: 1600 }
//   ],
//   desenvolvimento: {
//     sites: [
//       { nome: 'Pedro', salario: 2000 },
//       { nome: 'Alex', salario: 1800 }
//     ],
//     internos: [
//       { nome: 'Jack', salario: 1300 }
//     ]
//   }
// };
// ```

// Queremos somar todos os salários. Um loop iterativo ficaria confuso com vários níveis de profundidade. Vamos de recursão.

// A função terá dois casos:

// 1. Se for um array de pessoas, soma os salários.
// 2. Se for um objeto com subdepartamentos, chama a si mesma para cada subdepartamento e soma os resultados.

// Exemplo:

// ```javascript
// function somaSalarios(departamento) {
//   if (Array.isArray(departamento)) {
//     return departamento.reduce((anterior, atual) => anterior + atual.salario, 0);
//   } else {
//     let soma = 0;
//     for (let subdep of Object.values(departamento)) {
//       soma += somaSalarios(subdep);
//     }
//     return soma;
//   }
// }

// alert(somaSalarios(company)); // 7700
// ```

// O código é compacto, fácil de entender e funciona para qualquer nível de profundidade.

// **Estruturas recursivas**

// Uma estrutura de dados recursiva é aquela que contém instâncias de si mesma.

// Exemplo: HTML é uma estrutura recursiva. Uma `<div>` pode conter outras `<div>`s e assim por diante.

// Outro exemplo clássico é a **Lista Ligada (Linked List)**.

// **Lista Ligada**

// Imagine que queremos armazenar uma lista ordenada de objetos.

// Arrays funcionam, mas operações como inserir ou remover no início são lentas, pois precisam realocar os índices.

// Uma lista ligada resolve isso:

// ```javascript
// let lista = {
//   valor: 1,
//   proximo: {
//     valor: 2,
//     proximo: {
//       valor: 3,
//       proximo: {
//         valor: 4,
//         proximo: null
//       }
//     }
//   }
// };
// ```

// Cada elemento tem:

// * Um valor.
// * Um ponteiro `proximo` para o próximo elemento ou `null` no final.

// Também podemos construir assim:

// ```javascript
// let lista = { valor: 1 };
// lista.proximo = { valor: 2 };
// lista.proximo.proximo = { valor: 3 };
// lista.proximo.proximo.proximo = { valor: 4 };
// lista.proximo.proximo.proximo.proximo = null;
// ```

// Podemos cortar ou juntar listas com facilidade:

// ```javascript
// let segundaLista = lista.proximo.proximo;
// lista.proximo.proximo = null; // separa
// lista.proximo.proximo = segundaLista; // junta de novo
// ```

// Adicionar um novo valor no início:

// ```javascript
// lista = { valor: "novo item", proximo: lista };
// ```

// Remover um elemento do meio:

// ```javascript
// lista.proximo = lista.proximo.proximo;
// ```

// Não há necessidade de reindexação, como acontece com arrays.

// **Vantagens e desvantagens da lista ligada:**

// * Não permite acesso rápido a elementos por índice como um array (ex: `arr[n]`).
// * Mas é excelente para filas, deques e estruturas que exigem inserção/remoção rápida nas extremidades.

// Podemos aprimorar a lista adicionando um campo `anterior` (para lista duplamente ligada) ou um ponteiro para o final (`tail`).

// **Resumo**

// * **Recursão** significa que uma função chama a si mesma. Útil para resolver problemas de forma elegante.
// * Recursão funciona bem com **estruturas de dados recursivas**, como listas ligadas ou árvores.
// * Todo algoritmo recursivo pode ser reescrito como um loop, mas nem sempre isso é necessário ou desejável.
// * **Pilha de execução** é a base do funcionamento da recursão. Cada chamada de função cria um novo contexto, que fica na pilha até o término daquela execução.


