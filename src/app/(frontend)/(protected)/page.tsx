import PopularMovies from "./popular"
import RecommendedMovies from "./recommended"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between p-24 px-6">
      <PopularMovies />
      <RecommendedMovies />
    </main>
  )
}
