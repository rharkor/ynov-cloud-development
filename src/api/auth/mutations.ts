import { z } from "zod"

import { createToken } from "@/lib/auth"
import { bcryptCompare, hash } from "@/lib/bcrypt"
import { authTokenExpiration } from "@/lib/constants"
import { prisma } from "@/lib/prisma"
import { ApiError, handleApiError } from "@/lib/utils/server"
import { apiInputFromSchema } from "@/types/trpc"

import { signInResponseSchema, signInSchema, signUpResponseSchema, signUpSchema } from "./schemas"

export const signIn = async ({ input }: apiInputFromSchema<typeof signInSchema, false>) => {
  try {
    const { email, password } = input
    const user = await prisma.user.findUnique({
      select: { password: true, email: true, id: true, name: true },
      where: { email },
    })
    if (!user) {
      ApiError("Invalid credentials")
    }

    const isValid = await bcryptCompare(password, user.password)
    if (!isValid) {
      ApiError("Invalid credentials")
    }

    const payload = {
      user: { email, id: user.id, name: user.name },
      exp: Date.now() + authTokenExpiration,
    }
    const token = await createToken(payload)

    const response: z.infer<typeof signInResponseSchema> = {
      token,
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const signUp = async ({ input }: apiInputFromSchema<typeof signUpSchema, false>) => {
  try {
    const { email, password: _password, name } = input
    const user = await prisma.user.findFirst({ where: { email } })
    if (user) {
      ApiError("User already exists")
    }

    const password = await hash(_password, 12)
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    })

    const payload = { user: { email, name, id: newUser.id }, exp: Date.now() + authTokenExpiration }
    const token = await createToken(payload)

    const response: z.infer<typeof signUpResponseSchema> = {
      token,
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const signOut = async ({ ctx: { session } }: apiInputFromSchema<typeof undefined, true>) => {
  try {
    await prisma.session.delete({ where: { id: session.sid } })
    return { success: true }
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
