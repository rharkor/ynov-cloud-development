import { router } from "../lib/server/trpc"

import { authRouter } from "./auth/_router"
import { moviesRouter } from "./movies/_router"

export const appRouter = router({
  movies: moviesRouter,
  auth: authRouter,
})

export type AppRouter = typeof appRouter
