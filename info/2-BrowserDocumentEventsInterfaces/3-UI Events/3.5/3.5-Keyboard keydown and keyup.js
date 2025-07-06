// Aqui está a **tradução completa e adaptada para o português** do conteúdo sobre eventos de teclado (`keydown` e `keyup`), com explicações claras e contextualizadas para desenvolvedores:

// ---

// ## ⌨️ Teclado: `keydown` e `keyup`

// Antes de falarmos sobre eventos de teclado, é importante lembrar que **em dispositivos modernos há outras formas de inserir dados**, como:

// * Reconhecimento de voz (especialmente em celulares),
// * Copiar/colar com o mouse ou gestos,
// * Teclados virtuais (digitais).

// Por isso, **se o objetivo for capturar qualquer tipo de entrada em um `<input>`**, os eventos de teclado **não são suficientes**. O mais adequado seria usar o evento `input`, que detecta alterações no campo, independentemente da fonte (digitação, colar, etc.).

// > 📌 Falaremos mais sobre o evento `input` no capítulo *Eventos: change, input, cut, copy, paste*.

// Agora, se queremos **reagir a ações no teclado** (inclusive teclados virtuais), como pressionar as setas ou atalhos de teclado (hotkeys), os eventos `keydown` e `keyup` são os corretos.

// ---

// ## 🧪 Teste de eventos de teclado

// Para entender melhor, você pode testar combinações de teclas em um `<input>` ou campo de texto e observar os eventos `keydown` e `keyup`.

// ---

// ## 🔑 Eventos `keydown` e `keyup`

// * `keydown`: Disparado **quando a tecla é pressionada**.
// * `keyup`: Disparado **quando a tecla é solta**.

// ---

// ## 🆚 `event.code` e `event.key`

// ### `event.key` → representa o **caractere real** digitado.

// ### `event.code` → representa a **posição física da tecla** no teclado.

// Por exemplo:

// | Tecla   | `event.key`     | `event.code` |
// | ------- | --------------- | ------------ |
// | Z       | `z` (minúsculo) | `KeyZ`       |
// | Shift+Z | `Z` (maiúsculo) | `KeyZ`       |

// 🔤 Se o usuário estiver usando outro idioma, a tecla física `KeyZ` pode gerar outro caractere (como "Y" em teclados alemães).
// Ou seja, `event.key` depende do **idioma** e `event.code` depende da **posição física**.

// ---

// ## 🧭 Códigos de tecla (`code`)

// Alguns exemplos:

// * Letras: `KeyA`, `KeyB`, ..., `KeyZ`
// * Números: `Digit0`, `Digit1`, ..., `Digit9`
// * Especiais: `Enter`, `Backspace`, `Tab`, `ArrowLeft`, `Escape`

// **Atenção**: `KeyZ` é com "K" maiúsculo. `event.code == "keyZ"` (minúsculo) **não funciona**.

// ---

// ## ⌘ Lidando com atalhos (ex: Ctrl + Z)

// Suponha que você queira capturar `Ctrl+Z` (atalho comum para "desfazer"):

// ```js
// document.addEventListener('keydown', function(event) {
//   if ((event.ctrlKey || event.metaKey) && event.code === 'KeyZ') {
//     alert('Desfazer!')
//   }
// });
// ```

// ### 🧩 Dilema: `key` ou `code`?

// | Situação                                      | Melhor usar  |
// | --------------------------------------------- | ------------ |
// | Precisa do caractere (respeitando idioma)     | `event.key`  |
// | Precisa da tecla física (independe do idioma) | `event.code` |

// ⚠️ Teclados QWERTY (EUA) têm o `Z` onde teclados alemães têm o `Y`. Então:

// * Pressionar `Y` em layout alemão → `event.code = "KeyZ"`
// * Isso pode causar comportamento inesperado se você depender apenas de `code`.

// ---

// ## 🔁 Repetição automática

// Se o usuário **segura uma tecla**, o navegador:

// 1. Dispara vários `keydown` com `event.repeat = true`,
// 2. Depois dispara um único `keyup` ao soltar.

// ---

// ## ⛔ Ações padrão

// Algumas teclas disparam **ações padrão** do navegador/sistema:

// * Digitar um caractere,
// * Deletar (`Backspace`, `Delete`),
// * Scrollar (`PageDown`, `ArrowDown`),
// * Atalhos (ex: `Ctrl+S` abre “Salvar página”).

// Você pode **bloquear essas ações padrão** usando `event.preventDefault()` ou retornando `false` no manipulador:

// ```html
// <input onkeydown="return checkPhoneKey(event.key)" placeholder="Telefone" type="tel">

// <script>
// function checkPhoneKey(key) {
//   return (key >= '0' && key <= '9') || ['+','(',')','-'].includes(key);
// }
// </script>
// ```

// Esse código permite apenas números e os caracteres `+`, `(`, `)` e `-`.

// ### 🚫 Efeitos colaterais

// Esse filtro também bloqueia:

// * Teclas de navegação (`ArrowLeft`, `ArrowRight`)
// * Exclusão (`Backspace`, `Delete`)

// 🔧 Para corrigir:

// ```js
// function checkPhoneKey(key) {
//   return (key >= '0' && key <= '9') ||
//     ['+','(',')','-','ArrowLeft','ArrowRight','Backspace','Delete'].includes(key);
// }
// ```

// Mesmo assim, um usuário ainda pode colar texto, usar teclado de voz ou sugestões do navegador.

// ### ✅ Solução alternativa:

// Use o evento `input` para validar o valor final inserido:

// ```js
// input.addEventListener('input', () => {
//   // validar input.value aqui
// });
// ```

// ---

// ## 📜 Eventos legados (não recomendados)

// Antes, usava-se:

// * Evento `keypress`
// * Propriedades `keyCode`, `charCode`

// Mas havia **muita inconsistência entre navegadores**, então a especificação os **descontinuou**.
// **Não use mais** — os navegadores modernos suportam os eventos `keydown`, `keyup` e as propriedades `key` e `code`.

// ---

// ## 📱 Teclados móveis (IME)

// Nos teclados virtuais, o padrão W3C diz que:

// * `event.keyCode = 229`
// * `event.key = "Unidentified"`

// ⚠️ Às vezes, teclas como `Backspace` e `Setas` funcionam corretamente, mas **não há garantias**.
// Seu código pode não funcionar como esperado em celulares — **sempre teste em dispositivos reais**.

// ---

// ## ✅ Resumo

// * **Teclas pressionadas** sempre geram eventos de teclado.
// * Exceto a tecla `Fn`, que atua no hardware e não gera eventos JS.

// ### Eventos:

// | Evento    | Quando acontece                      |
// | --------- | ------------------------------------ |
// | `keydown` | Ao pressionar a tecla (pode repetir) |
// | `keyup`   | Ao soltar a tecla                    |

// ### Propriedades importantes:

// * `event.code` → posição física da tecla (ex: `KeyA`, `ArrowLeft`)
// * `event.key`  → valor real (ex: `"a"`, `"A"`, `"Enter"`)

// ---

// ### 🔍 Use eventos de teclado para:

// * Atalhos (Ctrl, Alt, Shift + teclas)
// * Teclas de navegação
// * Controle de jogos ou sistemas interativos

// ⚠️ Não use para detectar **entrada de dados em campos**, pois isso pode vir de colagem, reconhecimento de voz, etc. Use `input` e `change` para isso.

// ---

// Se quiser, posso montar um exemplo completo de uso prático com `keydown`, `keyup` e `input` para validação de formulário ou atalhos personalizados. Deseja isso?
