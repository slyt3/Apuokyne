/* =========================================================
   HERO.JS – pagrindinio vaizdo skaidrės
   Skaidrės keičiasi automatiškai, o paspaudus pavadinimą
   rodoma pasirinkta nuotrauka.
   ========================================================= */

(function () {
  const slides = document.querySelectorAll(".hero-slide");
  const buttons = document.querySelectorAll("#heroCaptions button");
  const progress = document.getElementById("heroProgress");

  const DURATION = 7000; // kiek milisekundžių rodoma viena skaidrė
  let current = 0;
  let timer = null;

  if (slides.length < 2) return;

  // Parodo skaidrę pagal eilės vietą
  function show(index) {
    slides[current].classList.remove("is-active");
    buttons[current].classList.remove("is-active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("is-active");
    buttons[current].classList.add("is-active");

    restartProgress();
  }

  // Perpaleidžia juostelę, rodančią laiką iki kitos skaidrės
  function restartProgress() {
    if (!progress) return;
    progress.style.transition = "none";
    progress.style.width = "0";
    // priverčiame naršyklę pritaikyti pradinę būseną
    void progress.offsetWidth;
    progress.style.transition = "width " + DURATION + "ms linear";
    progress.style.width = "100%";
  }

  function start() {
    clearInterval(timer);
    timer = setInterval(function () {
      show(current + 1);
    }, DURATION);
  }

  // Paspaudus pavadinimą – rodome tą skaidrę ir laikas skaičiuojamas iš naujo
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      show(Number(btn.dataset.slide));
      start();
    });
  });

  // Kai skirtukas nematomas – sustabdome, kad nekrautų procesoriaus
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) clearInterval(timer);
    else start();
  });

  restartProgress();
  start();
})();
