
// - Display random receipe

var recipe = [];
var rnMeal = $('#randomMeal');

function getRandomMeal() {
  var randomMeal_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

  fetch(randomMeal_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var imgEl = $("<img>");
      imgEl.attr('class', 'randomMealImage')
      var mealName = $('<h4> ' + data.meals[0].strMeal + ' </h4>');
      var pEl1 = $('<p> ' + data.meals[0].strCategory + ", " + data.meals[0].strArea + '</p>');
      imgEl.attr('src', data.meals[0].strMealThumb);
      rnMeal.append(mealName, pEl1, imgEl);

      //API returns upto 20 Ingredients and measurements

      for (let index = 1; index <= 20; index++) {
        recipe.push({ "Ingredient": data.meals[0]['strIngredient' + index], "Measure": data.meals[0]['strMeasure' + index] });
      }


      for (let index = 0; index < recipe.length; index++) {
        if (recipe[index].Ingredient === "") {
          break;
        }
        var pEl = $('<p>' + recipe[index].Ingredient + ' : ' + recipe[index].Measure + '</p>');
        rnMeal.append(pEl);
      }

      // if not null display the following
      if (data.meals[0].strYoutube) {
        var aElYT = $('<a href="' + data.meals[0].strYoutube + '">');
        aElYT.text("Youtube Video");
        rnMeal.append(aElYT);
      }

      if (data.meals[0].strSource) {
        var aElSrc = $('<a href="' + data.meals[0].strSource + '">');
        aElSrc.text("Receipe");
        rnMeal.append(aElSrc);
      }
    })
}

// - API call to get image based on ingredient

function getImageFromIngredient() {

  var imgEl2 = $("<img>");
  var mainIngredient = ""; //get from storage
  var query_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast";

  fetch(query_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.meals[0].strMealThumb);
    })
}

getRandomMeal();
