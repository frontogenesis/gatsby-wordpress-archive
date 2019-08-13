const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const storiesTemplate = path.resolve('./src/templates/stories.js')
  const storiesList = path.resolve('./src/templates/stories-list.js')

  // Run a query that returns ID and slug
  // They are needed to dynamically create a page for each blog post
  const res = await graphql(`
    query {
      allWordpressPost ( 
        limit: 5000
      ) {
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
  const stories = res.data.allWordpressPost.edges
  stories.forEach((edge) => {
    createPage({
      component: storiesTemplate,
      path: `/stories/${edge.node.slug}`,
      context: {
        id: edge.node.id
      }
    })
  })

  // Dynamically create a page for a collection of posts to support pagination
  const storiesPerPage = 10
  const numPages = Math.ceil(stories.length / storiesPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      component: storiesList,
      path: i === 0 ? `/stories` : `/stories/${i + 1}`,
      context: {
        limit: storiesPerPage,
        skip: i * storiesPerPage,
        numPages,
        currentPage: i + 1,
      }
    })
  })
}