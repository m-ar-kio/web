import * as React from "react"
import { Block } from "baseui/block"
import { Link } from "react-feather"
import { ellipsis } from "../Layout"
import dayjs from "dayjs"
import Source from "./Source"
import MarkInModal from "./InModal"

export default function Article({
  tree,
  reactOutput,
  mark,
  parsedURL,
  isInModal,
}) {
  const [viewMode, setViewMode] = React.useState(false)

  return (
    <Block
      className={`mark tweet ${isInModal ? "in-modal" : ""}`}
      width="800px"
      overrides={{
        Block: {
          style: {
            padding: "20px",
            border: "#222326 1px solid",
            margin: "10px",
            boxShadow: "8px 8px 0px 0px #222326",
            cursor: "pointer",
          },
        },
      }}
      onClick={() => !isInModal && setViewMode(true)}
    >
      <Block className="content">{reactOutput(tree)}</Block>
      <Block
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        overrides={{
          Block: {
            style: {
              paddingTop: "15px",
              borderTop: "#222326 1px solid",
              marginTop: "15px",
            },
          },
        }}
      >
        <Source parsedURL={parsedURL} />
        <a
          href={`https://viewblock.io/arweave/tx/${mark.txId}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span style={{ marginRight: 4 }}>HASH:</span>
          <span>{ellipsis(mark.txId, 5, 0)}</span>
        </a>
        <a
          href={`https://viewblock.io/arweave/address/${mark.sender}`}
          target="_blank"
          rel="noreferrer"
        >
          <span style={{ marginRight: 4 }}>Marker:</span>
          <span>{ellipsis(mark.owner, 5, 6)}</span>
        </a>
        <span style={{ marginRight: 20 }}>{`Created at: ${dayjs(
          mark.timestamp * 1000
        ).format("YYYY-MM-DD HH:MM")}`}</span>
      </Block>
      {!isInModal && viewMode && (
        <MarkInModal
          mark={mark}
          onClose={() => {
            setViewMode(false)
          }}
        />
      )}
    </Block>
  )
}
