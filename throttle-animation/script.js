

const btn = document.querySelector("#throttle");

const throttleFunction = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
};

document.querySelector("#center").addEventListener(
  "mousemove",
  throttleFunction((dets) => {
    // Calculate mouse movement direction
    const mouseX = dets.clientX;
    const mouseY = dets.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // Create div and set its position based on mouse movement direction
    var div = document.createElement("div");
    div.classList.add("imagediv");
    div.style.left = mouseX + "px";
    div.style.top = mouseY + "px";

    // Function to add images to the array randomly
    function addImagesToArray(imageUrls) {
      var imageArray = [];
      for (var i = 0; i < 3; i++) {
        // Selecting 3 random images
        var randomIndex = Math.floor(Math.random() * imageUrls.length);
        var imageUrl = imageUrls[randomIndex];
        var image = new Image();
        image.setAttribute("src", imageUrl);
        imageArray.push(image);
      }
      return imageArray;
    }

    var urls = [
      "./assets/asset 13.jpeg",
      "./assets/asset 14.jpeg",
      "./assets/asset 15.jpeg",
      "./assets/asset 16.jpeg",
      "./assets/asset 17.jpeg",
      "./assets/asset 18.jpeg",
      "./assets/asset 19.jpeg",
      "./assets/asset 20.jpeg",
      "./assets/asset 21.jpeg",
      "./assets/asset 22.jpeg",
      "./assets/asset 23.jpeg",
      "./assets/asset 24.jpeg",
      "./assets/asset 25.jpeg",
      "./assets/asset 26.jpeg",
      "./assets/asset 27.jpeg",
      "./assets/asset 27.jpeg",
    ];
    var imageArray = addImagesToArray(urls);

    // Adding images to the div
    imageArray.forEach(function (image) {
      div.appendChild(image);
    });

    document.body.appendChild(div);

    // Animate div based on mouse movement direction
    gsap.to(div, {
      x: deltaX * 0.4, // Adjust the multiplier for the pop effect
      y: deltaY * 0.2, // Adjust the multiplier for the pop effect
      ease: "back.out(1.7)",
      duration: 0.6,
    });

    // Animate images based on mouse movement direction
    gsap.to(div.children, {
      x: 0,
      y: 0,
      // scale: 1.5, // Adjust the scale for the pop effect
      ease: Power1,
      duration: 0.6,
    });

    gsap.to(div.children, {
      x: "10%",
      y: "100%",
      scale: 1,
      delay: 0.6,
      ease: "back.out(1.7)",
    });

    setTimeout(function () {
      div.remove();
    }, 1500);
  }, 300)
);

//-------------------------------------------------------------------------------------------------------------------------------------


