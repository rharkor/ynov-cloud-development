import { NextRequest, NextResponse } from "next/server"

import { getMovie } from "@/api/movies/queries"
import { getMovieResponseSchema, getMovieSchema } from "@/api/movies/schemas"
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
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rawInput = params
    const input = getMovieSchema.parse({
      id: parseInt(rawInput.id, 10),
    })
    const res = await getMovie({ ctx: { headers: undefined, req: undefined }, input })
    const output = getMovieResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
