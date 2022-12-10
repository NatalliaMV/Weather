const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "7fbdd52b8673967f348447dd07e85422"
}

const input = document.querySelector("#input");

input.addEventListener("keydown", enter);

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value.toLowerCase());
        document.querySelector("#input").value = "";
    }
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();
    displayResult(result); 
}

function displayResult(result) {
    const city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate()

    const temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;
    
    const feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `Feel like: ${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].description}`;

    let variation = document.querySelector("#variation");
    variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>` + " " + "Max: " + `${Math.round(result.main.temp_max)}<span>°</span>`;

    function getOurDate() {
        const myDate = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let day = days[myDate.getDay()];
        let dayNumber = myDate.getDate();
        let month = months[myDate.getMonth()];
        let year = myDate.getFullYear();

        let showDate = document.querySelector("#date");
        showDate.textContent = `${day}` +  " " + `${dayNumber}` + " " + `${month}` + " " + `${year}`
        
    }
}

getInfo('Warsaw,pl');