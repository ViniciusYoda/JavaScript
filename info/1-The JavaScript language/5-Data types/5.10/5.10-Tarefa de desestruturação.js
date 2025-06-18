// Objeto com informações do usuário
const user = {
    name: "John",
    years: 30
};

// Desestruturação do objeto com renomeação e valor padrão
const {
    name,
    years: age,
    isAdmin = false
} = user;

console.log(name);     // John
console.log(age);      // 30
console.log(isAdmin);  // false