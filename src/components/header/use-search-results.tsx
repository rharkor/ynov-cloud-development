import { useRouter } from "next/navigation"
import { z } from "zod"

import { getMoviesResponseSchema } from "@/api/movies/schemas"

export type TItem = {
  id: number
  title: string
  poster_path: string | null
  overview: string
  onClick: () => void
}

export default function useSearchResults({
  data,
  onClose,
}: {
  data: z.infer<typeof getMoviesResponseSchema> | undefined
  onClose: () => void
}): TItem[] {
  const router = useRouter()

  if (!data) return []
  return data.results.map((result) => ({
    ...result,
    onClick: () => {
      router.push(`/movies/${result.id}`)
      onClose()
    },
  }))
}
