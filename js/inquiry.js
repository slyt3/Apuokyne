/* =========================================================
   INQUIRY.JS – užklausos forma
   Serverio nereikia: užpildžius formą atidaroma el. pašto
   programa su paruoštu laišku sodybos šeimininkei.
   ========================================================= */

(function () {
  const EMAIL = "lina.apuokiene@gmail.com";

  const form = document.getElementById("inquiryForm");
  const errorEl = document.getElementById("formError");
  const successEl = document.getElementById("formSuccess");

  // Išvykimo data negali būti ankstesnė už atvykimo
  const today = new Date().toISOString().split("T")[0];
  form.atvykimas.min = today;
  form.isvykimas.min = today;

  form.atvykimas.addEventListener("change", function () {
    form.isvykimas.min = form.atvykimas.value || today;
    if (form.isvykimas.value && form.isvykimas.value < form.atvykimas.value) {
      form.isvykimas.value = "";
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Tikriname privalomus laukus
    const required = [form.vardas, form.telefonas, form.atvykimas, form.isvykimas];
    let valid = true;

    required.forEach(function (input) {
      const empty = !input.value.trim();
      input.closest(".field").classList.toggle("has-error", empty);
      if (empty) valid = false;
    });

    errorEl.hidden = valid;
    if (!valid) return;

    // Sudedame laiško tekstą
    const body = [
      "Laba diena,",
      "",
      "norėčiau pasiteirauti dėl sodybos nuomos.",
      "",
      "Proga: " + form.proga.value,
      "Atvykimas: " + form.atvykimas.value,
      "Išvykimas: " + form.isvykimas.value,
      form.sveciai.value ? "Svečių skaičius: " + form.sveciai.value : null,
      "",
      form.zinute.value.trim() || null,
      "",
      form.vardas.value.trim(),
      form.telefonas.value.trim()
    ]
      .filter(function (line) { return line !== null; })
      .join("\n");

    const subject = "Užklausa: " + form.proga.value + ", " + form.atvykimas.value;

    window.location.href =
      "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    successEl.hidden = false;
  });

  // Pradėjus rašyti klaidos žymė dingsta
  form.addEventListener("input", function (e) {
    const field = e.target.closest(".field");
    if (field && e.target.value.trim()) field.classList.remove("has-error");
  });
})();
