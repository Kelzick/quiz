const start_btn = document.querySelector(".btn-start")
const start_quiz = document.querySelector(".q-a")
let answers_on = document.querySelectorAll(".answer")
let question_on = document.querySelector(".question")
let restart_btn = document.querySelector(".restart")
let totalCorrectAnswers = 0;
let totalAnswersGiven = 0;
let end = document.querySelector(".end")
let end_txt = document.querySelector(".results")
const bg_audio = new Audio("https://kelzick.github.io/some_math_quiz/just-a-random-loop-182900.mp3");
const right_audio = new Audio("https://kelzick.github.io/some_math_quiz/coin-flip-88793.mp3");
const false_audio = new Audio("https://kelzick.github.io/some_math_quiz/error-10-206498.mp3");
const end_audio = new Audio("https://kelzick.github.io/some_math_quiz/microwave-end-sound-98680.mp3");
start_btn.addEventListener("click",on_quiz)
restart_btn.addEventListener("click",restart)

function on_quiz() {
    start_btn.style.opacity=0;
    start_btn.style.pointerEvents="none" ;
    start_quiz.style.opacity=1;
    start_quiz.style.pointerEvents="all";
    displayQuestion();
    bg_audio.play();
    setTimeout(end_quiz,10000)
}
function end_quiz(){
    start_quiz.style.opacity = 0;
    start_quiz.style.pointerEvents="none";
    alert("Правильно:"+totalCorrectAnswers+"\nВсего:"+totalAnswersGiven+"\nПравильность:"+Math.floor(totalCorrectAnswers/totalAnswersGiven*100)+"%");
    end_txt.innerHTML = "В прошлый раз вы дали "+totalCorrectAnswers+" правильных ответов из "+totalAnswersGiven+"."+"<br>Точность: "+Math.floor(totalCorrectAnswers/totalAnswersGiven*100)+"%";
    end.style.opacity = 1;
    end_audio.play();
    end.style.pointerEvents = "all";
}
function restart(){
    end.style.opacity = 0;
    end.style.pointerEvents = "none";
    totalCorrectAnswers = 0;
    totalAnswersGiven = 0;
    start_quiz.style.opacity=1;
    start_quiz.style.pointerEvents="all";
    bg_audio.play();
    setTimeout(end_quiz,10000)
}
class Question {
    constructor(question,answers,correctIndex){
        this.question = question;
        this.answers = answers;
        this.correctIndex = correctIndex;
    }
    display(){
        question_on.innerHTML = this.question
        let i = 0;
        answers_on.forEach((el)=>{el.innerHTML = this.answers[i];i++;})
    }
}
//////////////////////////////////////////////////////
function bad_answer(button){
    button.style.backgroundColor = "red";
    button.style.transition = 0.5+"s";
}
function good_answer(button){
    button.style.backgroundColor = "green";
    button.style.transition = 0.5+"s";
}
function setToNormal(button){
    button.style.backgroundColor = "white";
    button.style.transition = 0.5+"s";
}
///////////////////////////////////////////////////////

let questions = []
function getExample(){
    let randomSign = Math.floor(Math.random()*3);
    let randomFirstNum = Math.floor(Math.random()*100);
    let randomSecondNum = Math.floor(Math.random()*100);
    let quiz = "";
    let corrAns = 0;
    if (randomSign==0){
        quiz = randomFirstNum + " + " + randomSecondNum;
        corrAns = randomFirstNum+randomSecondNum
    }
    else if (randomSign==1){
        quiz = randomFirstNum+" - "+randomSecondNum;
        corrAns = randomFirstNum-randomSecondNum
    }
    else if (randomSign==2){
        quiz = randomFirstNum+" * "+randomSecondNum;
        corrAns = randomFirstNum*randomSecondNum
    }
    return [quiz,corrAns]
}
function getCorrIndex(){
    let corrIndex = Math.floor(Math.random()*5);
    return corrIndex
}
function getNearNum(number){
    let p_m = Math.floor(Math.random()*2);
    if (p_m===1){
        return number+Math.floor(Math.random()*19)+1
    }
    else{
        return number-Math.floor(Math.random()*19)-1
    }
}
function add_question(){
    let question_cor = getExample();
    let quesTxt = question_cor[0];
    let quesAns = question_cor[1];
    let randIndex = getCorrIndex();
    let randAns = []
    for (let i = 0;i<5;i++){
        if (i===randIndex){
            randAns[i]=quesAns;
        }
        else{
            randAns[i]=getNearNum(quesAns);
        }
    }
    questions.push(new Question(quesTxt,randAns,randIndex))
}
add_question()
////////////////////////////////////////////////
function displayQuestion(){
    const currentQuestion = questions[totalAnswersGiven];
    currentQuestion.display();
}
answers_on.forEach((el,i)=>{
    el.addEventListener("click", (e)=>{
        const clickedAnswer = i;
        const currentQuestion = questions[totalAnswersGiven].correctIndex;
        if (clickedAnswer==currentQuestion) {
            good_answer(el);
            right_audio.play();
            setTimeout(setToNormal,500,el);
            totalAnswersGiven++;
            totalCorrectAnswers++;
            add_question();
            displayQuestion();
        }
        else{
            bad_answer(el);
            setTimeout(setToNormal,500,el)
            false_audio.play();
            totalAnswersGiven++;
            add_question();
            displayQuestion();
        }
    })
})