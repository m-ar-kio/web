import * as React from "react"
import urlParse from "url-parse"
import SimpleMarkdown from "simple-markdown"
import { initTwitterRules } from "./rules/twitter"
import { isMirror, isTwitter } from "./helper"
import Tweet from "./Tweet"
import Article from "./Article"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { Coffee } from "react-feather"

interface Props {
  mark: any
  isInModal?: boolean
  setCoffeeMark?: (mark) => void
}

export default function Mark({ mark, isInModal, setCoffeeMark }: Props) {
  const rules = {
    ...SimpleMarkdown.defaultRules,
    ...initTwitterRules(mark),
  }
  const rawBuiltParser = SimpleMarkdown.parserFor(rules)
  const parse = function (source) {
    const blockSource = source + "\n\n"
    return rawBuiltParser(blockSource, { inline: false })
  }
  const reactOutput = SimpleMarkdown.outputFor(rules, "react")

  const tree = parse(mark.content)
  const parsedURL = urlParse(mark.origin, true)

  const _isTwitter = isTwitter(parsedURL.hostname)
  const _isMirror = isMirror(parsedURL.hostname)
  let content = null
  if (_isTwitter || _isMirror) {
    content = (
      <Tweet
        tree={tree}
        reactOutput={reactOutput}
        mark={mark}
        parsedURL={parsedURL}
        isInModal={isInModal}
      />
    )
  } else {
    content = (
      <Article
        tree={tree}
        reactOutput={reactOutput}
        mark={mark}
        parsedURL={parsedURL}
        isInModal={isInModal}
      />
    )
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent)
  return (
    <Block
      width={isMobile ? "calc(100% - 30px)" : "800px"}
      margin={isMobile ? "0px 10px" : "0px"}
      overrides={{
        Block: {
          style: {
            padding: "20px",
            border: "#222326 1px solid",
            margin: "10px",
            boxShadow: "8px 8px 0px 0px #222326",
            cursor: "pointer",
            position: "relative",
          },
        },
      }}
    >
      {content}
      {!!setCoffeeMark && (
        <Button
          kind="secondary"
          overrides={{
            BaseButton: {
              style: {
                position: "absolute",
                right: 0,
                top: 0,
              },
            },
          }}
          onClick={() => {
            setCoffeeMark(mark)
          }}
        >
          <Coffee />
        </Button>
      )}
    </Block>
  )
}
