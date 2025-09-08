// Matrix Effect (RED)
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgb(255, 50, 50)";
  ctx.font = fontSize + "px monospace";
  ctx.shadowColor = "red";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 35);

// Countdown → Messages → Video → Flipbook
const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");
const videoEl = document.getElementById("birthday-video");

let countdown = 3;
countdownEl.textContent = countdown;

const interval = setInterval(() => {
  countdown--;
  if (countdown > 0) {
    countdownEl.textContent = countdown;
  } else {
    clearInterval(interval);
    countdownEl.textContent = "";
    showMessages();
  }
}, 1000);

function showMessages() {
  const texts = ["Happy", "Birthday", "To", "You"];
  let i = 0;

  const showNext = () => {
    if (i < texts.length) {
      messageEl.textContent = texts[i];
      i++;
      setTimeout(() => {
        messageEl.textContent = "";
        setTimeout(showNext, 500);
      }, 1500);
    } else {
      showVideo();
    }
  };
  showNext();
}

function showVideo() {
  videoEl.style.display = "block";
  setTimeout(() => {
    videoEl.style.display = "none";
    showFlipbook();
  }, 3000);
}

function showFlipbook() {
  const flipbook = document.getElementById("flipbook");
  flipbook.style.display = "block";

  const pages = document.querySelectorAll(".page");
  pages.forEach((page, i) => {
    setTimeout(() => {
      page.classList.add("flipped");
    }, i * 2000);
  });
}
