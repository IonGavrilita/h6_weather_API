var cityStorage = [];
var apiKey = "d0be1a0283dc9c0c9c8884c1eaa793db";


//add event listener onClick function take the input and save local storage
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var citySearch = $("#search-input").val().trim().toLowerCase();
    cityStorage.push(citySearch);
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
    // The movie from the textbox is then added to our array
    

    // Constructing a URL to search for weather
var weatherURl = "http://api.openweathermap.org/data/2.5/weather?q="+ citySearch + "&units=imperial&appid="+ apiKey;
console.log(citySearch)
// Performing our AJAX GET request
$.ajax({
    url: weatherURl,
    method: "GET"
})
// After the data comes back from the API
.then(function(response) {
    console.log(weatherURl);
          console.log(response);
    // Storing an array of results in the results variable
    // var results = response.data;
})

    renderButtons();
})
// Calling the renderButtons function at least once to display the initial list of cities
renderButtons();





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









  



