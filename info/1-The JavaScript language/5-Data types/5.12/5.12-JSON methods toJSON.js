// Aqui está o texto totalmente adaptado e traduzido para o português:

// ---

// **Métodos JSON, toJSON**

// Suponha que temos um objeto complexo e queremos convertê-lo em uma string, seja para enviá-lo pela rede ou apenas para exibi-lo em um log.

// Naturalmente, essa string deve incluir todas as propriedades importantes.

// Podemos implementar essa conversão assim:

// ```javascript
// let usuario = {
//   nome: "João",
//   idade: 30,

//   toString() {
//     return `{nome: "${this.nome}", idade: ${this.idade}}`;
//   }
// };

// alert(usuario); // {nome: "João", idade: 30}
// ```

// Mas durante o desenvolvimento, novas propriedades podem ser adicionadas, antigas podem ser renomeadas ou removidas. Atualizar o método `toString` toda vez pode ser um problema. Poderíamos tentar fazer um loop sobre as propriedades, mas e se o objeto for complexo e tiver objetos aninhados? Teríamos que implementar a conversão deles também.

// Felizmente, não há necessidade de escrever tudo isso manualmente. Essa tarefa já tem uma solução.

// ---

// ### JSON.stringify

// O JSON (JavaScript Object Notation) é um formato geral para representar valores e objetos. Está descrito no padrão RFC 4627. Inicialmente foi feito para JavaScript, mas hoje muitas linguagens têm bibliotecas para lidar com ele. Por isso, é muito usado na troca de dados entre cliente e servidor, mesmo que o servidor use Ruby, PHP, Java ou qualquer outra linguagem.

// O JavaScript fornece dois métodos principais:

// * `JSON.stringify` para converter objetos em JSON.
// * `JSON.parse` para converter JSON de volta para um objeto.

// Por exemplo, aqui usamos `JSON.stringify` em um aluno:

// ```javascript
// let aluno = {
//   nome: 'João',
//   idade: 30,
//   eAdmin: false,
//   cursos: ['html', 'css', 'js'],
//   conjuge: null
// };

// let json = JSON.stringify(aluno);

// alert(typeof json); // Obtemos uma string!

// alert(json);
// /* Objeto codificado em JSON:
// {
//   "nome": "João",
//   "idade": 30,
//   "eAdmin": false,
//   "cursos": ["html", "css", "js"],
//   "conjuge": null
// }
// */
// ```

// O método `JSON.stringify(aluno)` pega o objeto e o converte para uma string.

// Essa string JSON resultante é chamada de objeto serializado, ou stringificado, ou ainda "marshalled". Está pronta para ser enviada ou armazenada.

// **Importante:** Um objeto codificado em JSON tem algumas diferenças em relação ao literal de objeto JavaScript:

// * Strings usam aspas duplas. Nada de aspas simples ou crases em JSON. Então `'João'` vira `"João"`.
// * Os nomes das propriedades também devem ter aspas duplas obrigatoriamente. Por exemplo, `idade: 30` vira `"idade": 30`.

// ---

// ### JSON.stringify em valores primitivos

// O método também pode ser aplicado a valores primitivos.

// O JSON suporta os seguintes tipos de dados:

// * Objetos `{ ... }`
// * Arrays `[ ... ]`
// * Primitivos:

//   * strings,
//   * números,
//   * booleanos (`true`/`false`),
//   * `null`

// Exemplos:

// ```javascript
// alert( JSON.stringify(1) ); // 1
// alert( JSON.stringify('teste') ); // "teste"
// alert( JSON.stringify(true) ); // true
// alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
// ```

// ---

// ### O que é ignorado por JSON.stringify

// JSON é um formato puramente de dados, independente de linguagem. Por isso, algumas coisas específicas do JavaScript são ignoradas:

// * Propriedades que são funções (métodos).
// * Propriedades com chaves `Symbol`.
// * Propriedades com valor `undefined`.

// Exemplo:

// ```javascript
// let usuario = {
//   dizerOi() { alert("Olá"); }, // ignorado
//   [Symbol("id")]: 123,         // ignorado
//   algo: undefined              // ignorado
// };

// alert( JSON.stringify(usuario) ); // {} (objeto vazio)
// ```

// Normalmente, isso é o comportamento desejado. Mas veremos adiante como personalizar o processo.

// O bom é que objetos aninhados são convertidos automaticamente:

// ```javascript
// let evento = {
//   titulo: "Conferência",
//   sala: {
//     numero: 23,
//     participantes: ["joao", "ana"]
//   }
// };

// alert( JSON.stringify(evento) );
// ```

// ---

// ### Limitação importante: Referências circulares

// JSON não permite referências circulares.

// Exemplo que gera erro:

// ```javascript
// let sala = { numero: 23 };

// let evento = {
//   titulo: "Conferência",
//   participantes: ["joao", "ana"]
// };

// evento.local = sala;
// sala.ocupadaPor = evento;

// JSON.stringify(evento); // Erro: Estrutura circular
// ```

// ---

// ### Excluindo e transformando: replacer

// A sintaxe completa de `JSON.stringify` é:

// ```javascript
// let json = JSON.stringify(valor[, replacer, espaço]);
// ```

// Onde:

