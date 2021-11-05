// Initialize Timer with a value
// Initialize Score as 0
var theQuizGame = {
    theTimer: 100,
    theScore: 0,
    theQuestionId: 0
};

// quiz questions array
var questions = [
    {
        question: "How many Great Rings were forget by Sauron?",
        options: [20,9,19,3],
        rightAnswer: 19 // 3-elves, 7-dwar-lords, 9-men --> the One Ring is the Master Ring, not a Great Ring. =D
    },

    {
        question: "William Wallace's final word is _____?",
        options: ["Revenge","Freedom","oh boy!","Hakunamatata"],
        rightAnswer: "Freedom"
    },

    {
        question: "Iconic Star Wars quote: ",
        options: ["I have a bad feeling about this","May the Force be with you","I am a Jedi, like my father before me","All the above"],
        rightAnswer: "All the above"
    },

    {
        question: "Yippee-Ki-Yay, Motherf*****, is a quote from which action movie?",
        options: ["Rambo, first blood","Die Hard","Beverly Hills Cop","Lethal Weapon"],
        rightAnswer: "Die Hard"
    }
];

// Select questions section element
var questionsEL = document.getElementById("questions");
// Select answers section element
var answersEl = document.getElementById("answers");
// Select End Game section element
var endGameEl = document.getElementById("end-game");
// Select Start Quiz button element
var startQuizEl = document.querySelector(".start-quiz");
// Select Timer element
var timerEl = document.querySelector(".time-counter");
// EndGame tracker
var endGame = false;

// Attach event listener to Start Quiz button
startQuizEl.addEventListener("click", function() {
    // hide content main section
    hideMainContent();
    //start time countdown
    countdown();
    // generate questions
    generateQuestionEls();
});

// hide main section content when game starts
// un-hide questions section content
var hideMainContent = function() {
    // hide main section content
    var mainContentEl = document.getElementById("main-page");
    mainContentEl.setAttribute("class", "hide-content");

    // un-hide questions section content
    questionsEL.removeAttribute("class")
}

// hide questions section content
var hideQuestionsContent = function() {
    questionsEL.setAttribute("class", "hide-content");
    // un-hide End Game section content
    endGameEl.removeAttribute("class");

    var theFinalScoreEl = document.getElementById("final-score");
    theFinalScoreEl.textContent = theQuizGame.theTimer;
}

// Timer function
var countdown = function() {

    var timeInterval = setInterval(function () {
        if (endGame) {
            clearInterval(timeInterval);
            return;
        }
        else if (theQuizGame.theTimer > 0) {
            timerEl.textContent = theQuizGame.theTimer;
            theQuizGame.theTimer--;
        }
        else {
            // timerEl.textContent = 0;
            clearInterval(timeInterval);
            console.log("Game Over");
            return;
        }
    }, 1000);
};

// Generate Question Elements function
var generateQuestionEls = function() {

    var questionNum = theQuizGame.theQuestionId;
    
    if (questionNum < questions.length) {
        var h3El = document.getElementById("the-question");
        h3El.textContent = questions[questionNum].question;
        generateAnswerEls();
    }
    else {
        // Game is over - show final score section - hide questions section
        endGame = true;
        console.log("Game is over - all questions answered" + endGame);
        hideQuestionsContent();
    }

};

// Generate Answer Buttons function
var generateAnswerEls = function() {
    var questionNum = theQuizGame.theQuestionId;
    var answersEl = document.getElementById("answer-options");
    // delete button elements before new ones are created
    answersEl.innerHTML = "";

    // first question from quiz - create elements
    for (let i = 0; i < questions[questionNum].options.length; i++) {
        // create answer options buttons
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "btn-default";
        answerBtnEl.textContent = questions[questionNum].options[i];
        answersEl.appendChild(answerBtnEl);

        // click event - check if answer is right or wrong
        answerBtnEl.onclick = checkAnswer;
    }
};

// check if answer is correct - assign score (+ or -)
var checkAnswer = function() {
    if (this.textContent == questions[theQuizGame.theQuestionId].rightAnswer) {
        console.log("answer is correct");
        theQuizGame.theScore++;
        theQuizGame.theQuestionId++;
        generateQuestionEls();
    }
    else {
        console.log("answer is incorrect");
        theQuizGame.theScore--;
        theQuizGame.theQuestionId++;
        console.log(theQuizGame.theScore);
        generateQuestionEls();
    }
};