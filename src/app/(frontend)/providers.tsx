import { ToastContainer } from "react-toastify"

import AuthProvider from "@/contexts/auth/provider"
import TrpcProvider from "@/lib/trpc/provider"

import UIProvider from "./ui-provider"

import "react-toastify/dist/ReactToastify.css"

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <UIProvider>
        <AuthProvider>{children}</AuthProvider>
      </UIProvider>
      <ToastContainer theme="dark" />
    </TrpcProvider>
  )
}
