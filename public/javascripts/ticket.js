const ticketTemplate = "<div class=\"ticketId\">{{uniqueTicketNumber}}</div><table class=\"table table-bordered ticketBorder table-sm\"><tr id={{row0}}></tr><tr id={{row1}}></tr><tr id={{row2}}></tr></table>";

const ticketTemplate30Num = "<div class=\"col-2 margin10\"><div class=\"ticketId\"><span class=\"badge bg-warning text-dark font-medium\">{{name}}</span>{{uniqueTicketNumber}}</div><table class=\"table table-bordered ticketBorder table-sm\"><tr><th class=\"text-center\">B</th><th class=\"text-center\">I</th><th class=\"text-center\">N</th><th class=\"text-center\">G</th><th class=\"text-center\">O</th></tr><tr id={{row0}}></tr><tr id={{row1}}></tr><tr id={{row2}}></tr><tr id={{row3}}></tr><tr id={{row4}}></tr><tr id={{row5}}></tr></table></div>";

const ticketTemplate36Num = "<div class=\"col-2 margin5\"><div class=\"ticketId\"><span class=\"badge bg-warning text-dark font-medium\">{{name}}</span>{{uniqueTicketNumber}}</div><table class=\"table table-bordered ticketBorder table-sm\"><tr class=\"wordWrap\"><th class=\"text-center\">1 to 15</th><th class=\"text-center\">16 to 30</th><th class=\"text-center\">31 to 45</th><th class=\"text-center\">46 to 60</th><th class=\"text-center\">61 to 75</th><th class=\"text-center\">76 to 90</th></tr><tr id={{row0}}></tr><tr id={{row1}}></tr><tr id={{row2}}></tr><tr id={{row3}}></tr><tr id={{row4}}></tr><tr id={{row5}}></tr></table></div>";

const ticketTemplate25Num = "<div class=\"col-2 margin5\"><div class=\"ticketId\"><span class=\"badge bg-warning text-dark font-medium\">{{name}}</span>{{uniqueTicketNumber}}</div><table class=\"table table-bordered ticketBorder table-sm\"><tr class=\"wordWrap\"><th class=\"text-center\">1 to 15</th><th class=\"text-center\">16 to 30</th><th class=\"text-center\">31 to 45</th><th class=\"text-center\">46 to 60</th><th class=\"text-center\">61 to 75</th></tr><tr id={{row0}}></tr><tr id={{row1}}></tr><tr id={{row2}}></tr><tr id={{row3}}></tr><tr id={{row4}}></table></div>";

let canvasImage = "";

const coolcozList = [{ "name": "Manasa", "numberOfTickets": 1 },
{ "name": "Prasad", "numberOfTickets": 1 },
{ "name": "Suresh", "numberOfTickets": 1 },
{ "name": "Nitish", "numberOfTickets": 2 },
{ "name": "Vani", "numberOfTickets": 2 },
{ "name": "Bhaskar", "numberOfTickets": 2 },
{ "name": "Papachi", "numberOfTickets": 2 },
{ "name": "Malini", "numberOfTickets": 3 },
{ "name": "Deepu", "numberOfTickets": 3 },
{ "name": "Veena", "numberOfTickets": 3 },
{ "name": "Vicky", "numberOfTickets": 3 },
{ "name": "Madhav", "numberOfTickets": 4 },
{ "name": "Chaya", "numberOfTickets": 2 },
{ "name": "Ranju", "numberOfTickets": 4 },
{ "name": "Nikhil", "numberOfTickets": 4 },
{ "name": "Venu", "numberOfTickets": 5 }];

$("#downloadBtn").prop('disabled', true);

$("#getTicketBtn").click(function () {
    const numberOfTickets = document.getElementById('numberOfTickets').value;
    $("#ticket").empty();
    const ticketType = document.querySelector('input[name="ticketType"]:checked').value;
    if (ticketType == 15) {
        getTicket(numberOfTickets);
    }
    if (ticketType == 36) {
        get36NumTicket(numberOfTickets);
    }
    if (ticketType == 25) {
        get25NumTicket(numberOfTickets);
    }
    else {
        get30NumTicket(numberOfTickets);
    }
});

$("#getCoolcozTktBtn").click(function () {
    coolcozList.forEach(coolcoz => {
        get30NumTicket(coolcoz.numberOfTickets, coolcoz.name);
    });

});

function get30NumTicket(numberOfTickets, name = "") {
    $.get('/get30NumTicket/' + numberOfTickets, function (data) {
        display30NumTickets(data, name);
        $("#downloadBtn").prop('disabled', false);
    });
}

function get36NumTicket(numberOfTickets, name = "") {
    $.get('/get36NumTicket/' + numberOfTickets, function (data) {
        display36NumTickets(data, name);
        $("#downloadBtn").prop('disabled', false);
    });
}

