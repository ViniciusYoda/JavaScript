// Claro, aqui está o texto adaptado para o português:

// ## Números

// No JavaScript moderno, existem dois tipos de números:

// * Números regulares em JavaScript são armazenados no formato de 64 bits **IEEE-754**, também conhecido como "números de ponto flutuante de dupla precisão". Esses são os números que usamos na maioria das vezes, e falaremos sobre eles neste capítulo.
// * Números **BigInt** representam inteiros de comprimento arbitrário. Eles são necessários às vezes porque um número inteiro regular não pode exceder com segurança $(2^{53}-1)$ nem ser menor que $-(2^{53}-1)$, como mencionamos anteriormente no capítulo **Tipos de dados**. Como os BigInts são usados em algumas áreas especiais, dedicamos um capítulo específico a eles, **BigInt**.

// Então, aqui falaremos sobre números regulares. Vamos expandir nosso conhecimento sobre eles.

// ---

// ### Mais formas de escrever um número

// Imagine que precisamos escrever 1 bilhão. A maneira óbvia é:

// ```javascript
// let billion = 1000000000;
// ```

// Também podemos usar o **sublinhado `_` como separador**:

// ```javascript
// let billion = 1_000_000_000;
// ```

// Aqui, o sublinhado `_` funciona como "açúcar sintático", tornando o número mais legível. O motor JavaScript simplesmente ignora o `_` entre os dígitos, então é exatamente o mesmo um bilhão acima.

// Na vida real, no entanto, tentamos evitar escrever longas sequências de zeros. Somos preguiçosos demais para isso. Tentaremos escrever algo como `"1bn"` para um bilhão ou `"7.3bn"` para 7 bilhões e 300 milhões. O mesmo vale para a maioria dos números grandes.

// Em JavaScript, podemos encurtar um número anexando a letra `"e"` a ele e especificando a contagem de zeros:

// ```javascript
// let billion = 1e9;  // 1 bilhão, literalmente: 1 e 9 zeros
// alert( 7.3e9 );  // 7.3 bilhões (o mesmo que 7300000000 ou 7_300_000_000)
// ```

// Em outras palavras, `e` multiplica o número por $1$ com a contagem de zeros fornecida.

// ```javascript
// 1e3 === 1 * 1000; // e3 significa *1000
// 1.23e6 === 1.23 * 1000000; // e6 significa *1000000
// ```

// Agora vamos escrever algo muito pequeno. Digamos, 1 microssegundo (um milionésimo de segundo):

// ```javascript
// let mcs = 0.000001;
// ```

// Assim como antes, usar `"e"` pode ajudar. Se quisermos evitar escrever os zeros explicitamente, podemos escrever o mesmo como:

// ```javascript
// let mcs = 1e-6; // cinco zeros à esquerda do 1
// ```

// Se contarmos os zeros em `0.000001`, há 6 deles. Então, naturalmente, é `1e-6`.

// Em outras palavras, um número negativo após `"e"` significa uma divisão por 1 com o número dado de zeros:

// ```javascript
// // -3 divide por 1 com 3 zeros
// 1e-3 === 1 / 1000; // 0.001

// // -6 divide por 1 com 6 zeros
// 1.23e-6 === 1.23 / 1000000; // 0.00000123

// // um exemplo com um número maior
// 1234e-2 === 1234 / 100; // 12.34, ponto decimal move 2 vezes
// ```

// ---

// ### Números hexadecimais, binários e octais

// Números **hexadecimais** são amplamente usados em JavaScript para representar cores, codificar caracteres e para muitas outras coisas. Então, naturalmente, existe uma maneira mais curta de escrevê-los: `0x` e então o número.

// Por exemplo:

// ```javascript
// alert( 0xff ); // 255
// alert( 0xFF ); // 255 (o mesmo, maiúsculas/minúsculas não importam)
// ```

// Sistemas de numeração **binário** e **octal** são raramente usados, mas também são suportados usando os prefixos `0b` e `0o`:

