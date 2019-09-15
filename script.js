class Timer {
  constructor(workTime, breakTime, display) {
    this.workTime = workTime;
    this.breakTime = breakTime;
    this.display = display;
    this.start = false;
    this.pause = false;
  }
  changer(node, option) {
    let number = node.innerText * 1;
    if (option) {
      if (++number > 60) return;
      node.innerText = number + "";
    } else {
      if (--number < 1) return;
      node.innerText = number + "";
    }
  }

  startTimer() {
    if (this.start) return;
    this.start = true;

    this.display.innerText = this.workTime.innerText + ":00";
    let counter = parseInt(this.display.innerText) * 100;
    
    const stopper = setInterval(() => {
      if (!this.pause) {
        if (counter-- % 100 === 0 || counter == 99) counter -= 40;
        let string = counter + "";
        if (counter <= 1000) {
          string = "0" + string[0] + ":" + string[1] + string[2];
        } else {
          string = string[0] + string[1] + ":" + string[2] + string[3];
        }
        if (counter < 100) {
          string = "00:" + counter;
          if (counter < 10) string = "00:0" + counter;
        }
        this.display.innerText = string;
        if (counter <= 0) {
          clearInterval(stopper);
          this.display.innerText = "00:00";
          this.start = false;
        }
      }
      else{
        clearInterval(counter);
      }
    }, 1000);
  }
  pauseTimer() {
    this.pause = true;
  }
  resumeTimer(){
    this.pause = false;
  }
  resetTimer() {
    this.workTime.innerText = "25";
    this.breakTime.innerText = "5";
    this.display.innerText = "25:00";
  }
}

const work = document.querySelector(".work-time");
const breakTime = document.querySelector(".breakTime-time");
const changeTimeWork = document.querySelector(".change-time-work").children;
const changeTimeBrake = document.querySelector(".change-time-breakTime")
  .children;
const optionButtons = document.querySelector(".pomodoro__option");
const display = document.querySelector(".pomodoro__timer>h1");

const arrayOfChangers = [changeTimeBrake, changeTimeWork];

const timer = new Timer(work, breakTime, display);

arrayOfChangers.forEach(elementNode => {
  for (item of elementNode) {
    item.addEventListener("click", event => {
      switch (event.target.id) {
        case "plusWork":
          timer.changer(work, true);
          break;
        case "minusWork":
          timer.changer(work, false);
          break;
        case "plusBreakTime":
          timer.changer(breakTime, true);
          break;
        case "minusBreakTime":
          timer.changer(breakTime, false);
          break;
      }
    });
  }
});

optionButtons.addEventListener("click", event => {
  switch (event.target.id) {
    case "start":
      timer.startTimer();
      break;
    case "pause":
      timer.pauseTimer();
      break;
    case "resume":
      timer.resumeTimer();
      break;
    case "reset":
      timer.resetTimer();
      break;
  }
});
