// Claro! Abaixo está a **versão totalmente adaptada para o português** do conteúdo sobre **Server-Sent Events (SSE)**:

// ---

// ## Server-Sent Events (SSE) – Eventos Enviados pelo Servidor

// A especificação *Server-Sent Events* descreve a classe `EventSource`, que mantém uma conexão persistente com o servidor e permite receber eventos enviados por ele.

// Assim como o WebSocket, a conexão é contínua.

// Mas há diferenças importantes:

// | WebSocket                                                      | EventSource                                               |
// | -------------------------------------------------------------- | --------------------------------------------------------- |
// | Comunicação bidirecional (cliente e servidor trocam mensagens) | Comunicação unidirecional (apenas o servidor envia dados) |
// | Suporta dados binários e texto                                 | Suporta apenas texto                                      |
// | Utiliza o protocolo WebSocket                                  | Utiliza HTTP comum                                        |

// Apesar de ser menos poderoso, o `EventSource` é **mais simples** de usar e, muitas vezes, suficiente para aplicações como chats, cotações em tempo real ou notificações.

// ---

// ## Recebendo mensagens

// Para começar a receber mensagens, basta criar um novo `EventSource` com a URL da API:

// ```js
// let eventSource = new EventSource("/eventos/assinatura");
// ```

// O navegador conecta a essa URL e mantém a conexão aberta, aguardando eventos.

// ### Resposta do servidor

// O servidor deve responder com:

// * **Status 200 OK**
// * **Cabeçalho:** `Content-Type: text/event-stream`
// * A conexão deve permanecer aberta, enviando mensagens no seguinte formato:

// ```
// data: Mensagem 1

// data: Mensagem 2

// data: Mensagem 3
// data: com duas linhas
// ```

// **Regras do formato:**

// * O conteúdo da mensagem vem após `data:`.
// * As mensagens são separadas por **dupla quebra de linha** (`\n\n`).
// * Para incluir uma quebra de linha dentro da mensagem, basta enviar mais de um `data:` consecutivo.
// * Mensagens mais complexas geralmente são enviadas como **JSON**:

// ```json
// data: {"usuario":"João","mensagem":"Primeira linha\nSegunda linha"}
// ```

// O navegador dispara um evento `"message"` para cada bloco de mensagem:

// ```js
// eventSource.onmessage = function(event) {
//   console.log("Nova mensagem:", event.data);
// };
// ```

// ---

// ## Requisições entre domínios (CORS)

// Assim como o `fetch`, o `EventSource` suporta requisições entre domínios:

// ```js
// let source = new EventSource("https://outro-dominio.com/eventos");
// ```

// O servidor precisa permitir a origem com o cabeçalho:
// `Access-Control-Allow-Origin: *` ou com a origem específica.

// Para enviar **cookies e credenciais**, use:

// ```js
// let source = new EventSource("https://outro-dominio.com/eventos", {
//   withCredentials: true
// });
// ```

// ---

// ## Reconexão automática

// Quando a conexão é criada com `new EventSource(...)`, o navegador automaticamente tenta reconectar caso ela seja interrompida.

// Essa reconexão ocorre após um pequeno atraso.

// O servidor pode definir esse tempo de espera usando:

// ```
// retry: 15000
// data: A reconexão será feita em 15 segundos
// ```

// > A diretiva `retry:` define o tempo (em milissegundos) que o navegador deve esperar antes de tentar reconectar.

// Para encerrar permanentemente a conexão, o **servidor** deve responder com status `204 No Content`.

// Para o **cliente** encerrar, basta chamar:

// ```js
// eventSource.close();
// ```

// Se o tipo de conteúdo for inválido ou o status HTTP não for `200`, `204`, `301` ou `307`, o evento `error` será disparado e o navegador **não tentará reconectar**.

// ---

// ## Recomeçando do ponto onde parou (id das mensagens)

// Se a conexão for perdida, o cliente pode não saber quais mensagens foram recebidas.

// Para isso, cada mensagem pode conter um identificador:

// ```
// data: Mensagem 1
// id: 1

// data: Mensagem 2
// id: 2
// ```

// Quando uma mensagem com `id:` é recebida, o navegador:

// 1. Armazena o valor em `eventSource.lastEventId`.
// 2. Na próxima conexão, envia `Last-Event-ID: <id>` para o servidor.

// > O campo `id:` **deve vir depois de `data:`** na resposta do servidor.

// ---

// ## Estado da conexão: `readyState`

// O objeto `EventSource` possui a propriedade `readyState` com os seguintes valores:

// * `0` – `EventSource.CONNECTING`: conectando ou reconectando
// * `1` – `EventSource.OPEN`: conexão estabelecida
// * `2` – `EventSource.CLOSED`: conexão encerrada

// ---

// ## Tipos de eventos

// Por padrão, o `EventSource` escuta três tipos de eventos:

// * `message` – mensagem recebida (`event.data`)
// * `open` – conexão aberta
// * `error` – erro (conexão perdida ou falha grave)

// O servidor também pode especificar **eventos personalizados** com `event: nome_do_evento`:

// ```
// event: entrar
// data: João

// data: Olá

// event: sair
// data: João
// ```

// Para tratar eventos personalizados, use `addEventListener`:

// ```js
// eventSource.addEventListener('entrar', event => {
//   alert(`Entrou: ${event.data}`);
// });

// eventSource.addEventListener('sair', event => {
//   alert(`Saiu: ${event.data}`);
// });
// ```

// ---

// ## Exemplo completo

// Servidor envia:

// ```
// data: 1
// id: 1

// data: 2
// id: 2

// data: 3
// id: 3

// data: Tchau!
// id: 4
// ```

// Depois encerra a conexão. O navegador reconecta automaticamente e envia `Last-Event-ID: 4`.

// ---

// ## Resumo

// O `EventSource` cria uma conexão persistente com o servidor e permite o envio de mensagens **unidirecionais (do servidor para o cliente)**.

// ### Vantagens:

// * Reconexão automática
// * Suporte a `id:` e `Last-Event-ID` para retomar eventos
// * Fácil de usar com HTTP tradicional
// * Ideal para atualizações em tempo real simples
// * Suporte nativo nos navegadores modernos (exceto Internet Explorer)

// ### Sintaxe:

// ```js
// let source = new EventSource(url, { withCredentials: true });
// ```

// ### Propriedades:

// * `readyState` – estado atual da conexão
// * `lastEventId` – último ID de mensagem recebido

// ### Método:

// * `close()` – encerra a conexão

// ### Eventos:

// * `message` – nova mensagem recebida
// * `open` – conexão aberta
// * `error` – erro ou perda de conexão

// ### Formato da mensagem do servidor:

// ```
// data: conteúdo da mensagem
// id: identificador (opcional)
// retry: tempo de reconexão em ms (opcional)
// event: nome personalizado (opcional)

// \n\n ← delimita mensagens
// ```

// ---

// Se quiser, posso montar um exemplo completo com servidor em Node.js ou Django que envie eventos para o navegador com `EventSource`. Deseja isso?
