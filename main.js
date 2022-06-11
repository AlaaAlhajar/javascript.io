const display = document.getElementById('clock');

// set audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.addAlarm')


const fakeAlarms = [];  // Stores all the alarms being set 

// Plays the alarm audio at correct time
function ringing(now) {
    audio.play();
    alert(`Hey! it is ${now}`);
    clearAlarm();
}

// updates time every second 
function renderTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());

    var period = hour >= 12 ? "PM" : "AM";
    if (hour > 12) {
        hour = hour % 12;
    }
    const now = `${hour}:${minutes}:${seconds} ${period}`;

    display.innerText = `${hour}:${minutes}:${seconds} ${period}`;

    //Check if the fakeAlarms includes the current time , "now"
    //If yes, ringing() is called
    if (fakeAlarms.includes(now)) {
        ringing(now);
    }
}

// Set the correct format of time (Converts "1:2:3" to "01:02:03")
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// Function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}

// Removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.parentElement.remove();
    }
})

// Removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = fakeAlarms.filter((time) => time != value);
    fakeAlarms.length = 0;                  // Clear contents
    fakeAlarms.push.apply(fakeAlarms, newList);
}

// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm) {
    const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <span class="time"><button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>  </span>   
    </li>`
    myList.innerHTML += html
};


//Event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e => {
    e.preventDefault();
    //Const newAlarm = addAlarm.alarmTime.value;
    let new_h = formatTime(addAlarm.a_hour.value);
    if (new_h === '0') {
        new_h = '00'
    }
    let new_m = formatTime(addAlarm.a_min.value);
    if (new_m === '0') {
        new_m = '00'
    }
    let new_s = formatTime(addAlarm.a_sec.value);
    if (new_s === '0') {
        new_s = '00'
    }

    let new_p = formatTime(addAlarm.period.value);

    const newAlarm = `${new_h}:${new_m}:${new_s} ${new_p}`

    //Add newAlarm to fakeAlarms
    if (isNaN(newAlarm)) {
        if (!fakeAlarms.includes(newAlarm)) {
            fakeAlarms.push(newAlarm);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})

// calls renderTime() every second
setInterval(renderTime, 1000);
