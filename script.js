const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");
const gifContainer = document.getElementById("gif-container");
const flipbook = document.getElementById("flipbook");
const replayBtn = document.getElementById("replay");

function startExperience() {
  // Reset state
  countdownEl.style.display = "block";
  countdownEl.style.opacity = "1";
  countdownEl.style.animation = "fadeInOut 1s ease-in-out forwards";
  messageEl.style.display = "none";
  gifContainer.style.display = "none";
  flipbook.style.display = "none";
  replayBtn.style.display = "none";
  document.querySelectorAll(".page").forEach((page, i) => {
    page.classList.remove("flipped");
    page.style.zIndex = 100 - i; // Unflipped: highest z-index for first page
  });

  let countdown = 5;
  countdownEl.textContent = countdown;

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownEl.textContent = countdown;
      countdownEl.style.animation = "";
      void countdownEl.offsetWidth;
      countdownEl.style.animation = "fadeInOut 1s ease-in-out forwards";
    } else {
      clearInterval(interval);
      countdownEl.style.display = "none";
      showMessages();
    }
  }, 1000);
}

function showMessages() {
  messageEl.style.display = "block";
  const texts = ["Happy", "Birthday", "To", "You"];
  let i = 0;

  function showNext() {
    if (i < texts.length) {
      messageEl.textContent = texts[i];
      messageEl.style.animation = "";
      void messageEl.offsetWidth;
      messageEl.style.animation = "fadeInOut 1.5s ease-in-out forwards";
      i++;
      setTimeout(() => {
        messageEl.textContent = "";
        setTimeout(showNext, 500);
      }, 1500);
    } else {
      messageEl.style.display = "none";
      showGif();
    }
  }
  showNext();
}

function showGif() {
  gifContainer.style.display = "block";
  setTimeout(() => {
    gifContainer.style.display = "none";
    showFlipbook();
  }, 4000);
}

function showFlipbook() {
  flipbook.style.display = "flex";
  const pages = document.querySelectorAll(".book .page");
  let currentPage = 0;

  function flipNextPage() {
    if (currentPage < pages.length) {
      pages[currentPage].style.transformOrigin = "left center";
      pages[currentPage].classList.add("flipped");
      pages[currentPage].style.zIndex = -100 - currentPage; // Flipped: lower z-index
      currentPage++;
      setTimeout(flipNextPage, 2000);
    } else {
      setTimeout(() => {
        replayBtn.style.display = "block";
      }, 500);
    }
  }

  pages.forEach((page, i) => {
    page.style.zIndex = 100 - i; // Initial z-index: first page on top
    page.addEventListener("click", () => {
      page.style.transformOrigin = "left center";
      page.classList.toggle("flipped");
      page.style.zIndex = page.classList.contains("flipped") ? -100 - i : 100 - i;
    });

    page.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === "Space") {
        e.preventDefault();
        page.style.transformOrigin = "left center";
        page.classList.toggle("flipped");
        page.style.zIndex = page.classList.contains("flipped") ? -100 - i : 100 - i;
      }
    });
  });

  setTimeout(flipNextPage, 1500);
}

replayBtn.addEventListener("click", startExperience);

// Start on load
startExperience();