// ```javascript
// let a = 0b11111111; // forma binária de 255
// let b = 0o377; // forma octal de 255

// alert( a == b ); // true, o mesmo número 255 em ambos os lados
// ```

// Existem apenas 3 sistemas numéricos com esse suporte. Para outros sistemas numéricos, devemos usar a função `parseInt` (que veremos mais adiante neste capítulo).

// ---

// ### `toString(base)`

// O método `num.toString(base)` retorna uma representação em **string** de `num` no sistema numérico com a `base` fornecida.

// Por exemplo:

// ```javascript
// let num = 255;
// alert( num.toString(16) );  // ff
// alert( num.toString(2) );   // 11111111
// ```

// A `base` pode variar de `2` a `36`. Por padrão, é `10`.

// Casos de uso comuns para isso são:

// * **`base=16`** é usado para cores hexadecimais, codificações de caracteres, etc., os dígitos podem ser `0..9` ou `A..F`.
// * **`base=2`** é principalmente para depuração de operações bit a bit, os dígitos podem ser `0` ou `1`.
// * **`base=36`** é o máximo, os dígitos podem ser `0..9` ou `A..Z`. Todo o alfabeto latino é usado para representar um número. Um caso engraçado, mas útil para `36` é quando precisamos transformar um longo identificador numérico em algo mais curto, por exemplo, para criar uma URL curta. Pode-se simplesmente representá-lo no sistema numérico com base `36`:

// ```javascript
// alert( 123456..toString(36) ); // 2n9c
// ```

// #### Dois pontos para chamar um método

// Observe que os **dois pontos** em `123456..toString(36)` não são um erro de digitação. Se quisermos chamar um método diretamente em um número, como `toString` no exemplo acima, precisamos colocar dois pontos `..` depois dele.

// Se colocássemos um único ponto: `123456.toString(36)`, haveria um erro, porque a sintaxe JavaScript implica a parte decimal após o primeiro ponto. E se colocarmos mais um ponto, o JavaScript sabe que a parte decimal está vazia e agora usa o método.

// Também poderíamos escrever `(123456).toString(36)`.

// ---

// ### Arredondamento

// Uma das operações mais usadas ao trabalhar com números é o arredondamento.

// Existem várias funções internas para arredondamento:

// * **`Math.floor`**
//     Arredonda para baixo: `3.1` torna-se `3`, e `-1.1` torna-se `-2`.
// * **`Math.ceil`**
//     Arredonda para cima: `3.1` torna-se `4`, e `-1.1` torna-se `-1`.
// * **`Math.round`**
//     Arredonda para o número inteiro mais próximo: `3.1` torna-se `3`, `3.6` torna-se `4`. Nos casos intermediários, `3.5` arredonda para cima para `4`, e `-3.5` arredonda para cima para `-3`.
// * **`Math.trunc`** (não suportado pelo Internet Explorer)
//     Remove tudo após o ponto decimal sem arredondar: `3.1` torna-se `3`, `-1.1` torna-se `-1`.

// Aqui está a tabela para resumir as diferenças entre eles:

// |      | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
// | :--- | :----------- | :---------- | :----------- | :----------- |
// | 3.1  | 3            | 4           | 3            | 3            |
// | 3.5  | 3            | 4           | 4            | 3            |
// | 3.6  | 3            | 4           | 4            | 3            |
// | -1.1 | -2           | -1          | -1           | -1           |
// | -1.5 | -2           | -1          | -1           | -1           |
// | -1.6 | -2           | -1          | -2           | -1           |

// Essas funções cobrem todas as maneiras possíveis de lidar com a parte decimal de um número. Mas e se quisermos arredondar o número para o **n-ésimo** dígito após a casa decimal?

// Por exemplo, temos `1.2345` e queremos arredondá-lo para 2 dígitos, obtendo apenas `1.23`.

// Existem duas maneiras de fazer isso:

