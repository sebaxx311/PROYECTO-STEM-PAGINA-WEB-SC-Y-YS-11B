
"use strict";

// ================================================
// 1. SIMULADOR DE VASOPRESINA
// ================================================

const hormoneLevel = document.getElementById("hormoneLevel");
const levelValue = document.getElementById("levelValue");
const waterFill = document.getElementById("waterFill");
const simulationTitle = document.getElementById("simulationTitle");
const simulationText = document.getElementById("simulationText");
const resetSimulation = document.getElementById("resetSimulation");

function updateSimulation() {
  const level = Number(hormoneLevel.value);

  levelValue.textContent = `${level}%`;

  // El porcentaje es una representación visual conceptual.
  waterFill.style.width = `${level}%`;

  if (level < 34) {
    simulationTitle.textContent = "Señal baja";
    simulationText.textContent =
      "En este modelo, una señal baja representa menor reabsorción de agua y una tendencia a producir más orina diluida.";
  } else if (level < 67) {
    simulationTitle.textContent = "Señal intermedia";
    simulationText.textContent =
      "En este modelo, la reabsorción de agua es intermedia. El resultado real depende también de otros mecanismos corporales.";
  } else {
    simulationTitle.textContent = "Señal alta";
    simulationText.textContent =
      "En este modelo, una señal alta representa mayor reabsorción de agua y una tendencia a producir menos orina, más concentrada.";
  }
}

hormoneLevel.addEventListener("input", updateSimulation);

resetSimulation.addEventListener("click", () => {
  hormoneLevel.value = 50;
  updateSimulation();
});

updateSimulation();


// ================================================
// 2. QUIZ DE 10 PREGUNTAS
// ================================================

const questions = [
  {
    question: "¿Dónde se sintetiza principalmente la vasopresina?",
    answers: [
      "En el hipotálamo",
      "En el estómago",
      "En el páncreas",
      "En la piel"
    ],
    correct: 0,
    explanation:
      "Se sintetiza principalmente en neuronas de los núcleos supraóptico y paraventricular del hipotálamo."
  },
  {
    question: "¿Desde qué estructura se libera a la circulación sanguínea?",
    answers: [
      "La tiroides",
      "La hipófisis posterior",
      "El cerebelo",
      "El hígado"
    ],
    correct: 1,
    explanation:
      "La vasopresina se almacena y se libera desde la neurohipófisis, también llamada hipófisis posterior."
  },
  {
    question: "¿Cuál es una función principal de la vasopresina?",
    answers: [
      "Producir glóbulos rojos",
      "Digerir proteínas",
      "Favorecer la reabsorción de agua",
      "Producir insulina"
    ],
    correct: 2,
    explanation:
      "Ayuda a los riñones a reabsorber agua y, así, a regular el equilibrio de los líquidos corporales."
  },
  {
    question: "¿Qué receptor participa directamente en la reabsorción renal de agua?",
    answers: [
      "V1a",
      "V1b",
      "V3 exclusivamente",
      "V2"
    ],
    correct: 3,
    explanation:
      "El receptor V2 activa señales celulares que favorecen la incorporación de acuaporina-2."
  },
  {
    question: "¿Qué son las acuaporinas?",
    answers: [
      "Canales que permiten el paso de agua",
      "Células de la sangre",
      "Hormonas tiroideas",
      "Enzimas digestivas"
    ],
    correct: 0,
    explanation:
      "Las acuaporinas son proteínas de membrana que facilitan el movimiento del agua a través de las células."
  },
  {
    question: "¿Qué efecto puede producir la activación de receptores V1a?",
    answers: [
      "Detener toda actividad cerebral",
      "Provocar vasoconstricción",
      "Eliminar la glucosa de la sangre",
      "Destruir los nefrones"
    ],
    correct: 1,
    explanation:
      "Los receptores V1a del músculo liso vascular pueden provocar contracción de los vasos sanguíneos."
  },
  {
    question: "¿Qué ocurre en la diabetes insípida central?",
    answers: [
      "Siempre aumenta la insulina",
      "El cuerpo deja de necesitar agua",
      "Existe deficiencia de vasopresina",
      "Se produce demasiada hemoglobina"
    ],
    correct: 2,
    explanation:
      "En la forma central hay una producción o liberación insuficiente de vasopresina."
  },
  {
    question: "¿Qué sucede en la diabetes insípida nefrogénica?",
    answers: [
      "La sangre deja de circular",
      "El estómago no absorbe proteínas",
      "La hipófisis produce demasiada insulina",
      "Los riñones responden poco a la vasopresina"
    ],
    correct: 3,
    explanation:
      "En la forma nefrogénica, los riñones no responden adecuadamente a la señal antidiurética."
  },
  {
    question: "¿Qué significa hiponatremia?",
    answers: [
      "Concentración baja de sodio en la sangre",
      "Exceso de glóbulos rojos",
      "Falta de oxígeno en el aire",
      "Aumento de calcio en los huesos"
    ],
    correct: 0,
    explanation:
      "La hiponatremia es una concentración de sodio en sangre inferior al intervalo normal."
  },
  {
    question: "¿Cuál afirmación sobre la vasopresina es correcta?",
    answers: [
      "Es exactamente igual a la insulina",
      "Participa en el equilibrio hídrico y la regulación vascular",
      "Solo existe en los riñones",
      "No utiliza receptores celulares"
    ],
    correct: 1,
    explanation:
      "La vasopresina regula la conservación del agua y también puede influir en el tono de los vasos sanguíneos."
  }
];

