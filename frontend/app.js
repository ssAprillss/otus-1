const form = document.getElementById("survey-form");
const questionsContainer = document.getElementById("questions");
const thankYou = document.getElementById("thank-you");

function renderQuestion(question) {
  const wrapper = document.createElement("div");
  wrapper.className = "question";

  const title = document.createElement("label");
  title.className = "question-title";
  title.textContent = question.text;
  wrapper.appendChild(title);

  if (question.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.name = `question-${question.id}`;
    wrapper.appendChild(input);
  } else if (question.type === "choice") {
    question.options.forEach((option, index) => {
      const optionWrapper = document.createElement("div");
      optionWrapper.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${question.id}`;
      input.value = option;
      input.id = `question-${question.id}-${index}`;

      const label = document.createElement("label");
      label.htmlFor = input.id;
      label.textContent = option;

      optionWrapper.appendChild(input);
      optionWrapper.appendChild(label);
      wrapper.appendChild(optionWrapper);
    });
  }

  return wrapper;
}

async function loadQuestions() {
  const response = await fetch("/questions");
  const questions = await response.json();
  questions.forEach((question) => {
    questionsContainer.appendChild(renderQuestion(question));
  });
  return questions;
}

function collectAnswers(questions) {
  const formData = new FormData(form);
  return questions.map((question) => ({
    question_id: question.id,
    answer: formData.get(`question-${question.id}`) || "",
  }));
}

async function init() {
  const questions = await loadQuestions();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const answers = collectAnswers(questions);

    await fetch("/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    form.hidden = true;
    thankYou.hidden = false;
  });
}

init();
