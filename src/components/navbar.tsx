"use client"

import { useContext } from "react"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

import { GeigerContext } from "@/app/(frontend)/geiger"
import useAuth from "@/contexts/auth/utils"
import { Button, Link, Navbar as ONavbar, NavbarContent, NavbarItem } from "@nextui-org/react"

import QuickSearch from "./header/quick-search"

export default function Navbar() {
  const { logout } = useAuth()
  const pathname = usePathname()

  const { setGeiger, geigerActivated } = useContext(GeigerContext)
  const toggleGeiger = () => {
    setGeiger(!geigerActivated)
  }

  return (
    <ONavbar
      shouldHideOnScroll
      classNames={{
        wrapper: "!container",
      }}
    >
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarLink href="/" isActive={pathname === "/"}>
          HOME
        </NavbarLink>
        <NavbarLink href="/liked" isActive={pathname === "/liked"}>
          LIKED
        </NavbarLink>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden lg:flex">
        <QuickSearch />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button variant="flat" className="bg-transparent opacity-25" onPress={toggleGeiger}>
            {geigerActivated ? "Disable" : "Enable"} Geiger
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button color="danger" variant="flat" className="flex flex-row gap-2" onPress={logout}>
            <LogOut className="size-3" />
            Log out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </ONavbar>
  )
}

function NavbarLink({
  isActive,
  children,
  ...props
}: {
  isActive: boolean
  children: React.ReactNode
} & React.ComponentProps<typeof Link>) {
  return (
    <NavbarItem isActive={isActive}>
      <Link color={isActive ? undefined : "foreground"} aria-current={isActive ? "page" : undefined} {...props}>
        {children}
      </Link>
    </NavbarItem>
  )
}
