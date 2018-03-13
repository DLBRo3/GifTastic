// App Variables

// initial Array of Players
var playersArr = ["Lebron James", "Dwayne Wade", "Kobe Bryant", "Michael Jordan", "Tim Duncan",
                  "Steve Nash", "Russell Westbrook", "James Harden", "Paul George", "Carmelo Anthony",
                  "Anthony Davis", "Chris Paul", "Kawhi Leonard", "Stephen Curry", "Klay Thompson",
                  "Kevin Durant", "Kyrie Irving", "Draymond Green"];

// Helper Functions

// RenderButtons will display player buttons for all players within the playersArr array
function renderButtons() {
    $("#nbaButtons").empty();

    // Loop through array of players
    for (var i = 0; i < playersArr.length; i++) {
        // Generate a button for each animal in the array
        var button = $("<button>");
        button.addClass("playerButton");
        button.attr("data-player", playersArr[i]);
        button.text(playersArr[i]);

        // Adding my button to HTML
        $("#nbaButtons").append(button);
    }
}

// Event Handlers

// Event handler for user to add additional players to the array
$("#add-player").on("click", function(event) {
    event.preventDefault();

    // Get input from the text
    var player = $("#player-input").val().trim();

    // The player from the text is added to playersArr array
    playersArr.push(player);
    $("#player-input").val("");
    

    // Run player buttons
    renderButtons();
});

// fetchPlayerGifs will fetch player Gifs with the Giphy API
function fetchPlayerGifs() {
    // Get the player name from the button clicked
    var playerName = $(this).attr("data-player");
    var playerStr = playerName.split(" ").join("+");

    // Construct the Giphy URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=gnbG3L0F7TlgaI9mJ3AwYOjmW02gjbxM&q=" + playerStr + "&limit=10&offset=0&rating=G&lang=en";

    // Make the AJAX call to Giphy API
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .done(function(result) {
        // Results array
        var dataArray = result.data;

        // Create and display div elements for each returned Gif
        $("gifPanel").empty();
        for (var i = 0; i < dataArray.length; i++) {
            var newDiv = $("<div>");
            newDiv.addClass("playerGif");

            var newRating = $("<h4>").html("Rating: " + dataArray[i].rating);
            newDiv.append(newRating);

            var newImg = $("<img>");
            newImg.attr("src", dataArray[i].images.fixed_height_still.url);
            newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
            newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
            newImg.attr("data-state", "still");
            newDiv.append(newImg);

            // Appending new Gifs to the gifPanel
            $("#gifPanel").append(newDiv);
        }
    });
}

// animatePlayerGif will animate a still Gif and stop a moving Gif
function animatePlayerGif() {
    // The image state will be either still or animated
    var state = $(this).find("img").attr("data-state");

    // Make the Gif animated or still depending on "data-state value"
    if (state === "still") {
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
    } else {
        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("img").attr("data-state", "still");
    }
}

// renderButton player buttons when HTML has finished loading
$(document).ready(function() {
    renderButtons();
});

// Event handler for player buttons to fetch appropriate Gif's
$(document).on("click", ".playerButton", fetchPlayerGifs);

// Event handler for player Gifs to make image animate and stop
$(document).on("click", ".playerGif", animatePlayerGif);
