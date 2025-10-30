# Book Haven Site – Agent Handbook

## Project Snapshot
- Static multi-page bookstore built with semantic HTML, a single CSS bundle, and vanilla JS wrapped in an IIFE.
- No bundler or package manager today; assets load straight from `assets/`.
- Interaction layer (cart, nav, modals, toasts) lives in `assets/js/main.js`; house style system is defined in `assets/css/style.css`.

## Build Like a Pro
- **HTML**: follow W3C and WCAG 2.1 AA practices—clean heading hierarchy, accessible labels, meaningful alt text. Stick to native elements before reaching for ARIA.
- **CSS**: stay within the design tokens already defined (`--inkwell-blue`, `--radius-card`, etc.). Group related rules together, lean on modern layout (flex/grid), and keep responsive tweaks mobile-first.
- **JavaScript**: write plain ES5/ES2015 that runs without transpilation. Reuse helpers in `main.js`, avoid globals, and prefer small, testable functions over giant blocks.
- **Performance**: keep new images optimized (≤200 KB when possible) and lazy-load anything heavy.

## Human Coding Style
- Code should read like a teammate wrote it: thoughtful naming, consistent formatting, no robotic comment dumps.
- Comment only when intent could be misunderstood.
- Write commits in everyday language with a clear purpose (e.g., `chore: tighten gallery spacing`), not AI boilerplate.

## Workflow Notes
- Use `functions.apply_patch` for incremental edits; this keeps diffs tidy.
- After HTML/CSS/JS changes, run a lightweight server (`python -m http.server 8000`) and sanity-check pages on mobile + desktop breakpoints.
- Manual testing matters: cart add/remove, toast timing, modal focus trapping, and mobile nav toggles should always get a quick pass.
- When touching shared UI, mirror changes across `about.html`, `community.html`, and `gallery.html` so the experience stays aligned.

## Quality Checklist
- Validate markup (W3C validator or `npx html-validate` once tooling exists).
- Spot-check responsive layouts near 360, 768, 1024, and 1280px.
- Keep Lighthouse accessibility and performance scores high; fix regressions before shipping.
- Track logic trade-offs in the PR description or commit body instead of over-commenting the source.

## Collaboration
- Surface big changes early: drop a short plan or TODO list before refactors.
- Hold off on new frameworks or heavy tooling until the team agrees.
- Update `.gitignore`, README, and this handbook whenever the build/test story evolves so the next human agent stays in the loop.