// * **valor:** o valor a ser codificado.
// * **replacer:** um array de propriedades ou uma função `(chave, valor)` para transformar os dados.
// * **espaço:** número de espaços para formatação.

// **Exemplo com array de propriedades (replacer):**

// ```javascript
// alert( JSON.stringify(evento, ['titulo', 'participantes']) );
// // {"titulo":"Conferência","participantes":[{},{}]}
// ```

// Agora, incluindo mais propriedades:

// ```javascript
// alert( JSON.stringify(evento, ['titulo', 'participantes', 'local', 'nome', 'numero']) );
// ```

// **Usando uma função como replacer:**

// ```javascript
// alert( JSON.stringify(evento, function replacer(chave, valor) {
//   if (chave == 'ocupadaPor') return undefined;
//   return valor;
// }));
// ```

// Essa função é chamada recursivamente para cada par chave/valor, incluindo itens de arrays e objetos aninhados.

// ---

// ### Formatação bonita: espaço

// O terceiro argumento de `JSON.stringify` define a quantidade de espaços para indentar o JSON:

// ```javascript
// alert(JSON.stringify(usuario, null, 2));
// ```

// Resultado:

// ```json
// {
//   "nome": "João",
//   "idade": 25,
//   "funcoes": {
//     "eAdmin": false,
//     "eEditor": true
//   }
// }
// ```

// O valor também pode ser uma string (tipo `'\t'` para usar tabulações).

// ---

// ### Personalizando com toJSON

// Assim como usamos `toString` para conversão em string, podemos criar um método `toJSON` para conversão personalizada em JSON.

// Exemplo com `Date` (que já possui um `toJSON` interno):

// ```javascript
// let evento = {
//   titulo: "Conferência",
//   data: new Date(Date.UTC(2017, 0, 1)),
//   sala
// };

// alert( JSON.stringify(evento) );
// ```

// Criando um `toJSON` customizado:

// ```javascript
// let sala = {
//   numero: 23,
//   toJSON() {
//     return this.numero;
//   }
// };

// alert( JSON.stringify(sala) ); // 23
// ```

// ---

// ### JSON.parse

// Para ler um JSON-string de volta para objeto, usamos `JSON.parse`.

// Sintaxe:

// ```javascript
// let valor = JSON.parse(str[, reviver]);
// ```

// * **str:** A string JSON.
// * **reviver:** Uma função opcional que transforma os valores.

// Exemplo:

// ```javascript
// let numeros = "[0, 1, 2, 3]";
// numeros = JSON.parse(numeros);
// alert( numeros[1] ); // 1
// ```

// Para objetos aninhados:

// ```javascript
// let dadosUsuario = '{ "nome": "João", "idade": 35, "eAdmin": false, "amigos": [0,1,2,3] }';
// let usuario = JSON.parse(dadosUsuario);
// alert( usuario.amigos[1] ); // 1
// ```

// ---

// ### Erros comuns ao escrever JSON manualmente

// ```javascript
// let json = `{
//   nome: "João",                     // Erro: Nome de propriedade sem aspas
//   "sobrenome": 'Silva',             // Erro: Valor com aspas simples
//   'eAdmin': false,                  // Erro: Chave com aspas simples
//   "aniversario": new Date(2000, 2, 3), // Erro: JSON não aceita "new", só valores literais
//   "amigos": [0,1,2,3]               // Este está correto
// }`;
// ```

// JSON também **não permite comentários**. Se quiser usar JSON com comentários, procure por um formato como **JSON5** (não padrão).

// ---

// ### Usando reviver

// Suponha que recebemos do servidor o seguinte JSON:

// ```javascript
// let str = '{"titulo":"Conferência","data":"2017-11-30T12:00:00.000Z"}';
// ```

// Ao fazer:

// ```javascript
// let evento = JSON.parse(str);
// alert( evento.data.getDate() ); // Erro!
// ```

// A propriedade `data` é apenas uma string.

// Para transformar isso corretamente:

// ```javascript
// let evento = JSON.parse(str, function(chave, valor) {
//   if (chave == 'data') return new Date(valor);
//   return valor;
// });
// alert( evento.data.getDate() ); // Agora funciona!
// ```

// Funciona também com objetos aninhados:

// ```javascript
// let agenda = `{
//   "eventos": [
//     {"titulo":"Conferência","data":"2017-11-30T12:00:00.000Z"},
//     {"titulo":"Aniversário","data":"2017-04-18T12:00:00.000Z"}
//   ]
// }`;

// agenda = JSON.parse(agenda, function(chave, valor) {
//   if (chave == 'data') return new Date(valor);
//   return valor;
// });

// alert( agenda.eventos[1].data.getDate() ); // Funciona!
// ```

// ---

// ### Resumo

// * **JSON** é um formato de dados com um padrão independente, com suporte em várias linguagens.
// * Suporta **objetos simples**, **arrays**, **strings**, **números**, **booleanos** e **null**.
// * O JavaScript oferece os métodos **`JSON.stringify`** (para serializar) e **`JSON.parse`** (para ler JSON).
// * Ambos permitem o uso de funções transformadoras.
// * Se um objeto tiver **`toJSON`**, ele será chamado automaticamente durante a serialização.

// ---

