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
// Event: 7 September 2026 - 9:30 AM
// ======================================

const targetDate = new Date('2026-09-07T09:30:00').getTime();

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
/* =========================================
   IMPACT NUMBER COUNTER
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const impactNumbers = document.querySelectorAll(".impact-number");

  if (!impactNumbers.length) return;

  const animateCounter = (element) => {

    const target = Number(element.dataset.target);
    const duration = 1800;

    let startTime = null;

    const updateCounter = (currentTime) => {

      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOut * target);

      element.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  };


  const impactObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const number = entry.target;

          // Prevent animation from running again
          if (number.dataset.animated === "true") {
            return;
          }

          number.dataset.animated = "true";

          animateCounter(number);

          observer.unobserve(number);
        }

      });

    },
    {
      threshold: 0.4
    }
  );


  impactNumbers.forEach((number) => {
    impactObserver.observe(number);
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

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const category = document.getElementById('business_category').value.trim();

    // Create Google Sheet form data
    const formData = new FormData(form);

    // Razorpay Payment Page
    const razorpayUrl = new URL(
      'https://pages.razorpay.com/pl_TR88C58t8sfC8n/view'
    );

    // Razorpay prefill parameters
    razorpayUrl.searchParams.set('full_name', name);
    razorpayUrl.searchParams.set('email', email);
    razorpayUrl.searchParams.set('phone', phone);

    // Business Category
    razorpayUrl.searchParams.set(
      'business_category',
      category
    );

    // Show processing message
    const submitBtn = document.getElementById('submitBtn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';
    }

    // Save data to Google Sheet
    fetch(
      'https://script.google.com/macros/s/AKfycby7atbnveQRq49CewnZXRodeZSH4WuuWwcpHu_UORdZ9gXzgukj87kPeYo7FYKKdw8/exec',
      {
        method: 'POST',
        body: formData
      }
    )
      .then(() => {

        // Redirect to Razorpay
        window.location.href = razorpayUrl.toString();

      })
      .catch((error) => {

        console.error('Google Sheet Error:', error);

        // Still redirect to Razorpay
        // so customer is not stuck on the registration page
        window.location.href = razorpayUrl.toString();

      });
  });
}
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const categorySelect = document.getElementById('business_category');
const submitBtn = document.getElementById('submitBtn');

function validateForm() {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const businessCategory = categorySelect.value;

  // Mobile number must be exactly 10 digits
  const phoneValid = /^[6-9]\d{9}$/.test(phone);

  if (name !== '' && phoneValid && businessCategory !== '') {
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
