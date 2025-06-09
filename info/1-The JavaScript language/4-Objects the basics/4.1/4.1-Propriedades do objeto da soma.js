let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

let total = 0

for (item in salaries) {
    total += salaries[item]
}

console.log(total)