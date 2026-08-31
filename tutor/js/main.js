(function () {
  const bar = document.querySelector(".bar");
  const nav = document.getElementById("nav");
  const menuBtn = document.querySelector(".menu-btn");
  const form = document.getElementById("booking-form");
  const status = document.getElementById("form-status");

  if (menuBtn && nav && bar) {
    menuBtn.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      bar.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
      menuBtn.textContent = open ? "Закрыть" : "Меню";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        bar.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Открыть меню");
        menuBtn.textContent = "Меню";
      });
    });
  }

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const contact = String(data.get("contact") || "").trim();

      status.classList.remove("is-ok", "is-error");

      if (!name || !contact) {
        status.textContent = "Пожалуйста, укажите имя и способ связи.";
        status.classList.add("is-error");
        return;
      }

      status.textContent = "Спасибо. Я свяжусь с вами в течение дня.";
      status.classList.add("is-ok");
      form.reset();
    });
  }
})();
