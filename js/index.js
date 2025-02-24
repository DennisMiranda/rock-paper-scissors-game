// home //
if (document.getElementById("btn-start")) {
  const btnStart = document.getElementById("btn-start");
  const usernameInput = document.getElementById("username1");
  const errorMessage = document.getElementById("error-message");

  const validateAndRedirect = () => {
    const username = usernameInput.value.trim();

    if (username === "") {
      errorMessage.textContent = "Please enter your name";
      errorMessage.style.display = "inline";
      return;
    }

    if (username.length < 2 || username.length > 10) {
      errorMessage.textContent = "El nombre debe tener entre 3 y 10 caracteres.";
      errorMessage.style.display = "inline";
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      errorMessage.textContent = "El nombre solo puede contener letras y espacios.";
      errorMessage.style.display = "inline";
      return;
    }

    errorMessage.style.display = "none";

    window.location.href = `../index.html?userName=${encodeURIComponent(username)}`;
  };

  btnStart.addEventListener("click", validateAndRedirect);

  usernameInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      validateAndRedirect();
    }
  });
}

const params = new URLSearchParams(window.location.search);
const userName = params.get("userName");
document.getElementById("welcome-message").textContent = `${userName}`;


const choices = ["rock", "paper", "scissors"];
const playerImageId = "player-image";
const computerImageId = "computer-image";
const defaultImageId = "rock";
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
let playerScore = 0;
let computerScore = 0;
let maxScore = 3;

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

const setButtonsState = (enabled) => {
  rockButton.disabled = !enabled;
  paperButton.disabled = !enabled;
  scissorsButton.disabled = !enabled;
};

rockButton.addEventListener("click", () => playGame("rock"));
paperButton.addEventListener("click", () => playGame("paper"));
scissorsButton.addEventListener("click", () => playGame("scissors"));
document.getElementById("btn-reset").addEventListener("click", () => resetGame());
document.getElementById("btn-home").addEventListener("click", (event) => {
  window.location.href = "/pages/home.html";
});

function playGame(playerChoice) {
  const animationDuration = 1600;

  setButtonsState(false);

  updateImage(playerImageId, defaultImageId);
  updateImage(computerImageId, defaultImageId);
  updateText("result-message", "");

  animateImage(playerImageId, false);
  animateImage(computerImageId, true);

  setTimeout(() => {
    desanimateImage(playerImageId);
    desanimateImage(computerImageId);

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    updateImage(playerImageId, playerChoice);
    updateImage(computerImageId, computerChoice);

    determineWinner(playerChoice, computerChoice);

    setButtonsState(true);
  }, animationDuration);
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    updateText("result-message", "Draw!");
    animateText("result-message");
    return;
  }

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    playerScoreElement.textContent = playerScore;
  } else {
    computerScore++;
    computerScoreElement.textContent = computerScore;
  }

  if (playerScore >= maxScore) {
    showModal("¡Congratulations! You are the winner.", "/assets/trofeo alegre.webp");
  } else if (computerScore >= maxScore) {
    showModal("¡Game over! You are lose the game.", "/assets/Piñatriste.webp");
  }
}

function showModal(message, imageUrl) {
  const modal = new bootstrap.Modal(document.getElementById("winnerModal"));
  const winnerMessageElement = document.getElementById("winnerMessage");
  const winnerImageElement = document.getElementById("winnerImage");

  winnerMessageElement.textContent = message;
  winnerImageElement.src = imageUrl;

  modal.show();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

// Animación de imágenes
function animateImage(id, isInverted) {
  const duration = 1600;
  const animation = [
    { transform: "translateY(0)" },
    { transform: "translateY(-30px)" },
    { transform: "translateY(30px)" },
    { transform: "translateY(-30px)" },
    { transform: "translateY(30px)" },
    { transform: "translateY(-30px)" },
    { transform: "translateY(0)" },
  ];

  if (isInverted) {
    animation.forEach((frame) => {
      frame.transform = frame.transform + " scaleX(-1)";
    });
  }

  document.getElementById(id).animate(animation, duration);
}

function desanimateImage(id) {
  document.getElementById(id).style.animation = "none";
}

function updateImage(id, image) {
  document.getElementById(id).src = "assets/" + image + ".svg";
}

//Result Message
function animateText(id) {
  const duration = 1000;
  const animation = [
    { opacity: 0, transform: "translateY(5px)" },
    { opacity: 1, transform: "translateY(-30px)" },
  ];
  document
    .getElementById(id)
    .animate(animation, { duration, fill: "forwards" });
}

function updateText(id, text) {
  const element = document.getElementById(id);
  element.innerText = text;
}

