import { cookies } from "next/headers"
import jws from "jws"
import { ToastContainer } from "react-toastify"

import AuthProvider from "@/contexts/auth/provider"
import TrpcProvider from "@/lib/trpc/provider"
import { TTokenPayload } from "@/types/auth"

import GeigerProvider from "./geiger"
import UIProvider from "./ui-provider"

import "react-toastify/dist/ReactToastify.css"

export default function RootProviders({ children }: { children: React.ReactNode }) {
  let ssUser: TTokenPayload | null = null
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")
    if (token && token.value) {
      const decoded = jws.decode(token.value)
      const payload = JSON.parse(decoded.payload) as TTokenPayload
      ssUser = payload
    }
  } catch (error) {}

  return (
    <GeigerProvider>
      <TrpcProvider>
        <UIProvider>
          <AuthProvider ssUser={ssUser}>{children}</AuthProvider>
        </UIProvider>
        <ToastContainer theme="dark" />
      </TrpcProvider>
    </GeigerProvider>
  )
}
