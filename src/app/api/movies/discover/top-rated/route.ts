import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
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
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Auth
 */
export async function GET(req: NextRequest) {
  try {
    const res = await appRouter.movies.getTopRatedMovies({
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
