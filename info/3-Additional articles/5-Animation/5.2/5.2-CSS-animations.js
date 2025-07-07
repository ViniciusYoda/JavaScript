// Claro! Abaixo está a **versão em português** completamente adaptada e explicada do conteúdo sobre **animações CSS**:

// ---

// # Animações com CSS

// As **animações CSS** permitem criar animações simples **sem usar JavaScript**.

// No entanto, o **JavaScript pode ser usado para controlar e aprimorar as animações CSS**, com pouquíssimo código.

// ---

// ## Transições CSS

// A ideia das transições CSS é simples: descrevemos **quais propriedades** devem ser animadas e **como** essas mudanças devem ocorrer.

// Assim, **basta alterar uma propriedade**, e o navegador se encarrega de fazer a transição suave.

// ### Exemplo: animar a cor de fundo em 3 segundos

// ```css
// .animated {
//   transition-property: background-color;
//   transition-duration: 3s;
// }
// ```

// Se um elemento tiver a classe `.animated`, qualquer mudança em `background-color` será **animada por 3 segundos**.

// ```html
// <button id="color">Clique em mim</button>

// <style>
//   #color {
//     transition-property: background-color;
//     transition-duration: 3s;
//   }
// </style>

// <script>
//   color.onclick = function() {
//     this.style.backgroundColor = 'red';
//   };
// </script>
// ```

// ---

// ## As 4 propriedades principais de transição:

// 1. `transition-property`: qual(is) propriedade(s) será(ão) animadas
// 2. `transition-duration`: duração da animação
// 3. `transition-timing-function`: ritmo da animação
// 4. `transition-delay`: atraso antes de iniciar

// Você pode combiná-las assim:

// ```css
// transition: propriedade duração função-de-tempo atraso;
// ```

// ### Exemplo: animar `font-size` e `color` juntos

// ```html
// <button id="growing">Clique em mim</button>

// <style>
//   #growing {
//     transition: font-size 3s, color 2s;
//   }
// </style>

// <script>
//   growing.onclick = function() {
//     this.style.fontSize = '36px';
//     this.style.color = 'red';
//   };
// </script>
// ```

// ---

// ## Detalhando as propriedades:

// ### `transition-property`

// Define quais propriedades CSS serão animadas, como `left`, `color`, `margin`, `height` etc.
// Também é possível usar `all` para animar todas as propriedades possíveis.

// Nem todas as propriedades são animáveis, mas a maioria das mais utilizadas é.

// ---

// ### `transition-duration`

// Define **quanto tempo** a animação vai durar (em `s` ou `ms`):

// ```css
// transition-duration: 2s; /* ou 500ms */
// ```

// ---

// ### `transition-delay`

// Define o **atraso antes do início da animação**:

// ```css
// transition-delay: 1s;
// ```

// Pode ser **negativo**!
// Exemplo: `transition-delay: -1s` faz a animação começar do ponto intermediário.

// ---

// ### Exemplo com `translate`:

// ```css
// #stripe.animate {
//   transform: translate(-90%);
//   transition-property: transform;
//   transition-duration: 9s;
// }
// ```

// ```js
// stripe.classList.add('animate');
// ```

// ### Começando no segundo atual (com delay negativo):

// ```js
// stripe.onclick = function() {
//   let seg = new Date().getSeconds() % 10;
//   stripe.style.transitionDelay = '-' + seg + 's';
//   stripe.classList.add('animate');
// };
// ```

// ---

// ## `transition-timing-function`

// Controla o **ritmo da animação no tempo**. Pode ser:

// * Começa devagar e acelera
// * Começa rápido e desacelera
// * Ritmo constante (linear)
// * Em etapas

// ### Usando curva de Bézier

// A função de tempo pode ser definida por uma **curva de Bézier**:

// ```css
// transition-timing-function: cubic-bezier(x2, y2, x3, y3);
// ```

// Os pontos (0,0) e (1,1) são fixos. Você define os intermediários.

// #### Exemplo: velocidade constante

// ```css
// transition: left 5s cubic-bezier(0, 0, 1, 1);
// ```

// #### Exemplo: começa rápido e desacelera

// ```css
// transition: left 5s cubic-bezier(0, .5, .5, 1);
// ```

// ---

// ### Valores pré-definidos:

// | Nome        | Equivalente Bézier                   |
// | ----------- | ------------------------------------ |
// | linear      | `cubic-bezier(0, 0, 1, 1)`           |
// | ease        | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` |
// | ease-in     | `cubic-bezier(0.42, 0, 1.0, 1.0)`    |
// | ease-out    | `cubic-bezier(0, 0, 0.58, 1.0)`      |
// | ease-in-out | `cubic-bezier(0.42, 0, 0.58, 1.0)`   |

