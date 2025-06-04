// **Estilo de Codificação**

// Nosso código deve ser o mais limpo e legível possível.

// Essa é, na verdade, a arte da programação — transformar uma tarefa complexa em um código que seja ao mesmo tempo correto e fácil de entender para humanos. Um bom estilo de codificação ajuda muito nesse processo.

// **Sintaxe**

// Aqui está um resumo com algumas regras sugeridas (mais abaixo discutiremos os detalhes):

// **Não existem regras absolutas**

// Nada aqui é imutável. Estas são preferências de estilo, não dogmas sagrados.

// **Chaves (Curly Braces)**

// Na maioria dos projetos JavaScript, as chaves são escritas no estilo “egípcio”, com a chave de abertura na mesma linha da palavra-chave correspondente — e não em uma nova linha. Deve haver também um espaço antes da abertura da chave:

// ```javascript
// if (condição) {
//   // faça isso
//   // ...e aquilo
//   // ...e mais aquilo
// }
// ```

// Um caso especial é quando a estrutura tem apenas uma linha, como `if (condição) fazerAlgo()`. Devemos usar chaves ou não?

// Veja as variantes comentadas para julgar a legibilidade:

// * 😠 Iniciantes às vezes fazem isso. Ruim! As chaves são desnecessárias:

// ```javascript
// if (n < 0) {alert(`Potência ${n} não é suportada`);}
// ```

// * 😠 Quebrar em linha separada sem chaves. Nunca faça isso: erros surgem facilmente ao adicionar linhas:

// ```javascript
// if (n < 0)
//   alert(`Potência ${n} não é suportada`);
// ```

// * 😏 Uma linha sem chaves — aceitável se for curta:

// ```javascript
// if (n < 0) alert(`Potência ${n} não é suportada`);
// ```

// * 😃 Melhor opção:

// ```javascript
// if (n < 0) {
//   alert(`Potência ${n} não é suportada`);
// }
// ```

// Para trechos muito curtos, uma linha é aceitável, como `if (cond) return null;`, mas blocos de código são geralmente mais legíveis.

// **Comprimento da linha**

// Ninguém gosta de ler uma linha horizontal enorme de código. É boa prática quebrá-las.

// Por exemplo:

// ```javascript
// let str = `
//   O TC39 da ECMA International é um grupo de desenvolvedores,
//   implementadores, acadêmicos e mais, colaborando com a comunidade
//   para manter e evoluir a definição do JavaScript.
// `;
// ```

// E em instruções `if`:

// ```javascript
// if (
//   id === 123 &&
//   faseDaLua === 'Minguante Gibosa' &&
//   signo === 'Libra'
// ) {
//   iniciarFeitiçaria();
// }
// ```

// O comprimento máximo da linha deve ser combinado com a equipe. Costuma ser 80 ou 120 caracteres.

// **Indentação**

// Dois tipos de indentação:

// * **Horizontal**: 2 ou 4 espaços, ou tabulação. Espaços são mais comuns hoje em dia. Com eles, é possível alinhar parâmetros, por exemplo:

// ```javascript
// mostrar(parâmetros,
//         alinhados,
//         um,
//         após,
//         outro
// ) {
//   // ...
// }
// ```

// * **Vertical**: linhas em branco para separar blocos lógicos. Mesmo funções curtas podem ser divididas:

// ```javascript
// function potencia(x, n) {
//   let resultado = 1;

//   for (let i = 0; i < n; i++) {
//     resultado *= x;
//   }

//   return resultado;
// }
// ```

// Evite mais de 9 linhas sem uma indentação vertical.

// **Ponto e vírgula**

// Deve-se colocar ponto e vírgula após cada instrução, mesmo quando o JavaScript permite omiti-lo. Isso evita erros sutis. Se você for iniciante, use ponto e vírgula sempre.

// **Níveis de aninhamento**

// Evite aninhamentos profundos. Em loops, `continue` pode ajudar:

// ```javascript
// for (let i = 0; i < 10; i++) {
//   if (!cond) continue;
//   // ...
// }
// ```

// Em funções, use `return` cedo para evitar `else` desnecessário:

// ```javascript
// function potencia(x, n) {
//   if (n < 0) {
//     alert("Expoente negativo não é suportado");
//     return;
//   }

//   let resultado = 1;

//   for (let i = 0; i < n; i++) {
//     resultado *= x;
//   }

//   return resultado;
// }
// ```

// **Organização de funções**

// Ao escrever funções auxiliares, temos três opções:

// 1. **Funções antes do código** que as utiliza:

// ```javascript
// function criarElemento() { ... }
// function atribuirEvento(elem) { ... }
// function mover() { ... }

// let elem = criarElemento();
// atribuirEvento(elem);
// mover();
// ```

// 2. **Código primeiro, depois funções** (geralmente preferido):

// ```javascript
// let elem = criarElemento();
// atribuirEvento(elem);
// mover();

// function criarElemento() { ... }
// function atribuirEvento(elem) { ... }
// function mover() { ... }
// ```

// 3. **Misturado**: função é declarada onde é usada.

// O segundo modelo é melhor, pois vemos o que o código faz antes de se aprofundar nas funções.

// **Guia de estilo (Style Guide)**

// Um guia de estilo define regras sobre como escrever o código: aspas, indentação, tamanho de linha, etc.

// Se todos os membros da equipe seguem o mesmo guia, o código parece ter sido escrito por uma só pessoa.

// Alguns guias populares:

// * Google JavaScript Style Guide
// * Airbnb JavaScript Style Guide
// * Idiomatic.JS
// * StandardJS

// Se você está começando, siga o resumo no início e depois explore os guias para decidir qual prefere.

// **Linters automáticos**

// Linters são ferramentas que verificam o estilo do seu código automaticamente, além de detectar erros, como nomes de variáveis digitados errado.

// Alguns linters famosos:

// * JSLint – um dos primeiros
// * JSHint – mais configurável que o anterior
// * ESLint – o mais atual e usado

// A maioria dos editores possui plugins para integração. Por exemplo, com ESLint:

// 1. Instale o Node.js
// 2. Instale ESLint: `npm install -g eslint`
// 3. Crie um arquivo `.eslintrc` no projeto
// 4. Habilite o plugin ESLint no seu editor

// Exemplo de `.eslintrc`:

// ```json
// {
//   "extends": "eslint:recommended",
//   "env": {
//     "browser": true,
//     "node": true,
//     "es6": true
//   },
//   "rules": {
//     "no-console": 0,
//     "indent": 2
//   }
// }
// ```

// IDEs modernas já vêm com linters embutidos, embora menos configuráveis.

// **Resumo**

// Todas as regras de sintaxe e estilo visam aumentar a **legibilidade** do código. Elas são discutíveis.

// As perguntas importantes ao escolher um estilo são:
// **“O que torna o código mais legível e fácil de entender?”**
// **“O que nos ajuda a evitar erros?”**

// Ler guias populares de estilo ajuda a manter-se atualizado com as melhores práticas da comunidade.