// 1.  **Multiplicar e dividir.**
//     Por exemplo, para arredondar o número para o 2º dígito após a casa decimal, podemos multiplicar o número por `100`, chamar a função de arredondamento e então dividir de volta.

//     ```javascript
//     let num = 1.23456;
//     alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
//     ```

// 2.  O método **`toFixed(n)`** arredonda o número para `n` dígitos após o ponto e retorna uma representação em string do resultado.

//     ```javascript
//     let num = 12.34;
//     alert( num.toFixed(1) ); // "12.3"
//     ```

//     Isso arredonda para cima ou para baixo para o valor mais próximo, semelhante a `Math.round`:

//     ```javascript
//     let num = 12.36;
//     alert( num.toFixed(1) ); // "12.4"
//     ```

//     Observe que o resultado de `toFixed` é uma string. Se a parte decimal for menor do que o necessário, zeros são anexados ao final:

//     ```javascript
//     let num = 12.34;
//     alert( num.toFixed(5) ); // "12.34000", adicionou zeros para ter exatamente 5 dígitos
//     ```

//     Podemos convertê-lo em um número usando o operador unário `+` ou uma chamada `Number()`, por exemplo, escrevendo `+num.toFixed(5)`.

// ---

// ### Cálculos imprecisos

// Internamente, um número é representado no formato de 64 bits **IEEE-754**, então há exatamente 64 bits para armazenar um número: 52 deles são usados para armazenar os dígitos, 11 deles armazenam a posição do ponto decimal e 1 bit é para o sinal.

// Se um número for realmente enorme, ele pode exceder o armazenamento de 64 bits e se tornar um valor numérico especial **`Infinity`**:

// ```javascript
// alert( 1e500 ); // Infinity
// ```

// O que pode ser um pouco menos óbvio, mas acontece com bastante frequência, é a **perda de precisão**.

// Considere este teste de igualdade (falso!):

// ```javascript
// alert( 0.1 + 0.2 == 0.3 ); // false
// ```

// É isso mesmo, se verificarmos se a soma de `0.1` e `0.2` é `0.3`, obtemos `false`.

// Estranho! O que é então se não for `0.3`?

// ```javascript
// alert( 0.1 + 0.2 ); // 0.30000000000000004
// ```

// Ai! Imagine que você está fazendo um site de compras online e o visitante coloca produtos de **$0.10** e **$0.20** em seu carrinho. O total do pedido será **$0.30000000000000004**. Isso surpreenderia qualquer um.

// Mas por que isso acontece?

// Um número é armazenado na memória em sua forma binária, uma sequência de bits – uns e zeros. Mas frações como `0.1`, `0.2` que parecem simples no sistema numérico decimal são, na verdade, frações intermináveis em sua forma binária.

// ```javascript
// alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
// alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
// alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
// ```

// O que é `0.1`? É um dividido por dez ($1/10$), um décimo. No sistema numérico decimal, tais números são facilmente representáveis. Compare com um terço: $1/3$. Ele se torna uma fração infinita $0.33333(3)$.

// Assim, a divisão por potências de $10$ é garantida para funcionar bem no sistema decimal, mas a divisão por $3$ não. Pela mesma razão, no sistema numérico binário, a divisão por potências de $2$ é garantida para funcionar, mas $1/10$ torna-se uma fração binária infinita.

// Simplesmente não há como armazenar **exatamente 0.1** ou **exatamente 0.2** usando o sistema binário, assim como não há como armazenar um terço como uma fração decimal.

// O formato numérico **IEEE-754** resolve isso arredondando para o número possível mais próximo. Essas regras de arredondamento normalmente não nos permitem ver essa "pequena perda de precisão", mas ela existe.

// Podemos ver isso em ação:

// ```javascript
// alert( 0.1.toFixed(20) ); // 0.10000000000000000555
// ```

// E quando somamos dois números, suas "perdas de precisão" se somam.

// É por isso que `0.1 + 0.2` não é exatamente `0.3`.

