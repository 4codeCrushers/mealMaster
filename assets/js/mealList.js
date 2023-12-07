const apiKey = "972063cc90ff4bc1a3231263caa289bd";
const searchInput = $("input");
const searchBtn = $("#search-btn");
const mealList = $("#meal-list");
const goalList = $("#goal-list");
const leftoverList = $("#leftover-list");
const nutrition = nutritionInfo();
// Get the <span> element that closes the modal
const span = $(".close")[0];
// Get the modal
const modal = $("#alertMsg");
const modalMessage = $(".modal-message");
const modalContent = $(".modal-content");
// Load page content
loadContent()

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
      updateCards();
      updateLeftoversSection();
      searchInput.val("");
    });
});

// function to load page content
function loadContent() {
  // Update the goal section
  localStorage.setItem("nutrition", JSON.stringify(nutrition));
  // Update the goal section, the leftovers section, and the cards
  updateGoalSection(nutrition)
  updateLeftoversSection(nutrition)
  updateCards()
}

// function to save nutrition info to local storage
function nutritionInfo() {
  // Parse nutrition info from local storage or create empty object
  let nutrition = JSON.parse(localStorage.getItem("nutrition"));
  let quizGoal = JSON.parse(localStorage.getItem("quizGoal"));

  if (!nutrition) {
    nutrition = {
      goal: { calories: quizGoal.calories, carbohydrates: quizGoal.carbohydrates, fat: quizGoal.fat, protein: quizGoal.protein },
      leftover: { calories: quizGoal.calories, carbohydrates: quizGoal.carbohydrates, fat: quizGoal.fat, protein: quizGoal.protein }
    };

    // Save nutrition info to local storage
    localStorage.setItem("nutrition", JSON.stringify(nutrition));
  }

  return nutrition;
}

// Function to update the goal section
function updateGoalSection() {
  // Clear the existing goal list
  goalList.empty();

  $(`<li>${nutrition.goal.calories} calories</li>`).appendTo(goalList);
  $(`<li>${nutrition.goal.carbohydrates} carbohydrates</li>`).appendTo(goalList);
  $(`<li>${nutrition.goal.fat} fat</li>`).appendTo(goalList);
  $(`<li>${nutrition.goal.protein} protein</li>`).appendTo(goalList);
}

// Function to update the leftovers Section
function updateLeftoversSection() {
  // Clear the existing leftovers list
  leftoverList.empty();

  // Append the updated leftovers information to the list
  $(`<li>${nutrition.leftover.calories} calories</li>`).appendTo(leftoverList);
  $(`<li>${nutrition.leftover.carbohydrates} carbohydrates</li>`).appendTo(leftoverList);
  $(`<li>${nutrition.leftover.fat} fat</li>`).appendTo(leftoverList);
  $(`<li>${nutrition.leftover.protein} protein</li>`).appendTo(leftoverList);
}

// function to check if there are leftover calories
function hasLeftoverCalories(existingQueries, newQueryCalories) {
  let leftover = nutrition.goal.calories;

  // Loop through all existing query items and subtract calories from leftover
  for (var [_key, value] of Object.entries(existingQueries)) {
    leftover -= value.calories;
  }

  // If there are leftover calories, update the leftover calories and return true
  if (leftover >= newQueryCalories || Object.keys(existingQueries).length === 0) {
    nutrition.leftover.calories = leftover;
    leftover -= newQueryCalories;

    return true;
  }

  // If there are no leftover calories, return false
  return false;
}

// function to show cards. Renders the meal cards based on the stored queries in local storage.
function updateCards() {
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
        <a href="mealView.html" class="btn btn-primary">Check Recipe!</a>
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

// function to save queries to local storage
function saveQuery(query, data) {
  let queries = JSON.parse(localStorage.getItem("queries")) || {};

  // Check if query already exists in local storage
  if (queries.hasOwnProperty(query)) {
    modalMessage.text(`You already have added ${query} to your list!`);
    modalContent.css("background-color", "#EFB495");
    modal.css("display", "block");
    return false;
  }

  // Check if there are enough leftover calories
  if (!hasLeftoverCalories(queries, data.calories.value)) {
    modalMessage.text(`You don't have enough calories left! :( ${query} has ${data.calories.value} calories.`);
    modalContent.css("background-color", "#EF9595");
    modal.css("display", "block");
    return false;
  }

  queries[query] = {
    calories: data.calories.value,
    carbs: data.carbs.value,
    fat: data.fat.value,
    protein: data.protein.value
  };

  // Update queries in local storage
  localStorage.setItem("queries", JSON.stringify(queries));

  // Update leftover calories in local storage
  let leftover = nutrition.goal.calories;
  for (var [_key, value] of Object.entries(queries)) {
    leftover -= value.calories;
  }
  nutrition.leftover.calories = leftover;
  localStorage.setItem("nutrition", JSON.stringify(nutrition));

  return true;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.css("display", "none");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.css("display", "none");
  }
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.css("display", "none");
  }
}

// Save card's header content in the local storage as selectedMeal
$(".card").on("click", function () {
  const selectedMeal = $(this).find("h5").text();
  localStorage.setItem("selectedMeal", selectedMeal);
});
