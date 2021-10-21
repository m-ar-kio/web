import { useEffect, useState } from "react"
import { request, gql } from "graphql-request"

const formatTX = (ids, arweave) => {
  return Promise.all(
    ids.map(txId => {
      return new Promise(async (resolve, reject) => {
        try {
          const tx = await arweave.transactions.get(txId)
          resolve(tx.data)
        } catch (error) {
          resolve(null)
        }
      })
    })
  )
}

export const useMarkFlow = (page = 1, tag = "") => {
  const [marks, setMarks] = useState([])
  const [isLoadingMarks, setIsLoadingMarks] = useState(true)

  useEffect(() => {
    async function fetch() {
      let tagsQ = 'tags: { name: "App-Name", values: ["permamark"] }'
      if (tag) {
        tagsQ = `tags: [
            { name: "App-Name", values: ["permamark"] },
            { name: "${tag}", values: ["true"] }
        ]`
      }
      const query = gql`
        query {
          transactions(
            first: ${page * 10}
            recipients: ["FaZaQ48i0WXQyGXw68xuwuc6acUQoXYr8iLe8W-w234"]
            ${tagsQ}
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
            let bm = null
            try {
              bm = JSON.parse(arweave.utils.bufferToString(datas[idx]))
            } catch (error) {
              return null
            }
            return {
              ...t,
              bm,
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
  }, [page, tag])

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
            let bm = null
            try {
              bm = JSON.parse(arweave.utils.bufferToString(datas[idx]))
            } catch (error) {
              return null
            }
            return {
              ...t,
              bm,
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

export async function fetchTxByTag(page = 1, tag = "") {
  let tagsQ = 'tags: { name: "App-Name", values: ["permamark"] }'
  if (tag) {
    tagsQ = `tags: [
            { name: "App-Name", values: ["permamark"] },
            { name: "${tag}", values: ["true"] }
        ]`
  }
  const query = gql`
        query {
          transactions(
            first: ${page * 10}
            recipients: ["FaZaQ48i0WXQyGXw68xuwuc6acUQoXYr8iLe8W-w234"]
            ${tagsQ}
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

  return import("arweave/web").then(async (Arweave: any) => {
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
        let bm = null
        try {
          bm = JSON.parse(arweave.utils.bufferToString(datas[idx]))
        } catch (error) {
          return null
        }
        return {
          ...t,
          bm,
        }
      })
      return mks.filter(t => t)
    } catch (error) {
      return []
    }
  })
}
