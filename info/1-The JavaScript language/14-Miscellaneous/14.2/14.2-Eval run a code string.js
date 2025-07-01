// Claro! Aqui está a adaptação completa para o português do conteúdo sobre `eval` em JavaScript:

// ---

// ## `eval`: executa uma string de código

// A função embutida `eval` permite executar uma string como código JavaScript.

// A sintaxe é:

// ```js
// let resultado = eval(codigo);
// ```

// Por exemplo:

// ```js
// let codigo = 'alert("Olá")';
// eval(codigo); // Exibe "Olá"
// ```

// Uma string de código pode ser longa, conter quebras de linha, declarações de funções, variáveis, etc.

// O resultado de `eval` é o resultado da **última instrução** executada.

// Exemplo:

// ```js
// let valor = eval('1+1');
// alert(valor); // 2

// let valor = eval('let i = 0; ++i');
// alert(valor); // 1
// ```

// O código passado para `eval` é executado no **ambiente léxico atual**, então ele pode acessar variáveis externas:

// ```js
// let a = 1;

// function f() {
//   let a = 2;
//   eval('alert(a)'); // 2
// }

// f();
// ```

// Ele também pode **modificar variáveis externas**:

// ```js
// let x = 5;
// eval("x = 10");
// alert(x); // 10
// ```

// No **modo estrito**, `eval` possui seu **próprio escopo léxico**. Portanto, funções e variáveis declaradas dentro de `eval` **não ficam visíveis fora** dele:

// ```js
// // lembrete: 'use strict' é ativado por padrão em exemplos executáveis

// eval("let x = 5; function f() {}");

// alert(typeof x); // undefined (a variável não existe fora do eval)
// // a função f também não é visível fora do eval
// ```

// Sem `'use strict'`, `eval` **não** tem escopo próprio, então variáveis como `x` e `f` **ficam visíveis** fora dele.

// ---

// ## Usando `eval`

// Hoje em dia, `eval` é usado **muito raramente**. É comum ouvir a frase: **"eval é do mal"**.

// O motivo é simples: antigamente o JavaScript era muito limitado e muitas coisas só eram possíveis usando `eval`. Mas esse tempo já passou há mais de uma década.

// **Atualmente, quase não há necessidade de usar `eval`**. Se alguém está usando, provavelmente há uma alternativa mais segura e moderna, como construções da linguagem ou módulos ES.

// Além disso, o fato de `eval` acessar variáveis externas pode gerar **efeitos colaterais**.

// Por exemplo, ferramentas de **minificação** (que reduzem o tamanho do código antes da publicação) costumam renomear variáveis locais para nomes menores (como `a`, `b`, etc). Isso é seguro normalmente, **mas não se `eval` estiver presente**, pois ele pode acessar variáveis externas. Assim, os minificadores evitam renomear essas variáveis, o que prejudica a compactação do código.

// Usar variáveis externas dentro de `eval` também **dificulta a manutenção do código**, o que é uma prática ruim.

// ---

// ## Como evitar os problemas com `eval`

// Existem duas formas principais de evitar esses problemas:

// ### 1. Executar no escopo global

// Se o código `eval` **não precisa acessar variáveis locais**, chame `eval` como `window.eval(...)`.

// Assim, o código será executado **no escopo global**:

// ```js
// let x = 1;
// {
//   let x = 5;
//   window.eval('alert(x)'); // 1 (a variável global)
// }
// ```

// ### 2. Usar `new Function` para passar variáveis

// Se o código precisa de variáveis locais, use `new Function` e **passe os dados como argumentos**:

// ```js
// let f = new Function('a', 'alert(a)');
// f(5); // 5
// ```

// A construção `new Function` é explicada no capítulo **"A sintaxe new Function"**. Ela cria uma função a partir de uma string, **também no escopo global**, e **não acessa variáveis locais**. Mas isso é até melhor, pois obriga a passar os dados de forma clara como argumentos, como no exemplo acima.

// ---

// ## Resumo

// * `eval(codigo)` executa uma string de código e retorna o resultado da última instrução.
// * É raramente usado no JavaScript moderno.
// * Pode acessar e modificar variáveis locais externas (o que é considerado má prática).
// * Para rodar código no escopo global, use `window.eval(codigo)`.
// * Se precisar passar variáveis, use `new Function(...args)` em vez de `eval`.

// ---

// Se quiser, posso adaptar esse conteúdo para um formato de apostila ou slide. Deseja isso?
