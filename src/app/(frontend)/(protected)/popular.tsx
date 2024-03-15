"use client"

import React, { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ScrollContainer from "react-indiana-drag-scroll"

import MovieCard from "@/components/movies/movie-card"
import { fontMono } from "@/lib/fonts"
import { trpc } from "@/lib/trpc/client"
import { cn, throttle } from "@/lib/utils"
import { Button } from "@nextui-org/react"

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
      topRated.fetchNextPage()
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
  const moviesWithoutDuplicates = topRated.data?.pages.map((page) => {
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
    <section className="flex w-full flex-col gap-2">
      <h2 className={cn("text-2xl font-bold", fontMono.className)}>Popular movies</h2>
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
            ...(topRated.isFetching
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
                <MovieCard key={movie.id} movie={movie} />
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
    </section>
  )
}

const arrowClassName = cn(
  "absolute top-1/2 z-10 flex !size-10 min-w-0 -translate-y-1/2 items-center justify-center rounded-full p-2 opacity-60"
)
