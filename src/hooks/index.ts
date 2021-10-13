import { useEffect, useState } from "react"
import Arweave from "arweave/web"

export const useMyMarks = (address: string) => {
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    if (!marks.length) {
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      })

      const query = {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: address,
        },
        expr2: {
          op: "equals",
          expr1: "App-Name",
          expr2: "permamark",
        },
      }
      arweave.api.post(`arql`, query).then(async response => {
        let transactions = response.data

        if (transactions.length > 0) {
          Promise.all(
            transactions.map(tx => {
              return arweave.transactions.get(tx).then(async tx => {
                return arweave.wallets.ownerToAddress(tx.owner).then(t => {
                  let timestamp = 0
                  tx.tags.forEach((tag: any) => {
                    let key = tag.get("name", { decode: true, string: true })
                    let value = tag.get("value", { decode: true, string: true })
                    if (key === "Unix-Time") {
                      timestamp = Number(value)
                    }
                  })
                  return {
                    sender: t,
                    data: tx.data,
                    timestamp,
                  }
                })
              })
            })
          )
            .then(results => {
              setMarks(
                results.map((t: any, idx) => {
                  return {
                    bm: JSON.parse(arweave.utils.bufferToString(t.data)),
                    txId: transactions[idx],
                    sender: t.sender,
                    timestamp: t.timestamp,
                  }
                })
              )
              setIsLoadingMarks(false)
            })
            .catch(() => {
              setIsLoadingMarks(false)
            })
        } else {
        }
      })
    }
  }, [address])

  if (!address) {
    return {
      isLoading: false,
      marks: [],
    }
  }

  return {
    isLoading: isLoadingMarks,
    marks,
  }
}

export const useLatestMarks = () => {
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    if (!marks.length) {
      const arweave = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
      })

      const query = {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "to",
          expr2: "FaZaQ48i0WXQyGXw68xuwuc6acUQoXYr8iLe8W-w234",
        },
        expr2: {
          op: "equals",
          expr1: "App-Name",
          expr2: "permamark",
        },
      }
      arweave.api.post(`arql`, query).then(async response => {
        let transactions = response.data

        if (transactions.length > 0) {
          Promise.all(
            transactions.map(tx => {
              return arweave.transactions.get(tx).then(async tx => {
                return arweave.wallets.ownerToAddress(tx.owner).then(t => {
                  let timestamp = 0
                  tx.tags.forEach((tag: any) => {
                    let key = tag.get("name", { decode: true, string: true })
                    let value = tag.get("value", { decode: true, string: true })
                    if (key === "Unix-Time") {
                      timestamp = Number(value)
                    }
                  })
                  return {
                    sender: t,
                    data: tx.data,
                    timestamp,
                  }
                })
              })
            })
          )
            .then(results => {
              setMarks(
                results.map((t: any, idx) => {
                  return {
                    bm: JSON.parse(arweave.utils.bufferToString(t.data)),
                    txId: transactions[idx],
                    sender: t.sender,
                    timestamp: t.timestamp,
                  }
                })
              )
              setIsLoadingMarks(false)
            })
            .catch(() => {
              setIsLoadingMarks(false)
            })
        } else {
        }
      })
    }
  }, [marks])

  return {
    isLoading: isLoadingMarks,
    marks,
  }
}
