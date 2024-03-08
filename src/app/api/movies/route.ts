import { NextRequest, NextResponse } from "next/server"

import { getMovies } from "@/api/movies/queries"
import { getMoviesResponseSchema, getMoviesSchema } from "@/api/movies/schemas"
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
    const input = getMoviesSchema.parse({
      search: rawInput.get("search"),
    })
    const res = await getMovies({ ctx: { headers: undefined, req: undefined }, input })
    const output = getMoviesResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
