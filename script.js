document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const choiceArea = document.getElementById("choiceArea");
  const teaseText = document.getElementById("teaseText");
  const afterYes = document.getElementById("afterYes");
  const surpriseBtn = document.getElementById("surpriseBtn");
  const surprise = document.getElementById("surprise");
  const toast = document.getElementById("toast");
  const confettiLayer = document.getElementById("confettiLayer");

  const teaseMessages = [
    "Nice try. 😭",
    "That button suddenly got shy...",
    "Nope. Try again. 😂",
    "Are you REALLY sure?",
    "The website disagrees. 💀",
    "You know the correct answer. 👀"
  ];

  let teaseIndex = 0;
  let toastTimer;

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // NEW PAGE SWITCHING LOGIC:
document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    // 1. Find the section we are currently in and hide it
    const currentScreen = button.closest(".screen");
    if (currentScreen) {
      currentScreen.classList.remove("active");
    }

    // 2. Find the next section and show it
    const targetScreen = document.querySelector(button.dataset.scroll);
    if (targetScreen) {
      targetScreen.classList.add("active");
      // Scroll to the top just in case viewing on a small mobile screen
      window.scrollTo(0, 0); 
    }
  });
});


  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function moveNoButton() {
    const areaRect = choiceArea.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, areaRect.width - buttonRect.width);
    const maxY = Math.max(0, areaRect.height - buttonRect.height);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${Math.random() * maxX}px`;
    noBtn.style.top = `${Math.random() * maxY}px`;

    teaseText.textContent = teaseMessages[teaseIndex % teaseMessages.length];
    teaseIndex += 1;
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveNoButton();
  }, { passive: false });

  noBtn.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  // UPDATE YOUR yesBtn CLICK LISTENER:
yesBtn.addEventListener("click", () => {
  document.getElementById("question").classList.remove("active");
  afterYes.classList.add("active");
  createConfetti();
  showToast("I knew it! ❤️");
});


  surpriseBtn.addEventListener("click", () => {
    surprise.classList.remove("hidden");
    surpriseBtn.textContent = "Okay, now you know 😭❤️";
    surpriseBtn.disabled = true;
    surpriseBtn.style.opacity = "0.75";
    createConfetti();
  });

  function createFloatingHearts() {
    const container = document.querySelector(".bg-hearts");
    const symbols = ["♡", "♥", "✦", "·"];

    for (let i = 0; i < 18; i += 1) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.setProperty("--left", `${Math.random() * 100}%`);
      heart.style.setProperty("--size", `${12 + Math.random() * 22}px`);
      heart.style.setProperty("--duration", `${9 + Math.random() * 10}s`);
      heart.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(heart);
    }
  }

  function createConfetti() {
    const symbols = ["♥", "♡", "✦", "✧", "•"];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 34; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      piece.style.setProperty("--left", `${Math.random() * 100}%`);
      piece.style.setProperty("--size", `${10 + Math.random() * 18}px`);
      piece.style.animationDelay = `${Math.random() * 0.45}s`;
      fragment.appendChild(piece);
    }

    confettiLayer.appendChild(fragment);
    setTimeout(() => {
      confettiLayer.replaceChildren();
    }, 2400);
  }

  createFloatingHearts();
});
