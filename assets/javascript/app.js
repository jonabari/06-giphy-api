// Initial array of animals
var animals = [ "CAT" , "DOG" , "BIRB" , "CAPYBARA" ] ;

// displayGif function re-renders the HTML each time to prevent stacking all content each time
function displayGif () {

    var animal = $ ( this ) .attr ( "data-name" ) ; //record animal name in a var

    //Giphy API query URL + key set-up, kept separate for scale
    var apiKey = "TrJAvqvX4FLWnlI411Np3PqB2SnWv60c"; //personal key
    var queryURL = `https://api.giphy.com/v1/gifs/random?api_key=${ apiKey }&tag=${ animal.toLowerCase() }&limit=1`; //random request
    console.log ( "**** Query URL: " + queryURL + " ****" ) ; // confirm

    // AJAX call for the specific animal button being clicked
    $ .ajax ( {
        url: queryURL ,
        method: "GET"
    } ) .then ( function ( response ) {
        const { data: { images } } = response //yay DRY
        // First we set up a div to hold this new gif
        var gifDiv = $ ( "<div class='gif m-auto'>" ) ;

        // Then create a p element to append it to
        a = $ ( "<h5>" ) .text ( animal.toUpperCase() ) ; //and the text in the animal var (upper case for presentation)
        gifDiv .append ( a ) ; //Appended

        // We greatea gif element with the id "gif"
        var gif = $ ( "<img>" ) .attr ( "id" , "gif" ) ; //add src attribute
        gif .addClass ( "mb-3 img-fluid" ) ; // it's a responsive img w/a btm margin

        //This next block of code adds the attrs necessary to toggle the animation on and off
        gif .attr ( "data-state", "animate" ) ; // declare it's initial data-state as an attr
        gif .attr ( "data-animate" , images.original.url ) ; //animated state url
        gif .attr ( "data-still" , images.original_still.url ) ; //still state url

        //Finally, we assifn the initial url for the gif
        gif .attr ( "src", images.original.url); //taken from the data-still attr
        gifDiv .append ( gif ) ; //appended

        //For presentation purposes, we add a separator at the end of the div
        a = $ ( "<hr>" ) ; //add a separator
        gifDiv .append ( a ) ; //append it

        // puts the new gif at the top of the gif-area
        $ ( "#gif-area" ) .prepend ( gifDiv ) ; //prepended
    });
};

// This function creates the buttons
function renderButtons() {

    //It always starts by clearing the btn-area, to prevent stacking inputs
    $ ( "#btn-area" ) .empty() ;

    // Then it loops through the animals array
    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>"); //makes a button
        a .addClass ( "gif-btn btn btn-dark m-2 align-items-center" ) ; //adds an identifying class
        a .attr ( "data-name", animals [ i ] ) ; //adds the current animal as the data-name
        a .text ( animals [ i ] .toUpperCase() ) ; //uppercase for presentation purposes
        $ ( "#btn-area" ) .append ( a ) ; //appends the completed var to the html
    }
}

//GLOBAL EVENT LISTENERS

//Start by rendering the example buttons on load
renderButtons();

// At any moment, the user can add another button to the menu
$ ( "#add-gif" ) .on ( "click" , function ( event ) {

    event .preventDefault () ;// first we prevent the form from submitting (and reloading the html)

    var animal = $("#gif-input").val().trim(); //Then it records the user´s text entry, sans any additional spaces, etc.

    //This if/else prevents a bug with blank buttons
    if ( animal === "" || animal === undefined ) return ; //should the input box be empty, end the function immediately
    if ( !!animal .length ){
        animals .push ( animal ) ;//else, push the user's input into the animals array
        renderButtons() ; //and re-render all the buttons
        $ ( '#gif-input' ) .val ('') ; //finally, it clears the input box to prevent unfortunate typos (stacked inputs)
    };

});

//If any buttons in the btn-area are pressed, render gif on page
$ ( document ) .on ( "click" , ".gif-btn" , displayGif ) ;

//The gifs are initially paused. 
$ ( document ) .on ( "click" , "#gif" , function() { //click to animate them

    var state = $ ( this ) .attr ( "data-state" ) ; //store it's current state
  
    //if it is animated, then it''ll replace it with the still URL
    if (state === "animate") {
      $ ( this ) .attr ( "src" , $ ( this ) .attr ( "data-still" ) ) ; // replace url
      $ ( this ) .attr ( "data-state" , "still" ) ; //toggle data-state
    //The opposite is true if the gif was already still
    } else {
      $ ( this ) .attr ( "src" , $ ( this ) .attr ( "data-animate" ) ) ; //reinstate animated state url
      $ ( this ) .attr ( "data-state" , "animate" ) ; //toggle data-state
    }
});
