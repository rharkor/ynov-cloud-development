import { NextRequest } from "next/server"
import { enableFetchMocks } from "jest-fetch-mock"
import { mockDeep } from "jest-mock-extended"

import { PrismaClient } from "@prisma/client"
enableFetchMocks()

import { TTokenPayload } from "@/types/auth"

import { getPopularMovies } from "../../src/api/movies/queries"

jest.mock("node-fetch")
jest.mock("../../src/lib/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))
jest.mock("../../src/lib/themoviedb", () => ({
  __esModule: true,
  theMovieDb: {
    methods: {
      movie: {
        popular: jest.fn().mockResolvedValue({
          results: [
            {
              id: 1,
              title: "Movie 1",
            },
            {
              id: 2,
              title: "Movie 2",
            },
          ],
        }),
      },
    },
  },
}))

describe("API Handler for discover", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("returns a list of movies", async () => {
    const response = await getPopularMovies({
      ctx: { headers: {}, req: {} as NextRequest, session: {} as TTokenPayload },
      input: { cursor: 1 },
    })
    expect(response).toEqual({
      results: [
        {
          id: 1,
          title: "Movie 1",
        },
        {
          id: 2,
          title: "Movie 2",
        },
      ],
    })
  })
})
