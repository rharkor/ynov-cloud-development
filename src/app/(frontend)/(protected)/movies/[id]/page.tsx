"use client"

import MovieBody from "@/components/movies/movie-body"
import MovieFooter from "@/components/movies/movie-footer"
import MovieHeader from "@/components/movies/movie-header"
import { getImageUrl } from "@/lib/themoviedb/utils"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { Image } from "@nextui-org/react"

export default function MovieDetails({ params: { id } }: { params: { id: string } }) {
  const movie = trpc.movies.getMovie.useQuery({ id: parseInt(id) })
  return (
    <main className="container mx-auto mt-8 flex flex-col gap-12 px-2">
      <div
        className={cn(
          "absolute left-0 top-0 z-0 w-full opacity-25",
          "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-70% after:to-background"
        )}
      >
        <Image
          src={movie.data?.backdrop_path ? getImageUrl(movie.data.backdrop_path, "original") : ""}
          alt={movie.data?.title ?? ""}
          isLoading={movie.data ? false : true}
          width={1920}
          height={1080}
          className="w-full object-cover"
          classNames={{
            wrapper: "!max-w-none !max-h-none",
          }}
        />
      </div>
      <MovieHeader movie={movie.data} />
      <MovieBody movie={movie.data} />
      <MovieFooter movie={movie.data} />
    </main>
  )
}
