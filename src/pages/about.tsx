import React from "react"
import Layout from "../components/Layout"

function About() {
  const pstyle = { fontSize: 24 }
  return (
    <Layout title="About">
      <div style={{ padding: "0 200px" }}>
        <h1>About m-ar-k</h1>
        <p style={pstyle}>Mark is a bookmark manager that allows you to save and share any URL on Arweave. In our next version, Mark will automatically import your liked Tweets and suggest personalized content, based on your past likes.</p>
        <p style={pstyle}>
          Saving links from different platforms will increase our algorithms prediction quality. This way, eventually our content suggestions will be more accurate than those of any single centralized data silo.
        </p>
        <p style={pstyle}>
          Running on Arweave, Mark aims to reward all stakeholders - users curating content, algorithm engineers, and developers integrating the content suggestions into the Twitter UI. Every time you create a Mark, you will receive 1 $MARK and spend 0.01 AR as PST fee which will be distributed to $MARK holders. ($MARK is currently not claimable.) You can also tip Markers for great content suggestions.
        </p>
        <p style={pstyle}>Happy marking!</p>
      </div>
    </Layout>
  )
}

export default About