// ---

// ### Curvas fora do padrão

// É possível ultrapassar os limites `0..1`:

// ```css
// transition: left 5s cubic-bezier(.5, -1, .5, 2);
// ```

// Nesse caso, a animação pode:

// * **Recuar** antes de avançar
// * **Ir além** do ponto final
// * Voltar ao ponto final

// Você pode criar suas curvas personalizadas com [https://cubic-bezier.com](https://cubic-bezier.com)

// ---

// ## `steps()`: animações por etapas

// Permite dividir a animação em etapas discretas:

// ```css
// transition: transform 9s steps(9, start);
// ```

// * `steps(9, start)`: 9 etapas, começando imediatamente
// * `steps(9, end)`: 9 etapas, começando **após 1s**

// Valores especiais:

// * `step-start`: mesmo que `steps(1, start)`
// * `step-end`: mesmo que `steps(1, end)`

// ---

// ## Evento `transitionend`

// O evento `transitionend` é disparado quando a animação termina.

// ```js
// element.addEventListener('transitionend', () => {
//   console.log("Animação terminou!");
// });
// ```

// Pode ser usado para:

// * Executar ações após a animação
// * Encadear outras animações

// ---

// ### Exemplo com barco indo e voltando:

// ```js
// let vezes = 1;

// function ir() {
//   if (vezes % 2) {
//     barco.classList.remove('volta');
//     barco.style.marginLeft = 100 * vezes + 200 + 'px';
//   } else {
//     barco.classList.add('volta');
//     barco.style.marginLeft = 100 * vezes - 200 + 'px';
//   }
// }

// barco.onclick = function() {
//   ir();
//   barco.addEventListener('transitionend', () => {
//     vezes++;
//     ir();
//   });
// };
// ```

// ---

// ## Animações com `@keyframes`

// Você pode criar animações complexas com a regra `@keyframes`.

// ```html
// <div class="progresso"></div>

// <style>
// @keyframes vai-volta {
//   from { left: 0px; }
//   to { left: calc(100% - 50px); }
// }

// .progresso {
//   position: relative;
//   width: 50px;
//   height: 20px;
//   background: lime;
//   border: 2px solid green;
//   animation: vai-volta 3s infinite alternate;
// }
// </style>
// ```

// ---

// ## Performance

// ### Como o navegador anima?

// 1. **Layout**: calcula posição e tamanho
// 2. **Paint**: desenha cores, bordas etc.
// 3. **Composite**: aplica `transform`, `opacity` e renderiza

// ---

// ### Otimize com `transform` e `opacity`:

// Essas propriedades **não acionam Layout nem Paint**. São rápidas e eficientes, e usam aceleração gráfica.

// **Use:**

// * `transform: translateX()`, `rotate()`, `scale()`
// * `opacity` para efeitos de fade-in/fade-out

// **Evite:**

// * `left`, `top`, `margin`, `width`, `height`

// ---

// ### Exemplo:

// ```html
// <img id="barco" src="boat.png">

// <style>
// #barco {
//   cursor: pointer;
//   transition: transform 2s ease-in-out, opacity 2s ease-in-out;
// }

// .mover {
//   transform: translateX(300px);
//   opacity: 0;
// }
// </style>

// <script>
//   barco.onclick = () => barco.classList.add('mover');
// </script>
// ```

// ---

// ### Exemplo com `@keyframes`:

// ```html
// <h2 onclick="this.classList.toggle('animado')">clique para iniciar/parar</h2>

// <style>
// .animated {
//   animation: ola-tchau 1.8s infinite;
//   width: fit-content;
// }

// @keyframes ola-tchau {
//   0% {
//     transform: translateY(-60px) rotateX(0.7turn);
//     opacity: 0;
//   }
//   50% {
//     transform: none;
//     opacity: 1;
//   }
//   100% {
//     transform: translateX(230px) rotateZ(90deg) scale(0.5);
//     opacity: 0;
//   }
// }
// </style>
// ```

// ---

// ## Resumo

// As **animações CSS** permitem alterar propriedades com fluidez ou em etapas.

// **Vantagens:**

// * Fáceis de usar
// * Leves e rápidas
// * Integram bem com JavaScript (via `transitionend`)

// **Desvantagens:**

// * Não permitem lógicas complexas (como explosões, física, colisões)
// * Não podem criar ou remover elementos dinamicamente

// **Melhores práticas:**

// * Use `transform` e `opacity` sempre que possível
// * Evite `left`, `width`, `margin`, etc. em animações

// ---

// Se quiser, posso criar uma **coleção interativa com exemplos práticos de cada tipo de animação**. Deseja isso?
