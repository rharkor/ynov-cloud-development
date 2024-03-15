"use client"

import React from "react"

import MovieList from "@/components/movies/movie-list"
import { fontMono } from "@/lib/fonts"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"

export default function PopularMovies() {
  const topRated = trpc.movies.getPopularMovies.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
      initialCursor: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  return (
    <section className="flex w-full flex-col gap-2">
      <h2 className={cn("pl-1 text-2xl font-bold", fontMono.className)}>Popular movies</h2>
      <MovieList movies={topRated} />
    </section>
  )
}
