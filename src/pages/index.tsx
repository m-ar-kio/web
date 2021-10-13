import React from "react"
import { Block } from "baseui/block"
import "../styles/index.css"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useLatestMarks } from "../hooks"

function Index() {
  const { isLoading, marks } = useLatestMarks()

  console.log(marks)
  return (
    <Layout title="m-ar-k">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        {marks.map(m => {
          return <Mark key={m.txId} mark={m.bm} />
        })}
      </Block>
    </Layout>
  )
}

export default Index
