// Claro! Aqui está a adaptação para o português sobre **TextDecoder e TextEncoder**:

// ---

// # TextDecoder e TextEncoder

// ## E se os dados binários forem, na verdade, uma string?

// Por exemplo, quando recebemos um arquivo com dados textuais.

// O objeto embutido **TextDecoder** permite ler esses dados e convertê-los para uma string JavaScript, dado o buffer e a codificação.

// ---

// ## TextDecoder

// Primeiro, criamos o decodificador:

// ```js
// let decoder = new TextDecoder([label], [options]);
// ```

// * **label** — a codificação (por padrão "utf-8"), mas outras como "big5", "windows-1251" e muitas mais são suportadas.
// * **options** — objeto opcional:

//   * **fatal** — booleano; se `true`, lança exceção para caracteres inválidos; caso contrário (padrão) substitui por `\uFFFD`.
//   * **ignoreBOM** — booleano; se `true`, ignora o BOM (marca opcional de ordem de bytes Unicode), raramente necessário.

// ---

// ### Para decodificar:

// ```js
// let str = decoder.decode([input], [options]);
// ```

// * **input** — BufferSource para decodificar (ex: Uint8Array).
// * **options** — objeto opcional:

//   * **stream** — `true` para decodificação de streams, quando o decoder é chamado repetidamente com pedaços de dados (chunks). Nesse caso, um caractere multibyte pode estar dividido entre os chunks, e essa opção faz o decoder memorizar os caracteres “incompletos” para decodificá-los quando o próximo chunk chegar.

// ---

// ### Exemplos:

// ```js
// let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
// alert(new TextDecoder().decode(uint8Array)); // Hello

// let uint8Array2 = new Uint8Array([228, 189, 160, 229, 165, 189]);
// alert(new TextDecoder().decode(uint8Array2)); // 你好
// ```

// ---

// ### Decodificando parte do buffer

// Podemos criar uma view subarray para decodificar só uma parte, sem copiar dados:

// ```js
// let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);
// // string está no meio, cria uma view sem copiar
// let binaryString = uint8Array.subarray(1, -1);

// alert(new TextDecoder().decode(binaryString)); // Hello
// ```

// ---

// ## TextEncoder

// Faz o processo inverso — converte uma string em bytes.

// Sintaxe:

// ```js
// let encoder = new TextEncoder();
// ```

// Suporta **apenas** a codificação "utf-8".

// ---

// ### Métodos:

// * `encode(str)` — retorna um **Uint8Array** com a codificação UTF-8 da string.
// * `encodeInto(str, destination)` — codifica `str` no array `destination` (que deve ser um Uint8Array).

// ---

// ### Exemplo:

// ```js
// let encoder = new TextEncoder();

// let uint8Array = encoder.encode("Hello");
// alert(uint8Array); // Uint8Array(5) [72, 101, 108, 108, 111]
// ```

// ---

// Se quiser, posso ajudar com exemplos mais detalhados ou explicar algum ponto!
