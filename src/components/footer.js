import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import '../styles/footer.css'

const Footer = () => {
  const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
  `)
  
  return (
    <footer className="footer">
    <p>Created by {data.site.siteMetadata.author}, &copy; 2019</p>
    </footer>
  )
}

export default Footer