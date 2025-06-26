Function.prototype.defer = function(ms) {
    setTimeout(this, ms);
};

function f() {
    console.log("Hello!");
}

f.defer(1000); // mostra "Hello!" após 1 segundo