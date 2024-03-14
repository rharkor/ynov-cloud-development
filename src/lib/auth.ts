import jwt from "jws"

import { TTokenPayload } from "@/types/auth"

import { env } from "./env.mjs"
import { logger } from "./logger"

export const verifyToken = (token: string) => {
  try {
    const valid = jwt.verify(token, hashingAlgorithm, env.JWT_SECRET)
    if (!valid) {
      return false
    }
    const payload = JSON.parse(jwt.decode(token).payload) as TTokenPayload
    const now = Date.now()
    if (!payload.exp || payload.exp < now) {
      logger.debug("Token expired")
      return false
    }
    return true
  } catch (error: unknown) {
    return false
  }
}

export const hashingAlgorithm = "HS256"
