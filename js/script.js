// event listeners
document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);

// functions

// Displaying city from Web API after entering zip code
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    // alert(document.querySelector("#zip").value);
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
    // document.querySelector("#state").innerHTML = data.state;
    // document.querySelector("#county").innerHTML = data.county;
    
}

async function displayCounties(){
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>"
    for(let i = 0; i<data.length; i++){
        countyList.innerHTML += `<option>${data[i].county}</option>`;
    }

}