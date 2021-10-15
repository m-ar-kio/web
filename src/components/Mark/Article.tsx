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
