import React, { useEffect, useState } from "react"
import { Block } from "baseui/block"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useMyMarkFlow } from "../hooks"
import Login from "../components/Login"
import { H1 } from "baseui/typography"
import { formatMark } from "../utils/format"
import PacmanLoader from "react-spinners/PacmanLoader"
import { getClaimableMark } from "../utils/pst"
import { Button } from "baseui/button"

function Index() {
  const [address, setAddress] = useState("")
  const [page, setPage] = React.useState(1)
  const [claimable, setClaimable] = useState(0)
  const { isLoading, marks } = useMyMarkFlow(address, page)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const address = localStorage.getItem("address")
      setAddress(address)

      if (address) {
        getClaimableMark(address).then(value => setClaimable(value))
      }
    }
  }, [])

  return (
    <Layout title="m-ar-k | Inbox">
      <Block
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        {!address && <Login />}
        {address && <H1>{`My Marks(${claimable} in total)`}</H1>}
        {isLoading && (
          <div style={{ width: 300, height: 300, marginTop: 100 }}>
            <PacmanLoader color="#000" loading={isLoading} size={50} />
          </div>
        )}
        {address &&
          marks.map(m => {
            return <Mark key={m.id} mark={formatMark(m)} />
          })}

        {address && !!marks.length && (
          <Button
            isLoading={isLoading}
            onClick={() => !isLoading && setPage(page + 1)}
          >
            LOAD MORE
          </Button>
        )}
      </Block>
    </Layout>
  )
}

export default Index
