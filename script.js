// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ─── HERO WORD SWAP ───
const words = ["Write Smarter.", "Build Better.", "Ship Faster.", "Create More."];
let wordIndex = 0;
const wordSwapEl = document.getElementById('word-swap');

if (wordSwapEl) {
    setInterval(() => {
        wordSwapEl.style.opacity = '0';
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            wordSwapEl.textContent = words[wordIndex];
            wordSwapEl.style.opacity = '1';
        }, 400);
    }, 3000);
}

// ─── LIVE DEMO CHAT ───
const chips = document.querySelectorAll('.chip');
const userMsg = document.getElementById('user-msg');
const aiText = document.getElementById('ai-text');
const thinkingIndicator = document.getElementById('thinking-indicator');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
let isTyping = false;

function typeWriter(text, i, cb) {
    if (i < text.length) {
        aiText.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1, cb), 18);
    } else if (cb) {
        cb();
    }
}

function triggerResponse(prompt, response) {
    if (isTyping) return;
    isTyping = true;

    userMsg.textContent = prompt;
    aiText.textContent = "";
    thinkingIndicator.style.display = "flex";

    setTimeout(() => {
        thinkingIndicator.style.display = "none";
        typeWriter(response, 0, () => {
            isTyping = false;
        });
    }, 800);
}

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        if (isTyping) return;
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        triggerResponse(chip.dataset.prompt, chip.dataset.response);
    });
});

// Initial trigger
if (chips.length > 0) {
    triggerResponse(chips[0].dataset.prompt, chips[0].dataset.response);
}

// Input handler
function handleSend() {
    const val = chatInput.value.trim();
    if (val && !isTyping) {
        triggerResponse(val, "That's an interesting request. I'm processing it now. As an AI model, I can help you analyze, generate, and refine that specific task in seconds.");
        chatInput.value = "";
    }
}

if (sendBtn) sendBtn.addEventListener('click', handleSend);
if (chatInput) chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// ─── PRICING TOGGLE ───
const toggle = document.getElementById('billing-toggle');
const proPrice = document.getElementById('pro-price');
const monthlyLabel = document.getElementById('monthly-label');
const yearlyLabel = document.getElementById('yearly-label');
let isYearly = false;

if (toggle) {
    toggle.addEventListener('click', () => {
        isYearly = !isYearly;
        toggle.classList.toggle('yearly-active');
        monthlyLabel.classList.toggle('active-label');
        yearlyLabel.classList.toggle('active-label');

        const price = isYearly ? proPrice.dataset.yearly : proPrice.dataset.monthly;
        proPrice.innerHTML = `$${price}<span>/mo</span>`;
    });
}

// Comparison Table Toggle
const tableToggle = document.getElementById('table-toggle');
const tableWrapper = document.getElementById('table-wrapper');
if (tableToggle) {
    tableToggle.addEventListener('click', () => {
        const isOpen = tableWrapper.style.display === 'block';
        tableWrapper.style.display = isOpen ? 'none' : 'block';
        tableToggle.textContent = isOpen ? 'Compare all features \u00A0 \u2193' : 'Hide features \u00A0 \u2191';
    });
}

// ─── FAQ ACCORDION ───
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ─── SCROLL REVEAL ANIMATIONS ───
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target elements for reveal
document.querySelectorAll('.card, .price-card, .faq-item, .section-header').forEach(el => {
    revealObserver.observe(el);
});

// Active Nav Link based on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
