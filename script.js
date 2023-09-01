const cards = [
    "assets/c1.jpg",
    "assets/c2.jpg",
    "assets/c3.jpg",
    "assets/c4.jpg",
    "assets/c5.jpg",
    "assets/c6.jpg",
    "assets/c1.jpg",
    "assets/c2.jpg",
    "assets/c3.jpg",
    "assets/c4.jpg",
    "assets/c5.jpg",
    "assets/c6.jpg"
];

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

        card.addEventListener("click", handleCardClick);

        const cardImageFront = document.createElement("img");
        cardImageFront.src = cards[i]; 
        cardImageFront.alt = "Card Front";
        cardImageFront.classList.add("card-front");
        card.appendChild(cardImageFront);

        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        const cardImageBack = document.createElement("img");
        cardImageBack.src = "assets/c-back.jpg";
        cardImageBack.alt = "Card Back";
        cardBack.appendChild(cardImageBack);
        card.appendChild(cardBack);

        board.appendChild(card);
    }
    console.log("Tabuleiro criado com sucesso.");
}

function handleCardClick() {
    if (isFlipping || flippedCards.includes(this) || flippedCards.length === 2) {
        return;
    }
    console.log("Clique na carta.");
    flipCard(this);

    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkForMatch, 1000);
    }
}

function flipCard(card) {
    if (!card.classList.contains("flipped") && flippedCards.length < 2) {
        card.classList.add("flipped");
        console.log("Carta virada.");

        const cardImageFront = card.querySelector(".card-front");
        const cardImageBack = card.querySelector(".card-back");

        if (cardImageFront.style.display === "none") {
            cardImageFront.style.display = "block"; 
            cardImageBack.style.display = "none";   
        } else {
            cardImageFront.style.display = "none";   
            cardImageBack.style.display = "block";   
        }

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            isFlipping = true;
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const cardImage1 = card1.querySelector("img");
    const cardImage2 = card2.querySelector("img");
    console.log("Verificando se há correspondência.");

    if (cardImage1.src === cardImage2.src) {
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        matches++;

        if (matches === cards.length / 2) {
            clearInterval(timerInterval);
            showCustomDialog("Parabéns! Você venceu!");
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            cardImage1.style.display = "none";
            cardImage2.style.display = "none";
            flippedCards = [];
            isFlipping = false;
        }, 1000);
    }
}

function updateTimer() {
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        showCustomDialog("Tempo esgotado! Tente novamente.");
    } else {
        remainingTime--;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
}

function showCustomDialog(message) {
    const dialogContainer = document.createElement("div");
    dialogContainer.classList.add("custom-dialog");
    
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("custom-dialog-content");
    dialogContent.textContent = message;
    
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fechar";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(dialogContainer);
        location.reload(); 
    });
    
    dialogContent.appendChild(closeButton);
    dialogContainer.appendChild(dialogContent);
    document.body.appendChild(dialogContainer);
}


