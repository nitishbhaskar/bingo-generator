function generateRandomNumberList() {
    var arr = [];
    while (arr.length < 15) {
        var r = Math.floor(Math.random() * 100) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr.sort();
}

function validateNumbers(numberList) {
    let startRange = 0;
    let endRange = 9;
    while (startRange != 90) {
        const count = countInRange(numberList, startRange, endRange);
        if (count > 3) {
            return false;
        }
        startRange += 10;
        endRange += 10;
    }
    return true;
}

function countInRange(numberList, startRange, endRange) {
    let count = 0;
    if (endRange == 89) endRange = 90;
    numberList.forEach(element => {
        if (element >= startRange && element <= endRange) {
            count++;
        }
    });
    return count;
}

module.exports = {
    generateRandomNumberList: generateRandomNumberList,
    countInRange: countInRange,
    validateNumbers: validateNumbers
}