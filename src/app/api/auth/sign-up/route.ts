import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     description: Sign up
 *     responses:
 *       200:
 *         description: Sign up response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpResponse'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *
 */
export async function POST(req: NextRequest) {
  try {
    const rawInput = await req.json()
    const res = await appRouter.auth.signUp({
      ctx: { req },
      path: "",
      rawInput,
      type: "query",
    })
    return NextResponse.json(res)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
