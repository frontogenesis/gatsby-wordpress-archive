import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'

import Layout from '../components/layout'
import Head from '../components/head'

import '../styles/stories.css'

export const query = graphql`
  query(
    $id: String!
  ) {
    wordpressPost (
      id: {
        eq: $id
      }
    ) {
      content
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
      <h1 className="story"><a href={props.data.wordpressPost.link}>{props.data.wordpressPost.title}</a></h1>
      <p className="excerpt" dangerouslySetInnerHTML={{__html: props.data.wordpressPost.excerpt}}></p>
      {<div className="author">{props.data.wordpressPost.author ? props.data.wordpressPost.author.name : 'FPREN Staff Meteorologists'}</div>}
      <div className="published">{moment(props.data.wordpressPost.date).utc().local().format('dddd, MMMM D, YYYY h:mm A')}</div>
      <br /><hr />
      <div dangerouslySetInnerHTML={{ __html: props.data.wordpressPost.content}}></div>
    </Layout>
  )
}

export default Stories