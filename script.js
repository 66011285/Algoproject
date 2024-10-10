// Card properties and deck array
const suits = ['♠', '♣', '♥', '♦'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];

// Function to generate a random card
function generateCard() {
    const randomValue = values[Math.floor(Math.random() * values.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const newCard = { value: randomValue, suit: randomSuit };
    deck.push(newCard);
    displayDeck();
}

// Function to display the deck of cards
function displayDeck() {
    const deckElement = document.getElementById('deck');
    deckElement.innerHTML = ''; // Clear previous cards

    deck.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card card-container';
        cardElement.draggable = true;
        cardElement.dataset.index = index;
        cardElement.innerHTML = `
            <span>${card.value}</span><br>
            <span>${card.suit}</span>
        `;
        cardElement.addEventListener('dragstart', handleDragStart);
        cardElement.addEventListener('dragover', handleDragOver);
        cardElement.addEventListener('drop', handleDrop);
        deckElement.appendChild(cardElement);
    });
}

// Drag-and-drop handlers
let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = e.target.dataset.index;
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const target = e.target;
    target.classList.add('placeholder');
}

function handleDrop(e) {
    e.preventDefault();
    const targetIndex = e.target.dataset.index;
    if (draggedIndex !== null && targetIndex !== null) {
        [deck[draggedIndex], deck[targetIndex]] = [deck[targetIndex], deck[draggedIndex]];
        displayDeck();
        checkSorted();
    }
}

// Function to check if deck is sorted
function checkSorted() {
    const valueOrder = { 'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13 };
    const suitOrder = { '♠': 1, '♣': 2, '♥': 3, '♦': 4 };

    for (let i = 1; i < deck.length; i++) {
        const prevCard = deck[i - 1];
        const currentCard = deck[i];
        
        const prevValueOrder = valueOrder[prevCard.value];
        const currentValueOrder = valueOrder[currentCard.value];

        const prevSuitOrder = suitOrder[prevCard.suit];
        const currentSuitOrder = suitOrder[currentCard.suit];

        // Check if cards are sorted correctly
        if (prevValueOrder > currentValueOrder || 
            (prevValueOrder === currentValueOrder && prevSuitOrder > currentSuitOrder)) {
            return false;
        }
    }

    showCongratsModal();
    return true;
}

// Function to zoom into a card
function zoomCard(card) {
    const modal = document.getElementById('cardModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="card">
            <span>${card.value}</span><br>
            <span>${card.suit}</span>
        </div>
    `;
    modal.style.display = 'block';
}

// Function to close the zoom modal
function closeModal() {
    const modal = document.getElementById('cardModal');
    modal.style.display = 'none';
}

// Function to sort the deck (using bubble sort)
function sortDeck() {
    const valueOrder = { 'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13 };
    const suitOrder = { '♠': 1, '♣': 2, '♥': 3, '♦': 4 };

    let n = deck.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1; j++) {
            const cardA = deck[j];
            const cardB = deck[j + 1];
            const cardAValue = valueOrder[cardA.value];
            const cardBValue = valueOrder[cardB.value];

            if (cardAValue > cardBValue || (cardAValue === cardBValue && suitOrder[cardA.suit] > suitOrder[cardB.suit])) {
                // Swap
                [deck[j], deck[j + 1]] = [deck[j + 1], deck[j]];
            }
        }
    }

    displayDeck(); // Refresh the display after sorting
}

// Function to clear the deck
function clearDeck() {
    deck = [];
    displayDeck();
}

// Function to show congratulations modal
function showCongratsModal() {
    const modal = document.getElementById('congratsModal');
    modal.style.display = 'block';
}

// Function to close congratulations modal
function closeCongratsModal() {
    const modal = document.getElementById('congratsModal');
    modal.style.display = 'none';
}
