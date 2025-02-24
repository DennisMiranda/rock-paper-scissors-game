// home //

if (document.getElementById("btn-start")) {
  const btnStart = document.getElementById("btn-start");

  btnStart.addEventListener("click", () => {
    const username = document.getElementById("username1").value.trim();
    const errorMessage = document.getElementById("error-message");

    if (username === "") {
      errorMessage.textContent = "Please enter your name ";
      errorMessage.style.display = "inline";
      return;
    }

    if (username.length < 2 || username.length > 10) {
      errorMessage.textContent =
        "El nombre debe tener entre 3 y 50 caracteres.";
      errorMessage.style.display = "inline";
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      errorMessage.textContent =
        "El nombre solo puede contener letras y espacios.";
      errorMessage.style.display = "inline";
      return;
    }

    errorMessage.style.display = "none";

    window.location.href = `../index.html?userName=${encodeURIComponent(
      username
    )}`;
  });
}

const params = new URLSearchParams(window.location.search);

const userName = params.get("userName");

if (userName) {
  document.getElementById("welcome-message").textContent = `${userName}`;
} else {
  document.getElementById("welcome-message").textContent = "invitado";
}

const choices = ["rock", "paper", "scissors"];
const playerImageId = "player-image";
const computerImageId = "computer-image";
const defaultImageId = "rock";
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
let playerScore = 0;
let computerScore = 0;
let maxScore = 3;

document
  .getElementById("rock")
  .addEventListener("click", () => playGame("rock"));
document
  .getElementById("paper")
  .addEventListener("click", () => playGame("paper"));
document
  .getElementById("scissors")
  .addEventListener("click", () => playGame("scissors"));

document
  .getElementById("btn-reset")
  .addEventListener("click", () => resetGame());
document.getElementById("btn-home").addEventListener("click", (event) => {
  window.location.href = "/pages/home.html";
});

function playGame(playerChoice) {
  const animationDuration = 1600;
  // Reset default image
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
    showModal(" victory!");
  } else if (computerScore >= maxScore) {
    showModal("COMPUTER victory!");
  }
}

function showModal(message) {
  const modal = new bootstrap.Modal(document.getElementById("winnerModal"));
  document.getElementById("winnerMessage").textContent = message;
  modal.show();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

//Images Animation
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
