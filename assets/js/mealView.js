
// - Display random receipe

var recipe = [];
var rnMeal = $('#randomMeal');

function getRandomMeal () {

   randomMeal_URL = "https://www.themealdb.com/api/json/v1/1/random.php";


    fetch(randomMeal_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
        displayMeal(data);
    })
  }

function displayMeal (data){

  
  var imgEl = $("<img>");
  imgEl.attr('class', 'randomMealImage');
  var mealName = $('<h5> ' + data.meals[0].strMeal + ' </h5>');
  var pEl1 = $('<p> ' + data.meals[0].strCategory + ", " + data.meals[0].strArea + '</p>');
  imgEl.attr('src', data.meals[0].strMealThumb);
  rnMeal.append(mealName, pEl1, imgEl);
  var ingredientsTitle = $('<h5 class="ingredients-title">Ingredients:</h5>');
  rnMeal.append(ingredientsTitle);
  ingredientsTitle.css('margin-top', '10px');
  
  //API returns upto 20 Ingredients and measurements


//API returns upto 20 Ingredients and measurements

  for (let index = 1; index <= 20; index++) {
    recipe.push({ "Ingredient": data.meals[0]['strIngredient' + index], "Measure": data.meals[0]['strMeasure' + index] });
  }



  // if not null display the following
  if (data.meals[0].strYoutube) {
      var buttonEl = $('<a href="' + data.meals[0].strYoutube + '" class="btn btn-primary btn-danger" target="_blank">');
      var iconEl = $('<img src="assets/images/youtube.svg" alt="Icon" class="icon">');
      buttonEl.append(iconEl);
      buttonEl.append(" Youtube");
      buttonEl.css('margin-right', '10px')
      $('#randomMeal').append(buttonEl);
  }

  if (data.meals[0].strSource){
      var aElSrc = $('<a href="'+data.meals[0].strSource + '" class="btn btn-primary" target="_blank">');
      aElSrc.text("Recipe");
      rnMeal.append(aElSrc);
  }

  var backButton = $('<button class="btn btn-primary" style="margin-left: 10px">Back</button>');
  rnMeal.append(backButton);

  backButton.on('click', function() {
  window.location.href = 'meal-list.html';
});


  for (let index = 0; index < recipe.length; index++) {
    if (recipe[index].Ingredient === "") {
    break;
    }
  var pEl = $('<p>' + recipe[index].Ingredient + ' : ' + recipe[index].Measure + '</p>');
  rnMeal.append(pEl);
  }
}


// - API call to get image based on ingredient
function getSelectedMeal () {
  return localStorage.getItem("selectedMeal");
}

function getMeal () {

  var getMeal = getSelectedMeal ();  
  var randomMeal_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+getMeal;

  fetch(randomMeal_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.meals){
        console.log("not found return random receipe");
        getRandomMeal();
      } else {
        displayMeal(data);
      }
    })
}

getMeal();