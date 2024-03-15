"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import jws from "jws"

import { trpc } from "@/lib/trpc/client"
import { TTokenPayload } from "@/types/auth"

import { AuthContext, TAuthContext } from "./context"

export default function AuthProvider({
  children,
  ssUser,
}: {
  children: React.ReactNode
  ssUser: TAuthContext["user"]
}) {
  const router = useRouter()
  const [user, setUser] = useState<TAuthContext["user"]>(ssUser)
  const [userState, setUserState] = useState<TAuthContext["userState"]>("loading")

  useEffect(() => {
    if (typeof window === "undefined") return

    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1]
    if (!token) {
      setUserState("disconnected")
      return
    }

    const decoded = jws.decode(token)
    if (!decoded) {
      setUserState("disconnected")
      return
    }
    const payload = JSON.parse(decoded.payload) as TTokenPayload
    setUser(payload)
    setUserState("connected")
  }, [])

  const loginMutation = trpc.auth.signIn.useMutation()
  const login: TAuthContext["login"] = async (data) => {
    const res = await loginMutation.mutateAsync(data)
    // Store the token in cookies
    if (typeof window !== "undefined") {
      document.cookie = `token=${res.token}; path=/`
    }
    const decoded = jws.decode(res.token)
    const payload = JSON.parse(decoded.payload) as TTokenPayload

    setUser(payload)
    setUserState("connected")
    router.push("/")
  }

  const logoutMutation = trpc.auth.signOut.useMutation()
  const logout: TAuthContext["logout"] = async () => {
    await logoutMutation.mutateAsync()
    // Remove the token from cookies
    if (typeof window !== "undefined") {
      document.cookie = "token=; path=/;"
    }
    setUser(null)
    setUserState("disconnected")
  }

  const registerMutation = trpc.auth.signUp.useMutation()
  const register: TAuthContext["register"] = async (data) => {
    const res = await registerMutation.mutateAsync(data)
    // Store the token in cookies
    if (typeof window !== "undefined") {
      document.cookie = `token=${res.token}; path=/`
    }
    const decoded = jws.decode(res.token)
    const payload = JSON.parse(decoded.payload) as TTokenPayload

    setUser(payload)
    setUserState("connected")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, userState, login, logout, register }}>{children}</AuthContext.Provider>
}