function get25NumTicket(numberOfTickets, name = "") {
    $.get('/get25NumTicket/' + numberOfTickets, function (data) {
        display25NumTickets(data, name);
        $("#downloadBtn").prop('disabled', false);
    });
}

function display30NumTickets(tickets, name = "") {
    const startingIndex = document.getElementById('startingIndex').value;
    let ticketNumber = parseInt(startingIndex);
    tickets.forEach((ticket, index) => {
        const ticketIds = {
            "row0": "row0" + name + index, "row1": "row1" + name + index, "row2": "row2" + name + index,
            "row3": "row3" + name + index, "row4": "row4" + name + index, "row5": "row5" + name + index, "uniqueTicketNumber": index + ticketNumber, "name": name
        };
        const renderedTable = Mustache.render(ticketTemplate30Num, ticketIds);
        $("#ticket").append(renderedTable);
        Object.keys(ticket).forEach(element => {
            ticket[element].forEach(number => {
                if (number != 0) {
                    $("#" + element + "" + name + index).append("<td class=\"text-center\"> " + number + " </td>");
                }
                else {
                    $("#" + element + "" + name + index).append("<td>  </td>");
                }
            });
        });
    });
    getImage();
}

function display36NumTickets(tickets, name = "") {
    const startingIndex = document.getElementById('startingIndex').value;
    let ticketNumber = parseInt(startingIndex);
    tickets.forEach((ticket, index) => {
        const ticketIds = {
            "row0": "row0" + name + index, "row1": "row1" + name + index, "row2": "row2" + name + index,
            "row3": "row3" + name + index, "row4": "row4" + name + index, "row5": "row5" + name + index, "uniqueTicketNumber": index + ticketNumber, "name": name
        };
        const renderedTable = Mustache.render(ticketTemplate36Num, ticketIds);
        $("#ticket").append(renderedTable);
        Object.keys(ticket).forEach(element => {
            ticket[element].forEach(number => {
                if (number != 0) {
                    $("#" + element + "" + name + index).append("<td class=\"text-center\"> " + number + " </td>");
                }
                else {
                    $("#" + element + "" + name + index).append("<td>  </td>");
                }
            });
        });
    });
    getImage();
}

function display25NumTickets(tickets, name = "") {
    const startingIndex = document.getElementById('startingIndex').value;
    let ticketNumber = parseInt(startingIndex);
    tickets.forEach((ticket, index) => {
        const ticketIds = {
            "row0": "row0" + name + index, "row1": "row1" + name + index, "row2": "row2" + name + index,
            "row3": "row3" + name + index, "row4": "row4" + name + index, "uniqueTicketNumber": index + ticketNumber, "name": name
        };
        const renderedTable = Mustache.render(ticketTemplate25Num, ticketIds);
        $("#ticket").append(renderedTable);
        Object.keys(ticket).forEach(element => {
            ticket[element].forEach(number => {
                if (number != 0) {
                    $("#" + element + "" + name + index).append("<td class=\"text-center\"> " + number + " </td>");
                }
                else {
                    $("#" + element + "" + name + index).append("<td>  </td>");
                }
            });
        });
    });
    getImage();
}

function getTicket(numberOfTickets) {
    $.get('/getTicket/' + numberOfTickets, function (data) {
        displayTickets(data);
        $("#downloadBtn").prop('disabled', false);
    });
}

function displayTickets(tickets) {
    tickets.forEach((ticket, index) => {
        const ticketIds = { "row0": "row0" + index, "row1": "row1" + index, "row2": "row2" + index, "uniqueTicketNumber": index + 1 };
        const renderedTable = Mustache.render(ticketTemplate, ticketIds);
        $("#ticket").append(renderedTable);

        Object.keys(ticket).forEach(element => {
            ticket[element].forEach(number => {
                if (number != 0) {
                    $("#" + element + "" + index).append("<td class=\"text-center\"> " + number + " </td>");
                }
                else {
                    $("#" + element + "" + index).append("<td>  </td>");
                }
            });
        });
    });
    getImage();
}

//Turns the generated ticket table into an image for easy copying
function getImage() {
    html2canvas(document.querySelector("#ticket"), { scale: 5 }).then(canvas => {
        canvasImage = canvas;
        $("#ticket").empty();
        $("#ticketAlert").show();
        $("#ticket").append(canvas);
    });
}

$("#downloadBtn").click(function () {
    saveAs(canvasImage.toDataURL(), 'ticket.png');
});

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

//Generates unique value for the table
function generateUniqueId() {
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyz0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$('#numberOfTickets').keyup(function () {
    if ($(this).val() > 100) {
        alert("No numbers above 100");
        $(this).val('100');
    }
});