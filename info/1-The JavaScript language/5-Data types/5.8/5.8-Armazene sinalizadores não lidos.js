let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

readMessages.add(messages[0])
readMessages.add(messages[1]);

readMessages.add(messages[0]);

console.log("Read message 0: " + readMessages.has(messages[0]))

messages.shift()