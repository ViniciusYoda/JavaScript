// -----

// ## Introdução: Callbacks

// **Usaremos métodos de navegador em exemplos aqui.**

// Para demonstrar o uso de **callbacks**, **promises** e outros conceitos abstratos, utilizaremos alguns métodos de navegador: especificamente, carregar scripts e realizar manipulações simples de documentos.

// Se você não estiver familiarizado com esses métodos e seu uso nos exemplos for confuso, talvez queira ler alguns capítulos da [próxima parte do tutorial](https://javascript.info/document).

// Embora, tentaremos deixar as coisas claras de qualquer forma. Não haverá nada realmente complexo em termos de navegador.

// Muitas funções são fornecidas por ambientes de host JavaScript que permitem agendar ações **assíncronas**. Em outras palavras, ações que iniciamos agora, mas que terminam depois.

// Por exemplo, uma dessas funções é a função `setTimeout`.

// Existem outros exemplos do mundo real de ações assínronas, como carregar scripts e módulos (os abordaremos em capítulos posteriores).

// Veja a função `loadScript(src)`, que carrega um script com o `src` (caminho) dado:

// ```javascript
// function loadScript(src) {
//   // cria uma tag <script> e a anexa à página
//   // isso faz com que o script com o src dado comece a carregar e execute quando completo
//   let script = document.createElement('script');
//   script.src = src;
//   document.head.append(script);
// }
// ```

// Ela insere no documento uma nova tag `<script src="...">` criada dinamicamente com o `src` fornecido. O navegador automaticamente começa a carregá-lo e o executa quando completo.

// Podemos usar esta função assim:

// ```javascript
// // carrega e executa o script no caminho dado
// loadScript('/my/script.js');
// ```

// O script é executado "assincronamente", pois começa a carregar agora, mas é executado depois, quando a função já terminou.

// Se houver algum código abaixo de `loadScript(...)`, ele não espera até que o carregamento do script termine.

// ```javascript
// loadScript('/my/script.js');
// // o código abaixo de loadScript
// // não espera o carregamento do script terminar
// // ...
// ```

// Digamos que precisamos usar o novo script assim que ele carregar. Ele declara novas funções, e queremos executá-las.

// Mas se fizermos isso imediatamente após a chamada `loadScript(...)`, isso não funcionaria:

// ```javascript
// loadScript('/my/script.js'); // o script tem "function newFunction() {…}"
// newFunction(); // não existe tal função!
// ```

// Naturalmente, o navegador provavelmente não teve tempo de carregar o script. Atualmente, a função `loadScript` não oferece uma maneira de rastrear a conclusão do carregamento. O script carrega e eventualmente é executado, é tudo. Mas gostaríamos de saber quando isso acontece, para usar novas funções e variáveis desse script.

// Vamos adicionar uma função de **callback** como segundo argumento para `loadScript` que deve ser executada quando o script carregar:

// ```javascript
// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;
//   script.onload = () => callback(script); // Chama o callback quando o script carrega

//   document.head.append(script);
// }
// ```

// O evento `onload` é descrito no artigo [Carregamento de recursos: onload e onerror](https://javascript.info/onload-onerror), ele basicamente executa uma função depois que o script é carregado e executado.

// Agora, se quisermos chamar novas funções do script, devemos escrever isso no callback:

// ```javascript
// loadScript('/my/script.js', function() {
//   // o callback é executado após o script ser carregado
//   newFunction(); // então agora funciona
//   ...
// });
// ```

// Essa é a ideia: o segundo argumento é uma função (geralmente anônima) que é executada quando a ação é concluída.

// Aqui está um exemplo executável com um script real:

// ```javascript
// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;
//   script.onload = () => callback(script);
//   document.head.append(script);
// }

// loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
//   alert(`Legal, o script ${script.src} foi carregado`);
//   alert( _ ); // _ é uma função declarada no script carregado
// });
// ```

// Isso é chamado de estilo de programação assíncrona "baseado em callback". Uma função que faz algo assincronamente deve fornecer um argumento `callback` onde colocamos a função para ser executada após a conclusão.

// Aqui fizemos isso em `loadScript`, mas claro que é uma abordagem geral.

// -----

// ### Callback em Callback

// Como podemos carregar dois scripts sequencialmente: o primeiro e, em seguida, o segundo depois dele?

// A solução natural seria colocar a segunda chamada `loadScript` dentro do callback, assim:

// ```javascript
// loadScript('/my/script.js', function(script) {

//   alert(`Legal, o ${script.src} foi carregado, vamos carregar mais um`);

//   loadScript('/my/script2.js', function(script) {
//     alert(`Legal, o segundo script foi carregado`);
//   });
// });
// ```

