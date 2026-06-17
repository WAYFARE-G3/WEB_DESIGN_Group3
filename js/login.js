(function () {
  const form = document.getElementById("login-form");
  if (!form) return;

  const success = document.getElementById("form-success");
  const fields = {
    email: form.querySelector('[name="email"]'),
    password: form.querySelector('[name="password"]'),
  };

  function setError(name, msg) {
    const el = form.querySelector(`[data-error="${name}"]`);
    if (el) el.textContent = msg || "";
    if (fields[name]) {
      fields[name].classList.toggle("error", Boolean(msg));
      fields[name].classList.toggle("is-invalid", Boolean(msg));
    }
  }

  function validate() {
    const values = {
      email: fields.email.value.trim(),
      password: fields.password.value,
    };
    const errors = {};

    if (!values.email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";

    if (!values.password) errors.password = "Password is required.";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters.";

    return errors;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => setError(key, ""));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    success.classList.remove("show");
    const errors = validate();

    Object.keys(fields).forEach((key) => setError(key, errors[key] || ""));

    if (Object.keys(errors).length === 0) {
      success.classList.add("show");
      form.reset();
    }
  });
})();
