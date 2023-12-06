const apiKey = "972063cc90ff4bc1a3231263caa289bd";
const searchInput = $("input");
const searchBtn = $("#search-btn");
const mealList = $("#meal-list");
const goalList = $("#goal-list");
const leftoverList = $("#leftover-list");


// Event listener for search button
$("form").on("submit", function (event) {
  event.preventDefault();

  const query = searchInput.val();
  const url = `https://api.spoonacular.com/recipes/guessNutrition?title=${query}&apiKey=${apiKey}`;

  fetch(url, {
    headers: {
      "X-Api-Key": apiKey
    }
  })
    .then(response => response.json())
    .then(data => {

      saveQuery(query, data);
      showCards();
      // Update the leftovers section
      updateLeftoversSection();
    }
    );
});

// function to save nutrition info to local storage
var nutritionInfo = function () {
  let nutrition = JSON.parse(localStorage.getItem("goal"));

  if (!nutrition) {
    nutrition = {
      goal: { calories: 2000, carbs: 200, fat: 50, protein: 100 },
      leftover: { calories: 2000, carbs: 10, fat: 30, protein: 60 }
    };

    localStorage.setItem("goal", JSON.stringify(nutrition));
  }

  return nutrition;
}

// parse nutrition from local storage or create empty object
const nutrition = nutritionInfo();

function updateGoalSection() {
  goalList.empty();

  $(`<li>${nutrition.goal.calories} calories</li>`).appendTo(goalList);
  $(`<li>${nutrition.goal.carbs} carbs</li>`).appendTo(goalList);
  $(`<li>${nutrition.goal.fat} fat</li>`).appendTo(goalList);
  $(`<li>${nutrition.goal.protein} protein</li>`).appendTo(goalList);
}


// Function to update the leftovers Section
function updateLeftoversSection() {
  // Clear the existing leftovers list
  leftoverList.empty();

  // Append the updated leftovers information to the list
  $(`<li>${nutrition.leftover.calories} calories</li>`).appendTo(leftoverList);
  $(`<li>${nutrition.leftover.carbs} carbs</li>`).appendTo(leftoverList);
  $(`<li>${nutrition.leftover.fat} fat</li>`).appendTo(leftoverList);
  $(`<li>${nutrition.leftover.protein} protein</li>`).appendTo(leftoverList);
}

// Event listener for search button
$("form").on("submit", function (event) {
  event.preventDefault();

  const query = searchInput.val();
  const url = `https://api.spoonacular.com/recipes/guessNutrition?title=${query}&apiKey=${apiKey}`;

  fetch(url, {
    headers: {
      "X-Api-Key": apiKey
    }
  })
    .then(response => response.json())
    .then(data => {

      saveQuery(query, data);

      showCards();
    }
    );
});

// function to save queries to local storage
function saveQuery(query, data) {
  // declare queries variable and parse queries from local storage or create empty object
  let queries = JSON.parse(localStorage.getItem("queries")) || {};

  // check if query already exists in local storage
  if (queries.hasOwnProperty(query)) {
    alert(`${query} has already been added to the meal list!`);
    return false;
  }

  // check if there are leftover calories
  if (!hasLeftoverCalories(queries, data.calories.value)) {
    alert(`You don't have enough calories for ${query}`);
    return false;
  }

  // add query to queries object
  queries[query] = {
    calories: data.calories.value,
    carbs: data.carbs.value,
    fat: data.fat.value,
    protein: data.protein.value
  };

  // save queries to local storage
  localStorage.setItem("queries", JSON.stringify(queries));
}

// function to check if there are leftover calories
function hasLeftoverCalories(existingQueries, newQueryCalories) {
  let leftover = nutrition.goal.calories;

  // Loop through all existing query items and subtract calories from leftover
  for (var [key, value] of Object.entries(existingQueries)) {
    leftover -= value.calories;
  }

  if (leftover >= newQueryCalories || Object.keys(existingQueries).length === 0) {
    nutrition.leftover.calories = leftover;
    leftover -= newQueryCalories;

    return true;
  }

  // If there are no leftover calories, return false
  return false;
}

localStorage.setItem("goal", JSON.stringify(nutrition));

// function to show cards
/**
 * Renders the meal cards based on the stored queries in local storage.
 */
function showCards() {
  mealList.empty();

  let queries = JSON.parse(localStorage.getItem("queries")) || {};
  let cardRow = $("<div class='row'></div>");
  let cardCount = 0;

  for (var [key, value] of Object.entries(queries)) {
    const queryCard = `
    <div class="card col-md-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${key}</h5>
        <p class="card-text">Calories: ${value.calories}</p>
        <p class="card-text">Carbs: ${value.carbs}</p>
        <p class="card-text">Fat: ${value.fat}</p>
        <p class="card-text">Protein: ${value.protein}</p>
        <a href="#" class="btn btn-primary">Check Recipe!</a>
      </div>
    </div>
  `;

    // Append the card to the row
    cardRow.append(queryCard);
    cardCount++;

    if (cardCount === 4) {
      mealList.append(cardRow);
      // Create a new row
      cardRow = $("<div class='row'></div>");
      // Reset the card count
      cardCount = 0;
    }
  }

  // Append the remaining cards if the count is not a multiple of 4
  if (cardCount > 0) {
    mealList.append(cardRow);
  }
}

function saveQuery(query, data) {
  let queries = JSON.parse(localStorage.getItem("queries")) || {};

  if (queries.hasOwnProperty(query)) {
    alert(`${query} has already been added to the meal list!`);
    return false;
  }

  if (!hasLeftoverCalories(queries, data.calories.value)) {
    alert(`You don't have enough calories for ${query}`);
    return false;
  }

  queries[query] = {
    calories: data.calories.value,
    carbs: data.carbs.value,
    fat: data.fat.value,
    protein: data.protein.value
  };

  localStorage.setItem("queries", JSON.stringify(queries)); // Update queries in local storage

  // Update leftover calories in local storage
  let leftover = nutrition.goal.calories;
  for (var [key, value] of Object.entries(queries)) {
    leftover -= value.calories;
  }
  nutrition.leftover.calories = leftover;
  localStorage.setItem("goal", JSON.stringify(nutrition));

  return true;
}

showCards()
updateGoalSection()
updateLeftoversSection()