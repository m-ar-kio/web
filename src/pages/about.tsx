import React from "react"
import Layout from "../components/Layout"

function About() {
  return (
    <Layout title="About">
      <div style={{ padding: "0 200px" }}>
        <h1>About MARK</h1>
        <p>Mark is a bookmark tool running on arweave.</p>
        <p>
          Every time you create a mark content, you spend fee and 0.02 AR for
          PST fee which will be distributed to $MARK holders, but you'll get one
          claimable $MARK(not claimable for now).
        </p>
        <p>
          You can see marks flow and your own marks on the official website. If
          you found any mark helps you, you can also "buy a cup of coffee" for
          the marker.
        </p>
        <p>Happy to mark!</p>
      </div>
    </Layout>
  )
}

export default About
