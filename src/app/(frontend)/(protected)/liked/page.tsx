import LikedMovies from "./liked"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-between p-6">
      <LikedMovies />
    </main>
  )
}
