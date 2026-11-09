import type { NextConfig } from "next";
import { legacyRedirects } from "./legacyRedirects";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Redirects from the old PHP site's URLs (phongkhamnhidong.com) so existing
  // Google results and bookmarks keep working. Old numeric IDs can't be mapped
  // to new Sanity slugs, so detail pages go to their section listing.
  async redirects() {
    return [
      // Specific article / category / Q&A redirects first (generated list)
      ...legacyRedirects,
      { source: "/home", destination: "/", permanent: true },
      { source: "/hinhanh", destination: "/", permanent: true },
      { source: "/gioithieu", destination: "/gioi-thieu", permanent: true },
      { source: "/lienhe", destination: "/lien-he", permanent: true },
      { source: "/lienket", destination: "/lien-ket-web", permanent: true },
      { source: "/kienthuc/:path*", destination: "/kien-thuc", permanent: true },
      { source: "/tintuc/:path*", destination: "/tin-tuc", permanent: true },
      { source: "/hoidap/:path*", destination: "/hoi-dap", permanent: true },
    ];
  },
};

export default nextConfig;
