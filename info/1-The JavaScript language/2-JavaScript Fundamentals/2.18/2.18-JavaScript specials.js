// **Especiais do JavaScript**

// Este capítulo faz uma breve recapitulação dos recursos do JavaScript que aprendemos até agora, com atenção especial para alguns pontos sutis.

// ---

// **Estrutura do código**

// As instruções em JavaScript são geralmente finalizadas com ponto e vírgula:

// ```javascript
// alert('Olá'); alert('Mundo');
// ```

// Normalmente, uma quebra de linha também é tratada como delimitador, então isso também funciona:

// ```javascript
// alert('Olá')
// alert('Mundo')
// ```

// Isso é chamado de *inserção automática de ponto e vírgula*. Mas às vezes isso pode causar erros, por exemplo:

// ```javascript
// alert("Haverá um erro após esta mensagem")

// [1, 2].forEach(alert)
// ```

// A maioria dos guias de estilo recomenda sempre colocar ponto e vírgula no final de cada instrução.

// Ponto e vírgula **não são necessários** após blocos de código `{...}` nem em estruturas como laços:

// ```javascript
// function f() {
//   // sem ponto e vírgula aqui
// }

// for (;;) {
//   // sem ponto e vírgula após o laço
// }
// ```

// Mesmo se colocarmos um “ponto e vírgula extra”, isso **não causa erro** — ele será ignorado.

// ---

// **Modo estrito**

// Para ativar todos os recursos modernos do JavaScript, o script deve começar com:

// ```javascript
// 'use strict';
// ```

// Essa diretiva precisa estar no topo do script ou no início de uma função. Sem `"use strict"`, tudo ainda funciona, mas alguns comportamentos antigos permanecem. O ideal é sempre usarmos o modo moderno.

// Alguns recursos mais novos (como *classes*) já ativam o modo estrito automaticamente.

// ---

// **Variáveis**

// Podem ser declaradas com:

// * `let`
// * `const` (constante, não pode ser alterada)
// * `var` (forma antiga, veremos depois)

// Nomes de variáveis podem conter:

// * Letras e dígitos, mas **não podem começar com dígitos**
// * Os caracteres `$` e `_` são válidos
// * Alfabetos não-latinos também são permitidos, mas raramente usados

// As variáveis são *tipadas dinamicamente*: podem armazenar qualquer valor:

// ```javascript
// let x = 5;
// x = "João";
// ```

// Existem **8 tipos de dados**:

// * `number`: números inteiros e decimais
// * `bigint`: inteiros de tamanho arbitrário
// * `string`: textos
// * `boolean`: `true` ou `false`
// * `null`: valor único que significa “vazio” ou “inexistente”
// * `undefined`: valor único que significa “não atribuído”
// * `object` e `symbol`: para estruturas complexas e identificadores únicos (ainda não vimos)

// O operador `typeof` retorna o tipo de um valor, com duas exceções curiosas:

// ```javascript
// typeof null == "object" // erro histórico da linguagem
// typeof function(){} == "function" // funções são tratadas de forma especial
// ```

// ---

// **Interação com o usuário**

// Como usamos o navegador, temos funções básicas de interface:

// * `prompt(pergunta, [padrão])` — exibe uma pergunta e retorna o valor digitado, ou `null` se cancelado
// * `confirm(pergunta)` — mostra OK/Cancelar e retorna `true` ou `false`
// * `alert(mensagem)` — mostra uma mensagem na tela

// Essas funções **são modais**: pausam a execução do código até que o usuário interaja.

// Exemplo:

// ```javascript
// let nome = prompt("Seu nome?", "Alice");
// let querCha = confirm("Você quer chá?");

// alert("Visitante: " + nome); // Alice
// alert("Quer chá: " + querCha); // true
// ```

// ---

// **Operadores**

// JavaScript possui os seguintes operadores:

// **Aritméticos**

// * `*`, `+`, `-`, `/`, `%` (resto), `**` (potência)

// O operador `+` também **concatena strings**:

// ```javascript
// alert('1' + 2); // "12"
// alert(1 + '2'); // "12"
// ```

// **Atribuição**

// * Simples: `a = b`
// * Combinado: `a *= 2`, `a += 3`, etc.

// **Bit a bit**

// * Operam com inteiros de 32 bits no nível de bits. Use conforme necessidade específica.

// **Condicional (ternário)**

// * `condição ? resultadoA : resultadoB`

// **Lógicos**

// * `&&` (E lógico)
// * `||` (OU lógico)
// * `!` (negação lógica)

// Eles usam **avaliação de curto-circuito**: param na primeira condição suficiente para saber o resultado.

// **Operador de coalescência nula `??`**

// * Retorna o primeiro valor **definido** (ou seja, diferente de `null` ou `undefined`):

// ```javascript
// let nome = userName ?? "Visitante";
// ```

// **Comparações**

// * `==` converte tipos antes de comparar. Ex:

// ```javascript
// alert(0 == false); // true
// alert(0 == '');    // true
// ```

// * `===` é comparação **estrita**, sem conversão de tipos

// * `null` e `undefined` são iguais entre si com `==`, mas diferentes de qualquer outra coisa

// ---

// **Laços**

// Vimos 3 tipos de laços:

// ```javascript
// // 1
// while (condição) {
//   ...
// }

// // 2
// do {
//   ...
// } while (condição);

// // 3
// for (let i = 0; i < 10; i++) {
//   ...
// }
// ```

// A variável `let` usada no `for` só existe dentro do laço. Podemos reutilizar variáveis fora do laço também.

// Diretivas `break` e `continue` controlam o fluxo dos laços. Podemos usar **rótulos (labels)** para sair de laços aninhados.

// Veremos outros tipos de laços para objetos futuramente.

// ---

// **O comando `switch`**

// O `switch` pode substituir vários `if`. Ele usa comparação estrita (`===`).

// Exemplo:

// ```javascript
// let idade = prompt('Sua idade?', 18);

// switch (idade) {
//   case 18:
//     alert("Não vai funcionar"); // prompt retorna string
//     break;

//   case "18":
//     alert("Isso funciona!");
//     break;

//   default:
//     alert("Qualquer valor diferente dos anteriores");
// }
// ```

// ---

// **Funções**

// Vimos 3 formas de criar funções:

// **Declaração de função** (forma clássica):

// ```javascript
// function soma(a, b) {
//   return a + b;
// }
// ```

// **Expressão de função**:

// ```javascript
// let soma = function(a, b) {
//   return a + b;
// };
// ```

// **Função seta (arrow function):**

// ```javascript
// let soma = (a, b) => a + b;

// let soma = (a, b) => {
//   // bloco de código
//   return a + b;
// };

// let digaOi = () => alert("Olá");

// let dobrar = n => n * 2;
// ```

// Funções podem ter variáveis locais (dentro do corpo ou parâmetros). Podemos definir valores padrão para parâmetros:

// ```javascript
// function soma(a = 1, b = 2) {...}
// ```

// Toda função retorna algo. Se não houver `return`, o retorno é `undefined`.

// ---

// **Mais por vir**

// Essa foi uma visão geral dos recursos que vimos até agora no JavaScript. Ainda estamos no básico. Ao longo do tutorial, veremos muitos recursos especiais e avançados da linguagem.
