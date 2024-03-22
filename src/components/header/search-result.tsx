import Image from "next/image"

import { getImageUrl } from "@/lib/themoviedb/utils"
import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/react"

import { TItem } from "./use-search-results"

export function SearchResult({ title, poster_path, overview, onClick }: TItem) {
  console

  return (
    <Button
      className="group flex h-[unset] shrink-0 flex-row items-start justify-start gap-2 border-default-200 bg-default-100 p-3"
      color="primary"
      variant="ghost"
      onPress={onClick}
    >
      {poster_path && (
        <div className="shrink-0 overflow-hidden rounded-medium">
          <Image src={getImageUrl(poster_path, "w500")} width={65} height={100} alt={title} />
        </div>
      )}
      <div className="flex h-max flex-col justify-start">
        <p className="text-start text-lg font-bold text-default-900 group-hover:text-foreground">{title}</p>
        <p
          className={cn(
            "mt-1 max-h-16 w-full truncate whitespace-normal text-start text-sm text-foreground-600 group-hover:text-foreground"
          )}
          style={
            {
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }
        >
          {overview}
        </p>
      </div>
    </Button>
  )
}
