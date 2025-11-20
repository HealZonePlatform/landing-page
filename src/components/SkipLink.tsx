'use client';

/**
 * SkipLink Component
 * Provides keyboard navigation accessibility by allowing users to skip to main content.
 * This is essential for a11y and helps screen reader users navigate more efficiently.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 -translate-y-full focus:translate-y-0 bg-brand-primary text-white px-4 py-2 z-50 transition-transform duration-200"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
