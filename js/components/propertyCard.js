/**
 * propertyCard.js
 * Builds a single property card DOM element from a property object.
 * Used by the home page (featured) and properties page (results grid).
 */
import { formatPriceLabel, capitalize, withImageFallback } from "../utils.js";

export function renderPropertyCard(property) {
  const card = document.createElement("article");
  card.className = "property-card";
  card.setAttribute("data-property-id", property.id);

  const purposeLabel = property.purpose === "rent" ? "For Rent" : "For Sale";
  const isLand = property.type === "land";

  card.innerHTML = `
    <div class="property-card-media">
      <span class="badge ${property.purpose === "rent" ? "rent" : ""}">${purposeLabel}</span>
      <button type="button" class="favorite-btn" aria-pressed="false" aria-label="Save ${escapeAttr(property.title)} to favourites">
        <i class="fa-regular fa-heart" aria-hidden="true"></i>
      </button>
      <img
        src="${property.images.cover}"
        alt="${escapeAttr(property.title)} in ${escapeAttr(property.location.area)}, ${escapeAttr(property.location.city)}"
        loading="lazy"
        width="400"
        height="300"
      />
    </div>
    <div class="property-card-body">
      <span class="property-type-tag">${capitalize(property.type)}</span>
      <h3><a href="/properties/${property.id}.html">${escapeAttr(property.title)}</a></h3>
      <p class="property-location">
        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
        ${escapeAttr(property.location.area)}, ${escapeAttr(property.location.city)}
      </p>
      <p class="property-price">${formatPriceLabel(property)}</p>
      ${
        isLand
          ? `<div class="property-meta"><span><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i>${property.area} sqm</span></div>`
          : `<div class="property-meta">
              <span><i class="fa-solid fa-bed" aria-hidden="true"></i>${property.bedrooms} Beds</span>
              <span><i class="fa-solid fa-bath" aria-hidden="true"></i>${property.bathrooms} Baths</span>
              <span><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i>${property.area} sqm</span>
            </div>`
      }
      <p class="property-desc">${escapeAttr(truncate(property.description, 90))}</p>
      <div class="property-card-footer">
        <a href="/properties/${property.id}.html" class="btn btn-dark-outline btn-block btn-sm">View Property</a>
      </div>
    </div>
  `;

  const img = card.querySelector("img");
  withImageFallback(img);

  const favBtn = card.querySelector(".favorite-btn");
  favBtn.addEventListener("click", () => {
    const active = favBtn.classList.toggle("active");
    favBtn.setAttribute("aria-pressed", String(active));
    favBtn.querySelector("i").className = active
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";
  });

  return card;
}

function truncate(text, max) {
  if (!text || text.length <= max) return text || "";
  return `${text.slice(0, max).trim()}…`;
}

function escapeAttr(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
