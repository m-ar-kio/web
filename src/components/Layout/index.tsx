import React, { useEffect, useState } from "react"
import Arweave from "arweave/web"
import { Client } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider, styled } from "baseui"
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation"
import { StyledLink } from "baseui/link"
import { Button } from "baseui/button"
import { Block } from "baseui/block"
import { Helmet } from "react-helmet"

const engine = new Client()

const HCentered = styled("p", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  margin: "0px",
  fontWeight: 800,
  fontSize: "24px",
})

const SpanAR = styled("span", {
  display: "inline-block",
  border: "4px solid black",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  textAlign: "center",
  paddingTop: "3px",
  margin: "0px 4px 0px 4px",
  fontWeight: 800,
  boxSizing: "border-box",
})

export const ellipsis = (
  str: string,
  lead: number = 3,
  tail: number = 3
): string => {
  if (str && str.length > lead + tail + 8) {
    return `${str.substring(0, lead)}...${str.substring(
      str.length - tail,
      str.length
    )}`
  }
  return str
}

export default function Layout({
  title,
  children,
}: {
  title: string
  children?: any
}) {
  const [address, setAddress] = useState("")

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
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        <HeaderNavigation>
          <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>
              <StyledLink href="/">
                <HCentered>
                  m<SpanAR>ar</SpanAR>k
                </HCentered>
              </StyledLink>
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.center} />
          <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
              <StyledLink href="/inbox">Inbox</StyledLink>
            </StyledNavigationItem>
            <StyledNavigationItem>
              {address && <Button>{address}</Button>}
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.right} />
        </HeaderNavigation>
        {children}
        {/* <Block
          display="flex"
          justifyContent="space-between"
          backgroundColor="#333"
          padding="30px"
        ></Block> */}
      </BaseProvider>
    </StyletronProvider>
  )
}
