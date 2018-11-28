

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

  var nineSearch = [];

  //Creates an array of search terms from Firebase and appends to the HTML
  function showNineSearch(){
    $("#prevSearch").empty();
    for (var i = 0; i < nineSearch.length; i++){
      var prevArtist = $("<a>");
      prevArtist.addClass("collection-item");
      prevArtist.attr("data-value", nineSearch[i].name);
      prevArtist.attr("date", nineSearch[i].dateAdded);
      prevArtist.text(nineSearch[i].name);

      $("#prevSearch").append(prevArtist);
    }
  }

  //new band search will be created on button submit click
  $("#submit").on("click", function(event){

    event.preventDefault();
  //Grab user input
  var artistName = $("#bandSearch").val().trim();
  
      if (artistName == "") {
        M.toast({html: 'Please enter a band name before submitting'});
      } else {
        getArtistInfo(artistName);
        getEventInfo(artistName);
      
        // Creates local "temporary" object for holding search data
        var searchArtist = {
             name: artistName,
             dateAdded: firebase.database.ServerValue.TIMESTAMP
      };
    };


  database.ref().push(searchArtist);

  console.log(searchArtist.name);
  console.log(searchArtist.dateAdded);

  //clear search box
  $("#bandSearch").val("");

  });

  //create firebase event to push artist to database and append to previous search list on html
    var query = database.ref().orderByChild("dateAdded").limitToLast(9);


  
    query.on("child_added", function(childSnapshot){
      var artistName = childSnapshot.val().name;
      var dateAdded = childSnapshot.val().dateAdded;

      console.log(artistName);
      console.log(dateAdded);
    
      nineSearch.push(childSnapshot.val());
      if (nineSearch.length > 9){
        nineSearch.shift();
      }


      showNineSearch();

      
 });
























































































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

$("#eventsNum").html("")
$("#eventsNum").append("<strong>Upcoming Events: </strong>"+response.length);
$(".event-info").html("");



  for (let i = 0; i < response.length; i++) {
    var goodDate = moment(response[i].datetime).format('MMMM Do, YYYY @ h:mm A')
    $(".event-info").append("<p><strong>Date: </strong>"+goodDate+"</p>")
    $(".event-info").append("<p><strong>Venue: </strong>"+response[i].venue.name+" - "+response[i].venue.city+", "+response[i].venue.country+"</p>")
    $(".event-info").append("<p><a href='"+response[i].url+"' target='_blank'><button type='button' class='waves-effect waves-light btn'>Buy Tickets</button></a></p><hr>")
    
  };

  
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
    $(".artist-name").html(artistName+'<a class="btn-small waves-effect waves-light red right event-button"><i class="material-icons">events</i><i id="buttonText">Events</i></a></span>');
    $("#artist-page").attr("href",response.url);
    $("#followers").html("");
    $("#followers").append("<strong>Followers: </strong>"+response.tracker_count);

  });
  };

  
























  var Video = []; 

var getVideo = function(){

  
// Begin building an object to contain our API call's query parameters
// Set the API key
var apiKey ="AIzaSyCHYhmqVOwG3KDfWOt9iZS0i1dZVMsabgo";

// Grabbing and storing the band property value from Bandsintown
//var bandName = $(this).data("type");  //This is just a placeholder until Bandsintown api call is finished
//console.log(bandName);
var bandName = "TaylorSwift"

// Constructing a queryURL using the band name
var queryURL = "https://www.googleapis.com/youtube/v3/search?q=" +
      bandName + "&key=" + apiKey + "&part=snippet&type=video";

// Performing an AJAX request with the queryURL
$.ajax({
    url: queryURL,
    method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        

        for (var i = 0; i < response.items.length; i++) {

          // Creating and storing a div tag
         var artistDiv = $("<div class='search-item'>");

         // Creating and storing an image tag
         var artistImage = $("<img>");

         //get thumbnail from youtube
          var artistThumb = response.items[i].snippet.thumbnails.high.url;

          //adding src to image tag
          artistImage.attr("src", artistThumb);

          //adding image to div
          artistDiv.append(artistImage);

          // Appending the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#image-appear-here").append(artistDiv);

          //get videoId from youtube
          artistVideo = response.items[i].id.videoId;
          
          Video.push(artistVideo);
          
        
         
          

        
      };
      
      console.log(Video);

      
      
  });

  };

  console.log(Video);
  console.log(typeof(Video));


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
console.log(Video);
var tag = document.createElement('script');



tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var YouTubePlayer = {

  current: 0,

  player: null,

  /**

   * Tracks ids here...

   */

  videos: [

   "tCXGJQYZ9JA",
 "3tmd-ClpJxA",
 "e-ORhEE9VVg",
//"nfWlot6h_JM",
 //"VuNIsY6JdUw"

  ],

  currentlyPlaying: function () {

    console.info('Current Track id', YouTubePlayer.videos[YouTubePlayer.current]);

    return YouTubePlayer.videos[YouTubePlayer.current];

  },

  playNext: function () {

    YouTubePlayer.increaseTrack()

    if (YouTubePlayer.player) {

      YouTubePlayer.currentlyPlaying();

      YouTubePlayer.player.loadVideoById(YouTubePlayer.videos[YouTubePlayer.current]);

    } else {

      alert('Please Wait! Player is loading');

    }

  },

  playPrevious: function () {

    YouTubePlayer.decreaseTrack()

    if (YouTubePlayer.player) {

      YouTubePlayer.currentlyPlaying();

      YouTubePlayer.player.loadVideoById(YouTubePlayer.videos[YouTubePlayer.current]);

    } else {

      alert('Please Wait! Player is loading');

    }

  },

  increaseTrack: function () {

    YouTubePlayer.current = YouTubePlayer.current + 1;

    if (YouTubePlayer.current >= YouTubePlayer.videos.length) {

      YouTubePlayer.current = 0;

    }

  },

  decreaseTrack: function () {

    YouTubePlayer.current = Math.max(YouTubePlayer.current - 1, 0);

  },

  onReady: function (event) {

    event.target.loadVideoById(YouTubePlayer.videos[YouTubePlayer.current]);

  },

  onStateChange: function (event) {

    if (event.data == YT.PlayerState.ENDED) {

      YouTubePlayer.playNext();

    }

  }

}



function onYouTubeIframeAPIReady() {

  YouTubePlayer.player = new YT.Player('youtube', {

    height: '350',

    width: '425',

    events: {

      'onReady': YouTubePlayer.onReady,

      'onStateChange': YouTubePlayer.onStateChange

    }

  });

}


/*var player;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
//console.log(Video);
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width: 640,
        height: 360,
        videoId: Video,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }

    });

}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo(getVideo);
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, -10);
        //stopVideo();
        done = true;
    }

}
function stopVideo() {
    player.stopVideo();
}*/

getVideo();
