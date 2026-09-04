/**
 * footer.js
 * Renders the shared site footer into the #footer mount point.
 */
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS } from "../utils.js";

export function renderFooter() {
  const mount = document.getElementById("footer");
  if (!mount) return;

  const year = new Date().getFullYear();

  mount.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo">UrbanNest&nbsp;Realty</div>
          <p>Helping people in Awka and its surrounding communities find homes, land and commercial spaces they can trust.</p>
          <div class="footer-social">
            <a href="#" aria-label="UrbanNest Realty on Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
            <a href="#" aria-label="UrbanNest Realty on Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="#" aria-label="Chat with UrbanNest Realty on WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
            <a href="#" aria-label="UrbanNest Realty on LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="/properties.html">Properties</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Property</h4>
          <ul>
            <li><a href="/properties.html?type=house">Houses</a></li>
            <li><a href="/properties.html?type=apartment">Apartments</a></li>
            <li><a href="/properties.html?type=land">Land</a></li>
            <li><a href="/properties.html?type=commercial">Commercial</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact</h4>
          <ul class="footer-contact">
            <li><i class="fa-solid fa-phone" aria-hidden="true"></i><a href="tel:${COMPANY_PHONE.replace(/\s/g, "")}">${COMPANY_PHONE}</a></li>
            <li><i class="fa-solid fa-envelope" aria-hidden="true"></i><a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a></li>
            <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>${COMPANY_ADDRESS}</span></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        &copy; ${year} UrbanNest Realty. All rights reserved
      </div>
    </div>
  `;
}
