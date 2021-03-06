/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, navigate } from "gatsby"
import Header from "./header"
import 'semantic-ui-css/semantic.min.css'
import "./layout.css"
import styled from 'styled-components'
import { populateAuthenticatedUser } from 'store/authenticatedUser'
import AuthService from 'util/Auth/AuthService'

const Auth = new AuthService
const Footer = styled.div`
  width:100%;
  min-height:150px;
`
class Layout extends Component {

  componentDidMount = async () => {
    await populateAuthenticatedUser()
  }

  render() {
    const { children, location } = this.props
    return (
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
                <Header currentPath={location.pathname} siteTitle={data.site.siteMetadata.title} />
                <main>{children}</main>
                <Footer/>
                </>
            )}
        />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
