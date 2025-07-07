// Claro! Aqui está a **tradução e adaptação completa para o português** do conteúdo sobre o elemento `<template>`:

// ---

// ## Elemento `<template>`

// O elemento nativo `<template>` serve como **armazenamento de modelos (templates) HTML**. O navegador **ignora seu conteúdo visualmente**, apenas verifica se a **sintaxe está correta**, mas podemos acessar e reutilizar seu conteúdo com JavaScript para criar outros elementos.

// ---

// ### Por que usar `<template>`?

// Na teoria, poderíamos usar qualquer outro elemento invisível no HTML para guardar trechos de marcação. Então, **qual o diferencial do `<template>`?**

// 1. **Permite qualquer conteúdo HTML válido**, mesmo estruturas que normalmente precisam de elementos de contorno.

//    Exemplo:

//    ```html
//    <template>
//      <tr>
//        <td>Conteúdo</td>
//      </tr>
//    </template>
//    ```

//    Se colocássemos `<tr>` diretamente dentro de uma `<div>`, o navegador corrigiria a estrutura automaticamente, adicionando `<table>` ao redor.
//    Já no `<template>`, o conteúdo permanece **exatamente como o escrevemos**.

// 2. Podemos inserir **estilos e scripts** dentro de `<template>`:

//    ```html
//    <template>
//      <style>
//        p { font-weight: bold; }
//      </style>
//      <script>
//        alert("Olá");
//      </script>
//    </template>
//    ```

//    > O navegador trata o conteúdo do `<template>` como **fora do documento**:
//    >
//    > * Estilos **não são aplicados**
//    > * Scripts **não são executados**
//    > * Vídeos com `autoplay` **não são reproduzidos**

// O conteúdo só "ganha vida" (estilos aplicados, scripts executados, etc) **quando é inserido no documento real**.

// ---

// ## Inserindo um `<template>`

// O conteúdo de um `<template>` fica disponível através da propriedade `.content`, que é um **`DocumentFragment`** – um tipo especial de nó do DOM.

// Esse fragmento se comporta como qualquer outro nó DOM, com a diferença de que, ao inseri-lo, **apenas os filhos dele são inseridos**, não o próprio fragmento.

// ### Exemplo:

// ```html
// <template id="modelo">
//   <script>
//     alert("Olá");
//   </script>
//   <div class="mensagem">Olá, mundo!</div>
// </template>

// <script>
//   const elem = document.createElement('div');

//   // Clonamos o conteúdo do template para reutilizá-lo
//   elem.append(modelo.content.cloneNode(true));

//   document.body.append(elem);
//   // O script dentro do <template> será executado agora
// </script>
// ```

// ---

// ## Usando `<template>` com Shadow DOM

// Vamos reescrever um exemplo anterior com Shadow DOM usando `<template>`:

// ```html
// <template id="modelo">
//   <style> p { font-weight: bold; } </style>
//   <p id="mensagem"></p>
// </template>

// <div id="elemento">Clique aqui</div>

// <script>
//   elemento.onclick = function() {
//     elemento.attachShadow({mode: 'open'});

//     // Inserimos o conteúdo clonado do template
//     elemento.shadowRoot.append(modelo.content.cloneNode(true));

//     // Agora podemos modificar o conteúdo normalmente
//     elemento.shadowRoot.getElementById('mensagem').innerHTML = "Olá das sombras!";
//   };
// </script>
// ```

// Quando chamamos `modelo.content.cloneNode(true)`, os filhos do fragmento (`<style>` e `<p>`) são inseridos no Shadow DOM, formando a seguinte estrutura:

// ```html
// <div id="elemento">
//   #shadow-root
//     <style> p { font-weight: bold; } </style>
//     <p id="mensagem"></p>
// </div>
// ```

// ---

// ## Resumo

// * O `<template>` armazena **modelos HTML invisíveis** no DOM.
// * Seu conteúdo pode conter **qualquer HTML sintaticamente válido**, incluindo elementos como `<tr>` que normalmente exigiriam estrutura completa.
// * O conteúdo do template **não é renderizado**, nem tem efeitos visuais ou de execução enquanto não for inserido no documento.
// * Podemos acessar seu conteúdo com `template.content` e **cloná-lo** com `cloneNode(true)` para reutilização.
// * Quando inserido no DOM, os **scripts são executados**, os estilos aplicados e elementos interativos (como `<video autoplay>`) passam a funcionar.

// ---

// ### Características únicas do `<template>`:

// ✅ O navegador **valida a sintaxe** do HTML dentro dele
// ✅ Permite qualquer tag HTML de alto nível
// ✅ **Não interfere** na renderização até ser usado
// ✅ Ideal para **componentes reutilizáveis**, **Shadow DOM**, e **renderização dinâmica**

// ⚠️ **O `<template>` não possui mecanismos próprios de repetição, substituição de variáveis ou binding.**
// Essas funcionalidades devem ser implementadas com JavaScript ou bibliotecas/frameworks como Vue, React, etc.

// ---

// Se quiser, posso te mostrar como usar `<template>` com JavaScript puro para fazer um sistema de componentes reutilizáveis com dados dinâmicos. Deseja isso?
