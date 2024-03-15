import { Icons } from "../icons"

export default function Rating({
  score,
}: {
  score: number | undefined // Between 0 and 5
}) {
  const getStars = (score: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      const isSemifull = i < score && score < i + 1
      if (isSemifull)
        stars.push(
          <div className="relative" key={i}>
            <Icons.star
              className={"absolute left-0 z-10 text-yellow-300 text-opacity-100"}
              fill="currentColor"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
            <Icons.star className={"z-0 text-yellow-300 text-opacity-25"} fill="currentColor" />
          </div>
        )
      else
        stars.push(
          <Icons.star
            key={i}
            className={`text-yellow-300 ${i < Math.floor(score) ? "text-opacity-100" : "text-opacity-25"}`}
            fill="currentColor"
          />
        )
    }
    return stars
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-row gap-1">{getStars(score ?? 0)}</div>
    </div>
  )
}
