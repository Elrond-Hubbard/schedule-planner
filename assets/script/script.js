///////////////////////////////////////////////////////////////////////////////////////////////////////////

///// SCHEDULE PLANNER /////


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  const timeBlockEl = $(".time-block");
  const timeInputEl = timeBlockEl.children(".description");

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  timeBlockEl.on('click', 'button', function () {
    const thisId = $(this).closest('.time-block').attr('id');
    const thisInput = $(this).siblings('.description');
    localStorage.setItem(thisId, thisInput.val());
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  timeBlockEl.each(function() {
    hourId = $(this).attr('id');
    currentHour = dayjs().format('HH')
    if (hourId < currentHour) {
      $(this).removeClass('present future');
      $(this).addClass('past');
    }
    else if (hourId > currentHour) {
      $(this).removeClass('present past');
      $(this).addClass('future');
    }
    else {
      $(this).removeClass('past future');
      $(this).addClass('present');
    }
    savedInput = localStorage.getItem(hourId);
    $(this).find('.description').val(savedInput);
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.

  // TODO: Add code to display the current date in the header of the page.
  function displayClock() {
    const currentDayEl = $("#currentDay")
    currentDayEl.text(dayjs().format('dddd - MMMM DD, YYYY - hh:mm:ss'));
  }
  setInterval(displayClock, 1000);
});