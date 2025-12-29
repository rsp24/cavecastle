// Sticky Header
window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Mobile Menu
const menuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');

    // Animate burger menu
    const spans = menuToggle.querySelectorAll('span');
    if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';

        // Ensure burger is dark when menu is open so it's visible on white bg
        spans.forEach(span => span.style.backgroundColor = '#333');
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';

        // Reset color based on sticky state or not
        const isSticky = document.getElementById('main-header').classList.contains('sticky');
        const color = isSticky ? '#333' : '#fff';
        spans.forEach(span => span.style.backgroundColor = color);
    }
});

// Banner Slider
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next-slide');
const prevBtn = document.getElementById('prev-slide');
let currentSlide = 0;
let slideInterval;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function prevSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

function startInterval() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Start auto slider
startInterval();

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        nav.classList.remove('active');

        // Reset burger menu icon
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        const isSticky = document.getElementById('main-header').classList.contains('sticky');
        const color = isSticky ? '#333' : '#fff'; // Simplification, ideally re-check scroll
        spans.forEach(span => span.style.backgroundColor = color);

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
