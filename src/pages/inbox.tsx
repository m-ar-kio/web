import React, { useEffect, useState } from "react"
import { Block } from "baseui/block"
import Arweave from "arweave/web"
import "../styles/index.css"
import Layout from "../components/Layout"
import Mark from "../components/Mark"
import { useMyMarks } from "../hooks"
import Login from "../components/Login"
import { StyledSpinnerNext } from "baseui/spinner"
import { H1 } from "baseui/typography"

function Index() {
  const [address, setAddress] = useState("")
  const { isLoading, marks } = useMyMarks(address)

  useEffect(() => {
    const _keyfile = sessionStorage.getItem("keyfile")
    if (_keyfile) {
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      })
      arweave.wallets.jwkToAddress(JSON.parse(_keyfile)).then(address => {
        setAddress(address)
      })
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
        {isLoading && <StyledSpinnerNext size="100px" />}
        {address &&
          marks.map(m => {
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
