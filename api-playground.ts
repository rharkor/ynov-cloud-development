import { exit } from "process"

import { serverTrpc } from "@/lib/trpc/server"

const main = async () => {
  const result = await serverTrpc.movies.getPopularMovies()
  console.log(result)

  exit(0)
}

main()
