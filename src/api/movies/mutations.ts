import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { theMovieDb } from "@/lib/themoviedb"
import { handleApiError } from "@/lib/utils/server"
import { apiInputFromSchema } from "@/types/trpc"

import { toggleLikeResponseSchema, toggleLikeSchema } from "./schemas"

export const toggleLike = async ({ input, ctx: { session } }: apiInputFromSchema<typeof toggleLikeSchema>) => {
  try {
    const { id } = input
    const userId = session.user.id
    await theMovieDb.methods.movie.details(id)

    //* Toggle the like in the mongodb database
    // Check if the user has already liked the movie
    const existingLike = await prisma.like.findFirst({ where: { movieId: id, userId } })
    if (existingLike) {
      await prisma.like.delete({
        where: {
          movieId_userId: {
            movieId: id,
            userId,
          },
        },
      })
    } else {
      await prisma.like.create({
        data: {
          movieId: id,
          userId,
        },
      })
    }

    const response: z.infer<typeof toggleLikeResponseSchema> = {
      id,
      liked: !existingLike,
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
