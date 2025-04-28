const quizData = [
    {
      question: "What is the capital of India?",
      options: ["New Delhi", "Mumbai", "Ahmedabad", "Chennai"],
      correct: "New Delhi"
    },
    {
      question: "Who is the Prime Minister of India?",
      options: ["Amit Shah", "Ajit Doval", "Narendra Modi", "Yogi Adityanath"],
      correct: "Narendra Modi"
    },
    {
      question: "Which is the largest state of India(area wise)?",
      options: ["Uttar Pradesh", "Rajasthan", "Madhya Pradesh", "Maharashtra"],
      correct: "Rajasthan"
    },
    {
        question: "What is the national animal of India?",
        options: ["Elephant", "Lion", "Tiger", "Leopard"],
        correct: "Tiger"
    },
    {
        question: "In which year did India gain independance?",
        options: ["1947", "1945", "1950", "1952"],
        correct: "1947"
    },
    {
        question: "Which monument in India is one of the New Seven Wonders of the World?",
        options: ["India Gate", "Taj Mahal", "Qutub Minar", "Gateway of India"],
        correct: "Taj Mahal"
      }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const playBtn = document.getElementById('play');
  const quizEl = document.getElementById('quiz');
  const container=document.getElementById('q-cont');
  const quote=document.getElementById('info-disp');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const submitBtn = document.getElementById('submit');
  const feedbackEl = document.getElementById('feedback');
  const progressEl = document.getElementById('progress');
  const restartBtn = document.getElementById('restart');
  
  playBtn.addEventListener('click', () => {
    playBtn.style.display = 'none'; 
    quote.style.display='none';
    quizEl.style.display = 'block'; 
    container.style.display='block';
    loadQuestion();
  });
  
  function loadQuestion() {
    feedbackEl.textContent = '';
    const currentData = quizData[currentQuestionIndex];
    questionEl.textContent = currentData.question;
    optionsEl.innerHTML = '';
  
    currentData.options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('option');
      button.textContent = option;
      button.onclick = selectOption;
      optionsEl.appendChild(button);
    });
  
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  }
  
  function selectOption(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = quizData[currentQuestionIndex].correct;
  
    if (selectedOption === correctAnswer) {
      feedbackEl.textContent = " 😊 Correct!";
      feedbackEl.style.color = "#00FF00";
      score++;
    } else {
      feedbackEl.textContent = ` 😢 Wrong! Correct Answer: ${correctAnswer}`;
      feedbackEl.style.color = "#FF1744";
    }
  
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(btn => btn.disabled = true);
  }
  
  submitBtn.addEventListener('click', () => {
    const allOptions = document.querySelectorAll('.option');
    const anySelected = [...allOptions].some(btn => btn.disabled);
  
    if (!anySelected) {
      alert('Please select an option first!');
      return;
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    questionEl.textContent = ` 📊 You scored ${score} out of ${quizData.length}!`;
    optionsEl.innerHTML = '';
    submitBtn.style.display = 'none';
    feedbackEl.textContent = '';
    progressEl.textContent = 'Quiz Completed!';
    restartBtn.style.display = 'inline-block';
  }
  
  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    submitBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    loadQuestion();
  });
  
