// Lista de mensagens
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" }
];

// Mapa fraco para armazenar datas de leitura
let readDates = new WeakMap();

/**
 * Marca uma mensagem como lida com a data atual
 * @param {Object} message
 */
function markAsRead(message) {
  readDates.set(message, new Date());
}

/**
 * Retorna a data em que a mensagem foi lida, ou undefined se não lida
 * @param {Object} message
 */
function getReadDate(message) {
  return readDates.get(message);
}

// Exemplo de uso:
markAsRead(messages[0]);
console.log(getReadDate(messages[0])); // Mostra a data de leitura
console.log(getReadDate(messages[1])); // undefined