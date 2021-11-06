// Initialize Timer with a value
// Initialize Score as 0
var theQuizGame = {
    theTimer: 40,
    theQuestionId: 0,
    theInitials: ""
};

// quiz questions array
var questions = [
    {
        question: "How many Great Rings were forget by Sauron?",
        options: [20,9,19,3],
        rightAnswer: 19 // 3-elves, 7-dwar-lords, 9-men --> the One Ring is the Master Ring, not a Great Ring. =D
    },

    {
        question: "In Braveheart, what were William Wallace's last words?",
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

// Select main content section element
var mainContentEl = document.getElementById("main-page");
// Select questions section element
var questionsEL = document.getElementById("questions");
// Select answers section element
var answersEl = document.getElementById("answers");
// Select user message section content element
var userMessageEl = document.getElementById("user-message");
// Select End Game section element
var endGameEl = document.getElementById("end-game");
// Select High Scores section element
var highScoresEl = document.getElementById("high-scores");
// Select Start Quiz button element
var startQuizEl = document.querySelector(".start-quiz");
// Select Timer element
var timerEl = document.querySelector(".time-counter");
// Select submit button element
var submitBtnEl = document.getElementById("submit");
// Select view-high-scores button element
var viewHighScoresBtnEl = document.getElementById("view-high-scores");
// Select clear-high-scores button element
var clearHighScoresBtnEl = document.getElementById("clear-high-scores-btn");
// Select main-page button element
var mainPageBtnEl = document.getElementById("main-page-btn");
// Select initials text box element
var initialsEl = document.getElementById("initials");
// EndGame tracker
var endGame = false;
// Select high-scores-ol element
var highScoreOLEl = document.getElementById("high-scores-ol");

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
    mainContentEl.setAttribute("class", "hide-content");

    // un-hide questions section content
    questionsEL.removeAttribute("class");
}

// hide questions section content
var hideQuestionsContent = function() {
    questionsEL.setAttribute("class", "hide-content");
    // un-hide End Game section content
    endGameEl.removeAttribute("class");

    var theFinalScoreEl = document.getElementById("final-score");
    theFinalScoreEl.textContent = theQuizGame.theTimer;
}

var hideEndGameContent = function() {
    endGameEl.setAttribute("class", "hide-content");
    mainContentEl.removeAttribute("class");
};

// Timer function
var countdown = function() {

    var timeInterval = setInterval(function () {
        if (endGame) {
            clearInterval(timeInterval);
            hideQuestionsContent();
        }
        else if (theQuizGame.theTimer > 0) {
            timerEl.textContent = theQuizGame.theTimer;
            theQuizGame.theTimer--;
        }
        else {
            // timerEl.textContent = 0;
            clearInterval(timeInterval);
            hideQuestionsContent();
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

    // un-hide user message section content
    userMessageEl.removeAttribute("class");
    userMessageEl.textContent = "";

    if (this.textContent == questions[theQuizGame.theQuestionId].rightAnswer) {
        theQuizGame.theQuestionId++;
        userMessageEl.textContent = "Answer is Correct!"
        userMessageEl.setAttribute("style", " color: lightgreen;");
        setTimeout(function() {
            userMessageEl.textContent = "";
            generateQuestionEls();
        }, 1000);
    }
    else {
        theQuizGame.theQuestionId++;
        theQuizGame.theTimer -= 10;
        userMessageEl.textContent = "Answer is Incorrect!"
        userMessageEl.setAttribute("style", " color: red;");
        setTimeout(function() {
            userMessageEl.textContent = "";
            generateQuestionEls();
        }, 1000);
    }
};

// function to store data on local storage
function storeGameHighScore() {
    
    theQuizGame.theInitials = initialsEl.value.trim();
    
    if (theQuizGame.theInitials == "") {
        theQuizGame.theInitials = "AAA"
    }    

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
        score: theQuizGame.theTimer,
        initials: theQuizGame.theInitials
    }

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Show high scores section element
    loadHighScores();
}

// load all highscores
var loadHighScores = function() {
    endGameEl.setAttribute("class", "hide-content");
    mainContentEl.setAttribute("class", "hide-content");
    highScoresEl.removeAttribute("class");
    
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    console.log(highscores);
    
    if (!highscores) {
        return false;
    }

    // clear li elements before loading from local storage
    highScoreOLEl.innerHTML = "";
       
    for (var i = 0; i < highscores.length; i++) {
        // create <li> elements to display high scores
        var highScoreLiEl = document.createElement("li");
        highScoreLiEl.className = "high-score-list";
        highScoreLiEl.textContent = highscores[i].score + " -- " + highscores[i].initials;
        highScoreOLEl.appendChild(highScoreLiEl);
    }
};

var clearHighScores = function() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
};

var viewMainPage = function() {
    highScoresEl.setAttribute("class", "hide-content");
    mainContentEl.removeAttribute("class");
    endGame = false;
    theQuizGame.theTimer = 40;
};

submitBtnEl.onclick = storeGameHighScore;

viewHighScoresBtnEl.onclick = loadHighScores;

clearHighScoresBtnEl.onclick = clearHighScores;

mainPageBtnEl.onclick = viewMainPage;