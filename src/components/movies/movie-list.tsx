"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ScrollContainer from "react-indiana-drag-scroll"
import { z } from "zod"

import { getMoviesResponseSchema } from "@/api/movies/schemas"
import MovieCard from "@/components/movies/movie-card"
import { cn, throttle } from "@/lib/utils"
import { Button } from "@nextui-org/react"
import { UseInfiniteQueryResult } from "@tanstack/react-query"

export default function MovieList({
  movies,
}: {
  movies: UseInfiniteQueryResult<z.infer<typeof getMoviesResponseSchema>, unknown>
}) {
  const router = useRouter()

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [hasScrolledLeft, setHasScrolledLeft] = useState(false)
  const [hasScrolledRight, setHasScrolledRight] = useState(true)

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      const visibleWidth = scrollContainerRef.current.clientWidth
      scrollContainerRef.current.scrollLeft -= visibleWidth - 200
    }
  }

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const visibleWidth = scrollContainerRef.current.clientWidth
      scrollContainerRef.current.scrollLeft += visibleWidth - 200
    }
  }

  // When approaching the end of the list, fetch more movies
  const handleApproachingEnd = (scrollLeft: number, scrollWidth: number, clientWidth: number) => {
    if (scrollLeft >= scrollWidth - clientWidth - 800) {
      movies.fetchNextPage()
    }
  }

  const debouncedHandleApproachingEnd = useRef(
    throttle(
      (scrollLeft: number, scrollWidth: number, clientWidth: number) => {
        handleApproachingEnd(scrollLeft, scrollWidth, clientWidth)
      },
      { wait: 200 }
    )
  ).current

  if (scrollContainerRef.current) {
    const container = scrollContainerRef.current
    const handleScroll = () => {
      if (container.scrollLeft > 0 && !hasScrolledLeft) {
        setHasScrolledLeft(true)
      } else if (container.scrollLeft === 0 && hasScrolledLeft) {
        setHasScrolledLeft(false)
      }

      if (container.scrollLeft < container.scrollWidth - container.clientWidth && !hasScrolledRight) {
        setHasScrolledRight(true)
      } else if (container.scrollLeft === container.scrollWidth - container.clientWidth && hasScrolledRight) {
        setHasScrolledRight(false)
      }

      debouncedHandleApproachingEnd(container.scrollLeft, container.scrollWidth, container.clientWidth)
    }
    container.addEventListener("scroll", handleScroll)
  }

  const ids: number[] = []
  const moviesWithoutDuplicates = movies.data?.pages.map((page) => {
    page.results = page.results.filter((movie) => {
      if (ids.includes(movie.id)) {
        return false
      }
      ids.push(movie.id)
      return true
    })
    return page
  })

  return (
    <div className="relative">
      <Button
        onPress={handlePrevious}
        className={cn(arrowClassName, "left-4", {
          "!opacity-0": !hasScrolledLeft,
        })}
        size="sm"
        color="primary"
        variant="shadow"
      >
        <ChevronLeft className="size-6" />
      </Button>
      <ScrollContainer
        className="invisible-scrollbar relative z-0 flex w-full cursor-pointer flex-row gap-2 overflow-auto scroll-smooth"
        innerRef={scrollContainerRef}
      >
        {[
          ...(moviesWithoutDuplicates ?? []),
          ...(movies.isFetching
            ? [
                {
                  page: 0,
                  results: Array.from({ length: 20 }, (_, i) => ({ id: i, isSkeleton: true })),
                  total_pages: 0,
                  total_results: 0,
                },
              ]
            : []),
        ]?.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPress={() => {
                  router.push(`/movies/${movie.id}`)
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </ScrollContainer>
      <Button
        onPress={handleNext}
        className={cn(arrowClassName, "right-4", {
          "!opacity-0": !hasScrolledRight,
        })}
        size="sm"
        color="primary"
        variant="shadow"
      >
        <ChevronRight className="size-6" />
      </Button>
    </div>
  )
}

const arrowClassName = cn(
  "absolute top-1/2 z-10 flex !size-10 min-w-0 -translate-y-1/2 items-center justify-center rounded-full p-2 opacity-60"
)
