function User(name) {
    this.name = name;
}

let user = new User("John");
let user2 = new user.constructor("Doe");

console.log(user.name);   // John
console.log(user2.name);  // Doe