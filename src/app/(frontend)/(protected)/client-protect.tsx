"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import useAuth from "@/contexts/auth/utils"
import { authRoutes } from "@/lib/constants"

export default function ClientProtect() {
  const { userState } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (userState !== "loading" && userState !== "connected") router.push(authRoutes.redirectOnUnhauthorized)
  }, [userState, router])

  return null
}
