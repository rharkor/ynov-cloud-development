import { createSwaggerSpec } from "next-swagger-doc"

import { SignIn, SignInResponse, SignOutResponse, SignUp, SignUpResponse } from "./schemas/auth"
import {
  GetMovieLikesResponse,
  GetMovieResponse,
  GetMoviesResponse,
  GetPopularMoviesResponse,
  GetRecommendedMoviesResponse,
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
            description:
              "JWT Token (please note that if you are already logged in, the token will be automatically added to the requests in cookies)",
          },
        },
        schemas: {
          GetMoviesResponse,
          GetMovieResponse,
          ToggleLikeResponse,
          GetMovieLikesResponse,
          GetRecommendedMoviesResponse,
          GetPopularMoviesResponse,
          SignUp,
          SignUpResponse,
          SignIn,
          SignInResponse,
          SignOutResponse,
        },
      },
    },
  })
  return spec
}
