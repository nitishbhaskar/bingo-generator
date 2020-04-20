function generateRandomNumberList() {
    let arr = getInitialNumberList();
    while (arr.length < 15) {
        var r = Math.floor(Math.random() * 90) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    const sortedArray = arr.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    return sortedArray;
}

//Gets numbers in ticket format with 3 rows and 9 columns
function getTicket() {
    const ticketFormat = { "list": [], "row0": [0, 0, 0, 0, 0, 0, 0, 0, 0], "row1": [0, 0, 0, 0, 0, 0, 0, 0, 0], "row2": [0, 0, 0, 0, 0, 0, 0, 0, 0] };
    let sortedArray = generateRandomNumberList();
    //If randomly generated numbers are invalid, then generate it again
    while (!validateNumbers(sortedArray)) {
        sortedArray = generateRandomNumberList();
    }
    //console.log("Valid numbers " + sortedArray);
    sortedArray.forEach((element, i) => {
        const jsonObject = 'row' + (i % 3);
        let arrayPosition = Math.floor(element / 10);
        //Number 90 comes in the same column as 80s in ticket
        if (element == 90) {
            arrayPosition = arrayPosition - 1;
        }
        //ticketFormat['row' + (i % 3)][Math.floor(element / 10)] = element;
        ticketFormat[jsonObject][arrayPosition] = element;
    });
    ticketFormat.list = sortedArray;
    return ticketFormat;
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
    getInitialNumberList: getInitialNumberList,
    getTicket: getTicket
}