window.addEventListener('DOMContentLoaded', function() {
// Futuristic Constellation/Network Background
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.getElementById('bg-animation').appendChild(canvas);
const ctx = canvas.getContext('2d');

let nodes = [];
const NODE_COUNT = 60;
const MAX_DIST = 140;
const COLORS = ['#00fff7', '#00aaff', '#ffffff'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.home-section').offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createNodes() {
  nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 1.2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
}
createNodes();

function drawConstellation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw lines between close nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < MAX_DIST) {
        const alpha = 1 - dist / MAX_DIST;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,255,247,${alpha * 0.35})`;
        ctx.shadowColor = '#00fff7';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  // Draw nodes
  for (let node of nodes) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.shadowColor = node.color;
    ctx.shadowBlur = 18;
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.restore();
  }
}

function animateConstellation() {
  for (let node of nodes) {
    node.x += node.dx;
    node.y += node.dy;
    if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
  }
  drawConstellation();
  requestAnimationFrame(animateConstellation);
}
animateConstellation();

// Services Cards Data
const services = [
  { icon: '🎬', title: 'Animation', desc: 'Cutting-edge 2D/3D animation for brands and stories.' },
  { icon: '✂️', title: 'Video Editing', desc: 'Futuristic video edits, VFX, and post-production.' },
  { icon: '💻', title: 'Web Development', desc: 'Next-gen websites, apps, and digital experiences.' },
  { icon: '🎨', title: 'UI/UX', desc: 'Immersive, user-centric interface and experience design.' },
  { icon: '🧊', title: '3D Modeling', desc: 'Hyper-realistic 3D models for any purpose.' },
  { icon: '🚀', title: 'Other Projects', desc: 'Custom futuristic solutions for unique needs.' },
  { icon: '🖼️', title: 'Artwork', desc: 'Futuristic digital art, illustrations, and concept visuals.' }
];
const servicesContainer = document.querySelector('.services-cards');
services.forEach(s => {
  const card = document.createElement('div');
  card.className = 'futuristic-card';
  card.innerHTML = `<div class=\"icon\">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p>`;
  servicesContainer.appendChild(card);
});

// Projects Cards Data (placeholders)
const projects = [
  { icon: '🎬', img: 'assets/sample-image.jpg' },
  { icon: '💻', video: 'assets/sample-video.mp4' },
  { icon: '🎬' },
  { icon: '🎬' },
  { icon: '✂️' },
  { icon: '✂️' },
  { icon: '💻' },
  { icon: '💻' },
  { icon: '🎨' },
  { icon: '🎨' },
  { icon: '🧊' },
  { icon: '🧊' },
  { icon: '🚀' },
  { icon: '🖼️' },
  { icon: '🖼️' }
];

// Shuffle projects array for random order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(projects);

const projectsCarousel = document.querySelector('.projects-carousel');

// Track
const track = document.createElement('div');
track.className = 'projects-carousel-track';

// Infinite loop: clone first and last N cards
const VISIBLE_CARDS = 3; // Number of cards visible at once (approx)
const total = projects.length;

function createCard(p) {
  let cardContent = '';
  let href = '';
  if (p.img) {
    cardContent = `<img src="${p.img}" alt="Project Image" class="project-media" /><div class="icon">${p.icon}</div>`;
    href = p.img;
  } else if (p.video) {
    cardContent = `<video src="${p.video}" class="project-media" autoplay loop muted playsinline></video><div class="icon">${p.icon}</div>`;
    href = p.video;
  } else {
    cardContent = `<div class="icon">${p.icon}</div>`;
  }
  const card = document.createElement('div');
  card.className = 'futuristic-card';
  if (href) {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = cardContent;
    card.appendChild(link);
  } else {
    card.innerHTML = cardContent;
  }
  return card;
}

// Clone last N cards to the start
for (let i = total - VISIBLE_CARDS; i < total; i++) {
  track.appendChild(createCard(projects[i]));
}
// Add all real cards
projects.forEach(p => {
  track.appendChild(createCard(p));
});
// Clone first N cards to the end
for (let i = 0; i < VISIBLE_CARDS; i++) {
  track.appendChild(createCard(projects[i]));
}
projectsCarousel.appendChild(track);

// Set initial scroll position to the first real card
function getCardWidth() {
  const card = track.querySelector('.futuristic-card');
  return card ? card.offsetWidth + 32 : 320; // 32px gap
}
function setInitialScroll() {
  track.scrollLeft = getCardWidth() * VISIBLE_CARDS;
}
setTimeout(setInitialScroll, 50);

// Arrows
const left = document.createElement('button');
left.className = 'carousel-arrow left';
left.innerHTML = '&#8592;';
left.onclick = () => {
  track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
};
const right = document.createElement('button');
right.className = 'carousel-arrow right';
right.innerHTML = '&#8594;';
right.onclick = () => {
  track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
};
projectsCarousel.appendChild(left);
projectsCarousel.appendChild(right);

// Infinite loop scroll logic
track.addEventListener('scroll', () => {
  const cardW = getCardWidth();
  if (track.scrollLeft <= cardW * 0.5) {
    // Jump to end
    track.scrollLeft = cardW * (total + VISIBLE_CARDS - 0.5);
  } else if (track.scrollLeft >= cardW * (total + VISIBLE_CARDS - 0.5)) {
    // Jump to start
    track.scrollLeft = cardW * VISIBLE_CARDS + 1;
  }
});
window.addEventListener('resize', setInitialScroll);

// Touch swipe support for carousel
let startX = 0;
let scrollStart = 0;
let isTouching = false;
track.addEventListener('touchstart', (e) => {
  isTouching = true;
  startX = e.touches[0].clientX;
  scrollStart = track.scrollLeft;
}, { passive: true });
track.addEventListener('touchmove', (e) => {
  if (!isTouching) return;
  const dx = e.touches[0].clientX - startX;
  track.scrollLeft = scrollStart - dx;
}, { passive: true });
track.addEventListener('touchend', () => {
  isTouching = false;
});

// Contact Form (placeholder for Google Form integration)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Form submission will be connected to Google Forms soon!');
});

// Hamburger menu logic
const hamburger = document.getElementById('hamburger-menu');
const navOverlay = document.getElementById('nav-menu-overlay');
hamburger.addEventListener('click', () => {
  navOverlay.classList.toggle('active');
});
navOverlay.addEventListener('click', (e) => {
  if (e.target === navOverlay) navOverlay.classList.remove('active');
});
navOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navOverlay.classList.remove('active');
  });
});
}); 