// #### Não apenas JavaScript

// O mesmo problema existe em muitas outras linguagens de programação.

// PHP, Java, C, Perl e Ruby dão exatamente o mesmo resultado, porque são baseados no mesmo formato numérico.

// Podemos contornar o problema? Claro, o método mais confiável é arredondar o resultado com a ajuda do método `toFixed(n)`:

// ```javascript
// let sum = 0.1 + 0.2;
// alert( sum.toFixed(2) ); // "0.30"
// ```

// Observe que `toFixed` sempre retorna uma string. Ele garante que tenha 2 dígitos após o ponto decimal. Isso é realmente conveniente se temos um e-commerce e precisamos mostrar **$0.30**. Para outros casos, podemos usar o operador unário `+` para convertê-lo em um número:

// ```javascript
// let sum = 0.1 + 0.2;
// alert( +sum.toFixed(2) ); // 0.3
// ```

// Também podemos multiplicar temporariamente os números por 100 (ou um número maior) para transformá-los em inteiros, fazer os cálculos e depois dividir de volta. Então, como estamos fazendo cálculos com inteiros, o erro diminui um pouco, mas ainda o obtemos na divisão:

// ```javascript
// alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
// alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
// ```

// Então, a abordagem de multiplicar/dividir reduz o erro, mas não o remove totalmente.

// Às vezes, podemos tentar evitar frações por completo. Por exemplo, se estamos lidando com uma loja, podemos armazenar os preços em centavos em vez de dólares. Mas e se aplicarmos um desconto de 30%? Na prática, evitar frações totalmente é raramente possível. Apenas arredonde-as para "cortar as sobras" quando necessário.

// #### A coisa engraçada

// Tente executar isto:

// ```javascript
// // Olá! Eu sou um número auto-aumentável!
// alert( 9999999999999999 ); // mostra 10000000000000000
// ```

// Isso sofre do mesmo problema: uma perda de precisão. Existem 64 bits para o número, 52 deles podem ser usados para armazenar dígitos, mas isso não é suficiente. Então os dígitos menos significativos desaparecem.

// JavaScript não aciona um erro em tais eventos. Ele faz o possível para ajustar o número ao formato desejado, mas infelizmente, esse formato não é grande o suficiente.

// #### Dois zeros

// Outra consequência engraçada da representação interna dos números é a existência de **dois zeros**: `0` e `-0`.

// Isso ocorre porque um sinal é representado por um único bit, então ele pode ser definido ou não para qualquer número, incluindo um zero.

// Na maioria dos casos, a distinção é imperceptível, porque os operadores são adequados para tratá-los como iguais.

// ---

// ### Testes: `isFinite` e `isNaN`

// Lembre-se desses dois valores numéricos especiais?

// * **`Infinity`** (e `-Infinity`) é um valor numérico especial que é maior (menor) do que qualquer coisa.
// * **`NaN`** representa um erro.

// Eles pertencem ao tipo `number`, mas não são números "normais", então existem funções especiais para verificá-los:

// * **`isNaN(value)`** converte seu argumento para um número e então o testa para ser `NaN`:

//     ```javascript
//     alert( isNaN(NaN) ); // true
//     alert( isNaN("str") ); // true
//     ```

//     Mas precisamos dessa função? Não podemos simplesmente usar a comparação `=== NaN`? Infelizmente não. O valor `NaN` é único, pois não é igual a nada, incluindo a si mesmo:

//     ```javascript
//     alert( NaN === NaN ); // false
//     ```

// * **`isFinite(value)`** converte seu argumento para um número e retorna `true` se for um número regular, não `NaN`/`Infinity`/`-Infinity`:

//     ```javascript
//     alert( isFinite("15") ); // true
//     alert( isFinite("str") ); // false, porque um valor especial: NaN
//     alert( isFinite(Infinity) ); // false, porque um valor especial: Infinity
//     ```

//     Às vezes, `isFinite` é usado para validar se um valor de string é um número regular:

