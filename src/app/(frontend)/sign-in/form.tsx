"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { signInSchema } from "@/api/auth/schemas"
import FormField from "@/components/ui/form"
import useAuth from "@/contexts/auth/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/react"

const formSchema = signInSchema
type IForm = z.infer<typeof formSchema>

export default function SignInForm() {
  const { login } = useAuth()

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    await login(data)
  })

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <FormField
        form={form}
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email address"
        autoComplete="username"
      />
      <FormField
        form={form}
        name="password"
        type="password-eye-slash"
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
      />
      <Button type="submit" color="primary" className="w-full" isLoading={form.formState.isSubmitting}>
        Log in
      </Button>
    </form>
  )
}
