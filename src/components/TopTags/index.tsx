import React, { useEffect, useState } from "react"
import { H3 } from "baseui/typography"
import { fetchTopTags } from "../../hooks"
import { Link } from "gatsby"
import { StyledLink } from "baseui/link"

export default function TopTags() {
  const [topTags, setTopTags] = useState([])
  useEffect(() => {
    fetchTopTags().then(res => setTopTags(res))
  }, [])

  return (
    <div
      style={{
        border: "#222326 1px solid",
        margin: "10px",
        boxShadow: "8px 8px 0px 0px #222326",
        padding: "20px 30px",
        position: "relative",
        top: 96,
      }}
    >
      <H3 margin="0px">Top Tags</H3>
      {topTags.map((tag, idx) => (
        <p key={tag}>
          <span>{idx + 1}</span>
          <a
            style={{
              marginLeft: 8,
              background: "#222326",
              color: "white",
              padding: "4px 8px",
              cursor: "pointer",
            }}
            href={`/tag?value=${tag}`}
          >{`#${tag}`}</a>
        </p>
      ))}
    </div>
  )
}
