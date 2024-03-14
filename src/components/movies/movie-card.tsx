import { z } from "zod"

import { moviesSchema } from "@/api/movies/schemas"
import { getImageUrl } from "@/lib/themoviedb/utils"
import { Image } from "@nextui-org/react"

export default function MovieCard({
  movie,
}: {
  movie:
    | (z.infer<typeof moviesSchema>[number] & { isSkeleton?: never })
    | ({ isSkeleton?: boolean } & Partial<z.infer<typeof moviesSchema>[number]>)
}) {
  return (
    <div className="h-[300px] w-[200px] shrink-0">
      <Image
        src={movie.poster_path ? getImageUrl(movie.poster_path, "w500") : ""}
        isLoading={movie.isSkeleton}
        width={200}
        height={300}
        alt={movie.title}
      />
    </div>
  )
}
