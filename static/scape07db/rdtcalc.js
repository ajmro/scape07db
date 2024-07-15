var tables = [
    [
        ['Nature rune', '67', '3/128'],
        ['Adamant javelin', '20', '2/128'],
        ['Death rune', '45', '2/128'],
        ['Law rune', '45', '2/128'],
        ['Rune arrow', '42', '2/128'],
        ['Steel arrow', '150', '2/128'],
        ['Rune 2h sword', '1', '3/128'],
        ['Rune battleaxe', '1', '3/128'],
        ['Rune sq shield', '1', '2/128'],
        ['Dragon med helm', '1', '1/128'],
        ['Rune kiteshield', '1', '1/128'],
        ['Coins', '3000', '21/128'],
        ['Runite bar', '1', '5/128'],
        ['Dragonstone', '1', '2/128'],
        ['Silver ore (noted)', '100', '2/128'],
    ],
    [
        ['Uncut sapphire', '1', '32/128'],
        ['Uncut emerald', '1', '16/128'],
        ['Uncut ruby', '1', '8/128'],
        ['Chaos/Nature talisman', '1', '3/128'],
        ['Uncut diamond', '1', '2/128'],
        ['Rune javelin', '5', '1/128'],
        ['Loop half of key', '1', '1/128'],
        ['Tooth half of key', '1', '1/128']
    ],
    [
        ['Rune spear', '1', '8/128'],
        ['Shield left half', '1', '4/128'],
        ['Dragon spear', '1', '3/128']
    ],
    [
        ['Grimy guam leaf', '1', '32/128'],
        ['Grimy marrentil', '1', '24/128'],
        ['Grimy tarromin', '1', '18/128'],
        ['Grimy harralander', '1', '14/128'],
        ['Grimy ranarr weed', '1', '11/128'],
        ['Grimy irit leaf', '1', '8/128'],
        ['Grimy avantoe', '1', '6/128'],
        ['Grimy kwuarm', '1', '5/128'],
        ['Grimy cadantine', '1', '4/128'],
        ['Grimy lantadyme', '1', '3/128'],
        ['Grimy dwarf weed', '1', '3/128']
    ],

    [
        ['Toadflax seed', '1', '47/238'],
        ['Irit seed', '1', '32/238'],
        ['Belladonna seed', '1', '31/238'],
        ['Avantoe seed', '1', '22/238'],
        ['Poison ivy seed', '1', '22/238'],
        ['Cactus seed', '1', '21/238'],
        ['Kwuarm seed', '1', '15/238'],
        ['Snapdragon seed', '1', '10/238'],
        ['Cadantine seed', '1', '7/238'],
        ['Lantadyme seed', '1', '5/238'],
        ['Dwarf weed seed', '1', '3/238'],
        ['Torstol seed', '1', '2/238']
    ],

    [
        ['Limpwurt seed', '1', '137/1048'],
        ['Strawberry seed', '1', '131/1048'],
        ['Marrentil seed', '1', '125/1048'],
        ['Jangerberry seed', '1', '92/1048'],
        ['Tarromin seed', '1', '85/1048'],
        ['Wildblood seed', '1', '83/1048'],
        ['Watermelon seed', '1', '63/1048'],
        ['Harralander seed', '1', '56/1048'],
        ['Ranarr seed', '1', '39/1048'],
        ['Whiteberry seed', '1', '34/1048'],
        ['Mushroom spore', '1', '29/1048'],
        ['Toadflax seed', '1', '27/1048'],
        ['Belladonna seed', '1', '18/1048'],
        ['Irit seed', '1', '18/1048'],
        ['Poison ivy seed', '1', '13/1048'],
        ['Avantoe seed', '1', '12/1048'],
        ['Cactus seed', '1', '12/1048'],
        ['Kwuarm seed', '1', '9/1048'],
        ['Snapdragon seed', '1', '5/1048'],
        ['Cadantine seed', '1', '4/1048'],
        ['Lantadyme seed', '1', '3/1048'],
        ['Dwarf weed seed', '1', '2/1048'],
        ['Torstol seed', '1', '1/1048']

    ],
    
    [
        ['1/127', '1', '1/127'],
        ['124/127', '1', '124/127'],
        ['21/252', '1', '21/252'],
        ['189/252', '1', '189/252']

    ],
];

function getGCD(num, den) {
    var a = num;
    var b = den;
    var c;
    while (b) {
        c = a % b;
        a = b;
        b = c;
    }
    return a;
}

