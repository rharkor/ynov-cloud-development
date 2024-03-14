import { z } from "zod"

import { TTokenPayload } from "./auth"

export type ITrpcContext<ISLoggedIn extends boolean = true> = {
  headers: { [k: string]: string } | null | undefined
  req: Request | null | undefined
  session: ISLoggedIn extends true ? TTokenPayload : null | undefined
}

export type TErrorMessage = {
  message: string
  extra?: object
}

export type apiInputFromSchema<T extends z.Schema | undefined, ISLoggedIn extends boolean = true> = {
  input: T extends z.Schema ? z.infer<T> : unknown
  ctx: ITrpcContext<ISLoggedIn>
}
