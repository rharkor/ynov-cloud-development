"use client"

import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

import useAuth from "@/contexts/auth/utils"
import { Button, Link, Navbar as ONavbar, NavbarContent, NavbarItem } from "@nextui-org/react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <ONavbar
      shouldHideOnScroll
      classNames={{
        wrapper: "!container",
      }}
    >
      <NavbarContent>Hello, {user?.user.name}</NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarLink href="/" isActive={pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/liked" isActive={pathname === "/liked"}>
          Liked
        </NavbarLink>
      </NavbarContent>
      <NavbarContent justify="end">
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
