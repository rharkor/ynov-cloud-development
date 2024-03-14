"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { signUpSchema } from "@/api/auth/schemas"
import FormField from "@/components/ui/form"
import useAuth from "@/contexts/auth/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/react"

const formSchema = signUpSchema
  .extend({
    "password-confirm": z.string(),
  })
  .refine((data) => data.password === data["password-confirm"], {
    message: "Passwords do not match",
    path: ["password-confirm"],
  })
type IForm = z.infer<typeof formSchema>

export default function SignUpForm() {
  const { register } = useAuth()

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      "password-confirm": "",
      name: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    await register(data)
  })

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <FormField form={form} name="email" type="email" label="Email Address" placeholder="Enter your email address" />
      <FormField
        form={form}
        name="password"
        type="password-eye-slash"
        label="Password"
        placeholder="Enter your password"
        passwordStrength
        autoComplete="new-password"
      />
      <FormField
        form={form}
        name="password-confirm"
        type="password"
        label="Password confirm"
        placeholder="Confirm your password"
        autoComplete="new-password"
      />
      <FormField form={form} name="name" type="text" label="Name" placeholder="Enter your name" />
      <Button type="submit" color="primary" className="w-full" isLoading={form.formState.isSubmitting}>
        Register
      </Button>
    </form>
  )
}