let currentQuestion = 0;
let quizScore = 0;
let selectedAnswer = null;
let answerChecked = false;

const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const quizFeedback = document.getElementById("quizFeedback");
const checkAnswerButton = document.getElementById("checkAnswer");
const nextQuestionButton = document.getElementById("nextQuestion");
const quizResult = document.getElementById("quizResult");
const progressBar = document.getElementById("progressBar");

function renderQuestion() {
  const item = questions[currentQuestion];

  selectedAnswer = null;
  answerChecked = false;

  questionCounter.textContent =
    `Pregunta ${currentQuestion + 1} de ${questions.length}`;

  questionText.textContent = item.question;
  quizFeedback.textContent = "";
  answersContainer.innerHTML = "";
  quizResult.hidden = true;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;

    button.addEventListener("click", () => {
      if (answerChecked) return;

      selectedAnswer = index;

      answersContainer.querySelectorAll("button").forEach(option => {
        option.classList.remove("selected");
      });

      button.classList.add("selected");
      quizFeedback.textContent = "";
    });

    answersContainer.appendChild(button);
  });

  checkAnswerButton.hidden = false;
  checkAnswerButton.disabled = false;
  nextQuestionButton.hidden = true;
  nextQuestionButton.textContent =
    currentQuestion === questions.length - 1
      ? "Ver resultado"
      : "Siguiente →";
}

checkAnswerButton.addEventListener("click", () => {
  if (selectedAnswer === null || answerChecked) {
    if (selectedAnswer === null) {
      quizFeedback.textContent = "Selecciona una respuesta primero.";
    }
    return;
  }

  answerChecked = true;

  const item = questions[currentQuestion];
  const buttons = answersContainer.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === item.correct) {
      button.classList.add("correct");
    }

    if (index === selectedAnswer && index !== item.correct) {
      button.classList.add("incorrect");
    }
  });

  if (selectedAnswer === item.correct) {
    quizScore++;
    quizFeedback.textContent = `¡Correcto! ${item.explanation}`;
  } else {
    quizFeedback.textContent =
      `Respuesta incorrecta. ${item.explanation}`;
  }

  checkAnswerButton.hidden = true;
  nextQuestionButton.hidden = false;
});

nextQuestionButton.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    return;
  }

  showQuizResult();
});

function showQuizResult() {
  questionCounter.textContent = "Quiz completado";
  questionText.textContent = "¡Has terminado el desafío!";
  answersContainer.innerHTML = "";
  quizFeedback.textContent = "";
  progressBar.style.width = "100%";

  const percentage = Math.round(
    (quizScore / questions.length) * 100
  );

  let message;

  if (percentage >= 90) {
    message = "¡Excelente dominio de los conceptos!";
  } else if (percentage >= 70) {
    message = "¡Buen trabajo! Repasa los conceptos que te costaron.";
  } else if (percentage >= 50) {
    message = "Vas avanzando. Revisa las secciones y vuelve a intentarlo.";
  } else {
    message = "¡No te rindas! Explora la página y vuelve a jugar.";
  }

  quizResult.hidden = false;

  const resultTitle = document.createElement("h3");
  resultTitle.textContent = `Puntuación: ${quizScore} de ${questions.length}`;

  const resultMessage = document.createElement("p");
  resultMessage.textContent = `${percentage}% · ${message}`;

  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.className = "btn";
  retryButton.textContent = "Repetir quiz";

  retryButton.addEventListener("click", () => {
    currentQuestion = 0;
    quizScore = 0;
    renderQuestion();
  });

  quizResult.replaceChildren(resultTitle, resultMessage, retryButton);
  checkAnswerButton.hidden = true;
  nextQuestionButton.hidden = true;
}

renderQuestion();


// ================================================
// 3. VERDADERO O FALSO
// ================================================

const tfQuestions = [
  {
    statement:
      "La vasopresina se sintetiza principalmente en la hipófisis posterior.",
    answer: false,
    explanation:
      "Falso. Se sintetiza principalmente en neuronas del hipotálamo y se libera desde la hipófisis posterior."
  },
  {
    statement:
      "El receptor V2 participa en la reabsorción de agua en los riñones.",
    answer: true,
    explanation:
      "Verdadero. La activación de V2 favorece la incorporación de acuaporina-2."
  },
  {
    statement:
      "La diabetes insípida es lo mismo que la diabetes mellitus.",
    answer: false,
    explanation:
      "Falso. Son trastornos distintos, con mecanismos y criterios diagnósticos diferentes."
  },
  {
    statement:
      "La vasopresina puede influir en el tono de los vasos sanguíneos.",
    answer: true,
    explanation:
      "Verdadero. La activación de receptores V1a puede provocar vasoconstricción."
  },
  {
    statement:
      "La vasopresina fabrica agua nueva dentro del organismo.",
    answer: false,
    explanation:
      "Falso. Regula la reabsorción y la pérdida de agua, pero no crea agua."
  },
  {
    statement:
      "La actividad antidiurética excesiva puede contribuir a la hiponatremia.",
    answer: true,
    explanation:
      "Verdadero. La retención excesiva de agua puede diluir el sodio sanguíneo."
  }
];

