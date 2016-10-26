/*
app.js - application script for the movies challenge
add your code to this file
*/

// Create variables for important elements (dropdown, table)
var dropdown = document.querySelector("#dropdown");
var table = document.querySelector(".table");


// Build the filtered lists of names.
// Array.filter allows you to take an array of items
// and create a new array with just the values
// that match a certain condition. In this case,
// we want to build two lists, one for each gender.
// When comparing strings, always a good idea to
// set both strings to the same case (unless capitalization is important).
var starWars = MOVIES.filter(function (item) {
    return item.title.toLowerCase().includes("star wars");
});

var twenty = MOVIES.filter(function (item) {
    return item.released.toLowerCase() === "female";
});



function buildTable() {
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var releasedTh = document.createElement("th");
    releasedTh.textContent = "Date Released";

    var distributorTh = document.createElement("th");
    distributorTh.textContent = "Distributor";

    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var ratingTh = document.createElement("th");
    ratingTh.textContent = "Rating";

    var yearTh = document.createElement("th");
    yearTh.textContent = "Year";

    var salesTh = document.createElement("th");
    salesTh.textContent = "Sales";

    var ticketsTh = document.createElement("th");
    ticketsTh.textContent = "Tickets";

    // Append these elements to the table
    threadRow.appendChild(titleTh);
    threadRow.appendChild(releasedTh);
    threadRow.appendChild(distributorTh);
    threadRow.appendChild(genreTh);
    threadRow.appendChild(ratingTh);
    threadRow.appendChild(yearTh);
    threadRow.appendChild(salesTh);
    threadRow.appendChild(ticketsTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}


function buildRows(rows) {

    buildTable();

    var tbody = document.querySelector("tbody");

    rows.forEach(function (title) { //titles
        var titleTr = document.createElement("tr");

        // Object.keys returns an array of the keys object
        var titleKeys = Object.keys(title);

        // This makes it easy to iterate over the values
        // in the object by using bracket notation
        // to access each property in the object.
        titleKeys.forEach(function (key) {
            var value = title[key];

            var td = document.createElement("td");
            td.textContent = value;

            titleTr.appendChild(td);
        });

        tbody.appendChild(titleTr);
    });
}

// When the selection in the dropdown changes,
// we want to clear and rebuild the table
// based on the selected gender.
dropdown.addEventListener("change", function (e) {
    // Removes all the elements in the able.
    table.innerHTML = "";

    // Get the current value of the dropdown,
    // and build the table with the data for that value.
    var value = e.target.value;

    if (value === "star-wars") {
        buildRows(starWars);
    } else {
        buildRows(MOVIES);
    }
});

buildRows(MOVIES);
