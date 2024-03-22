import { trpc } from "@/lib/trpc/client"

export default function useSearchQuery({ query, enabled }: { query: string; enabled: boolean }) {
  const searchQuery = trpc.movies.getMovies.useQuery(
    {
      search: query,
    },
    {
      enabled,
    }
  )

  return searchQuery
}
