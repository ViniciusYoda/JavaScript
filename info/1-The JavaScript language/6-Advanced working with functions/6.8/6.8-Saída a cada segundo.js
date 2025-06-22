// 1. Usando setInterval
function printNumbersInterval(from, to) {
    let current = from;
    const timerId = setInterval(() => {
        console.log(current);
        if (current >= to) clearInterval(timerId);
        current++;
    }, 1000);
}

// 2. Usando setTimeout recursivo
function printNumbersTimeout(from, to) {
    let current = from;
    function go() {
        console.log(current);
        if (current < to) {
            setTimeout(go, 1000);
        }
        current++;
    }
    go();
}

// 3. setInterval com função separada
function printNumbersIntervalFunc(from, to) {
    let current = from;
    function go() {
        console.log(current);
        if (current >= to) clearInterval(timerId);
        current++;
    }
    const timerId = setInterval(go, 1000);
}

// Exemplos de uso:
printNumbersInterval(1, 5);
printNumbersTimeout(6, 10);
printNumbersIntervalFunc(11, 15);
