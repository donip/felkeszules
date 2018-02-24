function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);

    var newData = userDatas[0].users;
    var headerData = ['Azonosító', 'Felhasználónév', 'Jelszó',
        'Vezetéknév', 'Keresztnév', 'Ország', 'Állam/Megye',
        'Irányítószám', 'Város', 'Cím', 'Nem', 'Születési dátum',
        'Email cím', 'Telefonszám'
    ];
    console.log(newData);
    createTableElement('thead', 'newTable'); //creating thead in HTML
    createTableElement('tbody', 'newTable'); //creating tbody in HTML
    document.querySelector('#newthead').innerHTML = fillTableHeader(headerData);
    document.querySelector('#newtbody').innerHTML = fillTableBody(newData);

    document.getElementById("button90").addEventListener("click", function () {
        bornBefore90(newData)
    });
    document.getElementById("buttonEldest").addEventListener("click", function () {
        eldest3(newData)
    });
    document.getElementById("betweenFilter").addEventListener("click", function () {
        bornBetween(newData)
    });
    document.getElementById("button2000").addEventListener("click", function () {
        bornBeforeOrNotBp(newData)
    });
    //bornBefore90(newData);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG!

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

getData('/js/users.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


// ------------------------ CREATING TABLE CONTENT ---------------------------

function createTableElement(element, selector) {
    tableHTML = document.getElementById(selector);
    tableHTML.innerHTML += `<${element} id = "new${element}"></${element}>`;
}

function fillTableHeader(data) {
    var tableHeadData = '';
    for (var k in data) {
        tableHeadData += `<th>${data[k]}</th>`; //filling thead from headerData[]
    }
    return tableHeadData;
}

function fillTableBody(data, loops = data.length) {
    var tableBodyData = '';
    for (var i = 0; i < loops; i++) {
        tableBodyData += '<tr>';
        for (var k in data[i]) {
            if (data[i][k]) {
                tableBodyData += `<td>${data[i][k]}</td>`;
            } else {
                tableBodyData += `<td></td>`;
            }
        }
        tableBodyData += '</tr>';
    }
    return tableBodyData;
}

// ----------- 90 ELOTTI SZULETESUEK -----------
function bornBefore90(data) {
    var filteredData = [];
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].birthdate.substring(0, 4)) < 1990) {
            filteredData.push(data[i].username);
        }
    }
    document.querySelector('#newthead').innerHTML = `<th>Azonosító</th>`;
    document.querySelector('#newtbody').innerHTML = insertFilteredData(filteredData);
    // return filteredData;
}
// ------------ EGYSZERU ARRAY TABLAZATBA TOLTESE --------------
function insertFilteredData(data) {
    var tableBodyData = '';
    for (var i = 0; i < data.length; i++) {
        tableBodyData += `<tr><td>${data[i]}</td></tr>`;
    }
    return tableBodyData;
}

// ------------- 3 Legidosebb ember ------------------
function eldest3(data) {
    var sortedData = sortStringsWithDotSort(data, 'birthdate');

    var filteredData = [];
    for (var i = 0; i < 3; i++) {
        filteredData.push({
            0: sortedData[i].firstname,
            1: sortedData[i].lastname,
            2: sortedData[i].birthdate
        });
    }


    document.querySelector('#newtbody').innerHTML = fillTableBody(filteredData);
    var headArray = ['Vezetéknév', 'Keresztnév', 'Születési dátum'];
    var tableHeadData = '';
    for (var k in headArray) {
        tableHeadData += `<th>${headArray[k]}</th>`; //filling thead from headerData[]
    }
    document.querySelector('#newthead').innerHTML = tableHeadData;
}
// ----------- SORBARENDEZO FUGGVENY -------------
function sortStringsWithDotSort(data, key) {
    data.sort(function (a, b) {
        var nameA = a[key].toLowerCase();
        var nameB = b[key].toLowerCase();
        //return nameA.localeCompare(nameB); //magyar abc szerint
        if (nameA < nameB) { //angol abc szerint
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return data;

}

//-------------------1900 es 2000 kozott ----------------------------------------------

function bornBetween(data) {
    var sortedData = sortStringsWithDotSort(data, 'firstname');
    var filteredData = [];
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].birthdate.substring(0, 4)) < 2001 && parseInt(data[i].birthdate.substring(0, 4)) > 1899 &&
            data[i].sex === 'férfi' && data[i].state) {
            filteredData.push({
                0: data[i].firstname,
                1: data[i].lastname
            });
        }
    }
    // kiratas kulon kene szedni
    document.querySelector('#newtbody').innerHTML = fillTableBody(filteredData);

    var headArray = ['Vezetéknév', 'Keresztnév'];
    var tableHeadData = '';
    for (var k in headArray) {
        tableHeadData += `<th>${headArray[k]}</th>`; //filling thead from headerData[]
    }
    document.querySelector('#newthead').innerHTML = tableHeadData;

}

//------------------------------------------

/*function cityCount(data) {

    var filteredData = [];
    for (var i = 0; i < data.length; i++) {
        if ((< 1990) {
            filteredData.push(data[i].username);
        }
    }
    document.querySelector('#newthead').innerHTML = `<th>Azonosító</th>`;
    document.querySelector('#newtbody').innerHTML = insertFilteredData(filteredData);
}*/

//-------------------------------------

function bornBeforeOrNotBp(data) {
    var filteredData = [];
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].birthdate.substring(0, 4)) < 2000 || data[i].city != 'Budapest') {
            filteredData.push({
                0: data[i].username,
                1: data[i].firstname,
                2: data[i].lastname,
                3: data[i].email,
                4: data[i].phone
            });
        }
    }
    document.querySelector('#newtbody').innerHTML = fillTableBody(filteredData);

    var headArray = ['Felhasználónév', 'Vezetéknév', 'Keresztnév', 'Email cím', 'Telefonszám'];
    var tableHeadData = '';
    for (var k in headArray) {
        tableHeadData += `<th>${headArray[k]}</th>`; //filling thead from headerData[]
    }
    document.querySelector('#newthead').innerHTML = tableHeadData;
}