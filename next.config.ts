import createMDX from "@next/mdx";
import { withVercelToolbar } from "@vercel/toolbar/plugins/next";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  images: {
    remotePatterns: [
      {
        hostname: "cdn2.thecatapi.com",
        protocol: "https",
        search: "",
        port: "",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  experimental: {
    reactCompiler: true,
    ppr: true,
    dynamicIO: true,
  },
};
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // extension: /\.mdx?$/,
  options: {
    // @ts-expect-error wrong types
    remarkPlugins: [["remark-gfm", { strict: true, throwOnError: true }]],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withVercelToolbar({})(withMDX(nextConfig));
