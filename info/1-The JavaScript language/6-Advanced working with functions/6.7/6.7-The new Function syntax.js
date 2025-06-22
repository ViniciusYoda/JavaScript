// A Sintaxe "new Function"

// Existe mais uma maneira de criar uma função em JavaScript. Ela é raramente usada, mas em alguns casos não há alternativa.

// Sintaxe:

// A sintaxe para criar uma função é:

// ```javascript
// let func = new Function ([arg1, arg2, ...argN], corpoDaFuncao);
// ```

// A função é criada com os argumentos `arg1...argN` e com o corpo fornecido como `corpoDaFuncao`.

// Fica mais fácil entender com um exemplo. Aqui está uma função com dois argumentos:

// ```javascript
// let sum = new Function('a', 'b', 'return a + b');

// alert( sum(1, 2) ); // 3
// ```

// E aqui temos uma função sem argumentos, com apenas o corpo:

// ```javascript
// let sayHi = new Function('alert("Hello")');

// sayHi(); // Hello
// ```

// A grande diferença em relação às outras formas de criar funções é que, com `new Function`, a função é criada literalmente a partir de uma string, passada em tempo de execução.

// Todas as declarações de função que vimos até agora exigiam que o programador escrevesse o código da função diretamente no script.

// Mas com `new Function`, podemos transformar qualquer string em uma função. Por exemplo, podemos receber uma função vinda de um servidor e executá-la:

// ```javascript
// let str = ...código vindo de um servidor dinamicamente...

// let func = new Function(str);
// func();
// ```

// Ela é usada em casos muito específicos, como quando recebemos código de um servidor ou quando precisamos compilar dinamicamente uma função a partir de um template, em aplicações web mais complexas.

// **Closures**

// Normalmente, uma função lembra onde ela foi criada, graças a uma propriedade interna chamada `[[Environment]]`. Essa propriedade referencia o Ambiente Léxico de onde a função foi criada (vimos isso no capítulo sobre Escopo de Variáveis e Closures).

// Mas quando uma função é criada usando `new Function`, o seu `[[Environment]]` é configurado para apontar não para o ambiente léxico atual, mas para o ambiente global.

// Ou seja, funções criadas com `new Function` não têm acesso a variáveis externas, apenas às globais.

// Veja um exemplo:

// ```javascript
// function getFunc() {
//   let value = "test";

//   let func = new Function('alert(value)');

//   return func;
// }

// getFunc()(); // Erro: value não está definido
// ```

// Compare isso com o comportamento normal:

// ```javascript
// function getFunc() {
//   let value = "test";

//   let func = function() { alert(value); };

//   return func;
// }

// getFunc()(); // "test", pois pega do Ambiente Léxico da função
// ```

// Essa característica especial de `new Function` pode parecer estranha, mas na prática é muito útil.

// Imagine que você precise criar uma função a partir de uma string, mas o código dessa função só será conhecido em tempo de execução. Podemos recebê-lo de um servidor ou de alguma outra fonte externa.

// Essa nova função pode precisar interagir com o script principal.

// Mas… e se ela pudesse acessar variáveis externas?

// O problema é que antes de um código JavaScript ir para produção, ele geralmente passa por um minificador – um programa que reduz o tamanho do código, removendo espaços, comentários e, o mais importante, renomeando variáveis locais para nomes mais curtos.

// Por exemplo, se uma função tiver uma variável `let userName`, o minificador pode trocá-la por `let a` (ou outra letra). Isso é seguro, porque a variável é local e só existe dentro da função. E o minificador cuida de substituir todas as referências corretamente.

// Se uma função criada por `new Function` tivesse acesso a variáveis externas, ela acabaria tentando acessar nomes que o minificador já alterou, o que causaria erros.

// Além disso, permitir esse tipo de acesso seria uma péssima prática de arquitetura de código.

// Por isso, para passar dados para uma função criada com `new Function`, usamos os seus argumentos.

// **Resumo**

// Sintaxe:

// ```javascript
// let func = new Function ([arg1, arg2, ...argN], corpoDaFuncao);
// ```

// Por razões históricas, os argumentos também podem ser passados como uma lista separada por vírgulas dentro de uma única string.

// Estas três declarações significam a mesma coisa:

// ```javascript
// new Function('a', 'b', 'return a + b'); // sintaxe básica
// new Function('a,b', 'return a + b'); // argumentos numa string única, separados por vírgula
// new Function('a , b', 'return a + b'); // mesma coisa, com espaços
// ```

// Funções criadas com `new Function` têm o seu `[[Environment]]` apontando para o Ambiente Léxico Global, e não para o ambiente externo onde foram criadas. Por isso, elas não podem acessar variáveis externas. Na verdade, isso é até desejável, pois evita erros e problemas com minificadores. Passar dados explicitamente por meio de argumentos é uma solução muito mais segura e arquiteturalmente correta.
