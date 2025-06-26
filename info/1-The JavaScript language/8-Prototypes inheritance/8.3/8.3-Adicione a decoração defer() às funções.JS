Function.prototype.defer = function(ms) {
  let f = this; // a função original

  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
}

function f(a, b) {
    console.log(a + b);
}

f.defer(1000)(1, 2); // mostra 3 após 1 segundo