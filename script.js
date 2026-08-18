// ======================================
// Dark / Light Mode Toggle
// ======================================

const themeSwitch = document.getElementById('themeSwitch');

// Default is LIGHT mode
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeSwitch) themeSwitch.checked = true;
}

if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');

    const theme = document.body.classList.contains('dark-mode')
      ? 'dark'
      : 'light';

    localStorage.setItem('theme', theme);
  });
}

// ======================================
// Countdown Timer
// Event: 26 August 2026 - 9:30 AM
// ======================================

const targetDate = new Date('2026-08-26T09:30:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownEl = document.getElementById('countdown');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownEl) {
    return;
  }

  if (distance <= 0) {
    countdownEl.innerHTML =
      '<div class="time"><span>LIVE</span>Session Started</div>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ======================================
// FAQ Accordion
// ======================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('span');

    // Close other FAQs
    faqQuestions.forEach(item => {
      if (item !== question) {
        const otherAnswer = item.nextElementSibling;
        const otherIcon = item.querySelector('span');

        if (otherAnswer) otherAnswer.style.display = 'none';
        if (otherIcon) otherIcon.textContent = '+';
      }
    });

    // Toggle current FAQ
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      if (icon) icon.textContent = '+';
    } else {
      answer.style.display = 'block';
      if (icon) icon.textContent = '−';
    }
  });
});

// ======================================
// Scroll Reveal Animation
// ======================================

const revealElements = document.querySelectorAll(
  '.card, .testimonial, .about-wrap, .hero-content, .hero-image'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition =
    'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ======================================
// Smooth Scroll for Internal Links
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ======================================
// Dynamic Footer Year (Optional)
// ======================================

const footer = document.querySelector('footer');

if (footer) {
  footer.innerHTML =
    '© ' +
    new Date().getFullYear() +
    ' Multimanttra Solutions | Business Coach Miinal Patil';
}
const form = document.getElementById('registrationForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(
      'https://script.google.com/macros/s/AKfycbwAl4qzDNlgFPQNzxugQYAyVfixL_Y_JbDtGLHd3FIgbxQ-UK99sOrJFGJlqmk0yA0/exec',
      {
        method: 'POST',
        body: formData
      }
    )
      .then(() => {
        window.location.href = 'https://rzp.io/rzp/1oAy8Vy';
      })
      .catch((error) => {
        alert('Unable to submit the form. Please try again.');
        console.error(error);
      });
  });
}
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const categorySelect = document.getElementById('category');
const submitBtn = document.getElementById('submitBtn');

function validateForm() {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const category = categorySelect.value;

  // Mobile number must be exactly 10 digits
  const phoneValid = /^[6-9]\d{9}$/.test(phone);

  if (name !== '' && phoneValid && category !== '') {
    submitBtn.disabled = false;
    submitBtn.classList.add('enabled');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('enabled');
  }
}

nameInput.addEventListener('input', validateForm);
phoneInput.addEventListener('input', validateForm);
categorySelect.addEventListener('change', validateForm);

validateForm();
