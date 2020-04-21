const ticketTemplate = "<table class=\"table table-bordered ticketBorder table-sm\"><tr id={{row0}}></tr><tr id={{row1}}></tr><tr id={{row2}}></tr></table>";

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
        const ticketIds = { "row0": "row0" + index, "row1": "row1" + index, "row2": "row2" + index };
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


}
$("#previewBtn").click(function () {
    getImage();
});

function getImage() {
    html2canvas($("#ticket"), {
        onrendered: function (canvas) {
            $("#previewImage").append(canvas);
        }
    });
}
