import React, { useEffect, useState } from "react"
import { Block } from "baseui/block"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { fetchTxByTag } from "../hooks"
import { H1 } from "baseui/typography"
import { formatMark } from "../utils/format"
import { Button } from "baseui/button"
import CoffeeModal from "../components/Mark/CoffeeModal"
import PacmanLoader from "react-spinners/PacmanLoader"

function TagPage() {
  const [page, setPage] = React.useState(1)
  const [marks, setMarks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [coffeeMark, setCoffeeMark] = React.useState(null)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    if (params.value) {
      setIsLoading(true)
      fetchTxByTag(page, params.value).then(_marks => {
        setIsLoading(false)
        setMarks(_marks)
      })
    }
  }, [page])

  return (
    <Layout title="m-ar-k">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <H1>Marks Flow</H1>
        {isLoading && (
          <div style={{ width: 300, height: 300, marginTop: 100 }}>
            <PacmanLoader color="#000" loading={isLoading} size={50} />
          </div>
        )}
        {marks.map(m => {
          return (
            <Mark
              key={m.id}
              mark={formatMark(m)}
              setCoffeeMark={setCoffeeMark}
            />
          )
        })}
        {!!marks.length && (
          <Button onClick={() => setPage(page + 1)}>LOAD MORE</Button>
        )}
        {!!coffeeMark && (
          <CoffeeModal mark={coffeeMark} onClose={() => setCoffeeMark(null)} />
        )}
      </Block>
    </Layout>
  )
}

export default TagPage
