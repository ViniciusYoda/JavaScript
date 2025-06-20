function makeArmy() {
    const shooters = [];
    for (let i = 0; i < 10; i++) {
        shooters.push(() => console.log(i));
    }
    return shooters;
}

const army = makeArmy();

army[0](); // 0
army[5](); // 5
