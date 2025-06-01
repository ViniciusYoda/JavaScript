// Funções

// Com muita frequência, precisamos realizar uma ação semelhante em vários pontos do script.

// Por exemplo, podemos querer exibir uma mensagem amigável quando um visitante faz login, logout ou em outras situações.

// As funções são os principais “blocos de construção” de um programa. Elas permitem que o código seja reutilizado diversas vezes sem repetição.

// Já vimos exemplos de funções embutidas (nativas), como alert(mensagem), prompt(mensagem, padrão) e confirm(pergunta). Mas também podemos criar nossas próprias funções.

// Declaração de função

// Para criar uma função, usamos a declaração de função.

// Ela tem esta aparência:

// javascript
// Copiar
// Editar
// function mostrarMensagem() {
//   alert('Olá a todos!');
// }
// A palavra-chave function vem primeiro, depois o nome da função, seguido por uma lista de parâmetros entre parênteses (separados por vírgulas — ou vazios, como no exemplo acima). Em seguida, vem o corpo da função, entre chaves.

// javascript
// Copiar
// Editar
// function nome(parametro1, parametro2, ... parametroN) {
//   // corpo
// }
// Nossa nova função pode ser chamada pelo nome: mostrarMensagem().

// Por exemplo:

// javascript
// Copiar
// Editar
// function mostrarMensagem() {
//   alert('Olá a todos!');
// }

// mostrarMensagem();
// mostrarMensagem();
// A chamada mostrarMensagem() executa o código da função. Neste exemplo, veremos a mensagem duas vezes.

// Este exemplo demonstra claramente um dos principais propósitos das funções: evitar duplicação de código.

// Se precisarmos mudar a mensagem ou a forma como ela é exibida, basta modificar o código em um só lugar: a função.

// Variáveis locais

// Uma variável declarada dentro de uma função só é visível dentro dela.

// Exemplo:

// javascript
// Copiar
// Editar
// function mostrarMensagem() {
//   let mensagem = "Olá, eu sou o JavaScript!"; // variável local
//   alert(mensagem);
// }

// mostrarMensagem(); // Olá, eu sou o JavaScript!

// alert(mensagem); // <-- Erro! A variável é local à função
// Variáveis externas

// Uma função também pode acessar variáveis externas:

// javascript
// Copiar
// Editar
// let nomeUsuario = 'João';

// function mostrarMensagem() {
//   let mensagem = 'Olá, ' + nomeUsuario;
//   alert(mensagem);
// }

// mostrarMensagem(); // Olá, João
// A função tem acesso completo à variável externa e pode até modificá-la:

// javascript
// Copiar
// Editar
// let nomeUsuario = 'João';

// function mostrarMensagem() {
//   nomeUsuario = "Beto"; // (1) modificando a variável externa
//   let mensagem = 'Olá, ' + nomeUsuario;
//   alert(mensagem);
// }

// alert(nomeUsuario); // João (antes da chamada)
// mostrarMensagem();
// alert(nomeUsuario); // Beto (modificado pela função)
// A variável externa só é usada se não houver uma local com o mesmo nome. Se houver, a local "sombra" a externa:

// javascript
// Copiar
// Editar
// let nomeUsuario = 'João';

// function mostrarMensagem() {
//   let nomeUsuario = "Beto"; // variável local
//   let mensagem = 'Olá, ' + nomeUsuario; // Beto
//   alert(mensagem);
// }

// mostrarMensagem();
// alert(nomeUsuario); // João, não foi alterado
// Variáveis globais

// Variáveis declaradas fora de qualquer função são chamadas de globais.

// Elas são visíveis de qualquer função (a menos que sejam sombreadas por variáveis locais).

// É uma boa prática minimizar o uso de variáveis globais. Códigos modernos possuem poucas ou nenhuma. A maioria das variáveis deve estar dentro de funções.

// Parâmetros

// Podemos passar dados para funções usando parâmetros.

// Exemplo com dois parâmetros: de e texto.

// javascript
// Copiar
// Editar
// function mostrarMensagem(de, texto) {
//   alert(de + ': ' + texto);
// }

// mostrarMensagem('Ana', 'Olá!'); // Ana: Olá!
// mostrarMensagem('Ana', 'Tudo bem?'); // Ana: Tudo bem?
// Os valores passados são copiados para variáveis locais.

// Se modificarmos um parâmetro dentro da função, isso não afeta a variável original fora da função:

// javascript
// Copiar
// Editar
// function mostrarMensagem(de, texto) {
//   de = '*' + de + '*';
//   alert(de + ': ' + texto);
// }

// let de = "Ana";

// mostrarMensagem(de, "Oi"); // *Ana*: Oi
// alert(de); // Ana
// Parâmetros x Argumentos

// Parâmetros são as variáveis listadas na declaração da função.

// Argumentos são os valores passados para a função na chamada.

// Valores padrão

// Se uma função for chamada sem fornecer todos os argumentos, os parâmetros faltantes serão undefined.

// javascript
// Copiar
// Editar
// function mostrarMensagem(de, texto = "nenhuma mensagem") {
//   alert(de + ": " + texto);
// }

