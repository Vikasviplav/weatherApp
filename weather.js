var weatherData = document.getElementById("weather_data");


weatherData.addEventListener('click', function (e) {
    e.preventDefault();
    
    var cityName = document.getElementById("cityName").value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1b81668fc60a1d1905a3e5a311d45414`;
    if (cityName == "") {
        alert("Enter a city name");
    } else {
        fetch(url).then(function (response) {
            if (response.ok) {

                return response.json();
            } else {
                alert(`${cityName} not found`)
                window.href = "./index.html"
                throw new Error(Error);
                
            }
        }).then(function (data) {
            var iframe = document.createElement("iframe")
            var tag1 = document.createElement("div")
            var tag2 = document.createElement("div")
            var tag3 = document.createElement("div")
            var tag4 = document.createElement("div")
            var tag5 = document.createElement("div")
            var tag6 = document.createElement("div")
            var tag7 = document.createElement("div")
            iframe.src = `https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed`
            
            let container = document.querySelector("#container")
            container.innerHTML = ""

            let temp = data.main.temp;
            temp = parseInt(temp - 273.15);
            let pressure = data.main.pressure;
            let humidity = data.main.humidity;
            let sunrise = data.sys.sunrise;
            var date = new Date(sunrise * 1000);
            sunrise = date.toLocaleTimeString();

            let sunset = data.sys.sunset;
            var date2 = new Date(sunset * 1000);
            sunset = date2.toLocaleTimeString();
            let windspeed = data.wind.speed;
            let description = data.weather[0].description;
           
            tag1.innerText = `Temperature -  ${temp} °C`
            tag2.innerText = `Pressure -  ${pressure} hPa`
            tag3.innerText = `Humidity - ${humidity} % `
            tag4.innerText = `Sunrise -  ${sunrise}`
            tag5.innerText = ` Sunset - ${sunset}`
            tag6.innerText = `Windspeed - ${windspeed} m/s `
            tag7.innerText = `Weather type - ${description}`
            container.append(tag1,tag2,tag3,tag4,tag5,tag6,tag7)
            

            iframe.style.width = "500px"
            iframe.style.height = "500px"

            var map = document.getElementById("map")
            map.innerHTML = ""
            var x = document.createElement("h4")
            x.innerText = `Map Of ${cityName}`
            map.append(x,iframe)
            let box = document.getElementById("display_data")
            box.style.display = "flex"

            
        }).catch(function (error) {
            console.log(error);
        });
    }
});