import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
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
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Movies
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rawInput = params
    const res = await appRouter.movies.getMovieVideos({
      ctx: { req },
      path: "",
      rawInput: { id: parseInt(rawInput.id) },
      type: "query",
    })
    return NextResponse.json(res)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
