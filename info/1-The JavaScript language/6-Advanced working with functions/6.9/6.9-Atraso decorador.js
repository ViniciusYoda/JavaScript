function delay(f, ms) {
    return function(...args) {
        setTimeout(() => f.apply(this, args), ms);
    };
}

// Exemplo de uso:
function sayHi(name) {
    console.log(`Olá, ${name}!`);
}

let sayHiDelayed = delay(sayHi, 1000);

sayHiDelayed("Luana"); // Exibe "Olá, Luana!" após 1 segundo