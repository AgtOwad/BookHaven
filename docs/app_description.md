## 1. Brand & Visual System

**Business**
Book Haven Bookstore is a local bookstore / stationery shop selling books, magazines, journals, and office supplies. The goal of the site is: promote products, attract visitors to call or visit, and make it easy to ask about products or place custom orders. The tone is “literary, warm, trustworthy, community-focused.”  

**Color palette (we choose Palette 1)**
Palette 1 matches an inviting, bookish, slightly vintage feel that celebrates “the written word” and feels like a bookstore, not a toy shop. We’ll use:

* Inkwell Blue `#2E4057` (primary brand/nav background, CTA buttons)
* Aged Gold `#C7B65E` (accents, badges like “Staff Pick”)
* Parchment White `#FFF7EE` (page background / card background)
* Intensity Indigo `#EE583F` and Dusty Rose `#F7B3CC` as subtle highlight colors for promos/sale tags, not for body text
  This palette is warm, readable, and supports accessibility contrast more than palette 3 (which is very pastel) and more than palette 2 (which skews dark-on-dark). 

**Logo choice**
Use the matching “Book Haven Bookstore” logo variant from Palette 1 (the logo colors are designed to match that palette and should not be mixed with other palettes). The logo goes in the header as left-aligned brand identity. 

**Font color (we choose Font Color 2)**
Use Bookish Black `#131C26` for body text, headings, nav links, etc. It gives strong contrast on Parchment White and remains readable for visually impaired users. Avoid ultra-light text colors like “Vintage Paper” on light backgrounds because of contrast issues. 

**Typography (we choose Typography Option 2)**
Typography Option 2 is clean, modern, readable, and mostly sans-serif (Arial + Calibri). That’s better for accessibility and cross-device rendering than mixes like Comic Sans / Impact / Courier.

* Title Large: Arial Bold 30px
* Section Titles / Card Titles: Arial Bold 25px
* Subtitle / labels: Comfortaa 15px (friendly, rounded)
* Body text: Calibri Normal 16px
* Body Strong: Calibri Bold 16px for emphasis
* Captions / price labels: Arial Bold 11px
  We will not mix fonts outside Option 2. 

**Global styling system**

* Background: Parchment White `#FFF7EE`
* Cards / sections: white or very light parchment with soft border `rgba(0,0,0,0.05)` and subtle shadow
* Buttons: Inkwell Blue background, white text, 8px radius, medium-bold text
* Accent badges / promo flags: Aged Gold background, Bookish Black text
* Spacing: generous padding (24px desktop sections, 16px mobile)
* Rounded corners: 8px to 12px on cards/modals/buttons
* Shadows: soft, low elevation to feel calm/bookstore, not neon tech

**Accessibility / responsive baseline**

* All text uses high-contrast pairs (Bookish Black on Parchment White, white on Inkwell Blue) to support visually impaired users. 
* Alt text on all product images and logo.
* Semantic HTML landmarks for `<header>`, `<nav>`, `<main>`, `<footer>`.
* Keyboard-focus-visible states on interactive elements (nav links, buttons, Add to Cart).
* Layout collapses into a single-column mobile view and keeps tap targets ≥44px. The desktop design is the main requirement; we also provide a brief plan for mobile to satisfy the “desktop plus mobile plan” requirement. 

---

## 2. Site Architecture (4 required pages)

Per requirements, we must ship four distinct pages:

