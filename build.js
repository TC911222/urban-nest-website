// build.js
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { properties } from "./js/data/properties.js";
import { formatPriceLabel, capitalize } from "./js/utils.js";

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
