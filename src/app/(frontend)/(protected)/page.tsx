"use client"

import useAuth from "@/contexts/auth/utils"
import { Button } from "@nextui-org/react"

export default function Home() {
  const { logout } = useAuth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world!</h1>
      <Button onPress={logout}>Logout</Button>
    </main>
  )
}
