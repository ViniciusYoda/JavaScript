// Variáveis

// Na maioria das vezes, um aplicativo JavaScript precisa trabalhar com informações. Eis dois exemplos:

//     Uma loja online – a informação pode incluir produtos sendo vendidos e um carrinho de compras.
//     Um aplicativo de bate-papo – as informações podem incluir usuários, mensagens e muito mais.

// As variáveis são usadas para armazenar essas informações.
// Uma variável

// Uma variável é um “armazenamento chamado” para dados. Podemos usar variáveis para armazenar guloseimas, visitantes e outros dados.

// Para criar uma variável em JavaScript, use o letpalavra-chave.

// A instrução abaixo cria (em outras palavras: declara) uma variável com o nome “mensagem”:

// let message;

// Agora, podemos colocar alguns dados nele usando o operador de atribuição =:

// let message;

// message = 'Hello'; // store the string 'Hello' in the variable named message

// A string agora é salva na área de memória associada à variável. Podemos acessá-lo usando o nome da variável:

// let message;
// message = 'Hello!';

// alert(message); // shows the variable content

// Para ser conciso, podemos combinar a declaração de variável e a atribuição em uma única linha:

// let message = 'Hello!'; // define the variable and assign the value

// alert(message); // Hello!

// Também podemos declarar múltiplas variáveis em uma linha:

// let user = 'John', age = 25, message = 'Hello';

// Isso pode parecer mais curto, mas não recomendamos. Para uma melhor legibilidade, use uma única linha por variável.

// A variante multilinha é um pouco mais longa, mas mais fácil de ler:

// let user = 'John';
// let age = 25;
// let message = 'Hello';

// Algumas pessoas também definem várias variáveis neste estilo multilinha:

// let user = 'John',
//   age = 25,
//   message = 'Hello';

// ...Ou mesmo no estilo “comma-primeiro”:

// let user = 'John'
//   , age = 25
//   , message = 'Hello';

// Tecnicamente, todas essas variantes fazem o mesmo. Então, é uma questão de gosto pessoal e estética.
// varEm vez de let

// Em scripts mais antigos, você também pode encontrar outra palavra-chave: varEm vez de let:

// var message = 'Hello';

// O que é varA palavra-chave é quase a mesma let- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em Também declara uma variável, mas de uma maneira ligeiramente diferente, “antiga escola”.

// Há diferenças subtis entre letE a var, mas eles não importam para nós ainda. Vamos cobri-los em detalhes no capítulo O velho "var".
// Uma analogia da vida real

// Podemos facilmente entender o conceito de uma “variável” se o imaginarmos como uma “caixa” para dados, com um adesivo de nome único nele.

// Por exemplo, a variável messagepode ser imaginado como uma caixa rotulada "message"Com o valor "Hello!"Nele está:

// Podemos colocar qualquer valor na caixa.

// Também podemos mudá-lo quantas vezes quisermos:

// let message;

// message = 'Hello!';

// message = 'World!'; // value changed

// alert(message);

// Quando o valor é alterado, os dados antigos são removidos da variável:

// Também podemos declarar duas variáveis e copiar dados de uma para outra.

// let hello = 'Hello world!';

// let message;

// // copy 'Hello world' from hello into message
// message = hello;

// // now two variables hold the same data
// alert(hello); // Hello world!
// alert(message); // Hello world!

// Declarar duas vezes um erro

// Uma variável deve ser declarada apenas uma vez.

// Uma declaração repetida da mesma variável é um erro:

// let message = "This";

// // repeated 'let' leads to an error
// let message = "That"; // SyntaxError: 'message' has already been declared

// Então, devemos declarar uma variável uma vez e depois referir-se a ela sem let- A . (í a questão: es. , , , íntepeo. . E. .
// Linguagens funcionais

// É interessante notar que existem as chamadas linguagens de programação funcional pura, como Haskell, que proíbem a mudança de valores variáveis.

// Em tais linguagens, uma vez que o valor é armazenado “na caixa”, ele está lá para sempre. Se precisarmos armazenar outra coisa, a linguagem nos obriga a criar uma nova caixa (declarar uma nova variável). Não podemos reutilizar o antigo.

