document.addEventListener("DOMContentLoaded", () => {

  /* ========================================
     CONFIG
  ======================================== */

  // Change your password here
  const SECRET_PASSWORD = "forever";


  /* ========================================
     ELEMENTS
  ======================================== */

  const screens =
    document.querySelectorAll(".screen");

  const passwordForm =
    document.getElementById("passwordForm");

  const passwordInput =
    document.getElementById("passwordInput");

  const passwordMessage =
    document.getElementById("passwordMessage");

  const yesBtn =
    document.getElementById("yesBtn");

  const noBtn =
    document.getElementById("noBtn");

  const choiceArea =
    document.getElementById("choiceArea");

  const teaseText =
    document.getElementById("teaseText");

  const surpriseBtn =
    document.getElementById("surpriseBtn");

  const surprise =
    document.getElementById("surprise");

  const restartBtn =
    document.getElementById("restartBtn");

  const toast =
    document.getElementById("toast");

  const confettiLayer =
    document.getElementById("confettiLayer");

  const bgHearts =
    document.querySelector(".bg-hearts");


  /* ========================================
     STATE
  ======================================== */

  let teaseIndex = 0;

  let toastTimer = null;

  let currentScreen =
    "passwordScreen";


  const teaseMessages = [
    "Nice try. 😭",
    "That button suddenly got shy...",
    "Nope. Try again. 😂",
    "Are you REALLY sure?",
    "The website disagrees. 💀",
    "You know the correct answer. 👀",
    "Why are you doing this to me? 😭❤️"
  ];


  /* ========================================
     HELPERS
  ======================================== */

  function showScreen(id) {

    const target =
      document.getElementById(id);

    if (!target) return;

    const current =
      document.getElementById(currentScreen);

    if (current === target) return;


    /*
      Hide current screen.
      Show only the requested screen.
    */

    if (current) {
      current.classList.remove("active");
    }

    target.classList.remove("active");

    /*
      Force browser to notice animation
      when returning to a previously visited page.
    */

    void target.offsetWidth;

    target.classList.add("active");

    currentScreen = id;


    /*
      Keep the page at the top.

      Future screens are NOT in the
      visible document flow because
      display:none is used.
    */

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  }


  function showToast(message) {

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer =
      setTimeout(() => {
        toast.classList.remove("show");
      }, 1800);
  }


  /* ========================================
     PASSWORD
  ======================================== */

  passwordForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const entered =
        passwordInput.value.trim();

      if (!entered) {

        passwordMessage.textContent =
          "You forgot the password already? 😭❤️";

        passwordMessage.className =
          "password-hint error";

        passwordInput.focus();

        return;
      }


      if (
        entered.toLowerCase() ===
        SECRET_PASSWORD.toLowerCase()
      ) {

        passwordMessage.textContent =
          "Access granted. Welcome ❤️";

        passwordMessage.className =
          "password-hint success";

        createConfetti();

        showToast(
          "Secret unlocked ❤️"
        );


        setTimeout(() => {

          showScreen("home");

        }, 650);

      } else {

        passwordMessage.textContent =
          "Hmm... that's not it. Try again 😏❤️";

        passwordMessage.className =
          "password-hint error";

        passwordInput.value = "";

        passwordInput.focus();

        /*
          Small vibration on supported phones.
        */

        if (
          "vibrate" in navigator
        ) {
          navigator.vibrate(80);
        }
      }
    }
  );


  /* ========================================
     NORMAL NEXT BUTTONS
  ======================================== */

  document
    .querySelectorAll("[data-next]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const next =
            button.dataset.next;

          showScreen(next);

        }
      );

    });


  /* ========================================
     NO BUTTON
  ======================================== */

  function moveNoButton() {

    if (!choiceArea || !noBtn) {
      return;
    }


    const areaRect =
      choiceArea.getBoundingClientRect();

    const buttonRect =
      noBtn.getBoundingClientRect();


    const maxX =
      Math.max(
        0,
        areaRect.width -
        buttonRect.width
      );

    const maxY =
      Math.max(
        0,
        areaRect.height -
        buttonRect.height
      );


    noBtn.style.position =
      "absolute";


    noBtn.style.left =
      `${Math.random() * maxX}px`;


    noBtn.style.top =
      `${Math.random() * maxY}px`;


    teaseText.textContent =
      teaseMessages[
        teaseIndex %
        teaseMessages.length
      ];


    teaseIndex++;
  }


  /*
    Desktop:
    Move when mouse gets close.
  */

  noBtn.addEventListener(
    "mouseenter",
    moveNoButton
  );


  /*
    Mobile:
    Move on touch.
  */

  noBtn.addEventListener(
    "touchstart",
    (event) => {

      event.preventDefault();

      moveNoButton();

    },
    {
      passive: false
    }
  );


  /*
    Extra fallback.
  */

  noBtn.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      moveNoButton();

    }
  );


  /* ========================================
     YES BUTTON
  ======================================== */

  yesBtn.addEventListener(
    "click",
    () => {

      createConfetti();

      showToast(
        "I knew it! ❤️"
      );

      setTimeout(() => {

        showScreen("afterYes");

      }, 450);

    }
  );


  /* ========================================
     SURPRISE
  ======================================== */

  surpriseBtn.addEventListener(
    "click",
    () => {

      if (
        surprise.classList.contains("show")
      ) {
        return;
      }


      surprise.classList.add("show");

      surprise.setAttribute(
        "aria-hidden",
        "false"
      );


      surpriseBtn.textContent =
        "Okay... now you know 😭❤️";


      surpriseBtn.disabled = true;

      surpriseBtn.style.opacity =
        "0.72";


      createConfetti();

      showToast(
        "Surprise unlocked 💖"
      );

    }
  );


  /* ========================================
     RESTART
  ======================================== */

  restartBtn.addEventListener(
    "click",
    () => {

      /*
        Reset password.
      */

      passwordInput.value = "";

      passwordMessage.textContent =
        "Hint: it's something only we know. ❤️";

      passwordMessage.className =
        "password-hint";


      /*
        Reset surprise.
      */

      surprise.classList.remove("show");

      surprise.setAttribute(
        "aria-hidden",
        "true"
      );


      surpriseBtn.textContent =
        "Open your surprise 💌";


      surpriseBtn.disabled = false;

      surpriseBtn.style.opacity =
        "1";


      /*
        Reset No button.
      */

      noBtn.style.position =
        "relative";

      noBtn.style.left = "";

      noBtn.style.top = "";


      teaseText.textContent = "";

      teaseIndex = 0;


      /*
        Return to password.
      */

      showScreen("passwordScreen");

      showToast(
        "Starting from the beginning 💗"
      );

    }
  );


  /* ========================================
     FLOATING HEARTS
  ======================================== */

  function createFloatingHearts() {

    if (!bgHearts) return;


    const symbols = [
      "♡",
      "♥",
      "❤",
      "✦",
      "·"
    ];


    const fragment =
      document.createDocumentFragment();


    for (
      let i = 0;
      i < 20;
      i++
    ) {

      const heart =
        document.createElement("span");


      heart.className =
        "floating-heart";


      heart.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];


      heart.style.setProperty(
        "--left",
        `${Math.random() * 100}%`
      );


      heart.style.setProperty(
        "--size",
        `${12 + Math.random() * 23}px`
      );


      heart.style.setProperty(
        "--duration",
        `${9 + Math.random() * 10}s`
      );


      heart.style.animationDelay =
        `${Math.random() * 10}s`;


      fragment.appendChild(heart);

    }


    bgHearts.appendChild(
      fragment
    );
  }


  /* ========================================
     CONFETTI / HEART BURST
  ======================================== */

  function createConfetti() {

    if (!confettiLayer) {
      return;
    }


    const symbols = [
      "♥",
      "♡",
      "💗",
      "💖",
      "✦",
      "✧",
      "•"
    ];


    const fragment =
      document.createDocumentFragment();


    for (
      let i = 0;
      i < 42;
      i++
    ) {

      const piece =
        document.createElement("span");


      piece.className =
        "confetti-piece";


      piece.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];


      piece.style.setProperty(
        "--left",
        `${Math.random() * 100}%`
      );


      piece.style.setProperty(
        "--size",
        `${10 + Math.random() * 18}px`
      );


      piece.style.animationDelay =
        `${Math.random() * 0.5}s`;


      fragment.appendChild(
        piece
      );

    }


    confettiLayer.appendChild(
      fragment
    );


    setTimeout(() => {

      confettiLayer.replaceChildren();

    }, 2500);

  }


  /* ========================================
     INITIALIZE
  ======================================== */

  createFloatingHearts();

});