const ticketTemplate30Num = "<div class=\"col-2\"><div class=\"ticketId\"><span class=\"badge bg-warning text-dark font-medium\">{{name}}</span>{{uniqueTicketNumber}}</div><table class=\"table table-bordered ticketBorder table-sm\"><tr><th class=\"text-center\">B</th><th class=\"text-center\">I</th><th class=\"text-center\">N</th><th class=\"text-center\">G</th><th class=\"text-center\">O</th></tr><tr id={{row0}}></tr><tr id={{row1}}></tr><tr id={{row2}}></tr><tr id={{row3}}></tr><tr id={{row4}}></tr><tr id={{row5}}></tr></table></div>";

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

const coolcozNames = [
    "Prasad", "Suresh", "Manasa", "Nitish", "Harshitha", "Bhaskar", "Meera", "Papachi", "Narayanaswamy", "Malini", "Deepu", "Smita", "Adi", "Gayathri", "Madhav", "Ashwini", "Mythreyi", "Chaya", "Somashekar", "Ranju", "Advai", "Venu", "Savitha", "Girija"];

$("#downloadBtn").prop('disabled', true);

$(document).ready(function () {
    const totalTickets = coolcozNames.length;
    $.get('/get30NumTicket/' + totalTickets, function (data) {
        display30NumTickets(data);
        getImage();
        $("#downloadBtn").prop('disabled', false);
    });
});

function display30NumTickets(tickets) {
    coolcozNames.sort();
    tickets.forEach((ticket, index) => {
        let name = coolcozNames[index];
        const ticketIds = {
            "row0": "row0" + name + index, "row1": "row1" + name + index, "row2": "row2" + name + index,
            "row3": "row3" + name + index, "row4": "row4" + name + index, "row5": "row5" + name + index, "uniqueTicketNumber": index + 1, "name": name
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
}

//Turns the generated ticket table into an image for easy copying
function getImage() {
    html2canvas(document.querySelector("#ticket"), { scale: 3 }).then(canvas => {
        canvasImage = canvas;
        $("#ticket").empty();
        $("#ticket").html(canvas);
        saveAs(canvasImage.toDataURL(), (new Date().toJSON().slice(0, 10)) + '-ticket.png');
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