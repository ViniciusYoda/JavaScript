const sumSalaries = salaries =>
    Object.values(salaries).reduce((sum, salary) => sum + salary, 0);

const salaries = {
    John: 100,
    Pete: 300,
    Mary: 250
};

console.log(sumSalaries(salaries)); // 650
