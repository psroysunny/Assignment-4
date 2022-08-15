var countries = [];
var continueAllCountry = true;

function getAllCovidCountry(){
    fetch(`https://api.covid19api.com/countries`)
    .then(response => response.json())
    .then(data => display(data));
}
getAllCovidCountry();


function getCovidDataByCountry(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            fetch(`https://api.covid19api.com/live/country/${data}/status/confirmed`)
            .then(response => response.json())
            .then(data => resolve(data));
        }, 500);
        
    });
}
  
async function display(data) {
    for(let i=0; i<data.length; i++){
        if(continueAllCountry==false){
            break;
        }
        const result = await getCovidDataByCountry(data[i].Country);
        if(result.length>0){
            if(continueAllCountry==false){
                break;
            }
            displayCovidDataByCountry(result);
        }
    }
}

function displayCovidDataByCountry(data){
    let countryName = data[data.length-1].Country;


    if(continueAllCountry==false){
        document.getElementById("display_all_covid_info").innerHTML="";
        document.getElementById("display_country_info").innerHTML="";
    }
    var outerDiv = document.getElementById("display_all_covid_info");
    

    var newDiv = document.createElement('div');
    newDiv.innerHTML = 
    `<table>
        <tr>
            <td>Country</td>
            <td>: ${data[data.length-1].Country}</td>
        </tr>
        <tr>
            <td>Date</td>
            <td>: ${new Date(data[data.length-1].Date).getDate()}/${new Date(data[data.length-1].Date).getMonth()}/${new Date(data[data.length-1].Date).getFullYear()}</td>
        </tr>
        <tr>
            <td>Active</td>
            <td>: ${data[data.length-1].Active}</td>
        </tr>
        <tr>
            <td>Confirmed</td>
            <td>: ${data[data.length-1].Confirmed}</td>
        </tr>
        <tr>
            <td>Deaths</td>
            <td>: ${data[data.length-1].Deaths}</td>
        </tr>
        <tr>
            <td colspan="2"><button class="button_2" onclick="getCountryData('${countryName}')">More Details</button></td>
        </tr>
        
    </table>`;
    newDiv.style="display: flex; justify-content: center; background: #e0ffff99; padding: 50px 0";


    outerDiv.appendChild(newDiv);
}

function getCountryData(data){
    let country_name = data ? data : document.getElementById('country_name').value.trim();

    fetch(`https://restcountries.com/v3.1/name/${country_name}`)
    .then(response => response.json())
    .then(data => displayCountryInfo(data));

}

function displayCountryInfo(data){

    var languages = '';
    var languagesObj= data[0].languages;

    for(var prop in languagesObj) {
        languages+= '('+languagesObj[prop]+') ';
    }

    document.getElementById("display_country_info").innerHTML="";
    var outerDiv = document.getElementById("display_country_info");

    var newDiv = document.createElement('div');
    newDiv.innerHTML = 
    `<table>
        <tr>
            <th colspan="2">Country Details</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>: ${data[0].name.common}</td>
        </tr>
        <tr>
            <td>Capital</td>
            <td>: ${data[0].capital}</td>
        </tr>
        <tr>
            <td>Population</td>
            <td>: ${data[0].population}</td>
        </tr>
        <tr>
            <td>Language</td>
            <td>: ${languages}</td>
        </tr>
        <tr>
            <td>Continent</td>
            <td>: ${data[0].continents[0]}</td>
        </tr>
        <tr>
            
        </tr>
    </table><img src="${data[0].flags.png}" width="320px" style="margin-left: 50px;"/>`;
    newDiv.style="display: flex; justify-content: center; background: #e0ffff99; padding: 50px;";

    outerDiv.appendChild(newDiv);
}

function getCovidData(data){

    continueAllCountry = false;
    let country_name = data ? data : document.getElementById('country_name').value.trim();

    fetch(`https://api.covid19api.com/live/country/${country_name}/status/confirmed`)
    .then(response => response.json())
    .then(data => displayCovidDataByCountry(data));
}