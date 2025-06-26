let dictionary = Object.create(null, {
    toString: {
        value() {
            return Object.keys(this).join();
        }
    }
})

dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // não funciona, __proto__ é uma propriedade não

for (let key in dictionary) {
    console.log(key); // apple
}

console.log(dictionary); // apple