import { authenticatedProcedure, router } from "@/lib/server/trpc"

import { toggleLike } from "./mutations"
import {
  getLikedMovies,
  getMovie,
  getMovieLikes,
  getMovies,
  getMovieVideos,
  getPopularMovies,
  getRandomMovie,
  getRecommendedMovies,
  getRecommendedMoviesForMovie,
} from "./queries"
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
  getRecommendedMoviesSchema,
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
  getRecommendedMovies: authenticatedProcedure
    .input(getRecommendedMoviesSchema)
    .output(getRecommendedMoviesResponseSchema)
    .query(getRecommendedMovies),
  getPopularMovies: authenticatedProcedure
    .input(getPopularMoviesSchema)
    .output(getPopularMoviesResponseSchema)
    .query(getPopularMovies),
  getRecommendedMoviesForMovie: authenticatedProcedure
    .input(getRecommendedMoviesForMovieSchema)
    .output(getRecommendedMoviesForMovieResponseSchema)
    .query(getRecommendedMoviesForMovie),
  getRandomMovie: authenticatedProcedure.output(getRandomMovieResponseSchema).query(getRandomMovie),
  getLikedMovies: authenticatedProcedure
    .input(getLikedMoviesSchema)
    .output(getLikedMoviesResponseSchema)
    .query(getLikedMovies),
})
