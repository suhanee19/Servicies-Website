document.addEventListener('DOMContentLoaded', () => {
            // Card text data for background
            const cardData = [
                {
                    title: "Holiday",
                    subtitle: "Exquisite travel experiences designed for comfort, discovery, and style."
                },
                {
                    title: "Events",
                    subtitle: "Transforming occasions into unforgettable milestones."
                },
                {
                    title: "Fleets",
                    subtitle: "Effortless journeys powered by meticulous fleet control."
                }
            ];

            let cards = Array.from(document.querySelectorAll('.card'));
            let isSliding = false;

            function updateBackground() {
    const lastCard = cards[2];
    const bgImage = window.getComputedStyle(lastCard).backgroundImage;
    document.querySelector('.slider-section').style.backgroundImage = bgImage;
}

            function updateBackgroundText() {
                const bgText = document.querySelector('.background-card-text');
                bgText.classList.add('fade');
                setTimeout(() => {
                    let lastCard = cards[2];
                    let idx = lastCard.classList.contains('card-holiday') ? 0 :
                        lastCard.classList.contains('card-event') ? 1 : 2;
                    document.querySelector('.background-card-text .card-title').textContent = cardData[idx].title;
                    document.querySelector('.background-card-text .card-subtitle').textContent = cardData[idx].subtitle;
                    bgText.classList.remove('fade');
                }, 800); // Match transition duration
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

                // Set z-indexes so second card is already on top, first card behind
                cards[0].style.zIndex = 1; // leaving card (behind)
                cards[1].style.zIndex = 3; // next card (top)
                cards[2].style.zIndex = 2; // next-next card (middle)

                // Animate the first card out and set it behind
                cards[0].classList.add('leaving');
                cards[1].classList.remove('next');
                cards[1].classList.add('active');
                cards[2].classList.remove('next-next');
                cards[2].classList.add('next');

                // After animation, move the card to the end and reset
                setTimeout(() => {
                    cards[0].classList.remove('leaving');
                    cards[0].style.zIndex = '';
                    cards[1].style.zIndex = '';
                    cards[2].style.zIndex = '';
                    const frontCard = cards.shift();
                    cards.push(frontCard);
                    updateCardPositions();
                    isSliding = false;
                }, 950); // Match --animation-duration
            }

            updateCardPositions();
            setInterval(slideNext, 3000);
        });