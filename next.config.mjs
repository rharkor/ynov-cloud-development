import bunldeAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/login",
        destination: "/sign-in",
        permanent: process.env.ENV === "production" ? true : false,
      },
      {
        source: "/signin",
        destination: "/sign-in",
        permanent: process.env.ENV === "production" ? true : false,
      },
      {
        source: "/signup",
        destination: "/sign-up",
        permanent: process.env.ENV === "production" ? true : false,
      },
      {
        source: "/register",
        destination: "/sign-up",
        permanent: process.env.ENV === "production" ? true : false,
      },
    ]
  },
}
const withBundleAnalyzer = bunldeAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

export default withBundleAnalyzer(nextConfig)
