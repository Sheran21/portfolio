import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old Vercel domain served a full duplicate of the site. Permanently
  // redirect it to the custom domain so Google indexes one URL only.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "portfolio-janulsamaranayake.vercel.app" }],
        destination: "https://www.janul-samaranayake.me/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
