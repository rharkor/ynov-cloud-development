import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
import { getRecommendedMoviesResponseSchema } from "@/api/movies/schemas"
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
export async function GET(req: NextRequest) {
  try {
    const res = await appRouter.movies.getRecommendedMovies({
      ctx: { req },
      path: "",
      rawInput: {},
      type: "query",
    })
    const output = getRecommendedMoviesResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
