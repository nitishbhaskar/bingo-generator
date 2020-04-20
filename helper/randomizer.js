function generateRandomNumberList() {
    let arr = getInitialNumberList();
    while (arr.length < 15) {
        var r = Math.floor(Math.random() * 90) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    //If randomly generated numbers are invalid, then generate it again
    if (!validateNumbers(arr)) {
        generateRandomNumberList();
    }
    return arr.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
}

//Each column in ticket needs to have at least one number. So, generating one number for each column
function getInitialNumberList() {
    let arr = [];
    let range = 0;
    let unitPlace = 9;
    while (range < 90) {
        if (range == 80) unitPlace = 10; //This will help consider number 90
        var r = Math.floor(Math.random() * unitPlace) + 1 + range;
        arr.push(r);
        range += 10;
    }
    return arr;
}

function validateNumbers(numberList) {
    let startRange = 0;
    let endRange = 9;
    while (startRange < 90) {
        const count = countInRange(numberList, startRange, endRange);
        //Can fit only 3 numbers in a column. Also, should have at least one number in each column
        if (count == 0 || count > 3) {
            return false;
        }
        startRange = startRange + 10;
        endRange = endRange + 10;
    }
    return true;
}

function countInRange(numberList, startRange, endRange) {
    let count = 0;
    //90 will be in column of 80s
    if (endRange == 89) endRange = 90;
    if (!numberList || numberList.length == 0) return 0;
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
    validateNumbers: validateNumbers,
    getInitialNumberList: getInitialNumberList
}