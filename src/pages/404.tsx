import React from "react"
import { H1 } from "baseui/typography"
import Layout from "../components/Layout"
import { Block } from "baseui/block"

export default function NotFound() {
  return (
    <Layout title="404">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <H1>Not Found</H1>
      </Block>
    </Layout>
  )
}
