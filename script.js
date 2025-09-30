document.addEventListener('DOMContentLoaded', () => {
    // Define body once at the top for use in theme toggler
    const body = document.body;

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            });
        });
    }

    // --- HERO SLIDER / CARD ROTATION ---
    const sliderContainer = document.querySelector('.slider-container');
    const sliderCards = document.querySelectorAll('.hero-section .card'); // More specific selector
    const sliderTexts = document.querySelectorAll('.hero-section .text-content'); // More specific selector
    
    // Only run slider logic if the container exists on the page
    if (sliderContainer && sliderCards.length > 0) {
        let current = 0;

        function updateCards() {
            const total = sliderCards.length;
            if (total === 0) return;

            const bgIndex = current;
            const leftIndex = (current + 1) % total;
            const rightIndex = (current + 2) % total;

            const bgImg = sliderCards[bgIndex].querySelector('img').src;
            sliderContainer.style.backgroundImage = `url('${bgImg}')`;

            sliderTexts.forEach(t => t.classList.remove('active'));
            if (sliderTexts[bgIndex]) {
                sliderTexts[bgIndex].classList.add('active');
            }

            sliderCards.forEach(c => {
                c.style.transform = 'scale(0.8)';
                c.style.opacity = '0.7';
                c.style.zIndex = '1';
            });

            if (sliderCards[leftIndex]) {
                sliderCards[leftIndex].style.transform = 'scale(1)';
                sliderCards[leftIndex].style.opacity = '1';
                sliderCards[leftIndex].style.zIndex = '5';
            }
            
            if (sliderCards[rightIndex]) {
                sliderCards[rightIndex].style.transform = 'scale(0.9)';
                sliderCards[rightIndex].style.opacity = '0.85';
                sliderCards[rightIndex].style.zIndex = '3';
            }
        }

        updateCards(); // Initial render

        const sliderInterval = setInterval(() => {
            current = (current + 1) % sliderCards.length;
            updateCards();
        }, 3000); // Changed to 3 seconds for a better user experience

        sliderCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                current = index;
                updateCards();
                // Reset interval so the next slide waits the full duration
                clearInterval(sliderInterval);
            });
        });
    }

    // --- LESSER-KNOWN SCROLL BUTTONS ---
    const lesserKnownScrollContainer = document.querySelector('.lesser-known-scroll-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn && nextBtn && lesserKnownScrollContainer) {
        prevBtn.addEventListener('click', () => {
            lesserKnownScrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            lesserKnownScrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // --- Modal Logic (for Fleet page) ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.close-button');

    if (openModalButtons.length > 0) {
        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
            body.style.overflow = 'auto'; // Re-enable background scrolling
        }

        openModalButtons.forEach(card => {
            card.addEventListener('click', (event) => {
                // Prevents the slider click event from firing if a fleet card also has a '.card' class
                event.stopPropagation(); 
                const modal = document.querySelector(card.dataset.modalTarget);
                openModal(modal);
            });
        });

        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        });
    }

    // --- THEME TOGGLE (Cleaned Up) ---
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        // On page load, apply the saved theme
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-theme');
        }

        // Add the click event listener
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');

            // Save the new theme preference
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});