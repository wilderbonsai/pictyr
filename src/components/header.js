import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Container from 'components/Container'
import Button from 'components/Button'
import { Icon } from 'semantic-ui-react'
import AuthService from 'util/Auth/AuthService'
import styled from 'styled-components'
import ProfileDropdown from 'components/Dropdown/Profile'
import authenticatedUser from 'store/authenticatedUser'
import { view } from 'react-easy-state'
const Auth = new AuthService()

const Wrapper = styled.div`
   padding:20px 0px;     
   display: flex;
   justify-content: space-between;
   position: relative;
  
`;

const Logo = styled.div`
  font-size:40px;
  line-height:40px;
  font-weight: bold;
  display: flex;
  height:auto;
`

const InstagramConnect = styled(Button)`
  display:flex;
  cursor: pointer;
`

const Header = view(({ siteTitle, currentPath }) => (
  <header>
    <Container>
      <Wrapper>
          <Logo>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >

              {siteTitle}.
            </Link>
          </Logo>
        {!Auth.isAuthenticated() && (
            <InstagramConnect inverted basic color="facebook" onClick={()=> Auth.instagramLogin(currentPath)}>
              <Icon name='facebook' />Connect
            </InstagramConnect>
        )}

        {Auth.isAuthenticated() && (
            <ProfileDropdown src={authenticatedUser.user.profileImageUrl} />
        )}


      </Wrapper>
    </Container>
  </header>
))

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
