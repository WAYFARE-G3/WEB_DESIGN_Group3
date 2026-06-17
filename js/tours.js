(function () {
  const API_URL = "http://localhost:8080/api/tours";
  const tourListEl = document.querySelector("[data-tour-list]");

  if (!tourListEl) return;

  /**
   * Fetch all tours from the Backend API
   */
  async function fetchTours() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch tours");
      const tours = await response.json();
      renderTours(tours);
    } catch (error) {
      console.error("Error loading tours:", error);
      tourListEl.innerHTML = `
        <div class="text-center py-5">
          <p class="text-danger">Failed to load tours. Please make sure the backend is running.</p>
          <button onclick="location.reload()" class="btn-cta btn-cta--sm">Try Again</button>
        </div>`;
    }
  }

  /**
   * Render the list of tour cards
   * @param {Array} tours 
   */
  function renderTours(tours) {
    if (tours.length === 0) {
      tourListEl.innerHTML = `<div class="text-center py-5"><p>No tours available at the moment.</p></div>`;
      return;
    }

    tourListEl.innerHTML = `
      <div class="row g-4">
        ${tours.map(tour => renderTourCard(tour)).join("")}
      </div>
    `;
  }

  /**
   * Generates HTML for a single tour card
   * @param {Object} tour 
   */
  function renderTourCard(tour) {
    // Format price to VND
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(tour.price);

    return `
      <div class="col-md-6 col-lg-4">
        <article class="card-surface h-100 tour-card">
          <div class="img-zoom" style="aspect-ratio: 16/10">
            <img src="${tour.imageUrl || 'assets/placeholder-tour.jpg'}" alt="${tour.title}" loading="lazy">
          </div>
          <div class="p-4 d-flex flex-column h-100">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-light text-primary border">${tour.durationDays} days · ${tour.durationNights || (tour.durationDays - 1)} nights</span>
              <div class="stars">
                <svg class="stars__icon" viewBox="0 0 24 24" fill="var(--star)" stroke="var(--star)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span class="stars__rating">${tour.averageRating || 'New'}</span>
              </div>
            </div>
            <h3 class="h5 mb-2">${tour.title}</h3>
            <p class="text-secondary small mb-4 flex-grow-1">${tour.description ? tour.description.substring(0, 100) + '...' : 'No description available.'}</p>
            <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
              <div>
                <div class="small text-muted">From</div>
                <div class="fw-bold text-primary">${formattedPrice}</div>
              </div>
              <a href="destination-detail.html?id=${tour.id}" class="btn-cta btn-cta--sm">Details</a>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  // Initial fetch
  fetchTours();
})();
