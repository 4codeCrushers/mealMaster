const apiKey = "600998a5ce3a47579fa28a23d0ddb36d";
const searchInput = $("input");
const searchBtn = $("#search-btn");
const mealList = $("#meal-list");

const goal = {
  goal: { calories: 2000, carbs: 200, fat: 50, protein: 100 },
  leftover: { calories: 2000, carbs: 10, fat: 30, protein: 60 }
};
// parse queries from local storage or create empty array
const queries = JSON.parse(localStorage.getItem("queries")) || {};
localStorage.setItem("queries", JSON.stringify(queries));

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

function saveQuery(query, data) {
  let queries = JSON.parse(localStorage.getItem("queries")) || {};

  if (queries.hasOwnProperty(query)) {
    alert(`${query} has already been added to the meal`);
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

  localStorage.setItem("queries", JSON.stringify(queries));
}

function hasLeftoverCalories(existingQueries, newQueryCalories) {
  let leftover = goal.goal.calories;

  // Loop through all existing query items and subtract calories from leftover
  for (var [key, value] of Object.entries(existingQueries)) {
    leftover -= value.calories;
  }

  if (leftover >= newQueryCalories || Object.keys(existingQueries).length === 0) {
    goal.leftover.calories = leftover;
    leftover -= newQueryCalories;

    return true;
  }

  return false;
}

function showCards() {
  mealList.empty();

  let queries = JSON.parse(localStorage.getItem("queries")) || {};
  for (var [key, value] of Object.entries(queries)) {

    const queryCard = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${key}</h5>
        <p class="card-text">Calories: ${value.calories}</p>
        <p class="card-text">Carbs: ${value.carbs}</p>
        <p class="card-text">Fat: ${value.fat}</p>
        <p class="card-text">Protein: ${value.protein}</p>
        <a href="#" class="btn btn-primary">Check Recipe!</a>
      </div>
    </div>`
    mealList.append(queryCard);
  };
}

showCards()