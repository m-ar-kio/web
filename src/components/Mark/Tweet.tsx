import * as React from "react"
import { Block } from "baseui/block"
import MarkInModal from "./InModal"
import Footer from "./Footer"
import { isMirror, isTwitter } from "./helper"

export default function Tweet({
  tree,
  reactOutput,
  mark,
  parsedURL,
  isInModal,
}) {
  const [viewMode, setViewMode] = React.useState(false)
  const _isTwitter = isTwitter(parsedURL.hostname)
  const _isMirror = isMirror(parsedURL.hostname)
  return (
    <Block
      className={`mark tweet ${isInModal ? "in-modal" : ""} ${
        _isMirror ? "mirror" : ""
      }`}
      onClick={() => !isInModal && setViewMode(true)}
    >
      <Block
        className="author"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        {reactOutput(tree[0])}
        {_isTwitter ? reactOutput(tree[1]) : ""}
      </Block>
      <Block className="content">
        {reactOutput(tree.slice(_isTwitter ? 2 : 1))}
      </Block>
      <Footer parsedURL={parsedURL} mark={mark} />
      {!isInModal && viewMode && (
        <MarkInModal mark={mark} onClose={() => setViewMode(false)} />
      )}
    </Block>
  )
}
