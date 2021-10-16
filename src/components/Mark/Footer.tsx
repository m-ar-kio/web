import React from "react"
import { Block } from "baseui/block"
import { ellipsis } from "../../utils/format"
import dayjs from "dayjs"
import Source from "./Source"

export default function Footer({ mark, parsedURL }) {
  return (
    <Block
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      className="footer"
      overrides={{
        Block: {
          style: {
            paddingTop: "5px",
            borderTop: "#222326 1px solid",
            marginTop: "5px",
          },
        },
      }}
    >
      <Source parsedURL={parsedURL} />
      <span>
        <span style={{ marginRight: 4 }}>HASH:</span>
        <a
          href={`https://viewblock.io/arweave/tx/${mark.txId}`}
          target="_blank"
          rel="noreferrer"
        >
          {ellipsis(mark.txId, 5, 0)}
        </a>
      </span>
      <span>
        <span style={{ marginRight: 4 }}>Marker:</span>
        <a
          href={`https://viewblock.io/arweave/address/${mark.sender}`}
          target="_blank"
          rel="noreferrer"
        >
          {ellipsis(mark.owner, 5, 6)}
        </a>
      </span>
      <span>{dayjs(mark.timestamp * 1000).format("YYYY/MM/DD HH:MM")}</span>
    </Block>
  )
}
