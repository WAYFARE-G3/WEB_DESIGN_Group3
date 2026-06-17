(function () {
  const REGIONS = ["North", "Central", "South"];
  const STYLES = ["Beach", "Mountain", "Culture", "Adventure"];

  const regions = new Set();
  const styles = new Set();

  const filterToggle = document.querySelector("[data-filter-toggle]");
  const filtersPanel = document.querySelector("[data-filters]");
  const clearBtn = document.querySelector("[data-clear-filters]");
  const countEl = document.querySelector("[data-dest-count]");
  const listEl = document.querySelector("[data-dest-list]");

  if (!listEl) return;

  function renderFilters() {
    const regionGroup = document.querySelector("[data-filter-regions]");
    const styleGroup = document.querySelector("[data-filter-styles]");

    regionGroup.innerHTML = REGIONS.map(
      (opt) => `
        <label class="filters__option">
          <input type="checkbox" value="${opt}" data-filter="region" ${regions.has(opt) ? "checked" : ""}>
          <span>${opt}</span>
        </label>`
    ).join("");

    styleGroup.innerHTML = STYLES.map(
      (opt) => `
        <label class="filters__option">
          <input type="checkbox" value="${opt}" data-filter="style" ${styles.has(opt) ? "checked" : ""}>
          <span>${opt}</span>
        </label>`
    ).join("");

    regionGroup.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => toggleFilter(regions, input.value, input.checked));
    });
    styleGroup.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => toggleFilter(styles, input.value, input.checked));
    });

    if (clearBtn) clearBtn.classList.toggle("hidden", regions.size === 0 && styles.size === 0);
  }

  function toggleFilter(set, value, checked) {
    if (checked) set.add(value);
    else set.delete(value);
    renderFilters();
    renderList();
  }

  function renderList() {
    const filtered = destinations.filter(
      (d) =>
        (regions.size === 0 || regions.has(d.region)) &&
        (styles.size === 0 || styles.has(d.style))
    );

    countEl.textContent = `${filtered.length} destination${filtered.length === 1 ? "" : "s"}`;

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="empty-state">No destinations match your filters. Try removing one.</div>`;
      return;
    }

    listEl.innerHTML = filtered
      .map(
        (d) => `
        <a href="destination-detail.html?id=${d.id}" class="dest-tile-link">
          <article class="card-surface dest-tile img-zoom">
            <img src="${d.image}" alt="${d.name}" loading="lazy">
            <div class="dest-tile__overlay"></div>
            <div class="dest-tile__content">
              <div class="dest-tile__meta">
                <svg class="icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                ${d.country} · ${d.region} Region
              </div>
              <h3>${d.name}</h3>
              <p class="dest-tile__desc">${d.description}</p>
              <div class="dest-tile__footer">
                <span class="dest-tile__tag">${d.style}</span>
                <span class="dest-tile__price">from ${formatPrice(d.price)}</span>
              </div>
            </div>
          </article>
        </a>`
      )
      .join("");
  }

  if (filterToggle && filtersPanel) {
    filterToggle.addEventListener("click", () => {
      filtersPanel.classList.toggle("open");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      regions.clear();
      styles.clear();
      renderFilters();
      renderList();
    });
  }

  renderFilters();
  renderList();
})();
