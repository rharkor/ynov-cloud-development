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
    MONGODB_URI: z.string().min(1),
    THEMOVIEDB_API_TOKEN: z.string().min(1),
    DB_NAME: z.string().min(1),
  },
  client: {
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    ENV: process.env.ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    THEMOVIEDB_API_TOKEN: process.env.THEMOVIEDB_API_TOKEN,
    DB_NAME: process.env.DB_NAME,
  },
  onValidationError: (error) => {
    logger.error(error)
    throw "Invalid environment variables"
  },
})
