// Futuristic Neon Particle Background
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.getElementById('bg-animation').appendChild(canvas);
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.home-section').offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function createParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      color: `hsl(${Math.random()*360},100%,60%)`
    });
  }
}
createParticles();
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 16;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Interactive 3D Model (Three.js)
const modelDiv = document.getElementById('3d-model');
const width = modelDiv.offsetWidth;
const height = modelDiv.offsetHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
modelDiv.appendChild(renderer.domElement);
// Neon Torus Knot
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 16);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x00ffe7,
  emissive: 0x00ffe7,
  metalness: 1,
  roughness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  transmission: 0.7,
  thickness: 0.5
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);
const light = new THREE.PointLight(0xff00cc, 2, 100);
light.position.set(5, 5, 5);
scene.add(light);
camera.position.z = 4;
function animate3D() {
  requestAnimationFrame(animate3D);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.012;
  renderer.render(scene, camera);
}
animate3D();
window.addEventListener('resize', () => {
  const w = modelDiv.offsetWidth;
  const h = modelDiv.offsetHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

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