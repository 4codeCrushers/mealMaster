// Save the selected day to localStorage
document.addEventListener("DOMContentLoaded", function () {
    var dayElements = document.querySelectorAll('.day');
    dayElements.forEach(function (dayElement) {
        dayElement.addEventListener('click', function () {
            var dayOfMonth = dayElement.querySelector('.card-title').innerText;
            localStorage.setItem('selectedDay', dayOfMonth);
            //console.log(dayOfMonth);
        });
    });
});