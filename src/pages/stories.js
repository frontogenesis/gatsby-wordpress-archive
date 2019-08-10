import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import moment from 'moment'

import Layout from '../components/layout'
import '../styles/blog.css'
import Head from '../components/head'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allWordpressPost {
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
          }
        }
      }
    }
  `)

// const str = edge.node.date
// const date = moment(str);
// const dateComponent = date.utc().format('YYYY-MM-DD');
// const timeComponent = date.utc().format('HH:mm:ss');
// console.log(dateComponent);
// console.log(timeComponent);

  return (
    <Layout>
      <Head title='Blog' />
      <h1>Story Archive</h1>
      <ol className='posts'>
        {data.allWordpressPost.edges.map(edge => {
          return (
            <li className='post' key={edge.node.id}>
              <Link to={`/stories/${edge.node.slug}`}>
                <h2>{edge.node.title}</h2>
                <p>{edge.node.author.name}</p>
                <p>{moment(edge.node.date).utc().local().format('dddd, MMMM D, YYYY h:mm A')}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage