"use client"

import Link from "next/link"

import useAuth from "@/contexts/auth/utils"
import { Navbar as ONavbar, NavbarContent, NavbarItem } from "@nextui-org/react"

export default function Navbar() {
  const { user } = useAuth()
  console.log("🚀 ~ Navbar ~ user:", user)

  return (
    <ONavbar>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Log out</Link>
        </NavbarItem>
      </NavbarContent>
    </ONavbar>
  )
}
