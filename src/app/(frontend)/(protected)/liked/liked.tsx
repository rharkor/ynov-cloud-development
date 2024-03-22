"use client"

import React from "react"
import { useRouter } from "next/navigation"

import MovieCard from "@/components/movies/movie-card"
import { fontMono } from "@/lib/fonts"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"

export default function LikedMovies() {
  const router = useRouter()

  const liked = trpc.movies.getLikedMovies.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
      initialCursor: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const ids: number[] = []
  const likedWithoutDuplicates = liked.data?.pages.map((page) => {
    page.results = page.results.filter((liked) => {
      if (ids.includes(liked.id)) {
        return false
      }
      ids.push(liked.id)
      return true
    })
    return page
  })

  const items = [
    ...(likedWithoutDuplicates ?? []),
    ...(liked.isFetching
      ? [
          {
            page: 0,
            results: Array.from({ length: 20 }, (_, i) => ({ id: i, isSkeleton: true })),
            total_pages: 0,
            total_results: 0,
          },
        ]
      : []),
  ]

  const hasItems = items.some((page) => page.results.length > 0)

  return (
    <section className="flex w-full flex-col gap-2">
      <header className="flex flex-col gap-5 lg:flex-row">
        <h1 className={cn("text-2xl font-bold text-foreground", fontMono.className)}>Liked</h1>
      </header>
      <div className="relative flex min-h-[160px] w-full flex-row flex-wrap justify-center overflow-auto">
        {items && !hasItems ? (
          <p className="Top-1/2 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-default-500">No liked movies</p>
        ) : (
          items.map((page, i) => (
            <React.Fragment key={i}>
              {page.results.map((movie) => (
                <div key={movie.id} className="grow- flex items-center justify-center">
                  <MovieCard
                    movie={movie}
                    onPress={() => {
                      router.push(`/movies/${movie.id}`)
                    }}
                  />
                </div>
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </section>
  )
}
