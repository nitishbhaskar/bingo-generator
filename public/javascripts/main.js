let numberSet = new Set();
let previousNumber = 0;
let currentNumber = 0;

function generateRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 90) + 1;
    if (numberSet.has(randomNumber)) {
        generateRandomNumber(); // Get a new number if number was previously generated.
    }
    else {
        //$("#currentNumber").text(randomNumber);
        $("#" + previousNumber).removeClass("previousNumber");
        previousNumber = currentNumber;
        $("#" + previousNumber).addClass("previousNumber");
        currentNumber = randomNumber;
        odometer.innerHTML = "" + randomNumber;
        setTimeout(function () {
            $("#numberCallDescription").text(bingoCallsList[randomNumber]);
            displayNumber(randomNumber);
        }, 2000);
        numberSet.add(randomNumber);
    }
}

const numberTemplate = "<td class=\"text-center\"><span class=\"numbersList\" id={{number}} style=\"visibility: hidden\">{{number}}</span></td>";

function generateTable() {
    let num = 1;
    let rows = "";
    while (num <= 90) {
        if (num % 10 == 1) {
            //$("#numberTable").append("<tr>");
            rows += "<tr>";
        }
        const renderedTableData = Mustache.render(numberTemplate, { "number": num });
        //$("#numberTable").append(renderedTableData);
        rows += renderedTableData;
        if (num % 10 == 0) {
            //$("#numberTable").append("</tr>");
            rows += "</tr>";
        }
        num++;
    }
    $("#numberTable").append(rows);
}

generateTable();

function displayNumber(number) {
    //$("#" + number).text(number);
    $("#" + number).css("visibility", "visible");
}

$("#nextNumberBtn").click(function () {
    $("#numberCallDescription").text('');
    generateRandomNumber();
});


const bingoCallsList = { 1: "Kelly’s Eye", 2: "One Little Duck", 3: "Cup of Tea", 4: "Knock at the Door", 5: "Man Alive", 6: "Tom Mix", 7: "Lucky Seven", 8: "Garden Gate", 9: "Doctor’s Orders", 10: "Cameron’s Den", 11: "Legs 11", 12: "One Dozen", 13: "Unlucky for Some", 14: "Valentine’s Day", 15: "Young and Keen", 16: "Sweet 16", 17: "Dancing Queen", 18: "Coming of Age", 19: "Goodbye Teens", 20: "One Score", 21: "Royal Salute", 22: "Two Little Ducks", 23: "Thee and Me", 24: "Two Dozen", 25: "Duck and Dive", 26: "Pick and Mix", 27: "Gateway to Heaven", 28: "Over Weight", 29: "Rise and Shine", 30: "Dirty Gertie", 31: "Get Up and Run", 32: "Buckle My Shoe", 33: "Dirty Knee", 34: "Ask for More", 35: "Jump and Jive", 36: "Three Dozen", 37: "More than 11", 38: "Christmas Cake", 39: "Steps", 40: "Naughty 40", 41: "Time for Fun", 42: "Winnie the Pooh", 43: "Down on Your Knees", 44: "Droopy Drawers", 45: "Halfway There", 46: "Up to Tricks", 47: "Four and Seven", 48: "Four Dozen", 49: "PC", 50: "Half a Century", 51: "Tweak of the Thumb", 52: "Danny La Rue", 53: "Stuck in the Tree", 54: "Clean the Floor", 55: "Snakes Alive", 56: "Was She Worth It?", 57: "Heinz Varieties", 58: "Make Them Wait", 59: "Brighton Line", 60: "Five Dozen", 61: "Bakers Bun", 62: "Turn the Screw", 63: "Tickle Me 63", 64: "Red Raw", 65: "Old Age Pension", 66: "Clickety Click", 67: "Made in Heaven", 68: "Saving Grace", 69: "Either Way Up", 70: "Three Score and 10", 71: "Bang on the Drum", 72: "Six Dozen", 73: "Queen B", 74: "Candy Store", 75: "Strive and Strive", 76: "Trombones", 77: "Sunset Strip", 78: "Heaven’s Gate", 79: "One More Time", 80: "Eight and Blank", 81: "Stop and Run", 82: "Straight On Through", 83: "Time for Tea", 84: "Seven Dozen", 85: "Staying Alive", 86: "Between the Sticks", 87: "Torquay in Devon", 88: "Two Fat Ladies", 89: "Nearly There", 90: "Top of the Shop" };