// Embora possa parecer um pouco estranho à primeira vista, essas línguas são capazes de um desenvolvimento sério. Mais do que isso, existem áreas como cálculos paralelos em que esta limitação confere certos benefícios.
// Nomeação variável

// Existem duas limitações em nomes de variáveis em JavaScript:

//     O nome deve conter apenas letras, dígitos ou símbolos. $E a _- A . (í a questão: es. , , , íntepeo. . E.
//     O primeiro personagem não deve ser um dígito.

// Exemplos de nomes válidos:

// let userName;
// let test123;

// Quando o nome contém várias palavras, o camelCase é comumente usado. Isto é: palavras vão uma após a outra, cada palavra, exceto primeiro começando com uma letra maiúscula: myVeryLongName- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em

// O que é interessante – o sinal do dólar '$'e o sublinhado '_'Também pode ser usado em nomes. São símbolos regulares, como letras, sem qualquer significado especial.

// Esses nomes são válidos:

// let $ = 1; // declared a variable with the name "$"
// let _ = 2; // and now a variable with the name "_"

// alert($ + _); // 3

// Exemplos de nomes de variáveis incorretos:

// let 1a; // cannot start with a digit

// let my-name; // hyphens '-' aren't allowed in the name

// Questões de caso

// Variáveis nomeadas appleE a APPLESão duas variáveis diferentes.
// Letras não-latino são permitidas, mas não são recomendadas

// É possível usar qualquer idioma, incluindo letras cirílicas, logogramas chineses e assim por diante, assim:

// let имя = '...';
// let 我 = '...';

// Tecnicamente, não há nenhum erro aqui. Tais nomes são permitidos, mas existe uma convenção internacional para usar o inglês em nomes de variáveis. Mesmo se estivermos escrevendo um pequeno roteiro, ele pode ter uma longa vida pela frente. Pessoas de outros países podem precisar ler em algum momento.
// Nomes reservados

// Há uma lista de palavras reservadas, que não podem ser usadas como nomes de variáveis porque são usadas pela própria língua.

// Por exemplo: let,, , - A class,, , - A return, e functionEles estão reservados.

// O código abaixo dá um erro de sintaxe:

// let let = 5; // can't name a variable "let", error!
// let return = 5; // also can't name it "return", error!

// Uma tarefa sem use strict

// Normalmente, precisamos definir uma variável antes de usá-la. Mas nos velhos tempos, era tecnicamente possível criar uma variável por uma mera atribuição do valor sem usar. let- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comando Isso ainda funciona agora se não colocarmos use strictem nossos scripts para manter a compatibilidade com scripts antigos.

// // note: no "use strict" in this example

// num = 5; // the variable "num" is created if it didn't exist

// alert(num); // 5

// Esta é uma má prática e causaria um erro no modo estrito:

// "use strict";

// num = 5; // error: num is not defined

// Constantes em

// Para declarar uma variável constante (desagradável), use constEm vez de let:

// const myBirthday = '18.04.1982';

// Variáveis declaradas usando constEles são chamados de “constantes”. Eles não podem ser transferidos. Uma tentativa de fazer isso causaria um erro:

// const myBirthday = '18.04.1982';

// myBirthday = '01.01.2001'; // error, can't reassign the constant!

// Quando um programador tem certeza de que uma variável nunca mudará, eles podem declará-la com constpara garantir e comunicar esse fato a todos.
// Constantes de casos mais altos

// Existe uma prática generalizada de usar constantes como alias para valores difíceis de lembrar que são conhecidos antes da execução.

// Tais constantes são nomeadas usando letras maiúsculas e sublinhados.

// Por exemplo, vamos fazer constantes para cores no formato chamado “web” (hexadecimal):

// const COLOR_RED = "#F00";
// const COLOR_GREEN = "#0F0";
// const COLOR_BLUE = "#00F";
// const COLOR_ORANGE = "#FF7F00";

// // ...when we need to pick a color
// let color = COLOR_ORANGE;
// alert(color); // #FF7F00

// Benefícios:

//     COLOR_ORANGEÉ muito mais fácil de lembrar do que "#FF7F00"- A . (í a questão: es. ,
//     É muito mais fácil digitar mal "#FF7F00"Do que COLOR_ORANGE- A . (í a questão: es. , ,
//     Ao ler o código, COLOR_ORANGEÉ muito mais significativo do que #FF7F00- A . (í a questão: es.

