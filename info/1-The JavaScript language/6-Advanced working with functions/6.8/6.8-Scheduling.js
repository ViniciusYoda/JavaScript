// **Agendamento: setTimeout e setInterval**

// Às vezes, podemos querer executar uma função não imediatamente, mas depois de um certo tempo. Isso é chamado de “agendar uma chamada”.

// Existem dois métodos principais para isso:

// * `setTimeout` permite executar uma função apenas uma vez após um intervalo de tempo.
// * `setInterval` permite executar uma função repetidamente, começando após o intervalo de tempo e depois repetindo continuamente nesse mesmo intervalo.

// Esses métodos não fazem parte da especificação oficial da linguagem JavaScript, mas praticamente todos os ambientes JavaScript (como navegadores e Node.js) possuem um agendador interno que oferece esses métodos.

// ### setTimeout

// **Sintaxe:**

// ```javascript
// let timerId = setTimeout(func|código, [atraso], [arg1], [arg2], ...)
// ```

// **Parâmetros:**

// * **func|código**: Função ou string de código a ser executada. Normalmente passamos uma função. Por motivos históricos, é possível passar uma string de código, mas isso não é recomendado.
// * **atraso**: Tempo de espera em milissegundos (1000 ms = 1 segundo). Por padrão, o valor é 0.
// * **arg1, arg2…**: Argumentos para a função.

// Exemplo simples:

// ```javascript
// function sayHi() {
//   alert('Olá');
// }

// setTimeout(sayHi, 1000);
// ```

// Com argumentos:

// ```javascript
// function sayHi(frase, quem) {
//   alert(frase + ', ' + quem);
// }

// setTimeout(sayHi, 1000, "Olá", "João"); // Olá, João
// ```

// Se o primeiro argumento for uma string, o JavaScript irá criar uma função a partir dela:

// ```javascript
// setTimeout("alert('Olá')", 1000);
// ```

// Mas o ideal é sempre usar funções ou arrow functions:

// ```javascript
// setTimeout(() => alert('Olá'), 1000);
// ```

// **Erro comum de iniciantes:**

// ```javascript
// // Errado!
// setTimeout(sayHi(), 1000);
// ```

// Aqui a função `sayHi()` é executada imediatamente, e o resultado (que é `undefined`) é passado para o `setTimeout`. O correto é passar apenas a referência da função.

// ### Cancelando com clearTimeout

// O `setTimeout` retorna um identificador de timer (`timerId`). Podemos usá-lo para cancelar a execução:

// ```javascript
// let timerId = setTimeout(() => alert("Nunca será executado"), 1000);
// clearTimeout(timerId);
// ```

// O identificador permanece o mesmo mesmo após o cancelamento.

// ### setInterval

// O `setInterval` tem a mesma sintaxe que o `setTimeout`:

// ```javascript
// let timerId = setInterval(func|código, [atraso], [arg1], [arg2], ...)
// ```

// A diferença é que ele executa a função repetidamente, a cada intervalo de tempo.

// Para parar as execuções, usamos `clearInterval(timerId)`.

// Exemplo:

// ```javascript
// let timerId = setInterval(() => alert('tick'), 2000);

// setTimeout(() => {
//   clearInterval(timerId);
//   alert('parou');
// }, 5000);
// ```

// **Atenção:** O cronômetro interno continua contando mesmo enquanto um `alert`, `confirm` ou `prompt` está sendo exibido. Isso significa que o atraso real pode ser menor quando você fecha a janela de alerta.

// ### setTimeout aninhado (Nested setTimeout)

// Além do `setInterval`, há uma técnica que usa `setTimeout` aninhado:

// ```javascript
// let timerId = setTimeout(function tick() {
//   alert('tick');
//   timerId = setTimeout(tick, 2000);
// }, 2000);
// ```

// Esse método é mais flexível. Por exemplo, se quisermos ajustar dinamicamente o intervalo com base em condições:

// ```javascript
// let atraso = 5000;

