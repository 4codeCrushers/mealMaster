
// - Display random receipe

var recipe  = [];
var rnMeal = $('#randomMeal');


function getRandomMeal(){
    var randomMeal_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(randomMeal_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var imgEl = $("<img>");
            imgEl.attr('class', 'randomMealImage')
            var mealName = $('<h4> '+ data.meals[0].strMeal+' </h4>');
            var pEl1 = $('<p> '+ data.meals[0].strCategory+", " + data.meals[0].strArea +'</p>');
            imgEl.attr('src', data.meals[0].strMealThumb);
            rnMeal.append(mealName, pEl1, imgEl);
            
        
            //API returns upto 20 Ingredients and measurements

            recipe.push({"Ingredient": data.meals[0].strIngredient1, "Measure" : data.meals[0].strMeasure1});
            recipe.push({"Ingredient": data.meals[0].strIngredient2, "Measure" : data.meals[0].strMeasure2});
            recipe.push({"Ingredient": data.meals[0].strIngredient3, "Measure" : data.meals[0].strMeasure3});
            recipe.push({"Ingredient": data.meals[0].strIngredient4, "Measure" : data.meals[0].strMeasure4});
            recipe.push({"Ingredient": data.meals[0].strIngredient5, "Measure" : data.meals[0].strMeasure5});
            recipe.push({"Ingredient": data.meals[0].strIngredient6, "Measure" : data.meals[0].strMeasure6});
            recipe.push({"Ingredient": data.meals[0].strIngredient7, "Measure" : data.meals[0].strMeasure7});
            recipe.push({"Ingredient": data.meals[0].strIngredient8, "Measure" : data.meals[0].strMeasure8});
            recipe.push({"Ingredient": data.meals[0].strIngredient9, "Measure" : data.meals[0].strMeasure9});
            recipe.push({"Ingredient": data.meals[0].strIngredient10, "Measure" : data.meals[0].strMeasure10});
            recipe.push({"Ingredient": data.meals[0].strIngredient11, "Measure" : data.meals[0].strMeasure11});
            recipe.push({"Ingredient": data.meals[0].strIngredient12, "Measure" : data.meals[0].strMeasure12});
            recipe.push({"Ingredient": data.meals[0].strIngredient13, "Measure" : data.meals[0].strMeasure13});
            recipe.push({"Ingredient": data.meals[0].strIngredient14, "Measure" : data.meals[0].strMeasure14});
            recipe.push({"Ingredient": data.meals[0].strIngredient15, "Measure" : data.meals[0].strMeasure15});
            recipe.push({"Ingredient": data.meals[0].strIngredient16, "Measure" : data.meals[0].strMeasure16});
            recipe.push({"Ingredient": data.meals[0].strIngredient17, "Measure" : data.meals[0].strMeasure17});
            recipe.push({"Ingredient": data.meals[0].strIngredient18, "Measure" : data.meals[0].strMeasure18});
            recipe.push({"Ingredient": data.meals[0].strIngredient19, "Measure" : data.meals[0].strMeasure19});
            recipe.push({"Ingredient": data.meals[0].strIngredient20, "Measure" : data.meals[0].strMeasure20});

            console.log(recipe);

            for (let index = 0; index < recipe.length; index++) {
                if (recipe[index].Ingredient === ""){
                    break;
                }
                var pEl = $('<p>' + recipe[index].Ingredient + ' : '+ recipe[index].Measure + '</p>' );
                rnMeal.append(pEl);
                
            }

            // if not null display the following
            if (data.meals[0].strYoutube){
                var aElYT = $('<a href="'+data.meals[0].strYoutube+'">' );
                aElYT.text("Youtube Video");
                rnMeal.append(aElYT);

            }
            if (data.meals[0].strSource){
                var aElSrc = $('<a href="'+data.meals[0].strSource+'">' );
                aElSrc.text("Receipe");
                rnMeal.append(aElSrc);
            }

        })
    }

function displayRandomMeal(){


}

// - API call to get image based on ingredient 

function getImageFromIngredient(){


    var imgEl2 = $("<img>");

    var mainIngredient = ""; //get from storage
    var query_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast";

    fetch(query_URL)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data.meals[0].strMealThumb);
            })
    
        }

// - Display image on page

getRandomMeal();
