import { TErrorMessage } from "@/types/trpc"
import { TRPCError } from "@trpc/server"
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"

import { logger } from "../logger"

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
