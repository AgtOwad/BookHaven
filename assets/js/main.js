(function () {
  "use strict";

  // ---------- UTILITIES ----------
  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  function readSessionJSON(key) {
    try {
      var raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeSessionJSON(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* ignore quota/security errors */
    }
  }

  function removeSessionItem(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      /* no-op when storage is unavailable */
    }
  }

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
  var FEEDBACK_DRAFT_KEY = "feedbackFormDraft";
  var FEEDBACK_LAST_KEY = "feedbackLastSubmission";

  function collectFeedbackDraftValues() {
    return {
      name: qs("#fb-name") ? qs("#fb-name").value : "",
      contact: qs("#fb-contact") ? qs("#fb-contact").value : "",
      message: qs("#fb-message") ? qs("#fb-message").value : ""
    };
  }

  function persistFeedbackDraft() {
    writeSessionJSON(FEEDBACK_DRAFT_KEY, collectFeedbackDraftValues());
  }

  function hydrateFeedbackDraft() {
    var draft = readSessionJSON(FEEDBACK_DRAFT_KEY);
    if (!draft) return;

    if (qs("#fb-name")) {
      qs("#fb-name").value = draft.name || "";
    }
    if (qs("#fb-contact")) {
      qs("#fb-contact").value = draft.contact || "";
    }
    if (qs("#fb-message")) {
      qs("#fb-message").value = draft.message || "";
    }
  }

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
    writeSessionJSON(FEEDBACK_LAST_KEY, payload);
    removeSessionItem(FEEDBACK_DRAFT_KEY);
    showToast("Thanks! We got your request.");
    e.target.reset();
  }

  if (feedbackForm) {
    hydrateFeedbackDraft();
    ["#fb-name", "#fb-contact", "#fb-message"].forEach(function (selector) {
      var field = qs(selector);
      if (field) {
        field.addEventListener("input", persistFeedbackDraft);
      }
    });
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

  // ---------- GALLERY FILTERING ----------
  var PRODUCT_DATA = [
    {
      id: "travel-mag",
      name: "TRAVEL Magazine",
      description: "Global adventures, destinations, and culture.",
      category: "Magazines",
      price: 6.99,
      image: "assets/img/gallery/travel-mag.png",
      alt: "Illustrated cover of TRAVEL magazine with mountain scene.",
      collections: ["staff"]
    },
    {
      id: "eat-mag",
      name: "EAT. Magazine",
      description: "Bold recipes, street food, and kitchen stories.",
      category: "Magazines",
      price: 5.99,
      image: "assets/img/gallery/eat-mag.png",
      alt: "Illustrated cover of EAT. magazine with a bowl graphic.",
      collections: ["new"]
    },
    {
      id: "ball-mag",
      name: "BALL Magazine",
      description: "Sports, hustle, and behind-the-scenes grit.",
      category: "Magazines",
      price: 5.5,
      image: "assets/img/gallery/ball-mag.png",
      alt: "Illustrated cover of BALL magazine with pickleball graphic.",
      collections: ["bestseller"]
    },
    {
      id: "brie-mine",
      name: "Brie Mine 4Ever",
      description: "A funny, feel-good romance.",
      category: "Books",
      price: 14.99,
      image: "assets/img/gallery/brie-mine.png",
      alt: "Cover art for Brie Mine 4Ever showing a cheese heart.",
      collections: ["staff", "bestseller"]
    },
    {
      id: "glory-riders",
      name: "Glory Riders",
      description: "Dust, honor, and grit in a fast-paced frontier tale.",
      category: "Books",
      price: 12.5,
      image: "assets/img/gallery/glory-riders.png",
      alt: "Cover art for Glory Riders with riders silhouettes.",
      collections: ["bestseller"]
    },
    {
      id: "sorcerer-chronicles",
      name: "Sorcerer’s Shadowed Chronicles",
      description: "Dark magic, fate, and rebellion.",
      category: "Books",
      price: 16,
      image: "assets/img/gallery/sorcerer-chronicles.png",
      alt: "Cover art for Sorcerer’s Shadowed Chronicles with magical moon.",
      collections: ["new"]
    },
    {
      id: "sticker-pack",
      name: "Reading Sticker Pack",
      description: "Bookish stickers for laptops, bottles, journals.",
      category: "Journals & Gifts",
      price: 4.99,
      image: "assets/img/gallery/sticker-pack.png",
      alt: "Reading-themed stickers pack illustration.",
      collections: ["staff"]
    },
    {
      id: "read-tote",
      name: "ALL I DO IS READ Tote Bag",
      description: "Carry books, notebooks, and snacks with pride.",
      category: "Supplies",
      price: 9.99,
      image: "assets/img/gallery/read-tote.png",
      alt: "Tote bag labeled All I Do Is Read Read Read.",
      collections: ["bestseller"]
    },
    {
      id: "bh-notebook",
      name: "Book Haven Notebook",
      description: "Hardcover, lined pages, bookstore-branded.",
      category: "Journals & Gifts",
      price: 8.5,
      image: "assets/img/gallery/notebook.png",
      alt: "Hardcover notebook with Book Haven branding.",
      collections: ["new"]
    }
  ];

  var ITEMS_PER_PAGE = 9;
  var productGridEl = qs("#productGrid");
  var resultsCountEl = qs("#galleryResultsCount");
  var paginationEl = qs("#galleryPagination");
  var filtersForm = qs("#galleryFilters");
  var clearFiltersBtn = qs("#clearFiltersBtn");

  var galleryState = {
    filters: { category: "all", price: "all", collection: "all" },
    filtered: PRODUCT_DATA.slice(),
    currentPage: 1
  };

  function initGalleryPage() {
    if (!productGridEl || !filtersForm) return;

    galleryState.filters = readFiltersFromForm();
    galleryState.filtered = getFilteredProducts(galleryState.filters);
    galleryState.currentPage = 1;

    renderGalleryView();

    filtersForm.addEventListener("submit", handleFilterSubmit);
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", handleClearFilters);
    }
  }

  function handleFilterSubmit(e) {
    e.preventDefault();
    galleryState.filters = readFiltersFromForm();
    galleryState.currentPage = 1;
    galleryState.filtered = getFilteredProducts(galleryState.filters);
    renderGalleryView();
  }

  function handleClearFilters() {
    if (!filtersForm) return;
    filtersForm.reset();
    galleryState.filters = { category: "all", price: "all", collection: "all" };
    galleryState.currentPage = 1;
    galleryState.filtered = getFilteredProducts(galleryState.filters);
    renderGalleryView();
  }

  function readFiltersFromForm() {
    var categorySelect = qs("#filter-category");
    var priceSelect = qs("#filter-price");
    var collectionSelect = qs("#filter-collection");

    return {
      category: categorySelect ? categorySelect.value : "all",
      price: priceSelect ? priceSelect.value : "all",
      collection: collectionSelect ? collectionSelect.value : "all"
    };
  }

  function getFilteredProducts(filters) {
    return PRODUCT_DATA.filter(function (product) {
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }
      if (filters.collection !== "all" && product.collections.indexOf(filters.collection) === -1) {
        return false;
      }
      if (!matchesPriceFilter(product.price, filters.price)) {
        return false;
      }
      return true;
    });
  }

  function matchesPriceFilter(price, filter) {
    if (filter === "all") return true;
    if (filter === "low") return price < 7;
    if (filter === "mid") return price >= 7 && price <= 12;
    if (filter === "high") return price > 12;
    return true;
  }

  function renderGalleryView() {
    var totalItems = galleryState.filtered.length;
    renderProductGrid();
    renderPagination(totalItems);
    updateResultsCount(totalItems);
  }

  function renderProductGrid() {
    if (!productGridEl) return;

    if (!galleryState.filtered.length) {
      productGridEl.innerHTML =
        '<div class="empty-state" role="status">No items match those filters yet. Try adjusting your selections.</div>';
      if (paginationEl) {
        paginationEl.classList.add("hidden");
        paginationEl.innerHTML = "";
      }
      return;
    }

    var start = (galleryState.currentPage - 1) * ITEMS_PER_PAGE;
    var pageItems = galleryState.filtered.slice(start, start + ITEMS_PER_PAGE);

    var cards = pageItems.map(function (product) {
      return (
        '<div class="product-card">' +
          '<div class="product-card__img">' +
            '<img src="' + product.image + '" alt="' + escapeHtml(product.alt) + '" />' +
          "</div>" +
          '<div class="price-badge">$' + product.price.toFixed(2) + "</div>" +
          '<div class="product-card__title">' + escapeHtml(product.name) + "</div>" +
          '<div class="product-card__desc">' + escapeHtml(product.description) + "</div>" +
          '<button class="btn-add-cart btn" data-add-to-cart data-id="' + product.id + '" data-name="' +
            escapeHtml(product.name) + '" data-price="' + product.price.toFixed(2) + '" type="button">Add to Cart</button>' +
        "</div>"
      );
    }).join("");

    productGridEl.innerHTML = cards;
    attachAddToCartButtons();
  }

  function renderPagination(totalItems) {
    if (!paginationEl) return;
    var totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    if (totalPages <= 1) {
      paginationEl.innerHTML = "";
      paginationEl.classList.add("hidden");
      return;
    }

    paginationEl.classList.remove("hidden");

    var buttons = [];
    var isFirstPage = galleryState.currentPage === 1;
    var isLastPage = galleryState.currentPage === totalPages;

    buttons.push(
      '<button type="button" class="pagination__btn pagination__btn--ghost" data-page="prev"' +
        (isFirstPage ? " disabled" : "") + ">Prev</button>"
    );

    for (var page = 1; page <= totalPages; page++) {
      var activeClass = galleryState.currentPage === page ? " pagination__btn--active" : "";
      buttons.push(
        '<button type="button" class="pagination__btn' + activeClass + '" data-page="' + page + '">' + page + "</button>"
      );
    }

    buttons.push(
      '<button type="button" class="pagination__btn pagination__btn--ghost" data-page="next"' +
        (isLastPage ? " disabled" : "") + ">Next</button>"
    );

    paginationEl.innerHTML = buttons.join("");

    qsa(".pagination__btn", paginationEl).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-page");
        var totalPages = Math.ceil(galleryState.filtered.length / ITEMS_PER_PAGE) || 1;

        if (target === "prev") {
          if (galleryState.currentPage > 1) {
            galleryState.currentPage -= 1;
            renderGalleryView();
          }
          return;
        }

        if (target === "next") {
          if (galleryState.currentPage < totalPages) {
            galleryState.currentPage += 1;
            renderGalleryView();
          }
          return;
        }

        var pageNumber = parseInt(target, 10);
        if (!isNaN(pageNumber) && pageNumber !== galleryState.currentPage) {
          galleryState.currentPage = pageNumber;
          renderGalleryView();
        }
      });
    });
  }

  function updateResultsCount(totalItems) {
    if (!resultsCountEl) return;

    if (!totalItems) {
      resultsCountEl.textContent = "No matches yet — adjust filters to explore more of the catalog.";
      return;
    }

    var start = (galleryState.currentPage - 1) * ITEMS_PER_PAGE + 1;
    var end = Math.min(start + ITEMS_PER_PAGE - 1, totalItems);
    var summary = "Showing " + start + "–" + end + " of " + totalItems + " items";

    var details = [];
    if (galleryState.filters.category !== "all") {
      details.push(galleryState.filters.category);
    }
    if (galleryState.filters.collection !== "all") {
      details.push(getCollectionLabel(galleryState.filters.collection));
    }
    if (galleryState.filters.price !== "all") {
      details.push(getPriceLabel(galleryState.filters.price));
    }

    if (details.length) {
      summary += " for " + details.join(", ");
    }

    resultsCountEl.textContent = summary + ".";
  }

  function getCollectionLabel(key) {
    var map = {
      new: "New Arrivals",
      staff: "Staff Picks",
      bestseller: "Bestsellers"
    };
    return map[key] || key;
  }

  function getPriceLabel(key) {
    if (key === "low") return "under $7";
    if (key === "mid") return "$7 to $12";
    if (key === "high") return "above $12";
    return "";
  }

  // ---------- ADD TO CART BUTTONS ----------
  function attachAddToCartButtons() {
    qsa("[data-add-to-cart]").forEach(function (btn) {
      if (btn.dataset.cartBound === "true") return;
      btn.dataset.cartBound = "true";
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
    initGalleryPage();
  });

})();
