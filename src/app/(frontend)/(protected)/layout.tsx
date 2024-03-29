import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"

import Navbar from "@/components/navbar"
import { verifyToken } from "@/lib/auth"
import { authRoutes } from "@/lib/constants"

import ClientProtect from "./client-protect"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")
    if (!token || !token.value) {
      redirect(authRoutes.redirectOnUnhauthorized, RedirectType.push)
    }
    const valid = await verifyToken(token.value)
    if (!valid) {
      redirect(authRoutes.redirectOnUnhauthorized, RedirectType.push)
    }
  } catch (e) {}

  return (
    <div className="flex h-screen flex-col">
      <ClientProtect />
      <Navbar />
      {children}
    </div>
  )
}
