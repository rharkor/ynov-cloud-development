import { Link } from "@nextui-org/react"

import SignUpForm from "./form"

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <section className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
        <h1 className="pb-2 text-xl font-medium">Sign up</h1>
        <SignUpForm />
        <p className="text-center text-small">
          Already have an account?{" "}
          <Link href="/sign-in" size="sm">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  )
}
