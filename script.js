const timerItems = document.querySelectorAll(".timer-item");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");
const notifBox = document.querySelector(".notifications");
// btns
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const stop = document.getElementById("stop");
const newResult = document.getElementById("new");
const clearResults = document.getElementById("clearResults");

const checkValue = (value) => (value < 10 ? "0" + value : value);

let timerInterval;

// timer
const timer = () => {
  let mil = Number(milliseconds.innerHTML);
  let sec = Number(seconds.innerHTML);
  let min = Number(minutes.innerHTML);
  let hour = Number(hours.innerHTML);

  mil += 1;
  milliseconds.innerHTML = checkValue(mil);

  // check milliseconds
  if (mil == 100) {
    mil = 0;
    milliseconds.innerHTML = "00";

    // seconds
    sec += 1;
    seconds.innerHTML = checkValue(sec);
  }

  // check seconds
  if (sec == 60) {
    sec = 0;
    seconds.innerHTML = "00";

    // minutes
    min += 1;
    minutes.innerHTML = checkValue(min);
  }

  // check minutes
  if (min == 60) {
    min = 0;
    minutes.innerHTML = "00";

    // hours
    hour += 1;
    hours.innerHTML = checkValue(hour);
  }
};

// start timer
start.addEventListener("click", () => {
  if (!timerInterval) timerInterval = setInterval(timer, 10);
});

// pause timer
pause.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = 0;
});

// stop timer
stop.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = 0;

  // clear timer ui
  timerItems.forEach((item) => {
    item.innerHTML = "00";
  });
});

// show new result
let prevTime;

newResult.addEventListener("click", () => {
  const resultsCount = notifBox.children.length;
  const resultTime = `${hours.textContent}:${minutes.textContent}:${seconds.textContent}:${milliseconds.textContent}`;
  if (resultTime == prevTime) return;

  let resultHtml = `
            <div class="result">
                <span>Result #${resultsCount + 1}</span> : ${resultTime}
            </div>
    `;

  notifBox.insertAdjacentHTML("afterbegin", resultHtml);
  notifBox.classList.add("active");
  prevTime = resultTime;
});

// clear results
clearResults.addEventListener("click", () => {
  notifBox.classList.remove("active");
  setTimeout(() => {
    notifBox.innerHTML = "";
  }, 100);
  prevTime = 0;
});
