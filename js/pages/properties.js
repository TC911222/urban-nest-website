/**
 * properties.js (page script)
 * Drives the properties.html search/filter/sort experience.
 * The property dataset is always the single source of truth —
 * filtering never depends on markup or filenames.
 */
import { properties, getAvailableAreas } from "../data/properties.js";
import { renderPropertyCard } from "../components/propertyCard.js";
import { getUrlParams } from "../utils.js";

const grid = document.getElementById("resultsGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const form = document.getElementById("filtersForm");
const resetBtn = document.getElementById("resetFilters");
const clearFromEmptyBtn = document.getElementById("clearFromEmpty");
const sortSelect = document.getElementById("sortSelect");
const areaSelect = document.getElementById("filterArea");

/** Populate the area/location dropdown from whatever areas exist in the data. */
function populateAreaOptions() {
  if (!areaSelect) return;
  getAvailableAreas().forEach((area) => {
    const opt = document.createElement("option");
    opt.value = area;
    opt.textContent = area;
    areaSelect.appendChild(opt);
  });
}

/** Reads current values out of the filter form. */
function readFilters() {
  const data = new FormData(form);
  return {
    search: (data.get("search") || "").trim().toLowerCase(),
    purpose: data.get("purpose") || "",
    area: data.get("area") || "",
    type: data.get("type") || "",
    minPrice: data.get("minPrice") ? Number(data.get("minPrice")) : null,
    maxPrice: data.get("maxPrice") ? Number(data.get("maxPrice")) : null,
    bedrooms: data.get("bedrooms") || "",
  };
}

/** Applies a filter set against the dataset. */
function filterProperties(filters) {
  return properties.filter((p) => {
    if (filters.search) {
      const haystack = [
        p.title,
        p.location.area,
        p.location.city,
        p.type,
        p.description,
        ...(p.features || []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(filters.search)) return false;
    }

    if (filters.purpose && p.purpose !== filters.purpose) return false;
    if (filters.area && p.location.area !== filters.area) return false;
    if (filters.type && p.type !== filters.type) return false;

    if (filters.minPrice !== null && !Number.isNaN(filters.minPrice) && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && !Number.isNaN(filters.maxPrice) && p.price > filters.maxPrice) return false;

    if (filters.bedrooms) {
      const min = Number(filters.bedrooms);
      if (p.bedrooms < min) return false;
    }

    return true;
  });
}

function sortProperties(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "largest":
      return sorted.sort((a, b) => b.area - a.area);
    case "bedrooms":
      return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.dateListed) - new Date(a.dateListed));
  }
}

function renderResults() {
  const filters = readFilters();
  const filtered = filterProperties(filters);
  const sorted = sortProperties(filtered, sortSelect.value);

  grid.innerHTML = "";

  if (sorted.length === 0) {
    grid.hidden = true;
    emptyState.hidden = false;
  } else {
    grid.hidden = false;
    emptyState.hidden = true;
    sorted.forEach((property) => grid.appendChild(renderPropertyCard(property)));
  }

  resultsCount.textContent = `${sorted.length} ${sorted.length === 1 ? "property" : "properties"} found`;
  syncUrlWithFilters(filters);
}

/** Keeps the address bar in sync so results can be shared/bookmarked. */
function syncUrlWithFilters(filters) {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.purpose) params.set("purpose", filters.purpose);
  if (filters.area) params.set("location", filters.area);
  if (filters.type) params.set("type", filters.type);
  if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));
  if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
  if (sortSelect.value && sortSelect.value !== "newest") params.set("sort", sortSelect.value);

  const query = params.toString();
  const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
  window.history.replaceState({}, "", newUrl);
}

/** Reads ?location=&type=&purpose=&search=&maxPrice=&minPrice=&bedrooms=&sort= from the URL and applies them to the form. */
function applyUrlFilters() {
  const params = getUrlParams();

  if (params.search) form.elements.search.value = params.search;
  if (params.purpose) form.elements.purpose.value = params.purpose;
  if (params.location) form.elements.area.value = params.location;
  if (params.type) form.elements.type.value = params.type;
  if (params.minPrice) form.elements.minPrice.value = params.minPrice;
  if (params.maxPrice) form.elements.maxPrice.value = params.maxPrice;
  if (params.bedrooms) form.elements.bedrooms.value = params.bedrooms;
  if (params.sort) sortSelect.value = params.sort;
}

function resetFilters() {
  form.reset();
  sortSelect.value = "newest";
  window.history.replaceState({}, "", window.location.pathname);
  renderResults();
}

function init() {
  populateAreaOptions();
  applyUrlFilters();
  renderResults();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    renderResults();
  });

  form.addEventListener("input", () => renderResults());
  form.addEventListener("change", () => renderResults());
  sortSelect.addEventListener("change", () => renderResults());

  resetBtn.addEventListener("click", resetFilters);
  clearFromEmptyBtn?.addEventListener("click", resetFilters);
}

document.addEventListener("DOMContentLoaded", init);
