document.addEventListener('DOMContentLoaded', () => {
    // --- UPDATED: cardData now holds separate images for cards and backgrounds ---
    const cardData = [
        {
            title: "Holiday",
            cardImage: "url('assets/images/yavor-punchev-EerfoqyC7aM-unsplash.jpg')", // Image for the small card
            backgroundImage: "url('assets/images/yavor-punchev-EerfoqyC7aM-unsplash.jpg')" // Image for the large background
        },
        {
            title: "Events",
            cardImage: "url('assets/images/beach.jpg')", // Image for the small card
            backgroundImage: "url('assets/images/beach.jpg')" // Image for the large background
        },
        {
            title: "Fleets",
            cardImage: "url('assets/images/travalersAndBuses.jpg')", // Image for the small card
            backgroundImage: "url('assets/images/Artboard 1 copy 14 (1).jpg')" // Image for the large background
        }
    ];

    let cards = Array.from(document.querySelectorAll('.card'));
    let isSliding = false;

    // --- NEW: Function to set initial card images from our data ---
    function initializeCards() {
        cards.forEach(card => {
            const index = card.dataset.index;
            if (cardData[index]) {
                card.style.backgroundImage = cardData[index].cardImage;
            }
        });
    }

    // --- UPDATED: Now uses cardData to set the large background ---
    function updateBackground() {
        const lastCard = cards[2]; // This is the card at the 'next-next' position
        const index = lastCard.dataset.index;
        if (cardData[index]) {
            // Use the 'backgroundImage' URL from our data object
            document.querySelector('.slider-section').style.backgroundImage = cardData[index].backgroundImage;
        }
    }

    // --- UPDATED: Now uses data-index for a more reliable update ---
    function updateBackgroundText() {
        const bgText = document.querySelector('.background-card-text');
        bgText.classList.add('fade');
        setTimeout(() => {
            const lastCard = cards[2];
            const index = lastCard.dataset.index; // Use the data-index
            if (cardData[index]) {
                document.querySelector('.background-card-text .card-title').textContent = cardData[index].title;
                document.querySelector('.background-card-text .card-subtitle').textContent = cardData[index].subtitle;
            }
            bgText.classList.remove('fade');
        }, 800);
    }

    function updateCardPositions() {
        cards.forEach(card => {
            card.classList.remove('active', 'next', 'next-next', 'leaving');
            card.style.zIndex = '';
        });

        cards[0].classList.add('active');
        cards[1].classList.add('next');
        cards[2].classList.add('next-next');
        updateBackground();
        updateBackgroundText();
    }

    function slideNext() {
        if (isSliding) return;
        isSliding = true;

        cards[0].style.zIndex = 1;
        cards[1].style.zIndex = 3;
        cards[2].style.zIndex = 2;

        cards[0].classList.add('leaving');
        cards[1].classList.remove('next');
        cards[1].classList.add('active');
        cards[2].classList.remove('next-next');
        cards[2].classList.add('next');

        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('leaving');
                card.style.zIndex = '';
            });
            const frontCard = cards.shift();
            cards.push(frontCard);
            updateCardPositions();
            isSliding = false;
        }, 950);
    }

    initializeCards(); // Run the new function once at the start
    updateCardPositions();
    setInterval(slideNext, 3000);
});