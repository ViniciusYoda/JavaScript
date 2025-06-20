// Retorna uma função que verifica se um valor está presente no array fornecido
function inArray(values) {
    return function(element) {
        return values.includes(element);
    };
}

const numbers = [1, 2, 3, 4, 5, 6, 7];
const filtered = numbers.filter(inArray([1, 2, 10]));

console.log(filtered); // [1, 2]