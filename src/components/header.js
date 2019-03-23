import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Container from 'components/Container'
const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#`,
      padding:'20px 0px',
    }}
  >
    <Container>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}.
        </Link>
      </h1>
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
