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
        var gifDiv = $("<div class='gif float-left m-2'>");

        // We store the rating data in a variable
        var gifTitle = animal.toUpperCase();
        // Then create a p element to append it to
        var pRating = $("<p>").text(gifTitle);
        gifDiv.append(pRating); //Appended

        // We store the gif url in a variable
        var gifURL = response.data.images.fixed_height.url;
        // and create an img element to append it to
        var gif = $("<img>").attr("src", gifURL);
        gifDiv.append(gif); //appended

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

event.preventDefault();// first we have this, which prevents the form from submitting (and reloading the html)

var animal = $("#gif-input").val().trim(); //Then it records the user´s text entry, sans any additional spaces, etc.

//This if/else prevents a bug with blank buttons
if(animal===""||animal===undefined) return; //should the input box be empty, end the function immediately
else {
    animals.push(animal);//otherwise push the user's input into the animals array
    renderButtons(); //and re-render all the buttons
    $('#gif-input').val(''); //finally, it clears the input box to prevent unfortunate typos (stacked inputs)
};
});

/* <script type="text/javascript">
$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
</script> */


//GLOBAL
//Start by rendering the example buttons right away
renderButtons();
//If any buttons in the btn-area are pressed, render gif on page
$(document).on("click", ".gif-btn", displayGif);
