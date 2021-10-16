import React, { useEffect, useState } from "react"
import { Block } from "baseui/block"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useMyMarkFlow } from "../hooks"
import Login from "../components/Login"
import { Spinner } from "baseui/spinner"
import { H1 } from "baseui/typography"
import { formatMark } from "../utils/format"

function Index() {
  const [address, setAddress] = useState("")
  const { isLoading, marks } = useMyMarkFlow(address)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const address = localStorage.getItem("address")
      setAddress(address)
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
        {address && <H1>My Marks</H1>}
        {isLoading && <Spinner size="100px" color="#222326" />}
        {address &&
          marks.map(m => {
            return <Mark key={m.id} mark={formatMark(m)} />
          })}
      </Block>
    </Layout>
  )
}

export default Index
