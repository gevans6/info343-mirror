/*
app.js - application script for the movies challenge
add your code to this file
*/



(function() {
    var titleReport;
    document.addEventListener("DOMContentLoaded", function() {
        
        //make sure js loads
        console.log("doc ready");
        //check global var
        //console.log(MOVIES);

        var dropdown = document.querySelector("#report-select");
        dropdown.addEventListener("change", function (e) {
            // Removes all the elements in the table.
            report.innerHTML = "";

            // Get the current value of the dropdown,
            // and build the table with the data for that value.
            var dropValue = e.target.value;

            var finalReport;
            

            if (dropValue === "star-wars") {    
                finalReport = starWars();
                titleReport = "Star Wars Movies";
            } else if (dropValue == "20th") {
                finalReport = twenty();
                titleReport = "20th Century Movies";
            } else if (dropValue == "avg-by-genre") {
                finalReport = avgSales();
                titleReport = "Average Movie Sales By Genre";
            } else if (dropValue === "top-by-tickets") {
                finalReport = top100();
                titleReport = "Top 100 Movies";
            }

            buildTable(finalReport);
        });

        // TESTER code
        //buildTable(MOVIES.slice(0, 20));
    });

    var report = document.querySelector("#report");

    var buildTable = function(records) {
        //console.log(Object.keys(records[0]));

        report.innerHTML = "";

        // Make and add Header
        var h2 = document.createElement("h2");
        h2.textContent = titleReport;

        var table = document.createElement("table");
        table.className = "table";

        var tbody = document.createElement("tbody");
        var thead = document.createElement("thead");

        var columns = []; // fill with column names from records[0]

        var tr = document.createElement("tr");
        //for each column make a th and append it to the tr

        Object.keys(records[0]).forEach(function(column){
            columns.push(column);
            var th = document.createElement("th");

            th.textContent = column;
            tr.appendChild(th);
        });

        thead.appendChild(tr);

        records.forEach(function(record) {
            // make a tr
            var tr = document.createElement("tr");
            columns.forEach(function(column) {
                // make a td and fill with data from record[column];
                // append to tr
                var td = document.createElement("td");

                var value = record[column];

                if(column.includes("released")){
                    value = moment(value).format('L');
                }else if (column.includes("sales")){    
                    value = numeral(value).format('$0,0');
                }else if (column.includes("tickets")){    
                    value = numeral(value).format('0,0');
                }
                td.textContent = value;

                tr.appendChild(td);
            });

            // append tr to tbody;
            tbody.appendChild(tr);
        })

        //append thead and tbody to table;
        table.appendChild(thead);
        table.appendChild(tbody);

        report.appendChild(h2);
        report.appendChild(table);
    }

    var starWars = function(){
        return MOVIES.filter(function (item) {
            return item.title.toLowerCase().includes("star wars");
        }).sort(function(a, b) {
            return a.title.toLowerCase().localeCompare(b.title);
        });
    }

    var twenty = function() {
        return MOVIES.filter(function (item) {
            return Date.parse(item.released) < Date.parse("2000-01-01T00:00:00Z");
        }).sort(function (a, b) { 
            var releasedDiff = moment(a.released).diff(b.released)
            if (releasedDiff === 0){
                return a.year - b.year
            }
            return releasedDiff;
        });
    }

    var avgSales = function() {
        var genreAvg = [];
        var genreCount = {};
        var genreSales = {};
        MOVIES.forEach(function(movie){
            var sales = movie.sales;
            var genre = movie.genre;
            if (genre === ""){
                genre = "N/A";
            }
            var currentGenreSales = genreSales[genre];
            var currentGenreCount = genreCount[genre];
            if(currentGenreSales) {
                genreSales[genre] += sales;
            } else{
                genreSales[genre] = sales;
            }
            if(currentGenreCount) {
                genreCount[genre] +=  1;
            } else {
                genreCount[genre] = 1;
            }
        });
        var genres = Object.keys(genreCount);
        genres.forEach(function (genre){
            var sales = genreSales[genre];
            var count = genreCount[genre];
            var average = sales/count;
            genreAvg.push({
                Genre: genre,
                "Average Sales": average
            });
        });
       
        genreAvg.sort(function (a, b){
            return b["Average Sales"] - a["Average Sales"];
        });

        genreAvg.forEach(function (genre){
            genre["Average Sales"] = numeral(genre["Average Sales"]).format('$0,0.00');
        });

        return genreAvg;
    }
        
    var top100 = function() {
        var titleTickets = [];
        var ticketCount = {};
        MOVIES.forEach(function (movie){
            var title = movie.title + " (" + movie.released.substring(0, 4) + ")";
            var tickets = movie.tickets;
            var currentTicket = ticketCount[title];

            if(currentTicket){
                ticketCount[title] += tickets;
            } else {
                ticketCount[title] = tickets;
            }
        });

        var titles = Object.keys(ticketCount)
        
        titles.forEach(function (title) {
            var ticketSum = ticketCount
            titleTickets.push({
                Title: title,
                "Tickets Sold": ticketSum[title]
            });
        });
        
        titleTickets.sort(function (a, b){
            return b["Tickets Sold"] - a["Tickets Sold"];
        })
        
        titleTickets.forEach(function (title){
            title["Tickets Sold"] = numeral(title["Tickets Sold"]).format('0,0')
        });

        var top100TitleTickets = titleTickets.slice(0, 100);

        return top100TitleTickets;
    }


})();
