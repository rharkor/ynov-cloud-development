import { NextRequest, NextResponse } from "next/server"

import { toggleLike } from "@/api/movies/mutations"
import { getMovieLikes } from "@/api/movies/queries"
import {
  getMovieLikesResponseSchema,
  getMovieLikesSchema,
  toggleLikeResponseSchema,
  toggleLikeSchema,
} from "@/api/movies/schemas"
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
    // TODO: Implement
    const userId = 0
    const rawInput = params
    const input = toggleLikeSchema.parse({
      id: parseInt(rawInput.id, 10),
      userId,
    })
    const res = await toggleLike({ ctx: { headers: undefined, req: undefined }, input })
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
    const input = getMovieLikesSchema.parse({
      id: parseInt(rawInput.id, 10),
    })
    const res = await getMovieLikes({ ctx: { headers: undefined, req: undefined }, input })
    const output = getMovieLikesResponseSchema.parse(res)
    return NextResponse.json(output)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
