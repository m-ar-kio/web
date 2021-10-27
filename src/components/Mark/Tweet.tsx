import * as React from "react"
import { Block } from "baseui/block"
import MarkInModal from "./InModal"
import Footer from "./Footer"
import { isMirror, isTwitter } from "./helper"
import Tags from "./Tags"

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

  let _tree = tree
  if (_isTwitter) {
    _tree = formatTwitterTree(tree)
  }
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
        {reactOutput(_tree[0])}
        {_isTwitter ? reactOutput(_tree[1]) : ""}
      </Block>
      <Block className="content">
        {reactOutput(_tree.slice(_isTwitter ? 2 : 1))}
      </Block>
      <Footer parsedURL={parsedURL} mark={mark} />
      <Tags tags={mark.tags} />
      {!isInModal && viewMode && (
        <MarkInModal mark={mark} onClose={() => setViewMode(false)} />
      )}
    </Block>
  )
}

function formatTwitterTree(tree) {
  let avatarIndex = 0
  for (let index = 0; index < tree.length; index++) {
    if (tree[index].content.length === 1) {
      const content = tree[index].content[0]
      if (
        content &&
        content.type === "link" &&
        !content.title &&
        !content.content.length
      ) {
        avatarIndex = 2
        break
      }
    }
  }
  console.log(tree, avatarIndex)
  return tree.slice(avatarIndex)
}
