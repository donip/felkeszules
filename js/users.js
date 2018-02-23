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

function fillTableBody(data) {
    var tableBodyData = '';
    for (var i = 0; i < data.length; i++) {
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