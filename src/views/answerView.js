/**
 * Create an Answer element
 * @returns {Element}
 */
import { quizData } from '../data.js';
import {
  correctAnswersResults,
  scoreRealTimeUpdate,
} from '../pages/questionPage.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';

export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  const answerButton = document.createElement('button');

  element.appendChild(answerButton);
  answerButton.innerHTML = String.raw`
    ${key}) ${answerText}
  `;
  answerButton.classList.add('btn');
  answerButton.classList.add('answer-btn');
  answerButton.setAttribute('data-index-answer', key);
  answerButton.onclick = selectAnswer;

  return element;
};

const selectAnswer = (e) => {
  const selectedButton = e.target;
  const isAnswerCorrect =
    selectedButton.dataset.indexAnswer ===
    quizData.questions[quizData.currentQuestionIndex].correct;

  quizData.questions[quizData.currentQuestionIndex].selected =
    selectedButton.dataset.indexAnswer;

  document.getElementById(SKIP_QUESTION_BUTTON_ID).disabled = true;

  if (quizData.questions[quizData.currentQuestionIndex].selected) {
    Array.from(document.querySelectorAll('#answers-list li button')).forEach(
      (b) => {
        b.disabled = true;
      }
    );
  }

  if (isAnswerCorrect) {
    changeBtnColor(selectedButton, 'correct-answer');
    quizData.score += 10;
    scoreRealTimeUpdate();
    quizData.correctAnswers++;
    correctAnswersResults();
  } else {
    changeBtnColor(selectedButton, 'wrong-answer');
  }
};

const changeBtnColor = (button, colorClass) => {
  resetAnswerColorClasses();
  button.classList.add(colorClass);
};

const resetAnswerColorClasses = () => {
  Array.from(document.querySelectorAll('#answers-list li button')).forEach(
    (b) => {
      b.classList.remove('correct-answer');
      b.classList.remove('wrong-answer');
      if (
        b.dataset.indexAnswer ===
        quizData.questions[quizData.currentQuestionIndex].correct
      ) {
        setTimeout(() => {
          b.classList.add('correct-answer');
        }, 500);
      }
    }
  );
};
