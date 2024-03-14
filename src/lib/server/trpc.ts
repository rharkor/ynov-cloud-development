import jws from "jws"
import superjson from "superjson"
import { ZodError } from "zod"

import { TTokenPayload } from "@/types/auth"
import { initTRPC } from "@trpc/server"

import { verifyToken } from "../auth"
import { Context } from "../trpc/context"
import { ApiError } from "../utils/server"

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === "BAD_REQUEST" && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createCallerFactory = t.createCallerFactory
export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

const isAuthenticated = middleware(async (opts) => {
  // const { session } = await getAuthApi()
  const cookies = opts.ctx.req?.headers.get("cookie")
  const tokenCookie = cookies
    ?.split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1]
  const bearerToken = opts.ctx.req?.headers.get("authorization")?.replace("Bearer ", "")
  const token = bearerToken || tokenCookie
  if (!token) {
    ApiError("unauthorized", "UNAUTHORIZED")
  }

  const isValid = verifyToken(token)
  if (!isValid) {
    ApiError("unauthorized", "UNAUTHORIZED")
  }

  const decoded = jws.decode(token)
  if (!decoded) {
    ApiError("unauthorized", "UNAUTHORIZED")
  }
  const session = JSON.parse(decoded.payload) as TTokenPayload
  if (!session) {
    ApiError("unauthorized", "UNAUTHORIZED")
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      session,
    },
  })
})
export const authenticatedProcedure = t.procedure.use(isAuthenticated)
