import { z } from "zod"

import { getMongoDatabase } from "@/lib/mongodb"
import { theMovieDb } from "@/lib/themoviedb"
import { handleApiError } from "@/lib/utils/server"
import { apiInputFromSchema } from "@/types/trpc"

import { toggleLikeResponseSchema, toggleLikeSchema } from "./schemas"

export const toggleLike = async ({ input }: apiInputFromSchema<typeof toggleLikeSchema>) => {
  try {
    const { id, userId } = input
    await theMovieDb.methods.movie.details(id)

    //* Toggle the like in the mongodb database
    const db = await getMongoDatabase()
    // Collection name: likes
    const likes = db.collection("likes")
    // Check if the user has already liked the movie
    const existingLike = await likes.findOne({ movieId: id, userId })
    if (existingLike) {
      await likes.deleteOne({ movieId: id, userId })
    } else {
      await likes.insertOne({ movieId: id, userId })
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
