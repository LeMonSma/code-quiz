let startQuizEl = document.querySelector('#start-quiz');
let hideText = document.getElementById('welcome-page');
let questionContainerEl = document.getElementById('question-container');
let questionEl = document.getElementById('question')
let answerButtonsEl = document.getElementById('answer-buttons')
const questions = [{
    question: 'this is a test',
    answers: [
        { text: '1', correct: true },
        { text: '2', correct: false },
        { text: '3', correct: false },
        { text: '4', correct: false }
    ]
}]

function resetAnswers() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

let shuffledQuestions, currentQuestionIndex
    // starts the quiz after the count down and shows the first question
let askQuestion = function() {
    let hideText = document.getElementById('countdown');
    hideText.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0
    setNextQuestion();

    function setNextQuestion() {
        resetAnswers();
        showQuestion(shuffledQuestions[currentQuestionIndex]);

    }

    function showQuestion(question) {
        questionEl.innerText = question.question
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('answer-btn')
            answerButtonsEl.appendChild(button)
        })

    }


}





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


}

let beginQuiz = function() {
    hideText.classList.add('hide')
    countdown()
}





















startQuizEl.addEventListener('click', beginQuiz)