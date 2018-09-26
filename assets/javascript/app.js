// Initial array of animals
var animals = ["CAT", "DOG", "BIRB", "CAPYBARA"];

// displayGif function re-renders the HTML each time to prevent stacking all content each time
function displayGif() {

    var animal = $(this).attr("data-name"); //

    //Giphy API query URL + key set-up, kept separate for scale
    var apiKey = "TrJAvqvX4FLWnlI411Np3PqB2SnWv60c";
    var queryURL = "http://api.giphy.com/v1/gifs/random?api_key="+apiKey+"&tag="+animal.toLowerCase()+"&limit=1";
    console.log("**** Query URL: "+queryURL+" ****"); // confirm

    // AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        // First we set up a div to hold this new gif
        var gifDiv = $("<div class='gif m-auto'>");

        // We store the rating data in a variable
        var gifTitle = animal.toUpperCase();
        // Then create a p element to append it to
        a = $("<h5>").text(gifTitle);
        gifDiv.append(a); //Appended

        // We greatea gif element with the id "gif"
        var gif = $("<img>").attr("id", "gif"); //add src attribute
        gif.addClass("mb-3 img-fluid"); // it's a responsive img w/a btm margin

        //This next block of code adds the attrs necessary to toggle the animation
        gif.attr("data-state", "still"); // declare it's initial data-state as an attr
        gif.attr("data-still", response.data.images.original_still.url); //still state url
        gif.attr("data-animate", response.data.images.original.url); //animated state url

        //Finally, we declare the initial url for the gir
        gif.attr("src", gif.attr("data-still")); //taken from the data-still attr
        gifDiv.append(gif); //appended

        //For presentation purposes, we add a separator and source URL
        a=$("<hr>");//add a separator
        gifDiv.append(a); //append it

        // puts the new gif at the top of the gif-area
        $("#gif-area").prepend(gifDiv);
    });

}

// This function creates the buttons
function renderButtons() {

    //It always starts by clearing the btn-area, to prevent stacking inputs
    $("#btn-area").empty();

    // Then it loops through the animals array
    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>"); //makes a button
        a.addClass("gif-btn btn btn-dark m-2 align-items-center"); //adds an identifying class
        a.attr("data-name", animals[i]); //adds the current animal as the data-name
        a.text(animals[i].toUpperCase()); //uppercase for presentation purposes
        $("#btn-area").append(a); //appends the completed var to the html
    }
}

// At any moment, the user can add another button to the menu
$("#add-gif").on("click", function(event) {

event.preventDefault();// first we prevent the form from submitting (and reloading the html)

var animal = $("#gif-input").val().trim(); //Then it records the user´s text entry, sans any additional spaces, etc.

//This if/else prevents a bug with blank buttons
if(animal===""||animal===undefined) return; //should the input box be empty, end the function immediately
else {
    animals.push(animal);//otherwise push the user's input into the animals array
    renderButtons(); //and re-render all the buttons
    $('#gif-input').val(''); //finally, it clears the input box to prevent unfortunate typos (stacked inputs)
};
});

//GLOBAL
//Start by rendering the example buttons right away
renderButtons();

//If any buttons in the btn-area are pressed, render gif on page
$(document).on("click", ".gif-btn", displayGif);

//The gifs are initially paused. 
$(document).on("click", "#gif", function() { //click to animate them

    var state = $(this).attr("data-state"); //store it's current state
  
    //if it is still, then it''ll replace it with the regular URL
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate")); // replace url
      $(this).attr("data-state", "animate"); //toggle data-state
    //The opposite is true if the gif was already animated
    } else {
      $(this).attr("src", $(this).attr("data-still")); //reinstate still state url
      $(this).attr("data-state", "still"); //toggle data-state
    }
  });
