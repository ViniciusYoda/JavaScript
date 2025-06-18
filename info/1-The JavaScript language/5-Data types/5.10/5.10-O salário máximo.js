function topSalary(salaries) {
    return Object.entries(salaries).reduce(
        (max, [name, salary]) => salary > max[1] ? [name, salary] : max,
        [null, 0]
    )[0];
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
