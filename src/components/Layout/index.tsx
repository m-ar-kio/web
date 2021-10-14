import React, { useEffect, useState } from "react"
import { Provider as StyletronProvider, useStyletron } from "styletron-react"
import { LightTheme, BaseProvider, styled } from "baseui"
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation"
import { StyledLink } from "baseui/link"
import { Button } from "baseui/button"
import { Helmet } from "react-helmet"

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
  const [engine, setEngine] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const address = localStorage.getItem("address")
      setAddress(address)
    }

    import("styletron-engine-atomic").then(styletron => {
      const _engine =
        typeof window !== "undefined"
          ? new styletron.Client()
          : new styletron.Server()
      setEngine(_engine)
    })
  }, [])

  if (!engine) return null

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Work+Sans"
          />
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
              <StyledLink href="/">Home</StyledLink>
            </StyledNavigationItem>
            <StyledNavigationItem>
              <StyledLink href="/inbox">Inbox</StyledLink>
            </StyledNavigationItem>
            <StyledNavigationItem>
              {address && <Button>{ellipsis(address, 8, 8)}</Button>}
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
