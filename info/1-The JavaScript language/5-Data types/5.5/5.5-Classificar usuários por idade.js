function sortByAge(arr) {
  return [...arr].sort((a, b) => a.age - b.age);
}

const users = [
  { name: "John", age: 25 },
  { name: "Pete", age: 30 },
  { name: "Mary", age: 28 }
];

const sortedUsers = sortByAge(users);

console.log(sortedUsers.map(user => user.name)); // ["John", "Mary", "Pete"]
