// event listeners
document.querySelector("#zip").addEventListener("change",displayCity);

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