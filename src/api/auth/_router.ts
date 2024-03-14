import { authenticatedProcedure, publicProcedure, router } from "@/lib/server/trpc"

import { signIn, signOut, signUp } from "./mutations"
import {
  signInResponseSchema,
  signInSchema,
  signOutResponseSchema,
  signUpResponseSchema,
  signUpSchema,
} from "./schemas"

export const authRouter = router({
  signIn: publicProcedure.input(signInSchema).output(signInResponseSchema).mutation(signIn),
  signUp: publicProcedure.input(signUpSchema).output(signUpResponseSchema).mutation(signUp),
  signOut: authenticatedProcedure.output(signOutResponseSchema).mutation(signOut),
})
