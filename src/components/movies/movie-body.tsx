"use client"

import Link from "next/link"
import { Play } from "lucide-react"
import ScrollContainer from "react-indiana-drag-scroll"
import { z } from "zod"

import { getMovieResponseSchema } from "@/api/movies/schemas"
import { fontMono } from "@/lib/fonts"
import { trpc } from "@/lib/trpc/client"
import { cn } from "@/lib/utils"
import { Button, Image } from "@nextui-org/react"

export default function MovieBody({ movie }: { movie: z.infer<typeof getMovieResponseSchema> | undefined }) {
  const videos = trpc.movies.getMovieVideos.useQuery(
    { id: movie?.id ?? 0 },
    {
      enabled: !!movie,
    }
  )

  return (
    <section className="z-10">
      <header className="flex flex-col gap-5 lg:flex-row">
        <h1 className={cn("text-2xl font-bold text-foreground", fontMono.className)}>Videos</h1>
      </header>
      <ScrollContainer className="invisible-scrollbar flex w-full cursor-pointer flex-row gap-2 overflow-auto scroll-smooth">
        {videos.data ? (
          videos.data.results.length > 0 ? (
            videos.data.results.map((video) => (
              <Link
                key={video.key}
                href={`https://www.youtube.com/watch?v=${video.key}`}
                passHref
                target="_blank"
                tabIndex={-1}
              >
                <Button
                  className="relative m-1 !size-max min-w-[0] shrink-0 p-0"
                  draggable={false}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.open(`https://www.youtube.com/watch?v=${video.key}`, "_blank")
                    }
                  }}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    width={540}
                    height={360}
                    className="h-[240px] w-[432px] rounded-medium object-cover"
                  />
                  <Play className="absolute left-1/2 top-1/2 z-10 size-16 -translate-x-1/2 -translate-y-1/2" />
                </Button>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-default-400">No videos</p>
          )
        ) : (
          Array.from({ length: 4 }, (_, i) => ({ id: i, isSkeleton: true })).map((video) => (
            <div key={video.id} className="h-80 w-full rounded-medium bg-default-200" />
          ))
        )}
      </ScrollContainer>
    </section>
  )
}
