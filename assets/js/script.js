// Initialize Timer with a value
theTimer = 10;

// Select Start Quiz button element
var startQuizEl = document.querySelector(".start-quiz");
// Select Timer element
var timerEl = document.querySelector(".time-counter");

// Attach event listener to Start Quiz button
startQuizEl.addEventListener("click", function() {
    console.log("Event Listener - Click - works!");
    countdown();
});

// Timer function
var countdown = function() {

    var timeInterval = setInterval(function () {
        if (theTimer > 0) {
            timerEl.textContent = theTimer;
            theTimer--;
        }
        else {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            window.alert("Game Over!");
            return;
        }
    }, 1000);

};