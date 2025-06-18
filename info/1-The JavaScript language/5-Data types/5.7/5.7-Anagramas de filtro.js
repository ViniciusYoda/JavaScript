function aclean(words) {
    const map = new Map();

    for (const word of words) {
        const key = word
            .toLowerCase()
            .split('')
            .sort()
            .join('');
        if (!map.has(key)) {
            map.set(key, word);
        }
    }

    return Array.from(map.values());
}

const arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(aclean(arr));