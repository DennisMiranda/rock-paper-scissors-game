const choices = ['rock', 'paper', 'scissors'];
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const playerImage = document.getElementById('player-image');
const computerImage = document.getElementById('computer-image');
let playerScore = 0;
let computerScore = 0;

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    updateImages(playerChoice, computerChoice);
    determineWinner(playerChoice, computerChoice);
}

function updateImages(playerChoice, computerChoice) {
    playerImage.src = `assets/${playerChoice}.svg`;
    computerImage.src = `assets/${computerChoice}.svg`;
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return; // Empate, no se actualiza el puntaje
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}
