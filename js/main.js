(function () {
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobile = document.querySelector("[data-nav-mobile]");
  const page = document.body.dataset.page;

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector("[data-icon-menu]").classList.toggle("hidden", open);
      toggle.querySelector("[data-icon-close]").classList.toggle("hidden", !open);
    });

    mobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector("[data-icon-menu]").classList.remove("hidden");
        toggle.querySelector("[data-icon-close]").classList.add("hidden");
      });
    });
  }

  if (page) {
    document.querySelectorAll(`[data-nav-link="${page}"]`).forEach((el) => {
      el.classList.add("active");
    });
  }

  document.getElementById("footer-year").textContent = new Date().getFullYear();
})();
