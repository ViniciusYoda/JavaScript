let head = {
    glasses: 1
}

let table = {
    pen: 3,
    __proto__: head
}

let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table
}
let pockets = {
    money: 2000,
    __proto__: bed
}

console.log(pockets.pen); // 3 (do protótipo table)
console.log(bed.glasses); // 1 (do protótipo head)
console.log(table.glasses); // 1 (do protótipo head)