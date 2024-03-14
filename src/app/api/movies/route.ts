import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
import { getMoviesResponseSchema } from "@/api/movies/schemas"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Get movies
 *     responses:
 *       200:
 *         description: Get movies response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMoviesResponse'
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search movies
 *         required: false
 */
export async function GET(req: NextRequest) {
  try {
    const rawInput = req.nextUrl.searchParams
    const res = await appRouter.movies.getMovies({
      ctx: { req },
      path: "",
      rawInput: { search: rawInput.get("search") },
      type: "query",
    })
    const output = getMoviesResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
