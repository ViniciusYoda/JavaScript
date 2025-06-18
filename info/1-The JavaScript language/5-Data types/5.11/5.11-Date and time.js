// ---
// ## Data e Hora

// Vamos conhecer um novo objeto embutido: **Date**. Ele armazena a data, a hora e fornece métodos para gerenciamento de data/hora.

// Por exemplo, podemos usá-lo para armazenar horários de criação/modificação, para medir o tempo ou simplesmente para exibir a data atual.

// ---
// ### Criação

// Para criar um novo objeto **Date**, chame `new Date()` com um dos seguintes argumentos:

// #### `new Date()`

// Sem argumentos – cria um objeto **Date** para a data e hora atuais:

// ```javascript
// let now = new Date();
// alert( now ); // mostra a data/hora atual
// ```

// #### `new Date(milliseconds)`

// Cria um objeto **Date** com o tempo igual ao número de milissegundos (1/1000 de segundo) passados após 1º de janeiro de 1970 UTC+0.

// ```javascript
// // 0 significa 01.01.1970 UTC+0
// let Jan01_1970 = new Date(0);
// alert( Jan01_1970 );

// // agora adicione 24 horas, obtendo 02.01.1970 UTC+0
// let Jan02_1970 = new Date(24 * 3600 * 1000);
// alert( Jan02_1970 );
// ```

// Um número inteiro que representa o número de milissegundos que passaram desde o início de 1970 é chamado de **timestamp**.

// É uma representação numérica leve de uma data. Sempre podemos criar uma data a partir de um timestamp usando `new Date(timestamp)` e converter um objeto **Date** existente para um timestamp usando o método `date.getTime()` (veja abaixo).

// Datas antes de 01.01.1970 têm timestamps negativos, por exemplo:

// ```javascript
// // 31 de dezembro de 1969
// let Dec31_1969 = new Date(-24 * 3600 * 1000);
// alert( Dec31_1969 );
// ```

// #### `new Date(datestring)`

// Se houver um único argumento, e for uma string, então ela é analisada automaticamente. O algoritmo é o mesmo que `Date.parse` usa, abordaremos isso mais tarde.

// ```javascript
// let date = new Date("2017-01-26");
// alert(date);

// // O horário não é definido, então é considerado meia-noite GMT e
// // é ajustado de acordo com o fuso horário em que o código é executado
// // Então o resultado pode ser
// // Qui Jan 26 2017 11:00:00 GMT+1100 (Horário de Verão do Leste Australiano)
// // ou
// // Qua Jan 25 2017 16:00:00 GMT-0800 (Horário Padrão do Pacífico)
// ```

// #### `new Date(year, month, date, hours, minutes, seconds, ms)`

// Cria a data com os componentes fornecidos no fuso horário local. Apenas os dois primeiros argumentos são obrigatórios.

// * O **ano** deve ter 4 dígitos. Para compatibilidade, 2 dígitos também são aceitos e considerados `19xx`, por exemplo, `98` é o mesmo que `1998` aqui, mas é **fortemente recomendado** sempre usar 4 dígitos.
// * A contagem do **mês** começa com `0` (Jan), até `11` (Dez).
// * O parâmetro **date** é na verdade o dia do mês; se ausente, `1` é assumido.
// * Se **hours/minutes/seconds/ms** estiverem ausentes, eles são considerados iguais a `0`.

// Por exemplo:

// ```javascript
// new Date(2011, 0, 1, 0, 0, 0, 0); // 1 de janeiro de 2011, 00:00:00
// new Date(2011, 0, 1); // o mesmo, horas etc são 0 por padrão
// ```

// A precisão máxima é de 1 ms (1/1000 seg):

// ```javascript
// let date = new Date(2011, 0, 1, 2, 3, 4, 567);
// alert( date ); // 1.01.2011, 02:03:04.567
// ```

// ---
// ### Acessar componentes da data

// Existem métodos para acessar o ano, o mês e assim por diante do objeto **Date**:

// * `getFullYear()`: Obtém o ano (4 dígitos).
// * `getMonth()`: Obtém o mês, **de 0 a 11**.
// * `getDate()`: Obtém o dia do mês, de 1 a 31, o nome do método parece um pouco estranho.
// * `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()`: Obtêm os componentes de tempo correspondentes.

// ---
// #### Não `getYear()`, mas `getFullYear()`

