// -----

// ## Propriedades e Métodos Privados e Protegidos

// Um dos princípios mais importantes da programação orientada a objetos é **delimitar a interface interna da externa**.

// Essa é uma prática "obrigatória" no desenvolvimento de qualquer coisa mais complexa do que um aplicativo "olá mundo".

// Para entender isso, vamos nos afastar do desenvolvimento e voltar nossos olhos para o mundo real.

// Geralmente, os dispositivos que estamos usando são bastante complexos. Mas delimitar a interface interna da externa permite usá-los sem problemas.

// -----

// ### Um exemplo da vida real

// Por exemplo, uma máquina de café. Simples por fora: um botão, um display, alguns furos... E, com certeza, o resultado – um ótimo café\! :)

// Mas por dentro... (uma imagem do manual de reparos)

// Muitos detalhes. Mas podemos usá-la sem saber de nada.

// Máquinas de café são bastante confiáveis, não são? Podemos usar uma por anos, e somente se algo der errado – levá-la para reparos.

// O segredo da confiabilidade e simplicidade de uma máquina de café – todos os detalhes são bem ajustados e **ocultos** por dentro.

// Se removermos a tampa protetora da máquina de café, usá-la será muito mais complexo (onde apertar?), e perigoso (pode dar choque elétrico).

// Como veremos, em programação, objetos são como máquinas de café.

// Mas para esconder detalhes internos, não usaremos uma tampa protetora, mas sim uma sintaxe especial da linguagem e convenções.

// -----

// ### Interface interna e externa

// Em programação orientada a objetos, propriedades e métodos são divididos em dois grupos:

//   * **Interface interna** – métodos e propriedades, acessíveis de outros métodos da classe, mas não de fora.
//   * **Interface externa** – métodos e propriedades, acessíveis também de fora da classe.

// Se continuarmos a analogia com a máquina de café – o que está escondido dentro: um tubo da caldeira, elemento de aquecimento, e assim por diante – é sua interface interna.

// Uma interface interna é usada para o objeto funcionar, seus detalhes se usam mutuamente. Por exemplo, um tubo da caldeira é anexado ao elemento de aquecimento.

// Mas por fora, uma máquina de café é fechada pela tampa protetora, para que ninguém possa alcançá-los. Detalhes são ocultos e inacessíveis. Podemos usar seus recursos através da interface externa.

// Então, tudo o que precisamos para usar um objeto é conhecer sua interface externa. Podemos estar completamente alheios a como ele funciona por dentro, e isso é ótimo.

// Essa foi uma introdução geral.

// Em JavaScript, existem dois tipos de campos de objeto (propriedades e métodos):

//   * **Públicos**: acessíveis de qualquer lugar. Eles compõem a interface externa. Até agora, estávamos usando apenas propriedades e métodos públicos.
//   * **Privados**: acessíveis apenas de dentro da classe. Estes são para a interface interna.

// Em muitas outras linguagens, também existem campos "protegidos": acessíveis apenas de dentro da classe e daqueles que a estendem (como privados, mas com acesso de classes herdeiras). Eles também são úteis para a interface interna. Em certo sentido, são mais difundidos do que os privados, porque geralmente queremos que as classes herdeiras tenham acesso a eles.

// Campos protegidos não são implementados em JavaScript no nível da linguagem, mas na prática são muito convenientes, então são emulados.

// Agora faremos uma máquina de café em JavaScript com todos esses tipos de propriedades. Uma máquina de café tem muitos detalhes, não os modelaremos para simplificar (embora pudéssemos).

// -----

// ### Protegendo "waterAmount"

// Vamos criar uma classe simples de máquina de café primeiro:

// ```javascript
// class CoffeeMachine {
//   waterAmount = 0; // a quantidade de água dentro

//   constructor(power) {
//     this.power = power;
//     alert( `Criada uma máquina de café, potência: ${power}` );
//   }
// }

// // cria a máquina de café
// let coffeeMachine = new CoffeeMachine(100);

// // adiciona água
// coffeeMachine.waterAmount = 200;
// ```

// Neste momento, as propriedades `waterAmount` e `power` são públicas. Podemos facilmente obtê-las/defini-las de fora para qualquer valor.

// Vamos mudar a propriedade `waterAmount` para protegida para ter mais controle sobre ela. Por exemplo, não queremos que ninguém a defina abaixo de zero.

// Propriedades protegidas geralmente são prefixadas com um sublinhado `_`.

