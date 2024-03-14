import { cookies } from "next/headers"
import jws from "jws"
import { ToastContainer } from "react-toastify"

import AuthProvider from "@/contexts/auth/provider"
import TrpcProvider from "@/lib/trpc/provider"
import { TTokenPayload } from "@/types/auth"

import UIProvider from "./ui-provider"

import "react-toastify/dist/ReactToastify.css"

export default function RootProviders({ children }: { children: React.ReactNode }) {
  const cookiesStore = cookies()
  const token = cookiesStore.get("token")
  let ssUser: TTokenPayload | null = null
  if (token && token.value) {
    const decoded = jws.decode(token.value)
    const payload = JSON.parse(decoded.payload) as TTokenPayload
    ssUser = payload
  }

  return (
    <TrpcProvider>
      <UIProvider>
        <AuthProvider ssUser={ssUser}>{children}</AuthProvider>
      </UIProvider>
      <ToastContainer theme="dark" />
    </TrpcProvider>
  )
}
