import * as React from "react"
import { Block } from "baseui/block"
import { Tag, VARIANT } from "baseui/tag"
import { getTagKind } from "./helper"

export default function Tags({ tags }: { tags: string[] }) {
  if (!tags || !tags.length) {
    return null
  }
  return (
    <Block
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      flexDirection="row"
      className="footer-tags"
    >
      {tags.map(t => {
        return (
          <Tag
            key={t}
            closeable={false}
            kind={getTagKind(t)}
            variant="solid"
            onClick={() => {
              window.location.href = `/tag?value=${t}`
            }}
          >
            {`#${t}`}
          </Tag>
        )
      })}
    </Block>
  )
}
