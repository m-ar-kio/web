import * as React from "react"
import { Block } from "baseui/block"
import { Twitter, Link } from "react-feather"

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
        justifyContent="space-between"
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
        <Twitter color="#002FA7" />
        <a
          href={`https://viewblock.io/arweave/tx/${mark.txId}`}
          target="_blank"
        >
          <Link color="#002FA7" />
        </a>
      </Block>
    </Block>
  )
}
