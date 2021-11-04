// Initialize Timer with a value
// Initialize Score as 0
var theQuizGame = {
    theTimer: 10,
    theScore: 0
};

// quiz questions array
var questions = [
    {
        question: "How much is 1 + 0?",
        options: [1,2,3,4],
        rightAnswer: 1
    },

    {
        question: "How much is 1 + 1?",
        options: [1,2,3,4],
        rightAnswer: 2
    },

    {
        question: "How much is 1 + 2?",
        options: [1,2,3,4],
        rightAnswer: 3
    },

    {
        question: "How much is 1 + 3?",
        options: [1,2,3,4],
        rightAnswer: 4
    }
];

// Select questions section element
var questionsEL = document.getElementById("questions");
// Select Start Quiz button element
var startQuizEl = document.querySelector(".start-quiz");
// Select Timer element
var timerEl = document.querySelector(".time-counter");

// Attach event listener to Start Quiz button
startQuizEl.addEventListener("click", function() {
    // hide content main section
    hideMainContent();
    //start time countdown
    countdown();
    // generate questions
    generateQuestionEls();
    // generate buttons
    generateAnswerEls();
});

var hideMainContent = function() {
    var mainContentEl = document.getElementById("main-page");
    console.log(mainContentEl);
    mainContentEl.setAttribute("class", "hide-content");

    // make questions section visible
    questionsEL.removeAttribute("class")
}

// Timer function
var countdown = function() {

    var timeInterval = setInterval(function () {
        if (theQuizGame.theTimer > 0) {
            timerEl.textContent = theQuizGame.theTimer;
            theQuizGame.theTimer--;
        }
        else {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            console.log("Game Over");
            return;
        }
    }, 1000);
};

// Generate Question Elements function
var generateQuestionEls = function() {
    // creante question h3 element
    var h3El = document.createElement("h3");
    h3El.textContent = questions[0].question;
    questionsEL.appendChild(h3El);
    // for (let i = 0; i < questions.length; i++) {
    // }
};

// Generate Answer Buttons function
var generateAnswerEls = function() {
    for (let i = 0; i < questions[0].options.length; i++) {
        // create answer options buttons
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "btn-default";
        answerBtnEl.textContent = questions[0].options[i];
        questionsEL.appendChild(answerBtnEl);
    }
};

