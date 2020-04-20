const ticketTemplate = "<table class=\"table table-bordered ticketBorder table-sm\"><tr id=\"row0\"></tr><tr id=\"row1\"></tr><tr id=\"row2\"></tr></table>";

$.get('/getTicket', function (data) {
    $("#ticket").append(ticketTemplate);
    Object.keys(data).forEach(element => {
        data[element].forEach(number => {
            if (number != 0) {
                $("#" + element).append("<td class=\"text-center\"> " + number + " </td>");
            }
            else {
                $("#" + element).append("<td>  </td>");
            }
        });
    });
});