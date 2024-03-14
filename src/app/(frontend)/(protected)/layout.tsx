import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { verifyToken } from "@/lib/auth"
import { authRoutes } from "@/lib/constants"

import ClientProtect from "./client-protect"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")
  if (!token || !token.value) {
    redirect(authRoutes.redirectOnUnhauthorized)
  }
  const valid = verifyToken(token.value)
  if (!valid) {
    redirect(authRoutes.redirectOnUnhauthorized)
  }

  return (
    <>
      <ClientProtect />
      {children}
    </>
  )
}
