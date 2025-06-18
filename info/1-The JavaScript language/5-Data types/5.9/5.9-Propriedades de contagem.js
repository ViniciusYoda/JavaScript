/**
 * Conta o número de propriedades enumeráveis de um objeto.
 * @param {object} obj - O objeto a ser contado.
 * @returns {number} Quantidade de propriedades.
 */
const count = (obj) => obj && typeof obj === 'object' ? Object.keys(obj).length : 0;

const user = {
    name: 'John',
    age: 30
};

console.log(count(user)); // 2