let tfIndex = 0;
let tfScore = 0;
let tfAnswered = false;

const tfStatement = document.getElementById("tfStatement");
const tfFeedback = document.getElementById("tfFeedback");
const tfScoreDisplay = document.getElementById("tfScore");
const nextTFButton = document.getElementById("nextTF");
const tfButtons = document.querySelectorAll(".tf-button");

function renderTFQuestion() {
  const item = tfQuestions[tfIndex];

  tfStatement.textContent = item.statement;
  tfFeedback.textContent = "";
  nextTFButton.hidden = true;
  tfAnswered = false;

  tfButtons.forEach(button => {
    button.disabled = false;
  });
}

tfButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (tfAnswered) return;

    tfAnswered = true;

    const userAnswer = button.dataset.answer === "true";
    const item = tfQuestions[tfIndex];

    if (userAnswer === item.answer) {
      tfScore++;
      tfFeedback.textContent = `¡Correcto! ${item.explanation}`;
    } else {
      tfFeedback.textContent = `No exactamente. ${item.explanation}`;
    }

    tfScoreDisplay.textContent =
      `Puntuación: ${tfScore} de ${tfIndex + 1}`;

    tfButtons.forEach(option => {
      option.disabled = true;
    });

    nextTFButton.hidden = false;
    nextTFButton.textContent =
      tfIndex === tfQuestions.length - 1
        ? "Reiniciar juego ↻"
        : "Siguiente afirmación →";
  });
});

nextTFButton.addEventListener("click", () => {
  if (tfIndex < tfQuestions.length - 1) {
    tfIndex++;
  } else {
    tfIndex = 0;
    tfScore = 0;
    tfScoreDisplay.textContent = "Puntuación: 0";
  }

  renderTFQuestion();
});

renderTFQuestion();


// ================================================
// 4. JUEGO DE MEMORIA: ENCUENTRA LAS PAREJAS
// ================================================

const memoryPairs = [
  { id: "hypothalamus", text: "Hipotálamo" },
  { id: "hypothalamus", text: "Sintetiza vasopresina" },

  { id: "posterior", text: "Hipófisis posterior" },
  { id: "posterior", text: "Almacena y libera la hormona" },

  { id: "v2", text: "Receptor V2" },
  { id: "v2", text: "Favorece la reabsorción de agua" },

  { id: "v1a", text: "Receptor V1a" },
  { id: "v1a", text: "Puede causar vasoconstricción" }
];

const memoryBoard = document.getElementById("memoryBoard");
const memoryStatus = document.getElementById("memoryStatus");
const restartMemory = document.getElementById("restartMemory");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let memoryMoves = 0;

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function createMemoryGame() {
  memoryBoard.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  memoryMoves = 0;

  memoryStatus.textContent = "Encuentra las 4 parejas.";

  shuffle(memoryPairs).forEach((item, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "memory-card";
    button.textContent = "?";
    button.dataset.id = item.id;
    button.dataset.text = item.text;
    button.dataset.index = String(index);
    button.setAttribute("aria-label", "Carta oculta");

    button.addEventListener("click", () => {
      revealCard(button);
    });

    memoryBoard.appendChild(button);
  });
}

function revealCard(card) {
  if (
    lockBoard ||
    card.classList.contains("revealed") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("revealed");
  card.textContent = card.dataset.text;
  card.setAttribute("aria-label", card.dataset.text);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  memoryMoves++;

  const isMatch =
    firstCard.dataset.id === secondCard.dataset.id &&
    firstCard.dataset.index !== secondCard.dataset.index;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.disabled = true;
    secondCard.disabled = true;

    matchedPairs++;
    memoryStatus.textContent =
      `¡Pareja encontrada! Parejas: ${matchedPairs} de 4. Movimientos: ${memoryMoves}.`;

    firstCard = null;
    secondCard = null;

    if (matchedPairs === 4) {
      memoryStatus.textContent =
        `¡Ganaste! Encontraste las 4 parejas en ${memoryMoves} movimientos.`;
    }

    return;
  }

  lockBoard = true;

  memoryStatus.textContent =
    "No coinciden. Intenta recordar las cartas.";

  // Se ocultan las cartas después de una pausa breve.
  window.setTimeout(() => {
    [firstCard, secondCard].forEach(item => {
      item.classList.remove("revealed");
      item.textContent = "?";
      item.setAttribute("aria-label", "Carta oculta");
    });

    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }, 1000);
}

restartMemory.addEventListener("click", createMemoryGame);

createMemoryGame();
