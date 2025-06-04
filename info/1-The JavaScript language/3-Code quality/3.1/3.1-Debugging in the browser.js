// Claro! Aqui está a tradução completa e adaptada para o português do conteúdo sobre **Depuração no navegador (Debugging in the browser)**:

// ---

// **Depuração no navegador**

// Antes de escrever códigos mais complexos, vamos falar sobre depuração.

// Depuração é o processo de encontrar e corrigir erros em um script. Todos os navegadores modernos e a maioria dos outros ambientes oferecem ferramentas de depuração – uma interface especial nos DevTools que torna esse processo muito mais fácil. Ela também permite acompanhar a execução do código passo a passo para entender exatamente o que está acontecendo.

// Usaremos o **Chrome**, pois ele possui recursos completos, mas a maioria dos navegadores funciona de forma similar.

// ### Painel "Sources" (Fontes)

// Sua versão do Chrome pode ser um pouco diferente, mas os elementos essenciais devem estar visíveis.

// 1. Abra a página de exemplo no Chrome.
// 2. Ative as ferramentas de desenvolvedor com `F12` (no Mac: `Cmd+Opt+I`).
// 3. Selecione o painel **Sources**.

// Você verá:

// * Um botão de alternância que exibe a aba com os arquivos.
// * Clique nele e selecione **hello.js** na árvore de arquivos.
// * O painel "Sources" possui 3 partes:

//   * **Navegador de arquivos**: lista HTML, JS, CSS e imagens vinculadas à página.
//   * **Editor de código**: exibe o código-fonte.
//   * **Painel de depuração**: usaremos em breve.

// Você pode clicar novamente no botão para esconder a lista de arquivos e liberar espaço para o código.

// ### Console

// Pressione `Esc` para abrir o console na parte inferior. É possível digitar comandos e pressionar `Enter` para executá-los.

// Exemplo:

// ```js
// 1 + 2         // resultado: 3
// hello("debugger") // resultado: undefined
// ```

// ### Breakpoints (Pontos de parada)

// Vamos examinar o que acontece no código. Em `hello.js`, clique no número da linha 4. Clique também na linha 8.

// Um **breakpoint** é um ponto onde o JavaScript vai parar automaticamente durante a execução. Com o código pausado, podemos inspecionar variáveis, executar comandos no console, etc.

// No painel direito, é possível:

// * Ver a lista de breakpoints.
// * Clicar para ir direto ao código.
// * Desativar temporariamente (desmarcar).
// * Remover (clique com botão direito > Remover).

// ### Breakpoints condicionais

// Clique com o botão direito no número da linha e escolha **"Adicionar breakpoint condicional"**. O código só será pausado se a expressão definida for verdadeira. Útil para depurar valores específicos de variáveis.

// ### O comando `debugger`

// Também é possível pausar o código manualmente:

// ```js
// function hello(name) {
//   let phrase = `Hello, ${name}!`;

//   debugger; // <-- pausa aqui

//   say(phrase);
// }
// ```

// Este comando só funciona se as ferramentas de desenvolvedor estiverem abertas, senão é ignorado.

// ### Pausar e examinar

// No exemplo, `hello()` é chamado durante o carregamento da página. Depois de definir os breakpoints, recarregue a página com `F5` (ou `Cmd+R` no Mac). O código vai parar na linha 4.

// No painel direito, você verá:

// * **Watch**: monitora valores de expressões. Clique no `+` e adicione algo como `name`.
// * **Call Stack**: mostra a pilha de chamadas (ex: `hello()` foi chamado por um script no `index.html`).
// * **Scope**: mostra variáveis locais e globais.
// * **this**: veremos mais adiante, mas ele também aparece aqui.

// ### Rastreando a execução

// No topo do painel direito há botões para controlar o código pausado:

// * ▶️ **Resume (F8)**: continua a execução. Pausará no próximo breakpoint.
// * ⏭ **Step (F9)**: executa o próximo comando. Ideal para ir linha por linha.
// * ⏩ **Step over (F10)**: executa a próxima linha, mas **pula** o interior de funções.
// * ⏬ **Step into (F11)**: entra na função chamada (útil para funções assíncronas no futuro).
// * ⏏ **Step out (Shift+F11)**: sai da função atual e para na linha seguinte após a chamada.
// * ⛔ **Ativar/desativar todos os breakpoints**: útil para pausar ou liberar tudo de uma vez.
// * ❗ **Ativar pausa automática em erros**: ao ativar, o script pausa automaticamente quando ocorre um erro (com DevTools abertas). Isso permite ver onde ocorreu o erro e inspecionar variáveis no momento do problema.

// ### Continue até aqui

// Clique com o botão direito em uma linha e selecione **"Continue to here"** para continuar a execução até aquele ponto, sem precisar colocar um breakpoint manual.

// ### Log no console

// Para exibir informações no console a partir do código, use `console.log`.

// ```js
// for (let i = 0; i < 5; i++) {
//   console.log("valor:", i);
// }
// ```

// Usuários comuns não veem isso, só aparece no console. Para visualizar, abra o painel Console ou pressione `Esc` enquanto estiver em outro painel.

// Se houver **logs suficientes**, às vezes é possível depurar o código apenas observando as mensagens no console.

// ### Resumo

// As principais formas de pausar a execução de um script são:

// 1. Colocar um breakpoint.
// 2. Inserir o comando `debugger`.
// 3. Ocorrer um erro (com DevTools abertas e pausa automática ativada).

// Quando o script está pausado, é possível depurar: examinar variáveis, rastrear a execução e entender o que deu errado.

// Há muitos outros recursos nas DevTools do Chrome. O manual completo está disponível em:
// [https://developers.google.com/web/tools/chrome-devtools](https://developers.google.com/web/tools/chrome-devtools)

// Essas informações já são suficientes para começar a depurar seus scripts. Se você for trabalhar muito com navegador, vale a pena explorar as funcionalidades avançadas.

// Ah, e não se esqueça: clicar por curiosidade nas áreas das DevTools e explorar os menus de contexto com botão direito é uma ótima forma de aprender!


