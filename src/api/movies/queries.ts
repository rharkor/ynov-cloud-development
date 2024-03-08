import { z } from "zod"

import { getMongoDatabase } from "@/lib/mongodb"
import { theMovieDb } from "@/lib/themoviedb"
import { Movies } from "@/lib/themoviedb/types"
import { handleApiError } from "@/lib/utils/server"
import { apiInputFromSchema } from "@/types/trpc"

import {
  getMovieLikesResponseSchema,
  getMovieLikesSchema,
  getMovieResponseSchema,
  getMovieSchema,
  getMoviesResponseSchema,
  getMoviesSchema,
  getMovieVideosResponseSchema,
  getMovieVideosSchema,
  getRecommendedMoviesResponseSchema,
  getRecommendedMoviesSchema,
  getTopRatedMoviesResponseSchema,
} from "./schemas"

export const getMovies = async ({ input }: apiInputFromSchema<typeof getMoviesSchema>) => {
  try {
    const { search } = input
    const movies = search ? await theMovieDb.methods.search.movie(search) : await theMovieDb.methods.discover.movie()
    const response: z.infer<typeof getMoviesResponseSchema> = movies
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getMovie = async ({ input }: apiInputFromSchema<typeof getMovieSchema>) => {
  try {
    const { id } = input
    const movie = await theMovieDb.methods.movie.details(id)

    // Add likes to the response
    const db = await getMongoDatabase()
    const likes = db.collection("likes")
    const count = await likes.countDocuments({ movieId: id })
    const movieWithLikes = { ...movie, likes: count }

    const response: z.infer<typeof getMovieResponseSchema> = movieWithLikes
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getMovieLikes = async ({ input }: apiInputFromSchema<typeof getMovieLikesSchema>) => {
  try {
    const { id } = input
    const db = await getMongoDatabase()
    const likes = db.collection("likes")
    const count = await likes.countDocuments({ movieId: id })
    const response: z.infer<typeof getMovieLikesResponseSchema> = {
      id: input.id,
      likes: count,
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getMovieVideos = async ({ input }: apiInputFromSchema<typeof getMovieVideosSchema>) => {
  try {
    const { id } = input
    const videos = await theMovieDb.methods.movie.videos(id)
    const response: z.infer<typeof getMovieVideosResponseSchema> = videos
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getRecommendedMovies = async ({ input }: apiInputFromSchema<typeof getRecommendedMoviesSchema>) => {
  try {
    const { userId } = input
    const db = await getMongoDatabase()
    const likes = db.collection("likes")
    const likedMovies = await likes
      .find(
        { userId },
        {
          limit: 10,
          sort: { _id: -1 },
        }
      )
      .toArray()
    const likedMoviesIds = likedMovies.map((movie) => movie.movieId)
    // Three random liked movies
    const randomLikedMoviesId = likedMoviesIds.sort(() => 0.5 - Math.random()).slice(0, 3)

    // Get recommended movies for the user
    const recommendedMovies: Movies["results"][] = []
    for (const id of randomLikedMoviesId) {
      const recommended = await theMovieDb.methods.movie.recommendations(id)
      recommendedMovies.push(recommended.results)
    }

    // Flatten/Shuffle the array
    const randomRecommendation = recommendedMovies
      .flat()
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)

    const response: z.infer<typeof getRecommendedMoviesResponseSchema> = {
      results: randomRecommendation,
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getTopRatedMovies = async () => {
  try {
    const movies = await theMovieDb.methods.discover.movie()
    const response: z.infer<typeof getTopRatedMoviesResponseSchema> = movies
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
