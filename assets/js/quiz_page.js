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

    var calories = $('#floatingInputGrid1').val();
    var protein = $('#floatingInputGrid2').val();
    var carbohydrates = $('#floatingInputGrid3').val();
    var fat = $('#floatingInputGrid4').val();

    localStorage.setItem('calories', calories);
    localStorage.setItem('protein', protein);
    localStorage.setItem('carbohydrates', carbohydrates);
    localStorage.setItem('fat', fat);

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