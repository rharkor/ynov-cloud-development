import { createSwaggerSpec } from "next-swagger-doc"

import {
  GetMovieLikesResponse,
  GetMovieResponse,
  GetMoviesResponse,
  GetRecommendedMoviesResponse,
  GetTopRatedMoviesResponse,
  ToggleLikeResponse,
} from "./schemas/movies"

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          GetMoviesResponse,
          GetMovieResponse,
          ToggleLikeResponse,
          GetMovieLikesResponse,
          GetRecommendedMoviesResponse,
          GetTopRatedMoviesResponse,
        },
      },
      security: [],
    },
  })
  return spec
}
