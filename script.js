/**
 * Portfolio Language Toggle Script
 * Handles Arabic/English language switching with smooth transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const htmlElement = document.documentElement;
    let isArabic = true;

    // Get all elements with bilingual data attributes
    const bilingualElements = document.querySelectorAll('[data-ar][data-en]');

    /**
     * Toggle between Arabic and English languages
     */
    function toggleLanguage() {
        isArabic = !isArabic;

        // Update document direction and language
        if (isArabic) {
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
            langToggle.querySelector('.lang-text').textContent = 'EN';
        } else {
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
            langToggle.querySelector('.lang-text').textContent = 'عربي';
        }

        // Update all bilingual text elements with fade animation
        bilingualElements.forEach((element, index) => {
            // Add fade out effect
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';

            setTimeout(() => {
                // Update text content
                element.textContent = isArabic
                    ? element.dataset.ar
                    : element.dataset.en;

                // Fade back in
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 150 + (index * 30)); // Staggered animation
        });

        // Update page title
        document.title = isArabic ? 'بن منهي | Bin Mnhi' : 'Bin Mnhi | بن منهي';

        // Re-trigger social link animations
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
            link.style.animation = 'none';
            link.offsetHeight; // Trigger reflow
            link.style.animation = '';
        });
    }

    // Add click event listener to language toggle button
    langToggle.addEventListener('click', toggleLanguage);

    // Add transition styles to bilingual elements
    bilingualElements.forEach(element => {
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Add keyboard support for language toggle
    langToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLanguage();
        }
    });

    // Console welcome message
    console.log('%c🌟 Portfolio by Bin Mnhi 🌟', 'color: #1a73e8; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color: #5f6368; font-size: 12px;');

    // Stats Counting Animation
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.counters');
    let hasAnimated = false;

    // Function to animate counters
    const animateCounters = () => {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target'); // e.g. 115000
            const suffix = counter.getAttribute('data-suffix');  // e.g. K
            const prefix = counter.getAttribute('data-prefix');  // e.g. +

            // Determine effective target to count to (e.g. 115 for 115K)
            let countTo = target;
            if (suffix === 'K' && target >= 1000) {
                countTo = target / 1000;
            }

            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = countTo / (duration / 20); // 60fps approx

            const updateCount = () => {
                count += increment;

                if (count < countTo) {
                    counter.innerText = `${prefix}${Math.ceil(count)}${suffix}`;
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = `${prefix}${countTo}${suffix}`;
                }
            };

            updateCount();
        });
    };

    // Use Intersection Observer to trigger animation when scrolled into view
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
});