// Isso não é imposto no nível da linguagem, mas há uma convenção bem conhecida entre os programadores de que tais propriedades e métodos não devem ser acessados de fora.

// Então nossa propriedade será chamada `_waterAmount`:

// ```javascript
// class CoffeeMachine {
//   _waterAmount = 0;

//   set waterAmount(value) {
//     if (value < 0) {
//       value = 0;
//     }
//     this._waterAmount = value;
//   }

//   get waterAmount() {
//     return this._waterAmount;
//   }

//   constructor(power) {
//     this._power = power;
//   }
// }

// // cria a máquina de café
// let coffeeMachine = new CoffeeMachine(100);

// // adiciona água
// coffeeMachine.waterAmount = -10; // _waterAmount se tornará 0, não -10
// ```

// Agora o acesso está sob controle, então definir a quantidade de água abaixo de zero se torna impossível.

// -----

// ### "power" somente leitura

// Para a propriedade `power`, vamos torná-la somente leitura. Às vezes, uma propriedade deve ser definida apenas no momento da criação e nunca mais modificada.

// Esse é exatamente o caso de uma máquina de café: a potência nunca muda.

// Para fazer isso, precisamos apenas criar o *getter*, mas não o *setter*:

// ```javascript
// class CoffeeMachine {
//   // ...

//   constructor(power) {
//     this._power = power;
//   }

//   get power() {
//     return this._power;
//   }
// }

// // cria a máquina de café
// let coffeeMachine = new CoffeeMachine(100);
// alert(`A potência é: ${coffeeMachine.power}W`); // A potência é: 100W

// coffeeMachine.power = 25; // Erro (sem setter)
// ```

// -----

// #### Funções Getter/Setter

// Aqui usamos a sintaxe de *getter*/*setter*.

// Mas na maioria das vezes as funções `get...`/`set...` são preferidas, assim:

// ```javascript
// class CoffeeMachine {
//   _waterAmount = 0;

//   setWaterAmount(value) {
//     if (value < 0) value = 0;
//     this._waterAmount = value;
//   }

//   getWaterAmount() {
//     return this._waterAmount;
//   }
// }

// new CoffeeMachine().setWaterAmount(100);
// ```

// Isso parece um pouco mais longo, mas as funções são mais flexíveis. Elas podem aceitar múltiplos argumentos (mesmo que não precisemos deles agora).

// Por outro lado, a sintaxe `get`/`set` é mais curta, então, em última análise, não há uma regra estrita, cabe a você decidir.

// -----

// ### Campos protegidos são herdados

// Se herdarmos `class MegaMachine extends CoffeeMachine`, nada nos impede de acessar `this._waterAmount` ou `this._power` dos métodos da nova classe.

// Assim, campos protegidos são naturalmente herdáveis. Ao contrário dos privados que veremos abaixo.

// -----

// ### Private "\#waterLimit"

// **Uma adição recente**

// Esta é uma adição recente à linguagem. Ainda não é totalmente suportada em motores JavaScript, ou é parcialmente suportada, exigindo *polyfilling*.

// Há uma proposta JavaScript finalizada, quase no padrão, que fornece suporte em nível de linguagem para propriedades e métodos privados.

// Privados devem começar com `#`. Eles são acessíveis apenas de dentro da classe.

// Por exemplo, aqui está uma propriedade privada `#waterLimit` e o método privado de verificação de água `#fixWaterAmount`:

// ```javascript
// class CoffeeMachine {
//   #waterLimit = 200;

//   #fixWaterAmount(value) {
//     if (value < 0) return 0;
//     if (value > this.#waterLimit) return this.#waterLimit;
//     return value; // Adicionado para retornar o valor fixo
//   }

//   setWaterAmount(value) {
//     this.#waterLimit = this.#fixWaterAmount(value);
//   }
// }

// let coffeeMachine = new CoffeeMachine();

// // não é possível acessar privados de fora da classe
// // coffeeMachine.#fixWaterAmount(123); // Erro: Private field '#fixWaterAmount' must be declared in an enclosing class
// // coffeeMachine.#waterLimit = 1000; // Erro: Private field '#waterLimit' must be declared in an enclosing class
// ```

// No nível da linguagem, `#` é um sinal especial de que o campo é privado. Não podemos acessá-lo de fora ou de classes herdeiras.

// Campos privados não entram em conflito com os públicos. Podemos ter campos privados `#waterAmount` e públicos `waterAmount` ao mesmo tempo.

// Por exemplo, vamos tornar `waterAmount` um acessor para `#waterAmount`:

