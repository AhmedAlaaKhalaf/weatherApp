let sign = document.getElementById("sign")
let find = document.getElementById("find")
let currentCity = document.getElementById("currentCity")
let currentDegree = document.getElementById("currentDegree")
let currentImg = document.getElementById("currentImg")
let weatherStatus = document.getElementById("weatherStatus")
let humidity = document.getElementById("humidity")
let windSpeed = document.getElementById("windSpeed")
let windDirection = document.getElementById("windDirection")
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp")
let nextLowTemp = document.getElementsByClassName("nextLowTemp")
let nextWeatherStatus = document.getElementsByClassName("nextWeatherStatus")
let nextImg = document.getElementsByClassName("nextImg")
let todayNumber = document.querySelector(".todayDate .dayNumber")
let todayMonth = document.querySelector(".todayDate .month")
let todayName= document.querySelector(".todayName")
let nextDayName= document.querySelectorAll(".nextDayName")

async function getWeather (cityName) {
      var res = await fetch (`http://api.weatherapi.com/v1/forecast.json?key=35a0725d911247b4bd8184525241307&q=${cityName}&days=3`, {method:"GET"})
      var data = await res.json()
      return data;
}

// display current data
function displayData (weatherData){
      
      currentCity.innerHTML = weatherData.location.name
      currentDegree.innerHTML = weatherData.current.temp_c
      currentImg.setAttribute ("src",weatherData.current.condition.icon)
      weatherStatus.innerHTML = weatherData.current.condition.text
      humidity.innerHTML = weatherData.current.humidity+"%"
      windSpeed.innerHTML = weatherData.current.wind_kph+"km/h" 
      windDirection.innerHTML = weatherData.current.wind_dir
      let date = new Date()
      todayNumber.innerHTML = date.getDate()
      todayMonth.innerHTML = date.toLocaleDateString("en-US" , {month:"long"})
      todayName.innerHTML = date.toLocaleDateString("en-US" , {weekday:"long"})
}

// display next data
function displayNext(weatherData) {
      for(i=0; i<2;i++) {
            nextMaxTemp[i].innerHTML = weatherData.forecast.forecastday[i+1].day.maxtemp_c+` <sup>o</sup>C`
            nextLowTemp[i].innerHTML = weatherData.forecast.forecastday[i+1].day.mintemp_c+` <sup>o</sup>`
            nextWeatherStatus[i].innerHTML = weatherData.forecast.forecastday[i+1].day.condition.text
            nextImg[i].setAttribute("src",weatherData.forecast.forecastday[i+1].day.condition.icon) 
            let nextDate = new Date (weatherData.forecast.forecastday[i+1].date)
            nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US" , {weekday:"long"})
      }

}

// Run the functions
async function startDisplay(city="cairo"){
      let data = await getWeather(city)
      if (!data.error) {
      displayData(data)
      displayNext(data)
      }
}
// Display searched input
find.addEventListener("input", function(){
      startDisplay(find.value);
}
)
