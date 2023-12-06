// Save the selected day to localStorage
$(document).ready(function () {
    var dayElements = $('.day');
    dayElements.each(function () {
        $(this).on('click', function () {
            var dayOfMonth = $(this).find('.card-title').text();
            // selected day is stored in dayOfMonth variable
            localStorage.setItem('selectedDay', dayOfMonth);

            // Open the quiz page
            window.location.href = 'quiz.html';
        });
    });
    // Displays today's date
    var date = dayjs().format("MMMM YYYY");
    $("#today").text(date);
    var totalDays = dayjs().daysInMonth();
    var calendarContainer = $("#calendar");
    // Adds cards based on the number of days in the current month
    for (var day = 1; day <= totalDays; day++) {
        var newCard = $('<div class="card day" style="width: 9rem; height: 9rem;">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + day + '</h5>' +
            '<p class="card-text"></p>' +
            '<img src="assets/images/add.png" class="card-img add-icon mx-auto" style="display: none;" alt="...">' +
            `<a href="quiz.html" class="stretched-link"></a>` +
            '</div>' +
            '</div>');
        // Date is stored locally when card is clicked
        newCard.click(function () {
            var selectedDay = $(this).find('.card-title').text();
            localStorage.setItem('selectedDay', selectedDay);

            // Open the quiz page
            window.location.href = 'quiz.html';
        });
        calendarContainer.append(newCard);
    }
});