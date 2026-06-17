(function () {
  const tourListEl = document.querySelector("[data-tour-list]");
  const feedbackEl = document.querySelector("[data-tour-feedback]");
  let toursState = [];

  if (!tourListEl) return;

  async function fetchTours() {
    try {
      const result = await apiGet("/tours");
      
      if (result.success && result.data && result.data.length > 0) {
        toursState = result.data;
        renderTours(toursState);
      } else {
        console.warn("Backend returned empty or failed. Using fallback static data.");
        loadFallbackData();
      }
    } catch (error) {
      console.error("Error loading tours:", error);
      loadFallbackData();
      showFeedback("Note: Showing demo tours because backend is unreachable.", "info");
    }
  }

  function loadFallbackData() {
    toursState = destinations.map(d => ({
        id: d.id,
        title: d.name,
        price: d.price * 1000,
        durationDays: parseInt(d.duration) || 3,
        durationNights: (parseInt(d.duration) || 3) - 1,
        imageUrl: d.image,
        description: d.description,
        averageRating: d.rating
    }));
    renderTours(toursState);
  }

  function showFeedback(message, type) {
    if (!feedbackEl) return;
    feedbackEl.className = `mb-4 alert alert-${type} d-block`;
    feedbackEl.textContent = message;
    setTimeout(() => {
        feedbackEl.classList.add('d-none');
        feedbackEl.classList.remove('d-block');
    }, 5000);
  }

  function renderTours(tours) {
    if (!tours || tours.length === 0) {
      tourListEl.innerHTML = `<div class="text-center py-5"><p>No tours available at the moment.</p></div>`;
      return;
    }

    tourListEl.innerHTML = `
      <div class="row g-4">
        ${tours.map((tour) => renderTourCard(tour)).join("")}
      </div>
    `;
    bindDeleteButtons();
  }

  function renderTourCard(tour) {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(tour.price);

    const description = tour.description
      ? `${tour.description.substring(0, 100)}...`
      : "No description available.";

    return `
      <div class="col-md-6 col-lg-4" data-tour-item="${tour.id}">
        <article class="card-surface h-100 d-flex flex-column">
          <div class="img-zoom" style="aspect-ratio: 16/10">
            <img src="${tour.imageUrl || "assets/placeholder-tour.jpg"}" alt="${tour.title}" loading="lazy">
          </div>
          <div class="p-4 d-flex flex-column flex-grow-1">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-light text-primary border">${tour.durationDays} days · ${tour.durationNights || tour.durationDays - 1} nights</span>
              <div class="stars">
                <svg class="stars__icon" viewBox="0 0 24 24" fill="var(--star)" stroke="var(--star)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span class="stars__rating">${tour.averageRating || "New"}</span>
              </div>
            </div>
            <h3 class="h5 mb-2">${tour.title}</h3>
            <p class="text-secondary small mb-4">${description}</p>
            
            <div class="mt-auto pt-3 border-top">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div class="small text-muted" style="font-size: 0.75rem;">Starting from</div>
                  <div class="fw-bold text-primary" style="font-size: 1.1rem;">${formattedPrice}</div>
                </div>
              </div>
              <div class="d-flex gap-2">
                <a href="destination-detail.html?id=${tour.id}" class="btn-cta btn-cta--sm flex-grow-1">Details</a>
                <button type="button" class="btn btn-outline-danger btn-sm" data-tour-delete="${tour.id}">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function bindDeleteButtons() {
    document.querySelectorAll("[data-tour-delete]").forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tourId = button.dataset.tourDelete;
        const tour = toursState.find((item) => String(item.id) === String(tourId));
        const confirmed = window.confirm(`Are you sure you want to delete tour "${tour?.title || tourId}"?`);
        if (!confirmed) return;
        await deleteTour(tourId, button);
      });
    });
  }

  async function deleteTour(tourId, button) {
    const originalLabel = button.textContent;
    try {
      button.disabled = true;
      button.textContent = "...";
      await apiDelete(`/tours/${tourId}`);
      toursState = toursState.filter((tour) => String(tour.id) !== String(tourId));
      renderTours(toursState);
      showFeedback("Tour removed successfully.", "success");
    } catch (error) {
      console.error("Error deleting tour:", error);
      toursState = toursState.filter((tour) => String(tour.id) !== String(tourId));
      renderTours(toursState);
      showFeedback("Removed from view.", "warning");
    }
  }

  fetchTours();
})();
