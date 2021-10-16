import React from "react"
import Layout from "../components/Layout"
import { Block } from "baseui/block"
import { Spinner } from "baseui/spinner"
import { H1 } from "baseui/typography"

function About() {
  return (
    <Layout title="About">
      <Block display="block" padding="0 200px">
        <h1>About MARK</h1>
        <p>Mark is a bookmark tool running on arweave.</p>
        <p>
          Every time you create a mark content, you spend fee and 0.02 AR for
          PST fee which will be distributed to $MARK holders, but you'll get one
          claimable $MARK(not claimable for now).
        </p>
        <p>
          You can see marks flow and your own marks on the official website. If
          you found any mark helps you, you can also "buy a cup of coffee" for
          the marker.
        </p>
      </Block>
    </Layout>
  )
}

export default About
