window.onload = function () {
    findAllCountry();
    showAll();
}

function addNewCountry() {
    let name = $('#name').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let description = $('#description').val();
    let gdp = $('#gdp').val();
    let country = $('#country').val();

    let newProduct = {
        name: name,
        area: area,
        population: population,
        description: description,
        gdp:gdp,
        country: {
            id: country
        }
    };
    $.ajax({
        //chuyển dữ liệu vè json
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newProduct),
        url: "/cities",
        success: showAll
    });
    //chặn sự kiện
    event.preventDefault();
}

function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities",
        success: function (data) {
            console.log(data)
            let content = '    <tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Area</td>\n' +
                '        <td>Population</td>\n' +
                '        <td>Description</td>\n' +
                '        <td>GDP</td>\n' +
                '        <td>Country</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getCitis(data[i]);
            }
            document.getElementById('cityList').innerHTML = content;
        }
    });
}

function findAllCountry() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/country",
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
                content += getCountry(data[i]);
            }
            document.getElementById('country').innerHTML = content;
        }

    })
}

function getCountry(country) {
    return `<option value="${country.id}">${country.name}</option>`;
}

function findAllCountry1() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/country",
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
                content += getCountry(data[i]);
            }
            document.getElementById('country1').innerHTML = content;
        }

    })
}

function onDelete(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/cities/" + id,
        success: showAll
    })
}

function getCitis(city) {
    return `<tr>` +
        `<td >${city.name}</td>` +
        `<td >${city.area}</td>` +
        `<td >${city.population}</td>` +
        `<td >${city.gdp}</td>` +
        `<td >${city.description}</td>` +
        `<td >${city.country.name}</td>` +
        `<td>
                <button onclick="showFormEdit(${city.id})" class="updateCity" >
                Update
                </button>
                </td>` +
        `<td>
                <button onclick="onDelete(${city.id})" class="deleteCity" >Delete</button>
                </td>` +
        `</tr>`;
}

function showFormEdit(id) {
    let str = '<h3>Edit City</h3>' +
        '<input type="hidden" id="id">' +
        '<table>' +
        '<tr>' +
        '<td>Name:</td>' +
        '<td><input type="text" id="name1" placeholder="Name"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Area:</td>' +
        '<td><input type="text" id="area1" placeholder="Area"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Population:</td>' +
        '<td><input type="text" id="population1" placeholder="Population"></td>' +
        '<tr>' +
        '<td>GDP:</td>' +
        '<td><input type="text" id="gdp1" placeholder="GDP"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Description:</td>' +
        '<td><input type="text" id="description1" placeholder="Description"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Country:</td>' +
        '<td><select id="country1">' +
        findAllCountry1() +
        '</select></td>' +
        '</tr>' +
        '<tr>' +
        '<td></td>' +
        '<td><input type="button" value="Update" onclick="saveEdit()"></td>' +
        '</tr>' +
        '</table>';
    document.getElementById("form").innerHTML = str;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        //xử lý khi thành công
        success: function (data) {
            let idData = id;
            let name = data.name;
            let area = data.area;
            let description = data.description;
            let gdp = data.gdp;

            let country = data.country.id;
            document.getElementById("id").value = idData;
            document.getElementById("name1").value = name;
            document.getElementById("quantity1").value = area;
            document.getElementById("description1").value = description;
            document.getElementById("gdp1").value = gdp;
            document.getElementById("country1").value = country;
        }
    });
}


function saveEdit() {
    let id = document.getElementById("id").value;
    let product = {
        name: document.getElementById("name1").value,
        area: document.getElementById("area1").value,
        population: document.getElementById("population1").value,
        description: document.getElementById("description1").value,
        gdp: document.getElementById("gdp1").value,
        category: {
            id: document.getElementById("country1").value
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/cities/" + id,
        data: JSON.stringify(product),
        success: showAll,
    });
}



