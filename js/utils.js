/**
 * utils.js
 * Small shared helpers used by components and page scripts.
 */

const NAIRA_FORMATTER = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** Formats a number as a Naira price, e.g. 85000000 -> "₦85,000,000". */
export function formatPrice(amount) {
  return NAIRA_FORMATTER.format(amount);
}

/** Rent prices are shown "per year" by convention on this site. */
export function formatPriceLabel(property) {
  return property.purpose === "rent"
    ? `${formatPrice(property.price)} / year`
    : formatPrice(property.price);
}

/** Capitalises the first letter of a word, e.g. "duplex" -> "Duplex". */
export function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Attaches a fallback so a broken image never leaves a blank box. */
export function withImageFallback(
  imgEl,
  fallbackSrc = "assets/images/placeholder.svg",
) {
  imgEl.addEventListener(
    "error",
    () => {
      imgEl.src = fallbackSrc;
    },
    { once: true },
  );
  return imgEl;
}

/** Placeholder company WhatsApp number — replace with the real line. */
export const COMPANY_WHATSAPP = "2348000000000";
export const COMPANY_PHONE = "+234 800 000 0000";
export const COMPANY_EMAIL = "hello@UrbanNestrealty.ng";
export const COMPANY_ADDRESS = "12 Enugu Road, Awka, Anambra State, Nigeria";

/** Builds a wa.me link pre-filled with an inquiry message about a property. */
export function buildWhatsAppLink(message) {
  return `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/** Reads the current page's URLSearchParams as a plain object. */
export function getUrlParams() {
  return Object.fromEntries(
    new URLSearchParams(window.location.search).entries(),
  );
}

/** Escapes text before inserting into innerHTML, to avoid markup injection. */
export function escapeHtml(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
