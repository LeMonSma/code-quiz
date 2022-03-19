let startQuizEl = document.querySelector('#start-quiz');
let hideText = document.getElementById('welcome-page');
let questionContainerEl = document.getElementById('question-container');
let questionEl = document.getElementById('question')
let answerButtonsEl = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex
let userName = prompt('whats your initials?')
let timerEl = document.getElementById('score');
let highScoreEl = document.getElementById('high-score')
let playerNameEL = document.getElementById('player-name')
let playerScoreEl = document.getElementById('player-score')
let timeLeft
let resetEl = document.getElementById('reset')
let finalScoreEl = document.getElementById('final-score')
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];








let timer = function() {


    timeLeft = 65;

    let timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft === 0) {
            timerEl.textContent = timeLeft
            clearInterval(timeInterval);


        }


    }, 1000);
}




const questions = [{
        question: 'what is the difference between using let, and const?',
        answers: [
            { text: 'let can be reassigned and const can not be changed', correct: true },
            { text: 'there is no difference', correct: false },
            { text: 'let can not be changed and const can be reassigned', correct: false },
            { text: 'none of the above are true', correct: false }
        ]
    },
    {
        question: 'what are callbacks?',
        answers: [
            { text: 'functions that have for loops inside of them', correct: false },
            { text: 'functions that are used as an argument of another function', correct: true },
            { text: 'a variable set equal to a function', correct: false },
            { text: 'none of the above are true', correct: false }
        ]
    },
    {
        question: 'which of the following are true',
        answers: [
            { text: '3 === "3"', correct: false },
            { text: '9 === "9" ', correct: false },
            { text: '3 === 3', correct: true },
            { text: 'none of the above are true', correct: false }
        ]
    }

    ,
    {
        question: 'what is hoisting in js',
        answers: [
            { text: 'when a coding robot lifts up an object', correct: false },
            { text: 'when you assign a new value to a variable', correct: false },
            { text: 'when js automatically takes all functions, variables, classes to the bottome of the scope', correct: false },
            { text: 'when js automatically takes all funcntions, variables, classes to the top of the scope', correct: true }
        ]
    }
]

function resetAnswers() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}



// starts the quiz after the count down and shows the first question
function askQuestion() {
    let hideText = document.getElementById('countdown');
    hideText.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0
    setNextQuestion();
}

function setNextQuestion() {
    resetAnswers();
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {

    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer-btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct

        }
        answerButtonsEl.appendChild(button)
        button.addEventListener('click', selectAnswer)
    })

}

// when the user clicks their answer this function decides if its right or wrong
function selectAnswer(e) {




    const selectedButton = e.target
    const correct = selectedButton.dataset.correct;

    // cycling through all the quesitons
    if (shuffledQuestions.length > currentQuestionIndex + 1) {




        if (correct) {
            currentQuestionIndex++;
            setNextQuestion()




        } else {

            timeLeft = timeLeft - 10




            currentQuestionIndex++


            setNextQuestion()
        }
    } else {
        if (correct) {
            highScore()
        } else {
            timeLeft = timeLeft - 10
            highScore()
        }
        questionContainerEl.classList.add('hide')

    }

}

function highScore() {
    const scores = {
        score: timeLeft,
        name: userName
    }



    timerEl.classList.add('hide')
    highScoreEl.classList.remove('hide')
        // highScoreEl.classList.add('flex')
    highScores.push(scores)
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10)
    localStorage.setItem('highScores', JSON.stringify(highScores));
    playerScoreEl.innerHTML = highScores
        .map(score => {
            return (`<li class='score'>${score.name}-${score.score}</li>`);
        })
        .join('')
    finalScoreEl.textContent = timeLeft + ""
    resetEl.addEventListener('click', resetQuiz)



}

function resetQuiz() {
    window.location.assign("index.html")
}








// countdown timer at the start of the quiz
function countdown() {
    let timerEl = document.getElementById('countdown');
    let timeLeft = 5;

    let timeInterval = setInterval(function() {

        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else if (timeLeft === 0) {
            timerEl.textContent = timeLeft
            clearInterval(timeInterval);

            askQuestion();

        }


    }, 1000);

    timer();
}



let beginQuiz = function() {
    hideText.classList.add('hide')
    countdown()
}

startQuizEl.addEventListener('click', beginQuiz)