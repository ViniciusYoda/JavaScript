// Claro! Aqui está a tradução e adaptação completa para o português do conteúdo sobre **File** e **FileReader**:

// ---

// # File e FileReader

// Um objeto **File** herda de **Blob** e é estendido com recursos relacionados ao sistema de arquivos.

// ## Como obter um File

// Existem duas maneiras principais de se obter um objeto File:

// ### 1. Usando o construtor:

// ```js
// new File(fileParts, fileName, [options])
// ```

// * **fileParts** – um array com valores do tipo Blob, BufferSource ou String.
// * **fileName** – o nome do arquivo (string).
// * **options** – objeto opcional:

//   * `lastModified` – timestamp (número inteiro) da última modificação.

// ### 2. A forma mais comum: via `<input type="file">`, arrastar e soltar (drag’n’drop), ou outras interfaces do navegador.

// Nesses casos, o navegador preenche as informações do arquivo diretamente com dados do sistema operacional.

// ---

// ## Propriedades de File

// Como `File` herda de `Blob`, ele possui as mesmas propriedades e métodos, com as seguintes adições:

// * `name` – nome do arquivo.
// * `lastModified` – timestamp da última modificação.

// ---

// ### Exemplo prático com `<input type="file">`:

// ```html
// <input type="file" onchange="mostrarArquivo(this)">

// <script>
// function mostrarArquivo(input) {
//   let file = input.files[0];

//   alert(`Nome do arquivo: ${file.name}`);         // ex: imagem.png
//   alert(`Última modificação: ${file.lastModified}`); // ex: 1627300000000
// }
// </script>
// ```

// > Observação: o campo `input` pode permitir seleção de múltiplos arquivos, então `input.files` é uma lista. No exemplo, pegamos apenas o primeiro arquivo.

// ---

// # FileReader

// O objeto **FileReader** serve unicamente para **ler dados de objetos Blob ou File**.

// Como a leitura pode demorar (ex: arquivos grandes), os dados são entregues através de **eventos assíncronos**.

// ### Criando um leitor:

// ```js
// let reader = new FileReader();
// ```

// ---

// ## Principais métodos de leitura:

// * `readAsArrayBuffer(blob)` – lê os dados em formato binário (ArrayBuffer).
// * `readAsText(blob, [encoding])` – lê os dados como texto (codificação `utf-8` por padrão).
// * `readAsDataURL(blob)` – lê os dados e converte para uma URL codificada em base64.
// * `abort()` – cancela a leitura.

// > O método que você escolher depende do que você pretende fazer com o conteúdo.

// ---

// ## Eventos do FileReader

// Durante o processo de leitura, os seguintes eventos podem ser disparados:

// * `loadstart` – início da leitura.
// * `progress` – progresso da leitura.
// * `load` – leitura concluída com sucesso.
// * `abort` – leitura foi cancelada.
// * `error` – ocorreu um erro.
// * `loadend` – leitura finalizada (com ou sem sucesso).

// Quando a leitura termina, o conteúdo pode ser acessado por:

// * `reader.result` – contém o resultado da leitura.
// * `reader.error` – contém o erro, caso tenha ocorrido.

// ---

// ### Exemplo de leitura de um arquivo de texto:

// ```html
// <input type="file" onchange="lerArquivo(this)">

// <script>
// function lerArquivo(input) {
//   let file = input.files[0];
//   let reader = new FileReader();

//   reader.readAsText(file); // Lê o arquivo como texto

//   reader.onload = function() {
//     console.log("Conteúdo do arquivo:");
//     console.log(reader.result);
//   };

//   reader.onerror = function() {
//     console.log("Erro ao ler o arquivo:");
//     console.log(reader.error);
//   };
// }
// </script>
// ```

// ---

// ## FileReader também funciona com qualquer Blob

// Como já vimos, `FileReader` não serve apenas para arquivos — ele pode ser usado com **qualquer Blob**.

// Métodos disponíveis:

// * `readAsArrayBuffer(blob)` – para obter um `ArrayBuffer`.
// * `readAsText(blob)` – para texto (como alternativa ao `TextDecoder`).
// * `readAsDataURL(blob)` – para gerar uma URL em base64 (como vimos no capítulo de Blob).

// ---

// ## FileReaderSync (somente para Web Workers)

// Dentro de um **Web Worker**, existe uma versão síncrona do `FileReader`, chamada **FileReaderSync**.

// Essa versão **não utiliza eventos**, e sim retorna o valor diretamente, como funções comuns.

// > Isso só está disponível em *Web Workers*, pois chamadas síncronas podem travar a interface do usuário e são seguras apenas fora da thread principal.

// ---

// ## Resumo

// * `File` herda de `Blob`, com propriedades extras:

//   * `name` (nome do arquivo)
//   * `lastModified` (timestamp da última modificação)
// * Arquivos geralmente são obtidos via `<input type="file">` ou drag’n’drop.
// * O objeto `FileReader` pode ler `Blob` ou `File` em três formatos:

//   * Como texto: `readAsText`
//   * Como binário: `readAsArrayBuffer`
//   * Como base64/data-url: `readAsDataURL`
// * Em muitos casos, **não é necessário ler o conteúdo**. Basta usar `URL.createObjectURL(file)` para gerar uma URL temporária que pode ser usada em `<img>`, `<a>`, etc.
// * O envio de arquivos para o servidor também é simples: objetos `File` são aceitos diretamente em APIs como `fetch` ou `XMLHttpRequest`.

// ---

// Se quiser, posso complementar com exemplos de envio via `fetch`, preview de imagem, ou uso em `canvas`. Deseja continuar com isso?
