const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const storiesTemplate = path.resolve('./src/templates/stories.js')

  // Run a query that returns ID and slug
  // They are needed to dynamically create a page for each blog post
  const res = await graphql(`
    query {
      allWordpressPost{
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  // Dynamically create a page for each post in the blog
  res.data.allWordpressPost.edges.forEach((edge) => {
    createPage({
      component: storiesTemplate,
      path: `/stories/${edge.node.slug}`,
      context: {
        id: edge.node.id
      }
    })
  })
}