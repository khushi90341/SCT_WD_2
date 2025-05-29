let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
    }
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = "";
}

function lapTimer() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        const lapItem = document.createElement("li");
        lapItem.className = "lap-time";
        lapItem.innerHTML = `Lap ${lapCount}: ${lapTime} <button class="clear-lap" onclick="clearLap(this)">Clear</button>`;
        lapList.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? "0" + num : num;
}

// Function to clear individual lap
function clearLap(button) {
    const lapItem = button.parentElement;
    lapList.removeChild(lapItem);
}

// Event Listeners
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", lapTimer);