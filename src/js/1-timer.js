import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtnEl = document.querySelector('.start-btn');
let userSelectedDate=[];
const myInput = document.querySelector("#datetime-picker");

flatpickr(myInput, {
   enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      if (!startBtnEl.disabled) {
        startBtnEl.disabled = true;
          }
      iziToast.error({
        timeout: 5000,
    title: 'Error',
        message: 'Please choose a date in the future'
});
      return;
    } 
    startBtnEl.disabled = false;
  },
}); 
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
}
let initTime;
let intervalId;
let timerValue;
startBtnEl.addEventListener('click', () => {
  myInput.disabled = true;
      startBtnEl.disabled = true;

    const timerBegin = +new Date(myInput.value);
  intervalId = setInterval(() => {
      initTime = Date.now();
  const differTime = timerBegin - initTime;
    timerValue = convertMs(differTime);
    let isTimerFinished = timerValue.daysStr === '00' && timerValue.minutesStr === '00' && timerValue.minutesStr === '00' && timerValue.secondsStr === '00';
    if (isTimerFinished) {
      clearInterval(intervalId);
      myInput.disabled = false;
      iziToast.success({
    title: 'Час вийшов ✅',
    message: '',
});
    }
   refs.days.textContent = timerValue.daysStr;
    refs.hours.textContent = timerValue.hoursStr;
    refs.minutes.textContent = timerValue.minutesStr;
    refs.seconds.textContent = timerValue.secondsStr;
  }, 1000)
})

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  const daysStr = String(days).padStart(2, "0");
  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");
  return { daysStr, hoursStr, minutesStr, secondsStr };
}


