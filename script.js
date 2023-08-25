const cards = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
let flippedCards = [];
let matches = 0;
let isFlipping = false;
let timerInterval;
let remainingTime;

const board = document.getElementById("board");
const timer = document.getElementById("timer");
const timeDisplay = document.getElementById("time");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame(time) {
    clearInterval(timerInterval);
    remainingTime = time;
    timerInterval = setInterval(updateTimer, 1000);
    shuffleArray(cards);
    createBoard();
}

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.index = i;
        card.textContent = cards[i];
        card.addEventListener("click", handleCardClick);
        board.appendChild(card);
    }
}

function handleCardClick() {
    if (isFlipping || flippedCards.includes(this)) {
        return;
    }

    flipCard(this);

    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkForMatch, 1000);
    }
}

function flipCard(card) {
    card.classList.add("flipped");
    flippedCards.push(card);
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        matches++;
        if (matches === cards.length / 2) {
            clearInterval(timerInterval);
            alert("Parabéns! Você venceu!");
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }
    flippedCards = [];
    isFlipping = false;
}

function updateTimer() {
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        alert("Tempo esgotado! Tente novamente.");
    } else {
        remainingTime--;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
}
