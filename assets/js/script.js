// Initialize Timer with a value
// Initialize Score as 0
var theQuizGame = {
    theTimer: 10,
    theScore: 0,
    theQuestionId: 0
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

// hide main section content when game starts
// un-hide questions section content
var hideMainContent = function() {
    // hide main section content
    var mainContentEl = document.getElementById("main-page");
    console.log(mainContentEl);
    mainContentEl.setAttribute("class", "hide-content");

    // un-hide questions section content
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

    if (theQuizGame.theQuestionId <= questions.length && theQuizGame.theQuestionId == 0) {
        // creante question h3 element
        var h3El = document.createElement("h3");
        h3El.textContent = questions[theQuizGame.theQuestionId].question;
        questionsEL.appendChild(h3El);
    }
    else if (theQuizGame.theQuestionId <= questions.length) {
        var h3El = document.createElement("h3");
        h3El.textContent = questions[theQuizGame.theQuestionId].question;
        console.log(h3El.textContent);
    }
    else {
        // Game is over - show final score section - hide questions section
        console.log("Game is over - all questions answered");
        return;
    }

};

// Generate Answer Buttons function
var generateAnswerEls = function() {
    for (let i = 0; i < questions[theQuizGame.theQuestionId].options.length; i++) {
        // create answer options buttons
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "btn-default";
        answerBtnEl.textContent = questions[theQuizGame.theQuestionId].options[i];
        questionsEL.appendChild(answerBtnEl);

        // event listener - click
        answerBtnEl.addEventListener("click", function() {
            // check answer
            checkAnswer(this.textContent, questions[theQuizGame.theQuestionId]);
        });
    }
};

// check if answer is correct - assign score (+ or -)
var checkAnswer = function(answer, questionId) {
    if (answer == questionId.rightAnswer) {
        console.log("answer is correct");
        theQuizGame.theScore++;
        theQuizGame.theQuestionId++;
        generateQuestionEls();
    }
    else {
        console.log("answer is incorrect " + answer + questionId.rightAnswer);
        theQuizGame.theScore--;
        console.log(theQuizGame.theScore);
    }
};

