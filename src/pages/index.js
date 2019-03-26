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

const Landing = styled.div`
  color: white;
  margin-top:${({mobile}) => mobile ? '40px' : '40px'}
  
  font-size:${({mobile}) => mobile ? '40px' : '60px'}
    line-height:${({mobile}) => mobile ? '50px' : '80px'}
    
`

const StyledButton = styled(Button) `

  &&&&&& {
    text-align: left;
    font-size:${({mobile}) => mobile ? '40px' : '60px'}
    padding-left: 15px;
    padding-right:5px;
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
  margin-bottom:50px;
`

class IndexPage extends Component {
  state = {
    selected: 'photographer',
    color: 'teal'
  }

  handleClick(type) {
    let color = ''
    if(type === PHOTOGRAPHER) {
      selectPhotographer()
      console.log('select Photographer')
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
        <Layout>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Landing mobile={mobile}>
            <Container>
              <Grid stackable centered columns={2}>
                <Grid.Column>
                  <ContentMargin>
                    Discover your
                    <StyledButton
                        onClick={()=>this.handleClick(PHOTOGRAPHER)}
                        active={(selected === PHOTOGRAPHER)}
                        mobile={mobile}
                        basic
                        size="massive"
                        inverted
                        fluid
                        color='teal'>
                      Photographer
                    </StyledButton>
                    <StyledButton
                        onClick={()=>this.handleClick(MODEL)}
                        active={(selected === MODEL)}
                        mobile={mobile}
                        basic
                        size="massive"
                        inverted
                        fluid
                        color='purple'>
                      Model
                    </StyledButton>
                    in <Color color={color}>Berlin.</Color>
                  </ContentMargin>
                  <Link to="/pick/filters"><Button size="large" color={color} fluid text="Let's Go"/></Link></Grid.Column>
              </Grid>
            </Container>
          </Landing>
        </Layout>
    )
  }
}



export default sizeMe()(view(IndexPage))
