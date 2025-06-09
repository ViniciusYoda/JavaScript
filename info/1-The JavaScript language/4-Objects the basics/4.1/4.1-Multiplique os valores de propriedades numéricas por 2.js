let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

let tot = 0;

function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == 'number') {
      obj[key] *= 2;
    }
  }
}

multiplyNumeric(menu);
