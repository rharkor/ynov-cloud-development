import { z } from "zod"

export type ITrpcContext = {
  headers: { [k: string]: string } | null | undefined
  req: Request | null | undefined
}

export type TErrorMessage = {
  message: string
  extra?: object
}

export type apiInputFromSchema<T extends z.Schema | undefined> = {
  input: T extends z.Schema ? z.infer<T> : unknown
  ctx: ITrpcContext
}
