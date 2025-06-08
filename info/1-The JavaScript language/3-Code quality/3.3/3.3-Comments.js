// **Comentários**

// Como vimos no capítulo sobre estrutura de código, os comentários podem ser de linha única, começando com `//`, ou multilinha, com `/* ... */`.

// Geralmente, usamos comentários para descrever como e por que o código funciona.

// À primeira vista, comentar parece algo simples, mas programadores iniciantes frequentemente cometem erros ao usá-los.

// **Comentários ruins**

// Novatos tendem a usar comentários para explicar *o que* está acontecendo no código. Algo como:

// ```javascript
// // Este código faz isso (...) e aquilo (...)
// // ...e sabe-se lá mais o quê...
// muito;
// complexo;
// codigo;
// ```

// Mas em um bom código, a quantidade de comentários “explicativos” deve ser mínima. Sério: o código deve ser claro o bastante para dispensá-los.

// Existe uma regra excelente sobre isso: **“se o código é tão confuso que precisa de um comentário, talvez ele deva ser reescrito.”**

// **Receita: extrair funções**

// Às vezes, é melhor substituir um trecho de código por uma função, como neste exemplo:

// ```javascript
// function mostrarPrimos(n) {
//   proximoPrimo:
//   for (let i = 2; i < n; i++) {

//     // verifica se i é primo
//     for (let j = 2; j < i; j++) {
//       if (i % j == 0) continue proximoPrimo;
//     }

//     alert(i);
//   }
// }
// ```

// Uma versão melhor, com a função `éPrimo` extraída:

// ```javascript
// function mostrarPrimos(n) {
//   for (let i = 2; i < n; i++) {
//     if (!éPrimo(i)) continue;

//     alert(i);
//   }
// }

// function éPrimo(n) {
//   for (let i = 2; i < n; i++) {
//     if (n % i == 0) return false;
//   }

//   return true;
// }
// ```

// Agora, o código é fácil de entender. A função em si já serve como comentário. Esse tipo de código é chamado de **autodescritivo**.

// **Receita: criar funções**

// Se você tiver um “código em bloco” longo como este:

// ```javascript
// // aqui adicionamos uísque
// for(let i = 0; i < 10; i++) {
//   let gota = pegarUisque();
//   cheirar(gota);
//   adicionar(gota, copo);
// }

// // aqui adicionamos suco
// for(let t = 0; t < 3; t++) {
//   let tomate = pegarTomate();
//   examinar(tomate);
//   let suco = espremer(tomate);
//   adicionar(suco, copo);
// }
// ```

// Pode ser mais interessante refatorar em funções:

// ```javascript
// adicionarUisque(copo);
// adicionarSuco(copo);

// function adicionarUisque(recipient) {
//   for(let i = 0; i < 10; i++) {
//     let gota = pegarUisque();
//     // ...
//   }
// }

// function adicionarSuco(recipient) {
//   for(let t = 0; t < 3; t++) {
//     let tomate = pegarTomate();
//     // ...
//   }
// }
// ```

// Mais uma vez, as funções explicam por si só o que está acontecendo. Não há necessidade de comentar, e a estrutura do código também melhora. Fica claro o que cada função faz, o que recebe e o que retorna.

// Na prática, nem sempre conseguimos evitar comentários explicativos. Existem algoritmos complexos e truques inteligentes de otimização. Mas, de forma geral, devemos tentar manter o código simples e autodescritivo.

// **Comentários bons**

// Se comentários explicativos costumam ser ruins, quais são os comentários bons?

// **Descrever a arquitetura**

// Forneça uma visão geral dos componentes, como eles interagem e qual o fluxo de controle em diferentes situações. Ou seja, uma visão panorâmica do código. Existe até uma linguagem própria para isso, a **UML**, que vale a pena estudar.

// **Documentar funções e seus parâmetros**

// Existe uma sintaxe especial chamada **JSDoc** para documentar funções: uso, parâmetros e valores de retorno.

// Exemplo:

// ```javascript
// /**
//  * Retorna x elevado à potência n.
//  *
//  * @param {number} x Número base.
//  * @param {number} n Expoente (deve ser um número natural).
//  * @return {number} x elevado a n.
//  */
// function potencia(x, n) {
//   ...
// }
// ```

// Esse tipo de comentário ajuda a entender o propósito da função e como usá-la corretamente, sem precisar ler seu código.

// Aliás, muitos editores como o WebStorm entendem JSDoc e usam para autocomplete e verificação automática de código.

// Também existem ferramentas como o **JSDoc 3** que geram documentação em HTML a partir desses comentários. Mais informações: [https://jsdoc.app](https://jsdoc.app).

// **Por que o problema foi resolvido assim?**

// O que está escrito é importante. Mas o que não está escrito pode ser ainda mais.

// Se houver várias maneiras de resolver um problema, por que foi escolhida essa solução? Principalmente quando não é a mais óbvia.

// Sem comentários assim, situações como esta podem ocorrer:

// 1. Você (ou um colega) abre o código antigo e acha que está “ruim”.
// 2. Pensa: “Como eu era burro. Agora vou reescrever do jeito certo.”
// 3. Durante a reescrita, percebe que a nova versão não funciona como o esperado.
// 4. Lembra vagamente do motivo pelo qual fez do jeito anterior.
// 5. Volta para a versão antiga — e tempo foi desperdiçado.

// Comentários explicando a decisão de projeto são muito importantes. Ajudam a manter e evoluir o código corretamente.

// **Existe alguma particularidade ou comportamento sutil no código?**

// Se há algo sutil ou contraintuitivo no código, isso *definitivamente* merece um comentário.

// **Resumo**

// Um sinal claro de um bom desenvolvedor é saber quando e como comentar — inclusive saber quando **não** comentar.

// **Bons comentários**:

// * Descrevem a arquitetura geral e o funcionamento em alto nível.
// * Documentam funções, parâmetros e valores retornados.
// * Explicam decisões importantes de implementação, especialmente se não forem óbvias.

// **Evite comentários**:

// * Que apenas explicam *como* o código funciona ou *o que* ele faz.
//   Coloque-os apenas quando não for possível tornar o código autodescritivo.

// Comentários também são usados por ferramentas de geração automática de documentação, como o **JSDoc3**, que os transformam em documentação HTML (ou outros formatos).
