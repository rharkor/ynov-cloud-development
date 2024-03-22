import { z } from "zod"

export const getMoviesSchema = z.object({
  search: z.string().optional().nullable(),
  cursor: z.number().optional().nullable(),
})

export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export const moviesSchema = z.array(movieSchema)

export const getMoviesResponseSchema = z.object({
  page: z.number(),
  results: moviesSchema,
  total_pages: z.number(),
  total_results: z.number(),
})

export const getMovieSchema = z.object({
  id: z.number(),
})

export const getMovieResponseSchema = z.object({
  likes: z.number(),
  isLiked: z.boolean(),
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.unknown(),
  budget: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().optional().nullable(),
      name: z.string(),
      origin_country: z.string(),
    })
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    })
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export const toggleLikeSchema = z.object({
  id: z.number(),
})

export const toggleLikeResponseSchema = z.object({
  id: z.number(),
  liked: z.boolean(),
})

export const getMovieLikesSchema = z.object({
  id: z.number(),
})

export const getMovieLikesResponseSchema = z.object({
  id: z.number(),
  likes: z.number(),
})

export const getMovieVideosSchema = z.object({
  id: z.number(),
})

export const getMovieVideosResponseSchema = z.object({
  id: z.number(),
  results: z.array(
    z.object({
      iso_639_1: z.string(),
      iso_3166_1: z.string(),
      name: z.string(),
      key: z.string(),
      site: z.string(),
      size: z.number(),
      type: z.string(),
      official: z.boolean(),
      published_at: z.string(),
      id: z.string(),
    })
  ),
})

export const getRecommendedMoviesSchema = z.object({
  userId: z.string(),
})

export const getRecommendedMoviesResponseSchema = z.object({
  results: moviesSchema,
})

export const getPopularMoviesSchema = z.object({
  cursor: z.number().optional().nullable(),
})

export const getPopularMoviesResponseSchema = z.object({
  page: z.number(),
  results: moviesSchema,
  total_pages: z.number(),
  total_results: z.number(),
})

export const getRecommendedMoviesForMovieSchema = z.object({
  id: z.number(),
})

export const getRecommendedMoviesForMovieResponseSchema = z.object({
  page: z.number(),
  results: moviesSchema,
  total_pages: z.number(),
  total_results: z.number(),
})

export const getRandomMovieResponseSchema = z.object({
  result: movieSchema,
  others: z.array(movieSchema),
})

export const getLikedMoviesSchema = z.object({
  cursor: z.number().optional().nullable(),
})

export const getLikedMoviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      poster_path: z.string().optional().nullable(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
})
