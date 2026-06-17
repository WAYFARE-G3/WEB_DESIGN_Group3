(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const success = document.getElementById("form-success");
  const fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    phone: form.querySelector('[name="phone"]'),
    message: form.querySelector('[name="message"]'),
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
      phone: fields.phone.value.trim(),
      message: fields.message.value.trim(),
    };
    const errors = {};

    if (!values.name) errors.name = "Please enter your full name.";
    else if (values.name.length > 100) errors.name = "Name is too long.";

    if (!values.email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";

    if (values.phone && !/^[\d\s+()-]{6,20}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";

    if (!values.message) errors.message = "Tell us a little about your trip.";
    else if (values.message.length > 1000) errors.message = "Message is too long.";

    return errors;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => setError(key, ""));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = validate();

    Object.keys(fields).forEach((key) => setError(key, errors[key] || ""));

    if (Object.keys(errors).length === 0) {
      success.classList.add("show");
      form.reset();
    }
  });
})();
