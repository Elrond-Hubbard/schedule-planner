///////////////////////////////////////////////////////////////////////////////////////////////////////////

///// SCHEDULE PLANNER /////

// The code is wrapped in a ready function to ensure it 
// isn't ran until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  const timeBlockEl = $(".time-block");
  const timeInputEl = timeBlockEl.children(".description");

  // Schedule entries are saved to local storage using a 
  // button. Each storage item uses the corresponding timeBlock's
  // ID as the key, and its text as the value.
  timeBlockEl.on('click', 'button', function () {
    const thisId = $(this).closest('.time-block').attr('id');
    const thisInput = $(this).siblings('.description');
    localStorage.setItem(thisId, thisInput.val());
  })

  // The ID of each timeBlock is checked against the current hour.
  // and a new class is added to each element.
  timeBlockEl.each(function () {
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
    // The function gets any user input that was saved in localStorage
    // and sets the value of the corresponding textarea element.
    savedInput = localStorage.getItem(hourId);
    $(this).find('.description').val(savedInput);
  })

  // Day.js is used to format a realtime clock at the top of the screen.
  function displayClock() {
    const currentDayEl = $("#currentDay")
    currentDayEl.text(dayjs().format('dddd - MMMM DD, YYYY - hh:mm:ss'));
  }
  setInterval(displayClock, 1000);
});