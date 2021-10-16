import React from "react"
import { H1, Paragraph2 } from "baseui/typography"
import Layout from "../components/Layout"
import { Block } from "baseui/block"

function About() {
  return (
    <Layout title="About">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Block
          width="800px"
          height="auto"
          margin="0 auto"
          flexDirection="column"
        >
          <h1>About MARK</h1>
          <Paragraph2>Mark is a bookmark tool running on arweave.</Paragraph2>
          <Paragraph2>
            Every time you create a mark content, you spend fee and 0.02 AR for
            PST fee which will be distributed to $MARK holders, but you'll get
            one claimable $MARK(not claimable for now).
          </Paragraph2>
          <Paragraph2>
            You can see marks flow and your own marks on the official website.
            If you found any mark helps you, you can also "buy a cup of coffee"
            for the marker.
          </Paragraph2>
        </Block>
      </Block>
    </Layout>
  )
}

export default About
