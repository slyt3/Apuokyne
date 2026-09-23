/* =========================================================
   MAIN.JS – bendri dalykai visam puslapiui:
   antraštė slenkant, mobilus meniu, įsirodymo efektai,
   aktyvi meniu nuoroda, paralaksas ir mobili juosta
   ========================================================= */

(function () {
  // JavaScript veikia – nuimame atsarginę klasę
  document.documentElement.classList.remove("no-js");

  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const mobileBar = document.getElementById("mobileBar");
  const estateBg = document.querySelector(".estate-bg");
  const hero = document.querySelector(".hero");

  /* ---------- Antraštė ir mobili juosta slenkant ---------- */
  function onScroll() {
    const y = window.scrollY;

    // Antraštė gauna šviesų foną, kai praslenkame pradžią
    header.classList.toggle("is-scrolled", y > 60);

    // Mobili juosta rodoma tik praėjus pagrindinį vaizdą
    if (mobileBar) {
      mobileBar.classList.toggle("is-visible", y > hero.offsetHeight * 0.7);
    }

    // Lėtas fono judėjimas teritorijos sekcijoje.
    // Poslinkis skaičiuojamas nuo ekrano vidurio ir apribojamas,
    // kad fonas niekada neišlįstų už sekcijos kraštų.
    if (estateBg) {
      const rect = estateBg.parentElement.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const limit = rect.height * 0.1;
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.12;
        const clamped = Math.max(-limit, Math.min(limit, offset));
        estateBg.style.transform = "translateY(" + clamped + "px)";
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobilus meniu ---------- */
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.textContent = open ? "Uždaryti" : "Meniu";
  }

  menuToggle.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });

  // Paspaudus nuorodą meniu užsidaro
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  /* ---------- Įsirodymo efektai slenkant ---------- */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target); // rodome tik vieną kartą
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Aktyvi meniu nuoroda pagal matomą sekciją ---------- */
  const navLinks = nav.querySelectorAll("a");

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-current", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  navLinks.forEach(function (link) {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sectionObserver.observe(section);
  });

  /* ---------- Metai apačioje ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
