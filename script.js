const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn')
const timer = document.querySelector('.timer')



//Make an array of object that stores question, choices of question and answer
const quiz = [
      {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", " let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", " It is used for comments."],
        answer: "It refers to the current object."
    }
  ];
  
  
  

//Making variable
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;


//Arrow Function to show Question
const showQuestion = () => {
  const questionDetails = quiz[currentQuestionIndex];
  //console.log(questionDetails);
  questionBox.textContent = questionDetails.question;
  
  choicesBox.textContent = "";
  for(let i=0; i<questionDetails.choices.length; i++){
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement('div');
    choiceDiv.classList.add("choice")
    choiceDiv.textContent = currentChoice;
    choicesBox.appendChild(choiceDiv);
    
    choiceDiv.addEventListener('click', () => {
      if(choiceDiv.classList.contains('selected')){
    choiceDiv.classList.remove('selected');
      }else{
    choiceDiv.classList.add('selected');
    }
    });
  }
  if(currentQuestionIndex < quiz.length){
    startTimer()
  }
}



//function to check createElementswer
const checkAnswer = () => {
  const selectedChoice = document.querySelector('.choice.selected');
  if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
    //alert("Correct Answer");
    displayAlert("Correct Answer")
    score++;
  }else{
   // alert("wrong Answer")
    displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct answer`);
  }
  timeLeft = 15;
   currentQuestionIndex++
 if(currentQuestionIndex < quiz.length){
    showQuestion();
 }else{
   showScore();
   stopTimer();
   timer.style.display = "none";
 }
}



//function to show score
const showScore = () => {
  questionBox.textContent = "" ;
  choicesBox.textContent = "" ;
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}`
  displayAlert("You have completed this quiz!🎉")
  nextBtn.textContent = "Play Again";
  quizOver = true;
}
 
 
 
// function to show alert
 const displayAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
   setTimeout(() => {
     alert.style.display = "none";
   },1000);
 }
 
 
//function to start timmer
const startTimer = () => {
  clearInterval(timerID)
 timer.textContent = timeLeft;
 
  const countDown = () => {
 timer.textContent = timeLeft;
 timeLeft--;
    if(timeLeft === 0){
      const confirmUser = confirm("Time Up!!! Do you want to play quiz again")
      if(confirmUser){
        timeLeft = 15;
        startQuiz();
      }
      else{
        startBtn.style.display = "block";
         container.style.display = "none"
         return;
      }
    }
  }
timerID = setInterval(countDown, 1000);
}
 
 //function to stop timer
 const stopTimer = () => {
   clearInterval(timerID)
 }

 
 //function to shuffle question
const shuffleQuestion = () => {
  for(let i=quiz.length-1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestion();
 }
 
  //function to start Quiz
 const startQuiz = () => {
   timeLeft = 15;
   timer.style.display = "flex";
   shuffleQuestion();
 }
 
 //Adding Event Listener to Start Button
 startBtn.addEventListener('click',() => {
 startBtn.style.display = "none";
 container.style.display = "block"
 startQuiz();
 });
 
 
// nextBtn
//showQuestion();
nextBtn.addEventListener('click', () => {
  const selectedChoice = document.querySelector('.choice.selected');
  if(!selectedChoice && nextBtn.textContent === "Next"){
    //alert("select your answer");
    displayAlert("select your answer");
    return;
  }
  if(quizOver){
    nextBtn.textContent = "Next"
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    startQuiz();
    quizOver = false;
    score = 0;
  }
  else{
  checkAnswer();
  }
});