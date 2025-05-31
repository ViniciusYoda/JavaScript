// Operador de coalescência nula ??

// Uma adição recente
// Esse operador é uma adição recente à linguagem JavaScript. Navegadores antigos podem precisar de polyfills para funcionar corretamente.

// O operador de coalescência nula é escrito como dois pontos de interrogação ??.

// Como ele trata null e undefined de forma semelhante, vamos usar neste texto o termo “definido” para indicar que um valor não é null nem undefined.

// O resultado da expressão a ?? b é:

// se a estiver definido, então o resultado é a;

// se a não estiver definido, então o resultado é b.

// Em outras palavras, ?? retorna o primeiro argumento se ele não for null ou undefined. Caso contrário, retorna o segundo.

// Esse operador não traz uma ideia completamente nova. Ele apenas oferece uma sintaxe prática para obter o primeiro valor "definido" entre dois.

// A expressão result = a ?? b pode ser reescrita com operadores que já conhecemos assim:

// javascript
// Copiar
// Editar
// result = (a !== null && a !== undefined) ? a : b;
// Com isso, fica absolutamente claro o que ?? faz. Vamos ver onde ele é útil.

// Uso comum: atribuir um valor padrão
// O uso mais comum do ?? é fornecer um valor padrão.

// Por exemplo, aqui mostramos o user se ele estiver definido, ou "Anônimo" caso contrário:

// javascript
// Copiar
// Editar
// let user;

// alert(user ?? "Anônimo"); // Anônimo (user é undefined)
// E se user estiver definido:

// javascript
// Copiar
// Editar
// let user = "João";

// alert(user ?? "Anônimo"); // João (user não é null/undefined)
// Também podemos usar uma sequência de ?? para pegar o primeiro valor definido de uma lista.

// Suponha que temos os dados de um usuário em variáveis firstName, lastName ou nickName. Todas podem estar indefinidas, caso o usuário não tenha preenchido as informações.

// Queremos exibir o nome usando uma dessas variáveis, ou "Anônimo" se todas estiverem indefinidas:

// javascript
// Copiar
// Editar
// let firstName = null;
// let lastName = null;
// let nickName = "Supercoder";

// alert(firstName ?? lastName ?? nickName ?? "Anônimo"); // Supercoder
// Comparação com || (OU lógico)
// O operador lógico OU (||) pode ser usado de forma parecida com ??:

// javascript
// Copiar
// Editar
// let firstName = null;
// let lastName = null;
// let nickName = "Supercoder";

// alert(firstName || lastName || nickName || "Anônimo"); // Supercoder
// Historicamente, || sempre foi usado para esse tipo de fallback, já que está disponível desde o início do JavaScript. Mas o operador ?? foi adicionado recentemente porque os desenvolvedores perceberam que || nem sempre se comportava como esperado.

// A diferença importante é:

// || retorna o primeiro valor "truthy";

// ?? retorna o primeiro valor definido (não null ou undefined).

// Valores como false, 0 e "" (string vazia) são considerados falsy, então || os ignora. Já ?? aceita esses valores, pois eles são definidos.

// Exemplo:

// javascript
// Copiar
// Editar
// let height = 0;

// alert(height || 100); // 100
// alert(height ?? 100); // 0
// height || 100 retorna 100 porque 0 é "falsy".

// height ?? 100 retorna 0 porque 0 é um valor definido.

// Na prática, 0 pode ser um valor válido (como altura), que não deveria ser substituído por um valor padrão. Por isso, ?? é a melhor escolha nesse caso.

// Precedência
// O operador ?? tem a mesma precedência que ||, que é relativamente baixa (nível 3 na tabela do MDN).

// Isso significa que ele é avaliado antes de = e ?, mas depois de operações como + e *.

// Então, use parênteses quando estiver usando ?? junto a outros operadores:

// javascript
// Copiar
// Editar
// let height = null;
// let width = null;

// let area = (height ?? 100) * (width ?? 50);

// alert(area); // 5000
// Sem os parênteses, a multiplicação seria feita primeiro, o que causaria resultados incorretos:

// javascript
// Copiar
// Editar
// let area = height ?? 100 * width ?? 50;
// // interpretado como:
// let area = height ?? (100 * width) ?? 50;
// Uso com && ou ||
// Por motivos de segurança e clareza, o JavaScript proíbe o uso direto de ?? com && ou ||, a menos que a precedência seja explicitamente especificada com parênteses.

// Este código gera erro:

// javascript
// Copiar
// Editar
// let x = 1 && 2 ?? 3; // Erro de sintaxe
// Mas com parênteses funciona:

// javascript
// Copiar
// Editar
// let x = (1 && 2) ?? 3;

// alert(x); // 2
// Essa limitação foi adicionada ao padrão da linguagem para evitar erros de lógica quando os desenvolvedores estão migrando do || para o ??.

// Resumo
// O operador de coalescência nula ?? permite escolher o primeiro valor definido entre dois ou mais.

// É usado para fornecer valores padrão apenas quando uma variável está null ou undefined.

// Exemplo: height = height ?? 100; — define height como 100 apenas se for null ou undefined.

// Ele tem baixa precedência, então use parênteses ao misturar com operações matemáticas.

// Não pode ser combinado com || ou && sem parênteses, pois isso gera erro de sintaxe