// Muitos motores JavaScript implementam um método não padrão `getYear()`. Este método está obsoleto. Às vezes, ele retorna o ano com 2 dígitos. Por favor, **nunca o use**. Existe `getFullYear()` para o ano.

// Além disso, podemos obter o dia da semana:

// * `getDay()`: Obtém o dia da semana, de `0` (Domingo) a `6` (Sábado). O primeiro dia é sempre Domingo, em alguns países não é assim, mas não pode ser alterado.

// Todos os métodos acima retornam os componentes em relação ao fuso horário local.

// Existem também suas contrapartes UTC, que retornam dia, mês, ano e assim por diante para o fuso horário UTC+0: `getUTCFullYear()`, `getUTCMonth()`, `getUTCDay()`. Basta inserir o `"UTC"` logo após o `"get"`.

// Se seu fuso horário local estiver deslocado em relação ao UTC, o código abaixo mostra horas diferentes:

// ```javascript
// // data atual
// let date = new Date();

// // a hora no seu fuso horário atual
// alert( date.getHours() );

// // a hora no fuso horário UTC+0 (horário de Londres sem horário de verão)
// alert( date.getUTCHours() );
// ```

// Além dos métodos fornecidos, existem dois especiais que não possuem uma variante UTC:

// * `getTime()`: Retorna o timestamp para a data – um número de milissegundos passados desde 1º de janeiro de 1970 UTC+0.
// * `getTimezoneOffset()`: Retorna a diferença entre o UTC e o fuso horário local, em minutos:

// ```javascript
// // se você estiver no fuso horário UTC-1, retorna 60
// // se você estiver no fuso horário UTC+3, retorna -180
// alert( new Date().getTimezoneOffset() );
// ```

// ---
// ### Definindo componentes da data

// Os seguintes métodos permitem definir componentes de data/hora:

// * `setFullYear(year, [month], [date])`
// * `setMonth(month, [date])`
// * `setDate(date)`
// * `setHours(hour, [min], [sec], [ms])`
// * `setMinutes(min, [sec], [ms])`
// * `setSeconds(sec, [ms])`
// * `setMilliseconds(ms)`
// * `setTime(milliseconds)` (define a data inteira em milissegundos desde 01.01.1970 UTC)

// Cada um deles, exceto `setTime()`, tem uma variante UTC, por exemplo: `setUTCHours()`.

// Como podemos ver, alguns métodos podem definir múltiplos componentes de uma vez, por exemplo `setHours`. Os componentes que não são mencionados não são modificados.

// Por exemplo:

// ```javascript
// let today = new Date();

// today.setHours(0);
// alert(today); // ainda hoje, mas a hora é alterada para 0

// today.setHours(0, 0, 0, 0);
// alert(today); // ainda hoje, agora 00:00:00 exato.
// ```

// ---
// ### Autocorreção

// A **autocorreção** é um recurso muito útil dos objetos **Date**. Podemos definir valores fora do intervalo, e ele se autoajustará.

// Por exemplo:

// ```javascript
// let date = new Date(2013, 0, 32); // 32 de janeiro de 2013 ?!?
// alert(date); // ...é 1º de fevereiro de 2013!
// ```

// Componentes de data fora do intervalo são distribuídos automaticamente.

// Digamos que precisamos aumentar a data "28 de fevereiro de 2016" em 2 dias. Pode ser "2 de março" ou "1 de março" no caso de um ano bissexto. Não precisamos pensar nisso. Basta adicionar 2 dias. O objeto **Date** fará o resto:

// ```javascript
// let date = new Date(2016, 1, 28);
// date.setDate(date.getDate() + 2);
// alert( date ); // 1 de março de 2016
// ```

// Esse recurso é frequentemente usado para obter a data após um determinado período de tempo. Por exemplo, vamos obter a data para "70 segundos após agora":

// ```javascript
// let date = new Date();
// date.setSeconds(date.getSeconds() + 70);
// alert( date ); // mostra a data correta
// ```

// Também podemos definir valores zero ou até negativos. Por exemplo:

// ```javascript
// let date = new Date(2016, 0, 2); // 2 de janeiro de 2016

// date.setDate(1); // define o dia 1 do mês
// alert( date );

// date.setDate(0); // o dia mínimo é 1, então o último dia do mês anterior é assumido
// alert( date ); // 31 de dezembro de 2015
// ```

// ---
// ### Data para número, diferença de datas

// Quando um objeto **Date** é convertido para número, ele se torna o timestamp, o mesmo que `date.getTime()`:

