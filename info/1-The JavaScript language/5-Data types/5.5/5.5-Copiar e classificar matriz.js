/**
 * Retorna uma cópia ordenada (case-insensitive) do array de strings.
 * @param {string[]} array
 * @returns {string[]}
 */
function copySorted(array) {
    return array.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
}

const languages = ["HTML", "JavaScript", "CSS"];
const sortedLanguages = copySorted(languages);

console.log(sortedLanguages); // [ 'CSS', 'HTML', 'JavaScript' ]
console.log(languages);       // [ 'HTML', 'JavaScript', 'CSS' ]