"""Capture Book Haven page screenshots without committing binary assets.

This script relies on Playwright to open each site page and write PNG files
into a target directory. By keeping the images out of version control, we
avoid binary push issues while still producing the required artifacts when
needed.
"""
from __future__ import annotations

import argparse
import asyncio
from pathlib import Path
from typing import Iterable, List, Sequence, Tuple

from playwright.async_api import async_playwright


DEFAULT_PAGES: Tuple[Tuple[str, str], ...] = (
    ("home", "index.html"),
    ("about", "about.html"),
    ("community", "community.html"),
    ("gallery", "gallery.html"),
)


def parse_pages(value: str) -> Sequence[Tuple[str, str]]:
    """Parse a comma-separated list of label=url pairs."""
    pages: List[Tuple[str, str]] = []
    for item in value.split(","):
        item = item.strip()
        if not item:
            continue
        if "=" not in item:
            raise argparse.ArgumentTypeError(
                f"Page definition '{item}' must use the form label=path"
            )
        label, path = item.split("=", 1)
        pages.append((label.strip(), path.strip()))
    if not pages:
        raise argparse.ArgumentTypeError("At least one page must be provided")
    return pages


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Capture Book Haven screenshots")
    parser.add_argument(
        "--base-url",
        default="http://localhost:8000",
        help="Base URL where the Book Haven site is served (default: %(default)s)",
    )
    parser.add_argument(
        "--pages",
        type=parse_pages,
        default=DEFAULT_PAGES,
        help=(
            "Comma-separated list of label=path pairs to capture. "
            "Example: home=index.html,about=about.html"
        ),
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("screenshots"),
        help="Directory where PNG files will be written",
    )
    parser.add_argument(
        "--viewport-width",
        type=int,
        default=1440,
        help="Viewport width in pixels for captures",
    )
    parser.add_argument(
        "--viewport-height",
        type=int,
        default=900,
        help="Viewport height in pixels for captures",
    )
    parser.add_argument(
        "--full-page",
        action="store_true",
        help="Capture the full scrollable page instead of just the viewport",
    )
    return parser


async def capture_page(
    page, base_url: str, label: str, path: str, output_dir: Path, full_page: bool
) -> None:
    url = f"{base_url.rstrip('/')}/{path.lstrip('/')}"
    await page.goto(url, wait_until="networkidle")
    destination = output_dir / f"{label}.png"
    await page.screenshot(path=str(destination), full_page=full_page)
    print(f"Saved {destination.relative_to(Path.cwd())}")


async def capture_screenshots(
    base_url: str,
    pages: Iterable[Tuple[str, str]],
    output_dir: Path,
    viewport_width: int,
    viewport_height: int,
    full_page: bool,
) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": viewport_width, "height": viewport_height}
        )
        page = await context.new_page()
        for label, path in pages:
            await capture_page(page, base_url, label, path, output_dir, full_page)
        await browser.close()


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    asyncio.run(
        capture_screenshots(
            base_url=args.base_url,
            pages=args.pages,
            output_dir=args.output,
            viewport_width=args.viewport_width,
            viewport_height=args.viewport_height,
            full_page=args.full_page,
        )
    )


if __name__ == "__main__":
    main()
