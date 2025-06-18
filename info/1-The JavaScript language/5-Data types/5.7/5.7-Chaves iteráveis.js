// Cria um novo Map e adiciona um par chave-valor
const map = new Map();
map.set("name", "John");

// Obtém um array das chaves do Map
const keys = [...map.keys()];

// Adiciona uma nova chave ao array (não ao Map)
keys.push("MORE");

// Exibe o array de chaves
console.log(keys); // ["name", "MORE"]