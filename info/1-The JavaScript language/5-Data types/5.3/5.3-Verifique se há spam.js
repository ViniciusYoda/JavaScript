function checkSpam(str) {
    let lowerStr = str.toLoverCase();

    return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

console.log( checkSpam('buy ViAgRA now') );
console.log( checkSpam('free xxxxx') );
console.log( checkSpam('inoccent rabbit') );