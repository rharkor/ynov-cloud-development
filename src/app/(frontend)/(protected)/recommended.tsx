"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ScrollContainer from "react-indiana-drag-scroll"

import MovieCard from "@/components/movies/movie-card"
import useAuth from "@/contexts/auth/utils"
import { fontMono } from "@/lib/fonts"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/react"

export default function RecommendedMovies() {
  const router = useRouter()
  const { user } = useAuth()
  const recommended = trpc.movies.getRecommendedMovies.useQuery(
    {
      userId: user?.user.id ?? "",
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      enabled: !!user,
    }
  )

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [hasScrolledLeft, setHasScrolledLeft] = useState(false)
  const [hasScrolledRight, setHasScrolledRight] = useState(true)

  useEffect(() => {
    if (recommended.data?.results.length === 0) {
      setHasScrolledRight(false)
    } else {
      setHasScrolledRight(true)
    }
  }, [recommended.data])

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
    }
    container.addEventListener("scroll", handleScroll)
  }

  return (
    <section className="flex w-full flex-col gap-2">
      <h2 className={cn("pl-1 text-2xl font-bold", fontMono.className)}>Recommended movies</h2>
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
          className={cn(
            "invisible-scrollbar relative z-0 flex min-h-[308px] w-full flex-row gap-2 overflow-auto scroll-smooth",
            {
              "cursor-pointer": (recommended.data?.results.length ?? 0) > 0,
            }
          )}
          innerRef={scrollContainerRef}
        >
          {recommended.data ? (
            recommended.data.results.length === 0 ? (
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-default-500">
                No recommended movies
              </p>
            ) : (
              recommended.data?.results.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPress={() => {
                    router.push(`/movies/${movie.id}`)
                  }}
                />
              ))
            )
          ) : (
            Array.from({ length: 10 }).map((_, index) => (
              <MovieCard key={index} movie={{ id: index, isSkeleton: true }} />
            ))
          )}
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
