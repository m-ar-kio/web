export const ellipsis = (
  str: string,
  lead: number = 3,
  tail: number = 3
): string => {
  if (str && str.length > lead + tail + 8) {
    return `${str.substring(0, lead)}...${str.substring(
      str.length - tail,
      str.length
    )}`
  }
  return str
}

export const formatMark = mark => {
  const tag = mark.tags.find(t => t.name === "Unix-Time")
  return {
    content: mark.bm.content,
    origin: mark.bm.origin,
    txId: mark.id,
    timestamp: Number(tag.value),
    owner: mark.owner.address,
  }
}
