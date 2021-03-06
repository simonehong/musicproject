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

function showNineSearch() {
  $("#prevSearch").empty();
  for (var i = 0; i < nineSearch.length; i++) {
    var prevArtist = $("<a>");
    prevArtist.addClass("collection-item");
    prevArtist.attr("data-value", nineSearch[i].name);
    prevArtist.attr("date", nineSearch[i].dateAdded);
    prevArtist.text(nineSearch[i].name);

    $("#prevSearch").append(prevArtist);
  }
}

$("#submit").on("click", function (event) {

  event.preventDefault();

  var artistName = $("#bandSearch").val().trim();

  if (artistName == "") {
    M.toast({
      html: 'Please enter a band name before submitting'
    });
  } else {
    getArtistInfo(artistName);
    getEventInfo(artistName);
    getVideoArr(artistName);

    var searchArtist = {
      name: artistName,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
  };


  database.ref().push(searchArtist);

  console.log(searchArtist.name);
  console.log(searchArtist.dateAdded);

  $("#bandSearch").val("");

});

var query = database.ref().orderByChild("dateAdded").limitToLast(9);

query.on("child_added", function (childSnapshot) {
  var artistName = childSnapshot.val().name;
  var dateAdded = childSnapshot.val().dateAdded;

  console.log(artistName);
  console.log(dateAdded);

  nineSearch.push(childSnapshot.val());
  if (nineSearch.length > 9) {
    nineSearch.shift();
  }

  showNineSearch();

$(".collection-item").on("click", function(event){
  event.preventDefault();
  var artistName = ($(this).attr("data-value"));
   console.log(artistName);

    getArtistInfo(artistName);
    getEventInfo(artistName);
    getVideoArr(artistName);

});


})

// Create API link to Bandsintown
// App ID = ab1539793d4956976bf4f8052a7ed8cb

function getEventInfo(artistName) {

  var queryBand = "https://rest.bandsintown.com/artists/" +
    artistName + "/events/?app_id=ab1539793d4956976bf4f8052a7ed8cb";

  $.ajax({
    url: queryBand,
    method: "GET"
  }).then(function (response) {

    console.log(response);

    $("#eventsNum").html("")
    $("#eventsNum").append("<strong>Upcoming Events: </strong>" + response.length);
    $(".event-info").html("");



    for (let i = 0; i < response.length; i++) {
      var goodDate = moment(response[i].datetime).format('MMMM Do, YYYY @ h:mm A')
      $(".event-info").append("<p><strong>Date: </strong>" + goodDate + "</p>")
      $(".event-info").append("<p><strong>Venue: </strong>" + response[i].venue.name + " - " + response[i].venue.city + ", " + response[i].venue.country + "</p>")
      $(".event-info").append("<p><a href='" + response[i].url + "' target='_blank'><button type='button' class='waves-effect waves-light btn'>Buy Tickets</button></a></p><hr>")

    };


  });
};

function getArtistInfo(artistName) {


  var queryBand = "https://rest.bandsintown.com/artists/" +
    artistName + "?app_id=ab1539793d4956976bf4f8052a7ed8cb";

  $.ajax({
    url: queryBand,
    method: "GET"
  }).then(function (response) {

    console.log(response);

    $("#artistpicture").attr("src", response.image_url);
    $(".artist-name").html(artistName + '<a class="btn-small waves-effect waves-light red right event-button"><i class="material-icons">events</i><i id="buttonText">Events</i></a></span>');
    $("#artist-page").attr("href", response.url);
    $("#followers").html("");
    $("#followers").append("<strong>Followers: </strong>" + response.tracker_count);

  });
};


function getVideoArr(artistName) {

  var apiKey = "AIzaSyCHYhmqVOwG3KDfWOt9iZS0i1dZVMsabgo";

  var queryURL = "https://www.googleapis.com/youtube/v3/search?q=" +
    artistName+" Live" + "&key=" + apiKey + "&part=snippet&type=video&videoSyndicated=true&videoEmbeddable=true";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
      console.log(queryURL);

      console.log(response);

      $("#youTubePanel").html("");

      for (var i = 0; i < 3; i++) {
      videoID = response.items[i].id.videoId
        console.log("video ID:"+videoID);
        $("#youTubePanel").append('<iframe id="ytplayer" type="text/html" class="yt-vid" src="https://www.youtube.com/embed/'+videoID+'"frameborder="5px" allowfullscreen>'+"<hr>");
        
      };

    })
};
;
  
 