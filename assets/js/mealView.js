
// - Display random receipe

var receipe  = [];
var rnMeal = $('#radomMeal');


function getRandomMeal(){
    var randomMeal_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(randomMeal_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var imgEl = $("<img>");
            imgEl.attr('class', 'radomMealImage')
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
