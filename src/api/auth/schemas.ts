import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
})

export const signInResponseSchema = z.object({
  token: z.string(),
})

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  name: z.string().min(1, "Name is required"),
})

export const signUpResponseSchema = z.object({
  token: z.string(),
})

export const signOutResponseSchema = z.object({
  success: z.boolean(),
})