// ```javascript
// let date = new Date();
// alert(+date); // o número de milissegundos, o mesmo que date.getTime()
// ```

// O efeito colateral importante: datas podem ser subtraídas, o resultado é a diferença em ms.

// Isso pode ser usado para medições de tempo:

// ```javascript
// let start = new Date(); // começar a medir o tempo

// // fazer o trabalho
// for (let i = 0; i < 100000; i++) {
//   let doSomething = i * i * i;
// }

// let end = new Date(); // terminar a medição do tempo
// alert( `O loop levou ${end - start} ms` );
// ```

// ---
// ### Date.now()

// Se quisermos apenas medir o tempo, não precisamos do objeto **Date**.

// Existe um método especial `Date.now()` que retorna o timestamp atual.

// É semanticamente equivalente a `new Date().getTime()`, mas não cria um objeto **Date** intermediário. Portanto, é mais rápido e não sobrecarrega a coleta de lixo.

// É usado principalmente por conveniência ou quando o desempenho importa, como em jogos em JavaScript ou outras aplicações especializadas.

// Então, isso é provavelmente melhor:

// ```javascript
// let start = Date.now(); // contagem de milissegundos desde 1º de janeiro de 1970

// // fazer o trabalho
// for (let i = 0; i < 100000; i++) {
//   let doSomething = i * i * i;
// }

// let end = Date.now(); // feito
// alert( `O loop levou ${end - start} ms` ); // subtrair números, não datas
// ```

// ---
// ### Benchmarking

// Se queremos um benchmark confiável de uma função que exige muito da CPU, devemos ter cuidado.

// Por exemplo, vamos medir duas funções que calculam a diferença entre duas datas: qual é mais rápida?

// Essas medições de desempenho são frequentemente chamadas de "benchmarks".

// ```javascript
// // temos date1 e date2, qual função retorna mais rápido a diferença em ms?
// function diffSubtract(date1, date2) {
//   return date2 - date1;
// }

// // ou
// function diffGetTime(date1, date2) {
//   return date2.getTime() - date1.getTime();
// }
// ```

// Essas duas fazem exatamente a mesma coisa, mas uma delas usa um `date.getTime()` explícito para obter a data em ms, e a outra depende de uma transformação de data para número. O resultado delas é sempre o mesmo.

// Então, qual é mais rápida?

// A primeira ideia pode ser executá-las muitas vezes seguidas e medir a diferença de tempo. Para o nosso caso, as funções são muito simples, então teremos que fazer isso pelo menos 100.000 vezes.

// Vamos medir:

// ```javascript
// function diffSubtract(date1, date2) {
//   return date2 - date1;
// }

// function diffGetTime(date1, date2) {
//   return date2.getTime() - date1.getTime();
// }

// function bench(f) {
//   let date1 = new Date(0);
//   let date2 = new Date();

//   let start = Date.now();
//   for (let i = 0; i < 100000; i++) f(date1, date2);
//   return Date.now() - start;
// }

// alert( 'Tempo de diffSubtract: ' + bench(diffSubtract) + 'ms' );
// alert( 'Tempo de diffGetTime: ' + bench(diffGetTime) + 'ms' );
// ```

// Uau! Usar `getTime()` é muito mais rápido! Isso porque não há conversão de tipo, é muito mais fácil para os motores otimizarem.

// Ok, temos algo. Mas isso ainda não é um bom benchmark.

// Imagine que, no momento da execução de `bench(diffSubtract)`, a CPU estava fazendo algo em paralelo e estava consumindo recursos. E no momento da execução de `bench(diffGetTime)`, esse trabalho já havia terminado.

// Um cenário bastante real para um sistema operacional multiprocesso moderno.

// Como resultado, o primeiro benchmark terá menos recursos de CPU do que o segundo. Isso pode levar a resultados errados.

// Para um benchmarking mais confiável, todo o conjunto de benchmarks deve ser executado várias vezes.

// Por exemplo, assim:

// ```javascript
// function diffSubtract(date1, date2) {
//   return date2 - date1;
// }

// function diffGetTime(date1, date2) {
//   return date2.getTime() - date1.getTime();
// }

// function bench(f) {
//   let date1 = new Date(0);
//   let date2 = new Date();

//   let start = Date.now();
//   for (let i = 0; i < 100000; i++) f(date1, date2);
//   return Date.now() - start;
// }

// let time1 = 0;
// let time2 = 0;

