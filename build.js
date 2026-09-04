// build.js
// build.js
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { properties } from "./js/data/properties.js";
import { formatPriceLabel, capitalize } from "./js/utils.js";

// Simple escape function that works in Node.js (no DOM needed)
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ... rest of your build.js code

// 1. Base URL for your live site (update this when you go live)
const BASE_URL = "https://www.example.com";

// 2. Read the template HTML file once
const template = readFileSync("property-details.html", "utf-8");

// 3. Ensure the /properties/ directory exists
if (!existsSync("properties")) {
  mkdirSync("properties");
  console.log("📁 Created /properties/ folder");
}
// 4. Loop through every property in your dataset
properties.forEach((property) => {
  const pageUrl = `${BASE_URL}/properties/${property.id}.html`;
  const description = `${property.title} in ${property.location.area}, Awka. ${formatPriceLabel(property)}. ${property.bedrooms ? property.bedrooms + " bedrooms, " : ""}${property.area} sqm.`;

  // Start building the dynamic HTML
  let html = template;

  // 🔥 FIX: Update asset paths to work from the /properties/ subfolder
  html = html.replace(/(href|src)="(css|js|assets)\//g, '$1="../$2/');

  // A. Replace the Title
  html = html.replace(
    "<title>Property Details | Ochie Realty</title>",
    `<title>${property.title} | Ochie Realty in ${property.location.area}, Awka</title>`,
  );

  // B. Replace the Meta Description
  html = html.replace(
    '<meta name="description" content="View detailed information, photos and features for this property listed by Ochie Realty in Awka, Anambra State." />',
    `<meta name="description" content="${description}" />`,
  );

  // C. Replace the Canonical URL
  html = html.replace(
    '<link rel="canonical" href="https://www.example.com/property-details.html" />',
    `<link rel="canonical" href="${pageUrl}" />`,
  );

  // D. Inject Open Graph (OG) Tags
  const ogTags = `
  <meta property="og:title" content="${property.title} | Ochie Realty" />
  <meta property="og:description" content="${property.description.substring(0, 150)}..." />
  <meta property="og:image" content="${property.images.cover}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  `;
  html = html.replace("</title>", `</title>${ogTags}`);

  // E.1 Inject Static Content (so text shows instantly without JS)
  html = html.replace(
    '<h1 id="detailsTitle"></h1>',
    `<h1 id="detailsTitle">${property.title}</h1>`,
  );

  html = html.replace(
    '<p id="detailsDescription"></p>',
    `<p id="detailsDescription">${property.description}</p>`,
  );

  html = html.replace(
    '<p id="detailsPrice"></p>',
    `<p id="detailsPrice">${formatPriceLabel(property)}</p>`,
  );

  html = html.replace(
    '<span id="detailsLocation"></span>',
    `<span id="detailsLocation">${property.location.area}, ${property.location.city}, ${property.location.state}</span>`,
  );

  html = html.replace(
    '<span id="detailsTypeTag"></span>',
    `<span id="detailsTypeTag">${capitalize(property.type)}</span>`,
  );

  // Inject the Main Gallery Image
  const mainImage = property.images.gallery.length
    ? property.images.gallery[0]
    : property.images.cover;
  html = html.replace(
    /<img id="galleryMainImg" src="" alt="" /,
    `<img id="galleryMainImg" src="${mainImage}" alt="${property.title}" `,
  );

  // Inject the Stats (Bedrooms/Bathrooms/Area)
  const isLand = property.type === "land";
  let statsHTML = "";
  if (isLand) {
    statsHTML = `
      <div><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i><strong>${property.area} sqm</strong><span>Land Size</span></div>
      <div><i class="fa-solid fa-file-signature" aria-hidden="true"></i><strong>Available</strong><span>Title Status</span></div>
    `;
  } else {
    statsHTML = `
      <div><i class="fa-solid fa-bed" aria-hidden="true"></i><strong>${property.bedrooms}</strong><span>Bedrooms</span></div>
      <div><i class="fa-solid fa-bath" aria-hidden="true"></i><strong>${property.bathrooms}</strong><span>Bathrooms</span></div>
      <div><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i><strong>${property.area} sqm</strong><span>Area</span></div>
    `;
  }
  html = html.replace(
    '<div class="details-stats" id="detailsStats"></div>',
    `<div class="details-stats" id="detailsStats">${statsHTML}</div>`,
  );

  // Inject Features
  let featuresHTML = "";
  if (property.features && property.features.length > 0) {
    featuresHTML = property.features
      .map(
        (f) =>
          `<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i>${escapeHtml(f)}</li>`,
      )
      .join("");
  }
  html = html.replace(
    '<ul class="features-grid" id="detailsFeatures"></ul>',
    `<ul class="features-grid" id="detailsFeatures">${featuresHTML}</ul>`,
  );

  // E. Write the new file
  writeFileSync(`properties/${property.id}.html`, html);
  console.log(`✅ Generated: properties/${property.id}.html`);
});

console.log("🎉 All property pages generated!");

// Add this inside build.js (after the properties loop, before the final console.log)
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc></url>
  <url><loc>${BASE_URL}/properties.html</loc></url>
  <url><loc>${BASE_URL}/about.html</loc></url>
  <url><loc>${BASE_URL}/contact.html</loc></url>`;

properties.forEach((p) => {
  sitemap += `\n  <url><loc>${BASE_URL}/properties/${p.id}.html</loc><priority>0.8</priority></url>`;
});

sitemap += `\n</urlset>`;
writeFileSync("sitemap.xml", sitemap);
console.log("✅ Sitemap generated!");
