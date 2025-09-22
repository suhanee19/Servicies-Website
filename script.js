document.addEventListener('DOMContentLoaded', () => {
  const originalCards = document.querySelectorAll('.card');
  const backgroundSlides = document.querySelectorAll('.background-slide');
  const textContents = document.querySelectorAll('.text-content');
  const cardScroller = document.querySelector('.card-scroller');
  const numOriginalCards = 3; // number of unique cards
  let currentIndex = 0;
  let autoPlayInterval;

  // --- Function to update active slide, text, and cards ---
  const updateSlider = (index) => {
    const backgroundIndex = index % numOriginalCards;

    // Update background + text
    backgroundSlides.forEach(s => s.classList.remove('active'));
    backgroundSlides[backgroundIndex].classList.add('active');

    textContents.forEach(t => t.classList.remove('active'));
    textContents[backgroundIndex].classList.add('active');

    // Reset + highlight next two cards
    originalCards.forEach(c => c.classList.remove('active'));
    const next1 = (backgroundIndex + 1) % numOriginalCards;
    const next2 = (backgroundIndex + 2) % numOriginalCards;
    originalCards[next1].classList.add('active');
    originalCards[next2].classList.add('active');

    // Move scroller so next card is first visible
    const cardWidth = originalCards[0].offsetWidth;
    const gap = 15;
    const translateX = -(next1 * (cardWidth + gap));
    cardScroller.style.transform = `translateX(${translateX}px)`;
    // Select hero/slider background and cards
const hero = document.querySelector('.hero'); // or use .slider-container if you prefer
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Get bg image from clicked card
    const bgImage = card.getAttribute('data-bg');

    // Change hero background
    hero.style.background = `linear-gradient(rgba(0,0,50,0.6), rgba(0,0,50,0.6)), url('${bgImage}') center/cover no-repeat`;

    // Remove active from all cards
    cards.forEach(c => c.classList.remove('active'));

    // Add active class to clicked one
    card.classList.add('active');
  });

    // --- Hero Slider Logic ---
    const backgroundSlides = document.querySelectorAll('.background-slide');
    const textContents = document.querySelectorAll('.text-content');
    const cards = document.querySelectorAll('.card');
    const numOriginalCards = 3;
    let currentIndex = 0;
    let autoPlayInterval;

    const updateSlider = (index) => {
        const slideIndex = index % numOriginalCards;
        backgroundSlides.forEach(s => s.classList.remove('active'));
        backgroundSlides[slideIndex].classList.add('active');

        textContents.forEach(t => t.classList.remove('active'));
        textContents[slideIndex].classList.add('active');
    };

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % numOriginalCards;
            updateSlider(currentIndex);
        }, 5000); // Change slide every 5 seconds
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        setTimeout(startAutoPlay, 10000); // Restart after 10 seconds of user interaction
    };

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const slideIndex = parseInt(card.getAttribute('data-index')) % numOriginalCards;
            updateSlider(slideIndex);
            resetAutoPlay();
        });
    });

    // --- Bento Box Auto-Scroll Logic ---
    const bentoContainer = document.querySelector('.bento-container');
    if (bentoContainer) {
        let scrollSpeed = 0.5; // Adjust this value to change scroll speed
        let scrollPosition = 0;

        function autoScroll() {
            scrollPosition += scrollSpeed;
            if (scrollPosition >= bentoContainer.scrollWidth - bentoContainer.clientWidth) {
                scrollPosition = 0; // Reset to the beginning
            }
            bentoContainer.scrollLeft = scrollPosition;
            requestAnimationFrame(autoScroll);
        }

        autoScroll();
    }
    
    // Initial call to start the hero slider
    updateSlider(currentIndex);
    startAutoPlay();
});

  };

  // --- Auto-play logic ---
  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex >= originalCards.length) {
        cardScroller.style.transition = 'none';
        currentIndex = 0;
        cardScroller.style.transform = `translateX(0px)`;

        setTimeout(() => {
          cardScroller.style.transition = 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
          updateSlider(currentIndex);
        }, 50);
      } else {
        updateSlider(currentIndex);
      }
    }, 5000); // every 5 sec
  };

  const resetAutoPlay = () => {
    clearInterval(autoPlayInterval);
    setTimeout(startAutoPlay, 10000); // restart after 10 sec
  };

  // --- Card click listeners ---
  originalCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentIndex = index;
      updateSlider(currentIndex);
      resetAutoPlay();
    });
  });

  // --- Hamburger menu toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // --- Initialize ---
  updateSlider(0);
  startAutoPlay();
});

document.addEventListener('DOMContentLoaded', () => {
    const lesserKnownScrollContainer = document.querySelector('.lesser-known-scroll-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Make sure the elements exist on the page before adding event listeners
    if (prevBtn && nextBtn && lesserKnownScrollContainer) {
        prevBtn.addEventListener('click', () => {
            lesserKnownScrollContainer.scrollBy({
                left: -320, // Scrolls left by a card width + gap
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            lesserKnownScrollContainer.scrollBy({
                left: 320, // Scrolls right by a card width + gap
                behavior: 'smooth'
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
});
// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    // Add event listener to the toggle button
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');

        // Save the theme preference
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // --- (Your existing homepage JS code goes here) ---
    // ...
});