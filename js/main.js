/**
 * main.js
 * Loaded on every page. Mounts the shared navbar and footer using
 * the current page name from <body data-page="...">.
 */
import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

const currentPage = document.body.dataset.page || "index.html";
renderNavbar(currentPage);
renderFooter();
