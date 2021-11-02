// Initialize Timer with a value
var theQuizGame = {
    theTimer: 10,
    theScore: 0
};

var questions = [
    {
        question: "How much is 1 + 0?",
        options: [1,2,3,4],
        rightAnswer: 2
    },

    {
        question: "How much is 1 + 1?",
        options: [1,2,3,4],
        rightAnswer: 2
    },

    {
        question: "How much is 1 + 2?",
        options: [1,2,3,4],
        rightAnswer: 2
    },

    {
        question: "How much is 1 + 3?",
        options: [1,2,3,4],
        rightAnswer: 2
    }
];


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
        if (theQuizGame.theTimer > 0) {
            timerEl.textContent = theQuizGame.theTimer;
            theQuizGame.theTimer--;
            // generate questions
            quizGame();
        }
        else {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            console.log("Game Over");
            return;
        }
    }, 1000);

    
};

// Quiz Game function
var quizGame = function() {
  for (let i = 0; i < questions.length; i++) {
      // create answer options buttons
      var optionAnswer = document.createElement("button");
  }
};