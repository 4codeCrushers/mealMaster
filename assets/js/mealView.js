
// - Display random receipe

var randomMeal_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

fetch(randomMeal_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data.meals[0].strMeal);
            console.log(data.meals[0].strCategory);
            console.log(data.meals[0].strArea);
            console.log(data.meals[0].strMealThumb);

            // for iterate through until strIngredient1===null 

            console.log(data.meals[0].strIngredient1 + " : " + data.meals[0].strMeasure1);
            console.log(data.meals[0].strIngredient2 + " : " + data.meals[0].strMeasure2);
            console.log(data.meals[0].strIngredient3 + " : " + data.meals[0].strMeasure3);

            // if not null display the following
            console.log(data.meals[0].strYoutube);
            console.log(data.meals[0].strSource);

        })

// - API call to image api

function getImageFromIngreident(){



    var imgEl = $("<img>");

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



// - Make sure ingredient/ meal list is displayed in calendar
