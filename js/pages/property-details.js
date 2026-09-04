/**
 * property-details.js (page script)
 * Loads a single property from ?id=... and renders the whole page,
 * or shows a "Property Not Found" state if the id doesn't match.
 */
import {
  formatPriceLabel,
  capitalize,
  withImageFallback,
  buildWhatsAppLink,
  COMPANY_PHONE,
  escapeHtml, // <-- ADD THIS
} from "../utils.js";
import { getPropertyById, getRelatedProperties } from "../data/properties.js";
import { renderPropertyCard } from "../components/propertyCard.js";

const main = document.getElementById("detailsMain");
const notFound = document.getElementById("notFoundState");
const relatedSection = document.getElementById("relatedSection");

function getPropertyIdFromUrl() {
  // 1. Check for query param first (legacy support)
  const idParam = new URLSearchParams(window.location.search).get("id");
  if (idParam) return idParam;

  // 2. NEW: Extract ID from static URL path: /properties/property-001.html
  const pathParts = window.location.pathname.split("/");
  const fileName = pathParts[pathParts.length - 1]; // e.g., "property-001.html"
  if (fileName.startsWith("property-") && fileName.endsWith(".html")) {
    return fileName.replace(".html", ""); // returns "property-001"
  }
  return null;
}

function setSeoTags(property) {
  document.title = `${property.title} in ${property.location.area}, Awka | UrbanNest Realty`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      "content",
      `${property.title} — ${property.location.area}, ${property.location.city}. ${formatPriceLabel(property)}. ${property.bedrooms ? `${property.bedrooms} bedrooms, ` : ""}${property.area} sqm.`,
    );
  }

  const jsonLd = document.getElementById("propertyJsonLd");
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.title,
      description: property.description,
      url: window.location.href,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location.area,
        addressRegion: property.location.city,
        addressCountry: "NG",
      },
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock",
      },
    });
  }
}

function renderBreadcrumb(property) {
  const el = document.getElementById("breadcrumb");
  if (!el) return;
  el.innerHTML = `
  <a href="/index.html">Home</a> <span aria-hidden="true">/</span>
  <a href="/properties.html">Properties</a> <span aria-hidden="true">/</span>
  <span class="current">${escapeHtml(property.title)}</span>
`;
}

function renderGallery(property) {
  const mainImg = document.getElementById("galleryMainImg");
  const thumbsWrap = document.getElementById("galleryThumbs");

  // Get all images. If there are no extra gallery images, use only the cover.
  const images = property.images.gallery.length
    ? property.images.gallery
    : [property.images.cover];

  // ----- 1. Set the big main image -----
  mainImg.src = images[0];
  mainImg.alt = `${property.title} — photo 1 of ${images.length}`;
  withImageFallback(mainImg);

  // ----- 2. Clear the thumbnail container -----
  thumbsWrap.innerHTML = "";

  // ----- 3. ONLY show thumbnails if there is MORE THAN 1 image -----
  if (images.length > 1) {
    // Loop through each image and create a thumbnail button
    images.forEach((src, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = index === 0 ? "active" : "";
      btn.setAttribute(
        "aria-label",
        `Show photo ${index + 1} of ${images.length}`,
      );
      btn.innerHTML = `<img src="${src}" alt="" loading="lazy" />`;
      withImageFallback(btn.querySelector("img"));

      // When a thumbnail is clicked, swap the main image
      btn.addEventListener("click", () => {
        mainImg.src = src;
        mainImg.alt = `${property.title} — photo ${index + 1} of ${images.length}`;
        thumbsWrap
          .querySelectorAll("button")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });

      thumbsWrap.appendChild(btn);
    });

    // Make sure the thumbnails row is visible
    thumbsWrap.style.display = "flex";
  } else {
    // If there's only 1 image, hide the entire thumbnail row
    thumbsWrap.style.display = "none";
  }
}

function renderInfo(property) {
  const isLand = property.type === "land";

  document.getElementById("detailsPurposeBadge").textContent =
    property.purpose === "rent" ? "For Rent" : "For Sale";
  document.getElementById("detailsTitle").textContent = property.title;
  document.getElementById("detailsLocation").textContent =
    `${property.location.area}, ${property.location.city}, ${property.location.state}`;
  document.getElementById("detailsPrice").textContent =
    formatPriceLabel(property);
  document.getElementById("detailsDescription").textContent =
    property.description;
  document.getElementById("detailsTypeTag").textContent = capitalize(
    property.type,
  );

  const statsWrap = document.getElementById("detailsStats");
  statsWrap.innerHTML = isLand
    ? `
      <div><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i><strong>${property.area} sqm</strong><span>Land Size</span></div>
      <div><i class="fa-solid fa-file-signature" aria-hidden="true"></i><strong>Available</strong><span>Title Status</span></div>
    `
    : `
      <div><i class="fa-solid fa-bed" aria-hidden="true"></i><strong>${property.bedrooms}</strong><span>Bedrooms</span></div>
      <div><i class="fa-solid fa-bath" aria-hidden="true"></i><strong>${property.bathrooms}</strong><span>Bathrooms</span></div>
      <div><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i><strong>${property.area} sqm</strong><span>Area</span></div>
    `;

  const featuresList = document.getElementById("detailsFeatures");
  featuresList.innerHTML = (property.features || [])
    .map(
      (f) =>
        `<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i>${escapeHtml(f)}</li>`,
    )
    .join("");
}

function renderInquiryCard(property) {
  const message = `Hello, I am interested in the ${property.title} listed on your website.`;

  document.getElementById("callAgentBtn").href =
    `tel:${COMPANY_PHONE.replace(/\s/g, "")}`;
  document.getElementById("whatsappBtn").href = buildWhatsAppLink(message);

  const sendInquiryBtn = document.getElementById("sendInquiryBtn");
  sendInquiryBtn.href = `contact.html?subject=${encodeURIComponent(`Inquiry: ${property.title}`)}`;
}

function renderRelated(property) {
  const related = getRelatedProperties(property, 3);
  const relatedGrid = document.getElementById("relatedGrid");

  if (related.length === 0) {
    relatedSection.hidden = true;
    return;
  }

  relatedGrid.innerHTML = "";
  related.forEach((p) => relatedGrid.appendChild(renderPropertyCard(p)));
}

function showNotFound() {
  main.hidden = true;
  relatedSection.hidden = true;
  notFound.hidden = false;
}

/* function escapeHtml(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
} */

function init() {
  const id = getPropertyIdFromUrl();
  const property = id ? getPropertyById(id) : null;

  if (!property) {
    showNotFound();
    return;
  }

  setSeoTags(property);
  renderBreadcrumb(property);
  renderGallery(property);
  renderInfo(property);
  renderInquiryCard(property);
  renderRelated(property);
}

document.addEventListener("DOMContentLoaded", init);
