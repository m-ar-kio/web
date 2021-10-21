import * as React from "react"
import { FileUploader } from "baseui/file-uploader"
import { Block } from "baseui/block"
import { H1 } from "baseui/typography"
import { Button } from "baseui/button"
import { toaster } from "baseui/toast"
import { TOAST_DURATION } from "../../utils/constants"

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState("")
  return (
    <Block
      width="100vw"
      padding="30px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Block
        width="500px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <FileUploader
          accept=".json"
          errorMessage={errorMessage}
          onDrop={file => {
            if (file[0].name.split(".").pop().toLowerCase() === "json") {
              const upload = file[0]
              const reader = new FileReader()
              reader.readAsText(upload)
              reader.onload = () => {
                const keyfile = JSON.parse(reader.result as string)

                sessionStorage.setItem("keyfile", reader.result as string)
                if (keyfile.kty === "RSA") {
                  import("arweave/web").then((Arweave: any) => {
                    const arweave = Arweave.default.init({
                      host: "arweave.net",
                      port: 443,
                      protocol: "https",
                    })
                    arweave.wallets
                      .jwkToAddress(JSON.parse(reader.result as string))
                      .then(address => {
                        console.log(address)
                        localStorage.setItem("address", address)
                        window.location.reload()
                      })
                      .catch(console.log)
                  })
                } else {
                  setErrorMessage("Error: Not a keyfile")
                }
              }
            } else {
              setErrorMessage("Error: Not a keyfile")
            }
          }}
        />
        <H1>OR</H1>

        <Button
          size="large"
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                padding: "15px 75px",
              }),
            },
          }}
          onClick={() => {
            window.arweaveWallet
              .connect([
                "ACCESS_ADDRESS",
                "ACCESS_ALL_ADDRESSES",
                "SIGN_TRANSACTION",
              ])
              .then(value => {
                window.location.reload()
              })
              .catch(error => {
                toaster.negative(error.message, {
                  autoHideDuration: TOAST_DURATION,
                })
              })
          }}
        >
          Connect
        </Button>
      </Block>
    </Block>
  )
}
