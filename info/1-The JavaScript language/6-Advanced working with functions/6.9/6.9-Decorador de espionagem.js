// Decorador de espionagem: registra todas as chamadas e argumentos
function spy(func) {
    function wrapper(...args) {
        wrapper.calls.push(args); // Armazena os argumentos da chamada
        return func.apply(this, args); // Mantém o contexto e repassa os argumentos
    }

    wrapper.calls = []; // Inicializa o array de chamadas

    return wrapper;
}