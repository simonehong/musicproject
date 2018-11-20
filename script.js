
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDE2vhxcpy_mIQ7xlURKPlY_d4YnLyR0PE",
    authDomain: "musicproject-77064.firebaseapp.com",
    databaseURL: "https://musicproject-77064.firebaseio.com",
    projectId: "musicproject-77064",
    storageBucket: "",
    messagingSenderId: "858372923149"
  };
  firebase.initializeApp(config);
























































































// Create API link to Bandsintown
// App ID = ab1539793d4956976bf4f8052a7ed8cb
var artistName = "Foo Fighters"

var artistName = "Taylor Swift"
var queryBand = "https://rest.bandsintown.com/artists" +
        artistName + "?app_id=ab1539793d4956976bf4f8052a7ed8cb";



// Get Artist Object from BandsInTown
function getArtistInfo(artistName) {

var queryBand = "https://rest.bandsintown.com/artists/" +
        artistName + "/events/?app_id=ab1539793d4956976bf4f8052a7ed8cb";

$.ajax({
  url: queryBand,
  method: "GET"
}).then(function(response) {

  // Printing the entire object to console
  console.log(response);
});
};

// Get Events Array from BandsInTown
function getEventInfo(artistName) {

  var queryBand = "https://rest.bandsintown.com/artists/" +
          artistName + "?app_id=ab1539793d4956976bf4f8052a7ed8cb";
  
  $.ajax({
    url: queryBand,
    method: "GET"
  }).then(function(response) {
  
    // Printing the entire object to console
    console.log(response);
  });
  };


getArtistInfo(artistName);
getEventInfo(artistName);

    
// Begin building an object to contain our API call's query parameters
// Set the API key
var apiKey ="AIzaSyCHYhmqVOwG3KDfWOt9iZS0i1dZVMsabgo";

// Grabbing and storing the band property value from Bandsintown
var bandName = $(this).data("type");  //This is just a placeholder until Bandsintown api call is finished
console.log(bandName);

// Constructing a queryURL using the animal name
var queryURL = "https://www.googleapis.com/youtube/v3/search?q=" +
      bandName + "&key=" + apiKey + "&part=snippet";

// Performing an AJAX request with the queryURL
$.ajax({
    url: queryURL,
    method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);//

  });

