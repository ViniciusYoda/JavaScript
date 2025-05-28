// Interação: alerta, prompt, confirmar
// Como usaremos o navegador como nosso ambiente de demonstração, vamos ver algumas funções para interagir com o usuário: alert, prompte confirm.

// alerta
// Já vimos este. Ele exibe uma mensagem e aguarda o usuário clicar em "OK".

// Por exemplo:

// alert("Hello");
// A minijanela com a mensagem é chamada de janela modal . O termo "modal" significa que o visitante não pode interagir com o restante da página, pressionar outros botões, etc., até que tenha lidado com a janela. Neste caso, até que ele clique em "OK".

// incitar
// A função promptaceita dois argumentos:

// result = prompt(title, [default]);
// Ele mostra uma janela modal com uma mensagem de texto, um campo de entrada para o visitante e os botões OK/Cancelar.

// title
// O texto para mostrar ao visitante.
// default
// Um segundo parâmetro opcional, o valor inicial para o campo de entrada.
// Os colchetes na sintaxe[...]
// Os colchetes defaultna sintaxe acima indicam que o parâmetro é opcional, não obrigatório.

// O visitante pode digitar algo no campo de entrada do prompt e clicar em OK. Então, obtemos esse texto no campo result. Ou ele pode cancelar a entrada pressionando Cancelar ou pressionando a Esctecla , e obtemos nullcomo result.

// A chamada para promptretorna o texto do campo de entrada ou nullse a entrada foi cancelada.

// Por exemplo:

// let age = prompt('How old are you?', 100);

// alert(`You are ${age} years old!`); // You are 100 years old!
// No IE: sempre forneça umdefault
// O segundo parâmetro é opcional, mas se não o fornecermos, o Internet Explorer inserirá o texto "undefined"no prompt.

// Execute este código no Internet Explorer para ver:

// let test = prompt("Test");
// Portanto, para que os prompts tenham uma boa aparência no IE, recomendamos sempre fornecer o segundo argumento:

// let test = prompt("Test", ''); // <-- for IE
// confirmar
// A sintaxe:

// result = confirm(question);
// A função confirmmostra uma janela modal com um questione dois botões: OK e Cancelar.

// O resultado é truese OK for pressionado e falsecaso contrário.

// Por exemplo:

// let isBoss = confirm("Are you the boss?");

// alert( isBoss ); // true if OK is pressed
// Resumo
// Abordamos três funções específicas do navegador para interagir com os visitantes:

// alert
// mostra uma mensagem.
// prompt
// Exibe uma mensagem solicitando que o usuário insira um texto. Ele retorna o texto ou, se o botão Cancelar ou Escfor clicado, null.
// confirm
// Exibe uma mensagem e aguarda que o usuário pressione “OK” ou “Cancelar”. Retorna truepara OK e falsepara Cancelar/ Esc.
// Todos esses métodos são modais: eles pausam a execução do script e não permitem que o visitante interaja com o restante da página até que a janela seja fechada.

// Há duas limitações compartilhadas por todos os métodos acima:

// A localização exata da janela modal é determinada pelo navegador. Normalmente, fica no centro.
// A aparência exata da janela também depende do navegador. Não podemos modificá-la.
// Esse é o preço da simplicidade. Existem outras maneiras de mostrar vitrines mais bonitas e uma interação mais rica com o visitante, mas se "sinos e apitos" não importam muito, esses métodos funcionam perfeitamente.