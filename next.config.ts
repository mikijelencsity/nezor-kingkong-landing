import type { NextConfig } from "next";

const repoName = "nezor-kingkong-landing";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.1.104"],
};

export default nextConfig;
