window.addEventListener('DOMContentLoaded', function() {
// --- Mobile performance detection ---
const isMobilePerf = window.innerWidth <= 700;
if (isMobilePerf) {
  document.body.classList.add('mobile-performance');
}
// Futuristic Constellation/Network Background
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.getElementById('bg-animation').appendChild(canvas);
const ctx = canvas.getContext('2d');

let nodes = [];
const NODE_COUNT = isMobilePerf ? 18 : 60;
const MAX_DIST = isMobilePerf ? 0 : 140; // No lines on mobile
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
  // Draw lines between close nodes (skip on mobile)
  if (!isMobilePerf) {
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
  }
  // Draw nodes
  for (let node of nodes) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.shadowColor = node.color;
    ctx.shadowBlur = isMobilePerf ? 0 : 18;
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.restore();
  }
}

// --- Animate only when Home section is visible ---
let constellationRunning = false;
let constellationFrame = null;
function animateConstellation() {
  for (let node of nodes) {
    node.x += node.dx;
    node.y += node.dy;
    if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.dy *= -1;
  }
  drawConstellation();
  if (constellationRunning) {
    constellationFrame = requestAnimationFrame(animateConstellation);
  }
}

function startConstellation() {
  if (!constellationRunning) {
    constellationRunning = true;
    animateConstellation();
  }
}
function stopConstellation() {
  constellationRunning = false;
  if (constellationFrame) {
    cancelAnimationFrame(constellationFrame);
    constellationFrame = null;
  }
}

// IntersectionObserver for Home section
const homeSection = document.querySelector('.home-section');
const homeObserver = new window.IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      startConstellation();
    } else {
      stopConstellation();
    }
  },
  { threshold: 0.15 }
);
homeObserver.observe(homeSection);
// Start/stop on load
if (window.scrollY < window.innerHeight) {
  startConstellation();
} else {
  stopConstellation();
}

// Services Cards Data
const services = [
  { icon: '🎬', title: 'Animation', desc: 'Cutting-edge 2D/3D animation for brands and stories.' },
  { icon: '✂️', title: 'Video Editing', desc: 'Futuristic video edits, VFX, and post-production.' },
  { icon: '💻', title: 'Web Development', desc: 'Next-gen websites, apps, and digital experiences.' },
  { icon: '🎨', title: 'UI/UX', desc: 'Immersive, user-centric interface and experience design.' },
  { icon: '🧊', title: '3D Modeling', desc: 'Hyper-realistic 3D models for any purpose.' },
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
  { img: 'assets/artworks/1751730728330.png' },
  { img: 'assets/artworks/1751730728355.png' },
  { img: 'assets/artworks/1751730728374.png' },
  { img: 'assets/artworks/1751730728389.png' },
  { video: 'assets/annimations/final2.mp4' }
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
const isMobile = window.innerWidth <= 700;

const track = document.createElement('div');
track.className = 'projects-carousel-track';

// Render all cards in order, no infinite loop, for all devices
projects.forEach(p => {
  let media = '';
  let href = '';
  // Use mobile-optimized images/videos if available
  const imgSrc = isMobilePerf && p.imgMobile ? p.imgMobile : p.img;
  const videoSrc = isMobilePerf && p.videoMobile ? p.videoMobile : p.video;
  if (imgSrc) {
    media = `<div class='media-container'><img src="${imgSrc}" alt="Project Image" class="project-media" loading="lazy" /></div>`;
    href = imgSrc;
  } else if (videoSrc) {
    // Lazy-load video: initially no src, set data-src
    media = `<div class='media-container'><video data-src="${videoSrc}" class="project-media" autoplay loop muted playsinline preload="none"></video></div>`;
    href = videoSrc;
  }
  const card = document.createElement('div');
  card.className = 'futuristic-card';
  if (href) {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `${media}`;
    card.appendChild(link);
  } else {
    card.innerHTML = `${media}`;
  }
  track.appendChild(card);
});
projectsCarousel.appendChild(track);

// Add left/right arrow buttons for desktop/laptop only
if (!isMobile) {
  function getCardWidth() {
    const card = track.querySelector('.futuristic-card');
    return card ? card.offsetWidth + 32 : 320; // 32px gap
  }
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
}
// Remove arrows and scroll event logic

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

// After all cards are added to the DOM, set up lazy-load for videos
function setupVideoLazyLoad() {
  const videos = document.querySelectorAll('video[data-src]');
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          if (!video.src) {
            video.src = video.getAttribute('data-src');
            video.load();
          }
          observer.unobserve(video);
        }
      });
    }, { threshold: 0.2 });
    videos.forEach(video => videoObserver.observe(video));
  } else {
    // Fallback: load all videos
    videos.forEach(video => {
      video.src = video.getAttribute('data-src');
      video.load();
    });
  }
}
setupVideoLazyLoad();

// Contact Form (placeholder for Google Form integration)
// Show thank you message after Google Form submission via hidden iframe
const contactForm = document.getElementById('contact-form');
const hiddenIframe = document.getElementById('hidden_iframe');
const thankyouDiv = document.getElementById('contact-thankyou');
if (contactForm && hiddenIframe && thankyouDiv) {
  contactForm.addEventListener('submit', function() {
    hiddenIframe.onload = function() {
      contactForm.style.display = 'none';
      thankyouDiv.style.display = 'block';
      thankyouDiv.className = 'thankyou-message';
      thankyouDiv.innerHTML = 'Thank you for contacting us. We have received your message!';
      contactForm.reset();
      hiddenIframe.onload = null;
    };
  });
}
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

// Back to Top Button logic
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', function() {
  if (window.scrollY > 200) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});
if (backToTop) {
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Loading overlay for project media
const loadingOverlay = document.getElementById('loading-overlay');
function showLoading() {
  if (loadingOverlay) loadingOverlay.classList.add('active');
}
function hideLoading() {
  if (loadingOverlay) loadingOverlay.classList.remove('active');
}
function monitorProjectMediaLoading() {
  const mediaEls = document.querySelectorAll('.project-media');
  if (!mediaEls.length) return;
  let loadedCount = 0;
  showLoading();
  mediaEls.forEach(el => {
    if (el.tagName === 'IMG') {
      if (el.complete) {
        loadedCount++;
        if (loadedCount === mediaEls.length) hideLoading();
      } else {
        el.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === mediaEls.length) hideLoading();
        });
        el.addEventListener('error', () => {
          loadedCount++;
          if (loadedCount === mediaEls.length) hideLoading();
        });
      }
    } else if (el.tagName === 'VIDEO') {
      el.addEventListener('loadeddata', () => {
        loadedCount++;
        if (loadedCount === mediaEls.length) hideLoading();
      });
      el.addEventListener('error', () => {
        loadedCount++;
        if (loadedCount === mediaEls.length) hideLoading();
      });
    }
  });
}
window.addEventListener('DOMContentLoaded', monitorProjectMediaLoading);
// If projects are dynamically loaded, call monitorProjectMediaLoading() after rendering.

// Micro-interaction: scale up project card on hover (desktop only)
function addCardHoverEffect() {
  if (window.innerWidth > 700) {
    document.querySelectorAll('.futuristic-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.04)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}
window.addEventListener('DOMContentLoaded', addCardHoverEffect);
}); 