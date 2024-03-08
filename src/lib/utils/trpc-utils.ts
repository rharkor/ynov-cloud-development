import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { toast } from "react-toastify"

import { logger } from "@/lib/logger"
import { TErrorMessage } from "@/types/trpc"
import { TRPCClientErrorLike } from "@trpc/client"

import { AppRouter } from "../../api/_app"
import { authRoutes } from "../constants"

type TOptions = {
  showNotification?: boolean // default true
}

export const handleApiError = async <T extends TRPCClientErrorLike<AppRouter>>(
  error: T,
  router: AppRouterInstance
): Promise<T> => {
  try {
    const parsedError = JSON.parse(error.message) as TErrorMessage | string
    if (typeof parsedError === "string") {
      if (error.data?.code === "UNAUTHORIZED") {
        router.push(authRoutes.redirectOnUnhauthorized)
      }
      return {
        ...error,
        message: error.message,
      }
    }

    const avoidRedirect = parsedError.extra && "redirect" in parsedError.extra && parsedError.extra.redirect === false
    if (error.data?.code === "UNAUTHORIZED" && !avoidRedirect) {
      router.push(authRoutes.redirectOnUnhauthorized)
    }

    return {
      ...error,
      message: parsedError.message,
    }
  } catch (e) {
    return {
      ...error,
      message: "An error occurred. Please try again later.",
    }
  }
}
export const handleQueryError = async <T extends TRPCClientErrorLike<AppRouter>>(
  error: T,
  router: AppRouterInstance,
  opts: TOptions = { showNotification: true }
): Promise<T> => {
  const resp = await handleApiError(error, router)
  logger.error("Query error:", resp.message)
  if (opts.showNotification) {
    toast.error(resp.message, {
      toastId: error.message,
    })
  }
  return resp
}

export const handleMutationError = async <T extends TRPCClientErrorLike<AppRouter>>(
  error: T,
  router: AppRouterInstance,
  opts: TOptions = { showNotification: true }
): Promise<T> => {
  const resp = await handleApiError(error, router)
  logger.error("Mutation error:", resp.message)
  if (opts.showNotification) {
    toast.error(resp.message, {
      toastId: error.message,
    })
  }
  return resp
}
