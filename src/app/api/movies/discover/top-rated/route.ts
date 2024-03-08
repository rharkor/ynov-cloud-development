import { NextResponse } from "next/server"

import { getTopRatedMovies } from "@/api/movies/queries"
import { getTopRatedMoviesResponseSchema } from "@/api/movies/schemas"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/movies/discover/top-rated:
 *   get:
 *     description: Get top rated movies
 *     responses:
 *       200:
 *         description: Get top rated movies response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTopRatedMoviesResponse'
 */
export async function GET() {
  try {
    const res = await getTopRatedMovies()
    const output = getTopRatedMoviesResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
