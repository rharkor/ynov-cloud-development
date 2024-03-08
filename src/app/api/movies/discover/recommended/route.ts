import { NextResponse } from "next/server"

import { getRecommendedMovies } from "@/api/movies/queries"
import { getRecommendedMoviesResponseSchema, getRecommendedMoviesSchema } from "@/api/movies/schemas"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/movies/discover/recommended:
 *   get:
 *     description: Get recommended movies
 *     responses:
 *       200:
 *         description: Get recommended movies response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRecommendedMoviesResponse'
 */
export async function GET() {
  try {
    const userId = 0
    const input = getRecommendedMoviesSchema.parse({
      userId,
    })
    const res = await getRecommendedMovies({ ctx: { headers: undefined, req: undefined }, input })
    const output = getRecommendedMoviesResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
