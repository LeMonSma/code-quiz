let startQuizEl = document.querySelector('#start-quiz');
let startingText = document.getElementById('starting-text');

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
        }


    }, 1000);
}

let beginQuiz = function() {
    startingText.classList.add('hide')
    countdown();





}





















startQuizEl.addEventListener('click', beginQuiz)