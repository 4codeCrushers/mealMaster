// hiding all questions

function hideAll () {
    $('.questionOne, .questionTwo, .questionThree, .buttonOne, .buttonTwo, .buttonThree').hide();
}

// function to show Qs when ready
function showQuestionAndButton (questionClass, buttonClass) {
    hideAll ();
    $(questionClass).show();
    $(buttonClass).show();
}

// Code to only show Q1 when quiz page loads

hideAll();
showQuestionAndButton('.questionOne, .buttonOne');

// Question One

$('.buttonOne button').on('click', function () {

    var quizGoal = {
        calories: $('#floatingInputGrid1').val(),
        protein: $('#floatingInputGrid2').val(),
        carbohydrates: $('#floatingInputGrid3').val(),
        fat: $('#floatingInputGrid4').val(),
    }

    localStorage.setItem('quizGoal', JSON.stringify(quizGoal));

    showQuestionAndButton('.questionTwo, .buttonTwo');

});


// Question Two

$('.buttonTwo button').on('click', function () {

    var numberOfMeals = $('#floatingInputGrid5').val();
    localStorage.setItem('numberOfMeals', numberOfMeals);

    showQuestionAndButton('.questionThree, .buttonThree');

});

// Question Three

$('.buttonThree button').on('click', function () {

    var foodAllergies = $('#floatingInputGrid6').val();
    localStorage.setItem('foodAllergies', foodAllergies);
        
    window.location.href = '#';
    
});