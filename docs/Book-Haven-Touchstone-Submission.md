# Book Haven Touchstone Submission

---

## Cover Page Details
- **Name:** [Enter Your Name]
- **Date:** [Enter Submission Date]
- **Final Program Share Link from the IDE:** [Paste Your IDE Share Link]

> _Note: Replace the bracketed placeholders with your personal information before submitting._

---

## Introduction
Book Haven Bookstore is a warm, community-focused shop that curates books, magazines, journals, and study supplies for local readers. The four-page website highlights the brand's literary personality through welcoming copy, curated merchandise, and opportunities to stay in touch with upcoming events. 【F:index.html†L38-L116】【F:community.html†L33-L62】

### Visual Identity & Design Rationale
- **Color palette:** The interface uses the Palette 1 color tokens (`--inkwell-blue`, `--aged-gold`, `--parchment`, and accent hues) to pair deep blues with parchment neutrals and gold highlights, echoing the cozy bookstore brief. 【F:assets/css/style.css†L1-L42】
- **Typography system:** Headings rely on Arial for bold clarity, body copy uses Calibri for readability, and Comfortaa accents add warmth to subtitles, aligning with Typography Option 2. 【F:assets/css/style.css†L43-L84】
- **Branding:** Each page surfaces the Book Haven logo, store name, and navigation to reinforce brand recognition while keeping the experience consistent site-wide. 【F:index.html†L15-L64】【F:gallery.html†L15-L64】【F:about.html†L15-L64】【F:community.html†L15-L64】

---

## Wireframes (Reference Placeholders)
Provide exports or screenshots of your desktop and mobile wireframes in this section.
- **Desktop wireframes:** _[Insert screenshot here]_ 
- **Mobile wireframes:** _[Insert screenshot here]_ 

If you created Figma files, include the share URLs beneath each screenshot.

---

## Website Structure and Content
The site delivers four unique, fully linked pages that share a common header, footer, and cart access point for continuity. 【F:index.html†L15-L64】【F:gallery.html†L15-L64】【F:about.html†L15-L64】【F:community.html†L15-L64】

### Home Page (`index.html`)
- Hero banner introduces the store, invites browsing, and spotlights an illustrative reading graphic. 【F:index.html†L65-L109】
- Current Offers cards highlight bundle deals, new arrivals, and pickup convenience. 【F:index.html†L111-L136】
- Perks grid emphasizes custom orders, student support, and weekly updates. 【F:index.html†L138-L165】
- Shop by category section links directly to anchored gallery views for books, magazines, journals, and supplies. 【F:index.html†L167-L207】
- Staff Picks preview promotes three featured items with imagery, pricing, and Add to Cart buttons tied into the shared cart system. 【F:index.html†L209-L261】

### Gallery Page (`gallery.html`)
- Intro section couples a filter card with clear instructions for narrowing results by category, price, or collection. 【F:gallery.html†L69-L131】
- Dynamic grid renders nine merchandise cards with imagery, descriptions, and Add to Cart actions based on structured product data. 【F:assets/js/main.js†L430-L510】
- Pagination and result summaries update as users apply filters, ensuring clear feedback when exploring the catalog. 【F:assets/js/main.js†L512-L596】

### About Us Page (`about.html`)
- Story content celebrates Book Haven’s mission and community roots. 【F:about.html†L69-L95】
- Hours sidebar presents weekly availability in a semantic table for quick scanning. 【F:about.html†L119-L140】
- Custom order form gathers name, contact details, and request notes, then stores submissions for follow-up. 【F:about.html†L97-L118】【F:assets/js/main.js†L228-L293】

### Community & Events Page (`community.html`)
- Opening section frames the bookstore as a neighborhood hub. 【F:community.html†L33-L62】
- Testimonials grid features authentic reader voices in stylized quote cards. 【F:community.html†L64-L89】
- Community involvement cards showcase outreach programs like supply drives and study nights. 【F:community.html†L91-L118】
- Events grid advertises upcoming gatherings with date badges and inquiry buttons that open an event RSVP modal. 【F:community.html†L120-L186】【F:assets/js/main.js†L330-L399】

### Global Footer
Every page repeats a newsletter form, store address and hours, social links, and quick navigation for consistency and easy access to contact information. 【F:index.html†L263-L321】【F:gallery.html†L133-L191】【F:about.html†L142-L200】【F:community.html†L188-L246】

