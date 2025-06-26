function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.sayHi = function() {
  alert(this.name);
}

let rabbit = new Rabbit("White Rabbit");
rabbit.sayHi(); // White Rabbit
Rabbit.prototype.sayHi()
Object.getPrototypeOf(rabbit).sayHi(); // White Rabbit
rabbit.__proto__.sayHi(); // White Rabbit