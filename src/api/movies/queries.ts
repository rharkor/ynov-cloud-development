import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { theMovieDb } from "@/lib/themoviedb"
import { Movies } from "@/lib/themoviedb/types"
import { ApiError, handleApiError } from "@/lib/utils/server"
import { apiInputFromSchema } from "@/types/trpc"

import {
  getLikedMoviesResponseSchema,
  getLikedMoviesSchema,
  getMovieLikesResponseSchema,
  getMovieLikesSchema,
  getMovieResponseSchema,
  getMovieSchema,
  getMoviesResponseSchema,
  getMoviesSchema,
  getMovieVideosResponseSchema,
  getMovieVideosSchema,
  getPopularMoviesResponseSchema,
  getPopularMoviesSchema,
  getRandomMovieResponseSchema,
  getRecommendedMoviesForMovieResponseSchema,
  getRecommendedMoviesForMovieSchema,
  getRecommendedMoviesResponseSchema,
} from "./schemas"

export const getMovies = async ({ input }: apiInputFromSchema<typeof getMoviesSchema>) => {
  try {
    const { search, cursor } = input
    const movies = search
      ? await theMovieDb.methods.search.movie(search)
      : await theMovieDb.methods.discover.movie({ page: cursor ?? 1 })

    const response: z.infer<typeof getMoviesResponseSchema> = movies
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getMovie = async ({ input, ctx: { session } }: apiInputFromSchema<typeof getMovieSchema>) => {
  try {
    const { id } = input
    const movie = await theMovieDb.methods.movie.details(id)

    // Add likes to the response
    const count = await prisma.like.count({ where: { movieId: id } })
    const isLiked = await prisma.like.findFirst({
      where: { movieId: id, userId: session.user.id },
    })
    const movieWithLikes = { ...movie, likes: count, isLiked: !!isLiked }

    const response: z.infer<typeof getMovieResponseSchema> = movieWithLikes
    return response
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Fail discovering movie details") {
      ApiError("Movie not found", "NOT_FOUND")
    }
    return handleApiError(error)
  }
}

export const getMovieLikes = async ({ input }: apiInputFromSchema<typeof getMovieLikesSchema>) => {
  try {
    const { id } = input
    const count = await prisma.like.count({ where: { movieId: id } })
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

export const getRecommendedMovies = async ({ ctx: { session } }: apiInputFromSchema<typeof undefined>) => {
  try {
    const userId = session.user.id
    const likedMovies = await prisma.like.findMany({
      where: { userId },
      take: 10,
    })
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
    const randomRecommendation = recommendedMovies.flat().sort(() => 0.5 - Math.random())

    const response: z.infer<typeof getRecommendedMoviesResponseSchema> = {
      results: randomRecommendation,
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getPopularMovies = async ({ input }: apiInputFromSchema<typeof getPopularMoviesSchema>) => {
  try {
    const { cursor } = input
    const movies = await theMovieDb.methods.movie.popular({ page: cursor ?? 1 })
    const response: z.infer<typeof getPopularMoviesResponseSchema> = movies
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getRecommendedMoviesForMovie = async ({
  input,
}: apiInputFromSchema<typeof getRecommendedMoviesForMovieSchema>) => {
  try {
    const recommended = await theMovieDb.methods.movie.recommendations(input.id)
    const response: z.infer<typeof getRecommendedMoviesForMovieResponseSchema> = recommended
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getRandomMovie = async ({ ctx: { session } }: apiInputFromSchema<typeof undefined>) => {
  try {
    const userId = session.user.id
    const likedMovies = await prisma.like.findMany({
      where: { userId },
      take: 10,
    })
    const likedMoviesIds = likedMovies.map((movie) => movie.movieId)
    const randomLikedMovieId = likedMoviesIds[Math.floor(Math.random() * likedMoviesIds.length)]

    const recommended = await theMovieDb.methods.movie.recommendations(randomLikedMovieId)
    const randomMovie = recommended.results[Math.floor(Math.random() * recommended.results.length)]

    const response: z.infer<typeof getRandomMovieResponseSchema> = {
      result: randomMovie,
      others: recommended.results.filter((movie) => movie.id !== randomMovie.id),
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}

export const getLikedMovies = async ({ ctx: { session }, input }: apiInputFromSchema<typeof getLikedMoviesSchema>) => {
  try {
    const { cursor } = input
    const take = 20
    const userId = session.user.id
    const likedMovies = await prisma.like.findMany({
      where: { userId },
      take,
      skip: ((cursor ?? 1) - 1) * take,
    })
    const response: z.infer<typeof getLikedMoviesResponseSchema> = {
      results: likedMovies.map((movie) => ({
        id: movie.movieId,
        title: movie.movieTitle,
        poster_path: movie.posterPath,
      })),
      page: cursor ?? 1,
      total_pages: Math.ceil(likedMovies.length / take),
      total_results: likedMovies.length,
    }
    return response
  } catch (error: unknown) {
    return handleApiError(error)
  }
}
