import { router } from "../lib/server/trpc"

import { moviesRouter } from "./movies/_router"

export const appRouter = router({
    movies: moviesRouter
})

export type AppRouter = typeof appRouter
