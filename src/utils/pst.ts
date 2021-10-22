import Arweave from "arweave/web"
import { readContract } from "smartweave"
import { MARK_CONTRACT, MARK_OWNER } from "./constants"
import { request, gql } from "graphql-request"

export const getClaimableMark = async (address: string) => {
  const query = gql`
    query {
      transactions(
        first: 10000
        owners: ["${address}"]
        tags: { name: "App-Name", values: ["permamark"] }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `

  try {
    const result = await request("https://arweave.net/graphql", query)
    return result.transactions.edges.length
  } catch (error) {
    return 0
  }
}
