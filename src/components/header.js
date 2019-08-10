import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import '../styles/header.css'

const Header = () => {

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
    <header className="header">
      <h1>
        <Link className="title" to="/">{data.site.siteMetadata.title}</Link>
      </h1>
      <nav>
        <ul className="nav-list">
          <li><Link className="nav-item" activeClassName="active-nav-item" to='/'>Home</Link></li>
          <li><Link className="nav-item" activeClassName="active-nav-item" to='/stories'>Stories</Link></li>
          <li><Link className="nav-item" activeClassName="active-nav-item"  to='/about'>About</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header