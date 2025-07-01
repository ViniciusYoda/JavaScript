// -----

// ## Importações Dinâmicas

// As declarações `export` e `import` que abordamos em capítulos anteriores são chamadas de **"estáticas"**. A sintaxe é muito simples e rigorosa.

// Primeiro, não podemos gerar dinamicamente nenhum parâmetro de `import`.

// O caminho do módulo deve ser uma **string primitiva**, não pode ser uma chamada de função. Isso não funcionará:

// ```javascript
// import ... from getModuleName(); // Erro, apenas de "string" é permitido
// ```

// Segundo, não podemos importar condicionalmente ou em tempo de execução:

// ```javascript
// if(...) {
//   import ...; // Erro, não permitido!
// }
// {
//   import ...; // Erro, não podemos colocar import em nenhum bloco
// }
// ```

// Isso ocorre porque `import`/`export` visam fornecer uma base para a estrutura do código. Isso é bom, pois a estrutura do código pode ser analisada, os módulos podem ser reunidos e empacotados em um único arquivo por ferramentas especiais, e as exportações não utilizadas podem ser removidas ("tree-shaken"). Isso só é possível porque a estrutura de importações/exportações é simples e fixa.

// Mas como podemos importar um módulo dinamicamente, sob demanda?

// -----

// ### A expressão `import()`

// A expressão `import(module)` carrega o módulo e retorna uma **promise** que se resolve em um **objeto de módulo** que contém todas as suas exportações. Ela pode ser chamada de qualquer lugar no código.

// Podemos usá-la dinamicamente em qualquer lugar do código, por exemplo:

// ```javascript
// let modulePath = prompt("Qual módulo carregar?");

// import(modulePath)
//   .then(obj => /* <objeto do módulo> */)
//   .catch(err => /* <erro de carregamento, por exemplo, se o módulo não existe> */);
// ```

// Ou, poderíamos usar `let module = await import(modulePath)` se estivéssemos dentro de uma função `async`.

// Por exemplo, se tivermos o seguinte módulo `say.js`:

// ```javascript
// // 📁 say.js
// export function hi() {
//   alert(`Olá`);
// }

// export function bye() {
//   alert(`Tchau`);
// }
// ```

// ...Então a importação dinâmica pode ser assim:

// ```javascript
// let {hi, bye} = await import('./say.js');
// hi();
// bye();
// ```

// Ou, se `say.js` tiver a exportação padrão:

// ```javascript
// // 📁 say.js
// export default function() {
//   alert("Módulo carregado (export default)!");
// }
// ```

// ...Então, para acessá-lo, podemos usar a propriedade `default` do objeto do módulo:

// ```javascript
// let obj = await import('./say.js');
// let say = obj.default;

// // ou, em uma linha: let {default: say} = await import('./say.js');
// say();
// ```

// Aqui está o exemplo completo:

// ```html
// <!doctype html>
// <script>
//   async function load() {
//     let say = await import('./say.js');
//     say.hi(); // Olá!
//     say.bye(); // Tchau!
//     say.default(); // Módulo carregado (export default)!
//   }
// </script>
// <button onclick="load()">Clique em mim</button>
// ```

// **Observação:**

//   * Importações dinâmicas funcionam em **scripts regulares**, elas não exigem `script type="module"`.
//   * Embora `import()` pareça uma chamada de função, é uma **sintaxe especial** que por acaso usa parênteses (semelhante a `super()`). Então, não podemos copiar `import` para uma variável ou usar `call`/`apply` com ele. **Não é uma função.**