import { ITrpcContext } from "@/types/trpc"
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

export function createContext(opts?: FetchCreateContextFnOptions, isServer?: boolean) {
  const response: ITrpcContext = {
    session: null,
    headers: opts && Object.fromEntries(opts.req.headers),
    req: opts && opts.req,
    isServer,
  }
  return response
}

export type Context = Awaited<ReturnType<typeof createContext>>
