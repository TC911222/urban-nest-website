/**
 * home.js
 * Page logic for index.html: hero search redirect, featured properties,
 * and category counts.
 */
import { getFeaturedProperties, countByType } from "../data/properties.js";
import { renderPropertyCard } from "../components/propertyCard.js";

function renderFeaturedProperties() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  const featured = getFeaturedProperties().slice(0, 6);
  grid.innerHTML = "";

  if (featured.length === 0) {
    grid.innerHTML = `<p class="text-center">No featured properties available right now.</p>`;
    return;
  }

  featured.forEach((property) => grid.appendChild(renderPropertyCard(property)));
}

function renderCategoryCounts() {
  document.querySelectorAll("[data-category-count]").forEach((el) => {
    const type = el.getAttribute("data-category-count");
    const count = countByType(type);
    el.textContent = `${count} ${count === 1 ? "Property" : "Properties"} Available`;
  });
}

function initHeroSearch() {
  const form = document.getElementById("heroSearchForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const location = form.elements.location.value.trim();
    const type = form.elements.type.value;
    const purpose = form.elements.purpose.value;
    const price = form.elements.price.value;

    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (purpose) params.set("purpose", purpose);
    if (price) params.set("maxPrice", price);

    const query = params.toString();
    window.location.href = query ? `properties.html?${query}` : "properties.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProperties();
  renderCategoryCounts();
  initHeroSearch();
});
