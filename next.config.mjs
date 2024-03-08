import bunldeAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
const nextConfig = {};
const withBundleAnalyzer = bunldeAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

export default withBundleAnalyzer(nextConfig)