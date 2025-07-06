// Claro! Abaixo está **uma versão adaptada e didática de todo o conteúdo sobre *Event Delegation*** em **português**, com exemplos comentados, focando na clareza e aplicação prática.

// ---

// # 📌 Event Delegation (Delegação de Eventos) – Guia Completo em Português

// ## 💡 O que é "delegação de eventos"?

// É um padrão onde **usamos apenas um único manipulador de eventos (event listener) em um elemento pai**, em vez de adicionar um em cada filho.
// Esse manipulador "escuta" eventos dos filhos por meio do **bubbling** (propagação dos eventos de dentro para fora).

// ---

// ## ✅ Vantagens da delegação

// * **Menos código e melhor desempenho**
// * Funciona com elementos adicionados **dinamicamente**
// * Mais **fácil de manter**
// * Reduz consumo de memória

// ---

// ## 🧪 Exemplo 1 – Destacar `<td>` clicado em uma tabela

// ### HTML:

// ```html
// <table id="tabela">
//   <tr>
//     <td>Celula 1</td>
//     <td>Celula 2</td>
//     <td>Celula 3</td>
//   </tr>
// </table>
// ```

// ### CSS (opcional):

// ```css
// .destacado {
//   background-color: yellow;
// }
// ```

// ### JavaScript:

// ```js
// let celulaSelecionada;

// tabela.onclick = function(event) {
//   const td = event.target.closest('td');
//   if (!td || !tabela.contains(td)) return;

//   if (celulaSelecionada) {
//     celulaSelecionada.classList.remove('destacado');
//   }

//   celulaSelecionada = td;
//   td.classList.add('destacado');
// };
// ```

// ### 🧠 Explicações:

// * `event.target.closest('td')`: sobe na árvore até achar um `<td>`
// * Verifica se o `<td>` pertence à tabela
// * Remove destaque anterior e adiciona ao novo

// ---

// ## 🧪 Exemplo 2 – Menu com botões e `data-action`

// ### HTML:

// ```html
// <div id="menu">
//   <button data-action="salvar">Salvar</button>
//   <button data-action="carregar">Carregar</button>
//   <button data-action="buscar">Buscar</button>
// </div>
// ```

// ### JavaScript:

// ```js
// class Menu {
//   constructor(elemento) {
//     this._elemento = elemento;
//     elemento.onclick = this.aoClicar.bind(this);
//   }

//   salvar() { alert('Salvando...'); }
//   carregar() { alert('Carregando...'); }
//   buscar() { alert('Buscando...'); }

//   aoClicar(event) {
//     const acao = event.target.dataset.action;
//     if (acao && this[acao]) {
//       this[acao]();
//     }
//   }
// }

// new Menu(document.getElementById('menu'));
// ```

// ### 🧠 Destaques:

// * Usa `data-action` para determinar a ação.
// * Flexível: podemos adicionar/remover botões sem mudar o JS.
// * `this.aoClicar.bind(this)` garante que o `this` dentro da função seja a instância da classe.

// ---

// ## 🧪 Exemplo 3 – Comportamento: contador com `data-counter`

// ### HTML:

// ```html
// <input type="button" value="1" data-counter>
// <input type="button" value="2" data-counter>
// ```

// ### JavaScript:

// ```js
// document.addEventListener('click', function(event) {
//   if (event.target.dataset.counter !== undefined) {
//     event.target.value++;
//   }
// });
// ```

// ---

// ## 🧪 Exemplo 4 – Mostrar/ocultar conteúdo com `data-toggle-id`

// ### HTML:

// ```html
// <button data-toggle-id="formulario">Mostrar/Esconder Formulário</button>

// <form id="formulario" hidden>
//   <input type="email" placeholder="Digite seu e-mail">
// </form>
// ```

// ### JavaScript:

// ```js
// document.addEventListener('click', function(event) {
//   const id = event.target.dataset.toggleId;
//   if (!id) return;

//   const elemento = document.getElementById(id);
//   if (elemento) {
//     elemento.hidden = !elemento.hidden;
//   }
// });
// ```

// ---

// ## 📚 Padrão de comportamento (behavior pattern)

// * Usa atributos como `data-*` para **declarar comportamentos diretamente no HTML**
// * Um único listener no `document` trata todos os elementos com esses comportamentos

// ### Vantagens:

// * HTML semântico e extensível
// * JS genérico e reutilizável
// * Perfeito para interfaces ricas sem complicação

// ---

// ## ⚠️ Limitações da delegação

// * O evento precisa ser **bubbling** (como `click`, `submit`, etc.)
// * Eventos como `blur`, `focus` e `mouseenter` **não funcionam com delegação**
// * Evite usar `event.stopPropagation()` internamente — pode quebrar a delegação
// * Pode ter leve sobrecarga se muitos eventos forem tratados sem necessidade

// ---

// ## ✅ Resumo Final

// | Conceito                       | Explicação                            |
// | ------------------------------ | ------------------------------------- |
// | **Delegação de eventos**       | Escutar eventos em um pai comum       |
// | **event.target**               | Elemento que disparou o evento        |
// | **event.currentTarget (this)** | Elemento que tem o handler            |
// | **event.stopPropagation()**    | Interrompe a bolha do evento          |
// | **data-* attributes*\*         | Permite declarar ações direto no HTML |

// ---

// Se quiser, posso gerar um **modelo HTML completo com CSS e JS já embutido para testar na sua máquina**. Deseja isso?
