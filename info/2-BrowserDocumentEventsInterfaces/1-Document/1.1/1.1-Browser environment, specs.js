// Quando se fala em JavaScript, é importante entender que a linguagem em si é apenas o "core". Para que o JavaScript seja realmente útil, ele precisa de um **ambiente *host*** que forneça objetos e funcionalidades adicionais. No contexto de navegadores web, esse ambiente é bastante rico e é o que permite que o JavaScript interaja com as páginas e o próprio navegador.

// Aqui está uma visão geral do que temos quando o JavaScript é executado em um navegador web:

// -----

// ## O Objeto `window`

// Existe um objeto "raiz" chamado **`window`**. Ele tem dois papéis principais:

// 1.  **Objeto global para o código JavaScript**: Todas as variáveis e funções globais que você define no JavaScript se tornam propriedades do objeto `window`. Por exemplo:

//     ```javascript
//     function sayHi() {
//       alert("Olá");
//     }

//     // funções globais são métodos do objeto global:
//     window.sayHi();
//     ```

// 2.  **Representa a "janela do navegador"**: Ele fornece métodos e propriedades para controlar a janela do navegador. Por exemplo, você pode usá-lo para obter a altura interna da janela:

//     ```javascript
//     alert(window.innerHeight); // altura interna da janela
//     ```

// Existem muitos outros métodos e propriedades específicos do `window` que serão abordados posteriormente.

// -----

// ## DOM (Document Object Model)

// O **Document Object Model**, ou **DOM** para abreviar, representa todo o conteúdo de uma página como **objetos que podem ser modificados**.

// O objeto **`document`** é o principal "ponto de entrada" para a página. Podemos mudar ou criar qualquer coisa na página usando-o. Por exemplo:

// ```javascript
// // muda a cor de fundo para vermelho
// document.body.style.background = "red";

// // muda de volta após 1 segundo
// setTimeout(() => document.body.style.background = "", 1000);
// ```

// Aqui, usamos `document.body.style`, mas há muito, muito mais. Propriedades e métodos são descritos na especificação: [DOM Living Standard](https://dom.spec.whatwg.org/).

// -----

// ### DOM não é apenas para navegadores

// A especificação DOM explica a estrutura de um documento e fornece objetos para manipulá-lo. Existem instrumentos não-navegadores que também usam o DOM. Por exemplo, *scripts* do lado do servidor que baixam páginas HTML e as processam também podem usar o DOM. Eles podem suportar apenas uma parte da especificação, no entanto.

// -----

// ### CSSOM para estilização

// Existe também uma especificação separada, o **CSS Object Model (CSSOM)**, para regras CSS e folhas de estilo, que explica como elas são representadas como objetos e como lê-las e escrevê-las.
// O CSSOM é usado junto com o DOM quando modificamos regras de estilo para o documento. Na prática, no entanto, o CSSOM raramente é necessário, porque raramente precisamos modificar regras CSS do JavaScript (geralmente apenas adicionamos/removemos classes CSS, não modificamos suas regras CSS), mas isso também é possível.

// -----

// ## BOM (Browser Object Model)

// O **Browser Object Model (BOM)** representa objetos adicionais fornecidos pelo navegador (*host environment*) para trabalhar com tudo, exceto o documento.

// Por exemplo:

//   * O objeto **`navigator`** fornece informações de *background* sobre o navegador e o sistema operacional. Existem muitas propriedades, mas as duas mais amplamente conhecidas são: `navigator.userAgent` – sobre o navegador atual, e `navigator.platform` – sobre a plataforma (pode ajudar a diferenciar entre Windows/Linux/Mac etc.).

//   * O objeto **`location`** nos permite ler a URL atual e pode redirecionar o navegador para uma nova. Veja como podemos usar o objeto `location`:

//     ```javascript
//     alert(location.href); // mostra a URL atual
//     if (confirm("Ir para a Wikipédia?")) {
//       location.href = "https://wikipedia.org"; // redireciona o navegador para outra URL
//     }
//     ```

// As funções `alert`/`confirm`/`prompt` também fazem parte do BOM: elas não estão diretamente relacionadas ao documento, mas representam métodos puros do navegador para se comunicar com o usuário.

// -----

// ### Especificações

// O BOM faz parte da especificação HTML geral.
// Sim, você ouviu direito. A especificação HTML em [https://html.spec.whatwg.org](https://html.spec.whatwg.org/) não trata apenas da "linguagem HTML" (*tags*, atributos), mas também abrange um monte de objetos, métodos e extensões DOM específicas do navegador. Isso é "HTML em termos amplos". Além disso, algumas partes têm especificações adicionais listadas em [https://spec.whatwg.org](https://spec.whatwg.org/).

// -----

// ## Resumo

// Falando sobre padrões, temos:

//   * **Especificação DOM**: Descreve a estrutura do documento, manipulações e eventos, veja [https://dom.spec.whatwg.org](https://dom.spec.whatwg.org/).
//   * **Especificação CSSOM**: Descreve folhas de estilo e regras de estilo, manipulações com elas e sua ligação a documentos, veja [https://www.w3.org/TR/cssom-1/](https://www.w3.org/TR/cssom-1/).
//   * **Especificação HTML**: Descreve a linguagem HTML (por exemplo, *tags*) e também o BOM (Browser Object Model) – várias funções do navegador: `setTimeout`, `alert`, `location` e assim por diante, veja [https://html.spec.whatwg.org](https://html.spec.whatwg.org/). Ela pega a especificação DOM e a estende com muitas propriedades e métodos adicionais.
//   * Além disso, algumas classes são descritas separadamente em [https://spec.whatwg.org/](https://spec.whatwg.org/).

// Por favor, anote esses links, pois há tanto para aprender que é impossível cobrir e lembrar tudo.
// Quando você quiser ler sobre uma propriedade ou um método, o manual da Mozilla em [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/) também é um bom recurso, mas a especificação correspondente pode ser melhor: é mais complexa e longa de ler, mas tornará seu conhecimento fundamental sólido e completo.
// Para encontrar algo, muitas vezes é conveniente usar uma pesquisa na internet "WHATWG [termo]" ou "MDN [termo]", por exemplo, `https://google.com?q=whatwg+localstorage`, `https://google.com?q=mdn+localstorage`.

// Agora, vamos começar a aprender o DOM, porque o `document` desempenha o papel central na UI.

// -----

// Dado que o front-end exibe os dados de abastecimento utilizando React Query e um componente de tabela genérico (`MainTable.Main`), como você vê a interação entre o JavaScript "core", o DOM e o BOM nesse contexto?