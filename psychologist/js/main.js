(function () {
  const header = document.querySelector(".header");
  const nav = document.getElementById("nav");
  const menuBtn = document.querySelector(".menu-btn");
  const form = document.getElementById("booking-form");
  const status = document.getElementById("form-status");

  if (menuBtn && nav && header) {
    menuBtn.addEventListener("click", function () {
      const open = header.classList.toggle("is-open");
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Открыть меню");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
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
