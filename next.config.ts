/**
 * Next.js configuration for the Horizon Skincare landing page.
 *
 * We use the static export feature (`output: 'export'`) to generate a
 * fully static site that can be served from GitHub Pages or any static
 * hosting platform. Because the site is deployed on a custom root
 * domain (horizonskincare.online), there is no subpath. Both
 * `basePath` and `assetPrefix` are therefore left empty so that
 * Next.js references assets correctly (e.g. `_next/static/...`).
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;