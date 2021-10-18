import React, { useEffect, useState } from "react"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider, DarkTheme } from "baseui"
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation"
import { StyledLink } from "baseui/link"
import { Button } from "baseui/button"
import { Helmet } from "react-helmet"
import { ToasterContainer } from "baseui/toast"
import { Block } from "baseui/block"
import { StatefulTooltip } from "baseui/tooltip"
import "arconnect"
import "../../styles/index.css"
import LOGO from "../../images/logo.svg"
import { ellipsis } from "../../utils/format"
import { getClaimableMark } from "../../utils/pst"
import { Paragraph3 } from "baseui/typography"

export default function Layout({
  title,
  children,
}: {
  title: string
  children?: any
}) {
  const [address, setAddress] = useState("")
  const [engine, setEngine] = useState(null)
  const [claimable, setClaimable] = useState(0)

  useEffect(() => {
    import("styletron-engine-atomic").then(styletron => {
      const _engine =
        typeof window !== "undefined"
          ? new styletron.Client()
          : new styletron.Server()
      setEngine(_engine)
    })
    if (address) {
      getClaimableMark(address).then(value => setClaimable(value))
      return
    }
    if (typeof window !== "undefined") {
      const address = localStorage.getItem("address")
      if (address) {
        setAddress(address)
      } else {
        if (window.arweaveWallet) {
          window.arweaveWallet
            .getActiveAddress()
            .then(address => {
              if (address) {
                localStorage.setItem("address", address)
                window.location.reload()
              }
            })
            .catch(() => {})
        }
      }
      window.addEventListener("walletSwitch", e => {
        localStorage.setItem("address", e.detail.address)
      })
    }
  }, [address])

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
                <img src={LOGO} alt="LOGO" height="50px" />
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
              {address && (
                <StatefulTooltip
                  content={() => (
                    <Block padding="20px 0px">
                      <p
                        style={{ fontSize: 20, margin: 0, color: "#000" }}
                      >{`Claimable $MARK: ${claimable}`}</p>
                    </Block>
                  )}
                  returnFocus
                  autoFocus
                  overrides={{
                    Body: {
                      style: ({ $theme }) => ({
                        backgroundColor: "white",
                      }),
                    },
                    Inner: {
                      style: ({ $theme }) => ({
                        backgroundColor: "white",
                      }),
                    },
                  }}
                >
                  <Button>{ellipsis(address, 8, 8)}</Button>
                </StatefulTooltip>
              )}
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.right} />
        </HeaderNavigation>
        <ToasterContainer />
        <main>{children}</main>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#333",
            padding: 30,
            marginTop: 30,
          }}
        >
          <Block
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <img src={LOGO} alt="LOGO" height="50px" />
            <a
              href="https://twitter.com/markarweave"
              target="_blank"
              style={{ marginLeft: 10, color: "white" }}
            >
              Twitter
            </a>
            <a
              href="https://github.com/m-ar-kio"
              target="_blank"
              style={{ marginLeft: 10, color: "white" }}
            >
              Github
            </a>
            <a href="/about" style={{ marginLeft: 10, color: "white" }}>
              About
            </a>
          </Block>
          <Block>
            <Paragraph3 color="white" $style={{ margin: "2px" }}>
              © 2021 • all rights reserved.
            </Paragraph3>
            <Paragraph3 color="white" $style={{ margin: "2px" }}>
              donate:
              <a
                href="https://viewblock.io/arweave/address/WBnjVFK2haoNYtmepHBxejjYvl7yiYoWcndPOo-DoIg"
                target="_blank"
                style={{
                  marginLeft: 10,
                  color: "white",
                  borderBottom: "1px solid white",
                }}
              >
                WBnjVFK2haoNYtmepHBxejjYvl7yiYoWcndPOo-DoIg
              </a>
            </Paragraph3>
          </Block>
        </div>
      </BaseProvider>
    </StyletronProvider>
  )
}
