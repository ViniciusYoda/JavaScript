// Claro! Aqui está a adaptação completa para o português do texto sobre **WebSocket**:

// ---

// ## WebSocket

// O protocolo WebSocket, descrito na especificação RFC 6455, oferece uma maneira de trocar dados entre navegador e servidor por meio de uma conexão persistente. Os dados podem ser enviados em ambas as direções como “pacotes”, sem quebrar a conexão e sem a necessidade de requisições HTTP adicionais.

// O WebSocket é especialmente útil para serviços que exigem troca contínua de dados, como jogos online, sistemas de negociação em tempo real, entre outros.

// ---

// ### Um exemplo simples

// Para abrir uma conexão WebSocket, precisamos criar um novo objeto `WebSocket` usando o protocolo especial `ws` na URL:

// ```js
// let socket = new WebSocket("ws://javascript.info");
// ```

// Também existe o protocolo criptografado `wss://`. Ele é como o HTTPS para WebSockets.

// **Prefira sempre usar `wss://`**

// O protocolo `wss://` não é só criptografado, mas também mais confiável.

// Isso porque os dados via `ws://` não são criptografados, ficando visíveis para intermediários. Proxies antigos não reconhecem WebSocket, podem ver cabeçalhos “estranhos” e abortar a conexão.

// Por outro lado, `wss://` é WebSocket sobre TLS (igual HTTPS é HTTP sobre TLS), garantindo que os dados sejam criptografados e decodificados somente no destinatário. Assim, os proxies não conseguem ver o conteúdo, mas deixam os dados passarem.

// ---

// ### Eventos principais do WebSocket

// Depois que o socket é criado, devemos escutar seus eventos. Existem 4 eventos principais:

// * `open` – conexão estabelecida,
// * `message` – dados recebidos,
// * `error` – erro no websocket,
// * `close` – conexão fechada.

// Para enviar algo, usamos `socket.send(dados)`.

// Exemplo completo:

// ```js
// let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

// socket.onopen = function(e) {
//   alert("[open] Conexão estabelecida");
//   alert("Enviando dados para o servidor");
//   socket.send("Meu nome é João");
// };

// socket.onmessage = function(event) {
//   alert(`[message] Dados recebidos do servidor: ${event.data}`);
// };

// socket.onclose = function(event) {
//   if (event.wasClean) {
//     alert(`[close] Conexão fechada normalmente, código=${event.code} motivo=${event.reason}`);
//   } else {
//     // por exemplo, processo do servidor morreu ou rede caiu
//     // geralmente event.code é 1006 neste caso
//     alert('[close] Conexão foi interrompida');
//   }
// };

// socket.onerror = function(error) {
//   alert(`[error] Ocorreu um erro`);
// };
// ```

// ---

// ### Como o WebSocket abre a conexão

// Quando criamos `new WebSocket(url)`, a conexão já começa a ser estabelecida.

// Durante a conexão, o navegador envia uma requisição HTTP especial ao servidor, perguntando: “Você suporta WebSocket?”. Se o servidor responder “sim”, a conexão muda para o protocolo WebSocket, que não é mais HTTP.

// Exemplo de cabeçalhos enviados pelo navegador:

// ```
// GET /chat
// Host: javascript.info
// Origin: https://javascript.info
// Connection: Upgrade
// Upgrade: websocket
// Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
// Sec-WebSocket-Version: 13
// ```

// * **Origin**: a origem da página cliente (ex: [https://javascript.info](https://javascript.info)).
// * **Connection: Upgrade** e **Upgrade: websocket** indicam que o cliente quer mudar o protocolo para WebSocket.
// * **Sec-WebSocket-Key**: chave aleatória para garantir suporte do servidor.
// * **Sec-WebSocket-Version**: versão do protocolo WebSocket (13 atualmente).

// O servidor deve responder com status 101 (Switching Protocols), confirmando a mudança, incluindo a chave `Sec-WebSocket-Accept`, que é a chave recebida codificada.

// ---

// ### Extensões e subprotocolos

// Podemos ter cabeçalhos extras:

// * `Sec-WebSocket-Extensions`: lista extensões, como `deflate-frame` para compressão.
// * `Sec-WebSocket-Protocol`: lista subprotocolos (exemplo: `soap`, `wamp`), indicando formatos específicos de dados que serão usados.

// Por exemplo:

// ```js
// let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
// ```

// O servidor deve responder quais protocolos e extensões aceita.

// ---

// ### Transferência de dados

