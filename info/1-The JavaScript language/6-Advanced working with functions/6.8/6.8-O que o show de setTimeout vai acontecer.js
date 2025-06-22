let i = 0;

// Agenda a exibição do valor de 'i' após 100ms
setTimeout(() => {
    console.log(i); // Mostra o valor final de 'i'
}, 100);

// Incrementa 'i' 100 milhões de vezes
for (let j = 0; j < 100_000_000; j++) {
    i++;
}