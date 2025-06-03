// **Expressões de função**

// Em JavaScript, uma função não é uma “estrutura mágica da linguagem”, mas um tipo especial de valor.

// A sintaxe que usamos anteriormente é chamada de **Declaração de Função**:

// ```javascript
// function sayHi() {
//   alert("Olá");
// }
// ```

// Existe outra forma de criar uma função, chamada de **Expressão de Função**.

// Ela nos permite criar uma nova função no meio de qualquer expressão.

// Por exemplo:

// ```javascript
// let sayHi = function() {
//   alert("Olá");
// };
// ```

// Aqui vemos a variável `sayHi` recebendo um valor — a nova função criada como `function() { alert("Olá"); }`.

// Como a criação da função ocorre no contexto de uma expressão de atribuição (à direita do `=`), isso é uma **Expressão de Função**.

// Note que não há nome após a palavra-chave `function`. Omitir o nome é permitido em expressões de função.

// Aqui, ela é imediatamente atribuída à variável, portanto, o significado dos dois trechos de código é o mesmo: “crie uma função e armazene na variável `sayHi`”.

// Em situações mais avançadas, que veremos mais adiante, uma função pode ser criada e chamada imediatamente ou agendada para execução posterior, sem ser armazenada — permanecendo anônima.

// ---

// **Função é um valor**

// Reforçando: independentemente de como a função é criada, uma função é um **valor**. Os dois exemplos acima armazenam uma função na variável `sayHi`.

// Podemos até exibir esse valor com `alert`:

// ```javascript
// function sayHi() {
//   alert("Olá");
// }

// alert(sayHi); // mostra o código da função
// ```

// Note que a última linha **não executa** a função, pois não há parênteses após `sayHi`. Há linguagens onde citar o nome da função já a executa, mas JavaScript não é assim.

// Em JavaScript, uma função é um valor e pode ser tratada como tal. O código acima mostra sua representação como string, ou seja, o código-fonte da função.

// Claro, uma função é um valor especial, pois pode ser chamada como `sayHi()`.

// Mas, ainda assim, é um valor. Podemos copiá-la para outra variável:

// ```javascript
// function sayHi() { // (1) cria
//   alert("Olá");
// }

// let func = sayHi; // (2) copia

// func();   // Olá     // (3) executa a cópia (funciona!)
// sayHi();  // Olá     // ainda funciona também
// ```

// O que acontece:

// 1. A **declaração de função** cria a função e a coloca na variável `sayHi`.
// 2. `func = sayHi` copia a referência da função para a variável `func`. Sem os parênteses — se fossem incluídos, `func = sayHi()` atribuía o **resultado** da execução, e não a função em si.
// 3. Agora a função pode ser chamada tanto por `sayHi()` quanto por `func()`.

// Poderíamos também ter usado uma **Expressão de Função** na primeira linha:

// ```javascript
// let sayHi = function() { // (1) cria
//   alert("Olá");
// };

// let func = sayHi; // (2)
// ```

// Tudo funcionaria do mesmo jeito.

// ---

// **Por que há ponto e vírgula no final?**

// Você pode se perguntar: por que as expressões de função terminam com `;`, mas declarações de função não?

// ```javascript
// function sayHi() {
//   // ...
// }

// let sayHi = function() {
//   // ...
// };
// ```

// A resposta é simples: uma **Expressão de Função** é criada dentro de uma **expressão de atribuição**, como `let sayHi = ...;`. O ponto e vírgula `;` marca o fim da **instrução**, não faz parte da sintaxe da função.

// O mesmo ocorre com uma atribuição simples: `let sayHi = 5;`. Logo, `let sayHi = function() { ... };` também leva ponto e vírgula ao final.

// ---

// **Funções de callback**

// Vamos ver exemplos de passar funções como valores e usar expressões de função.

// Escrevemos uma função `ask(question, yes, no)` com três parâmetros:

// * `question`: o texto da pergunta;
// * `yes`: função a ser executada se a resposta for "Sim";
// * `no`: função a ser executada se a resposta for "Não".

// ```javascript
// function ask(question, yes, no) {
//   if (confirm(question)) yes()
//   else no();
// }

// function showOk() {
//   alert("Você concordou.");
// }

// function showCancel() {
//   alert("Você cancelou a execução.");
// }

// // uso: funções showOk e showCancel passadas como argumentos
// ask("Você concorda?", showOk, showCancel);
// ```

// Na prática, funções assim são bem úteis. Em vez de usar `confirm`, geralmente interfaces reais usam janelas mais elaboradas, mas a ideia é a mesma.

// As funções `showOk` e `showCancel` são chamadas de **funções de callback**, ou **callbacks**.

