// Save the selected day to localStorage
document.addEventListener("DOMContentLoaded", function () {
    var dayElements = document.querySelectorAll('.day');
    dayElements.forEach(function (dayElement) {
        dayElement.addEventListener('click', function () {
            var dayOfMonth = dayElement.querySelector('.card-title').innerText;
            localStorage.setItem('selectedDay', dayOfMonth); // selected day is stored in dayOfMonth var
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Displays todays date
    var date = dayjs().format("MMMM YYYY");
    $("#today").text(date);
    var totalDays = dayjs().daysInMonth();
    var calendarContainer = $("#calendar");   
    // Adds cards based on the number of days in current month
    for (var day = 1; day <= totalDays; day++) {
        var newCard = $('<div class="card day" style="width: 9rem; height: 9rem;">' +
                            '<div class="card-body">' +
                                '<h5 class="card-title">' + day + '</h5>' +
                                '<p class="card-text"></p>' +
                                '<img src="assets/images/add.png" class="card-img add-icon mx-auto" style="display: none;" alt="...">' +
                                '<a href="#" class="stretched-link"></a>' +
                            '</div>' +
                        '</div>');
        // Date is stored locally when card is clicked
        newCard.click(function () {
            var selectedDay = $(this).find('.card-title').text();
            localStorage.setItem('selectedDay', selectedDay);
        });
        calendarContainer.append(newCard);
    }
});