//     ```javascript
//     let num = +prompt("Digite um número", '');
//     // será true a menos que você digite Infinity, -Infinity ou algo que não seja um número
//     alert( isFinite(num) );
//     ```

//     Observe que uma string vazia ou apenas com espaços é tratada como `0` em todas as funções numéricas, incluindo `isFinite`.

// #### `Number.isNaN` e `Number.isFinite`

// Os métodos `Number.isNaN` e `Number.isFinite` são as versões mais "estritas" das funções `isNaN` e `isFinite`. Eles não convertem automaticamente seu argumento em um número, mas verificam se ele pertence ao tipo `number`.

// * **`Number.isNaN(value)`** retorna `true` se o argumento pertencer ao tipo `number` e for `NaN`. Em qualquer outro caso, retorna `false`.

//     ```javascript
//     alert( Number.isNaN(NaN) ); // true
//     alert( Number.isNaN("str" / 2) ); // true

//     // Observe a diferença:
//     alert( Number.isNaN("str") ); // false, porque "str" pertence ao tipo string, não ao tipo number
//     alert( isNaN("str") ); // true, porque isNaN converte a string "str" em um número e obtém NaN como resultado dessa conversão
//     ```

// * **`Number.isFinite(value)`** retorna `true` se o argumento pertencer ao tipo `number` e não for `NaN`/`Infinity`/`-Infinity`. Em qualquer outro caso, retorna `false`.

//     ```javascript
//     alert( Number.isFinite(123) ); // true
//     alert( Number.isFinite(Infinity) ); // false
//     alert( Number.isFinite(2 / 0) ); // false

//     // Observe a diferença:
//     alert( Number.isFinite("123") ); // false, porque "123" pertence ao tipo string, não ao tipo number
//     alert( isFinite("123") ); // true, porque isFinite converte a string "123" em um número 123
//     ```

// De certa forma, `Number.isNaN` e `Number.isFinite` são mais simples e diretos do que as funções `isNaN` e `isFinite`. Na prática, no entanto, `isNaN` e `isFinite` são as mais usadas, pois são mais curtas de escrever.

// #### Comparação com `Object.is`

// Existe um método interno especial `Object.is` que compara valores como `===`, mas é mais confiável para dois casos extremos:

// * Funciona com `NaN`: `Object.is(NaN, NaN) === true`, o que é bom.
// * Os valores `0` e `-0` são diferentes: `Object.is(0, -0) === false`, tecnicamente isso está correto porque internamente o número tem um bit de sinal que pode ser diferente mesmo se todos os outros bits forem zero.

// Em todos os outros casos, `Object.is(a, b)` é o mesmo que `a === b`.

// Mencionamos `Object.is` aqui porque é frequentemente usado na especificação JavaScript. Quando um algoritmo interno precisa comparar dois valores para serem exatamente os mesmos, ele usa `Object.is` (internamente chamado `SameValue`).

// ---

// ### `parseInt` e `parseFloat`

// A conversão numérica usando um `+` ou `Number()` é estrita. Se um valor não for exatamente um número, ele falha:

// ```javascript
// alert( +"100px" ); // NaN
// ```

// A única exceção são os espaços no início ou no final da string, pois são ignorados.

// Mas na vida real, frequentemente temos valores em unidades, como `"100px"` ou `"12pt"` em CSS. Também em muitos países, o símbolo da moeda vem depois do valor, então temos `"19€"` e gostaríamos de extrair um valor numérico disso.

// É para isso que `parseInt` e `parseFloat` servem.

// Eles "leem" um número de uma string até que não consigam mais. Em caso de erro, o número coletado é retornado. A função `parseInt` retorna um inteiro, enquanto `parseFloat` retornará um número de ponto flutuante:

// ```javascript
// alert( parseInt('100px') ); // 100
// alert( parseFloat('12.5em') ); // 12.5
// alert( parseInt('12.3') ); // 12, apenas a parte inteira é retornada
// alert( parseFloat('12.3.4') ); // 12.3, o segundo ponto interrompe a leitura
// ```

