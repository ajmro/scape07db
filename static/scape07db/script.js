function fillTable(item = false) {
    var tb = document.getElementById("tableBody");
    tr = tb.getElementsByTagName("tr");
    ratecol = 2;
    sratecol = 3;
    perccol = 4;
    qtycol = 1;

    if (item == true) {
        ratecol = 3;
        sratecol = 4
        perccol = 5;
        qtycol = 2;
    }

    for (i = 0; i < tr.length; i++) {
        rate = tr[i].getElementsByTagName("td")[ratecol]
        srate = tr[i].getElementsByTagName("td")[sratecol];
        perc = tr[i].getElementsByTagName("td")[perccol];
        qty = tr[i].getElementsByTagName("td")[qtycol];
        upkill = tr[i].getElementsByTagName("td")[6];
        noted = tr[i].getElementsByTagName("td")[7];

        if (noted.innerHTML == "False") {
            noted.innerHTML = "";
        } else {
            noted.innerHTML = "Yes";
        }

        perc.innerHTML = rateSimplify(rate.innerHTML, true);
        srate.innerHTML = rateSimplify(rate.innerHTML);
        upkill.innerHTML = unitsPerKill(rate.innerHTML, qty.innerHTML);

    }
}

function rateSimplify(rate, percentage = false) {
    var frac = rate.split('/');
    var num = parseFloat(frac[0])
    var den = parseFloat(frac[1])

    if (percentage == false) {
        var res = den / num
        res = Math.round((res + Number.EPSILON) * 100) / 100
        return "1/" + String(res);
    } else {
        var res2 = (num / den) * 100;
        return String(roundToDecimals(res2, 3));
    }

}

function unitsPerKill(rate, qty){
    var fqty = Number(qty);
    var frac = rate.split('/');
    var num = parseFloat(frac[0])
    var den = parseFloat(frac[1])

    if (isNaN(fqty)) {
        var frac2 = qty.split('-');
        fqty = Number((parseFloat(frac2[0]) + parseFloat(frac2[1])) / 2);
    }
    return String(roundToDecimals(((num * fqty) / den), 3));

}

function roundToDecimals(n, decimals) {
    var log10 = n ? Math.floor(Math.log10(n)) : 0,
        div = log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

    return Math.round(n * div) / div;
}

function sortTable(n, item = false) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            row1 = Number(x.innerHTML);
            row2 = Number(y.innerHTML);
            var test = n;

            if (item == true) {
                if (test == 1) {
                    test = 9;
                }
                if (test == 2) {
                    test = 1;
                }

            }

            //for quantity
            if (test == 1) {
                if (isNaN(row1)) {
                    var frac = x.innerHTML.split('-');
                    row1 = Number((parseFloat(frac[0]) + parseFloat(frac[1])) / 2);
                }
                if (isNaN(row2)) {
                    var frac = y.innerHTML.split('-');
                    row2 = Number((parseFloat(frac[0]) + parseFloat(frac[1])) / 2);
                }

            }

            //for item/npc
            if (test == 0) {
                x = x.getElementsByTagName("a")[0];
                y = y.getElementsByTagName("a")[0];
                row1 = x.innerHTML.toLowerCase();
                row2 = y.innerHTML.toLowerCase();
            }

            //for noted
            if (test == 7) {
                row1 = x.innerHTML.toLowerCase();
                row2 = y.innerHTML.toLowerCase();
            }

            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (row1 > row2) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (row1 < row2) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}