const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");
let starsArray = [];
let numStars = 300;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

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
  y: 100,
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

document.addEventListener("DOMContentLoaded", function () {
  const projectLink = document.querySelector('nav a[href=".project"]');
  const projectsSection = document.getElementById("projects");

  projectLink.addEventListener("click", function (e) {
    e.preventDefault();
    projectsSection.scrollIntoView({ behavior: "smooth" });
  });
});

const aboutLink = document.querySelector('nav a[href=".center-part1"]');
const aboutSection = document.getElementById("center");

aboutLink.addEventListener("click", function (e) {
  e.preventDefault();
  aboutSection.scrollIntoView({ behavior: "smooth" });
});

const contactLink = document.querySelector('nav .part2 a[href=".social1"]');

const footer = document.getElementById("footer");

contactLink.addEventListener("click", function (event) {
  event.preventDefault();
  footer.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.from(".footer-container", {
    scrollTrigger: {
      trigger: ".footer-container",
      start: "top bottom",
      toggleActions: "play none none none",
    },
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const center = document.getElementById("center");

  // Function to toggle mobile menu and apply/remove blur
  function toggleMobileMenu() {
    mobileMenu.classList.toggle("show");
    if (mobileMenu.classList.contains("show")) {
      center.style.filter = "blur(8px)";
    } else {
      center.style.filter = "none";
    }
  }

  // Function to close mobile menu and remove blur
  function closeMobileMenu() {
    mobileMenu.classList.remove("show");
    center.style.filter = "none";
  }

  // Toggle mobile menu and blur effect on hamburger click
  hamburger.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking outside the menu area
  document.addEventListener("click", function (event) {
    if (
      mobileMenu.classList.contains("show") &&
      !mobileMenu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile menu when the user scrolls
  window.addEventListener("scroll", function () {
    if (mobileMenu.classList.contains("show")) {
      closeMobileMenu();
    }
  });

  // Smooth scroll to section and close mobile menu on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetSection = document.querySelector(this.getAttribute("href"));

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        closeMobileMenu();
      }
    });
  });
});
