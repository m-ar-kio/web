export const isTwitter = hostname => hostname.includes("twitter.com")

export const isMirror = hostname => hostname.includes("mirror.xyz")

export const isMedium = hostname => hostname.includes("medium.com")

export const isNyTimes = hostname => hostname.includes("nytimes.com")

export const isBBC = hostname => hostname.includes("bbc.com")

export const isTime = hostname => hostname.includes("time.com")

let color_index = 0
const COLOR_SOURCE = [
  "primary",
  "accent",
  "positive",
  "warning",
  "negative",
  "white",
  "black",
  "blue",
  "red",
  "orange",
  "yellow",
  "green",
  "purple",
  "brown",
]
const TAG_COLORS = {}

export const getTagKind = (tag: string) => {
  if (TAG_COLORS[tag]) {
    return TAG_COLORS[tag]
  }
  TAG_COLORS[tag] = COLOR_SOURCE[color_index % COLOR_SOURCE.length]
  color_index++
  return TAG_COLORS[tag]
}