// // executar bench(diffSubtract) e bench(diffGetTime) 10 vezes alternadamente
// for (let i = 0; i < 10; i++) {
//   time1 += bench(diffSubtract);
//   time2 += bench(diffGetTime);
// }

// alert( 'Tempo total para diffSubtract: ' + time1 );
// alert( 'Tempo total para diffGetTime: ' + time2 );
// ```

// Os motores JavaScript modernos começam a aplicar otimizações avançadas apenas ao "código quente" que é executado muitas vezes (não há necessidade de otimizar coisas raramente executadas). Assim, no exemplo acima, as primeiras execuções não são bem otimizadas. Podemos querer adicionar uma execução de aquecimento:

// ```javascript
// // adicionado para "aquecimento" antes do loop principal
// bench(diffSubtract);
// bench(diffGetTime);

// // agora o benchmark
// for (let i = 0; i < 10; i++) {
//   time1 += bench(diffSubtract);
//   time2 += bench(diffGetTime);
// }
// ```

// ---
// #### Cuidado ao fazer microbenchmarking

// Os motores JavaScript modernos realizam muitas otimizações. Eles podem alterar os resultados de "testes artificiais" em comparação com o "uso normal", especialmente quando medimos algo muito pequeno, como o funcionamento de um operador ou uma função embutida. Portanto, se você realmente deseja entender o desempenho, estude como o motor JavaScript funciona. E então você provavelmente não precisará de microbenchmarks.

// Um ótimo pacote de artigos sobre o V8 pode ser encontrado em [https://mrale.ph](https://mrale.ph).

// ---
// ### Date.parse a partir de uma string

// O método `Date.parse(str)` pode ler uma data de uma string.

// O formato da string deve ser: `YYYY-MM-DDTHH:mm:ss.sssZ`, onde:

// * `YYYY-MM-DD` – é a data: ano-mês-dia.
// * O caractere `"T"` é usado como delimitador.
// * `HH:mm:ss.sss` – é a hora: horas, minutos, segundos e milissegundos.
// * A parte opcional `'Z'` denota o fuso horário no formato `+-hh:mm`. Uma única letra `Z` significaria UTC+0.

// Variantes mais curtas também são possíveis, como `YYYY-MM-DD` ou `YYYY-MM` ou até mesmo `YYYY`.

// A chamada para `Date.parse(str)` analisa a string no formato fornecido e retorna o timestamp (número de milissegundos desde 1º de janeiro de 1970 UTC+0). Se o formato for inválido, retorna `NaN`.

// Por exemplo:

// ```javascript
// let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
// alert(ms); // 1327611110417  (timestamp)
// ```

// Podemos criar instantaneamente um objeto `new Date` a partir do timestamp:

// ```javascript
// let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
// alert(date);
// ```

// ---
// ### Resumo

// Data e hora em JavaScript são representadas com o objeto **Date**. Não podemos criar "apenas data" ou "apenas hora": objetos **Date** sempre carregam ambos.

// * Os meses são contados a partir do zero (sim, janeiro é o mês zero).
// * Os dias da semana em `getDay()` também são contados a partir do zero (que é domingo).
// * **Date** se autoajusta quando componentes fora do intervalo são definidos. Bom para adicionar/subtrair dias/meses/horas.
// * Datas podem ser subtraídas, resultando na diferença em milissegundos. Isso ocorre porque um **Date** se torna o timestamp quando convertido para um número.
// * Use `Date.now()` para obter o timestamp atual rapidamente.
// * Observe que, ao contrário de muitos outros sistemas, os timestamps em JavaScript são em milissegundos, não em segundos.

// Às vezes, precisamos de medições de tempo mais precisas. O próprio JavaScript não tem uma maneira de medir o tempo em microssegundos (1 milionésimo de segundo), mas a maioria dos ambientes fornece isso. Por exemplo, o navegador tem `performance.now()` que fornece o número de milissegundos desde o início do carregamento da página com precisão de microssegundos (3 dígitos após o ponto):

// ```javascript
// alert(`Carregamento iniciado ${performance.now()}ms atrás`);
// // Algo como: "Carregamento iniciado 34731.26000000001ms atrás"
// // .26 são microssegundos (260 microssegundos)
// // mais de 3 dígitos após o ponto decimal são erros de precisão, apenas os 3 primeiros estão corretos
// ```

// O Node.js tem o módulo `microtime` e outras maneiras. Tecnicamente, quase qualquer dispositivo e ambiente permite obter mais precisão, mas não está no **Date**.