// Obtain user name
const params = new URLSearchParams(window.location.search);
const userName = params.get("userName");
document.getElementById("welcome-message").textContent = `${userName}`;

// Constants and elements
const choices = ["rock", "paper", "scissors"];
const playerImageId = "player-image";
const computerImageId = "computer-image";
const defaultImageId = "rock";
const resultMessage = "result-message";
const playerScoreMessage = "player-score-message";
const computerScoreMessage = "computer-score-message";
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
let playerScore = 0;
let computerScore = 0;
let maxScore = 3;

// Player choice buttons
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");

// Set disabled buttons
const setButtonsState = (enabled) => {
  [rockButton, paperButton, scissorsButton].forEach(
    (btn) => (btn.disabled = !enabled)
  );
};

// Play Game with animations
function playGame(playerChoice) {
  const animationDuration = 1600;

  setButtonsState(false);

  updateImage(playerImageId, defaultImageId);
  updateImage(computerImageId, defaultImageId);
  // Removing text messages
  [resultMessage, playerScoreMessage, computerScoreMessage].forEach((id) =>
    updateText(id, "")
  );

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

// Compare options and determine winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    updateText(resultMessage, "Draw!");
    animateText(resultMessage);
    return;
  }

  const scoreMessage = "+1";

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    playerScoreElement.textContent = playerScore;
    updateText(playerScoreMessage, scoreMessage);
    animateText(playerScoreMessage);
  } else {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    updateText(computerScoreMessage, scoreMessage);
    animateText(computerScoreMessage);
  }

  if (playerScore >= maxScore) {
    showModal("Congratulations! You win.", "/assets/trofeo alegre.webp");
  } else if (computerScore >= maxScore) {
    showModal("Game over! You lose.", "/assets/Piñatriste.webp");
  }
}

// Show Modal for Win or Lose
function showModal(message, imageUrl) {
  const modal = new bootstrap.Modal(document.getElementById("Modal"));
  const modalMessageElement = document.getElementById("modalMessage");
  const modalImageElement = document.getElementById("modalImage");

  modalMessageElement.textContent = message;
  modalImageElement.src = imageUrl;

  modal.show();
}

// Restart game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  updateImage(playerImageId, defaultImageId);
  updateImage(computerImageId, defaultImageId);
  updateText(playerScoreMessage, "");
  updateText(computerScoreMessage, "");
}

// Images Animation
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
  document.getElementById(id).src = "/assets/" + image + ".svg";
}

// Animation Message
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
