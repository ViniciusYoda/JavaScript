function parimpar(n) {
    if (n%2 == 0) {
        console.log('par')
    } else {
        console.log('impar')
    }
}

let res = parimpar(4)
console.log(res)

function soma(n1=0, n2=0) {
    return n1 + n2;
}

console.log(soma(3, 5))

function fatorial(n) {
    if(n == 1){
        return 1
    } else {
        return n * fatorial(n-1)
    }
}

console.log(fatorial(5))