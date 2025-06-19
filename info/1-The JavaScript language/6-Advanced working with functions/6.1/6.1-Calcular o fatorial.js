function factorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new TypeError('O argumento deve ser um número inteiro.');
    }
    if (n < 0) {
        throw new RangeError('O argumento não pode ser negativo.');
    }
    return n <= 1 ? 1 : n * factorial(n - 1);
}

console.log(factorial(5)); // 120