import { confetti } from "./confetti.js";
let seconds = 60;

const createNumbersArray = (count) => {
  const numbersArray = [];
  for (let i = 0; i < count / 2; i++) {
    numbersArray.push(i + 1);
    numbersArray.push(i + 1);
  }
  console.log(count);
  return numbersArray;
};

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

const shuffle = (arr) => {
  for (let i = 0; i < arr.length; ++i) {
    let j = Math.round(Math.random() * (arr.length - 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

const gameBoard = (cards) => {
  let pairGameElement = document.getElementById("pair-game");

  for (const cardNumber of cards) {
    let card = document.createElement("div");
    pairGameElement.append(card);
    card.classList.add("flip-card");
    let innerCard = document.createElement("div");
    card.append(innerCard);
    innerCard.classList.add("flip-card-inner");
    let frontCard = document.createElement("div");
    innerCard.append(frontCard);
    frontCard.classList.add("flip-card-front");
    let backCard = document.createElement("div");
    innerCard.append(backCard);
    backCard.classList.add("flip-card-back");
    backCard.textContent = cardNumber;

    card.addEventListener("click", (e) => {
      const current = e.currentTarget;
      let flipCardsOpened = document.querySelectorAll(
        ".card-opened:not(.card-paired)"
      );
      current.classList.add("card-opened");
      if (flipCardsOpened.length === 1) {
        if (current.querySelector('.flip-card-back').textContent ===
        flipCardsOpened[0].querySelector(".flip-card-back").textContent) {
          current.classList.add("card-paired");
          flipCardsOpened[0].classList.add("card-paired");
        }
       } else if (flipCardsOpened.length === 2) {
            flipCardsOpened[0].classList.remove("card-opened");
            flipCardsOpened[1].classList.remove("card-opened");
          }
      let pairedCard = document.querySelectorAll(".card-paired");
      let flippedCard = document.querySelectorAll(".flip-card");
      if (pairedCard.length === flippedCard.length) {
        document.querySelector(".confetti-wrapper").style.display = "block";
        document.querySelector(".confetti").innerHTML = confetti;
        seconds = -1;
        const timerElement = document.getElementById("timer");
        timerElement.innerHTML = "";
      }
    });
  }

  const buttonElement = document.createElement("div");
  pairGameElement.append(buttonElement);
  buttonElement.classList.add("btn-div");
  const button = document.createElement("button");
  buttonElement.append(button);
  button.textContent = "Play again";
  button.classList.add("btn-more");

  button.addEventListener("click", function () {
    const pairGameElement = document.getElementById("pair-game");
    pairGameElement.innerHTML = "";
    const gameOver = document.getElementById("game-over");
    if (gameOver) {
      gameOver.remove();
    }
    seconds = -1;
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = "";
    document.querySelector(".confetti").innerHTML = "";
    document.querySelector(".confetti-wrapper").style.display = "none";
    createGameMenu();
  });
};

const startTimer = () => {
  const timerElement = document.getElementById("timer");
  let game = document.getElementById("game");

  const updateTimer = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (seconds === 0) {
      timerElement.textContent = `Time left: ${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
      const gameOver = document.createElement("div");
      game.append(gameOver);
      gameOver.textContent = "Gameover";
      gameOver.classList.add("game-over");
      gameOver.id = "game-over";
    } else if (seconds === -1) {
      timerElement.textContent = ``;
    } else {
      timerElement.textContent = `Time left: ${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
      seconds--;
      setTimeout(updateTimer, 1000);
    }
  }

  updateTimer();
}

const createGameMenu = () => {
  let gameMenu = document.getElementById("game-menu");

  const title = document.createElement("h2");
  gameMenu.append(title);
  title.classList.add("menu-title");
  title.textContent = "Choose complexity";
  const buttonWrap = document.createElement("div");
  gameMenu.append(buttonWrap);
  buttonWrap.classList.add("button-wrap");
  const difficultyButtonOne = document.createElement("button");
  buttonWrap.append(difficultyButtonOne);
  difficultyButtonOne.classList.add("btn-dfc");
  difficultyButtonOne.textContent = "8 cards";
  const difficultyButtonTwo = document.createElement("button");
  buttonWrap.append(difficultyButtonTwo);
  difficultyButtonTwo.classList.add("btn-dfc");
  difficultyButtonTwo.textContent = "12 cards";
  const difficultyButtonThree = document.createElement("button");
  buttonWrap.append(difficultyButtonThree);
  difficultyButtonThree.classList.add("btn-dfc");
  difficultyButtonThree.textContent = "16 cards";
  const difficultyButtonFour = document.createElement("button");
  buttonWrap.append(difficultyButtonFour);
  difficultyButtonFour.classList.add("btn-dfc");
  difficultyButtonFour.textContent = "20 cards";

  difficultyButtonOne.addEventListener("click", function () {
    const gameMenu = document.getElementById("game-menu");
    gameMenu.innerHTML = "";
    startGame(8);
  });
  difficultyButtonTwo.addEventListener("click", function () {
    const gameMenu = document.getElementById("game-menu");
    gameMenu.innerHTML = "";
    startGame(12);
  });
  difficultyButtonThree.addEventListener("click", function () {
    const gameMenu = document.getElementById("game-menu");
    gameMenu.innerHTML = "";
    startGame(16);
  });
  difficultyButtonFour.addEventListener("click", function () {
    const gameMenu = document.getElementById("game-menu");
    gameMenu.innerHTML = "";
    startGame(20);
  });
};

createGameMenu();

const startGame = (count) => {
  let cards = createNumbersArray(count);
  cards = shuffle(cards);
  gameBoard(cards);
  seconds = 60;
  startTimer();
}
