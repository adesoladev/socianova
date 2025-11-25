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

      // Blog post content data
const blogPosts = {
    blog1: {
        category: 'Guides',
        title: 'How to Choose the Right Influencer for Your Brand',
        image: 'Images/influencer.jpg', // The existing image
        content: `
            <p>Influencer marketing has become one of the most effective ways for brands to connect with their target audiences. But here's the catch — not every influencer is the right fit for your brand. Choosing the wrong partner can waste time, money, and even harm your brand's reputation. So, how do you pick the perfect influencer who can genuinely represent your brand and drive results?</p>

            <p>In this post, we'll walk through the key factors you should consider before collaborating with an influencer.</p>

            <h2>1. Know Your Goals</h2>
            <p>Before reaching out to any influencer, get clear on your campaign objectives. Are you trying to increase brand awareness, boost sales, or build community engagement? Your goal determines the type of influencer you should work with. For instance:</p>
            <ul>
                <li><strong>Brand awareness:</strong> Macro or celebrity influencers with a wide reach.</li>
                <li><strong>Engagement and trust:</strong> Micro or nano influencers with smaller but highly active audiences.</li>
            </ul>

            <h2>2. Understand Your Target Audience</h2>
            <p>Your influencer's audience should mirror your brand's target market. Look at demographics like age, gender, interests, and location. Tools like HypeAuditor or Social Blade can help you analyze an influencer's audience insights.</p>
            <p>If your audiences don't align, even the most creative campaign won't drive meaningful results.</p>

            <h2>3. Check Authenticity and Engagement</h2>
            <p>Follower count doesn't always equal influence. A smaller influencer with strong engagement can often outperform one with a massive following. Look for:</p>
            <ul>
                <li>Genuine comments, not spammy or repetitive ones.</li>
                <li>Consistent engagement rate (typically 2–5% is good).</li>
                <li>Authentic storytelling and personal connection with their followers.</li>
            </ul>

            <h2>4. Review Content Quality and Brand Fit</h2>
            <p>Scroll through the influencer's posts. Is their content aesthetic, consistent, and aligned with your brand's tone? If your brand promotes sustainability, partnering with an influencer who often features fast-fashion brands would feel disingenuous.</p>

            <h2>5. Evaluate Professionalism</h2>
            <p>A good influencer treats their work like a business. Notice how they communicate, handle deadlines, and present their media kit. Professionalism builds smoother partnerships and stronger long-term collaborations.</p>

            <h2>Conclusion</h2>
            <p>The right influencer can amplify your message, humanize your brand, and build meaningful customer relationships. Take your time to research, vet, and build authentic partnerships that align with your brand's vision and values.</p>
        `
    },
    blog2: {
        category: 'Case Studies',
        title: 'The ROI of Influencer Marketing: What the Numbers Say',
        image: 'Images/marketing.jpg', // The existing image
        content: `
            <p>Influencer marketing isn't just a buzzword anymore — it's a proven business strategy. But as brands pour more budget into influencer partnerships, one big question remains: What's the real ROI?</p>

            <p>Let's break down what the numbers say and how you can measure the true impact of influencer marketing on your business.</p>

            <h2>1. The Numbers Behind Influencer ROI</h2>
            <p>According to studies from Influencer Marketing Hub, businesses are making <strong>$5.20 for every $1 spent</strong> on influencer marketing. That's an impressive ROI — but it doesn't happen by accident. Success comes from working with the right influencers and tracking the right metrics.</p>

            <h2>2. What Metrics Really Matter</h2>
            <p>To calculate your ROI, look beyond vanity metrics like likes or views. Focus on:</p>
            <ul>
                <li><strong>Engagement Rate:</strong> Comments, shares, and saves show real interaction.</li>
                <li><strong>Conversion Rate:</strong> How many followers actually bought or signed up?</li>
                <li><strong>Traffic Source:</strong> Use UTM links or promo codes to track referral traffic.</li>
                <li><strong>Customer Lifetime Value (CLV):</strong> Influencer campaigns often create loyal, long-term customers.</li>
            </ul>

            <h2>3. Short-Term vs Long-Term ROI</h2>
            <p>Some influencer campaigns drive quick conversions, while others build brand awareness over time.</p>
            <ul>
                <li><strong>Short-term ROI</strong> = sales, leads, or website visits.</li>
                <li><strong>Long-term ROI</strong> = brand loyalty, trust, and community growth.</li>
            </ul>
            <p>The most successful brands measure both.</p>

            <h2>4. How to Improve ROI</h2>
            <ul>
                <li>Work with micro-influencers for better engagement and lower costs.</li>
                <li>Set clear campaign goals before launch.</li>
                <li>Use performance-based contracts where influencers earn more for measurable results.</li>
                <li>Track everything — use Google Analytics, affiliate links, and social insights.</li>
            </ul>

            <h2>Conclusion</h2>
            <p>The ROI of influencer marketing goes beyond immediate sales. It's about trust, brand equity, and relationships that lead to sustainable growth. By combining data with genuine connections, your influencer strategy can deliver measurable — and lasting — returns.</p>
        `
    },
    blog3: {
        category: 'Trends',
        title: 'Top 5 Influencer Marketing Trends to Watch in 2025',
        image: 'Images/trends.jpg', // The existing image
        content: `
            <p>Influencer marketing is evolving at lightning speed. As we step into 2025, new technologies, audience behaviors, and creative strategies are reshaping how brands collaborate with creators. Staying ahead of these trends will help your brand remain relevant — and competitive.</p>

            <p>Let's explore the top 5 influencer marketing trends that will define 2025.</p>

            <h2>1. Rise of Micro and Nano Influencers</h2>
            <p>Bigger isn't always better. Brands are realizing that micro (10K–100K) and nano (1K–10K) influencers often drive more authentic engagement. Their smaller communities feel more personal, leading to higher trust and conversion rates.</p>

            <h2>2. AI-Powered Influencer Discovery</h2>
            <p>Artificial Intelligence is changing how brands find and analyze influencers. AI tools can now detect fake followers, measure engagement quality, and even predict which influencers will perform best based on campaign goals. Expect AI-driven platforms to become standard in 2025.</p>

            <h2>3. Video-First Campaigns Dominate</h2>
            <p>Short-form video content continues to rule, especially on TikTok, Instagram Reels, and YouTube Shorts. In 2025, successful influencer marketing will prioritize video storytelling, behind-the-scenes content, and interactive formats that connect emotionally with audiences.</p>

            <h2>4. Social Commerce Integration</h2>
            <p>With features like Instagram Checkout and TikTok Shop, influencers can now drive direct sales without users leaving the app. This seamless experience makes influencer-driven eCommerce one of the biggest growth opportunities for brands this year.</p>

            <h2>5. Authenticity and Transparency Win</h2>
            <p>Audiences crave realness. 2025 will reward influencers who share honest experiences, disclose partnerships openly, and prioritize community over clout. Brands that support this authenticity will gain stronger loyalty and reputation.</p>

            <h2>Conclusion</h2>
            <p>The influencer marketing landscape in 2025 is all about authentic connections, data-driven strategy, and creativity powered by technology. By embracing these trends early, your brand can stay ahead and make every collaboration count.</p>
        `
    }
};

// Open modal function
function openModal(blogId) {
    const modal = document.getElementById('blogModal');
    const modalBody = document.getElementById('modalBody');
    const post = blogPosts[blogId];
    
    if (post) {
        modalBody.innerHTML = `
            <div class="mb-6">
                <span class="bg-primary text-text px-4 py-2 rounded-md text-sm">${post.category}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-6" style="color: var(--textsecondary, #1a1a1a);">${post.title}</h1>
            <img src="${post.image}" alt="${post.title}" class="w-full h-64 md:h-96 object-cover rounded-lg mb-8">
            <div class="blog-content">
                ${post.content}
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('blogModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking on backdrop
function closeModalOnBackdrop(event) {
    if (event.target.id === 'blogModal') {
        closeModal();
    }
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// BACK TO TOP ARROW
    const backToTopBtn = document.getElementById('backToTop');
  // Show the button when scrolling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  // Scroll to top smoothly
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });