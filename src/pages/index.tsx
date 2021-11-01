import React from "react"
import { Block } from "baseui/block"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useMarkFlow } from "../hooks"
import { Tabs, Tab } from "baseui/tabs-motion"
import { formatMark } from "../utils/format"
import { Button } from "baseui/button"
import CoffeeModal from "../components/Mark/CoffeeModal"
import PacmanLoader from "react-spinners/PacmanLoader"
import TopTags from "../components/TopTags"
import { H1 } from "baseui/typography"

function Index() {
  const [page, setPage] = React.useState(1)
  const [coffeeMark, setCoffeeMark] = React.useState(null)
  const [activeKey, setActiveKey] = React.useState("0")
  const { isLoading, marks } = useMarkFlow(page)

  return (
    <Layout title="m-ar-k">
      <Block
        display="flex"
        alignItems="flex-start"
        flexDirection="row"
        justifyContent="center"
        $style={{ position: "unset" }}
      >
        <div style={{ width: 820 }}>
          <H1>Latest</H1>
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
        </div>
        <TopTags />
      </Block>
      {!!coffeeMark && (
        <CoffeeModal mark={coffeeMark} onClose={() => setCoffeeMark(null)} />
      )}
    </Layout>
  )
}

export default Index
