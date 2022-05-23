const START_BTN = document.getElementById("start");
const time = document.querySelector("[data-time]");
let previous;
const HOUR = document.getElementById("hour");
const MINUTE = document.getElementById("minute");
const SECOND = document.getElementById("second");
HOUR.innerText = "Hour";
MINUTE.innerText = "Minute";
SECOND.innerText = "Second";
const bar = document.getElementById("bar");
const ADD_BTN = document.getElementById("addBtn");
const FORM = document.getElementById("add-event-form");
const EVENT_TABLE = document.getElementById("eventTable");
const ADD_SECTION = document.getElementById("addAlter");
const TIME_SECTION = document.getElementById("timeAlter");

const DEL_BTN1 = document.getElementById("del-1");
const DEL_BTN2 = document.getElementById("del-2");
START_BTN.addEventListener("click", timerCounter);
DEL_BTN1.addEventListener("click", () => {
    const ROW1 = document.getElementById("row1");
    ROW1.remove();
})

DEL_BTN2.addEventListener("click", () => {
    const ROW2 = document.getElementById("row2");
    ROW2.remove();
})

ADD_BTN.onclick = function (event) {
    event.preventDefault();
    const TASK_NAME = document.getElementById("taskName").value;
    const MINUTES = document.getElementById("minutes").value;
    if (TASK_NAME && MINUTES && MINUTES > 0) {
        let row = EVENT_TABLE.insertRow(-1);
        let taskName = row.insertCell(0);
        let minutes = row.insertCell(1);
        let del_btn = document.createElement("td");
        del_btn.classList.add("BOTTOM");
        del_btn.classList.add("gradient-g");
        del_btn.classList.add("btn-small");
        let text = document.createElement("span");
        text.classList.add("text");
        text.innerText = "Delete"
        let highlight = document.createElement("span");
        highlight.classList.add("highlight-span");
        row.append(del_btn)
        del_btn.append(text)
        del_btn.append(highlight)

        function deleteE() {
            row.remove();
        }

        del_btn.addEventListener("click", deleteE);
        taskName.innerHTML = TASK_NAME;
        minutes.innerHTML = MINUTES;
        FORM.reset();
        return false;
    } else {
        showAlert("Input error!", ADD_SECTION);
    }
}

function getText(time) {
    const show_min = Math.floor(time / 60) % 60;
    const show_hour = Math.floor(time / 3600 % 24);
    const show_sec = Math.floor(time % 60);
    HOUR.innerText = show_hour.toString();
    MINUTE.innerText = show_min.toString();
    SECOND.innerText = show_sec.toString();
}

function showTimeLeft(time, uMinute) {
    return (time / uMinute * 100).toFixed(0);
}

function showAlert(msg, section, duration = 1000) {
    const ALTER_DIV = document.createElement("div");
    ALTER_DIV.textContent = msg;
    ALTER_DIV.classList.add("alter");
    section.prepend(ALTER_DIV);
    if (duration == null) return;
    setTimeout(() => {
        ALTER_DIV.classList.add("hide");
        ALTER_DIV.addEventListener("transitionend", () => {
            ALTER_DIV.remove();
        })
    }, duration)
}

let i = 0;

function timerCounter() {
    const events = EVENT_TABLE.getElementsByTagName("td");
    if (events.length > 0) {
        const topEvent = events[0];
        const topEvent2 = events[1];
        const topEvent3 = events[2];
        const user_minute = topEvent2.innerText;
        const U_Min = parseInt(user_minute) * 60;
        previous = U_Min;
        if (i === 0) {
            i = 1;
            let counter = setInterval(frame, 1000);
            function frame() {
                if (previous >= 0) {
                    console.log(previous)
                    getText(previous);
                    let w = showTimeLeft(previous, U_Min);
                    console.log(previous, U_Min)
                    bar.style.width = w + "%";
                    bar.innerHTML = w + "%";
                } else {
                    HOUR.innerText = "";
                    MINUTE.innerText = '';
                    SECOND.innerText = '';
                    time.innerText = "Time's up!"
                    clearInterval(counter);
                    i = 0;
                    topEvent.remove();
                    topEvent2.remove();
                    topEvent3.remove();
                    clearInterval(counter);
                }
                previous--;
            }
        }
    } else {
        showAlert("No topic!", TIME_SECTION)
    }
}
