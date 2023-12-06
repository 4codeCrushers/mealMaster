
// - Display random receipe

var receipe  = [];
var rnMeal = $('#radomMeal');
var imgEl = $("<img>");


function getRandomMeal(){
    var randomMeal_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(randomMeal_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var mealName = $('<h4> '+ data.meals[0].strMeal+' </h4>');
            var pEl1 = $('<p> '+ data.meals[0].strCategory + '</p>');
            var pEl2 = $('<p> '+ data.meals[0].strArea + '</p>');
            imgEl.attr('src', data.meals[0].strMealThumb);
            rnMeal.append(mealName, pEl1,pEl2, imgEl);
            
        
            //API returns upto 20 Ingredients and measurements

            receipe.push({"Ingredient": data.meals[0].strIngredient1, "Measure" : data.meals[0].strMeasure1})
            receipe.push({"Ingredient": data.meals[0].strIngredient2, "Measure" : data.meals[0].strMeasure2})
            receipe.push({"Ingredient": data.meals[0].strIngredient3, "Measure" : data.meals[0].strMeasure3})

            console.log(receipe);


            // if not null display the following
            if (data.meals[0].strYoutube){
                console.log(data.meals[0].strYoutube);
            }
            if (data.meals[0].strSource){
                console.log(data.meals[0].strSource);
            }

        })
    }

function displayRandomMeal(){


}

// - API call to image api

function getImageFromIngreident(){


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
