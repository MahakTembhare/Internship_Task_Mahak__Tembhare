const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
        answer: "Harper Lee"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        answer: "Mount Everest"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
    document.getElementById("start-page").style.display = "none";
    document.getElementById("instructions").style.display = "block";
}

function showQuestionPage() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("question-page").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    clearTimeout(timer);
    const questionContainer = document.getElementById("question-container");
    const question = quizQuestions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${question.question}</h5>
                ${question.options.map(option => `
                    <button class="btn btn-outline-primary btn-block" onclick="checkAnswer('${option}')">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
    startTimer();
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    let timeLeft = 15;
    timerElement.innerText = `Time: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showPopup("Time's up!", "error");
            disableOptions();
        }
    }, 1000);
}

function disableOptions() {
    const buttons = document.querySelectorAll("#question-container button");
    buttons.forEach(button => button.disabled = true);
}

function checkAnswer(selectedOption) {
    if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
        score++;
        showPopup("Correct!", "success");
    } else {
        showPopup("Wrong!", "error");
    }
    disableOptions();
}

function showPopup(message, type) {
    const popup = document.getElementById("popup");
    popup.className = `popup ${type}`;
    popup.innerText = message;
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 3000);
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showResult() {
    document.getElementById("question-page").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").innerText = `${score}/${quizQuestions.length}`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("start-page").style.display = "block";
}

function endQuiz() {
    alert("Thank you for taking the quiz!");
    window.location.reload();
}
