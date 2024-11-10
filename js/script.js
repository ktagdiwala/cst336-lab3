// event listeners
document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);
document.querySelector("#password").addEventListener("focus",suggestPassword);
document.querySelector("#signupForm").addEventListener("submit",function(event){
    validateForm(event);
});
// Wrapped in anonymous function to ensure that displayStates() is executed once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => displayStates());

// functions

// Displaying the list of US states from Web API
async function displayStates(){
    // console.log("The page has loaded...");
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    let stateList = document.querySelector("#state");
    for(let i = 0; i<data.length; i++){
        stateList.innerHTML += `<option value="${data[i].usps}">${data[i].state}</option>`;
    }
}

// Displaying city from Web API after entering zip code
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    // alert(document.querySelector("#zip").value);
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    let zipError = document.querySelector("#zipError");
    // console.log(data);
    if(data==false){
        zipError.innerHTML = "Zipcode does not exist";
        zipError.style.color = "#FDBCB4";
    }else{
        zipError.innerHTML = "";
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#longitude").innerHTML = data.longitude;
        // document.querySelector("#state").innerHTML = data.state;
        // document.querySelector("#county").innerHTML = data.county;
    }
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
        usernameError.style.color = "#A7E8BD";
    }else{
        usernameError.innerHTML = "Username not available!";
        usernameError.style.color = "#FDBCB4";
    }
}

// Validating form data
function validateForm(e){
    let isValid = true;
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");
    if(username.length==0){
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        document.querySelector("#usernameError").style.color = "#FDBCB4";
        isValid = false;
    }else if(usernameError.innerHTML!="Username available!"){
        isValid = false;
    }
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;
    let passError = document.querySelector("#passwordError");

    if(password.length<6){
        passError.innerHTML = "Password must be at least 6 characters";
        passError.style.color = "#FDBCB4";
        isValid = false;
    }else if(password!=confirmPassword){
        passError.innerHTML = "Passwords must match";
        passError.style.color = "#FDBCB4";
        isValid = false;
    }else{
        document.querySelector("#passwordError").innerHTML = "";
    }


    if(!isValid){
        e.preventDefault();
    }
}

async function suggestPassword(){
    let suggestPass = document.querySelector("#suggestPass");
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data.password);
    suggestPass.innerHTML=data.password;
}