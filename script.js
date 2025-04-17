 const quizData = [

  {
    "question": "What is the capital of Karnataka?",
    "a": "Mysuru",
    "b": "Mangalore",
    "c": "Hubli",
    "d": "Bengaluru",
    "correct": "d",
    "explanation": "Bengaluru, also known as Bangalore, is the capital of Karnataka."
  },
  {
    "question": "Which classical dance form originated in Karnataka?",
    "a": "Bharatanatyam",
    "b": "Kuchipudi",
    "c": "Yakshagana",
    "d": "Kathak",
    "correct": "c",
    "explanation": "Yakshagana is a traditional theatre form that combines dance, music, and dialogue, and it originated in Karnataka."
  },
  {
    "question": "Which is the longest river flowing through Karnataka?",
    "a": "Kaveri",
    "b": "Krishna",
    "c": "Tungabhadra",
    "d": "Sharavathi",
    "correct": "b",
    "explanation": "The Krishna River is the longest river flowing through Karnataka."
  },
  {
    "question": "Who was the founder of the Vijayanagara Empire?",
    "a": "Krishnadevaraya",
    "b": "Harihara I",
    "c": "Rajendra Chola",
    "d": "Tipu Sultan",
    "correct": "b",
    "explanation": "Harihara I was one of the founders of the Vijayanagara Empire in the 14th century."
  },
  {
    "question": "Which city is known as the 'Sandalwood City' of Karnataka?",
    "a": "Mysuru",
    "b": "Shivamogga",
    "c": "Hassan",
    "d": "Belagavi",
    "correct": "a",
    "explanation": "Mysuru is famously known as the 'Sandalwood City' for its sandalwood products and cultural heritage."
  },
  {
    "question": "Which sportsperson from Karnataka is associated with badminton?",
    "a": "Anil Kumble",
    "b": "Rahul Dravid",
    "c": "Prakash Padukone",
    "d": "Vinesh Phogat",
    "correct": "c",
    "explanation": "Prakash Padukone is a renowned badminton player from Karnataka."
  },
  {
  "question": "What is the classical dance form of Karnataka?",
  "a": "Bharatanatyam",
  "b": "Kathak",
  "c": "Yakshagana",
  "d": "Mohiniyattam",
  "correct": "c",
  "explanation": "Yakshagana is a traditional theatre form combining dance, music, and dialogue popular in coastal Karnataka."
},
{
  "question": "Which festival is famously celebrated in Mysore with grandeur?",
  "a": "Diwali",
  "b": "Dasara",
  "c": "Ugadi",
  "d": "Holi",
  "correct": "b",
  "explanation": "Mysore Dasara is a famous state festival celebrated with royal processions and cultural events."
},
{
  "question": "Which is the highest peak in Karnataka?",
  "a": "Kudremukh",
  "b": "Mullayanagiri",
  "c": "Baba Budangiri",
  "d": "Pushpagiri",
  "correct": "b",
  "explanation": "Mullayanagiri in Chikmagalur is the highest peak in Karnataka, standing at 1,930 meters."
}
];


  let currentQuiz = 0;
  let score = 0;
  let timeLeft = 15;
  let timerInterval;
  
  const startBtn = document.getElementById("startBtn");
  const quizContent = document.getElementById("quizContent");
  const questionEl = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const resultEl = document.getElementById("result");
  const explanationEl = document.getElementById("explanation");
  const timerEl = document.getElementById("timer");
  const timerBarFill = document.getElementById("timerBarFill");
  const progressBar = document.getElementById("progressBar");
  const submitBtn = document.getElementById("submitBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    quizContent.style.display = "block";
    loadQuiz();
  });
  
  submitBtn.addEventListener("click", submitAnswer);
  nextBtn.addEventListener("click", nextQuestion);
  
  function loadQuiz() {
    deselectAnswers();
    explanationEl.innerText = "";
    resultEl.innerText = "";
  
    const current = quizData[currentQuiz];
    questionEl.innerText = current.question;
    a_text.innerText = current.a;
    b_text.innerText = current.b;
    c_text.innerText = current.c;
    d_text.innerText = current.d;
  
    document.querySelectorAll(".option").forEach(opt => {
      opt.style.backgroundColor = "#f2f2f2";
      opt.querySelector("input").disabled = false;
    });
  
    updateProgressBar();
    resetTimer();
  
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
  }
  
  function updateProgressBar() {
    const percentage = (currentQuiz / quizData.length) * 100;
    progressBar.style.width = `${percentage}%`;
  }
  
  function startTimer() {
    timeLeft = 15;
    timerEl.innerText = timeLeft;
    timerBarFill.style.animation = "none";
    void timerBarFill.offsetWidth;
    timerBarFill.style.animation = "countdown 15s linear forwards";
  
    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        submitAnswer();
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
  }
  
  function getSelected() {
    const answers = document.getElementsByName("answer");
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
        return answers[i].value;
      }
    }
    return null;
  }
  
  function deselectAnswers() {
    const answers = document.getElementsByName("answer");
    answers.forEach((answer) => (answer.checked = false));
  }
  
  function disableOptions() {
    const answers = document.getElementsByName("answer");
    answers.forEach(answer => answer.disabled = true);
  }
  
  function submitAnswer() {
    clearInterval(timerInterval);
  
    const selected = getSelected();
    const current = quizData[currentQuiz];
  
    if (selected === current.correct) {
      score++;
    }
  
    explanationEl.innerText = `✅
 ${current.explanation}`;
  
    const answers = document.getElementsByName("answer");
    answers.forEach((answer) => {
      const parent = answer.parentElement;
      if (answer.value === current.correct) {
        parent.style.backgroundColor = '#d4edda';
      } else if (answer.checked && answer.value !== current.correct) {
        parent.style.backgroundColor = '#f8d7da';
      }
      answer.disabled = true;
    });
  
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
  }
  
  function nextQuestion() {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      finishQuiz();
    }
  }
  
  function finishQuiz() {
    questionEl.innerText = "🎉Quiz Completed!";
    document.querySelector(".timer").style.display = "none";
    document.querySelector(".timer-bar").style.display = "none";
    document.querySelector(".progress").style.display = "none";
    document.querySelectorAll(".option").forEach(el => el.style.display = "none");
    submitBtn.style.display = "none";
    nextBtn.innerText = "Restart Quiz";
    nextBtn.style.display = "block";
    explanationEl.innerText = "";
    resultEl.innerText = `You scored ${score} out of ${quizData.length}`;
    nextBtn.onclick = () => {
      currentQuiz = 0;
      score = 0;
      document.querySelector(".timer").style.display = "block";
      document.querySelector(".timer-bar").style.display = "block";
      document.querySelector(".progress").style.display = "block";
      document.querySelectorAll(".option").forEach(el => el.style.display = "flex");
      nextBtn.innerText = "Next Question";
      nextBtn.onclick = nextQuestion;
      loadQuiz();
    };
  }
