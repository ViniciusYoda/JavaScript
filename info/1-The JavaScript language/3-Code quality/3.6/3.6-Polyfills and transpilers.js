// **Polyfills e Transpiladores**

// A linguagem JavaScript está em constante evolução. Novas propostas surgem regularmente, são analisadas e, se consideradas relevantes, são adicionadas à lista em [https://tc39.github.io/ecma262/](https://tc39.github.io/ecma262/) e, a partir daí, seguem o caminho para se tornarem parte da especificação oficial.

// Os times responsáveis pelos motores JavaScript (como V8, SpiderMonkey, etc.) têm suas próprias prioridades sobre o que implementar primeiro. Eles podem optar por implementar propostas que ainda estão em rascunho e adiar recursos que já fazem parte da especificação, seja por considerarem menos interessantes ou mais difíceis de implementar.

// Por isso, é comum que um motor JavaScript implemente apenas parte do padrão.

// Um bom site para verificar o estado atual de suporte aos recursos da linguagem é [https://compat-table.github.io/compat-table/es6/](https://compat-table.github.io/compat-table/es6/) (é uma tabela grande — ainda temos muito o que estudar!).

// Como desenvolvedores, queremos usar os recursos mais modernos. Quanto mais funcionalidades úteis, melhor!

// Mas surge uma questão: **como fazer com que nosso código moderno funcione em navegadores ou ambientes mais antigos, que ainda não entendem esses recursos?**

// Existem duas ferramentas principais para isso:

// * **Transpiladores**
// * **Polyfills**

// Neste capítulo, vamos entender o básico sobre como essas ferramentas funcionam e qual é o papel delas no desenvolvimento web.

// ---

// **Transpiladores**

// Um **transpilador** é um programa especial que converte código-fonte de uma versão da linguagem para outra. Ele é capaz de ler (“parsear”) código moderno e reescrevê-lo usando construções mais antigas da linguagem, de modo que funcione também em motores JavaScript desatualizados.

// Por exemplo, antes de 2020 o JavaScript não possuía o operador de coalescência nula `??`. Assim, se um visitante usar um navegador antigo, ele não entenderá este código:

// ```javascript
// height = height ?? 100;
// ```

// Um transpilador analisaria esse código e o reescreveria assim:

// ```javascript
// height = (height !== undefined && height !== null) ? height : 100;
// ```

// **Antes do transpile:**

// ```javascript
// height = height ?? 100;
// ```

// **Depois do transpile:**

// ```javascript
// height = (height !== undefined && height !== null) ? height : 100;
// ```

// Agora esse código reescrito pode ser executado em navegadores antigos.

// Normalmente, o desenvolvedor roda o transpilador localmente, em seu computador, e só então envia o código transformado para o servidor (ou para o build do projeto).

// Falando em nomes, o **Babel** é um dos transpiladores mais conhecidos e utilizados.

// Sistemas modernos de build, como o **Webpack**, permitem rodar um transpilador automaticamente toda vez que o código é alterado, facilitando bastante sua integração no fluxo de desenvolvimento.

// ---

// **Polyfills**

// Alguns recursos da linguagem não envolvem apenas sintaxe ou operadores, mas também **funções embutidas** no ambiente JavaScript.

// Por exemplo, a função `Math.trunc(n)` remove a parte decimal de um número. Assim, `Math.trunc(1.23)` retorna `1`.

// Em alguns motores JavaScript muito antigos, essa função não existe. Logo, um código que a utiliza falharia.

// Como se trata de uma **função** (e não de sintaxe), não há necessidade de transpilação. Basta **definir essa função** se ela não existir.

// Um script que adiciona ou atualiza funções que estão faltando é chamado de **polyfill**. Ele "preenche" as lacunas de implementação e adiciona comportamentos ausentes.

// No caso do `Math.trunc`, um polyfill poderia ser:

// ```javascript
// if (!Math.trunc) { // se a função não existe
//   Math.trunc = function(number) {
//     // Math.ceil e Math.floor existem até em motores JavaScript antigos
//     return number < 0 ? Math.ceil(number) : Math.floor(number);
//   };
// }
// ```

// O JavaScript é uma linguagem altamente dinâmica. É possível adicionar ou modificar qualquer função — inclusive as embutidas no ambiente.

// Uma biblioteca popular de polyfills é a **core-js**, que oferece suporte a uma grande variedade de recursos e permite incluir apenas os que forem necessários.

// ---

// **Resumo**

// Neste capítulo, a intenção foi te incentivar a estudar os recursos mais modernos (e até experimentais) da linguagem JavaScript — mesmo que ainda não sejam amplamente suportados pelos navegadores.

// Contudo, é essencial lembrar de usar:

// * **Transpiladores**, quando usar novas sintaxes e operadores.
// * **Polyfills**, para garantir que funções ausentes em ambientes antigos sejam adicionadas.

// Com essas ferramentas, seu código funcionará mesmo em navegadores menos atualizados.

// Mais adiante, quando estiver mais familiarizado com JavaScript, você poderá montar um sistema de build com **Webpack** e o plugin **babel-loader**, para que todo esse processo ocorra automaticamente.

// **Boas referências para consultar a compatibilidade de recursos:**

// * [https://compat-table.github.io/compat-table/es6/](https://compat-table.github.io/compat-table/es6/) – compatibilidade da linguagem JavaScript pura.
// * [https://caniuse.com/](https://caniuse.com/) – compatibilidade de recursos relacionados ao navegador.

// **P.S.** O Google Chrome costuma ser o navegador com melhor suporte aos recursos mais recentes da linguagem. Se alguma demonstração de tutorial falhar, tente rodá-la nele. Mas, no geral, a maioria das demos funciona bem em qualquer navegador moderno.
