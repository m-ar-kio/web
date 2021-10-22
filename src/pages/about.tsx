import React from "react"
import Layout from "../components/Layout"

function About() {
  const pstyle = { fontSize: 24 }
  return (
    <Layout title="About">
      <div style={{ padding: "0 200px" }}>
        <h1>About m-ar-k</h1>
        <p style={pstyle}>Mark is a bookmark tool running on arweave.</p>
        <p style={pstyle}>
          Every time you create a mark content, you spend fee and 0.01 AR for
          PST fee which will be distributed to $MARK holders, but you'll get one
          claimable $MARK(not claimable for now).
        </p>
        <p style={pstyle}>
          You can see marks flow and your own marks on the official website. If
          you found any mark helps you, you can also "buy a cup of coffee" for
          the marker.
        </p>
        <p style={pstyle}>Happy to mark!</p>
      </div>
    </Layout>
  )
}

export default About
