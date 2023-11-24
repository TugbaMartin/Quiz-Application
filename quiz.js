const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results-container");
let userAnswers = [];

function buildQuiz() {
  questions.forEach(question => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${question.label}</p>`;

    if (question.type === "radio") {
      question.options.forEach(option => {
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = `question${question.id}`;
        radioInput.value = option;
        radioInput.addEventListener("change", () => handleAnswer(question.id, option));

        const label = document.createElement("label");
        label.innerText = option;

        questionElement.appendChild(radioInput);
        questionElement.appendChild(label);
      });
    } else if (question.type === "text") {
      const textInput = document.createElement("input");
      textInput.type = "text";
      textInput.addEventListener("input", event => handleAnswer(question.id, event.target.value));

      questionElement.appendChild(textInput);
    }

    quizContainer.appendChild(questionElement);
  });
}

function handleAnswer(questionId, answer) {
  const index = userAnswers.findIndex(item => item.questionId === questionId);
  if (index !== -1) {
    userAnswers[index].answer = answer;
  } else {
    userAnswers.push({ questionId, answer });
  }
}

function submitAnswers() {
  let correctCount = 0;
  resultsContainer.innerHTML = "";

  questions.forEach(question => {
    const userAnswer = userAnswers.find(item => item.questionId === question.id)?.answer;
    const isCorrect = userAnswer === question.correctAnswer;

    const resultElement = document.createElement("div");
    resultElement.innerHTML = `<p>${question.label}</p>`;
    resultElement.classList.add(isCorrect ? "correct" : "incorrect");

    resultsContainer.appendChild(resultElement);

    if (isCorrect) {
      correctCount++;
    }
  });

  resultsContainer.innerHTML += `<p>Total Correct: ${correctCount} out of ${questions.length}</p>`;
}

buildQuiz();
