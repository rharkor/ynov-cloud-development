import { notFound } from "next/navigation"

import { env } from "@/lib/env.mjs"

export const metadata = {
  title: "Api doc",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDev = env.ENV === "development"
  if (!isDev) notFound()

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