---

## Website Design and Styling
- **Layout system:** Sections rely on `.container` wrappers, generous spacing, and responsive grids/flexbox to keep content legible. 【F:assets/css/style.css†L44-L84】【F:assets/css/style.css†L86-L149】
- **Buttons & badges:** Primary buttons use Inkwell Blue backgrounds with rounded corners, while price badges and promo tags use Aged Gold to draw attention without overwhelming the parchment backdrop. 【F:assets/css/style.css†L189-L245】【F:index.html†L122-L151】【F:index.html†L213-L249】
- **Cards & panels:** Shadows, borders, and border-radius tokens deliver the soft, library-inspired aesthetic described in the planning brief. 【F:assets/css/style.css†L1-L84】【F:assets/css/style.css†L247-L342】

---

## Accessibility Practices
- Semantic HTML landmarks (`<header>`, `<main>`, `<section>`, `<footer>`) structure each page for assistive technologies. 【F:index.html†L13-L262】【F:gallery.html†L13-L189】【F:about.html†L13-L200】【F:community.html†L13-L246】
- Images include descriptive `alt` text, and form labels explicitly connect to their inputs to support screen reader users. 【F:index.html†L92-L204】【F:gallery.html†L95-L129】【F:about.html†L101-L118】【F:community.html†L132-L179】
- Interactive controls carry ARIA attributes where needed (e.g., modal dialogs, live regions, menu toggles), preserving context for keyboard-only navigation. 【F:index.html†L20-L64】【F:index.html†L289-L325】【F:community.html†L188-L236】【F:assets/js/main.js†L17-L75】
- Toast notifications fall back to `alert()` if the status region is unavailable, ensuring confirmation messages are always delivered. 【F:assets/js/main.js†L23-L53】

---

## Responsive Web Design
- The viewport meta tag is set to render layouts fluidly on mobile devices. 【F:index.html†L5-L11】【F:gallery.html†L5-L11】【F:about.html†L5-L11】【F:community.html†L5-L11】
- Navigation adapts via a hamburger toggle that opens a focusable mobile drawer, while cart controls remain reachable in both desktop and mobile contexts. 【F:index.html†L20-L64】【F:assets/js/main.js†L55-L121】
- Grids collapse gracefully for smaller screens thanks to mobile-friendly flexbox and grid rules defined in the stylesheet. 【F:assets/css/style.css†L344-L520】

---

## Website Functionality & Data Storage
- **Shopping cart:** Add to Cart buttons persist items in `localStorage`, update cart badges across pages, and show a modal summary with options to clear or process orders. 【F:index.html†L209-L261】【F:assets/js/main.js†L73-L227】
- **Gallery filtering:** Category, price, and collection filters recalculate the product grid and results messaging without reloading the page. 【F:gallery.html†L69-L131】【F:assets/js/main.js†L402-L596】
- **Newsletter sign-up:** Footer form submissions are validated client-side and saved to `localStorage` while providing toast confirmations. 【F:index.html†L263-L302】【F:assets/js/main.js†L295-L329】
- **Custom order & event inquiries:** About and Community forms validate required fields, store requests (`feedbackRequests`, `eventInquiries`) for retrieval, and show confirmation messaging. 【F:about.html†L97-L140】【F:community.html†L120-L222】【F:assets/js/main.js†L228-L399】
- **Session safeguards:** Draft feedback form input persists in `sessionStorage`, preventing accidental data loss during multi-field entry. 【F:assets/js/main.js†L228-L279】

---

## Screenshot Checklist (Insert Before Submission)
Replace each placeholder below with a screenshot that demonstrates the live site:
1. Home page hero and promotions (desktop view) – _[Insert screenshot]_ 
2. Gallery page with filters and product grid (desktop view) – _[Insert screenshot]_ 
3. About page custom order form with success message (desktop view) – _[Insert screenshot]_ 
4. Community & Events page showing event cards and modal (desktop view) – _[Insert screenshot]_ 
5. Mobile navigation drawer and cart badge on a narrow viewport – _[Insert screenshot]_ 

Add captions beneath each image summarizing what is being demonstrated.

---

## Final Notes
- Review the Touchstone grading rubric to confirm every required element is addressed before exporting this document to `.docx` for submission.
- Validate forms, navigation, and cart flows on both desktop and mobile breakpoints to capture accurate screenshots.
