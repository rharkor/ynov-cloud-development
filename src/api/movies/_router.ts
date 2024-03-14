import { authenticatedProcedure, router } from "@/lib/server/trpc"

import { toggleLike } from "./mutations"
import { getMovie, getMovieLikes, getMovies, getMovieVideos, getPopularMovies, getRecommendedMovies } from "./queries"
import {
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
  getRecommendedMoviesResponseSchema,
  toggleLikeResponseSchema,
  toggleLikeSchema,
} from "./schemas"

export const moviesRouter = router({
  getMovies: authenticatedProcedure.input(getMoviesSchema).output(getMoviesResponseSchema).query(getMovies),
  getMovie: authenticatedProcedure.input(getMovieSchema).output(getMovieResponseSchema).query(getMovie),
  toggleLike: authenticatedProcedure.input(toggleLikeSchema).output(toggleLikeResponseSchema).mutation(toggleLike),
  getMovieLikes: authenticatedProcedure
    .input(getMovieLikesSchema)
    .output(getMovieLikesResponseSchema)
    .query(getMovieLikes),
  getMovieVideos: authenticatedProcedure
    .input(getMovieVideosSchema)
    .output(getMovieVideosResponseSchema)
    .query(getMovieVideos),
  getRecommendedMovies: authenticatedProcedure.output(getRecommendedMoviesResponseSchema).query(getRecommendedMovies),
  getPopularMovies: authenticatedProcedure
    .input(getPopularMoviesSchema)
    .output(getPopularMoviesResponseSchema)
    .query(getPopularMovies),
})