// Após a conclusão do `loadScript` externo, o callback inicia o interno.

// E se quisermos mais um script...?

// ```javascript
// loadScript('/my/script.js', function(script) {

//   loadScript('/my/script2.js', function(script) {

//     loadScript('/my/script3.js', function(script) {
//       // ...continuar após todos os scripts serem carregados
//     });

//   });
// });
// ```

// Assim, cada nova ação está dentro de um callback. Isso é bom para algumas ações, mas não para muitas, então veremos outras variantes em breve.

// -----

// ### Lidando com Erros

// Nos exemplos acima, não consideramos erros. E se o carregamento do script falhar? Nosso callback deve ser capaz de reagir a isso.

// Aqui está uma versão aprimorada de `loadScript` que rastreia erros de carregamento:

// ```javascript
// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;

//   script.onload = () => callback(null, script); // Sucesso: primeiro argumento null, segundo script
//   script.onerror = () => callback(new Error(`Erro ao carregar script para ${src}`)); // Erro: primeiro argumento Error

//   document.head.append(script);
// }
// ```

// Ele chama `callback(null, script)` para carregamento bem-sucedido e `callback(error)` caso contrário.

// O uso:

// ```javascript
// loadScript('/my/script.js', function(error, script) {
//   if (error) {
//     // tratar erro
//   } else {
//     // script carregado com sucesso
//   }
// });
// ```

// Mais uma vez, a receita que usamos para `loadScript` é, na verdade, bastante comum. É chamada de estilo de "callback com erro primeiro".

// A convenção é:

//   * O **primeiro argumento** do `callback` é reservado para um erro, se ocorrer. Então `callback(err)` é chamado.
//   * O **segundo argumento** (e os próximos, se necessário) são para o resultado bem-sucedido. Então `callback(null, result1, result2...)` é chamado.

// Assim, a única função `callback` é usada tanto para relatar erros quanto para retornar resultados.

// -----

// ### Pirâmide da Perdição (Pyramid of Doom)

// À primeira vista, parece uma abordagem viável para programação assíncrona. E de fato é. Para uma ou talvez duas chamadas aninhadas, parece bom.

// Mas para múltiplas ações assíncronas que se seguem uma após a outra, teremos um código assim:

// ```javascript
// loadScript('1.js', function(error, script) {

//   if (error) {
//     handleError(error);
//   } else {
//     // ...
//     loadScript('2.js', function(error, script) {
//       if (error) {
//         handleError(error);
//       } else {
//         // ...
//         loadScript('3.js', function(error, script) {
//           if (error) {
//             handleError(error);
//           } else {
//             // ...continuar após todos os scripts serem carregados (*)
//           }
//         });

//       }
//     });
//   }
// });
// ```

// No código acima:

//   * Carregamos `1.js`, então se não houver erro...
//   * Carregamos `2.js`, então se não houver erro...
//   * Carregamos `3.js`, então se não houver erro – fazemos algo mais `(*)`.

// À medida que as chamadas se tornam mais aninhadas, o código fica mais profundo e cada vez mais difícil de gerenciar, especialmente se tivermos um código real em vez de `...` que pode incluir mais loops, instruções condicionais e assim por diante.

// Isso é às vezes chamado de "inferno de callbacks" ou "pirâmide da perdição".

// A "pirâmide" de chamadas aninhadas cresce para a direita a cada ação assíncrona. Logo ela sai do controle.

// Então, essa forma de codificar não é muito boa.

// Podemos tentar aliviar o problema transformando cada ação em uma função autônoma, assim:

// ```javascript
// loadScript('1.js', step1);

// function step1(error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...
//     loadScript('2.js', step2);
//   }
// }

// function step2(error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...
//     loadScript('3.js', step3);
//   }
// }

// function step3(error, script) {
//   if (error) {
//     handleError(error);
//   } else {
//     // ...continuar após todos os scripts serem carregados (*)
//   }
// }
// ```

// Viu? Faz a mesma coisa, e não há aninhamento profundo agora porque transformamos cada ação em uma função separada de nível superior.

// Funciona, mas o código parece uma planilha rasgada. É difícil de ler, e você provavelmente notou que é preciso pular entre as partes ao lê-lo. Isso é inconveniente, especialmente se o leitor não estiver familiarizado com o código e não souber para onde pular.

// Além disso, as funções nomeadas `step*` são todas de uso único, são criadas apenas para evitar a "pirâmide da perdição". Ninguém vai reutilizá-las fora da cadeia de ações. Então, há um pouco de poluição de namespace aqui.

// Gostaríamos de ter algo melhor.

// Felizmente, existem outras maneiras de evitar tais pirâmides. Uma das melhores maneiras é usar **"promises"**, descritas no próximo capítulo.

// -----
