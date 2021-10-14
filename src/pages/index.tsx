import React from "react"
import { Block } from "baseui/block"
import "../styles/index.css"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useLatestMarks, useMarkFlow } from "../hooks"
import { H1 } from "baseui/typography"
import { Spinner } from "baseui/spinner"
import { formatMark } from "../utils/format"
import { Button } from "baseui/button"

function Index() {
  const [page, setPage] = React.useState(1)
  const { isLoading, marks } = useMarkFlow(page)

  return (
    <Layout title="m-ar-k">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <H1>Marks Flow</H1>
        {isLoading && <Spinner size="100px" color="#222326" />}
        {marks.map(m => {
          return <Mark key={m.id} mark={formatMark(m)} />
        })}
        {!!marks.length && !isLoading && (
          <Button onClick={() => setPage(page + 1)}>LOAD MORE</Button>
        )}
      </Block>
    </Layout>
  )
}

export default Index
