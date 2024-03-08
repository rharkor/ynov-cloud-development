import fetch from "node-fetch"

import { env } from "../env.mjs"
import { logger } from "../logger"

import { MovieDetailled, Movies, Videos } from "./types"

const handleApiResponse = async (res: fetch.Response, errorMessage: string) => {
  if (!res.ok) {
    logger.error(errorMessage, res.statusText)
    throw new Error(errorMessage)
  }

  const json = await res.json().catch((error) => {
    logger.error("Fail parsing response:", error)
    throw error
  })

  return json
}

export const theMovieDb = {
  methods: {
    discover: {
      movie: async () => {
        const url =
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + env.THEMOVIEDB_API_TOKEN,
          },
        }

        const res = await fetch(url, options).catch((error) => {
          logger.error("Fail discovering movies:", error)
          throw error
        })

        const json = await handleApiResponse(res, "Fail discovering movies")

        return json as Movies
      },
    },
    movie: {
      details: async (id: number) => {
        const url = `https://api.themoviedb.org/3/movie/${id}`
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + env.THEMOVIEDB_API_TOKEN,
          },
        }

        const res = await fetch(url, options).catch((error) => {
          logger.error(`Fail discovering movie details (id: ${id}):`, error)
          throw error
        })

        const json = await handleApiResponse(res, "Fail discovering movie details")

        return json as MovieDetailled
      },
      videos: async (id: number) => {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos`
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + env.THEMOVIEDB_API_TOKEN,
          },
        }

        const res = await fetch(url, options).catch((error) => {
          logger.error("Fail discovering movie videos:", error)
          throw error
        })

        const json = await handleApiResponse(res, "Fail discovering movie videos")

        return json as Videos
      },
      recommendations: async (id: number) => {
        const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + env.THEMOVIEDB_API_TOKEN,
          },
        }

        const res = await fetch(url, options).catch((error) => {
          logger.error("Fail discovering movie recommendations:", error)
          throw error
        })

        const json = await handleApiResponse(res, "Fail discovering movie recommendations")

        return json as Movies
      },
      topRated: async () => {
        const url = `https://api.themoviedb.org/3/movie/top_rated`
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + env.THEMOVIEDB_API_TOKEN,
          },
        }

        const res = await fetch(url, options).catch((error) => {
          logger.error("Fail discovering top rated movies:", error)
          throw error
        })

        const json = await handleApiResponse(res, "Fail discovering top rated movies")
        return json as Movies
      },
    },
    search: {
      movie: async (query: string) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}`
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + env.THEMOVIEDB_API_TOKEN,
          },
        }

        const res = await fetch(url, options).catch((error) => {
          logger.error("Fail searching movies:", error)
          throw error
        })

        const json = await handleApiResponse(res, "Fail searching movies")
        return json as Movies
      },
    },
  },
}
