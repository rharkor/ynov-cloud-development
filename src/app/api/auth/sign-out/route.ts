import { NextRequest, NextResponse } from "next/server"

import { appRouter } from "@/api/_app"
import { handleNextApiError } from "@/lib/utils/server"

/**
 * @swagger
 * /api/auth/sign-out:
 *   post:
 *     description: Sign out
 *     responses:
 *       200:
 *         description: Sign out response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignOutResponse'
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Auth
 */
export async function POST(req: NextRequest) {
  try {
    const res = await appRouter.auth.signOut({
      ctx: { req },
      path: "",
      rawInput: "",
      type: "query",
    })
    return NextResponse.json(res)
  } catch (error: unknown) {
    return handleNextApiError(error)
  }
}
