

window.onload = function () {
    fetch("questions/count").then(x => x.text()).then(x => { sz = parseInt(x) })
    document.getElementById("back").onclick = function Vissza() {
        displayedQuestion--;
        if (displayedQuestion < 0) displayedQuestion = (questionsInHotList - 1);
        kérdésMegjelenítés();
    }
    document.getElementById("next").onclick = function Előre() {
        displayedQuestion++;
        if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
        kérdésMegjelenítés();
    }
    init();
    init()
}


var sz;
var kérdésSorszám = 1;
var jóVálasz;
var hotList = [];            
var questionsInHotList = 7;  
var displayedQuestion;      
var numberOfQuestions;      
var nextQuestion = 1;
var TimerHandler;

function Előre() {
    clearTimeout(TimerHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}
function Vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = (questionsInHotList - 1);
    kérdésMegjelenítés();
}

function letöltésBefejeződött(data) {
    console.log("Sikeres letöltés")
    console.log(data)
    kérdések = data;
    kérdésMegjelenítés(0);
}
function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    
    kérdés_szöveg.innerText = kérdés.questionText
    válasz1.innerText = kérdés.answer1
    válasz2.innerText = kérdés.answer2
    válasz3.innerText = kérdés.answer3
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép").classList.add("rejtett")
    }
    válasz1.classList.remove("jó", "rossz");
    válasz2.classList.remove("jó", "rossz");
    válasz3.classList.remove("jó", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";
}



function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }
    
    document.getElementById("next").addEventListener("click", Előre);
    document.getElementById("back").addEventListener("click", Vissza);

    
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
        if (localStorage.getItem("hotList")) {
            hotList = JSON.parse(localStorage.getItem("hotList"));
        }

        if (localStorage.getItem("displayedQuestion")) {
            displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
        }

        if (localStorage.getItem("nextQuestion")) {
            nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
        }

        if (hotList.length > 0) {
            for (var i = 0; i < questionsInHotList; i++) {
                kérdésBetöltés(nextQuestion, i);
                nextQuestion++;
            }
        }
        else {
            kérdésMegjelenítés();
        }

    }
    function kérdésBetöltés(questionNumber, destination) {
        fetch(`/questions/${questionNumber}`)
            .then(
                result => {
                    if (!result.ok) {
                        console.error(`Hibás letöltés: ${response.status}`)
                    }
                    else {
                        return result.json()
                    }
                }
            )
            .then(
                q => {
                    hotList[destination].question = q;
                    hotList[destination].goodAnswers = 0;
                    console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                    if (displayedQuestion == undefined && destination == 0) { 
                        displayedQuestion = 0;
                        kérdésMegjelenítés();
                    }
                }
            );
    }
    válasz = function (n) {
        if (jóVálasz == n) {
            document.getElementById("válasz" + n).classList.add("jó");
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++;
            }
        }
        else {
            document.getElementById("válasz" + n).classList.add("rossz");
            hotList[displayedQuestion].goodAnswers = 0;

        }
        document.getElementById("válaszok").style.pointerEvents = "none";
        TimerHandler = setTimeout(Előre, 3000);

        localStorage.setItem("hotList", JSON.stringify(hotList));
        localStorage.setItem("displayedQuestion", displayedQuestion);
        localStorage.setItem("nextQuestion", nextQuestion);
    }

}