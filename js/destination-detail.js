(function () {
  const root = document.getElementById("dest-detail-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const tourId = params.get("id");

  if (!tourId) {
    showError("No tour ID provided.", "Please go back to the tours page and select a tour.");
    return;
  }

  async function loadTourDetails() {
    try {
      root.innerHTML = `
        <div class="container py-5 text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-secondary mt-3">Fetching tour details…</p>
        </div>`;

      const result = await apiGet(`/tours/${tourId}`);
      
      if (!result.success) {
        // Fallback to static data for demonstration if API fails or tour not found in DB
        // This is useful if the database isn't fully populated with the static IDs
        const staticTour = destinations.find(d => d.id === tourId);
        if (staticTour) {
           renderTourDetails(staticTour);
           return;
        }
        throw new Error(result.error || "Tour not found.");
      }

      renderTourDetails(result.data);
    } catch (error) {
      console.error("Error loading tour details:", error);
      showError("Tour not found", "We couldn't find the tour you're looking for. It might have been removed or the ID is incorrect.");
    }
  }

  function showError(title, message) {
    document.title = "Not Found — Wayfare";
    root.innerHTML = `
      <section class="container py-5 text-center">
        <h1>${title}</h1>
        <p class="text-secondary">${message}</p>
        <a href="tours.html" class="btn-cta btn-cta--sm mt-3">View all tours</a>
      </section>`;
  }

  function renderTourDetails(tour) {
    // Map API fields to UI expected fields if they differ slightly
    const data = {
        name: tour.title || tour.name,
        image: tour.imageUrl || tour.image || "assets/placeholder-tour.jpg",
        style: tour.category?.name || tour.style || "Adventure",
        region: tour.destination?.name || tour.region || "Vietnam",
        country: tour.destination?.name || tour.country || "Vietnam",
        rating: tour.averageRating ? parseFloat(tour.averageRating) : (tour.rating || 5.0),
        longDescription: tour.description || tour.longDescription,
        price: tour.price,
        bestTime: tour.bestTime || "Year-round",
        duration: tour.duration || `${tour.durationDays} days`,
        highlights: tour.highlights || ["Breathtaking views", "Local culture", "Professional guide", "Transportation included"],
        id: tour.id
    };

    document.title = `${data.name} — Wayfare`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = data.longDescription;

    // Use static destinations for "related" if available
    const relatedList = destinations.filter((d) => d.id !== data.id).slice(0, 3);

    root.innerHTML = `
    <section class="dest-detail-hero">
      <img src="${data.image}" alt="${data.name}" class="dest-detail-hero__img">
      <div class="dest-detail-hero__overlay"></div>
      <div class="container dest-detail-hero__content">
        <a href="tours.html" class="dest-detail__back">
          <svg class="icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to Tours
        </a>
        <div class="dest-detail-hero__tags">
          <span class="dest-detail__tag">${data.style}</span>
          <span class="dest-detail__tag">${data.region}</span>
        </div>
        <h1>${data.name}</h1>
        <div class="dest-detail-hero__meta">
          <span class="dest-detail-hero__location">
            <svg class="icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            ${data.country}
          </span>
          ${renderStars(data.rating)}
        </div>
      </div>
    </section>

    <section class="container dest-detail">
      <div class="dest-detail__main">
        <div class="dest-detail__block">
          <h2>Overview</h2>
          <p class="dest-detail__lead">${data.longDescription}</p>
        </div>

        <div class="dest-detail__stats">
          <div class="dest-detail__stat">
            <span class="dest-detail__stat-label">Best time to visit</span>
            <span class="dest-detail__stat-value">${data.bestTime}</span>
          </div>
          <div class="dest-detail__stat">
            <span class="dest-detail__stat-label">Suggested duration</span>
            <span class="dest-detail__stat-value">${data.duration}</span>
          </div>
          <div class="dest-detail__stat">
            <span class="dest-detail__stat-label">Starting from</span>
            <span class="dest-detail__stat-value dest-detail__stat-value--price">${formatDisplayPrice(data.price)}</span>
          </div>
        </div>

        <div class="dest-detail__block">
          <h2>Highlights</h2>
          <ul class="dest-detail__highlights">
            ${data.highlights.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>

        ${
          relatedList.length
            ? `
        <div class="dest-detail__block">
          <h2>You may also like</h2>
          <div class="dest-detail__related">
            ${relatedList
              .map(
                (d) => `
              <a href="destination-detail.html?id=${d.id}" class="dest-detail__related-card card-surface img-zoom">
                <img src="${d.image}" alt="${d.name}" loading="lazy">
                <div class="dest-detail__related-body">
                  <span class="dest-detail__related-meta">${d.country}</span>
                  <h3>${d.name}</h3>
                  <span class="dest-detail__related-price">from ${formatDisplayPrice(d.price)}</span>
                </div>
              </a>`
              )
              .join("")}
          </div>
        </div>`
            : ""
        }
      </div>

      <aside class="dest-detail__sidebar">
        <div class="dest-detail__booking card-surface">
          <div class="dest-detail__booking-header">
            <h2>Plan This Trip</h2>
            <p>Tell us your dates and we'll craft a personalized itinerary for ${data.name}.</p>
          </div>
          <p class="dest-detail__booking-price">from <strong>${formatDisplayPrice(data.price)}</strong> <span>per person</span></p>

          <form id="plan-trip-form" class="dest-detail__form" novalidate>
            <div id="plan-success" class="form-success" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
              <span>Request received! Our travel specialist will contact you within 24 hours.</span>
            </div>

            <input type="hidden" name="destination" value="${data.name}">

            <div>
              <label for="plan-name" class="field-label form-label">Full Name *</label>
              <input id="plan-name" type="text" name="name" class="field form-control" autocomplete="name">
              <span class="field-error invalid-feedback d-block" data-error="name"></span>
            </div>
            <div>
              <label for="plan-email" class="field-label form-label">Email Address *</label>
              <input id="plan-email" type="email" name="email" class="field form-control" autocomplete="email">
              <span class="field-error invalid-feedback d-block" data-error="email"></span>
            </div>
            <div>
              <label for="plan-date" class="field-label form-label">Preferred Date *</label>
              <input id="plan-date" type="date" name="date" class="field form-control">
              <span class="field-error invalid-feedback d-block" data-error="date"></span>
            </div>
            <div>
              <label for="plan-travelers" class="field-label form-label">Travelers *</label>
              <select id="plan-travelers" name="travelers" class="field form-control">
                <option value="" disabled selected>How many travelers?</option>
                <option value="1">1 traveler</option>
                <option value="2">2 travelers</option>
                <option value="3">3 travelers</option>
                <option value="4">4 travelers</option>
                <option value="5+">5+ travelers</option>
              </select>
              <span class="field-error invalid-feedback d-block" data-error="travelers"></span>
            </div>
            <div>
              <label for="plan-notes" class="field-label form-label">Special requests</label>
              <textarea id="plan-notes" name="notes" rows="3" class="field form-control" placeholder="Dietary needs, hotel preferences…"></textarea>
            </div>

            <button type="submit" class="btn-cta btn-cta--full">
              <svg class="icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Plan This Trip
            </button>
          </form>

          <p class="dest-detail__booking-note">Free consultation · No payment required · Reply within 24 hours</p>
        </div>
      </aside>
    </section>`;

    initPlanForm();
  }

  function formatDisplayPrice(price) {
    if (typeof price === 'string' && price.includes('VND')) return price;
    
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  loadTourDetails();
})();

function initPlanForm() {
  const form = document.getElementById("plan-trip-form");
  if (!form) return;

  const success = document.getElementById("plan-success");
  const fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    date: form.querySelector('[name="date"]'),
    travelers: form.querySelector('[name="travelers"]'),
  };

  const today = new Date().toISOString().split("T")[0];
  fields.date.min = today;

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
      date: fields.date.value,
      travelers: fields.travelers.value,
    };
    const errors = {};

    if (!values.name) errors.name = "Please enter your full name.";
    if (!values.email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
    if (!values.date) errors.date = "Please choose a travel date.";
    if (!values.travelers) errors.travelers = "Please select number of travelers.";

    return errors;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => setError(key, ""));
    fields[key].addEventListener("change", () => setError(key, ""));
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
}
