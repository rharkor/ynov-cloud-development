import { Link } from "@nextui-org/react"

import SignInForm from "./form"

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
        <h1 className="pb-2 text-xl font-medium">Sign in</h1>
        <SignInForm />
        <p className="text-center text-small">
          Need to create an account?{" "}
          <Link href="/sign-up" size="sm">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  )
}
