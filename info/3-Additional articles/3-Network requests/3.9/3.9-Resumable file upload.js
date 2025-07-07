// Claro! Aqui está a adaptação completa para o português do texto sobre **upload de arquivo resumível**:

// ---

// ## Upload de Arquivo Resumível

// Com o método `fetch` é bastante fácil enviar um arquivo.

// **Mas e se a conexão cair? Como retomar o upload?**
// Não existe uma opção pronta para isso, mas temos as peças para implementar.

// ### Por que usar upload resumível?

// Uploads resumíveis geralmente precisam mostrar a **barra de progresso**, já que lidamos com arquivos grandes (onde a retomada faz sentido). Como o `fetch` **não permite acompanhar o progresso do upload**, usaremos o `XMLHttpRequest`.

// ---

// ### Evento de progresso não tão útil

// Existe o `xhr.upload.onprogress` que monitora o progresso do upload.

// Mas esse evento **não nos ajuda a retomar o upload** após a queda da conexão, pois ele só indica o que o navegador **enviou**, e não o que o servidor **recebeu**.

// Por exemplo:

// * Os dados podem estar armazenados no buffer de um proxy local.
// * O processo do servidor pode ter falhado e não processado os dados.
// * Ou o dado pode ter se perdido no caminho.

// Por isso, esse evento serve apenas para mostrar uma barra de progresso bonita, mas não para controlar a retomada.

// ---

// ### O que precisamos para retomar o upload?

// Precisamos saber **exatamente quantos bytes o servidor já recebeu**.

// Só o servidor pode informar isso. Então, fazemos uma requisição extra para descobrir esse valor.

// ---

// ## Algoritmo para upload resumível

// 1. **Gerar um ID único para o arquivo:**

// ```js
// let fileId = file.name + '-' + file.size + '-' + file.lastModified;
// ```

// Esse ID identifica unicamente o arquivo a ser enviado. Se o nome, tamanho ou data de modificação mudarem, o ID será diferente.

// 2. **Perguntar ao servidor quantos bytes ele já recebeu desse arquivo:**

// ```js
// let response = await fetch('status', {
//   headers: {
//     'X-File-Id': fileId
//   }
// });

// let startByte = +await response.text();
// ```

// Aqui, o servidor deve rastrear os uploads via cabeçalho `X-File-Id`. Se o arquivo ainda não existir no servidor, ele deve retornar `0`.

// 3. **Enviar o restante do arquivo a partir de `startByte`:**

// ```js
// xhr.open("POST", "upload");

// // Informar o ID do arquivo para o servidor saber qual arquivo estamos enviando
// xhr.setRequestHeader('X-File-Id', fileId);

// // Informar o byte de início para o servidor saber que é uma retomada
// xhr.setRequestHeader('X-Start-Byte', startByte);

// xhr.upload.onprogress = (e) => {
//   console.log(`Enviado ${startByte + e.loaded} de ${startByte + e.total}`);
// };

// // Enviar o pedaço do arquivo a partir de startByte
// xhr.send(file.slice(startByte));
// ```

// ---

// ### Como funciona no servidor?

// O servidor deve verificar se já recebeu parte desse arquivo (baseado em `X-File-Id`), e se o tamanho atual armazenado for exatamente `X-Start-Byte`, então ele **anexa** os novos dados.

// ---

// ## Demonstração

// Há um exemplo com cliente e servidor em Node.js.
// No entanto, em ambientes com proxy (como Nginx) que armazenam uploads, o funcionamento pode ser parcial.

// Você pode baixar o código e executar localmente para ver a demonstração completa.

// ---

// ## Conclusão

// Os métodos modernos de rede permitem construir funcionalidades avançadas como gerenciadores de arquivos:

// * Controle total sobre cabeçalhos,
// * Indicador de progresso,
// * Envio de partes do arquivo.

// Com isso, é possível implementar upload resumível e muito mais.

// ---

// Se quiser, posso ajudar a montar um exemplo completo em frontend e backend para você! Quer?
