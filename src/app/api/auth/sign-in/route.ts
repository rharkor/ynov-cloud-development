import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     description: Sign in
 *     responses:
 *       200:
 *         description: Sign in response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResponse'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 */
export async function POST(req: NextRequest) {
  try {
    const rawInput = await req.json()
    const res = await appRouter.auth.signIn({
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
