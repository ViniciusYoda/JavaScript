/**
 * Retorna o n-ésimo número de Fibonacci.
 * @param {number} n - Posição na sequência (n >= 1)
 * @returns {number|bigint} - O n-ésimo número de Fibonacci
 */
function fib(n) {
    if (!Number.isInteger(n) || n < 1) {
        throw new Error('O parâmetro deve ser um inteiro positivo.');
    }
    if (n <= 2) return 1;
    let a = 1n, b = 1n;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

console.log(fib(3));   // 2n
console.log(fib(7));   // 13n
console.log(fib(77));  // 5527939700884757n