// Objeto original
const user = {
    name: "John Smith",
    age: 35
};

// Converte o objeto para JSON e depois de volta para objeto
const user2 = JSON.parse(JSON.stringify(user));

// Exibe os objetos para comparação
console.log(user);   // { name: 'John Smith', age: 35 }
console.log(user2);  // { name: 'John Smith', age: 35 }