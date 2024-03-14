import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

export function stringToSlug(string: string): string {
  return string
    .toLowerCase()
    .replace(/[^\w -]+/g, "")
    .replace(/ +/g, "-")
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
