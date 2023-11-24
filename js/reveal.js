const animals = {
  lion: ['second.png', 'lion_1.png', 'lion_2.png', 'lion_3.png'],
  cat : ['second.png', 'cat_1.png', 'cat_2.png'],
  dog : ['second.png', 'dog_1.png', 'dog_2.png',],
};

let answer = '';
let maxWrong = 6;
let correct = 0;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  const animalKeys = Object.keys(animals);
  answer = animalKeys[Math.floor(Math.random() * animalKeys.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
    updateHangmanPicture();
    correct++;
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
  }
}

function updateHangmanPicture() {
  const imageArray = animals[answer];
  if (correct < imageArray.length) {
    document.getElementById('hangmanPic').src = './images/' + imageArray[correct];
  }
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    document.getElementById('hangmanPic').src = './images/loss.png';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  correct = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/index.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
