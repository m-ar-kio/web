import * as React from "react"
import { Block } from "baseui/block"
import { Twitter, Link } from "react-feather"
import { ellipsis } from "../Layout"
import dayjs from "dayjs"

export default function Tweet({ tree, reactOutput, mark }) {
  return (
    <Block
      className="mark tweet"
      width="800px"
      overrides={{
        Block: {
          style: { padding: "20px", borderBottom: "3px solid #e3e3e3" },
        },
      }}
    >
      <Block
        className="author"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        {reactOutput(tree[0])}
        {reactOutput(tree[1])}
      </Block>
      <Block className="content">{reactOutput(tree.slice(2))}</Block>
      <Block
        display="flex"
        alignItems="center"
        flexDirection="row"
        overrides={{
          Block: {
            style: {
              paddingLeft: "70px",
              paddingTop: "15px",
            },
          },
        }}
      >
        <a
          href={mark.origin}
          target="_blank"
          style={{ display: "flex", alignItems: "center", marginRight: 20 }}
        >
          <span style={{ marginRight: 10 }}>Origin:</span>
          <Twitter color="#002FA7" />
        </a>
        <a
          href={`https://viewblock.io/arweave/tx/${mark.txId}`}
          target="_blank"
          style={{ display: "flex", alignItems: "center", marginRight: 20 }}
        >
          <span style={{ marginRight: 10 }}>HASH:</span>
          <Link color="#002FA7" />
        </a>
        <a
          href={`https://viewblock.io/arweave/address/${mark.sender}`}
          target="_blank"
          style={{ marginRight: 20 }}
        >
          <span style={{ marginRight: 10 }}>Marker:</span>
          <span>{ellipsis(mark.sender, 5, 6)}</span>
        </a>
        <span style={{ marginRight: 20 }}>{`Created at: ${dayjs(
          mark.timestamp * 1000
        ).format("YYYY-MM-DD HH:MM")}`}</span>
      </Block>
    </Block>
  )
}
