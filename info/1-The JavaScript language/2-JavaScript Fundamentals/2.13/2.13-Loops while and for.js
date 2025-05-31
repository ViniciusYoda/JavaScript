// Laços de repetição: while e for

// Muitas vezes precisamos repetir ações. Por exemplo, exibir produtos de uma lista um por um ou executar o mesmo código para cada número de 1 a 10. Os loops (laços) são uma forma de repetir o mesmo trecho de código várias vezes.

// Nota para leitores avançados:
// Este artigo trata apenas dos laços básicos: while, do...while e for(;;).
// Se estiver procurando outros tipos de laço, consulte:

// for...in para percorrer propriedades de objetos.

// for...of para percorrer arrays e objetos iteráveis.

// O laço "while"

// A sintaxe do while é:

// javascript
// Copiar
// Editar
// while (condição) {
//   // corpo do laço
// }
// Enquanto a condição for verdadeira (truthy), o código dentro do laço será executado.
// Exemplo:

// javascript
// Copiar
// Editar
// let i = 0;
// while (i < 3) {
//   alert(i); // exibe 0, depois 1, depois 2
//   i++;
// }
// Cada execução do corpo do laço é chamada de iteração. No exemplo acima, o laço executa três iterações.

// Você também pode usar expressões mais curtas, por exemplo:

// javascript
// Copiar
// Editar
// let i = 3;
// while (i) alert(i--); // exibe 3, 2, 1
// O laço "do...while"

// Este tipo de laço executa primeiro o corpo, depois verifica a condição:

// javascript
// Copiar
// Editar
// let i = 0;
// do {
//   alert(i);
//   i++;
// } while (i < 3);
// Esse formato garante que o corpo do laço será executado ao menos uma vez.

// O laço "for"

// Mais complexo, mas também o mais comum:

// javascript
// Copiar
// Editar
// for (início; condição; incremento) {
//   // corpo do laço
// }
// Exemplo:

// javascript
// Copiar
// Editar
// for (let i = 0; i < 3; i++) {
//   alert(i); // exibe 0, 1, 2
// }
// O laço for funciona assim:

// Executa o início (uma vez só);

// Verifica a condição;

// Se verdadeira, executa o corpo e depois o incremento;

// Repete o processo.

// Declaração inline de variáveis

// Você pode declarar a variável de controle diretamente no for:

// javascript
// Copiar
// Editar
// for (let i = 0; i < 3; i++) {
//   alert(i); // 0, 1, 2
// }
// alert(i); // erro, i não existe fora do laço
// Ou usar uma variável já existente:

// javascript
// Copiar
// Editar
// let i = 0;
// for (; i < 3; i++) {
//   alert(i); // 0, 1, 2
// }
// alert(i); // 3
// Partes opcionais

// Todas as três partes do for (início, condição e incremento) são opcionais:

// javascript
// Copiar
// Editar
// for (;;) {
//   // laço infinito
// }
// Mas os dois ; devem estar presentes para evitar erro de sintaxe.

// Interrompendo o laço com "break"

// Você pode sair de um laço a qualquer momento usando break:

// javascript
// Copiar
// Editar
// let sum = 0;
// while (true) {
//   let value = +prompt("Digite um número:", '');
//   if (!value) break;
//   sum += value;
// }
// alert('Soma: ' + sum);
// Pulando uma iteração com "continue"

// A diretiva continue pula a iteração atual e avança para a próxima:

// javascript
// Copiar
// Editar
// for (let i = 0; i < 10; i++) {
//   if (i % 2 == 0) continue;
//   alert(i); // exibe 1, 3, 5, 7, 9
// }
// Também é possível fazer o mesmo com if simples:

// javascript
// Copiar
// Editar
// for (let i = 0; i < 10; i++) {
//   if (i % 2) alert(i);
// }
// Essa abordagem evita o uso de continue, mas pode aumentar o nível de indentação.

// Não use break/continue dentro do operador ternário

// break e continue não funcionam dentro do operador ternário ?. Exemplo inválido:

// javascript
// Copiar
// Editar
// (i > 5) ? alert(i) : continue; // Erro de sintaxe
// Rótulos (labels) com break/continue

// Se quiser sair de vários laços aninhados ao mesmo tempo, use rótulos:

// javascript
// Copiar
// Editar
// outer: for (let i = 0; i < 3; i++) {
//   for (let j = 0; j < 3; j++) {
//     let input = prompt(`Valor em (${i},${j})`, '');
//     if (!input) break outer; // sai dos dois laços
//   }
// }
// alert('Fim!');
// Você também pode usar continue com rótulos, para ir para a próxima iteração do laço externo.

// Mas labels não permitem saltar para qualquer parte do código. Por exemplo, não é possível fazer isso:

// javascript
// Copiar
// Editar
// break label; // inválido se não estiver dentro do bloco com esse label
// Resumo

// Três tipos principais de laços:

// while – verifica a condição antes da iteração.

// do...while – verifica a condição depois da iteração.

// for(;;) – inclui início, condição e passo.

// Para laços infinitos, usa-se while(true) ou for(;;), com break para encerrar quando necessário.

// Use continue para pular uma iteração e ir para a próxima.
// Use labels com break ou continue para sair de laços aninhados.