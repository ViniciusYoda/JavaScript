// Definição da lista encadeada
let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

// Impressão recursiva
function printListRecursive(node) {
    if (!node) return;
    console.log(node.value);
    printListRecursive(node.next);
}

// Impressão iterativa
function printListIterative(node) {
    while (node) {
        console.log(node.value);
        node = node.next;
    }
}

console.log('Recursivo:');
printListRecursive(list);

console.log('Iterativo:');
printListIterative(list);