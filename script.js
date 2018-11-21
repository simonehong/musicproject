
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

  var database = firebase.database();

  //new band search will be created on button submit click
  $("#submit").on("click", function(event){
  event.preventDefault();
  
  //Grab user input
  var artistName = $("#bandSearch").val().trim();

  // Creates local "temporary" object for holding search data
  var searchArtist = {
       name: artistName,
       dateAdded: firebase.database.ServerValue.TIMESTAMP 
  };

  database.ref().push(searchArtist);

  console.log(searchArtist.name);
  console.log(searchArtist.dateAdded);

  //clear search box
  $("#bandSearch").val("");

  });

  //create firebase event to push artist to database and append to previous search list on html
    database.ref().on("child_added", function(childSnapshot){
      var artistName = childSnapshot.val().name;
      var dateAdded = childSnapshot.val().dateAdded;

      console.log(artistName);
      console.log(dateAdded);

  //push search term to previous search card
      var prevArtist = $("<a>");
      prevArtist.addClass("collection-item");
      prevArtist.attr("data-value", artistName);
      prevArtist.text(artistName);

      $("#prevSearch").preappend(prevArtist);
         
      
 })






















































































// Create API link to Bandsintown
// App ID = ab1539793d4956976bf4f8052a7ed8cb
var artistName = "Foo Fighters"

// Get Artist Object from BandsInTown
function getEventInfo(artistName) {

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
function getArtistInfo(artistName) {

  var queryBand = "https://rest.bandsintown.com/artists/" +
          artistName + "?app_id=ab1539793d4956976bf4f8052a7ed8cb";
  
  $.ajax({
    url: queryBand,
    method: "GET"
  }).then(function(response) {
  
    // Printing the entire object to console
    console.log(response);
    //fill in the Card with artist info
    $("#artistpicture").attr("src", response.image_url);
    $(".artist-name").html(artistName);
    $("#artist-page").attr("href",response.url)

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

