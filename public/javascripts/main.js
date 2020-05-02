let numberSet = new Set();
let previousNumber = 0;
let currentNumber = 0;

function generateRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 90) + 1;
    console.log(randomNumber);
    //This avoids random number to be adjacent of previous number until first 75 numbers
    if (numberSet.has(randomNumber) || (numberSet.size < 75 && (randomNumber >= currentNumber - 3 && randomNumber <= currentNumber + 3))) {
        console.log("Exists or adjacent");
        generateRandomNumber(); // Get a new number if number was previously generated.
    }
    else {
        $("#" + previousNumber).removeClass("previousNumber");
        previousNumber = currentNumber;
        $("#" + previousNumber).addClass("previousNumber");
        currentNumber = randomNumber;
        odometer.innerHTML = randomNumber;
        setTimeout(function () {
            $("#numberCallDescription").text(bingoCallsList[randomNumber]);
            displayNumberInTable(randomNumber);
        }, 2000);
        numberSet.add(randomNumber);
    }
}

//const numberTemplate = "<td class=\"text-center\"><span class=\"numbersList\" id={{number}} style=\"visibility: hidden\">{{number}}</span></td>";
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
    //$("#" + number).css("visibility", "visible");
    $("#" + number).removeClass("numberBefore");
}

$("#nextNumberBtn").click(function () {
    $("#numberCallDescription").text('');
    if (numberSet.size < 90) {
        generateRandomNumber();
    }
});

$("#ticketPageBtn").click(function () {
    window.open('/ticket', '_blank');
    return false;
});


const bingoCallsList = { 1: "Top of the house", 2: "One Little Duck", 3: "Cup of Tea", 4: "Knock at the Door", 5: "Fingers in your hand", 6: "Chopping sticks", 7: "One hockey stick", 8: "Garden Gate", 9: "Doctor’s Orders", 10: "A big fat hen", 11: "Two legs", 12: "One Dozen", 13: "Unlucky for Some", 14: "Valentine’s Day", 15: "Young and Keen", 16: "Sweet 16", 17: "Dancing Queen", 18: "Coming of Age", 19: "Goodbye Teens", 20: "One Score", 21: "Royal Salute", 22: "Two Little Ducks", 23: "Thee and Me", 24: "Two Dozen", 25: "Duck and Dive", 26: "Pick and Mix", 27: "Gateway to Heaven", 28: "Over Weight", 29: "Rise and Shine", 30: "Dirty Gertie", 31: "Get Up and Run", 32: "Buckle My Shoe", 33: "All the threes", 34: "Ask for More", 35: "Jump and Jive", 36: "Three Dozen", 37: "More than 11", 38: "Christmas Cake", 39: "Watch your waistline", 40: "Naughty 40", 41: "Time for Fun", 42: "Winnie the Pooh", 43: "Down on Your Knees", 44: "All the fours", 45: "Halfway There", 46: "Up to Tricks", 47: "Four and Seven", 48: "Four Dozen", 49: "Rise and Shine", 50: "Half a Century", 51: "Tweak of the Thumb", 52: "Pack of Cards", 53: "Stuck in a Tree", 54: "Clean the Floor", 55: "All the fives", 56: "Pick up Sticks", 57: "Heinz Varieties", 58: "Make Them Wait", 59: "Brighton Line", 60: "Five Dozen", 61: "Bakers Bun", 62: "Turn the Screw", 63: "Tickle Me 63", 64: "Red Raw", 65: "Old Age Pension", 66: "Clickety Click", 67: "Made in Heaven", 68: "Saving Grace", 69: "Either Way Up", 70: "Lucky Blind", 71: "Bang on the Drum", 72: "Six Dozen", 73: "Queen B", 74: "Candy Store", 75: "Strive and Strive", 76: "Lucky Six", 77: "Two Hockey Sticks", 78: "Heaven’s Gate", 79: "One More Time", 80: "Eight and Blank", 81: "Stop and Run", 82: "Last of the two", 83: "Time for Tea", 84: "Seven Dozen", 85: "Staying Alive", 86: "Between the Sticks", 87: "Torquay in Devon", 88: "Two Fat Ladies", 89: "Nearly There", 90: "Top of the House" };