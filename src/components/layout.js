/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import PageTransition from 'gatsby-plugin-page-transitions';
import Header from "./header"
import 'semantic-ui-css/semantic.min.css'
import "./layout.css"
import styled from 'styled-components'

const Footer = styled.div`
  width:100%;
`
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <PageTransition transitionTime={500}>
          <main>{children}</main>
        <Footer/>
      </PageTransition>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout