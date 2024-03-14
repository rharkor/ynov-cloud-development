import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     description: Get movie by id
 *     responses:
 *       200:
 *         description: Get movie response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMovieResponse'
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
 *       - Auth
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rawInput = params
    const res = await appRouter.movies.getMovie({
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
