# Screenshot Capture Guide

Binary image assets are not stored in the repository. Use the provided automation script to generate fresh screenshots whenever needed.

## Prerequisites
1. Install Playwright and its browsers:
   ```bash
   pip install playwright
   playwright install chromium
   ```
2. Serve the site locally from the repository root:
   ```bash
   python -m http.server 8000
   ```

## Capture Screenshots
Run the capture script from the project root:
```bash
python scripts/capture_screenshots.py --output screenshots
```

The script saves PNG files for each page (home, about, community, gallery) into this folder. Add or remove paths with the `--pages` option (see `--help` for details).

## Manual Capture
If automation is unavailable, replace the generated images with manual captures named:
- `home.png`
- `about.png`
- `community.png`
- `gallery.png`

Keep screenshot dimensions consistent and under 2 MB each before attaching them to submissions.
