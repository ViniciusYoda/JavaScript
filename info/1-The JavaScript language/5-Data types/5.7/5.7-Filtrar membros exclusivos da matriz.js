/**
 * Retorna um novo array apenas com valores únicos.
 * @param {Array} array - O array de entrada.
 * @returns {Array} - Array com valores únicos.
 */
function getUniqueElements(array) {
  return [...new Set(array)];
}

const values = [
  "Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log(getUniqueElements(values));