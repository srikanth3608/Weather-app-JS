const wrapper = document.querySelector('.wrapper');
const inputpart = document.querySelector('.input-part');
const infotxt = document.querySelector('.info-txt');
const inputfield = document.querySelector('input');
const apikey = "78a883a16d7c989da80982b2637c0f78";
const locationbutton = document.querySelector('button');
let weathericon = document.querySelector('.weather-part img')
let api;
let arrow = document.querySelector('header i')

inputfield.addEventListener('keyup',e =>{
    if(e.key == "Enter" && inputfield.value != ""){
        requestApi(inputfield.value);
    }
});

locationbutton.addEventListener('click',() => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation API")
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
    fetchdata()
}
function onError(error){
    infotxt.innerHTML = error.message;
    infotxt.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchdata();
}
function fetchdata(){
    infotxt.innerHTML = "Getting weather details...";
    infotxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherdetails(result));
}
function weatherdetails(info){
    console.log(info);
}

function weatherdetails(info){
    infotxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        infotxt.innerHTML = `${inputfield.value} is't a valid city name`;
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            weathericon.src = "clear.svg"
        }
        else if(id >= 200 && id <= 232){
            weathericon.src = "storm.svg"
        }
        else if(id >= 600 && id <= 622){
            weathericon.src = "snow.svg"
        }
        else if(id >= 701 && id <= 781){
            weathericon.src = "haze.svg"
        }
        else if(id >= 801 && id <= 804){
            weathericon.src = "cloud.svg"
        }
        else if((id >= 300 && id <= 321)||(id >= 500 && id <= 531)){
            weathericon.src = "rain.svg"
        }

        wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;

        infotxt.classList.replace("pending", "error");
        wrapper.classList.add("active");
    }
}
arrow.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
    infotxt.classList.remove("pending", "error");
})