// Quando devemos usar capitais para uma constante e quando devemos nomeá-la normalmente? Vamos deixar isso claro.

// Ser um “constante” significa apenas que o valor de uma variável nunca muda. Mas algumas constantes são conhecidas antes da execução (como um valor hexadecimal para vermelho) e algumas constantes são calculadas em tempo de execução, durante a execução, mas não mudam após a sua atribuição inicial.

// Por exemplo:

// const pageLoadTime = /* time taken by a webpage to load */;

// O valor de pageLoadTimenão é conhecido antes do carregamento da página, por isso é chamado normalmente. Mas ainda é uma constante porque não muda após a tarefa.

// Em outras palavras, as constantes de nome de capital são usadas apenas como aliases para valores “deficientes difíceis”.
// Nomear as coisas certas

// Falando sobre variáveis, há mais uma coisa extremamente importante.

// Um nome de variável deve ter um significado limpo e óbvio, descrevendo os dados que armazena.

// A nomeação variável é uma das habilidades mais importantes e complexas em programação. Uma olhada em nomes de variáveis pode revelar qual código foi escrito por um iniciante versus um desenvolvedor experiente.

// Em um projeto real, a maior parte do tempo é gasto modificando e estendendo uma base de código existente em vez de escrever algo completamente separado do zero. Quando retornamos a algum código depois de fazer outra coisa por um tempo, é muito mais fácil encontrar informações bem rotuladas. Ou, em outras palavras, quando as variáveis têm bons nomes.

// Por favor, gaste tempo pensando no nome certo para uma variável antes de declará-la. Fazer isso vai retribuir-lhe generosamente.

// Algumas regras boas para ofollow são:

//     Use nomes legíveis como userNameou a shoppingCart- A . (í a questão: es. , ,
//     Fique longe de abreviaturas ou nomes curtos como a,, , - A , de pé sobre o que sobre o rodeas de rodeas de rodeas de rode b, e cA não ser que você saiba o que está fazendo.
//     Faça os nomes de forma máxima descritiva e concisa. Exemplos de nomes ruins são dataE a value- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão . (em, proprio, e os comandos e. . sobre a questão , , Tais nomes não dizem nada. Não há problema em usá-los se o contexto do código o torna excepcionalmente óbvio quais dados ou valor a variável está referenciando.
//     Concorde com os termos dentro de sua equipe e em sua mente. Se um visitante do site é chamado de “usuário”, então devemos nomear variáveis relacionadas currentUserou a newUserEm vez de currentVisitorou a newManInTown- A . (í a questão: es. , , , íntepeo. . E. . es. sobre

// Parece simples? Na verdade, é, mas a criação de nomes de variáveis descritivos e concisos na prática não é. Vá em frente.
// Reutilizar ou criar?

// E a última nota. Existem alguns programadores preguiçosos que, em vez de declarar novas variáveis, tendem a reutilizar as existentes.

// Como resultado, suas variáveis são como caixas nas quais as pessoas jogam coisas diferentes sem mudar seus adesivos. O que está dentro da caixa agora? - Quem sabe? Precisamos chegar mais perto e verificar.

// Esses programadores economizam um pouco na declaração variável, mas perdem dez vezes mais em depuração.

// Uma variável extra é o bem, não o mal.

// Os minificadores JavaScript modernos e os navegadores otimizam o código bem o suficiente, para que ele não crie problemas de desempenho. Usar variáveis diferentes para valores diferentes pode até ajudar o mecanismo a otimizar seu código.
// Sumário

// Podemos declarar variáveis para armazenar dados usando o var,, , - A , de pé sobre o que sobre o rodeas de rodeas de let, ou constpalavras-chave.

//     letÉ uma declaração variável moderna.
//     varÉ uma declaração variável da velha escola. Normalmente não o usamos, mas cobriremos diferenças sutis de letno capítulo O velho "var", apenas no caso de você precisar deles.
//     const- É como let, mas o valor da variável não pode ser alterado.

// As variáveis devem ser nomeadas de uma forma que nos permita entender facilmente o que está dentro delas.