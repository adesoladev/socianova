document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
    offset: 50, // Changed from 0 to 50
    anchorPlacement: 'top-bottom',
  });
});

// Refresh AOS after images and content load
window.addEventListener('load', function() {
  AOS.refresh();
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

// Counter animation function
      function animateCounter(element, target, duration = 2000) {
        const isDecimal = target % 1 !== 0;
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString();
            clearInterval(timer);
          } else {
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
          }
        }, 16);
      }

      // Intersection Observer to trigger animation when section is visible
      const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
              const target = parseFloat(counter.getAttribute('data-target'));
              animateCounter(counter, target);
            });
            observer.unobserve(entry.target); // Only animate once
          }
        });
      }, observerOptions);

      // Observe the stats section
      const statsSection = document.getElementById('stats');
      if (statsSection) {
        observer.observe(statsSection);
      }


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

 // Enhanced form submission with feedback
      const form = document.getElementById('contactForm');
      const formStatus = document.getElementById('formStatus');
      const submitBtn = document.getElementById('submitBtn');

      form.addEventListener('submit', function(e) {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Let Formspree handle the submission
        // After submission, Formspree will redirect or show a message
      });

      // Check if returning from Formspree submission
      if (window.location.search.includes('success')) {
        formStatus.classList.remove('hidden');
        formStatus.classList.add('bg-green-100', 'text-green-700');
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        form.reset();
      }
