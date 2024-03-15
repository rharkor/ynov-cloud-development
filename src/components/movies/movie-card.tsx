import { z } from "zod"

import { moviesSchema } from "@/api/movies/schemas"
import { getImageUrl } from "@/lib/themoviedb/utils"
import { Button, Image } from "@nextui-org/react"

export default function MovieCard({
  movie,
  onPress,
}: {
  movie:
    | (z.infer<typeof moviesSchema>[number] & { isSkeleton?: never })
    | ({ isSkeleton?: boolean } & Partial<z.infer<typeof moviesSchema>[number]>)
  onPress?: () => void
}) {
  return (
    <Button
      className="m-1 h-[160px] w-[120px] min-w-[0] shrink-0 p-0 lg:h-[300px] lg:w-[200px]"
      onClick={onPress}
      draggable={false}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onPress?.()
        }
      }}
    >
      <Image
        src={movie.poster_path ? getImageUrl(movie.poster_path, "w500") : ""}
        isLoading={movie.isSkeleton}
        width={200}
        height={300}
        alt={movie.title}
      />
    </Button>
  )
}
