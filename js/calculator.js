/* =========================================================
   CALCULATOR.JS – apytikslės kainos skaičiuoklė
   Kainos surašytos objekte PRICES – pasikeitus kainoms,
   užtenka pataisyti tik čia (ir lentelę index.html faile).
   ========================================================= */

const PRICES = {
  sezonas: { min: 500, max: 700 },   // visa sodyba sezono metu, € parai
  nesezonas: { min: 400, max: 500 }, // visa sodyba ne sezono metu, € parai
  poilsis: 150,                      // poilsiui iki 10 žmonių, nuo € parai
  poilsisMinNights: 2,               // poilsio kaina galioja nuo 2 parų
  pirtis: 80,
  kubilas: 120
};

(function () {
  const form = document.getElementById("calculator");
  const seasonChoice = document.getElementById("seasonChoice");
  const nightsValue = document.getElementById("nightsValue");
  const totalEl = document.getElementById("calcTotal");
  const hintEl = document.getElementById("calcHint");

  const MAX_NIGHTS = 14;
  let nights = 1;

  // Suma su tarpu tarp tūkstančių, pvz. „1 400 €“
  function money(value) {
    return value.toLocaleString("lt-LT") + " €";
  }

  // Grąžina tekstą apie skaičiavimą – naudojamas ir užklausoje
  function calculate() {
    const purpose = form.purpose.value;
    const season = form.season.value;

    let extras = 0;
    if (form.pirtis.checked) extras += PRICES.pirtis;
    if (form.kubilas.checked) extras += PRICES.kubilas;

    if (purpose === "poilsis") {
      // Poilsiui mažiausiai dvi paros, laikotarpis nesvarbus
      if (nights < PRICES.poilsisMinNights) nights = PRICES.poilsisMinNights;
      seasonChoice.classList.add("is-disabled");

      const total = nights * PRICES.poilsis + extras;
      return {
        text: "nuo " + money(total),
        hint: "Kaina iki dešimties žmonių darbo dienomis. Atvykstant daugiau žmonių – kaina didesnė."
      };
    }

    seasonChoice.classList.remove("is-disabled");
    const range = PRICES[season];
    const min = nights * range.min + extras;
    const max = nights * range.max + extras;

    return {
      text: money(min) + "–" + money(max),
      hint: "Nuo pirmadienio iki ketvirtadienio kainos palankesnės. Šventinėmis dienomis – sutartinės."
    };
  }

  function update() {
    const result = calculate();
    nightsValue.textContent = nights;
    totalEl.textContent = result.text;
    hintEl.textContent = result.hint;
  }

  /* ---------- Parų skaičiaus mygtukai ---------- */
  document.getElementById("nightsMinus").addEventListener("click", function () {
    const min = form.purpose.value === "poilsis" ? PRICES.poilsisMinNights : 1;
    nights = Math.max(min, nights - 1);
    update();
  });

  document.getElementById("nightsPlus").addEventListener("click", function () {
    nights = Math.min(MAX_NIGHTS, nights + 1);
    update();
  });

  // Bet koks pasirinkimo pakeitimas perskaičiuoja sumą
  form.addEventListener("change", update);

  /* ---------- Perkėlimas į užklausos formą ---------- */
  document.getElementById("calcToForm").addEventListener("click", function () {
    const message = document.getElementById("inquiryMessage");
    const inquiry = document.getElementById("inquiryForm");
    const isRest = form.purpose.value === "poilsis";

    const lines = [
      "Tikslas: " + (isRest ? "poilsis" : "šventė"),
      isRest ? null : "Laikotarpis: " + (form.season.value === "sezonas" ? "sezono metu" : "ne sezono metu"),
      "Parų skaičius: " + nights,
      form.pirtis.checked ? "Norėtume pirties" : null,
      form.kubilas.checked ? "Norėtume kubilo" : null,
      "Skaičiuoklės suma: " + totalEl.textContent
    ].filter(Boolean);

    message.value = lines.join("\n");
    if (isRest) inquiry.proga.value = "Poilsis";

    document.getElementById("uzklausa").scrollIntoView({ behavior: "smooth" });
  });

  update();
})();
