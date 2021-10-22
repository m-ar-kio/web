import React from "react"
import { Block } from "baseui/block"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useMarkFlow } from "../hooks"
import { H1 } from "baseui/typography"
import { formatMark } from "../utils/format"
import { Button } from "baseui/button"
import CoffeeModal from "../components/Mark/CoffeeModal"
import PacmanLoader from "react-spinners/PacmanLoader"

function Index() {
  const [page, setPage] = React.useState(1)
  const [coffeeMark, setCoffeeMark] = React.useState(null)
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
          <Button
            isLoading={isLoading}
            onClick={() => !isLoading && setPage(page + 1)}
          >
            LOAD MORE
          </Button>
        )}
        {!!coffeeMark && (
          <CoffeeModal mark={coffeeMark} onClose={() => setCoffeeMark(null)} />
        )}
      </Block>
    </Layout>
  )
}

export default Index
