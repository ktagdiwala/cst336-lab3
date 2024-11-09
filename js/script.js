// event listeners
document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);

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

async function checkUsername(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if(data.available){
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    }else{
        usernameError.innerHTML = "Username not available!";
        usernameError.style.color = "red";
    }
}