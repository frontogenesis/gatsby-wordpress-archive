module.exports = {
  siteMetadata: {
    title: 'Florida Storms WordPress Archive',
    author: 'Ray Hawthorne',
    copyright: 2019
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'floridastorms.org',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: false,
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
