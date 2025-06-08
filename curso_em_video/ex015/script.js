function verificar() {
    let data = new Date()
    let ano = data.getFullYear()
    let fano = document.getElementById('ano')
    let res = document.querySelector('div#res')
    if (fano.value.length == 0 || fano.value > ano) {
        res.innerHTML = `Verifica o ano novamente`
    } else {
        let fsex = document.getElementsByName('sex')
        let idade = ano - Number(fano.value)
        let genero = ''
        let img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if (fsex[0].checked) {
            genero = 'Homem'
            if (idade >= 0 && idade < 13) {
                img.setAttribute('src', 'boy.png')
            } else if (idade >= 13 && idade < 18) {
                img.setAttribute('src', 'menino.png')
            } else if (idade >= 18 && idade < 60) {
                img.setAttribute('src', 'adulto.png')
            } else {
                img.setAttribute('src', 'velho.png')
            }
        } else {
            genero = 'Mulher'
            if (idade >= 0 && idade < 13) {
                img.setAttribute('src', 'girl.png')
            } else if (idade >= 13 && idade < 18) {
                img.setAttribute('src', 'menina.png')
            } else if (idade >= 18 && idade < 60) {
                img.setAttribute('src', 'adulta.png')
            } else {
                img.setAttribute('src', 'velha.png')
            }
        }
        res.style.textAlign = 'center'
        res.innerHTML = `Detectamos ${genero} com ${idade} anos`
        res.appendChild(img)
    }
}