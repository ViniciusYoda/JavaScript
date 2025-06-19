let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    occupiedBy: [{ name: "John" }, { name: "Alice" }],
    place: room
};

// Criando referências circulares
room.occupiedBy = meetup;
meetup.self = meetup;

// Função replacer para remover referências circulares
function replacer(key, value) {
    // Remove referências circulares ao objeto meetup
    if (key && value === meetup) {
        return undefined;
    }
    return value;
}

console.log(JSON.stringify(meetup, replacer, 2));