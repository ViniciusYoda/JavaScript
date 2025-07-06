// Claro! Aqui está **toda a explicação sobre "Disparar eventos personalizados" (Dispatching custom events)** traduzida e adaptada cuidadosamente para o **português**, mantendo a estrutura, clareza e fluidez:

// ---

// ## 📢 Disparando eventos personalizados

// Em JavaScript, além de reagir a eventos, também podemos **criar e disparar nossos próprios eventos**.

// Eventos personalizados são úteis para criar **componentes interativos**, como menus, sliders, abas etc. Por exemplo, um componente de menu pode emitir eventos como `"abrir"` ou `"selecionar"` para avisar o sistema que algo aconteceu. Outros scripts podem escutar esses eventos e reagir de acordo.

// Também é possível disparar eventos do navegador como `"click"`, `"mousedown"` etc., o que pode ser útil, por exemplo, em **testes automatizados**.

// ---

// ## 🧱 Construtor de eventos

// Os eventos são objetos criados com `new Event(tipo, opções)`:

// ```javascript
// let evento = new Event(tipo[, opções]);
// ```

// ### Parâmetros:

// * `tipo` – o nome do evento, como `"click"` ou `"meu-evento"`.
// * `opções` – objeto opcional com:

//   * `bubbles: true/false` – define se o evento deve borbulhar (subir na hierarquia).
//   * `cancelable: true/false` – define se o `preventDefault()` pode ser usado.

// Por padrão, ambos são `false`.

// ---

// ## 🚀 Disparando um evento com `dispatchEvent`

// Depois de criado, um evento deve ser **disparado** com `elemento.dispatchEvent(evento)`:

// ```html
// <button id="botao" onclick="alert('Clique!')">Clique automático</button>

// <script>
//   let evento = new Event("click");
//   botao.dispatchEvent(evento);
// </script>
// ```

// ### 🔍 `event.isTrusted`

// Essa propriedade permite saber se o evento foi acionado por um **usuário real** ou por **script**:

// * `true` → veio de uma ação real.
// * `false` → foi disparado via script.

// ---

// ## 🌊 Exemplo de evento com propagação (bubbling)

// ```html
// <h1 id="titulo">Olá do script!</h1>

// <script>
//   document.addEventListener("ola", function(evento) {
//     alert("Recebido de: " + evento.target.tagName); // Recebido de: H1
//   });

//   let evento = new Event("ola", { bubbles: true });
//   titulo.dispatchEvent(evento);
// </script>
// ```

// ### Notas:

// * Use `addEventListener` para eventos personalizados. Propriedades como `onola` não funcionam.
// * Para que o evento borbulhe, use `{ bubbles: true }`.

// ---

// ## 🖱 Eventos específicos: Mouse, Teclado e outros

// A especificação define construtores específicos:

// * `UIEvent`
// * `MouseEvent`
// * `KeyboardEvent`
// * `FocusEvent`
// * ...

// Esses construtores permitem definir propriedades específicas, como:

// ```javascript
// let evento = new MouseEvent("click", {
//   bubbles: true,
//   cancelable: true,
//   clientX: 100,
//   clientY: 100
// });

// alert(evento.clientX); // 100
// ```

// Se usarmos `new Event("click")`, propriedades como `clientX` são ignoradas.

// ---

// ## 🛠 Criando eventos personalizados com `CustomEvent`

// Para eventos próprios (ex: `"ola"`, `"usuario-logado"`), use `CustomEvent`. Ele permite adicionar um campo extra `detail` com dados personalizados:

// ```html
// <h1 id="titulo">Olá para João!</h1>

// <script>
//   titulo.addEventListener("ola", function(evento) {
//     alert(evento.detail.nome); // João
//   });

//   titulo.dispatchEvent(new CustomEvent("ola", {
//     detail: { nome: "João" }
//   }));
// </script>
// ```

// O `detail` pode conter qualquer informação relevante para o contexto do evento.

// ---

// ## ⛔️ event.preventDefault() em eventos personalizados

// Eventos personalizados não têm ações nativas do navegador, mas o código que dispara o evento pode ter **comportamentos a seguir**, caso o evento **não seja cancelado**.

// Você pode permitir que os ouvintes **cancelem a ação**, assim:

// ```html
// <pre id="coelho">
//   |\   /|
//    \|_|/
//    /. .\
//   =\_Y_/=
//    {>o<}
// </pre>
// <button onclick="esconder()">Esconder()</button>

// <script>
//   function esconder() {
//     let evento = new CustomEvent("esconder", {
//       cancelable: true
//     });

//     if (!coelho.dispatchEvent(evento)) {
//       alert("A ação foi impedida por um manipulador.");
//     } else {
//       coelho.hidden = true;
//     }
//   }

//   coelho.addEventListener("esconder", function(evento) {
//     if (confirm("Deseja cancelar a ação?")) {
//       evento.preventDefault();
//     }
//   });
// </script>
// ```

// > ⚠️ Importante: o evento deve ter `cancelable: true`, senão o `preventDefault()` **não funciona**.

// ---

// ## 🔁 Eventos dentro de outros eventos são **síncronos**

// Normalmente os eventos são enfileirados e processados um após o outro. Mas se você **disparar um evento dentro de outro**, ele é tratado **imediatamente**, de forma **síncrona**.

// ### Exemplo:

// ```html
// <button id="menu">Menu (clique)</button>

// <script>
//   menu.onclick = function() {
//     alert(1);

//     menu.dispatchEvent(new CustomEvent("abrir-menu", { bubbles: true }));

//     alert(2);
//   };

//   document.addEventListener("abrir-menu", () => alert("Evento aninhado"));
// </script>
// ```

// ### Saída:

// ```
// 1
// Evento aninhado
// 2
// ```

// Se quiser que o evento personalizado ocorra **depois**, use `setTimeout` com `0ms`:

// ```javascript
// menu.onclick = function() {
//   alert(1);

//   setTimeout(() => {
//     menu.dispatchEvent(new CustomEvent("abrir-menu", { bubbles: true }));
//   });

//   alert(2);
// };
// ```

// ### Saída agora:

// ```
// 1
// 2
// Evento aninhado
// ```

// ---

// ## 🧾 Resumo

// * Você pode criar eventos com `new Event(tipo, opções)` ou `new CustomEvent(tipo, opções)`.
// * Use `CustomEvent` para passar dados com `detail`.
// * Use `dispatchEvent` para disparar o evento.
// * Use `bubbles: true` se quiser que o evento suba na árvore DOM.
// * Use `cancelable: true` se quiser permitir que handlers o cancelem com `preventDefault()`.
// * Eventos personalizados são úteis para **comunicação entre componentes** (ex: menu, slider, carrossel).
// * Evite abusar da geração de eventos nativos como `"click"` artificialmente — prefira lógica mais clara, exceto em testes automatizados.

// ---

// Se quiser, posso criar um exemplo completo com todos esses conceitos funcionando juntos! Deseja isso?
