(function () {
  const feed = document.getElementById("blog-posts");
  if (!feed) return;

  feed.innerHTML = blogPosts
    .map(
      (p) => `
      <article class="card-surface blog-post">
        <a href="blog.html" class="blog-post__img img-zoom">
          <img src="${p.image}" alt="" loading="lazy">
        </a>
        <div class="blog-post__body">
          <div class="blog-post__meta">
            <span class="blog-post__tag">${p.tag}</span>
            <span>
              <svg class="icon--xs" style="display:inline;vertical-align:-2px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              ${p.date}
            </span>
          </div>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <a href="blog.html" class="blog-post__link">
            Read more
            <svg class="icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </article>`
    )
    .join("");
})();
