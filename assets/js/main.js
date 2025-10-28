(function () {
  "use strict";

  // ---------- UTILITIES ----------
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  function showToast(msg) {
    var toast = qs("#toast");
    if (!toast) return alert(msg);

    toast.textContent = msg;
    toast.classList.add("show");

    // hide after 3s
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);
  }

  // ---------- MOBILE NAV ----------
  var mobileToggle = qs("#mobileMenuToggle");
  var mobileDrawer = qs("#mobileNav");

  function toggleMobileNav() {
    if (!mobileDrawer) return;
    var isOpen = mobileDrawer.classList.contains("open");
    if (isOpen) {
      mobileDrawer.classList.remove("open");
      mobileDrawer.setAttribute("aria-hidden", "true");
      if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
    } else {
      mobileDrawer.classList.add("open");
      mobileDrawer.setAttribute("aria-hidden", "false");
      if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "true");
    }
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", toggleMobileNav);
  }

  // Close mobile drawer if user clicks a nav link
  if (mobileDrawer) {
    mobileDrawer.addEventListener("click", function (e) {
      if (mobileDrawer.classList.contains("open") && e.target.matches("a")) {
        toggleMobileNav();
      }
    });
  }

  // ---------- CART LOGIC ----------
  var CART_KEY = "cart";

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function addToCart(id, name, price) {
    var cart = loadCart();
    var item = cart.find(function (i) { return i.id === id; });
    if (item) {
      item.qty += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: parseFloat(price),
        qty: 1
      });
    }
    saveCart(cart);
    updateCartBadge();
    showToast("Item added.");
  }

  function cartTotalQty(cart) {
    return cart.reduce(function (sum, i) {
      return sum + i.qty;
    }, 0);
  }

  function updateCartBadge() {
    var badgeEls = qsa(".js-cart-count");
    var cart = loadCart();
    var totalQty = cartTotalQty(cart);
    badgeEls.forEach(function (b) {
      b.textContent = String(totalQty);
    });
  }

  function renderCartModal() {
    var listEl = qs("#cart-items");
    if (!listEl) return;

    var cart = loadCart();
    if (!cart.length) {
      listEl.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    var rows = cart.map(function (item) {
      var subtotal = item.price * item.qty;
      return (
        "<tr>" +
        "<td>" + escapeHtml(item.name) + "</td>" +
        "<td>" + item.qty + "</td>" +
        "<td>$" + subtotal.toFixed(2) + "</td>" +
        "</tr>"
      );
    }).join("");

    var tableHtml =
      '<table class="cart-items-table" aria-describedby="cart-title">' +
      "<thead><tr>" +
      "<th scope=\"col\">Item</th>" +
      "<th scope=\"col\">Qty</th>" +
      "<th scope=\"col\">Subtotal</th>" +
      "</tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
      "</table>";

    listEl.innerHTML = tableHtml;
  }

  function clearCart() {
    saveCart([]);
    renderCartModal();
    updateCartBadge();
  }

  function processOrder() {
    // Clear cart & confirmation
    saveCart([]);
    renderCartModal();
    updateCartBadge();
    showToast("Thank you for your order.");
  }

  // ---------- CART MODAL OPEN/CLOSE ----------
  var cartModal = qs("#cart-modal");
  var openCartBtn = qsa(".js-open-cart");
  var closeCartBtn = qs("#closeCartBtn");
  var clearCartBtn = qs("#clearCartBtn");
  var processOrderBtn = qs("#processOrderBtn");

  function openCartModal() {
    if (!cartModal) return;
    renderCartModal();
    cartModal.classList.remove("hidden");
    cartModal.setAttribute("aria-hidden", "false");
  }

  function closeCartModal() {
    if (!cartModal) return;
    cartModal.classList.add("hidden");
    cartModal.setAttribute("aria-hidden", "true");
  }

  if (cartModal) {
    cartModal.addEventListener("click", function (e) {
      // close if backdrop clicked
      if (e.target.classList.contains("modal__backdrop")) {
        closeCartModal();
      }
    });
  }

  openCartBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openCartModal();
    });
  });

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCartModal);
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }

  if (processOrderBtn) {
    processOrderBtn.addEventListener("click", processOrder);
  }

  // Esc to close modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (cartModal && !cartModal.classList.contains("hidden")) {
        closeCartModal();
      }
      if (eventModal && !eventModal.classList.contains("hidden")) {
        closeEventModal();
      }
      if (mobileDrawer && mobileDrawer.classList.contains("open")) {
        toggleMobileNav();
      }
    }
  });

  // ---------- ABOUT PAGE FEEDBACK FORM ----------
  var feedbackForm = qs("#feedback-form");
  function handleFeedbackSubmit(e) {
    e.preventDefault();
    var name = qs("#fb-name") ? qs("#fb-name").value.trim() : "";
    var contact = qs("#fb-contact") ? qs("#fb-contact").value.trim() : "";
    var message = qs("#fb-message") ? qs("#fb-message").value.trim() : "";

    if (!name || !contact || !message) {
      showToast("Please fill all required fields.");
      return;
    }

    var payload = {
      name: name,
      contact: contact,
      message: message,
      ts: Date.now()
    };

    var storeKey = "feedbackRequests";
    var existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(storeKey)) || [];
    } catch (e2) {}
    existing.push(payload);
    localStorage.setItem(storeKey, JSON.stringify(existing));

    var successBox = qs("#feedback-success");
    if (successBox) {
      successBox.classList.remove("hidden");
    }
    showToast("Thanks! We got your request.");
    e.target.reset();
  }

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", handleFeedbackSubmit);
  }

  // ---------- NEWSLETTER FORM ----------
  var newsletterForm = qs("#newsletter-form");
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    var email = qs("#newsletter-email") ? qs("#newsletter-email").value.trim() : "";
    if (!email) {
      showToast("Enter your email.");
      return;
    }

    var storeKey = "newsletterSubscriptions";
    var existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(storeKey)) || [];
    } catch (e2) {}
    existing.push({ email: email, ts: Date.now() });
    localStorage.setItem(storeKey, JSON.stringify(existing));

    showToast("Subscribed!");
    e.target.reset();
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }

  // ---------- COMMUNITY PAGE EVENT MODAL ----------
  var eventModal = qs("#event-modal");
  var closeEventBtn = qs("#closeEventBtn");
  var eventItemsContainer = qs("#event-details");
  var eventForm = qs("#event-form");

  function openEventModal(evtTitle) {
    if (!eventModal) return;
    // update heading or hidden input
    var titleEl = qs("#event-form-title");
    var hiddenEvent = qs("#event-name-hidden");
    if (titleEl) titleEl.textContent = evtTitle || "Event Inquiry";
    if (hiddenEvent) hiddenEvent.value = evtTitle || "Event Inquiry";
    eventModal.classList.remove("hidden");
    eventModal.setAttribute("aria-hidden", "false");
  }

  function closeEventModal() {
    if (!eventModal) return;
    eventModal.classList.add("hidden");
    eventModal.setAttribute("aria-hidden", "true");
  }

  if (closeEventBtn) {
    closeEventBtn.addEventListener("click", closeEventModal);
  }

  if (eventModal) {
    eventModal.addEventListener("click", function (e) {
      if (e.target.classList.contains("modal__backdrop")) {
        closeEventModal();
      }
    });
  }

  // open buttons
  qsa(".open-event-modal").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var evtTitle = btn.getAttribute("data-event");
      openEventModal(evtTitle);
    });
  });

  // submit event form
  function handleEventSubmit(e) {
    e.preventDefault();
    var name = qs("#ev-name") ? qs("#ev-name").value.trim() : "";
    var contact = qs("#ev-contact") ? qs("#ev-contact").value.trim() : "";
    var msg = qs("#ev-message") ? qs("#ev-message").value.trim() : "";
    var evt = qs("#event-name-hidden") ? qs("#event-name-hidden").value.trim() : "";

    if (!name || !contact || !msg) {
      showToast("Please fill all required fields.");
      return;
    }

    var payload = {
      eventTitle: evt,
      name: name,
      contact: contact,
      message: msg,
      ts: Date.now()
    };

    var storeKey = "eventInquiries";
    var existing = [];
    try {
      existing = JSON.parse(localStorage.getItem(storeKey)) || [];
    } catch (e2) {}
    existing.push(payload);
    localStorage.setItem(storeKey, JSON.stringify(existing));

    showToast("Thanks! We'll reach out.");
    e.target.reset();
    closeEventModal();
  }

  if (eventForm) {
    eventForm.addEventListener("submit", handleEventSubmit);
  }

  // ---------- ADD TO CART BUTTONS ----------
  function attachAddToCartButtons() {
    qsa("[data-add-to-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var name = btn.getAttribute("data-name");
        var price = btn.getAttribute("data-price");
        addToCart(id, name, price);
      });
    });
  }

  // ---------- ESCAPE HTML ----------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    attachAddToCartButtons();
  });

})();