1. Homepage
2. Gallery
3. About Us
4. Custom page (we'll call it “Community & Events”) 

All pages share:

* Global header with logo (Palette 1 logo), site title, and nav bar

  * Nav links: Home | Gallery | About Us | Community & Events
  * Cart icon / “View Cart” button visible on all pages top-right for convenience (desktop). 
* Global footer with:

  * Newsletter subscribe field (email input + Subscribe button)
  * Social media icons/links
  * Quick nav links
  * Copyright line
    This is required: footer must include subscribe, social links, and navigation. 

### (A) Homepage

**Goal:** Showcase highlights, promos, perks, categories, and product imagery. Required content:

* Client highlights (what makes Book Haven special: curated local picks, stationery, journals, etc.)
* Shopping promos (sale, seasonal bundle, “Buy 2 journals get 1 free”, etc.)
* Product/item images
* Shopping perks (e.g. “Local pickup”, “Custom orders available”, “Gift wrapping”)
* Categories of products (Books, Magazines, Journals, Office Supplies). 

**Layout (desktop)**

1. **Hero / Highlight Banner**

   * Left: Headline (“Find Your Next Favorite Book”) in Arial Bold 30px.
   * Subtext in Calibri 16px describing Book Haven’s curation.
   * CTA button “Browse Gallery” (Inkwell Blue background).
   * Right: Feature image of a stack of books / magazines from provided assets. 
2. **Promotions Strip**
   Horizontal cards with promo badges (Aged Gold pill badge + black text).
3. **Shopping Perks Row**
   3–4 icon+text blocks (“Local Pickup”, “Custom Orders”, “Weekly New Arrivals”, “Student Discounts”).
4. **Product Categories Grid**
   2x2 or 4-column row of category cards (“Books”, “Magazines”, “Journals & Notebooks”, “Office / Study Supplies”), each card clickable -> Gallery filtered section.
5. **Featured Items Preview**
   A mini 3-column row previewing 3 hero products from the Gallery grid with image, short description, and an Add to Cart button under each card. The Add to Cart here still triggers the cart logic. 

**Mobile plan:**
All sections stack vertically 1-column, hero image goes above or below text, nav collapses to hamburger, cart becomes a single cart icon in the header. 

---

### (B) Gallery Page

**Goal:** Showcase items for sale in a structured layout with Add to Cart. Requirements:

* A “View Shopping Cart” button
* Items/services sold by the client in tabular or grid format
* Each item: an image, short description, and Add to Cart button
* Cart flow: Add to Cart triggers “Item added.” dialog; View Cart opens modal, with “Clear Cart” and “Process Order” (“Thank you for your order.”). 

**Layout (desktop)**

1. Page header row:

   * Left: Page title “Gallery” (Arial Bold 30px)
   * Right: “View Cart” button (Inkwell Blue background / white text)
2. Product Grid

   * 3 columns x 3 rows using the nine provided product images:

     * Magazines (“TRAVEL”, “EAT.”, “BALL”),
     * Books (“Brie Mine 4Ever”, “Glory Riders”, “Sorcerer’s Shadowed Chronicles”),
     * Tote bag (“ALL I DO IS READ READ READ”),
     * Sticker pack (reading-themed stickers),
     * Branded notebook.
       These exact assets are called out as the featured images and should be displayed in a 3x3 grid. 
   * Each card has:

     * Product image with alt text
     * Title (Arial Bold 25px)
     * Short 1–2 line description (Calibri 16px)
     * Price / tag area (Aged Gold pill with black text, small Arial Bold 11px)
     * “Add to Cart” button (Inkwell Blue button)
3. Cart modal (hidden by default, triggered by “View Cart”)

   * Table/list of items (name, qty, subtotal) in a simple light card over dimmed background
   * Buttons at bottom of modal:

     * Clear Cart (outline button in Bookish Black border) clears local cart data and empties modal
     * Process Order (Inkwell Blue solid button) triggers confirmation dialog “Thank you for your order.”
   * Accessibility: modal must be focus-trapped, escapable with ESC key, and screen-reader labeled. 

**Mobile plan:**
Grid becomes 2 columns. Cart button fixed top-right as icon with item count badge. Modal still full-screen overlay.

---

### (C) About Us Page

**Goal:** Tell the story + hours + contact/feedback/custom order form. Requirements:

* A description of the client, including business hours
* A form for client feedback and custom orders
* That form must save to web storage.  

**Layout (desktop)**

1. Intro / Story Card

   * “About Book Haven Bookstore” (Arial Bold 30px)
   * Mission text (“local treasure for book enthusiasts… fosters literary exploration… supports intellectual growth”) pulled from the client description. 
   * Hours of Operation list (Mon–Fri 9 a.m.–8 p.m., Sat 10 a.m.–6 p.m., Sun 11 a.m.–5 p.m.) in a clean info sidebar style. 
2. Feedback & Custom Order Form Card

   * Fields: Name, Email/Phone, Message, Custom Request (what book/item are you looking for?)
   * “Send Request” button
   * After submit: show a success banner like “Thanks! We got your request.”
   * Store submission data to web storage so the business can retrieve it later, per requirement to use connectivity to web storage. (Implementation detail: this is localStorage/sessionStorage for now, not a live backend.)  
   * Accessibility: each `<label>` ties to its `<input>`/`<textarea>`, required fields are clearly marked.

**Mobile plan:**
Stack vertically. Hours block becomes collapsible.

---

### (D) Custom Page (“Community & Events”)

The 4th required page is a “custom” page. The doc suggests it can include testimonials, community involvement, and collaborations/events. We'll call it **Community & Events** and design it around Book Haven’s local presence. 

**Layout (desktop)**

1. Customer Testimonials

   * Cards with quote text in Calibri 16px and customer name in Calibri Bold 16px
   * Use Aged Gold accent bar on the left of each testimonial card to tie into palette
2. Community Involvement

   * “We support local readers / book clubs / school supply drives” etc.
   * Photo or illustration style cards to show “local bookstore, not just an e-commerce site”
3. Events & Collaborations

   * Upcoming “Author Meet & Greet”, “Book Club Night”, “Back-to-School Supply Fair”, etc.
   * Each event card: Title (Arial Bold 25px), Date/Time (Arial Bold 11px in Aged Gold tag), short description in Calibri 16px
   * CTA “Ask About This Event” → opens a mini form modal that reuses the same web storage pattern as About Us so customers can RSVP / request info
4. Secondary CTA at bottom: “Visit Us Today” with hours + location/contact to meet the goal of encouraging people to call or visit. 

**Mobile plan:**
Each card becomes full-width stacked. Testimonials become a swipeable carousel.

---

## 3. Functionality / Behavior (JS + storage)

We must implement specific dynamic behaviors with JavaScript:

1. **Navigation bar**

   * Responsive hamburger menu on mobile
   * Active link highlighting
   * Keyboard focus states for accessibility. 
2. **Subscribe (Footer Newsletter)**

   * User enters email → click Subscribe → we simulate a save to `localStorage["newsletterSubscriptions"]` and show “Subscribed!” toast. This satisfies “Subscribe-to-newsletter feature in the footer.”  
3. **Add to Cart**

   * Every product card has an Add to Cart button
   * On click:

     * Store/update cart array in `localStorage["cart"]` (product id, name, qty)
     * Immediately show an alert/dialog “Item added.” as required. 
4. **View Cart**

   * Clicking “View Cart” (in header/top-right of Gallery and globally in nav) opens a modal overlay that lists current cart items from localStorage.
   * Inside modal:

     * “Clear Cart” button wipes `localStorage["cart"]` → modal updates to empty.
     * “Process Order” button triggers a thank-you dialog: “Thank you for your order.” 
5. **Customer Feedback / Custom Order Form (About Us)**

   * On submit, save the form data to `sessionStorage["feedbackDrafts"]` (or localStorage if we want persistence) and show confirmation text: “Thanks for reaching out — we’ll get back to you.” This meets “connectivity to web storage” for the form.  
6. **Responsive design plan**

   * Breakpoints collapse multi-column areas into single-column stacks
   * Nav becomes hamburger
   * Cart becomes icon with badge
   * Typography scales down (30px -> ~24px, 25px -> ~20px)
     This satisfies: desktop build plus mobile plan for the client. 