// ```javascript
// class CoffeeMachine {

//   #waterAmount = 0;

//   get waterAmount() {
//     return this.#waterAmount;
//   }

//   set waterAmount(value) {
//     if (value < 0) value = 0;
//     this.#waterAmount = value;
//   }
// }

// let machine = new CoffeeMachine();

// machine.waterAmount = 100;
// // alert(machine.#waterAmount); // Erro: Private field '#waterAmount' must be declared in an enclosing class
// ```

// Ao contrário dos protegidos, os campos privados são impostos pela própria linguagem. Isso é uma coisa boa.

// Mas se herdarmos de `CoffeeMachine`, não teremos acesso direto a `#waterAmount`. Precisaremos depender do *getter*/*setter* `waterAmount`:

// ```javascript
// class MegaCoffeeMachine extends CoffeeMachine {
//   method() {
//     // alert( this.#waterAmount ); // Erro: Private field '#waterAmount' must be declared in an enclosing class or be an accessible 'this' member
//   }
// }
// ```

// Em muitos cenários, tal limitação é muito severa. Se estendemos uma `CoffeeMachine`, podemos ter razões legítimas para acessar seus internos. É por isso que os campos protegidos são usados com mais frequência, embora não sejam suportados pela sintaxe da linguagem.

// -----

// ### Campos privados não estão disponíveis como `this[name]`

// Campos privados são especiais.

// Como sabemos, geralmente podemos acessar campos usando `this[name]`:

// ```javascript
// class User {
//   constructor(name) {
//     this.name = name;
//   }
//   sayHi() {
//     let fieldName = "name";
//     alert(`Olá, ${this[fieldName]}`);
//   }
// }
// let user = new User("Alice");
// user.sayHi(); // Olá, Alice
// ```

// Com campos privados, isso é impossível: `this['#name']` não funciona. Isso é uma limitação de sintaxe para garantir a privacidade.

// -----

// ### Resumo

// Em termos de POO, a delimitação da interface interna da externa é chamada de **encapsulamento**.

// Ela oferece os seguintes benefícios:

//   * **Proteção para usuários, para que não se prejudiquem.**
//     Imagine que há uma equipe de desenvolvedores usando uma máquina de café. Ela foi feita pela empresa "Best CoffeeMachine" e funciona bem, mas uma tampa protetora foi removida. Assim, a interface interna está exposta.
//     Todos os desenvolvedores são civilizados – eles usam a máquina de café como pretendido. Mas um deles, João, decidiu que era o mais inteligente e fez algumas modificações nos internos da máquina de café. Então a máquina de café falhou dois dias depois.
//     Isso certamente não é culpa de João, mas sim da pessoa que removeu a tampa protetora e permitiu que João fizesse suas manipulações.
//     O mesmo na programação. Se um usuário de uma classe mudar coisas que não deveriam ser mudadas de fora – as consequências são imprevisíveis.

//   * **Manutenibilidade**
//     A situação na programação é mais complexa do que com uma máquina de café da vida real, porque não a compramos apenas uma vez. O código constantemente passa por desenvolvimento e melhoria.
//     Se delimitarmos estritamente a interface interna, o desenvolvedor da classe pode mudar livremente suas propriedades e métodos internos, mesmo sem informar os usuários.
//     Se você é um desenvolvedor de tal classe, é ótimo saber que os métodos privados podem ser renomeados com segurança, seus parâmetros podem ser alterados e até removidos, porque nenhum código externo depende deles.
//     Para os usuários, quando uma nova versão é lançada, pode ser uma revisão total internamente, mas ainda simples de atualizar se a interface externa for a mesma.

//   * **Ocultar complexidade**
//     As pessoas adoram usar coisas que são simples. Pelo menos por fora. O que está dentro é outra coisa.
//     Programadores não são exceção.
//     É sempre conveniente quando os detalhes de implementação são ocultos e uma interface externa simples e bem documentada está disponível.

// Para ocultar uma interface interna, usamos propriedades **protegidas** ou **privadas**:

//   * **Campos protegidos** começam com `_`. Essa é uma convenção bem conhecida, não imposta no nível da linguagem. Os programadores devem acessar um campo que começa com `_` apenas de sua classe e das classes que herdam dela.
//   * **Campos privados** começam com `#`. O JavaScript garante que só podemos acessá-los de dentro da classe.
//     Atualmente, os campos privados não são bem suportados em navegadores, mas podem ser *polyfilled*.

// -----