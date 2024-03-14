import jws from "jws"

import { TTokenPayload } from "@/types/auth"

import { env } from "./env.mjs"
import { logger } from "./logger"
import { prisma } from "./prisma"

export const verifyToken = async (token: string) => {
  try {
    const valid = jws.verify(token, hashingAlgorithm, env.JWT_SECRET)
    if (!valid) {
      return false
    }
    const payload = JSON.parse(jws.decode(token).payload) as TTokenPayload
    const now = Date.now()
    if (!payload.exp || payload.exp < now) {
      logger.debug("Token expired")
      return false
    }

    // Verify the session in db
    const session = await prisma.session.findUnique({
      where: {
        id: payload.sid,
      },
    })
    if (!session) {
      return false
    }

    return true
  } catch (error: unknown) {
    return false
  }
}

export const hashingAlgorithm = "HS256"

export const createToken = async (_payload: Omit<TTokenPayload, "sid">) => {
  // Store the session in db
  const session = await prisma.session.create({
    data: {
      expiresAt: new Date(_payload.exp),
      user: {
        connect: {
          id: _payload.user.id,
        },
      },
    },
  })

  const payload = { ..._payload, sid: session.id }
  const token = jws.sign({
    header: { alg: hashingAlgorithm },
    payload,
    secret: env.JWT_SECRET,
  })

  return token
}
