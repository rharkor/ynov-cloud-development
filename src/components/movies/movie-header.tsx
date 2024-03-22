"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Heart } from "lucide-react"
import { z } from "zod"

import { getMovieResponseSchema } from "@/api/movies/schemas"
import { fontMono } from "@/lib/fonts"
import { getImageUrl } from "@/lib/themoviedb/utils"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { Button, Image, Skeleton } from "@nextui-org/react"

import Rating from "./rating"

export default function MovieHeader({ movie }: { movie: z.infer<typeof getMovieResponseSchema> | undefined }) {
  const utils = trpc.useUtils()
  const router = useRouter()

  const toggleLikeMutation = trpc.movies.toggleLike.useMutation()
  const [isLiked, setIsLiked] = useState(false)
  const [isLikeLoading, setIsLikeLoading] = useState(false)
  const toggleLike = async () => {
    if (movie) {
      setIsLikeLoading(true)
      setIsLiked(!isLiked)
      const res = await toggleLikeMutation.mutateAsync({ id: movie.id })
      setIsLiked(res.liked)
      await utils.movies.getMovie.invalidate({ id: movie.id })
      setIsLikeLoading(false)
    }
  }

  useEffect(() => {
    setIsLiked(movie?.isLiked ?? false)
  }, [movie?.isLiked])

  return (
    <article className="relative z-10 flex flex-col gap-5 backdrop-blur-sm">
      <Button className="size-max min-w-[0] rounded-full p-2" variant="flat" onPress={() => router.back()}>
        <ChevronLeft className="z-4" />
      </Button>
      <header className="flex flex-col gap-5 lg:flex-row">
        <Image
          src={movie ? getImageUrl(movie.poster_path) : ""}
          isLoading={movie ? false : true}
          width={250}
          height={400}
          alt={movie?.title}
          classNames={{
            wrapper: "shrink-0",
          }}
        />
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-row justify-between gap-4">
            <Skeleton
              isLoaded={!!movie}
              className={cn({
                "rounded-medium": !movie,
              })}
            >
              <h1 className={cn("never-empty text-3xl font-bold !leading-[normal] lg:text-7xl", fontMono.className)}>
                {movie?.title}
              </h1>
            </Skeleton>
            <div className="flex flex-row items-center gap-2">
              <p className="never-empty w-max text-lg text-default-500">
                <span className="font-bold">{movie?.likes ?? 0}</span> like{(movie?.likes ?? 0) > 1 ? "s" : ""}
              </p>
              <Button
                className={cn("h-max min-w-[0] rounded-full bg-transparent p-2", {
                  "!opacity-70": isLikeLoading,
                })}
                isDisabled={isLikeLoading}
                onPress={toggleLike}
              >
                <Heart
                  className={cn("size-8")}
                  fill={!isLiked ? "none" : "red"}
                  stroke={!isLiked ? "currentColor" : "red"}
                />
              </Button>
            </div>
          </div>
          <Rating score={movie ? movie.vote_average / 2 : undefined} />
          <Skeleton
            isLoaded={!!movie}
            className={cn("flex-1", {
              "rounded-medium": !movie,
            })}
          >
            <p className="never-empty text-xl font-medium">{movie?.overview}</p>
          </Skeleton>
          <Skeleton
            className={cn("flex items-end justify-end", {
              "rounded-medium": !movie,
            })}
            isLoaded={!!movie}
          >
            <p className="never-empty text-lg text-default-500">
              Release date:{" "}
              {movie &&
                new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </Skeleton>
        </div>
      </header>
    </article>
  )
}