// Há situações em que `parseInt`/`parseFloat` retornará `NaN`. Isso acontece quando nenhum dígito pôde ser lido:

// ```javascript
// alert( parseInt('a123') ); // NaN, o primeiro símbolo interrompe o processo
// ```

// #### O segundo argumento de `parseInt(str, radix)`

// A função `parseInt()` possui um segundo parâmetro opcional. Ele especifica a base do sistema numérico, então `parseInt` também pode analisar strings de números hexadecimais, binários e assim por diante:

// ```javascript
// alert( parseInt('0xff', 16) ); // 255
// alert( parseInt('ff', 16) ); // 255, sem 0x também funciona
// alert( parseInt('2n9c', 36) ); // 123456
// ```

// ---

// ### Outras funções matemáticas

// JavaScript possui um objeto `Math` embutido que contém uma pequena biblioteca de funções e constantes matemáticas.

// Alguns exemplos:

// * **`Math.random()`**
//     Retorna um número aleatório de 0 a 1 (não incluindo 1).

//     ```javascript
//     alert( Math.random() ); // 0.1234567894322
//     alert( Math.random() ); // 0.5435252343232
//     alert( Math.random() ); // ... (quaisquer números aleatórios)
//     ```

// * **`Math.max(a, b, c...)`** e **`Math.min(a, b, c...)`**
//     Retorna o maior e o menor de um número arbitrário de argumentos.

//     ```javascript
//     alert( Math.max(3, 5, -10, 0, 1) ); // 5
//     alert( Math.min(1, 2) ); // 1
//     ```

// * **`Math.pow(n, power)`**
//     Retorna `n` elevado à potência dada.

//     ```javascript
//     alert( Math.pow(2, 10) ); // 2 elevado a 10 = 1024
//     ```

// Existem mais funções e constantes no objeto `Math`, incluindo trigonometria, que você pode encontrar na **documentação do objeto Math**.

// ---

// ### Resumo

// Para escrever números com muitos zeros:

// * Anexe `"e"` com a contagem de zeros ao número. Por exemplo: `123e6` é o mesmo que `123` com 6 zeros, `123000000`.
// * Um número negativo após `"e"` faz com que o número seja dividido por 1 com o número de zeros dado. Ex: `123e-6` significa `0.000123` (123 milionésimos).

// Para diferentes sistemas numéricos:

// * Pode-se escrever números diretamente em sistemas hexadecimais (`0x`), octais (`0o`) e binários (`0b`).
// * `parseInt(str, base)` analisa a string `str` em um inteiro no sistema numérico com a `base` dada, $2 \le \text{base} \le 36$.
// * `num.toString(base)` converte um número para uma string no sistema numérico com a `base` fornecida.

// Para testes de números regulares:

// * `isNaN(value)` converte seu argumento para um número e então o testa para ser `NaN`.
// * `Number.isNaN(value)` verifica se seu argumento pertence ao tipo `number` e, se sim, o testa para ser `NaN`.
// * `isFinite(value)` converte seu argumento para um número e então o testa para não ser `NaN`/`Infinity`/`-Infinity`.
// * `Number.isFinite(value)` verifica se seu argumento pertence ao tipo `number` e, se sim, o testa para não ser `NaN`/`Infinity`/`-Infinity`.

// Para converter valores como `12pt` e `100px` para um número:

// * Use `parseInt`/`parseFloat` para a conversão "suave", que lê um número de uma string e então retorna o valor que conseguiu ler antes do erro.

// Para frações:

// * Arredonde usando `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` ou `num.toFixed(precision)`.
// * Certifique-se de lembrar que há perda de precisão ao trabalhar com frações.

// Mais funções matemáticas:

// * Consulte o objeto `Math` quando precisar delas. A biblioteca é muito pequena, mas pode cobrir necessidades básicas.

// ---

