class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // Define o nome da classe como 'FormatError'
  }
}

let err = new FormatError("Erro de formatação");
console.log(err.message); // Erro de formatação
console.log(err.name);    // FormatError
console.log(err.stack);   // Stack trace do erro

console.log(err instanceof SyntaxError); // true