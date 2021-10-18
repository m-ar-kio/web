import * as React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "baseui/modal"
import { Input } from "baseui/input"
import { Button } from "baseui/button"
import { TOAST_DURATION } from "../../utils/constants"
import { toaster } from "baseui/toast"

export default function CoffeeModal({ mark, onClose }) {
  const [isOpen, setIsOpen] = React.useState(!!mark)
  const [value, setValue] = React.useState("")
  return (
    <Modal
      size="auto"
      onClose={() => {
        onClose()
        setIsOpen(false)
      }}
      isOpen={isOpen}
      unstable_ModalBackdropScroll
      overrides={{
        Dialog: {
          style: ({ $theme }) => ({
            height: "auto",
          }),
        },
      }}
    >
      <ModalHeader>Buy me a cup of coffee</ModalHeader>
      <ModalBody>
        <p>{mark.owner}</p>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Number of AR"
          clearOnEscape
          type="number"
          autoFocus
        />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            if (!value) {
              toaster.negative("Invalid number", {
                autoHideDuration: TOAST_DURATION,
              })
              return
            }
            import("arweave/web")
              .then(async Arweave => {
                const arweave = Arweave.default.init({
                  host: "arweave.net",
                  port: 443,
                  protocol: "https",
                })
                const keyfile = sessionStorage.getItem("keyfile")
                if (keyfile) {
                  const wallet = JSON.parse(keyfile)
                  const coffeeTx = await arweave.createTransaction(
                    {
                      target: mark.owner,
                      quantity: arweave.ar.arToWinston(value),
                    },
                    wallet
                  )
                  await arweave.transactions.sign(coffeeTx, wallet)
                  await arweave.transactions.post(coffeeTx)
                  toaster.positive("Transaction sent, thank you", {
                    autoHideDuration: TOAST_DURATION,
                  })
                  setIsOpen(false)
                } else if (window.arweaveWallet) {
                  const coffeeTx = await arweave.createTransaction({
                    target: mark.owner,
                    quantity: arweave.ar.arToWinston(value),
                  })
                  await window.arweaveWallet.sign(coffeeTx)
                  await arweave.transactions.post(coffeeTx)
                  toaster.positive("Transaction sent, thank you", {
                    autoHideDuration: TOAST_DURATION,
                  })
                  setIsOpen(false)
                }
              })
              .catch(error => {
                toaster.negative(error.message, {
                  autoHideDuration: TOAST_DURATION,
                })
              })
          }}
        >
          OK
        </Button>
      </ModalFooter>
    </Modal>
  )
}
