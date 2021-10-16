module.exports = {
  siteMetadata: {
    title: `m-ar-k`,
    description: `A bookmark chain run and save on arweave network.`,
    author: `@chezhe`,
    siteUrl: `https://m-ar-k.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "AR",
        fieldName: "arapi",
        url: "https://arweave.net/graphql",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `m-ar-k`,
        short_name: `m-ar-k`,
        start_url: `/`,
        background_color: `#663399`,
        display: "standalone",
        icon: `src/images/logo.png`,
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: "gatsby-plugin-styletron",
      options: {
        // You can pass options to Styletron.
        // Prefix all generated classNames:
        prefix: "_",
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
}
