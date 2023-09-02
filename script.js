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

    const buttons = document.querySelectorAll('.difficulty button');
    buttons.forEach(button => {
        button.classList.add('hide');
    });

    // const header = document.querySelector('header');
    // header.classList.add('hide');
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
        if (cardImageFront.classList.contains('flipped'))
            cardImageFront.classList.remove('flipped');
        else
            cardImageFront.classList.add('flipped');

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            isFlipping = true;
            setTimeout(checkForMatch, 1000);
        }
    }
}
//ACHO QUE SEJA ESTA LINHA DE CODIGO ABAIXO QUE ESTÁ COM O PROBLEMA DO BUG DE TRAVAR QUANDO ENCONTRA PAR IGUAIS
function checkForMatch() {
    console.log(flippedCards)
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const cardImage1 = card1.getElementsByTagName('img')[0];
        const cardImage2 = card2.getElementsByTagName('img')[0];
//Ele no console apresenta esse erro abaixo quando vira as cartas. 
        if (!cardImage1 || !cardImage2) {
            console.error("Erro: As imagens das cartas não foram encontradas.");
            return;
        }

        const src1 = cardImage1.src;
        const src2 = cardImage2.src;
        console.log(src1, src2)

        if (src1 === src2) {
            flippedCards = [];
            isFlipping = false;
            matches++;
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                cardImage1.classList.remove("flipped");
                cardImage2.classList.remove("flipped");
                flippedCards = [];
                isFlipping = false;
            }, 1000);
        }

        if (matches === cards.length / 2) {
            clearInterval(timerInterval);
            showCustomDialog("Parabéns! Você venceu!");
        }
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

function hideHeaderWithAnimation() {
    const header = document.getElementById("header");
    header.style.animation = "disappear 1s ease-in-out";
    setTimeout(() => {
        header.style.display = "none";
    }, 1000);
}

function startGameWithAnimation(time) {
    hideHeaderWithAnimation();
    setTimeout(() => {
        startGame(time);
    }, 1000); 
}
