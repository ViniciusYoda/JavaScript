let num = document.querySelector('input#num')
let lista = document.querySelector('select#lista')
let res = document.querySelector('div#res')
let valores = []

function isNumero(n) {
    return Number(n) >= 1 && Number(n) <= 100
}

function inLista(n, l) {
    return l.indexOf(Number(n)) != -1
}

function adicionar() {
    if (isNumero(num.value) && !inLista(num.value, valores)) {
        valores.push(Number(num.value))
        let item = document.createElement('option')
        item.text = `Valor ${num.value} adicionado`
        lista.appendChild(item)
        res.innerHTML = ''
    } else {
        alert('Valor inválido ou já na lista')
    }
    num.value = ''
    num.focus()
}

function finalizar() {
    if (valores.length == 0) {
        alert('Adicione valores antes de finalizar!')
    } else {
        let tot = valores.length
        let maior = valores[0]
        let menor = valores[0]
        let soma = 0

        for (let valor of valores) {
            soma += valor
            if (valor > maior) maior = valor
            if (valor < menor) menor = valor
        }
        let media = soma / tot

        res.innerHTML = ''
        res.innerHTML += `<p>Ao todo, temos <strong>${tot}</strong> números cadastrados.</p>`
        res.innerHTML += `<p>O maior valor informado foi <strong>${maior}</strong>.</p>`
        res.innerHTML += `<p>O menor valor informado foi <strong>${menor}</strong>.</p>`
        res.innerHTML += `<p>Somando todos os valores, temos <strong>${soma}</strong>.</p>`
        res.innerHTML += `<p>A média dos valores digitados é <strong>${media.toFixed(2)}</strong>.</p>`
    }
}
