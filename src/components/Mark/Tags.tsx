import * as React from "react"
import { Block } from "baseui/block"
import { Tag, VARIANT } from "baseui/tag"
import { getTagKind } from "./helper"
import { StyledLink } from "baseui/link"

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
      paddingTop="5px"
    >
      {tags.map(t => {
        return (
          <StyledLink
            key={t}
            href={`/tag?value=${t}`}
            style={{
              marginLeft: 8,
              background: "#222326",
              color: "white",
              padding: "4px 8px",
            }}
          >
            {`#${t}`}
          </StyledLink>
        )
      })}
    </Block>
  )
}
