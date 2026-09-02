/**
 * contact.js (page script)
 * Validates the contact form and handles submission on the frontend.
 *
 * NOTE: This does not send a real email yet. Wire the fetch() call in
 * handleSubmit() up to Formspree, EmailJS, or a custom backend endpoint
 * before launch — see the comment below.
 */
import { getUrlParams } from "../utils.js";

const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");

const validators = {
  fullName: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address."),
  phone: (v) => (/^[0-9+\s()-]{7,}$/.test(v.trim()) ? "" : "Please enter a valid phone number."),
  subject: (v) => (v.trim().length >= 3 ? "" : "Please add a short subject."),
  message: (v) => (v.trim().length >= 10 ? "" : "Please enter at least 10 characters."),
};

function showFieldError(fieldName, message) {
  const field = form.querySelector(`[data-field="${fieldName}"]`);
  if (!field) return;
  const errorEl = field.querySelector(".field-error");
  if (message) {
    field.classList.add("has-error");
    if (errorEl) errorEl.textContent = message;
  } else {
    field.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  }
}

function validateForm() {
  let isValid = true;
  Object.entries(validators).forEach(([name, validate]) => {
    const input = form.elements[name];
    const message = validate(input.value || "");
    showFieldError(name, message);
    if (message) isValid = false;
  });
  return isValid;
}

function setStatus(type, message) {
  statusBox.className = `form-status show ${type}`;
  statusBox.textContent = message;
  statusBox.setAttribute("role", type === "error" ? "alert" : "status");
}

async function handleSubmit(e) {
  e.preventDefault();
  statusBox.className = "form-status";

  if (!validateForm()) {
    setStatus("error", "Please fix the highlighted fields and try again.");
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  try {
    // Frontend-only placeholder. Replace this block with a real request, e.g.:
    // await fetch("https://formspree.io/f/your-form-id", {
    //   method: "POST",
    //   headers: { Accept: "application/json" },
    //   body: new FormData(form),
    // });
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("success", "Thanks — your message has been received. Our team will reach out shortly.");
    form.reset();
  } catch (err) {
    setStatus("error", "Something went wrong sending your message. Please try again or WhatsApp us directly.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
}

function prefillSubject() {
  const params = getUrlParams();
  if (params.subject && form.elements.subject) {
    form.elements.subject.value = decodeURIComponent(params.subject);
  }
}

function init() {
  if (!form) return;
  prefillSubject();
  form.addEventListener("submit", handleSubmit);

  Object.keys(validators).forEach((name) => {
    form.elements[name]?.addEventListener("blur", () => {
      showFieldError(name, validators[name](form.elements[name].value || ""));
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
