import React from "react"
import { Block } from "baseui/block"
import "../styles/index.css"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useLatestMarks } from "../hooks"
import { H1 } from "baseui/typography"
import { Spinner } from "baseui/spinner"

function Index() {
  const { isLoading, marks } = useLatestMarks()

  return (
    <Layout title="m-ar-k">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <H1>Marks Feed</H1>
        {isLoading && <Spinner size="100px" color="#222326" />}
        {marks.map(m => {
          return (
            <Mark
              key={m.txId}
              mark={{
                ...m.bm,
                txId: m.txId,
                sender: m.sender,
                timestamp: m.timestamp,
              }}
            />
          )
        })}
      </Block>
    </Layout>
  )
}

export default Index