// let timerId = setTimeout(function request() {
//   // ...enviar requisição ao servidor...

//   if (servidorSobrecarregado) {
//     atraso *= 2; // aumenta o intervalo
//   }

//   timerId = setTimeout(request, atraso);
// }, atraso);
// ```

// Se as funções agendadas forem muito pesadas para o processador, podemos medir o tempo de execução e ajustar o próximo agendamento conforme necessário.

// **Diferença de precisão:**

// Exemplo com `setInterval`:

// ```javascript
// let i = 1;
// setInterval(function() {
//   func(i++);
// }, 100);
// ```

// Exemplo com `setTimeout` aninhado:

// ```javascript
// let i = 1;
// setTimeout(function run() {
//   func(i++);
//   setTimeout(run, 100);
// }, 100);
// ```

// O problema com o `setInterval` é que o tempo de execução da função `func` consome parte do intervalo. Se a função demorar mais do que o intervalo, as chamadas podem acabar se sobrepondo ou sendo executadas sem pausa.

// Com o `setTimeout` aninhado, o próximo agendamento só acontece após o término da execução anterior, garantindo um intervalo real entre as execuções.

// ### Coleta de lixo e callbacks de setTimeout/setInterval

// Quando passamos uma função para o `setTimeout` ou `setInterval`, o agendador interno mantém uma referência a essa função. Isso impede que ela seja coletada pelo garbage collector, mesmo que nenhuma outra parte do código a referencie.

// Por isso, sempre que não precisarmos mais de um timer, é importante cancelá-lo com `clearTimeout` ou `clearInterval`, principalmente se a função fizer referência a variáveis externas que consomem memória.

// ### setTimeout com atraso zero

// Uma utilização especial é o `setTimeout(func, 0)` ou simplesmente `setTimeout(func)`.

// Isso agenda a execução da função o mais rápido possível, mas **somente após a conclusão do script atual**.

// Exemplo:

// ```javascript
// setTimeout(() => alert("Mundo"));

// alert("Olá");
// ```

// A saída será:

// ```
// Olá
// Mundo
// ```

// Mesmo sendo “zero delay”, o JavaScript só executa a função depois que o script atual terminar.

// Isso é muito usado para dividir a execução de tarefas pesadas ou adiar algo até que a pilha de execução fique livre.

// ### Limite de atraso mínimo no navegador

// Nos navegadores, existe uma limitação: após cinco timers aninhados com `setTimeout`, o intervalo mínimo passa a ser 4 milissegundos.

// Exemplo:

// ```javascript
// let start = Date.now();
// let times = [];

// setTimeout(function run() {
//   times.push(Date.now() - start);

//   if (Date.now() - start > 100) alert(times);
//   else setTimeout(run);
// });
// ```

// Nos primeiros ciclos, o intervalo pode ser quase zero, mas depois a obrigatoriedade de pelo menos 4 ms entre execuções passa a valer.

// Essa limitação é histórica, existe por compatibilidade com scripts antigos.

// No Node.js (lado servidor), essa limitação não existe. Lá, temos até funções como `setImmediate` para tarefas assíncronas imediatas.

// ### Resumo

// * Métodos `setTimeout(func, atraso, ...args)` e `setInterval(func, atraso, ...args)` permitem executar uma função uma vez ou repetidamente após o atraso em milissegundos.
// * Para cancelar, usamos `clearTimeout` ou `clearInterval`.
// * Usar `setTimeout` aninhado oferece mais controle sobre o tempo entre execuções.
// * O `setTimeout(func, 0)` serve para agendar a função “assim que possível, mas depois do script atual”.
// * Navegadores impõem um atraso mínimo de 4 ms após 5 timers aninhados ou execuções com `setInterval`.
// * O tempo de execução real pode variar por causa de carga da CPU, aba em segundo plano, modo economia de energia, entre outros fatores.

// **Observação importante:** Nenhuma dessas funções garante um atraso exato. Timers podem sofrer atrasos dependendo do ambiente e das condições do sistema.
