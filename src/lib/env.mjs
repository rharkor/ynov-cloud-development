import { createEnv } from "@t3-oss/env-nextjs"
import { config } from "dotenv"
import { z } from "zod"

import { logger } from "@/lib/logger"

if (!process.env.ENV) {
  config()
}

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    ENV: z.enum(["development", "staging", "preproduction", "production"]),
    DATABASE_URL: z.string().min(1),
    THEMOVIEDB_API_TOKEN: z.string().min(1),
    PASSWORD_HASHER_SECRET: z.string().min(1),
    JWT_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    ENV: process.env.ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    THEMOVIEDB_API_TOKEN: process.env.THEMOVIEDB_API_TOKEN,
    PASSWORD_HASHER_SECRET: process.env.PASSWORD_HASHER_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  onValidationError: (error) => {
    logger.error(error)
    throw "Invalid environment variables"
  },
})
