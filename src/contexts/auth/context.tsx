import { createContext } from "react"

import { TTokenPayload } from "@/types/auth"

export type TAuthContext = {
  user: TTokenPayload | null
  userState: "loading" | "disconnected" | "connected"
  login: (data: { email: string; password: string }) => Promise<void>
  logout: () => void
  register: (data: { email: string; password: string; name: string }) => Promise<void>
}

// Set the context to null in order to detect if it's being used outside of the provider
export const AuthContext = createContext(null as unknown as TAuthContext)
