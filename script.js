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
  { icon: '🚀', title: 'Other Projects', desc: 'Custom futuristic solutions for unique needs.' }
];
const servicesContainer = document.querySelector('.services-cards');
services.forEach(s => {
  const card = document.createElement('div');
  card.className = 'futuristic-card';
  card.innerHTML = `<div class="icon">${s.icon}</div><h3>${s.title}</h3><p>${s.desc}</p>`;
  servicesContainer.appendChild(card);
});

// Projects Cards Data (placeholders)
const projects = [
  { icon: '🎬', title: 'Animated Ad', desc: 'A mind-bending animated ad for a tech startup.' },
  { icon: '✂️', title: 'Music Video Edit', desc: 'A music video with cyberpunk VFX.' },
  { icon: '💻', title: 'Portfolio Website', desc: 'A glassmorphic, interactive portfolio.' },
  { icon: '🎨', title: 'App UI/UX', desc: 'A mobile app with holographic UI.' },
  { icon: '🧊', title: '3D Product Model', desc: 'A photorealistic 3D model for AR.' },
  { icon: '🚀', title: 'Custom Project', desc: 'A secret project for a futuristic brand.' }
];
const projectsContainer = document.querySelector('.projects-cards');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'futuristic-card';
  card.innerHTML = `<div class="icon">${p.icon}</div><h3>${p.title}</h3><p>${p.desc}</p>`;
  projectsContainer.appendChild(card);
});

// Contact Form (placeholder for Google Form integration)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Form submission will be connected to Google Forms soon!');
});
}); 