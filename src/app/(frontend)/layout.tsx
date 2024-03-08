import type { Metadata } from "next"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import RootProviders from "./providers"

import "./globals.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiaseds min-h-screen bg-background font-sans", fontSans.variable)}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
