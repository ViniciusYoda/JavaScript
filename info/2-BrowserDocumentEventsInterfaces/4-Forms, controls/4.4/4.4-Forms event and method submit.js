// Aqui está a versão totalmente adaptada para o **português** do conteúdo sobre **eventos e métodos de envio de formulários (`submit`)**:

// ---

// ## 📝 Formulários: evento e método `submit`

// O evento `submit` é acionado quando um formulário é enviado. Ele é geralmente usado para:

// * **Validar os dados** antes de enviar ao servidor.
// * Ou **cancelar o envio** e processar tudo via JavaScript.

// Já o método `form.submit()` permite **enviar o formulário manualmente** com JavaScript. Pode ser útil quando queremos criar e enviar formulários dinamicamente.

// Vamos ver cada um em detalhes:

// ---

// ## 📤 Evento: `submit`

// Existem **duas formas principais** de submeter um formulário:

// 1. Clicar em um `<input type="submit">` ou `<input type="image">`.
// 2. Pressionar **Enter** dentro de um campo `<input>`.

// Ambas as ações disparam o evento `submit` no formulário.
// No manipulador (handler), podemos validar os dados e, caso estejam incorretos, chamar `event.preventDefault()` para **impedir que o formulário seja enviado**.

// ### ✅ Exemplo:

// ```html
// <form onsubmit="alert('Enviando...'); return false;">
//   1. Pressione Enter neste campo: <input type="text" value="Texto"><br>
//   2. Ou clique no botão: <input type="submit" value="Enviar">
// </form>
// ```

// Neste exemplo:

// * Um alerta aparece.
// * O formulário **não é enviado**, pois retornamos `false`.

// ---

// ## 🤔 Relação entre `submit` e `click`

// Se o formulário for enviado **pressionando Enter** em um campo de texto, um evento `click` também é disparado no botão `<input type="submit">`.

// > 🧠 Curioso, porque **não houve clique real**.

// ### Exemplo:

// ```html
// <form onsubmit="return false;">
//   <input type="text" size="30" value="Foque aqui e pressione Enter">
//   <input type="submit" value="Enviar" onclick="alert('Clique detectado')">
// </form>
// ```

// ---

// ## ⚙️ Método: `form.submit()`

// Para enviar um formulário **manualmente** via JavaScript, usamos:

// ```js
// form.submit();
// ```

// ### 🔥 Importante:

// > Ao usar `form.submit()` **o evento `submit` NÃO é disparado**.
// > Isso porque se o script está chamando o envio diretamente, entende-se que ele já fez toda a validação.

// ---

// ### 📦 Exemplo: criando e enviando um formulário dinamicamente

// ```js
// let form = document.createElement('form');
// form.action = 'https://google.com/search';
// form.method = 'GET';

// form.innerHTML = '<input name="q" value="teste">';

// // O formulário precisa estar no DOM para ser enviado
// document.body.append(form);

// // Enviar
// form.submit();
// ```

// ---

// ## ✅ Resumo

// | Conceito          | Descrição                                                                                               |
// | ----------------- | ------------------------------------------------------------------------------------------------------- |
// | `submit` (evento) | Disparado quando o formulário é enviado. Pode ser usado para validar e cancelar com `preventDefault()`. |
// | `form.submit()`   | Envia o formulário via JavaScript. Não dispara o evento `submit`.                                       |
// | Enter no campo    | Também aciona o botão de envio com evento `click`, mesmo sem clique real.                               |

// > 💡 Use `submit` para interceptar o envio e validar os dados.
// > Use `form.submit()` apenas quando precisar enviar o formulário **sem interação direta do usuário**.

// ---

// Se quiser, posso montar um exemplo prático com validação personalizada e envio controlado. Deseja isso?
