// Claro! Abaixo está a **adaptação completa para o português** da seção sobre **objetos `URL`** no JavaScript moderno:

// ---

// ## 🌐 Objetos `URL`

// A classe nativa `URL` oferece uma forma prática de **criar, manipular e analisar URLs**.

// Embora a maioria dos métodos de rede aceite uma **string** como URL, os objetos `URL` podem ser extremamente úteis para **construir URLs dinamicamente**, manipular parâmetros de busca, e garantir o encoding correto.

// ---

// ### 🏗️ Criando uma URL

// A sintaxe para criar um objeto `URL` é:

// ```js
// new URL(url, [base])
// ```

// * `url`: a URL completa ou apenas o caminho relativo.
// * `base`: (opcional) uma URL base, usada se `url` for relativo.

// #### Exemplos:

// ```js
// let url1 = new URL('https://javascript.info/profile/admin');
// let url2 = new URL('/profile/admin', 'https://javascript.info');

// console.log(url1.toString()); // https://javascript.info/profile/admin
// console.log(url2.toString()); // https://javascript.info/profile/admin
// ```

// Criando uma nova URL a partir de outra:

// ```js
// let base = new URL('https://javascript.info/profile/admin');
// let nova = new URL('tester', base);

// console.log(nova); // https://javascript.info/profile/tester
// ```

// ---

// ### 🔍 Componentes de uma URL

// Um objeto `URL` expõe diversas propriedades úteis:

// ```js
// let url = new URL('https://javascript.info/url');

// console.log(url.href);      // https://javascript.info/url
// console.log(url.protocol);  // https:
// console.log(url.host);      // javascript.info
// console.log(url.pathname);  // /url
// ```

// #### Tabela de propriedades úteis:

// | Propriedade            | Descrição                              |
// | ---------------------- | -------------------------------------- |
// | `href`                 | URL completa (equivale a `toString()`) |
// | `protocol`             | Protocolo, com dois-pontos (`https:`)  |
// | `host`                 | Domínio + porta (ex: `site.com:3000`)  |
// | `hostname`             | Apenas o domínio                       |
// | `port`                 | Porta, se houver                       |
// | `pathname`             | Caminho da URL (`/exemplo/pagina`)     |
// | `search`               | Parâmetros de busca (`?chave=valor`)   |
// | `hash`                 | Fragmento da URL (`#secao`)            |
// | `username`, `password` | Se houver autenticação embutida na URL |

// ---

// ## 🧾 `searchParams` – Parâmetros da URL

// A propriedade `url.searchParams` retorna um objeto `URLSearchParams`, com métodos para **manipular parâmetros da query string**:

// ```js
// let url = new URL('https://google.com/search');
// url.searchParams.set('q', 'test me!');

// console.log(url.toString());
// // https://google.com/search?q=test+me%21
// ```

// #### Métodos principais:

// | Método                 | Descrição                                   |
// | ---------------------- | ------------------------------------------- |
// | `.append(nome, valor)` | Adiciona parâmetro (sem remover os antigos) |
// | `.set(nome, valor)`    | Define ou substitui o valor                 |
// | `.get(nome)`           | Retorna o valor do parâmetro                |
// | `.getAll(nome)`        | Retorna todos os valores com esse nome      |
// | `.has(nome)`           | Verifica se existe                          |
// | `.delete(nome)`        | Remove o parâmetro                          |
// | `.sort()`              | Ordena os parâmetros por nome               |

// #### Iterando:

// ```js
// for (let [chave, valor] of url.searchParams) {
//   console.log(`${chave} = ${valor}`);
// }
// ```

// ---

// ## 🔐 Codificação automática

// A classe `URL` cuida automaticamente da **codificação de caracteres especiais**, como espaços, acentos, letras não latinas e símbolos:

// ```js
// let url = new URL('https://ru.wikipedia.org/wiki/Тест');
// url.searchParams.set('key', 'ъ');

// console.log(url.toString());
// // https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
// ```

// ---

// ## ✂️ Codificando strings manualmente

// Antes dos objetos `URL`, usava-se strings e funções de codificação como:

// * `encodeURI` – codifica a URL inteira
// * `decodeURI` – decodifica a URL inteira
// * `encodeURIComponent` – codifica apenas **um componente**
// * `decodeURIComponent` – decodifica um componente

// ### Exemplo com `encodeURIComponent`:

// ```js
// let termo = encodeURIComponent('Rock&Roll');
// let url = `https://google.com/search?q=${termo}`;

// console.log(url);
// // https://google.com/search?q=Rock%26Roll
// ```

// ### Diferença:

// * `encodeURI` **não codifica** caracteres como `&`, `?`, `=`, `#` → bom para URLs completas.
// * `encodeURIComponent` **codifica tudo**, inclusive `&`, `=`, etc → ideal para parâmetros.

// ---

// ## 🔍 Comparação de codificação com `URL`

// A classe `URL` segue o padrão mais recente **RFC3986**, enquanto `encodeURI` e `encodeURIComponent` seguem o padrão antigo **RFC2396**.

// Isso causa diferenças em casos raros, como com endereços IPv6:

// ```js
// let url = 'http://[2607:f8b0:4005:802::1007]/';

// console.log(encodeURI(url));
// // http://%5B2607:f8b0:4005:802::1007%5D/

// console.log(new URL(url).toString());
// // http://[2607:f8b0:4005:802::1007]/
// ```

// ---

// ## ✅ Conclusão

// A classe `URL` é uma ferramenta poderosa para:

// * Construir URLs de forma segura
// * Analisar componentes de uma URL
// * Trabalhar com parâmetros de busca
// * Garantir codificação correta

// Ela substitui com vantagem o uso de strings e funções `encodeURI/component`, além de tornar seu código mais legível e seguro.

// Se quiser, posso te ajudar a criar uma **função utilitária personalizada** para gerar URLs dinamicamente com base em objetos e parâmetros. Deseja?
