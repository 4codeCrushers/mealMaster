// Save the selected day to localStorage
$(document).ready(function () {
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
      '<img src="assets/images/add.png" class="card-img add-icon mx-auto" style="display: none;" alt="day">' +
      `<a href="quiz.html" class="stretched-link"></a>` +
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