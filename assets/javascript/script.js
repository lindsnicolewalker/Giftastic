var animalArr = ["cat", "dog", "bird"];
var apiKey= "Y4ieZRGurJLVpvsCTiNvKcD9Y06RbdrV";

function displayButtons() {        
    $(".buttons").empty(); 
    animalArr.forEach(function (animal) {
        var animalButton = $("<button class='animalButton'>");
        animalButton.text(animal);
        $(".buttons").append(animalButton);
    })

}

function displayGifs (buttonClick){
$(".gifs-here").empty(); 
        
var url = "https://api.giphy.com/v1/gifs/search?q=" + buttonClick + "&limit=10&api_key="+ apiKey

$.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
      var results = response.data;  
      console.log(results);
    // iterate over results
        for ( var i=0; i < results.length; i++ ){
//build a div
            var gifDiv = $("<div>"); 
    // create rating text
            var rating = $("<p>"); 
            rating.text("Rating: " + results[i].rating );
            
    // create img tag and add a src attr, data-state/data-still/data-animate attr
            var image = $("<img class='gifImg'>"); 
            image.attr("src", results[i].images.fixed_height_still.url); 
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-state", "still");
            // append the rating text to og div along with img 
            gifDiv.append(rating);
            gifDiv.append(image); 
            
    // append the div to html
       $(".gifs-here").append(gifDiv);
}
    
  })
}

$("#submit").on("click", function(){
    var data = $("#data-input").val();
    animalArr.push(data); 
    
    displayButtons(); 
})

$(document).on("click", ".animalButton", function () {
    var buttonClick = $(this).text();
    displayGifs(buttonClick);

})

$(document).on("click", ".gifImg", function () {
    var state = $(this).attr("data-state");

    // CODE GOES HERE
        if (state === "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
       }

        else {
          $(this).attr("src", $(this).attr("data-still")); 
          $(this).attr("data-state", "still"); 
        }

})


displayButtons();