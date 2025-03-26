let secretNumber = '';
let gameOver = false;

function generateRandomNumber() {
    const digits = [];
    while (digits.length < 4) {
        const num = Math.floor(Math.random() * 10).toString();
        if (!digits.includes(num)) {
            digits.push(num);
        }
    }
    return digits.join('');
}

function initGame() {
    secretNumber = generateRandomNumber();
    console.log("Nombre secret :", secretNumber);
    gameOver = false;
    
    const resultsDiv = document.getElementById("results");
    const userInput = document.getElementById("userInput");
    const checkBtn = document.getElementById("checkBtn");
    
    resultsDiv.innerHTML = '';
    userInput.value = '';
    userInput.disabled = false;
    checkBtn.textContent = 'Vérifier';
    checkBtn.onclick = checkGuess;
}

function hasDuplicateDigits(number) {
    return new Set(number).size !== number.length;
}

function showModal(message) {
    const modal = document.getElementById('validationModal');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modal && modalMessage) {
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
        
    } else {
        alert(message);
    }
}

function checkGuess() {
    const userInput = document.getElementById("userInput");
    const resultsDiv = document.getElementById("results");
    const userGuess = userInput.value;

    if (userGuess.length !== 4 || isNaN(userGuess)) {
        showModal("Veuillez entrer un nombre à 4 chiffres unique !");
        return;
    }

    if (hasDuplicateDigits(userGuess)) {
        showModal("Chaque chiffre doit être unique !");
        return;
    }

    let bulls = 0, cows = 0;
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === secretNumber[i]) {
            bulls++;
        } else if (secretNumber.includes(userGuess[i])) {
            cows++;
        }
    }


    const resultMessage = bulls === 4
        ? "🎉 Félicitations ! Vous avez trouvé le nombre secret ! 🏆"
        : `${userGuess} → 🐂 Taureaux: ${bulls}, 🐄 Vaches: ${cows}`;

    const resultItem = document.createElement('div');
    resultItem.innerHTML = resultMessage;
    resultItem.classList.add('result-item',
        bulls === 4 ? 'bg-green-200' :
        bulls + cows > 0 ? 'bg-yellow-100' : 'bg-red-100');

    resultsDiv.insertBefore(resultItem, resultsDiv.firstChild);

    if (bulls === 4) {
        gameOver = true;
        userInput.disabled = true;
        document.getElementById("checkBtn").textContent = 'Rejouer';
        document.getElementById("checkBtn").onclick = initGame;
    }

    userInput.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('rulesBtn').addEventListener('click', () => {
        document.getElementById('rulesModal').classList.add('show');
    });

    document.getElementById('closeRulesModal').addEventListener('click', () => {
        document.getElementById('rulesModal').classList.remove('show');
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('validationModal').classList.add('hidden');
    });

    initGame();
    document.getElementById('rulesModal').classList.add('show');
});