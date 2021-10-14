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
