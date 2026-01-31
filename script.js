// ----- Sections & navigation -----
const openingSection = document.getElementById('opening');
const carouselSection = document.getElementById('carousel-section');
const questionSection = document.getElementById('question-section');
const openBtn = document.getElementById('openBtn');
const toQuestionBtn = document.getElementById('toQuestionBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const popup = document.getElementById('popup');
const fireworksCanvas = document.getElementById('fireworks');

// ----- Opening: go to carousel -----
openBtn.addEventListener('click', () => {
    openingSection.classList.add('hidden');
    carouselSection.classList.remove('hidden');
    initCarousel();
});

// ----- Carousel -----
let currentSlide = 0;
let slides = [];
let dots = [];

function initCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    dots = [];
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer || !slides.length) return;

    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    document.querySelector('.carousel-prev').addEventListener('click', () => goToSlide((currentSlide - 1 + slides.length) % slides.length));
    document.querySelector('.carousel-next').addEventListener('click', () => goToSlide((currentSlide + 1) % slides.length));

    goToSlide(0);
}

function goToSlide(index) {
    currentSlide = index;
    const trackInner = document.querySelector('.carousel-track-inner');
    if (trackInner) {
        trackInner.style.transform = `translateX(-${index * 100}%)`;
    }
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// ----- Question: go to question section -----
toQuestionBtn.addEventListener('click', () => {
    carouselSection.classList.add('hidden');
    questionSection.classList.remove('hidden');
    questionSection.classList.add('question-visible');
    initRunningNoButton();
});

// ----- Running "No" button – runs away when mouse gets near -----
function initRunningNoButton() {
    const wrap = document.querySelector('.buttons-wrap');
    if (!wrap || !noBtn) return;

    wrap.style.position = 'relative';
    wrap.style.minHeight = '80px';

    const padding = 20;
    let noBtnX = 0, noBtnY = 0;

    function placeNoButton(x, y) {
        const rect = wrap.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        const maxX = rect.width - btnRect.width - padding;
        const maxY = rect.height - btnRect.height - padding;

        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        noBtn.style.right = 'auto';
        noBtn.style.bottom = 'auto';
    }

    function randomPosition() {
        const r = wrap.getBoundingClientRect();
        const br = noBtn.getBoundingClientRect();
        const maxX = Math.max(0, r.width - br.width - padding);
        const maxY = Math.max(0, r.height - br.height - padding);
        return {
            x: Math.random() * maxX,
            y: Math.random() * maxY
        };
    }

    // Start with "No" next to "Yes"
    const startPos = randomPosition();
    placeNoButton(startPos.x, startPos.y);

    wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        const mouseX = e.clientX - rect.left + wrap.scrollLeft;
        const mouseY = e.clientY - rect.top + wrap.scrollTop;
        const btnCenterX = noBtn.offsetLeft + btnRect.width / 2;
        const btnCenterY = noBtn.offsetTop + btnRect.height / 2;
        const dist = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

        // If mouse is close to the No button, move the button away
        if (dist < 120) {
            const maxX = rect.width - btnRect.width - padding;
            const maxY = rect.height - btnRect.height - padding;
            let newX = btnCenterX - btnRect.width / 2 + (btnCenterX - mouseX) * 1.8;
            let newY = btnCenterY - btnRect.height / 2 + (btnCenterY - mouseY) * 1.8;
            newX = Math.max(0, Math.min(maxX, newX));
            newY = Math.max(0, Math.min(maxY, newY));
            placeNoButton(newX, newY);
        }
    });

    noBtn.addEventListener('mouseenter', () => {
        const pos = randomPosition();
        placeNoButton(pos.x, pos.y);
    });
}

// ----- Yes: fireworks + popup -----
yesBtn.addEventListener('click', () => {
    fireworksCanvas.classList.add('active');
    fireworksCanvas.style.display = 'block';
    startFireworks();
    setTimeout(() => {
        popup.classList.remove('hidden');
    }, 1500);
});

// Close popup on click outside
popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.classList.add('hidden');
});

// ----- Fireworks (canvas) -----
function startFireworks() {
    const ctx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    const colors = ['#c41e3a', '#ff69b4', '#ff1493', '#ffb6c1', '#fff', '#ffd700'];
    const particles = [];

    function createFirework(x, y) {
        const count = 80 + Math.floor(Math.random() * 40);
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random();
            const speed = 3 + Math.random() * 6;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color,
                life: 1,
                decay: 0.008 + Math.random() * 0.01
            });
        }
    }

    let frame = 0;
    function burst() {
        const x = Math.random() * fireworksCanvas.width * 0.6 + fireworksCanvas.width * 0.2;
        const y = Math.random() * fireworksCanvas.height * 0.4 + fireworksCanvas.height * 0.2;
        createFirework(x, y);
    }

    burst();
    const burstInterval = setInterval(burst, 400);

    function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08;
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        frame++;
        if (frame < 300) {
            requestAnimationFrame(animate);
        } else {
            clearInterval(burstInterval);
            fireworksCanvas.classList.remove('active');
            fireworksCanvas.style.display = 'none';
        }
    }
    animate();
}

// Resize canvas
window.addEventListener('resize', () => {
    if (fireworksCanvas.classList.contains('active')) {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    }
});
