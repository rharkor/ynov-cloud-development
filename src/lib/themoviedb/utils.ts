export const getImageUrl = (path: string, size: "original" | "w500" = "w500") => {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
