import { MARK_OWNER, TOAST_DURATION } from "./constants"
import { toaster } from "baseui/toast"

export const like = async (hash: string) => {
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
        const tx = await arweave.createTransaction(
          {
            target: MARK_OWNER,
            data: "",
            quantity: arweave.ar.arToWinston("0"),
          },
          wallet
        )
        const liker = await arweave.wallets.jwkToAddress(wallet)
        tx.addTag("App-Name", "permamark-vote")
        tx.addTag("liker", liker)
        tx.addTag("mark", hash)
        await arweave.transactions.sign(tx, wallet)
        await arweave.transactions.post(tx)
        toaster.positive("Liked, thank you", {
          autoHideDuration: TOAST_DURATION,
        })
      } else if (window.arweaveWallet) {
        const tx = await arweave.createTransaction({
          target: MARK_OWNER,
          data: "",
          quantity: arweave.ar.arToWinston("0"),
        })
        await window.arweaveWallet.sign(tx)
        await arweave.transactions.post(tx)
        toaster.positive("Liked, thank you", {
          autoHideDuration: TOAST_DURATION,
        })
      } else {
        toaster.negative("Please login first", {
          autoHideDuration: TOAST_DURATION,
        })
      }
    })
    .catch(error => {
      toaster.negative(error.message, {
        autoHideDuration: TOAST_DURATION,
      })
    })
}
