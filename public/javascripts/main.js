let numberSet = new Set();
let previousNumber = 0;
let currentNumber = 0;
const bingoColumn = { 1: "B", 2: "I", 3: "N", 4: "G", 5: "O" };
let randomNumbers;
let count = 0;
const prizeArray = ["Zona", "Jaldi 3", "Jaldi 5", "Jaldi 6 (1 per row)", "Jaldi 10", "BP", "4 Corners", "Twins", "B Column", "I Column", "N Column", "G Column", "O Column", "Line 1", "Line 2", "Line 3", "Line 4", "Line 5", "Line 6", "Line 1-2", "Line 3-4", "Line 5-6", "Upper House", "Lower House", "Photo frame", "Box", "Full house 1", "Full house 2", "Full house 3", "Full house 4", "Full house 5", "Zona", "Zona Full house"];

function getRandomNumbers() {
    $.get("/getRandomNumbers", function (data) {
        randomNumbers = data.split("\n");
        randomNumbers = randomNumbers.filter(function (el) {
            return el != "";
        });
        console.log(randomNumbers);
    });

    $.each(prizeArray, function (i, item) {
        $("#datalistOptions").append($("<option>").text(item));
    });
};
getRandomNumbers();


function generateRandomNumber() {
    var randomNumber = randomNumbers[count++];
    $("#" + previousNumber).removeClass("previousNumber");
    previousNumber = currentNumber;
    $("#" + previousNumber).addClass("previousNumber");
    currentNumber = randomNumber;
    const columnIndex = Math.ceil(randomNumber / 18);
    odoo.default({ el: '.js-odoo', from: '-' + ("0" + previousNumber).slice(-2), to: bingoColumn[columnIndex] + ("0" + currentNumber).slice(-2) });
    setTimeout(function () {
        $("#numberCallDescription").text(bingoCallsList[randomNumber]);
        displayNumberInTable(randomNumber);
        $("#columnName").text(bingoColumn[columnIndex]);
        $("#numberOrder").prepend("<span class=\"badge bg-warning text-dark\">" + randomNumber + "</span><img src=\"images/arrow-left-short.svg\"></img>");
    }, 3500);

    numberSet.add(randomNumber);
}

const numberTemplate = "<td class=\"text-center\"><span class=\"numbersList numberBefore\" id={{number}}>{{number}}</span></td>";

function generateTable() {
    let num = 1;
    let rows = "";
    while (num <= 90) {
        if (num % 10 == 1) {
            rows += "<tr>";
        }
        const renderedTableData = Mustache.render(numberTemplate, { "number": num });
        rows += renderedTableData;
        if (num % 10 == 0) {
            rows += "</tr>";
        }
        num++;
    }
    $("#numberTable").append(rows);
}

generateTable();

function displayNumberInTable(number) {
    $("#" + number).removeClass("numberBefore");
}

$("#nextNumberBtn").click(function () {
    if (numberSet.size < 90) {
        generateRandomNumber();
    }
});

$("#ticketPageBtn").click(function () {
    window.open('/ticket', '_blank');
    return false;
});

//Prizes section

const prizeTemplate = "<div class=\"d-flex\"><label><input id={{taskId}} type=\"checkbox\"" +
    "class=\"option-input radio\" name=\"prizeCheckbox\"><span class=\"label-text\">{{taskName}}</span></label></div>";

$("#prizeAddBtn").click(function () {
    let prizeObj = {
        taskName: document.getElementById('prizeNameTxt').value,
        taskId: generateUniqueId()
    }
    $("#prizeNameTxt").val("");
    let prizeHtml = Mustache.render(prizeTemplate, prizeObj);
    $("#prizeList").append(prizeHtml);
    $("#" + prizeObj.taskId).change(function () {
        if (this.checked) {
            $(this).next(".label-text").css("text-decoration-line", "line-through");
            $(this).next(".label-text").css("color", "red");
            $(this).next(".label-text").css("opacity", "30%");
            $("#prizeListCompleted").append(this.parentNode.parentNode);
        } else {
            $(this).next(".label-text").css("text-decoration-line", "none");
            $(this).next(".label-text").css("color", "black");
            $(this).next(".label-text").css("opacity", "100%");
            $("#prizeList").append(this.parentNode.parentNode);
        }
    });
});

function generateUniqueId() {
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyz0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const bingoCallsList = { 1: "Top of the house", 2: "Kaala dhan", 3: "Cup of Tea", 4: "Knock at the Door", 5: "Fingers in your hand", 6: "In a fix", 7: "One hockey stick", 8: "Garden Gate", 9: "Number of planets", 10: "A big fat hen", 11: "Two legs", 12: "One Dozen", 13: "Unlucky for Some", 14: "Valentine’s Day", 15: "Young and Keen", 16: "Sweet 16", 17: "Dancing Queen", 18: "Voting age", 19: "Last of the teens", 20: "Blind 20", 21: "Royal Salute", 22: "Two Little Ducks", 23: "You and Me", 24: "Two Dozen", 25: "Silver Jublee", 26: "Republic day", 27: "Gateway to Heaven", 28: "In a state", 29: "In your prime", 30: "Women get flirty", 31: "Time for fun", 32: "Buckle My Shoe", 33: "All the threes", 34: "Ask for More", 35: "Jump and Jive", 36: "Three Dozen", 37: "Mixed luck", 38: "Christmas Cake", 39: "Watch your waistline", 40: "Naughty 40", 41: "Time for some fun", 42: "Quit India movement", 43: "Down on Your Knees", 44: "All the fours", 45: "Halfway There", 46: "Up to Tricks", 47: "Year of Independence", 48: "Four Dozen", 49: "Rise and Shine", 50: "Half a Century", 51: "Charity begins", 52: "Pack of Cards", 53: "Stuck in a Tree", 54: "Clean the Floor", 55: "All the fives", 56: "Pick up Sticks", 57: "Heinz Varieties", 58: "Time to retire", 59: "Just retired", 60: "Five Dozen", 61: "Bakers Bun", 62: "Turn the Screw", 63: "Tickle Me", 64: "Catch the chor", 65: "Old Age Pension", 66: "Chakke pe chakka", 67: "Made in Heaven", 68: "Check your weight", 69: "Ulta pulta", 70: "Lucky Blind", 71: "Bang on the Drum", 72: "Six Dozen", 73: "Queen B", 74: "Lucky chor", 75: "Diamond Jublee", 76: "Lucky Six", 77: "Two Hockey Sticks", 78: "Heaven’s Gate", 79: "Lucky nine", 80: "Gandhi's breakfast", 81: "Stop and Run", 82: "Last of the two", 83: "India wins Cricket World Cup", 84: "Seven Dozen", 85: "Staying Alive", 86: "Last six", 87: "Fat lady in a crutch", 88: "Two Fat Ladies", 89: "Nearly There", 90: "Top of the House" };