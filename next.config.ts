import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires allow-listing qualities (default is [75]). 90 gives the
    // card illustrations noticeably sharper edges; 75 stays available for the rest.
    qualities: [75, 90],
  },
};

export default nextConfig;
