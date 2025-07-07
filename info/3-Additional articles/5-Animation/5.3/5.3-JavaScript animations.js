// **Animações em JavaScript (Adaptado para o Português)**

// As animações em JavaScript permitem realizar coisas que o CSS não consegue.

// Por exemplo: movimentar elementos por um caminho complexo, com uma função de tempo diferente das curvas de Bézier, ou animações em um canvas.

// ---

// **Usando setInterval**

// Uma animação pode ser implementada como uma sequência de quadros – geralmente mudanças pequenas em propriedades CSS.

// Por exemplo, mudar `style.left` de 0px para 100px move o elemento. Se aumentarmos esse valor com `setInterval`, mudando 2px a cada 20ms (50 vezes por segundo), parecerá suave. Assim como no cinema: 24 quadros por segundo são suficientes para suavidade.

// Exemplo:

// ```js
// let start = Date.now(); // guarda o tempo inicial

// let timer = setInterval(function() {
//   let timePassed = Date.now() - start;

//   if (timePassed >= 2000) {
//     clearInterval(timer);
//     return;
//   }

//   draw(timePassed);

// }, 20);

// function draw(timePassed) {
//   train.style.left = timePassed / 5 + 'px';
// }
// ```

// ---

// **Usando requestAnimationFrame**

// Imagine várias animações rodando ao mesmo tempo. Se usarmos `setInterval` separadamente, mesmo com 20ms, elas não estariam sincronizadas, gerando mais repaints que o necessário.

// A solução é `requestAnimationFrame`, que agrupa todas as atualizações em um repaint coordenado pelo navegador.

// ```js
// let requestId = requestAnimationFrame(callback);
// cancelAnimationFrame(requestId); // cancela
// ```

// A função `callback` recebe como argumento o tempo desde o carregamento da página.

// Exemplo de medição de tempo entre frames:

// ```js
// let prev = performance.now();
// let times = 0;

// requestAnimationFrame(function measure(time) {
//   console.log(Math.floor(time - prev));
//   prev = time;

//   if (times++ < 10) requestAnimationFrame(measure);
// })
// ```

// ---

// **Função de Animação Estruturada**

// ```js
// function animate({timing, draw, duration}) {
//   let start = performance.now();

//   requestAnimationFrame(function animate(time) {
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;

//     let progress = timing(timeFraction);

//     draw(progress);

//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }
//   });
// }
// ```

// **Parâmetros:**

// * `duration`: tempo total da animação (ms)
// * `timing`: função que retorna o progresso (0 a 1)
// * `draw`: função que desenha a animação com base no progresso

// Exemplo:

// ```js
// animate({
//   duration: 1000,
//   timing(timeFraction) {
//     return timeFraction;
//   },
//   draw(progress) {
//     elem.style.width = progress * 100 + '%';
//   }
// });
// ```

// ---

// **Funções de Tempo (timing)**

// * Linear:

// ```js
// function linear(t) { return t; }
// ```

// * Parabólica:

// ```js
// function quad(t) { return Math.pow(t, 2); }
// ```

// * Cúbica:

// ```js
// function cubic(t) { return Math.pow(t, 3); }
// ```

// * Circular:

// ```js
// function circ(t) { return 1 - Math.sin(Math.acos(t)); }
// ```

// * Elástica:

// ```js
// function elastic(x, t) {
//   return Math.pow(2, 10 * (t - 1)) * Math.cos(20 * Math.PI * x / 3 * t);
// }
// ```

// * Quicar (bounce):

// ```js
// function bounce(t) {
//   for (let a = 0, b = 1; 1; a += b, b /= 2) {
//     if (t >= (7 - 4 * a) / 11) {
//       return -Math.pow((11 - 6 * a - 11 * t) / 4, 2) + Math.pow(b, 2);
//     }
//   }
// }
// ```

// * Retorno (back):

// ```js
// function back(x, t) {
//   return Math.pow(t, 2) * ((x + 1) * t - x);
// }
// ```

// ---

// **Transformações:**

// * `easeOut`:

// ```js
// function makeEaseOut(timing) {
//   return t => 1 - timing(1 - t);
// }
// ```

// * `easeInOut`:

// ```js
// function makeEaseInOut(timing) {
//   return t => t < 0.5
//     ? timing(2 * t) / 2
//     : (2 - timing(2 * (1 - t))) / 2;
// }
// ```

// Exemplo com `bounce`:

// ```js
// let bounceEaseOut = makeEaseOut(bounce);
// let bounceEaseInOut = makeEaseInOut(bounce);
// ```

// ---

// **Outros Exemplos de draw**

// Exemplo: digitação com "quicar":

// ```js
// function draw(progress) {
//   element.innerText = text.slice(0, Math.ceil(progress * text.length));
// }
// ```

// ---

// **Resumo**

// As animações em JavaScript são úteis quando CSS não dá conta. Devem ser feitas com `requestAnimationFrame` para melhor desempenho.

// CSS funciona bem para casos simples. Mas, para animações com lógica complexa, controle fino, efeitos como explosões, criação de elementos, ou trajetórias irregulares, o JavaScript é essencial.

// Você pode combinar `timing` e `draw` para obter qualquer comportamento, indo muito além do que CSS permite.
