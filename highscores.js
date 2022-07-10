let aData  = [];
let quizStorage = JSON.parse(localStorage.getItem("quiz"));
if(quizStorage == null) localStorage.setItem("quiz", JSON.stringify([]))
else aData = quizStorage
if (aData.length >0) {
    aData.forEach(r=>{
        let score = document.createElement("li")
        score.innerHTML = `<div class="fx">
        <span>${r.initial}: ${r.points}</span>
    </div>`
    document.querySelector("#highscoresList").appendChild(score)
    })
}
