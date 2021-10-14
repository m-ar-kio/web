import * as React from "react"
import { Block } from "baseui/block"
import MarkInModal from "./InModal"
import Footer from "./Footer"

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
      className={`mark article ${isInModal ? "in-modal" : ""}`}
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
      <Footer parsedURL={parsedURL} mark={mark} />
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
