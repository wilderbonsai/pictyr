import React, { Component } from "react"
import { Link } from "gatsby"
import { view } from 'react-easy-state'
import Layout from "../components/layout"
import SEO from "../components/seo"
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import {Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import Button from 'components/Button'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'
import { teal, purple } from 'const/colors'
import selectedFilters, { selectPhotographer, selectModel, MODEL, PHOTOGRAPHER} from 'store/selectedFilters'
import AuthService from 'util/Auth/AuthService'
import userIsOnboarded from 'util/Users/isOnboarded'
import { navigate } from 'gatsby'
const Auth = new AuthService()
const Landing = styled.div`
  color: white;
  margin-top:${({mobile}) => mobile ? '40px' : '0px'}
  
  font-size:${({mobile}) => mobile ? '40px' : '60px'}
    line-height:${({mobile}) => mobile ? '50px' : '70px'}
    
`

const StyledButton = styled(Button) `

  &&&&&& {
    text-align: left;
    font-size:${({mobile}) => mobile ? '40px' : '60px'}
    padding: 20px 5px 20px 15px;
     box-shadow: 0 0 0 5px rgba(255,255,255,.1) inset !important;
     color: rgba(255,255,255,.1) !important;
  }
`
const Color = styled.span`
  color: ${({ color }) => { 
    if(color == 'teal') {
      return teal;
    } 
    
    if(color == 'purple') {
      return purple
    }
  }};
  transition: all 0.3s ease-in-out;
`

const ContentMargin = styled.div`
  margin-bottom:20px;
`

class IndexPage extends Component {
  state = {
    selected: 'photographer',
    color: 'teal'
  }

  async componentDidMount() {
    if(Auth.isAuthenticated()) {
      Auth.renewSession()
      if(! await userIsOnboarded()) {
        navigate('onboard/tags')
      }
    }
  }

  handleClick(type) {
    let color = ''
    if(type === PHOTOGRAPHER) {
      selectPhotographer()
    } else if(type === MODEL) {
      selectModel()
    }


    this.setState({selected:type, color:selectedFilters.filters.color})
  }
  render() {
    const { size } = this.props
    const { color, selected } = this.state
    const width = size.width
    let colWidth = '25%';
    if (width < 1300)  colWidth = '33%';
    if (width < 900)  colWidth = '50%';
    if (width < 550)  colWidth = '100%';
    const mobile = (width < 550)
    return (
        <Layout {...this.props}>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Landing mobile={mobile}>
            <Container>
              <Grid stackable centered columns={2}>
                <Grid.Column>
                  <ContentMargin>
                    A modern directory to <Color color={color}>find</Color> and <Color color={color}>connect</Color> you with people you need
                    in <Color color={color}>Berlin.</Color>
                  </ContentMargin>
                  <Link to="/directory"><Button size="large" color={color} fluid text="Let's Go"/></Link></Grid.Column>
              </Grid>
            </Container>
          </Landing>
        </Layout>
    )
  }
}



export default sizeMe()(view(IndexPage))
