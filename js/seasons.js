/* =========================================================
   SEASONS.JS – metų laikų skirtukai
   Mygtuko data-season turi sutapti su skydelio data-panel.
   ========================================================= */

(function () {
  const tabs = document.querySelectorAll("#seasonTabs button");
  const panels = document.querySelectorAll(".season-panel");

  function select(name) {
    tabs.forEach(function (tab) {
      tab.setAttribute("aria-selected", tab.dataset.season === name);
    });
    panels.forEach(function (panel) {
      panel.classList.toggle("is-active", panel.dataset.panel === name);
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () {
      select(tab.dataset.season);
    });

    // Rodyklėmis kairėn / dešinėn galima pereiti tarp skirtukų
    tab.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const step = e.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      next.focus();
      select(next.dataset.season);
    });
  });
})();
