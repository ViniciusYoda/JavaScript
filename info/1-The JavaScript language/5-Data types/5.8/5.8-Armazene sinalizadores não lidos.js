// Lista de mensagens
const messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" }
];

// WeakSet para armazenar mensagens lidas
const readMessages = new WeakSet();

// Marca mensagens como lidas
function markAsRead(message) {
  readMessages.add(message);
}

// Verifica se a mensagem foi lida
function isRead(message) {
  return readMessages.has(message);
}

// Exemplo de uso
markAsRead(messages[0]);
markAsRead(messages[1]);

console.log("Read message 0:", isRead(messages[0])); // true

// Remove a primeira mensagem
messages.shift();