function roundToDecimals(n, decimals) {
    var log10 = n ? Math.floor(Math.log10(n)) : 0,
        div = log10 < 0 ? Math.pow(10, decimals - log10 - 1) : Math.pow(10, decimals);

    return Math.round(n * div) / div;
}

function rateCalc(ratea, rateb, add = false) {
    var rate1 = ratea.split('/');
    var rate2 = rateb.split('/');

    if (add == false) {
        var num = parseFloat(rate1[0]) * parseFloat(rate2[0]);
    } else {
        var num = (parseFloat(rate1[0]) * parseFloat(rate2[1])) + (parseFloat(rate1[1]) * parseFloat(rate2[0]))
    }
    var den = parseFloat(rate1[1]) * parseFloat(rate2[1]);
    var gcd = getGCD(num, den);
    var res = String(num / gcd) + "/" + String(den / gcd);

    return res;
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
        return String(roundToDecimals(res2, 3))
    }

}

function getRows(table, rate) {
    var rows = "";

    rows += "<tr>";
    rows += "<td>" +
        table[0] + "</td>" +
        "<td>" + table[1] + "</td>" +
        "<td class='pointer' onclick='copyText(this)'>" + rate + "</td>" +
        "<td>" + rateSimplify(rate) + "</td>" +
        "<td>" + rateSimplify(rate, true) + "</td>";
    rows += "</tr>";

    return rows;
}

function submitForm() {
    document.getElementById("result").innerHTML = ''
    var droptable = document.getElementById('droptable').value;

    var rate = document.getElementById('rate').value;
    if (inputTest(rate) == false) {
        return;
    }

    var gdt = document.getElementById('gdt').value;
    if (gdt != '') {
        if (inputTest(gdt) == false) {
            return;
        }
    }

    var table = ''

    for (var i = 0; i < tables[droptable].length; i++) {
        var o = tables[droptable][i];

        var temp = rateCalc(o[2], rate)

        table += getRows(o, temp);
    }

    if (droptable == 0) {

        for (var i = 0; i < tables[1].length; i++) {
            var o = tables[1][i];

            //chance from sdt
            var temp = rateCalc(rate, '20/128')
            var temp2 = rateCalc(temp, o[2])

            //adding extra gdt roll
            if (gdt != '') {
                var temp3 = rateCalc(gdt, o[2])
                var temp2 = rateCalc(temp2, temp3, true)
            }

            //adding loop/tooth roll from sdt
            if (o[0] == 'Loop half of key') {
                var temp2 = rateCalc(temp2, temp, true)
            }
            if (o[0] == 'Tooth half of key') {
                var temp2 = rateCalc(temp2, temp, true)
            }

            table += getRows(o, temp2);
        }

        for (var i = 0; i < tables[2].length; i++) {
            var o = tables[2][i];

            //chance from sdt
            var temp = rateCalc(rate, '15/128')
            var temp2 = rateCalc(temp, o[2])

            //chance from gdt
            var temp3 = rateCalc(rate, '20/128')
            var temp4 = rateCalc(temp3, '1/128')
            var temp5 = rateCalc(temp4, o[2])

            //adding them
            var temp6 = rateCalc(temp2, temp5, true)

            //adding extra gdt roll
            if (gdt != '') {
                var temp7 = rateCalc(gdt, '1/128')
                var temp8 = rateCalc(temp7, o[2])
                var temp6 = rateCalc(temp6, temp8, true)
            }

            table += getRows(o, temp6);
        }
    }

    if (droptable == 1) {

        for (var i = 0; i < tables[2].length; i++) {
            var o = tables[2][i];

            var temp = rateCalc(rate, '1/128')
            var temp2 = rateCalc(temp, o[2])

            table += getRows(o, temp2);
        }
    }

    document.getElementById("result").innerHTML = table;
}

function updateRates() {
    if (document.getElementById('droptable').value == 0) {
        document.getElementById("result").innerHTML = ''
        document.getElementById('dgdt').hidden = false
        return;
    } else {
        document.getElementById("result").innerHTML = ''
        document.getElementById('dgdt').hidden = true
        return;
    }
}

function copyText(value) {
    navigator.clipboard.writeText(value.innerHTML);
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function inputTest(value) {
    var test = value.split('/');
    if (test.length != 2) {
        return false;
    }
    if (isNumeric(test[0]) == false) {
        return false;
    }
    if (isNumeric(test[1]) == false) {
        return false;
    }
    return true;
}