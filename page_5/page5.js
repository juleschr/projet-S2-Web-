// Champs du formulaire
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const message = document.getElementById("message");

// Zones d’erreur associées aux champs
const errName = document.getElementById("errName");
const errEmail = document.getElementById("errEmail");
const errMessage = document.getElementById("errMessage");

// Éléments de contrôle global
const sendBtn = document.getElementById("sendBtn");
const form = document.getElementById("contactForm");
const gameZone = document.getElementById("gameZone");

// Vérifie que le champ contient au moins deux mots séparé d'un espace
function checkName() {
    if (fullname.value.trim().includes(" ")) {
        errName.textContent = "";
        return true;
    }
    errName.textContent = "Format attendu : Prénom Nom";
    return false;
}

// Validation de l’email 
function checkEmail() {
    if (email.value.includes("@") && email.value.includes(".")) {
        errEmail.textContent = "";
        return true;
    }
    errEmail.textContent = "Email invalide";
    return false;
}

// Message obligatoire avec une longueur minimale
function checkMessage() {
    if (message.value.length >= 20) {
        errMessage.textContent = "";
        return true;
    }
    errMessage.textContent = "Message trop court";
    return false;
}

// Active / désactive le bouton 
function updateButton() {
    sendBtn.disabled = !(checkName() && checkEmail() && checkMessage());
}

// Validation en temps réel
fullname.addEventListener("input", updateButton);
email.addEventListener("input", updateButton);
message.addEventListener("input", updateButton);

// Soumission du formulaire : transition vers le jeu
form.addEventListener("submit", function (e) {
    e.preventDefault();             // empêche l’envoi classique
    form.style.display = "none";    // masque le formulaire
    gameZone.style.display = "block"; // affiche le jeu
    startGame();                    // lance le Blackjack
});

// BLACKJACK
// Ensembles de cartes
const suits = ["Pique", "Coeur", "Trèfle", "Carreau"];
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

// État du jeu
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;

// Éléments d’affichage
const dealerDiv = document.getElementById("dealer-hand");
const playerDiv = document.getElementById("player-hand");
const dealerScore = document.getElementById("dealer-score");
const playerScore = document.getElementById("player-score");
const statusText = document.getElementById("status");

// Génère et mélange le paquet
function createDeck() {
    deck = [];
    for (let s of suits) {
        for (let v of values) {
            deck.push({ value: v, suit: s });
        }
    }
    deck.sort(() => Math.random() - 0.5);
}

// Valeur logique d’une carte
function cardValue(card) {
    if (card.value === "A") return 11;
    if (["J","Q","K"].includes(card.value)) return 10;
    return parseInt(card.value);
}

// Calcul du score
function calculateScore(hand) {
    let total = 0;
    let aces = 0;

    for (let c of hand) {
        total += cardValue(c);
        if (c.value === "A") aces++;
    }

    // Réduction des As si dépassement
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }
    return total;
}

// Affichage des cartes
function displayHands(showDealer) {
    dealerDiv.innerHTML = "";
    playerDiv.innerHTML = "";

    // Croupier
    for (let i = 0; i < dealerHand.length; i++) {
        const img = document.createElement("img");
        img.className = "card-img";

        // Première carte cachée tant que la partie n’est pas terminée
        if (i === 0 && !showDealer) {
            img.src = "cards/back-red.png";
        } else {
            img.src = "cards/" + dealerHand[i].value + "-" + dealerHand[i].suit + ".png";
        }
        dealerDiv.appendChild(img);
    }

    dealerScore.textContent = showDealer ? calculateScore(dealerHand) : "?";

    // Joueur
    for (let card of playerHand) {
        const img = document.createElement("img");
        img.className = "card-img";
        img.src = "cards/" + card.value + "-" + card.suit + ".png";
        playerDiv.appendChild(img);
    }

    playerScore.textContent = calculateScore(playerHand);
}

// Initialisation d’une partie
function startGame() {
    createDeck();
    gameOver = false;

    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    statusText.textContent = "À vous de jouer";
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;

    displayHands(false);
}

// Action : tirer une carte
function hit() {
    if (gameOver) return;

    playerHand.push(deck.pop());
    displayHands(false);

    // Défaite immédiate si dépassement
    if (calculateScore(playerHand) > 21) {
        statusText.textContent = "Vous avez perdu... Retour au formulaire.";
        endGame(true);

        setTimeout(() => {
            gameZone.style.display = "none";
            form.style.display = "block";
            form.reset();
            updateButton();
        }, 2000);
    }
}

// Action : rester
function stand() {
    if (gameOver) return;

    // Le croupier joue automatiquement
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    const p = calculateScore(playerHand);
    const d = calculateScore(dealerHand);

    if (d > 21 || p > d) {
        statusText.textContent = "Vous gagnez ! Message envoyé";
        endGame(true);
        return;
    }

    statusText.textContent = "Perdu ou égalité... Retour au formulaire.";
    endGame(true);

    setTimeout(() => {
        gameZone.style.display = "none";
        form.style.display = "block";
        form.reset();
        updateButton();
    }, 2000);
}

// Fin de partie (révélation du croupier + blocage des actions)
function endGame(showDealer) {
    gameOver = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    displayHands(showDealer);
}

// Liaisons boutons
document.getElementById("hit").onclick = hit;
document.getElementById("stand").onclick = stand;
document.getElementById("new-game").onclick = startGame;