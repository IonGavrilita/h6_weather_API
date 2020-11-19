
var cityStorage = ["Chicago", "New York", "Los Angeles"];
var apiKey = "d0be1a0283dc9c0c9c8884c1eaa793db";
var date = moment().format(" DD/MM/YYYY");
var card = $("<div>").attr("class", "card-body");
var dataDaily = $("<div>").attr("class", "dataDaily");
var display = $("#currentWeather");

// Function for displaying city
function renderButtons() {

  // Deleting the city prior to adding new city
  $("#cityListBtn").empty();

  var cityDisplay = JSON.parse(localStorage.getItem("cityStorage"))
  // Looping through the array of city
  for (var i = 0; i < cityDisplay.length; i++) {

    // Then dynamicaly generating buttons for each city in the array
    var a = $("<button>");
    // Adding a class of city-btn to our button
    a.addClass("city-btn");
    // Adding a data-attribute
    a.attr("data-city", cityDisplay[i]);
    // Providing the initial button text
    a.text(cityDisplay[i]);
    // Adding the button to the buttons-view div
    $("#cityListBtn").append(a);
    
  }
}

//add event listener onClick function take the input and save local storage
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var citySearch = $("#search-input").val().trim().toLowerCase();
    cityStorage.push(citySearch);
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
    // The movie from the textbox is then added to our array
    (renderButtons);

    // Constructing a URL to search for weather
var weatherURl = "http://api.openweathermap.org/data/2.5/weather?q="+ citySearch + "&units=imperial&appid="+ apiKey;
console.log(citySearch)
// Performing our AJAX GET request
$.ajax({
    url: weatherURl,
    method: "GET"
})
// After the data comes back from the API
.then(function weather(APIresponse) {
          console.log(APIresponse);
          currentWeather(APIresponse);
         var lon = APIresponse.coord.lon;
         var lat = APIresponse.coord.lat;
          console.log(lon, lat)
    // Storing the data in local storage
    localStorage.setItem("APIresponse", JSON.stringify(APIresponse));
    

//Display current date weather
function currentWeather(APIresponse){
  display.empty();
  //Display data weather in id
  display.append($("<h3>").text(APIresponse.name + date));
  display.append($("<h6>").text("Temperature:"+ APIresponse.main.temp + "°F"));
  display.append($("<h6>").text("Humidity:"+ APIresponse.main.humidity + "%"));
  display.append($("<h6>").text("Wind Speed:"+ APIresponse.wind.speed + "MPH"));
  display.prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + APIresponse.weather[0].icon + ".png"));
  };

 //Call 5 days forecast
 var weatherURl5days = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&appid=" + apiKey;
 $.ajax({
   url: weatherURl5days,
   method: "GET"
 })
 // After the data comes back from the API
 .then(function(APIresponse5days) {
         console.log(APIresponse5days);
         currentWeather5days(APIresponse5days);
   // Storing the data in local storage
   localStorage.setItem("APIresponse5days", JSON.stringify(APIresponse5days));
   
   
   //add UV index with color that indicates whether conditions
 var UVindex = APIresponse5days.current.uvi;
 display.append($('<h6 id= "index">').text("UVindex:"+ UVindex));
 console.log(UVindex);
 if(UVindex < 3){
  $("#index").addClass("green")
 }else if(UVindex >= 3 || UVindex < 6){
  $("#index").addClass("yellow")
 }else if(UVindex >= 6 || UVindex < 8){
  $("#index").addClass("orange")
 }else if(UVindex >= 8 || UVindex < 1){
  $("#index").addClass("red")
 }else if(UVindex >= 11 ){
  $("#index").addClass("violet")
 }
 
 })
  });
})

  //Display current date weather 5 days
function currentWeather5days(APIresponse5days){
  
  //Display data weather in id
  var display5days = $("#5daysWeather");
  display5days.empty();
  dataDaily.empty();
  card.empty();
  for (let i = 0; i<5; i++){
    var num = ((Math.round(APIresponse5days.daily[i].wind_speed)*2.237).toFixed(2));
  dataDaily.append($("<h5>").text(formatDate(APIresponse5days.daily[i].dt )));
  dataDaily.append($("<p>").text("Temperature:"+ (Math.round(APIresponse5days.daily[i].temp.day - 273.15) * 1.8 + 32)));
  dataDaily.append($("<p>").text("Humidity:"+ APIresponse5days.daily[i].humidity + "%"));
  dataDaily.append($("<p>").text("Wind Speed:"+ num + "MPH"));
  dataDaily.prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + APIresponse5days.daily[i].weather[0].icon + ".png"));
  card.append(dataDaily);
  display5days.append(card);

  }}
  

  //Convert date from API call
  function formatDate(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    return date.toLocaleDateString();
}
 

// Calling the renderButtons function at least once to display the initial list of cities
renderButtons();




  