// mostrarMensagem("Ana"); // Ana: nenhuma mensagem
// mostrarMensagem("Ana", undefined); // Ana: nenhuma mensagem
// Também podemos passar uma expressão como valor padrão:

// javascript
// Copiar
// Editar
// function mostrarMensagem(de, texto = obterMensagemPadrao()) {
//   // obterMensagemPadrao() só será executada se texto não for passado
// }
// Em JavaScript antigo

// Antes, não havia suporte para valores padrão. As pessoas faziam assim:

// javascript
// Copiar
// Editar
// function mostrarMensagem(de, texto) {
//   if (texto === undefined) {
//     texto = 'nenhuma mensagem';
//   }
// }
// Ou com o operador ||:

// javascript
// Copiar
// Editar
// function mostrarMensagem(de, texto) {
//   texto = texto || 'nenhuma mensagem';
// }
// Ou, mais modernamente, com o operador de coalescência nula ??:

// javascript
// Copiar
// Editar
// function mostrarContagem(contagem) {
//   alert(contagem ?? "desconhecida");
// }

// mostrarContagem(0); // 0
// mostrarContagem(null); // desconhecida
// mostrarContagem(); // desconhecida
// Retornando um valor

// Funções podem retornar um valor com return:

// javascript
// Copiar
// Editar
// function soma(a, b) {
//   return a + b;
// }

// let resultado = soma(1, 2);
// alert(resultado); // 3
// O return pode estar em qualquer parte da função e encerra sua execução.

// Podemos usar múltiplos return:

// javascript
// Copiar
// Editar
// function verificarIdade(idade) {
//   if (idade >= 18) {
//     return true;
//   } else {
//     return confirm('Você tem permissão dos pais?');
//   }
// }
// Um return sem valor retorna undefined:

// javascript
// Copiar
// Editar
// function naoFazNada() {}

// alert(naoFazNada() === undefined); // true
// Evite quebrar linha após return, pois o JavaScript insere um ponto e vírgula automaticamente:

// javascript
// Copiar
// Editar
// return
//   resultado + 1; // NÃO FUNCIONA, retornará undefined

// // Correto:
// return (
//   resultado + 1
// );
// Nomeando funções

// Funções são ações, portanto seus nomes costumam ser verbos. O nome deve indicar claramente o que a função faz.

// Prefixos comuns:

// get… – retorna um valor

// calc… – calcula algo

// create… – cria algo

// check… – verifica algo

// Exemplos:

// mostrarMensagem() – mostra uma mensagem

// obterIdade() – retorna a idade

// calcularSoma() – calcula uma soma

// criarFormulario() – cria e retorna um formulário

// verificarPermissao() – retorna true ou false

// Uma função – uma ação

// Cada função deve realizar uma única tarefa, condizente com seu nome.

// Exemplos de quebra dessa regra:

// obterIdade() não deveria exibir alertas (só obter a idade)

// criarFormulario() não deveria inserir no documento (só criar e retornar)

// verificarPermissao() não deveria mostrar mensagens (só retornar true/false)

// Equipes devem manter consistência no uso dos prefixos.

// Nomes curtos

// Funções muito usadas às vezes têm nomes curtos, como $ no jQuery ou _ no Lodash. São exceções — nomes devem ser curtos e descritivos.

// Funções = Comentários

// Funções devem ser curtas e fazer uma única coisa. Dividir uma tarefa grande em várias funções facilita testes, depuração e leitura.

// Compare:

// javascript
// Copiar
// Editar
// function mostrarPrimos(n) {
//   next: for (let i = 2; i < n; i++) {
//     for (let j = 2; j < i; j++) {
//       if (i % j == 0) continue next;
//     }
//     alert(i);
//   }
// }
// Com:

// javascript
// Copiar
// Editar
// function mostrarPrimos(n) {
//   for (let i = 2; i < n; i++) {
//     if (!ehPrimo(i)) continue;
//     alert(i);
//   }
// }

// function ehPrimo(n) {
//   for (let i = 2; i < n; i++) {
//     if (n % i == 0) return false;
//   }
//   return true;
// }
// A segunda versão é mais legível e autoexplicativa. Mesmo que não reutilizemos ehPrimo(), vale a pena criá-la para deixar o código mais claro.

// Resumo

// A declaração de função tem a forma:

// javascript
// Copiar
// Editar
// function nome(param1, param2, ...) {
//   // código
// }
// Valores passados como parâmetros são copiados para variáveis locais.

// Funções podem acessar variáveis externas, mas de dentro para fora.

// Funções podem retornar valores com return.

// Para manter o código limpo e fácil de entender:

// Use principalmente variáveis locais.

// Prefira funções que recebem parâmetros e retornam valores, sem efeitos colaterais.

// Dê nomes descritivos às funções, de preferência verbais.

// Use prefixos padronizados como get, show, create, check, etc.

// Funções são blocos essenciais em scripts. Agora que cobrimos o básico, já podemos começar a criá-las e usá-las. Mas ainda há muito a explorar!