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
              return arweave.transactions.get(tx).then(async tx => tx.data)
            })
          )
            .then(results => {
              setMarks(
                results.map((t, idx) => {
                  return {
                    bm: JSON.parse(arweave.utils.bufferToString(t as any)),
                    txId: transactions[idx],
                  }
                })
              )
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
              return arweave.transactions.get(tx).then(async tx => tx.data)
            })
          )
            .then(results => {
              setMarks(
                results.map((t, idx) => {
                  return {
                    bm: JSON.parse(arweave.utils.bufferToString(t as any)),
                    txId: transactions[idx],
                  }
                })
              )
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
