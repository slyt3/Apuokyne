/* =========================================================
   SPACES.JS – interaktyvus erdvių sąrašas
   Užvedus pelę arba paspaudus pavadinimą keičiama nuotrauka.
   Nuotrauka nurodoma HTML atribute data-image.
   ========================================================= */

(function () {
  const items = document.querySelectorAll("#spacesList li");
  const image = document.getElementById("spaceImage");
  const caption = document.getElementById("spaceCaption");

  if (!items.length || !image) return;

  // Iš anksto įkeliame visas nuotraukas, kad keitimas būtų sklandus
  items.forEach(function (item) {
    const preload = new Image();
    preload.src = item.dataset.image;
  });

  function activate(item) {
    if (item.classList.contains("is-active")) return;

    items.forEach(function (el) {
      el.classList.remove("is-active");
    });
    item.classList.add("is-active");

    // Trumpam paslepiame, pakeičiame šaltinį ir vėl parodome
    image.classList.add("is-changing");
    setTimeout(function () {
      image.src = item.dataset.image;
      image.alt = item.dataset.alt;
      caption.textContent = item.querySelector(".space-name").textContent;
      image.classList.remove("is-changing");
    }, 250);
  }

  items.forEach(function (item) {
    const button = item.querySelector("button");

    button.addEventListener("click", function () {
      activate(item);
    });

    // Pelės užvedimas veikia tik kompiuteriuose
    if (window.matchMedia("(hover: hover)").matches) {
      button.addEventListener("mouseenter", function () {
        activate(item);
      });
    }
  });
})();