// A ideia é passar uma função esperando que ela seja **chamada depois**, quando for necessário. No nosso caso, `showOk` é chamada se a resposta for “sim”, e `showCancel` se for “não”.

// Podemos reescrever o código usando expressões de função, de forma mais compacta:

// ```javascript
// function ask(question, yes, no) {
//   if (confirm(question)) yes()
//   else no();
// }

// ask(
//   "Você concorda?",
//   function() { alert("Você concordou."); },
//   function() { alert("Você cancelou a execução."); }
// );
// ```

// As funções são declaradas diretamente dentro da chamada `ask(...)`. Como não têm nome, são chamadas **funções anônimas**. E como não foram atribuídas a variáveis, não ficam disponíveis fora da função `ask` — o que é exatamente o que queremos.

// Esse tipo de código aparece naturalmente em JavaScript, pois está alinhado ao seu estilo.

// ---

// **Função é um valor que representa uma ação**

// Valores como strings ou números representam **dados**.

// Funções representam **ações**.

// Podemos passá-las entre variáveis e executá-las quando quisermos.

// ---

// **Expressão de Função vs Declaração de Função**

// Vamos resumir as principais diferenças entre **Declarações** e **Expressões** de Função.

// ### Diferença de sintaxe:

// **Declaração de função:** é uma instrução independente, no fluxo principal do código:

// ```javascript
// function sum(a, b) {
//   return a + b;
// }
// ```

// **Expressão de função:** criada dentro de uma expressão (geralmente uma atribuição):

// ```javascript
// let sum = function(a, b) {
//   return a + b;
// };
// ```

// ### Quando a função é criada:

// Uma **Expressão de Função** só é criada quando a execução **alcança** aquela linha. Só a partir daí ela pode ser usada.

// Uma **Declaração de Função**, por outro lado, é processada **antes da execução** do código — durante uma fase de “inicialização” do JavaScript — e pode ser usada **antes mesmo da linha onde foi declarada**.

// Exemplo:

// ```javascript
// sayHi("João"); // Olá, João

// function sayHi(name) {
//   alert(`Olá, ${name}`);
// }
// ```

// Isso funciona porque a função `sayHi` foi declarada com **declaração**, e o JavaScript a “conhece” antes de executar qualquer código.

// Mas se fosse uma expressão:

// ```javascript
// sayHi("João"); // erro!

// let sayHi = function(name) {
//   alert(`Olá, ${name}`);
// };
// ```

// A função só seria criada na linha marcada — tarde demais.

// ---

// **Escopo de bloco**

// No modo estrito, se uma **declaração de função** estiver dentro de um bloco `{}`, ela só estará visível **dentro desse bloco**.

// Exemplo:

// ```javascript
// let age = prompt("Qual sua idade?", 18);

// if (age < 18) {
//   function welcome() {
//     alert("Olá!");
//   }
// } else {
//   function welcome() {
//     alert("Saudações!");
//   }
// }

// welcome(); // Erro: welcome não está definida
// ```

// Para tornar `welcome` visível fora do `if`, usamos uma **Expressão de Função**:

// ```javascript
// let age = prompt("Qual sua idade?", 18);

// let welcome;

// if (age < 18) {
//   welcome = function() {
//     alert("Olá!");
//   };
// } else {
//   welcome = function() {
//     alert("Saudações!");
//   };
// }

// welcome(); // agora funciona
// ```

// Ou, de forma ainda mais compacta, com o operador ternário:

// ```javascript
// let age = prompt("Qual sua idade?", 18);

// let welcome = (age < 18) ?
//   function() { alert("Olá!"); } :
//   function() { alert("Saudações!"); };

// welcome(); // funciona
// ```

// ---

// **Quando escolher entre Declaração e Expressão?**

// Como regra geral, quando precisamos declarar uma função, o mais recomendável é usar a **Declaração de Função**. Isso permite chamá-la antes da linha onde aparece no código, o que traz mais flexibilidade e legibilidade.

// Mas se a **Declaração** não for adequada — por exemplo, ao criar funções condicionais — devemos usar uma **Expressão de Função**.

// ---

// **Resumo**

// * Funções são valores. Podem ser atribuídas, copiadas ou declaradas em qualquer parte do código.
// * Se for uma instrução separada no fluxo principal, é uma **Declaração de Função**.
// * Se for criada dentro de uma expressão, é uma **Expressão de Função**.
// * **Declarações de Função** são processadas antes da execução, e ficam visíveis em todo o bloco onde estão.
// * **Expressões de Função** são criadas apenas quando o código alcança a linha onde estão.

// Na maioria dos casos, usar **Declaração de Função** é preferível por ser mais legível e flexível. Use **Expressão de Função** apenas quando realmente necessário.
