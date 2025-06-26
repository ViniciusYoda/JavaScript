class Animal {
    constructor(nome) {
        this.nome = nome;
    }
}

class Rabbit extends Animal {
    constructor(nome) {
        super(nome); // Chama o construtor da classe pai (Animal)
        this.created = Date.now();
    }
}

let rabbit = new Rabbit("White Rabbit");
console.log(rabbit.nome); // White Rabbit
console.log(rabbit.created); // Timestamp da criação do objeto