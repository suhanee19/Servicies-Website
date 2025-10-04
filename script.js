document.addEventListener('DOMContentLoaded', () => {
    // Define body once at the top for use in theme toggler
    const body = document.body;

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('active');
      });
    }

    const dropdownToggles = navLinks.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (event) => {
        if (window.innerWidth <= 1100) {
          event.preventDefault();
          toggle.parentElement.classList.toggle('open');
        }
      });
    });

    const allLinks = navLinks.querySelectorAll('a');
    allLinks.forEach(link => {
      if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
          }
        });
      }
    });

    // --- HERO SLIDER / CARD ROTATION ---
    const sliderContainer = document.querySelector('.slider-container');
    const sliderCards = document.querySelectorAll('.hero-section .card');
    const sliderTexts = document.querySelectorAll('.hero-section .text-content');
    
    if (sliderContainer && sliderCards.length > 0) {
        let current = 0;
        let sliderInterval;

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

        function startSlider() {
            sliderInterval = setInterval(() => {
                current = (current + 1) % sliderCards.length;
                updateCards();
            }, 3000);
        }

        updateCards();
        startSlider();

        sliderCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                current = index;
                updateCards();
                clearInterval(sliderInterval);
                startSlider(); // Restart interval after a click
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
            body.style.overflow = 'hidden';
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
            body.style.overflow = 'auto';
        }

        openModalButtons.forEach(card => {
            card.addEventListener('click', (event) => {
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
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-theme');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- NEW: FADE-IN ON SCROLL ANIMATION ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    if (fadeInElements.length > 0) {
        const observerOptions = {
            root: null, // observes intersections relative to the viewport
            rootMargin: '0px 0px -50px 0px', // trigger animation a little earlier
            threshold: 0.1 // trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the element is intersecting (visible)
                if (entry.isIntersecting) {
                    // Add the 'visible' class to trigger the animation
                    entry.target.classList.add('visible');
                    // Stop observing the element so the animation only happens once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Tell the observer to watch each of the fade-in elements
        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    }
});