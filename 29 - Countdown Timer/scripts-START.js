let countDown;
const displayTimeLeftEl = document.querySelector('.display__time-left');
const timerButtonsEl = document.querySelectorAll('.timer__button');
const displayEndTimeEl = document.querySelector('.display__end-time');

timerButtonsEl.forEach(button => {
  button.addEventListener('click', function(e) {
    const seconds = this.dataset.time;
    timer(seconds);
  })
});

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(+this.minutes.value * 60);
  this.reset();
})

function timer(seconds) {
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);
  displayEndTime(then);

  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTime(secondsLeft);
  }, 1000);
}

function displayTime(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  displayTimeLeftEl.textContent = displayTime;
  document.title = displayTime;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  displayEndTimeEl.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

