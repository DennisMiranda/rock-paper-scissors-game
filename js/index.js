const choices = ['rock', 'paper', 'scissors'];
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const playerImage = document.getElementById('player-image');
const computerImage = document.getElementById('computer-image');
let playerScore = 0;
let computerScore = 0;
let maxScore = 3;

document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));

document.getElementById('btn-reset').addEventListener('click',() => resetGame());
document.getElementById('btn-home').addEventListener('click', (event) => {
    window.location.href = '#'
});

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    determineWinner(playerChoice, computerChoice);
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return; 
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

    if (playerScore >= maxScore) {
        showModal('HUMAN victory!'); 
    }else if (computerScore >= maxScore){
        showModal('COMPUTER victory!');
    }   
}

function showModal(message) {
        const modal = new bootstrap.Modal(document.getElementById('winnerModal'));
        document.getElementById('winnerMessage').textContent = message;
        modal.show();
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}