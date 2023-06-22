function generateRandomNumbersInRange(startRange, endRange, totalNumbers) {
    let arr = [];
    while (arr.length < totalNumbers) {
        var r = Math.floor(Math.random() * 75) + 1;
        if (arr.indexOf(r) === -1 && r >= startRange && r <= endRange) arr.push(r);
    }
    return arr;
}

function getTicket() {
    const ticketFormat = {
        "list": [],
        "row0": [0, 0, 0, 0, 0],
        "row1": [0, 0, 0, 0, 0],
        "row2": [0, 0, 0, 0, 0],
        "row3": [0, 0, 0, 0, 0],
        "row4": [0, 0, 0, 0, 0]
    };

    for (i = 0; i < 5; i++) {
        let numberSet = generateRandomNumbersInRange((i * 15) + 1, (i * 15) + 15, 5);
        numberSet.forEach((number, index) => {
            const key = "row" + index;
            ticketFormat[key][i] = number;
            ticketFormat.list.push(number);
        });
    }
    return ticketFormat;
}

module.exports = {
    generateRandomNumbersInRange: generateRandomNumbersInRange,
    getTicket: getTicket
}