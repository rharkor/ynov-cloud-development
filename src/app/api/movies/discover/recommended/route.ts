import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
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
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Movies
 */
export async function GET(req: NextRequest) {
  try {
    const res = await appRouter.movies.getRecommendedMovies({
      ctx: { req },
      path: "",
      rawInput: {},
      type: "query",
    })
    return NextResponse.json(res)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
