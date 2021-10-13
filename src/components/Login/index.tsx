import * as React from "react"
import { FileUploader } from "baseui/file-uploader"
import { Block } from "baseui/block"
import { H1, H6 } from "baseui/typography"

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState("")
  return (
    <Block
      width="100vw"
      padding="30px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Block width="500px">
        <H1>Load your keyfile</H1>
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

                if (keyfile.kty === "RSA") {
                  sessionStorage.setItem("keyfile", reader.result as string)
                  window.location.reload()
                } else {
                  setErrorMessage("Error: Not a keyfile")
                }
              }
            } else {
              setErrorMessage("Error: Not a keyfile")
            }
          }}
        />
        <H6>m-ar-k won't upload or save your keyfile</H6>
      </Block>
    </Block>
  )
}
