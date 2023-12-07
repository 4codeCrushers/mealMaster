// hiding all questions
function hideAll() {
  $('.nutritionQuestion, .mealQuestion, .allergiesQuestion, .nutritionButton, .mealButton, .allergiesButton').hide();
}

// function to show Qs when ready
function showQuestionAndButton(questionClass, buttonClass) {
  hideAll();
  $(questionClass).show();
  $(buttonClass).show();
}

// Code to only show Q1 when quiz page loads
hideAll();
showQuestionAndButton('.nutritionQuestion, .nutritionButton');

// Question One
$('.nutritionButton button').on('click', function () {

  var quizGoal = {
    calories: $('#caloriesInput').val(),
    protein: $('#proteinInput').val(),
    carbohydrates: $('#carbohydratesInput').val(),
    fat: $('#fatInput').val(),
  }

  localStorage.setItem('quizGoal', JSON.stringify(quizGoal));

  showQuestionAndButton('.mealQuestion, .mealButton');

});


// Question Two
$('.mealButton button').on('click', function () {

  var numberOfMeals = $('#mealsInput').val();
  localStorage.setItem('numberOfMeals', numberOfMeals);

  showQuestionAndButton('.allergiesQuestion, .allergiesButton');

});

// Question Three
$('.allergiesButton button').on('click', function () {

  var foodAllergies = $('#allergiesInput').val();
  localStorage.setItem('foodAllergies', foodAllergies);

  window.location.href = 'meal-list.html';
});