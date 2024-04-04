import { env } from "../env.mjs"

export const TRPC_ERROR_CODES_BY_KEY = {
  /**
   * Invalid JSON was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  PARSE_ERROR: 400,
  /**
   * The JSON sent is not a valid Request object.
   */
  BAD_REQUEST: 400,

  // Internal JSON-RPC error
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,

  // Implementation specific errors
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
} as const

export const getUrl = () => {
  const vercelUrl = env.VERCEL_URL
  const envUrl = env.NEXT_PUBLIC_BASE_URL

  const url = vercelUrl || envUrl
  return url + "/api/trpc"
}
