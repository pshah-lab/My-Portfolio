window.addEventListener("load", function () {
  // Hide the loader and display content
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";
});

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("starsCanvas");
  const ctx = canvas.getContext("2d");
  let starsArray = [];
  let numStars;
  let starBrightness;
  
  if (window.innerWidth <= 430) {
    numStars = 100;
    starBrightness = 0.3;
  } else if (window.innerWidth <= 480) {
    numStars = 150;
    starBrightness = 0.5;
  } else if (window.innerWidth <= 568) {
    numStars = 200;
    starBrightness = 0.5;
  } else {
    numStars = 300; // Default for larger screens
    starBrightness = 1; // Default brightness
  }

  // Resize canvas to fit screen
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
      this.opacity = starBrightness; // Set opacity based on screen size
      this.angle = Math.random() * 2 * Math.PI;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Adjust brightness with opacity
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Reposition star when it goes off-screen
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

  // Create stars based on screen size
  function createStars() {
    starsArray = [];
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

  // Initial star creation and animation start
  createStars();
  animate();

  // Recreate stars on window resize
  window.addEventListener("resize", function () {
    resizeCanvas();
    numStars = window.innerWidth <= 430 ? 100 : 300; // Adjust quantity on resize
    starBrightness = window.innerWidth <= 430 ? 0.3 : 1; // Adjust brightness on resize
    createStars();
  });
});

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




function isInAppBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return userAgent.includes("Instagram") || userAgent.includes("LinkedIn");
}

if (isInAppBrowser()) {
  // Show a prompt to the user
  const promptDiv = document.createElement("div");
  promptDiv.style.position = "fixed";
  promptDiv.style.top = "0";
  promptDiv.style.left = "0";
  promptDiv.style.width = "100%";
  promptDiv.style.height = "100%";
  promptDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  promptDiv.style.color = "#fff";
  promptDiv.style.display = "flex";
  promptDiv.style.flexDirection = "column";
  promptDiv.style.justifyContent = "center";
  promptDiv.style.alignItems = "center";
  promptDiv.style.zIndex = "10000";

  // Message content
  promptDiv.innerHTML = `
    <div style="text-align: center; max-width: 90%; padding: 20px;">
      <h2 style="font-size: 24px; margin-bottom: 16px;">Open in a Browser</h2>
      <p style="font-size: 18px; margin-bottom: 24px;">
        For the best experience, please open this link in <strong>Chrome</strong>, <strong>Safari</strong>, or any other browser.
      </p>
      <button style="
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      " id="open-browser-btn">Open in Browser</button>
    </div>
  `;

  document.body.appendChild(promptDiv);

  // Button action to redirect to the browser
  document.getElementById("open-browser-btn").addEventListener("click", () => {
    const url = window.location.href;

    // Android: Use `intent:` scheme to suggest opening in a browser
    if (/android/i.test(navigator.userAgent)) {
      window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
    }
    // iOS: Cannot directly control opening but suggest opening in Safari
    else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      alert("Please tap the share button and select 'Open in Safari' to continue.");
    } else {
      // Fallback for other devices: Open in the same browser (limited)
      window.open(url, "_blank");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-video");

  if (video) {
    video.removeAttribute("controls");
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    video.addEventListener("pause", () => {
      video.play(); // Prevent pausing
    });

    video.play().catch((error) => {
      console.warn("Video autoplay failed:", error);
    });
  }
});

// Function to detect if the device is a mobile browser
function isMobileBrowser() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Function to detect if the user is in an in-app browser
function isInAppBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return userAgent.includes("Instagram") || userAgent.includes("LinkedIn");
}

// Show a one-time popup on mobile browsers or in-app browsers
(function showPopupOnce() {
  const popupShown = localStorage.getItem("popupShown");
  const popup = document.getElementById("mobile-popup");

  // Check conditions for showing the popup
  if (!popupShown && (isMobileBrowser() || isInAppBrowser())) {
    popup.style.display = "flex";

    // Close button action
    document.getElementById("popup-close-btn").addEventListener("click", function () {
      popup.style.display = "none";
      localStorage.setItem("popupShown", "true"); // Save state to localStorage
    });
  }
})();