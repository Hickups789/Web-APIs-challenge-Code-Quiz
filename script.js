var questionEl = document.querySelector("#question");
var answer1 = document.querySelector("#answer1")
var answer2 = document.querySelector("#answer2")
var answer3 = document.querySelector("#answer3")
var answer4 = document.querySelector("#answer4")
var start = document.querySelector("#start")
var next = document.querySelector("#next")
var questionIndex = 0
var answerChoices = document.getElementsByClassName("answer")
console.log(answerChoices)
var timerEl = document.querySelector("#time")
var timerId;
var time = 60;
var seconds = 60;
var highscores = document.querySelector("#highscores")
let _e = el => document.querySelector(el)
let aData  = [];
let quizStorage = JSON.parse(localStorage.getItem("quiz"));
if(quizStorage == null) localStorage.setItem("quiz", JSON.stringify([]))
else aData = quizStorage
let points=0
questionArray = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High Text Machine Language"],
        //answers: [0],                               [1]                             [2]                                     [3]
        rightAnswer: "Hyper Text Markup Language"
    },
    {
        question: "The correct sequence of HTML tags for starting a webpage is:",
        answers: ["head,title,HTML,body", "HTML,body,title,head", "HTML,head,title,body", "HTML,head,tile,body"],
        rightAnswer: "HTML,head,title,body"
    },
    {
        question: "Which of the following element is responsible for making the text bold in HTML?",
        answers: ["pre", "a", "b", "br"],
        rightAnswer: "b"
    },
    {
        question: "Which is the correct way to comment out something in HTML?",
        answers: ["Using ## and #", "//", "cars", "pears"],
        rightAnswer: "//"
    }
]

function timer() {
    let interval = setInterval(() => {        
        time--;
        timerEl.textContent = time;
        if (time<= 0){
            endQuiz();
            clearInterval(interval)
        }
    },  1000);
}

console.log(questionArray[questionIndex].question)
function showButtons() {
    start.classList.add("hide")
    next.classList.remove("hide")
    for (var button of answerChoices) {
        button.classList.remove("hide")
    }
}

function showQuestion() {
    console.log("question index: ", questionIndex)
    questionEl.innerHTML = questionArray[questionIndex].question
    answer1.innerHTML = questionArray[questionIndex].answers[0]
    answer1.addEventListener("click", checkIfRight)
    answer2.innerHTML = questionArray[questionIndex].answers[1]
    answer2.addEventListener("click", checkIfRight)
    answer3.innerHTML = questionArray[questionIndex].answers[2]
    answer3.addEventListener("click", checkIfRight)
    answer4.innerHTML = questionArray[questionIndex].answers[3]
    answer4.addEventListener("click", checkIfRight)
}

function checkIfRight(event) {
    event.preventDefault()
    console.log(event.target.innerHTML)
    if (event.target.innerHTML == questionArray[questionIndex].rightAnswer) {
        console.log("Correct")
        points+=10
    } else {
        console.log("wrong")
        time-= 10
    }
    nextQuestion()
}

function nextQuestion() {
    questionIndex += 1
    checkIfQuizOver()
    showQuestion()
}

function checkIfQuizOver() {
    if (questionIndex == questionArray.length) {
        return endQuiz()
    }
}

function endQuiz() {
    console.log("Ended")
 _e(".final").classList.add("active")
 _e("#points").textContent= "Score " + points
 _e(".start").style.display="none"

}

function startQuiz(event) {
    timer()
    event.preventDefault()
    console.log("showing Buttons")
    showButtons()
    console.log("finished showing buttons")
    showQuestion()

}

_e("form").addEventListener("submit", e=>{
    e.preventDefault();
    let scoreData ={
        initial: _e("input").value,
        points: points

    }
    aData.push(scoreData)
    localStorage.setItem("quiz", JSON.stringify(aData))
    window.location = "highscores.html"
})
start.addEventListener("click", startQuiz)
next.addEventListener("click", nextQuestion)