import { useEffect, useState } from "react"
import { request, gql } from "graphql-request"

export const useMyMarks = (address: string) => {
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    if (!address) {
      return
    }
    if (!marks.length && typeof window !== "undefined") {
      import("arweave/web").then((Arweave: any) => {
        const arweave = Arweave.default.init({
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
              transactions.map(txId => {
                return new Promise(async (resolve, reject) => {
                  try {
                    const tx = await arweave.transactions.get(txId)
                    const owner = await arweave.wallets.ownerToAddress(tx.owner)
                    let timestamp = 0
                    tx.tags.forEach((tag: any) => {
                      let key = tag.get("name", {
                        decode: true,
                        string: true,
                      })
                      let value = tag.get("value", {
                        decode: true,
                        string: true,
                      })
                      if (key === "Unix-Time") {
                        timestamp = Number(value)
                      }
                    })
                    resolve({
                      sender: owner,
                      data: tx.data,
                      timestamp,
                    })
                  } catch (error) {
                    resolve(null)
                  }
                })
              })
            )
              .then(results => {
                setMarks(
                  results
                    .filter(t => t)
                    .map((t: any, idx) => {
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
    if (!marks.length && typeof window !== "undefined") {
      import("arweave/web").then((Arweave: any) => {
        const arweave = Arweave.default.init({
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
          const transactions = response.data

          if (transactions.length > 0) {
            Promise.all(
              transactions.map(txId => {
                return new Promise(async (resolve, reject) => {
                  try {
                    const tx = await arweave.transactions.get(txId)
                    const owner = await arweave.wallets.ownerToAddress(tx.owner)
                    let timestamp = 0
                    tx.tags.forEach((tag: any) => {
                      let key = tag.get("name", {
                        decode: true,
                        string: true,
                      })
                      let value = tag.get("value", {
                        decode: true,
                        string: true,
                      })
                      if (key === "Unix-Time") {
                        timestamp = Number(value)
                      }
                    })
                    resolve({
                      sender: owner,
                      data: tx.data,
                      timestamp,
                    })
                  } catch (error) {
                    resolve(null)
                  }
                })
              })
            )
              .then(results => {
                setMarks(
                  results
                    .filter(t => t)
                    .map((t: any, idx) => {
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
      })
    }
  }, [marks])

  return {
    isLoading: isLoadingMarks,
    marks,
  }
}

const formatTX = (ids, arweave) => {
  return Promise.all(
    ids.map(txId => {
      return new Promise(async (resolve, reject) => {
        try {
          const tx = await arweave.transactions.get(txId)
          resolve(tx.data)
        } catch (error) {
          console.log("###id error", error)
          resolve(null)
        }
      })
    })
  )
}

export const useMarkFlow = (page = 1) => {
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    async function fetch() {
      const query = gql`
        query {
          transactions(
            first: ${page * 10}
            recipients: ["FaZaQ48i0WXQyGXw68xuwuc6acUQoXYr8iLe8W-w234"]
            tags: { name: "App-Name", values: ["permamark"] }
          ) {
            edges {
              node {
                id
                owner {
                  address
                }
                tags {
                  name
                  value
                }
              }
            }
          }
        }
      `

      import("arweave/web").then(async (Arweave: any) => {
        const arweave = Arweave.default.init({
          host: "arweave.net",
          port: 443,
          protocol: "https",
        })

        try {
          const result = await request("https://arweave.net/graphql", query)
          const txs = result.transactions.edges.map(t => t.node)
          const ids = txs.map(t => t.id)
          const datas = await formatTX(ids, arweave)
          const mks = txs.map((t, idx) => {
            if (!datas[idx]) return null
            return {
              ...t,
              bm: JSON.parse(arweave.utils.bufferToString(datas[idx])),
            }
          })
          setMarks(mks.filter(t => t))
          setIsLoadingMarks(false)
        } catch (error) {
          setIsLoadingMarks(false)
        }
      })
    }
    fetch()
  }, [page])

  return {
    isLoading: isLoadingMarks,
    marks,
  }
}

export const useMyMarkFlow = (address, page = 1) => {
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    async function fetch() {
      const query = gql`
        query {
          transactions(
            first: ${page * 10}
            owners: ["${address}"]
            tags: { name: "App-Name", values: ["permamark"] }
          ) {
            edges {
              node {
                id
                owner {
                  address
                }
                tags {
                  name
                  value
                }
              }
            }
          }
        }
      `

      import("arweave/web").then(async (Arweave: any) => {
        const arweave = Arweave.default.init({
          host: "arweave.net",
          port: 443,
          protocol: "https",
        })

        try {
          const result = await request("https://arweave.net/graphql", query)
          const txs = result.transactions.edges.map(t => t.node)
          const ids = txs.map(t => t.id)
          const datas = await formatTX(ids, arweave)
          const mks = txs.map((t, idx) => {
            if (!datas[idx]) return null
            return {
              ...t,
              bm: JSON.parse(arweave.utils.bufferToString(datas[idx])),
            }
          })
          setMarks(mks.filter(t => t))
          setIsLoadingMarks(false)
        } catch (error) {
          console.log(error)
          setIsLoadingMarks(false)
        }
      })
    }
    fetch()
  }, [address, page])

  return {
    isLoading: isLoadingMarks,
    marks,
  }
}
