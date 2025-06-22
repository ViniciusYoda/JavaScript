function askPassword(ok, fail) {
    const password = prompt("Digite a senha:", '');
    if (password === "rockstar") {
        ok();
    } else {
        fail();
    }
}

const user = {
    name: 'John',

    loginOk() {
        alert(`${this.name} fez login com sucesso!`);
    },

    loginFail() {
        alert(`${this.name} falhou ao fazer login.`);
    }
};

// Passando o contexto correto usando bind
askPassword(
    user.loginOk.bind(user),
    user.loginFail.bind(user)
);