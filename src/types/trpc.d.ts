import { z } from "zod"

import { TTokenPayload } from "./auth"

export type ITrpcContext<ISLoggedIn extends boolean | undefined = undefined> = {
  headers: { [k: string]: string } | null | undefined
  req: Request | null | undefined
  session: ISLoggedIn extends undefined
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
  : ISLoggedIn extends true
  ? TTokenPayload
  : null | undefined
  isServer?: boolean
}

export type TErrorMessage = {
  message: string
  extra?: object
}

export type apiInputFromSchema<T extends z.Schema | undefined, ISLoggedIn extends boolean = true> = {
  input: T extends z.Schema ? z.infer<T> : unknown
  ctx: ITrpcContext<ISLoggedIn>
}
