(function () {
  const form = document.getElementById("register-form");
  if (!form) return;

  const success = document.getElementById("form-success");
  const termsCheckbox = form.querySelector('[name="terms"]');
  const fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    password: form.querySelector('[name="password"]'),
    confirmPassword: form.querySelector('[name="confirmPassword"]'),
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
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      password: fields.password.value,
      confirmPassword: fields.confirmPassword.value,
    };
    const errors = {};

    if (!values.name) errors.name = "Please enter your full name.";
    else if (values.name.length > 100) errors.name = "Name is too long.";

    if (!values.email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";

    if (!values.password) errors.password = "Password is required.";
    else if (values.password.length < 8) errors.password = "Password must be at least 8 characters.";

    if (!values.confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match.";

    if (!termsCheckbox.checked) errors.terms = "You must accept the terms to continue.";

    return errors;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => setError(key, ""));
  });

  termsCheckbox.addEventListener("change", () => setError("terms", ""));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    success.classList.remove("show");
    const errors = validate();

    Object.keys(fields).forEach((key) => setError(key, errors[key] || ""));
    setError("terms", errors.terms || "");

    if (Object.keys(errors).length === 0) {
      success.classList.add("show");
      form.reset();
    }
  });
})();
