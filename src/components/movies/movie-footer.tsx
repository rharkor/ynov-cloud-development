"use client"

import { useRouter } from "next/navigation"
import { z } from "zod"

import { getMovieResponseSchema } from "@/api/movies/schemas"
import { fontMono } from "@/lib/fonts"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"

import MovieCard from "./movie-card"

export default function MovieFooter({ movie }: { movie: z.infer<typeof getMovieResponseSchema> | undefined }) {
  const router = useRouter()
  const recommended = trpc.movies.getRecommendedMoviesForMovie.useQuery(
    { id: movie?.id ?? 0 },
    {
      enabled: !!movie,
    }
  )

  return (
    <section className="z-10">
      <header className="flex flex-col gap-5 lg:flex-row">
        <h1 className={cn("text-2xl font-bold text-foreground", fontMono.className)}>Recommended</h1>
      </header>
      <div className="relative grid min-h-[160px] w-full grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
        {recommended.data ? (
          recommended.data.results.length > 0 ? (
            recommended.data.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPress={() => {
                  router.push(`/movies/${movie.id}`)
                }}
              />
            ))
          ) : (
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-default-500">
              No recommended movies
            </p>
          )
        ) : (
          Array.from({ length: 21 }, (_, i) => ({ id: i, isSkeleton: true })).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </section>
  )
}
