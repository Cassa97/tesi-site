const repoName = "tesi-site";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`
};

export default nextConfig;