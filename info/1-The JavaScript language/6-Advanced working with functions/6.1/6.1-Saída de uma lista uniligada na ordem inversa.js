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

// Versão recursiva (como a sua, mas com comentário)
function printReverseListRecursive(node) {
    if (node.next) {
        printReverseListRecursive(node.next);
    }
    console.log(node.value);
}

// Versão iterativa usando um array como pilha
function printReverseListIterative(node) {
    let stack = [];
    while (node) {
        stack.push(node.value);
        node = node.next;
    }
    while (stack.length) {
        console.log(stack.pop());
    }
}

console.log('Recursivo:');
printReverseListRecursive(list);

console.log('Iterativo:');
printReverseListIterative(list);