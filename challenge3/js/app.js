/*
app.js - application script for the movies challenge
add your code to this file
*/

// Create variables for important elements (dropdown, table)
var dropdown = document.querySelector("#report-select");
var table = document.querySelector(".table");

var starWarsB = false;
var twentyB = false;
var avgSalesB = false;
var top100B = false;

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

starWars.sort(function(a, b) {
    return a.title.localeCompare(b.title);
});



//console.log(starWars);

var twenty = MOVIES.filter(function (item) {
    return item.released < 2000-01-01;
});

var avgSales = MOVIES.reduce(function (previousValue, currentValue){
    return previousValue.sales + currentValue.sales;
});

var top100 = MOVIES





function buildTable() {
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    var h2 = document.createElement("h2");


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

    report.appendChild(table);
}

function buildTableSales() {
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    
    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var salesTh = document.createElement("th");
    salesTh.textContent = "Sales";

    // Append these elements to the table
    threadRow.appendChild(genreTh);
    threadRow.appendChild(salesTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);

    report.appendChild(table);

}

function buildTableTop() {
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    // Row for the header
    var threadRow = document.createElement("tr");

    // Columns for the header
    
    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var ticketsTh = document.createElement("th");
    ticketsTh.textContent = "Ticket Sales";

    // Append these elements to the table
    threadRow.appendChild(titleTh);
    threadRow.appendChild(ticketsTh);

    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);

}

function buildRows(rows) {
    console.log(rows);

    table.innerHTML = "";

    if (avgSalesB){
        buildTableSales();
    }else if (top100B){
        buildTableTop();
    } else {
        buildTable();
    }

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
    // Removes all the elements in the table.
    table.innerHTML = "";

    // Get the current value of the dropdown,
    // and build the table with the data for that value.
    var value = e.target.value;

    if (value === "star-wars") {
        starWarsB = true;
        twentyB = false;
        avgSalesB = false;
        top100B = false;
        //buildRows(starWars);
        buildTable2(starWars);
    }else if (value === "20th"){
        starWarsB = false;
        twentyB = true;
        avgSalesB = false;
        top100B = false;
        buildRows(twenty);
    } else if (value === "avg-by-genre"){
        starWarsB = false;
        twentyB = false;
        avgSalesB = true;
        top100B = false;
        buildRows(avgSales);
    } else if (value === "top-by-tikets"){
        starWarsB = false;
        twentyB = false;
        avgSalesB = false;
        top100B = true;
        buildRows(top100);
    }else {
        buildRows(MOVIES);
    }
});

buildRows(MOVIES);


document.addEventListener("DOMContentLoaded", function() {
    //make sure js loads
    console.log("doc ready");
    //check global var
    console.log(MOVIES);

    var table = document.querySelector(".table");

    var buildTable2 = function(records) {
        console.log(records);

        table.innerHTML = "";

        var tbody = document.createElement("tbody");
        var thead = document.createElement("thead");

        var columns = [] // fill with column names from records[0]

        var th = document.createElement("th");
        //for each column make a td and append it to the th

        Object.keys(records).forEach(function(column){
            var td = document.createElement("td");
            th.AppendChild(td);
        })

        records.forEach(function(record) {
            // make a tr
            var tr = document.createElement("tr");
            columns.forEach(function(column) {
                // make a td and fill with data from record[column];
                // append to tr
                var td = document.createElement("td");

                var value = record[column];
                td.textContent(value);

                tr.AppendChild(td);

            });

            // append tr to tbody;
            tbody.AppendChild(tr);
        })

        //append thead and tbody to table;
        table.appendChild(thead);
        table.appendChild(tbody);
    }


    // TESTER code
    buildTable(MOVIES.slice(0, 20));
});
