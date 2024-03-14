import { publicProcedure, router } from "@/lib/server/trpc"

import { toggleLike } from "./mutations"
import { getMovie, getMovieLikes, getMovies, getMovieVideos, getRecommendedMovies, getTopRatedMovies } from "./queries"
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
  getTopRatedMoviesResponseSchema,
  toggleLikeResponseSchema,
  toggleLikeSchema,
} from "./schemas"

export const moviesRouter = router({
  getMovies: publicProcedure.input(getMoviesSchema).output(getMoviesResponseSchema).query(getMovies),
  getMovie: publicProcedure.input(getMovieSchema).output(getMovieResponseSchema).query(getMovie),
  toggleLike: publicProcedure.input(toggleLikeSchema).output(toggleLikeResponseSchema).mutation(toggleLike),
  getMovieLikes: publicProcedure.input(getMovieLikesSchema).output(getMovieLikesResponseSchema).query(getMovieLikes),
  getMovieVideos: publicProcedure
    .input(getMovieVideosSchema)
    .output(getMovieVideosResponseSchema)
    .query(getMovieVideos),
  getRecommendedMovies: publicProcedure.output(getRecommendedMoviesResponseSchema).query(getRecommendedMovies),
  getTopRatedMovies: publicProcedure.output(getTopRatedMoviesResponseSchema).query(getTopRatedMovies),
})
