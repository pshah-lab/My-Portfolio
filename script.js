const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");
let starsArray = [];
let numStars = 300;

// Adjust canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

// Star object
class Star {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.angle = Math.random() * 2 * Math.PI;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (
      this.x > canvas.width ||
      this.x < 0 ||
      this.y > canvas.height ||
      this.y < 0
    ) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }
}

const yearElement = document.getElementById("current-year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// Create stars
function createStars() {
  for (let i = 0; i < numStars; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 2;
    let speed = Math.random() * 0.5 + 0.2;
    starsArray.push(new Star(x, y, size, speed));
  }
}

// Animate stars
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  starsArray.forEach((star) => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

// Start animation
createStars();
animate();

// Adjust canvas size when window is resized
window.addEventListener("resize", resizeCanvas);

var tl = gsap.timeline();

tl.from("nav h1,nav a,nav button", {
  y: -30,
  opacity: 0,
  delay: 0.5,
  duration: 0.5,
  stagger: 0.1,
});

gsap.from(".center-part1", {
  opacity: 0,
  delay: 1,
  duration: 0.8,
});

tl.from(".center-part2 img", {
  y: 50,
  opacity: 0,
  duration: 0.6,
});

window.addEventListener("wheel", function (dets) {
  if (dets.deltaY > 0) {
    gsap.to(".marque", {
      transform: "translateX(-400%)",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".marque img", {
      rotate: 360,
    });
  } else {
    gsap.to(".marque", {
      transform: "translateX(100%)",
      repeat: -1,
      duration: 8,
      ease: "none",
    });
    gsap.to(".marque img", {
      rotate: 0,
    });
  }
});

var cursor = document.querySelector("#cursor");
window.addEventListener("mousemove", function (dets) {
  gsap.to(cursor, {
    x: dets.x,
    y: dets.y,
    duration: 0.6,
  });
});

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