// A comunicação WebSocket consiste em “frames” (quadros) — fragmentos de dados que podem ser:

// * “text frames”: quadros com dados em texto,
// * “binary frames”: quadros com dados binários,
// * “ping/pong frames”: usados para verificar a conexão (servidor envia ping, cliente responde pong),
// * “close frames”: indicam fechamento da conexão.

// No navegador, trabalhamos diretamente apenas com frames de texto e binários.

// O método `socket.send()` pode enviar texto ou dados binários (Blob, ArrayBuffer, etc).

// Ao receber dados, texto vem como string e binário pode ser recebido como Blob (padrão) ou ArrayBuffer (configurável via `socket.binaryType`).

// Exemplo para usar ArrayBuffer:

// ```js
// socket.binaryType = "arraybuffer";

// socket.onmessage = (event) => {
//   // event.data será string ou arraybuffer
// };
// ```

// ---

// ### Controle de envio (Rate limiting)

// Se enviamos dados muito rápido, mas a conexão está lenta, os dados ficam armazenados na memória antes de serem enviados.

// A propriedade `socket.bufferedAmount` indica quantos bytes ainda estão pendentes para envio.

// Podemos usar isso para só enviar mais dados quando o buffer estiver vazio:

// ```js
// setInterval(() => {
//   if (socket.bufferedAmount == 0) {
//     socket.send(proximosDados());
//   }
// }, 100);
// ```

// ---

// ### Fechando a conexão

// Para fechar a conexão, a parte que deseja fechar chama:

// ```js
// socket.close([codigo], [motivo]);
// ```

// * `codigo` é um código numérico (opcional),
// * `motivo` é uma string explicando o motivo (opcional).

// O outro lado recebe isso no evento `onclose`:

// ```js
// socket.onclose = event => {
//   console.log(event.code);   // código do fechamento
//   console.log(event.reason); // motivo
//   console.log(event.wasClean); // true se o fechamento foi limpo
// };
// ```

// Códigos comuns:

// * 1000: fechamento normal (padrão),
// * 1006: conexão perdida (não é possível enviar esse código manualmente),
// * 1001: parte saiu (ex: servidor desligando, usuário saiu da página),
// * 1009: mensagem muito grande,
// * 1011: erro inesperado no servidor.

// ---

// ### Estado da conexão

// A propriedade `socket.readyState` indica o estado atual:

// * 0 — CONNECTING (conectando),
// * 1 — OPEN (conectado),
// * 2 — CLOSING (fechando),
// * 3 — CLOSED (fechado).

// ---

// ### Exemplo de chat com WebSocket

// HTML simples:

// ```html
// <form name="publish">
//   <input type="text" name="message">
//   <input type="submit" value="Enviar">
// </form>

// <div id="messages"></div>
// ```

// JavaScript cliente:

// ```js
// let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// document.forms.publish.onsubmit = function() {
//   let mensagem = this.message.value;
//   socket.send(mensagem);
//   return false;
// };

// socket.onmessage = function(event) {
//   let mensagem = event.data;
//   let div = document.createElement('div');
//   div.textContent = mensagem;
//   document.getElementById('messages').prepend(div);
// };
// ```

// ---

// ### Código básico do servidor (Node.js)

// ```js
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ noServer: true });

// const clients = new Set();

// http.createServer((req, res) => {
//   // Aqui só lidamos com conexões websocket
//   wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
// });

// function onSocketConnect(ws) {
//   clients.add(ws);

//   ws.on('message', (message) => {
//     message = message.slice(0, 50); // limitar mensagem a 50 caracteres

//     for (let client of clients) {
//       client.send(message);
//     }
//   });

//   ws.on('close', () => {
//     clients.delete(ws);
//   });
// }
// ```

// ---

// ### Resumo

// * WebSocket é uma forma moderna de ter conexões persistentes entre navegador e servidor.
// * Não possui limitações de origem cruzada (cross-origin).
// * É bem suportado pelos navegadores.
// * Pode enviar e receber texto e dados binários.
// * API simples, com métodos principais `send()` e `close()`, e eventos `open`, `message`, `error` e `close`.
// * Não inclui por padrão reconexão, autenticação e outros mecanismos de alto nível — para isso, há bibliotecas ou implementações manuais.
// * Pode ser usado junto a servidores HTTP tradicionais, geralmente em subdomínios ou portas diferentes.

// ---

// Se quiser, posso ajudar a criar um projeto prático com WebSocket em português! Quer que eu faça?
