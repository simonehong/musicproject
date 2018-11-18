
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

var artistName = "Taylor Swift"
var queryBand = "https://rest.bandsintown.com/artists" +
        artistName + "?app_id=ab1539793d4956976bf4f8052a7ed8cb";

$.ajax({
  url: queryBand,
  method: "GET"
}).then(function(response) {

  // Printing the entire object to console
  console.log(response);
});