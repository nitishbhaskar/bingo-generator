const ticketTemplate = "<div class=\"ticketId\">{{uniqueTicketNumber}}</div><table class=\"table table-bordered ticketBorder table-sm\"><tr id={{row0}}></tr><tr id={{row1}}></tr><tr id={{row2}}></tr></table>";

let canvasImage = "";

$("#getTicketBtn").click(function () {
    const numberOfTickets = document.getElementById('numberOfTickets').value;
    $("#ticket").empty();
    getTicket(numberOfTickets);
});

function getTicket(numberOfTickets) {
    $.get('/getTicket/' + numberOfTickets, function (data) {
        displayTickets(data);
    });
}

function displayTickets(tickets) {
    tickets.forEach((ticket, index) => {
        const ticketIds = { "row0": "row0" + index, "row1": "row1" + index, "row2": "row2" + index, "uniqueTicketNumber": generateUniqueId() };
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
    html2canvas(document.querySelector("#ticket")).then(canvas => {
        canvasImage = canvas;
        $("#ticket").empty();
        $("#ticketAlert").show();
        $("#ticket").append(canvas);
    });
}

$("#downloadBtn").click(function () {
    saveAs(canvasImage.toDataURL(), 'canvas.png');
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