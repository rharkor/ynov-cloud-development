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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (fn: (...args: any[]) => unknown, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(func: T, options?: { wait?: number; immediate?: boolean }) {
  const { wait, immediate } = { ...{ wait: 20, immediate: true }, ...options }
  let previous = 0
  let timer: NodeJS.Timeout | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args: any[]) {
    if (immediate) {
      const now = Date.now()

      if (now - previous > wait) {
        func.apply(this, args)
        previous = now
      }
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null
          func.apply(this, args)
        }, wait)
      }
    }
  } as T
}
