let time = 10;
const timer = document.getElementById("timer");
const messageCard = document.getElementById("messageCard");
const typingEl = document.getElementById("typing");
const titleText = "Happy Birthday";
let titleIndex = 0;

const interval = setInterval(() => {
  timer.innerText = time;

  if (time <= 3) {
    timer.style.color = "red";
    timer.style.transform = "scale(1.3)";
  }

  if (time === 0) {
    clearInterval(interval);
    start();
    return;
  }

  time--;
}, 1000);

function start() {
  timer.style.display = "none";
  messageCard.classList.add("show");

  setTimeout(typeText, 300);
  balloons();
  startParticles();
  startConfetti();
  startFireworks();
}

function typeText() {
  if (titleIndex === 0) {
    typingEl.innerHTML =
      '<span>🎉 </span><span class="title-gradient" id="gradientText"></span><span> 🎂</span>';
  }

  const gradientText = document.getElementById("gradientText");

  if (titleIndex < titleText.length) {
    gradientText.textContent += titleText.charAt(titleIndex);
    titleIndex++;
    setTimeout(typeText, 80);
  }
}

function balloons() {
  setInterval(() => {
    const b = document.createElement("div");
    b.className = "balloon";

    const emojis = ["🎈", "💖", "🎉", "🎂", "✨", "🎊"];
    b.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    b.style.left = Math.random() * 100 + "vw";
    b.style.animationDuration = 3 + Math.random() * 3 + "s";

    document.body.appendChild(b);
    setTimeout(() => b.remove(), 7000);
  }, 250);
}

const c = document.getElementById("confetti");
const ctx = c.getContext("2d");

function resize() {
  c.width = innerWidth;
  c.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

const parts = [];

function add() {
  parts.push({
    x: Math.random() * c.width,
    y: -10,
    s: Math.random() * 6 + 3,
    v: Math.random() * 3 + 2,
    c: `hsl(${Math.random() * 360},100%,50%)`,
  });
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  parts.forEach((p, i) => {
    p.y += p.v;
    ctx.fillStyle = p.c;
    ctx.fillRect(p.x, p.y, p.s, p.s);

    if (p.y > c.height) parts.splice(i, 1);
  });

  requestAnimationFrame(draw);
}

function startConfetti() {
  setInterval(add, 60);
  draw();
}

const pc = document.getElementById("particleCanvas");
const pctx = pc.getContext("2d");

function resizeP() {
  pc.width = innerWidth;
  pc.height = innerHeight;
}
resizeP();
window.addEventListener("resize", resizeP);

const dots = [];

for (let i = 0; i < 80; i++) {
  dots.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 3 + 1,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5,
  });
}

function animateParticles() {
  pctx.clearRect(0, 0, pc.width, pc.height);

  dots.forEach((d) => {
    d.x += d.dx;
    d.y += d.dy;

    if (d.x < 0 || d.x > pc.width) d.dx *= -1;
    if (d.y < 0 || d.y > pc.height) d.dy *= -1;

    pctx.beginPath();
    pctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    pctx.fillStyle = "rgba(255,255,255,0.5)";
    pctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

function startParticles() {
  animateParticles();
}

const f = document.getElementById("fireworks");
const fctx = f.getContext("2d");

function resizeF() {
  f.width = innerWidth;
  f.height = innerHeight;
}
resizeF();
window.addEventListener("resize", resizeF);

const fire = [];

function boom(x, y) {
  const colors = [
    "#ff0040",
    "#ffcc00",
    "#00e5ff",
    "#7cff00",
    "#ff00ff",
    "#ff6600",
  ];

  for (let i = 0; i < 80; i++) {
    fire.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 6 + 2,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

function drawFire() {
  fctx.fillStyle = "rgba(0,0,0,0.15)";
  fctx.fillRect(0, 0, f.width, f.height);

  fire.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.015;

    fctx.beginPath();
    fctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    fctx.fillStyle = p.color;
    fctx.globalAlpha = p.alpha;
    fctx.fill();
    fctx.globalAlpha = 1;

    if (p.alpha <= 0) fire.splice(i, 1);
  });

  requestAnimationFrame(drawFire);
}

function startFireworks() {
  setInterval(() => {
    boom(Math.random() * f.width, (Math.random() * f.height) / 2);
  }, 500);

  drawFire();
}
