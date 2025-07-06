// Aqui está a adaptação completa para o **português** do conteúdo sobre os atributos `async` e `defer` em scripts HTML:

// ---

// ## 📜 Scripts: `async` e `defer`

// Nos sites modernos, os **scripts JavaScript costumam ser mais "pesados"** que o HTML: demoram mais para baixar e para serem processados.

// Quando o navegador está carregando o HTML e encontra uma tag `<script>`, ele **pausa a construção do DOM** para executar esse script.

// Isso vale tanto para scripts internos:

// ```html
// <script>/* código */</script>
// ```

// Quanto para scripts externos:

// ```html
// <script src="arquivo.js"></script>
// ```

// Esse comportamento gera dois problemas:

// 1. O script **não consegue acessar elementos HTML abaixo dele**, pois o DOM ainda não foi construído.
// 2. Se o script for muito grande e estiver no início da página, ele **bloqueia o carregamento da página**, impedindo o usuário de ver o conteúdo até que seja totalmente executado.

// ### Exemplo:

// ```html
// <p>...conteúdo antes do script...</p>

// <script src="script-pesado.js"></script>

// <!-- Isso não será exibido até o script carregar -->
// <p>...conteúdo depois do script...</p>
// ```

// ---

// ### 🛠 Solução comum (não ideal)

// Colocar o `<script>` no **final da página**:

// ```html
// <body>
//   ...todo o conteúdo da página...

//   <script src="script.js"></script>
// </body>
// ```

// Assim, o script consegue acessar os elementos acima e **não bloqueia** o conteúdo.
// Porém, o navegador só começa a baixar o script **depois de carregar todo o HTML**, o que causa atrasos — principalmente em conexões lentas.

// ---

// ## ✅ As soluções modernas: `defer` e `async`

// ### 🔁 Atributo `defer`

// O `defer` diz ao navegador:

// > "Pode continuar carregando a página. Baixe este script em segundo plano e só o execute **depois que o DOM estiver pronto**."

// **Exemplo:**

// ```html
// <p>...conteúdo antes do script...</p>

// <script defer src="script.js"></script>

// <p>...conteúdo depois do script...</p>
// ```

// #### Comportamento:

// * O conteúdo da página aparece **imediatamente**.
// * O script é executado **somente depois** que o DOM estiver carregado.
// * **Scripts com `defer` mantêm a ordem** em que aparecem no HTML.

// #### Exemplo com dois scripts:

// ```html
// <script defer src="biblioteca.js"></script>
// <script defer src="meu-script.js"></script>
// ```

// Mesmo que `meu-script.js` carregue primeiro, ele só será executado **depois** da `biblioteca.js`, respeitando a ordem no HTML.

// > 💡 `defer` só funciona com **scripts externos** (`<script src="...">`). Se usar com script interno, será ignorado.

// ---

// ### ⚡ Atributo `async`

// O `async` também torna o script **não bloqueante**, mas funciona de forma diferente.

// Scripts com `async` são **totalmente independentes**:

// * Não bloqueiam o HTML.
// * **Não respeitam a ordem** com outros scripts.
// * São executados assim que terminam de carregar — **sem esperar o DOM** ou outros scripts.

// **Exemplo:**

// ```html
// <p>...conteúdo antes dos scripts...</p>

// <script async src="grande.js"></script>
// <script async src="pequeno.js"></script>

// <p>...conteúdo depois dos scripts...</p>
// ```

// Neste caso:

// * A página **aparece imediatamente**.
// * O script que carregar primeiro será executado primeiro (ex: `pequeno.js`).
// * O evento `DOMContentLoaded` **pode acontecer antes ou depois** do script, sem garantia de ordem.

// > 💡 Use `async` para scripts **independentes**, como anúncios, rastreadores ou Google Analytics:

// ```html
// <script async src="https://google-analytics.com/analytics.js"></script>
// ```

// ---

// ## 🧱 Scripts dinâmicos

// Também é possível **inserir scripts via JavaScript**, assim:

// ```js
// let script = document.createElement('script');
// script.src = "script.js";
// document.body.append(script); // inicia o carregamento
// ```

// Por padrão, **scripts dinâmicos se comportam como `async`**.

// Se você quiser que eles **respeitem a ordem**, use:

// ```js
// script.async = false;
// ```

// ### Exemplo:

// ```js
// function carregarScript(src) {
//   let script = document.createElement('script');
//   script.src = src;
//   script.async = false; // garante ordem
//   document.body.append(script);
// }

// carregarScript("biblioteca.js");
// carregarScript("meu-script.js"); // depende da biblioteca
// ```

// ---

// ## 📊 Resumo

// | Atributo | Ordem de execução             | Espera o DOM?       | Ideal para...                                    |
// | -------- | ----------------------------- | ------------------- | ------------------------------------------------ |
// | `async`  | Ordem de **carregamento**     | ❌ Não espera        | Scripts **independentes** (ads, etc)             |
// | `defer`  | Ordem de **aparição no HTML** | ✅ Sim, espera o DOM | Scripts que dependem do DOM ou de outros scripts |

// > ✅ Ambos **não bloqueiam o carregamento da página**, ou seja, o conteúdo aparece normalmente enquanto o script carrega.

// ---

// ## ⚠️ Observação importante

// Se você usa `defer` ou `async`, o usuário pode ver a página **antes do JavaScript carregar**. Isso significa que:

// * Alguns botões ou funcionalidades podem **ainda não estar prontos**.
// * É importante exibir um **carregando...** ou **desativar botões temporariamente**, deixando claro que ainda há partes sendo carregadas.

// ---

// Se quiser, posso te montar um exemplo completo com `async`, `defer`, `DOMContentLoaded` e `onload` funcionando na prática. Deseja isso?
