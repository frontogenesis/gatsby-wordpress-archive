import React from 'react'
import { Link, graphql } from 'gatsby'
import moment from 'moment'

import Layout from '../components/layout'
import '../styles/blog.css'
import Head from '../components/head'

const StoryPage = (props) => {
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <Head title='Blog' />
      <h1>Story Archive</h1>
      <ol className='posts'>
        {props.data.allWordpressPost.edges.map(edge => {
          return (
            <li className='post' key={edge.node.id}>
              <Link to={`/stories/${edge.node.slug}`}>
                <h2 dangerouslySetInnerHTML={{__html: edge.node.title}}></h2>
                <p className="excerpt" dangerouslySetInnerHTML={{__html: edge.node.excerpt}}></p>
                <div>{edge.node.author ? edge.node.author.name: 'FPREN Staff Meteorologists'}</div>
                <div>{moment(edge.node.date).utc().local().format('dddd, MMMM D, YYYY h:mm A')}</div>
              </Link>
            </li>
          )
        })}
      </ol>

      <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {!isFirst && (
            <Link className="nav-item" activeClassName="active-nav-item" to={`/stories/${prevPage}`} rel="prev">
              ← Newer Stories
            </Link>
          )}
          
          {!isLast && (
            <Link className="nav-item" activeClassName="active-nav-item" to={`/stories/${nextPage}`} rel="next">
              Older Stories →
            </Link>
          )}
        </ul>
    </Layout>
  )
}

export default StoryPage

export const storyListQuery = graphql`
  query storyListQuery($skip: Int!, $limit: Int!) {
    allWordpressPost( 
      filter: { status: { eq: "publish" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          author {
            name
          }
          date
          excerpt
          slug
          id
          status
        }
      }
    }
  }
`