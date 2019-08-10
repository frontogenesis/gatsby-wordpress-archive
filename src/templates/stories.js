import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'

import Layout from '../components/layout'
import Head from '../components/head'

export const query = graphql`
  query(
    $id: String!
  ) {
    wordpressPost (
      id: {
        eq: $id
      }
    ) {
      # content
      excerpt
      link
      title
      date
      author {
        name
      }
    }
  }
`

const Stories = (props) => {

  return (
    <Layout>
      <Head title={props.data.wordpressPost.title} />
      <h1><a href={props.data.wordpressPost.link}>{props.data.wordpressPost.title}</a></h1>
      <p>{props.data.wordpressPost.author.name}</p>
      <p dangerouslySetInnerHTML={{__html: props.data.wordpressPost.excerpt}}></p>
      <p>{moment(props.data.wordpressPost.date).utc().local().format('dddd, MMMM D, YYYY h:mm A')}</p>
      {/*<div dangerouslySetInnerHTML={{ __html: props.data.wordpressPost.content}}></div>*/}
    </Layout>
  )
}

export default Stories