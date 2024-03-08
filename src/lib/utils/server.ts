import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { TErrorMessage } from "@/types/trpc"
import { TRPCError } from "@trpc/server"
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"

import { logger } from "../logger"
import { TRPC_ERROR_CODES_BY_KEY } from "../trpc/utils"

export function ApiError(message: string, code?: TRPC_ERROR_CODE_KEY, extra?: object): never {
  const data: TErrorMessage = { message, extra }
  throw new TRPCError({
    code: code ?? "BAD_REQUEST",
    message: JSON.stringify(data),
  })
}

export const handleApiError = (error: unknown) => {
  if (error instanceof TRPCError) {
    throw error
  } else {
    logger.trace(error)
    if (error instanceof Error) return ApiError(error.message, "INTERNAL_SERVER_ERROR")
    return ApiError("unknownError", "INTERNAL_SERVER_ERROR")
  }
}

export const handleNextApiError = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 })
  } else if (error instanceof TRPCError) {
    try {
      const content = JSON.parse(error.message)
      return NextResponse.json({ error: content }, { status: TRPC_ERROR_CODES_BY_KEY[error.code] })
    } catch (e) {
      return NextResponse.json({ error: error.message }, { status: TRPC_ERROR_CODES_BY_KEY[error.code] })
    }
  } else {
    logger.trace(error)
    return NextResponse.json({ error: "unknownError" }, { status: 500 })
  }
}
