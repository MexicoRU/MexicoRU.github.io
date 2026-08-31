(function () {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = (data.get("name") || "").toString().trim();
    const service = data.get("service") || "";
    const date = data.get("date") || "удобный день";
    const text = encodeURIComponent(
      "Здравствуйте! Хочу записаться в Joy Style Nails.\nИмя: " +
        name +
        "\nУслуга: " +
        service +
        "\nДата: " +
        date
    );
    window.open("https://t.me/joystylenails?text=" + text, "_blank", "noopener");
  });

  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbCaption = document.getElementById("lbCaption");
  let index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    const btn = items[index];
    lbImage.src = btn.dataset.full;
    lbImage.alt = btn.querySelector("img").alt;
    lbCaption.textContent = btn.dataset.caption || "";
  }

  function open(i) {
    show(i);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lbImage.removeAttribute("src");
  }

  items.forEach(function (btn, i) {
    btn.addEventListener("click", function () { open(i); });
  });

  lightbox.querySelector(".lb-close").addEventListener("click", close);
  lightbox.querySelector(".lb-prev").addEventListener("click", function () { show(index - 1); });
  lightbox.querySelector(".lb-next").addEventListener("click", function () { show(index + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();
