// ==========================================
// 1. MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Toggle menu open/close
menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('active');
  // Add or remove the 'menu-open' class to the body
  document.body.classList.toggle('menu-open', isOpen);
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open'); // Remove the class
  });
});

// ==========================================
// 2. NAVBAR SHADOW ON SCROLL & 5. BACK TO TOP
// ==========================================
const navbar = document.querySelector('.navbar');

// Create the Back to Top button dynamically
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.id = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  // Shadow on navbar
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  // Back to top visibility
  if (window.scrollY > 500) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Scroll to top when button is clicked
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Style the back to top button via JS (to save you from writing more CSS)
Object.assign(backToTopBtn.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 15px',
  fontSize: '1.5rem',
  backgroundColor: 'var(--accent-color)',
  color: 'var(--bg-color)',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'none', // Hidden by default
  zIndex: '1000'
});

// ==========================================
// 3. ACTIVE LINK HIGHLIGHTING ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // If we have scrolled past the top of the section
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = 'var(--text-color)'; // Reset all
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent-color)'; // Highlight current
    }
  });
});

// ==========================================
// 4. FORM VALIDATION
// ==========================================
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop the page from reloading
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  let isValid = true;
  let errorMessage = '';

  // Simple validation rules
  if (name === '') {
    isValid = false;
    errorMessage += 'Please enter your name.\n';
  }
  
  if (!email.includes('@') || !email.includes('.')) {
    isValid = false;
    errorMessage += 'Please enter a valid email address.\n';
  }

  if (message.length < 10) {
    isValid = false;
    errorMessage += 'Your message must be at least 10 characters long.\n';
  }

  if (isValid) {
    alert(`Thank you, ${name}! Your message has been validated. (Since this is front-end only, no actual email was sent).`);
    form.reset(); // Clear the form
  } else {
    alert('Oops! Please fix the following:\n\n' + errorMessage);
  }
});

// ==========================================
// 6. DYNAMIC FOOTER YEAR
// ==========================================
document.getElementById('year').textContent = new Date().getFullYear();
// ==========================================
// 7. HERO TYPEWRITER EFFECT
// ==========================================
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
  const words = JSON.parse(typewriterElement.getAttribute('data-words'));
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at the end of the word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing the next word
    }

    setTimeout(type, typeSpeed);
  }
  type(); // Start the effect
}
// ==========================================
// 8. SCROLL REVEAL ANIMATIONS
// ==========================================
const revealElements = document.querySelectorAll('.section, .project-card');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.1 // Triggers when 10% of the element is visible
});

revealElements.forEach(el => {
  el.classList.add('reveal'); // Add the starting class
  revealObserver.observe(el);
});
// ==========================================
// 9. SPARKLE MOUSE TRAIL
// ==========================================
document.addEventListener('mousemove', function(e) {
  // Only create sparkles occasionally to prevent lag
  if (Math.random() > 0.3) return; 

  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  
  // Randomize position slightly
  sparkle.style.left = e.pageX + 'px';
  sparkle.style.top = e.pageY + 'px';
  
  // Randomize colors (pink, gold, or blue)
  const colors = ['#f4c6c6', '#d4a373', '#e0f2fe'];
  sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(sparkle);

  // Remove the sparkle after the animation finishes (800ms)
  setTimeout(() => {
    sparkle.remove();
  }, 800);
});
// ==========================================
// 10. DARK MODE TOGGLE
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  if(themeToggleBtn) themeToggleBtn.textContent = '☀️';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeToggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}