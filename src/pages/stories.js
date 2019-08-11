import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import moment from 'moment'

import Layout from '../components/layout'
import '../styles/blog.css'
import Head from '../components/head'

const StoryPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allWordpressPost( filter: { 
        status: { 
          eq: "publish" 
        }
      }) {
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
  `)

  return (
    <Layout>
      <Head title='Blog' />
      <h1>Story Archive</h1>
      <ol className='posts'>
        {data.allWordpressPost.edges.map(edge => {
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
    </Layout>
  )
}

export default StoryPage