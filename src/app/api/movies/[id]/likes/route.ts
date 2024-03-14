import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
import { getMovieLikesResponseSchema, toggleLikeResponseSchema } from "@/api/movies/schemas"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/movies/{id}/likes:
 *   patch:
 *     description: Like or unlike a movie
 *     responses:
 *       200:
 *         description: Toggle like response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ToggleLikeResponse'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Movie id
 *         required: true
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rawInput = params
    const res = await appRouter.movies.toggleLike({
      ctx: { req },
      path: "",
      rawInput: { id: parseInt(rawInput.id) },
      type: "mutation",
    })
    const output = toggleLikeResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}

/**
 * @swagger
 * /api/movies/{id}/likes:
 *   get:
 *     description: Get likes of a movie
 *     responses:
 *       200:
 *         description: Get movie likes response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMovieLikesResponse'
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
    const res = await appRouter.movies.getMovieLikes({
      ctx: { req },
      path: "",
      rawInput: { id: parseInt(rawInput.id) },
      type: "query",
    })
    const output = getMovieLikesResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
