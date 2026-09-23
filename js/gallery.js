/* =========================================================
   GALLERY.JS – galerija su filtrais ir peržiūros langu
   Norėdami pridėti nuotrauką:
     1. įkelkite ją į images/full (didelė) ir images/thumb (maža),
     2. pridėkite eilutę į sąrašą PHOTOS žemiau.
   Kategorijos: interjeras, aplinka, vakarai, ziema
   ========================================================= */

const PHOTOS = [
  { file: "namas-nuo-tvenkinio", cat: "aplinka", title: "Namas ir pavėsinė nuo tvenkinio" },
  { file: "pokyliu-sale", cat: "interjeras", title: "Pokylių salė" },
  { file: "saulelydis-pavesine", cat: "vakarai", title: "Saulėlydis prie pavėsinės" },
  { file: "sale-apvalus-stalas", cat: "interjeras", title: "Baltoji valgomojo erdvė" },
  { file: "ceremonija-arka", cat: "aplinka", title: "Arka ceremonijai prie kolonų" },
  { file: "ziema-saulelydis", cat: "ziema", title: "Žiemos saulėlydis iš terasos" },
  { file: "dekoras-zvakides", cat: "interjeras", title: "Žvakidės ir desertų stalas" },
  { file: "pavesine-naktis", cat: "vakarai", title: "Pavėsinė naktį" },
  { file: "is-virsaus", cat: "aplinka", title: "Sodyba iš viršaus" },
  { file: "svetaine-sijos", cat: "interjeras", title: "Svetainė su sijomis" },
  { file: "ziema-prieplauka", cat: "ziema", title: "Lieptas žiemos vakarą" },
  { file: "sukurine-vonia", cat: "aplinka", title: "Sūkurinė vonia terasoje" },
  { file: "lauzaviete-vakaras", cat: "vakarai", title: "Laužavietė prie vandens" },
  { file: "svetaine-vakaras", cat: "interjeras", title: "Didžioji svetainė" },
  { file: "ruduo-rausvas-dangus", cat: "aplinka", title: "Lieptas su gultais rudenį" },
  { file: "kambarys-uzuolaidos", cat: "interjeras", title: "Miegamasis" },
  { file: "saulelydis-teleskopas", cat: "vakarai", title: "Teleskopas prie pavėsinės" },
  { file: "ziema-balustrada", cat: "ziema", title: "Apsnigta terasa" },
  { file: "sale-stalas-svetaine", cat: "interjeras", title: "Vaišių stalas" },
  { file: "vasara-terasa-begonijos", cat: "aplinka", title: "Begonijos terasoje" },
  { file: "pusis-pavesine", cat: "vakarai", title: "Pušis ir švytinti pavėsinė" },
  { file: "zidinys", cat: "interjeras", title: "Prie židinio" },
  { file: "is-virsaus-arciau", cat: "aplinka", title: "Namas, pavėsinė ir lieptai" },
  { file: "dekoras-vaza", cat: "interjeras", title: "Interjero detalės" },
  { file: "terasa-vakaras", cat: "vakarai", title: "Terasa prie švytinčių langų" },
  { file: "pirtis", cat: "interjeras", title: "Pirtis" },
  { file: "virtuve-lentynos", cat: "interjeras", title: "Virtuvės lentynos" }
];

(function () {
  const grid = document.getElementById("galleryGrid");
  const filters = document.querySelectorAll("#galleryFilters button");

  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbCaption = document.getElementById("lbCaption");

  let visible = PHOTOS.slice(); // šiuo metu rodomos nuotraukos
  let currentIndex = 0;

  /* ---------- Tinklelio sukūrimas ---------- */
  PHOTOS.forEach(function (photo) {
    const btn = document.createElement("button");
    btn.className = "gallery-item";
    btn.type = "button";
    btn.dataset.cat = photo.cat;
    btn.setAttribute("aria-label", "Didinti: " + photo.title);
    btn.innerHTML =
      '<img src="images/thumb/' + photo.file + '.jpg" alt="' + photo.title + '" loading="lazy">';

    btn.addEventListener("click", function () {
      openLightbox(visible.indexOf(photo));
    });

    grid.appendChild(btn);
  });

  const items = grid.querySelectorAll(".gallery-item");
  const moreBtn = document.getElementById("galleryMore");

  const FIRST_COUNT = 12; // kiek nuotraukų rodoma iš pradžių skiltyje „Visos“
  let category = "visos";
  let expanded = false;

  /* ---------- Rodomų nuotraukų atnaujinimas ---------- */
  function render(animate) {
    const matching = PHOTOS.filter(function (p) {
      return category === "visos" || p.cat === category;
    });

    // Skiltyje „Visos“ iš pradžių rodome tik dalį
    const limit = category === "visos" && !expanded ? FIRST_COUNT : matching.length;
    visible = matching.slice(0, limit);

    items.forEach(function (item, i) {
      const show = visible.indexOf(PHOTOS[i]) !== -1;
      const wasHidden = item.classList.contains("is-hidden");
      item.classList.toggle("is-hidden", !show);

      // Įsirodymo animacija tik naujai parodytoms nuotraukoms
      item.classList.remove("is-entering");
      if (show && (animate || wasHidden)) {
        void item.offsetWidth;
        item.classList.add("is-entering");
      }
    });

    moreBtn.parentElement.hidden = visible.length === matching.length;
  }

  /* ---------- Filtrai ---------- */
  filters.forEach(function (filterBtn) {
    filterBtn.addEventListener("click", function () {
      category = filterBtn.dataset.filter;
      filters.forEach(function (b) {
        b.classList.toggle("is-active", b === filterBtn);
      });
      render(true);
    });
  });

  moreBtn.addEventListener("click", function () {
    expanded = true;
    render(false);
  });

  render(false);

  /* ---------- Peržiūros langas ---------- */
  function showPhoto(index) {
    currentIndex = (index + visible.length) % visible.length;
    const photo = visible[currentIndex];

    lbImage.classList.add("is-loading");
    lbImage.onload = function () {
      lbImage.classList.remove("is-loading");
    };
    lbImage.src = "images/full/" + photo.file + ".jpg";
    lbImage.alt = photo.title;
    lbCaption.textContent = photo.title;
  }

  function openLightbox(index) {
    showPhoto(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", function () {
    showPhoto(currentIndex - 1);
  });
  document.getElementById("lbNext").addEventListener("click", function () {
    showPhoto(currentIndex + 1);
  });

  // Paspaudus tamsų foną – uždarome
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("lightbox-figure")) {
      closeLightbox();
    }
  });

  // Klaviatūra: rodyklės ir Escape
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showPhoto(currentIndex + 1);
    if (e.key === "ArrowLeft") showPhoto(currentIndex - 1);
  });

  // Braukimas pirštu telefone
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", function (e) {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      showPhoto(currentIndex + (diff < 0 ? 1 : -1));
    }
  });
})();
