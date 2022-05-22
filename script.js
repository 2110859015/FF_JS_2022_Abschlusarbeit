let questionCounter = 0;
let userAnswer;
let corrAnswer;
let questions = [
  {
    question: "Wieviel ist 2 * 5?",
    choices: [2, 5, 10, 15],
    correct: 3
  },
  {
    question: "Wieviele Monde hat die Erde?",
    choices: [1, 2, 5, 134],
    correct: 1
  },
  {
    question: "Wieviele Einwohner hat Österreich",
    choices: [2000000, 150, 10, 450000],
    correct: 1
  },
  {
    question: "Wie lange in Centimetern(cm) ist der Rüssel eines Elefanten",
    choices: [100, 80, 200, 150],
    correct: 4
  },
  {
    question: "Wie viele Stunden Gehzeit benötigt man von Wien nach Eisenstadt",
    choices: [25, 5, 11, 40],
    correct: 3
  }

];

const questionObj = JSON.parse(JSON.stringify(questions));

$(document).ready(function () {
  showQuestion(questionCounter);
  $(document).on('change', 'input[type=radio][name=answer]', function () {
    userAnswer = $("input[name='answer']:checked").val();
  });

  $(document).on('click', '#next', function () {
    corrAnswer = correctAnswer(questionCounter);
    let isAnswered = false;
    if (userAnswer == undefined) {
      displayAnswerNotSet();
    } else if (userAnswer == corrAnswer) {
      displayAnswerCorrect();
      isAnswered = true;
    } else {
      displayWrongAnswer();
    }

    if (isAnswered) {
      delay();
      isAnswered = false;
      userAnswer = undefined;
      questionCounter = nextQuestion(questionCounter);
    }
  });

  $(document).on('click', '#start', function () {
    let decision = confirm("Wollen Sie das Quiz wirklich neustarten?\nIhr Fortschritt geht verloren.");
    if (decision) {
      location.reload(true);
      questionCounter = 0;
      showQuestion(questionCounter);
    }
  });
});

/**
 * 
 * @param {int} questionCounter 
 * @returns the correct answer to the question
 */
function correctAnswer(questionCounter) {
  let corrAnswer = questionObj[questionCounter].choices[questionObj[questionCounter].correct - 1]
  //console.log(corrAnswer);
  return corrAnswer;
}

/**
 * shows the question including possible answers on the webpage
 * @param {int} questionCounter 
 */
function showQuestion(questionCounter) {
  $("#questionCount").text("Frage " + (questionCounter + 1));
  $("#question").text(questionObj[questionCounter].question);
  let answerCount = 0;
  $("label").each(function () {
    //console.log(this);
    $(this).text(questionObj[questionCounter].choices[answerCount]);
    answerCount++;
  });
  answerCount = 0;
  $("input").each(function () {
    //console.log(this);
    $(this).val(questionObj[questionCounter].choices[answerCount]);
    $(this).prop('checked', false);
    answerCount++;
  });
}

/**
 * Logic for changing to the next question
 * @param {int} questionCounter 
 * @returns next div for question
 */
function nextQuestion(questionCounter) {
  if (questionCounter < questions.length - 1) {
    questionCounter++;
    showQuestion(questionCounter);
    return questionCounter;
  } else {
    //console.log("Letzte Frage erreicht...")
    $("#questionCount").text("Quiz abgeschlossen!");
    $("#quiz").html(
      '<p> Sie haben das Quiz erfolgreich absolviert. </p>' +
      '<p> Um das Quiz erneut zu starten, klicken Sie bitte auf den Button "Quiz erneut starten" </p> <br>' +
      '<button class="btn btn-primary" id="start"> Quiz erneut starten</button>'
    );
    //return questionCounter;
  }
}

/**
 * Wait 2 seconds before element vanishes
 */
async function delay() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  $("#status").html(
    ''
  );
}

/**
 * Display information for a correct answer
 */
function displayAnswerCorrect() {
  $("#status").html(
    '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
    '<strong>Glückwunsch!</strong> die Antwort ist korrekt!' +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
    '</div>'
  );
}

/**
 * Display information for a not set answer
 */
function displayAnswerNotSet() {
  $("#status").html(
    '<div class="alert alert-warning alert-dismissible fade show" role="alert">' +
    '<strong>Achtung!</strong> Bitte wählen Sie eine Antwort aus.' +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
    '</div>'
  );
}

/**
 * Display information for a wrong answer
 */
function displayWrongAnswer() {
  $("#status").html(
    '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
    '<strong>Leider nein!</strong> die Antwort ist falsch!' +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
    '</div>'
  );
}
