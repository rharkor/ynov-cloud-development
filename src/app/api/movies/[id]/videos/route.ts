import { NextRequest, NextResponse } from "next/server"

import { getMovieVideos } from "@/api/movies/queries"
import { getMovieVideosResponseSchema, getMovieVideosSchema } from "@/api/movies/schemas"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/movies/{id}/videos:
 *   get:
 *     description: Get videos of a movie
 *     responses:
 *       200:
 *         description: Get movie videos response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMovieVideosResponse'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Movie id
 *         required: true
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rawInput = params
    const input = getMovieVideosSchema.parse({
      id: parseInt(rawInput.id, 10),
    })
    const res = await getMovieVideos({ ctx: { headers: undefined, req: undefined }, input })
    const output = getMovieVideosResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
