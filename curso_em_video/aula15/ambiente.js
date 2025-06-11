let num = [5, 8, 9, 3]
num.push(1)
num.sort()
console.log(num)
console.log(`O vetor tem ${num.length} posições`)
console.log(`O primeiro valor do vetor é ${num[0]}`)

let valores = [4, 6, 2, 9, 10, 3, 1]

for (val of valores) {
    console.log(val)
}

let pos = num.indexOf(8)
if (pos == 1) {
    console.log('O valor não foi encontrado')
}
console.log(`O valor 8 está na posição ${pos}`)