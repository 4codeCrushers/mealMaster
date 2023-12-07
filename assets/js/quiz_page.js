// hiding all questions

function hideAll () {
  $('.nutritionQuestion, .mealQuestion, .allergiesQuestion, .nutritionButton, .mealButton, .allergiesButton').hide();
}

// function to show Qs when ready
function showQuestionAndButton (questionClass, buttonClass) {
  hideAll ();
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

  var feedbackNutrition = $('.nutritionQuestion .invalid-feedback');

  if (quizGoal.calories < 1200 || quizGoal.calories > 5000) {
    feedbackNutrition.eq(0).show();
  } else {
    feedbackNutrition.eq(0).hide();
  }

  if (quizGoal.protein < 50 || quizGoal.protein > 500) {
    feedbackNutrition.eq(1).show();
  } else {
    feedbackNutrition.eq(1).hide();
  }

  if (quizGoal.carbohydrates < 50 || quizGoal.carbohydrates > 500) {
    feedbackNutrition.eq(2).show();
  } else {
    feedbackNutrition.eq(2).hide();
  }

  if (quizGoal.fat < 50 || quizGoal.fat > 500) {
    feedbackNutrition.eq(3).show();
  } else {
    feedbackNutrition.eq(3).hide();
  }

  if (feedbackNutrition.filter(':visible').length  >0) {
    return;
  }

  localStorage.setItem('quizGoal', JSON.stringify(quizGoal));
  showQuestionAndButton('.mealQuestion, .mealButton');
    
});


// Question Two

$('.mealButton button').on('click', function () {

  var numberOfMeals = parseInt($('#mealsInput').val(), 10);
  var feedbackMeals = $('.mealQuestion .invalid-feedback');

  if (numberOfMeals < 1 || numberOfMeals > 10) {
    feedbackMeals.show();
    return;
    } else {
      feedbackMeals.hide();
      localStorage.setItem('numberOfMeals', numberOfMeals);
      showQuestionAndButton('.allergiesQuestion, .allergiesButton');
    }
});

// Question Three

$('.allergiesButton button').on('click', function () {

  var foodAllergies = $('#allergiesInput').val();
  var feedbackAllergies = $('.allergiesQuestion .invalid-feedback');

  // Only allow text in input box 

  var lettersOnlyRegex = /^[a-zA-Z\s]+$/;

  if (!lettersOnlyRegex.test(foodAllergies)) {
    feedbackAllergies.show();
    return;
    } else {
      feedbackAllergies.hide();
      localStorage.setItem('foodAllergies', foodAllergies);
      window.location.href = 'search.html';
    }
    
});