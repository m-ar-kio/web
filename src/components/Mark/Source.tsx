import React from "react"
import { isMedium, isNyTimes, isTwitter } from "./helper"
import TwitterLogo from "../../images/source/twitter.svg"
import MediumLogo from "../../images/source/medium.svg"
import NytimesLogo from "../../images/source/nytimes.svg"

export default function Source({ parsedURL }) {
  let src = null
  const hostname = parsedURL.hostname
  if (isTwitter(hostname)) {
    src = TwitterLogo
  } else if (isMedium(hostname)) {
    src = MediumLogo
  } else if (isNyTimes(hostname)) {
    src = NytimesLogo
  }
  return (
    <a href={parsedURL.href} target="_blank" rel="noreferrer">
      {src ? (
        <img src={src} alt="twitter" height="20px" />
      ) : (
        <span>{hostname}</span>
      )}
    </a>
  )
}
