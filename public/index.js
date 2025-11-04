// Wait for DOM to be fully ready
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
    offset: 0,
    disable: false, // Keep animations enabled
    startEvent: 'DOMContentLoaded', // Changed from 'load'
    anchorPlacement: 'top-bottom',
  });
  
  // Refresh AOS after a short delay to catch any late-loading content
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});

// Select hamburger button and mobile menu
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

let isOpen = false;

menuBtn.addEventListener("click", () => {
  isOpen = !isOpen;

  // Toggle mobile menu visibility
  menu.classList.toggle("hidden");

  // Toggle hamburger / close icon
  menuBtn.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>' // Cross icon when open
    : '<i class="fa-solid fa-bars"></i>'; // Hamburger icon when closed
});


// NAV ACTIVE LINK HANDLER
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active state from all links
    navLinks.forEach(l => l.classList.remove("!text-accent", "font-semibold"));

    // Add active state to clicked link
    link.classList.add("!text-accent", "font-semibold");

    // Smooth scroll to section
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// TESTIMONIAL SLIDER
const container = document.querySelector('.testimonial-container');
const testimonials = document.querySelectorAll('.testimonial');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');

let index = 0;
let visibleCount = window.innerWidth < 768 ? 1 : 2;

function showTestimonial() {
  const width = testimonials[0].clientWidth + 28; // 28px for gap-7
  container.style.transform = `translateX(-${index * width}px)`;
}

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (index < testimonials.length - visibleCount) {
      index++;
      showTestimonial();
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      showTestimonial();
    }
  });
});

window.addEventListener('resize', () => {
  visibleCount = window.innerWidth < 768 ? 1 : 2;
  index = 0; // reset on resize
  showTestimonial();
});
