import React, { Component } from "react"
import { navigate } from "gatsby"
import { view } from 'react-easy-state'
import Layout from "components/layout"
import SEO from "components/seo"
import StackGrid from "react-stack-grid";
import SelectableImage from 'components/Image/Selectable'
import selectedImages from 'store/selectedImages'
import sizeMe from 'react-sizeme';
import ToggleButton from 'components/Button/Toggle'
import Container from 'components/Container'
import { Select, Grid, Button as SuiButton } from 'semantic-ui-react'
import styled from 'styled-components'
import Button from 'components/Button'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'
import { teal } from 'const/colors'
import CenteredFixedButton from 'components/Button/CenterFixed'
import AuthService from 'util/Auth/AuthService'
import axios from 'axios'
import TagInput from 'components/TagInput'
const Auth = new AuthService()
const Section = styled.div`
  margin-bottom: 30px;
`
const StyledButton = styled(Button)`
  &&&&&&:hover {
     box-shadow: 0 0 0 5px #fff inset!important;
    color: #fff!important;
  
  }
    margin-bottom:20px;
`

export const PHOTOGRAPHER = 'photographer';
export const MODEL = 'model'
export const OTHER = 'other'
class OnboardPage extends Component {
  state = {
    photographer: false,
    model: false,
    other: false,
    genders: [],
    publicProfile: null,
    termsConsent: false,
    city: null
  }


  handleGenderClick = (gender) => {
    const { genders } = this.state
    var index = genders.indexOf(gender);
    if (index > -1) {
      genders.splice(index, 1);
    } else {
      genders.push(gender)
    }
    this.setState({genders})
  }

  togglePhotographer = () => {
    this.setState({photographer:!this.state.photographer})
  }

  toggleModel = () => {
    this.setState({model:!this.state.model})
  }

  toggleOther = () => {
    this.setState({other:!this.state.other})
  }

  handlePublicProfileClick = (allow) => {
    this.setState({publicProfile:allow})
  }

  handleTermsClick = () => {
    this.setState({termsConsent:!this.state.termsConsent})
  }

  handleBerlinBasedClick = (berlinBased) => {
    if(berlinBased) {
      this.setState({city:'Berlin'})
    } else {
      this.setState({city:'Other'})
    }
  }

  validated = () => {
    const { photographer, model, other, genders, publicProfile, termsConsent, city} = this.state
    if(!photographer && !model && !other) {
      return false;
    }

    if(genders.length === 0) {
      return false;
    }

    if(publicProfile === null) {
      return false
    }

    if(!termsConsent) {
      return false
    }

    if(!city) {
      return false
    }

    return true;
  }

  handleSubmit = async () => {
    //Todo Update User in Auth0 with app_metadata
    const user = await axios.patch(`https://pictyr-development.eu.auth0.com/api/v2/users/${Auth.getUserId()}`,
        {
          "user_metadata": this.state,
        },
        { headers: { "Authorization":`Bearer ${Auth.getAccessToken()}`}}
    )


    navigate(Auth.getRedirectPath())
  }

  render() {
    const {data, size, location} = this.props
    const {photographer, model, other, genders, publicProfile, termsConsent, city} = this.state
    const width = size.width
    let colWidth = '25%';
    if (width < 1300)  colWidth = '33%';
    if (width < 900)  colWidth = '50%';
    if (width < 550)  colWidth = '100%';
    return (
        <Layout location={location}>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Container>
            <Grid stackable centered columns={2}>
              <Grid.Column>
                <h1>Almost there.</h1>
                <h2>Just a few questions, and you're on your way.</h2>
                <Section>

                  <h2>Which of the following applies to you?</h2>
                  <TagInput />
                  <ToggleButton
                      fluid
                      inverted
                      onClick={this.togglePhotographer}
                      active={photographer}
                      size='massive'
                      color='teal'
                      basic >I have a restauraunt.</ToggleButton>
                  <ToggleButton
                      fluid
                      inverted
                      onClick={this.toggleModel}
                      active={model}
                      color='purple'
                      size='massive'
                      basic >I host popups in different locations.</ToggleButton>
                  <ToggleButton
                      fluid
                      inverted
                      onClick={this.toggleOther}
                      active={other}
                      size='massive'
                      color="grey"
                      basic >I host workshops and/or food events.</ToggleButton>
                  <ToggleButton
                      fluid
                      inverted
                      onClick={this.toggleOther}
                      active={other}
                      size='massive'
                      color="grey"
                      basic >I do something different.</ToggleButton>
                </Section>
                <Section>
                  <h2>I am based in Berlin</h2>
                  <SuiButton.Group fluid basic size='massive'>
                    <StyledButton
                        inverted
                        onClick={()=>this.handleBerlinBasedClick(true)}
                        active={city === 'Berlin'}
                        color='teal'
                        basic >Yes</StyledButton>
                    <StyledButton
                        inverted
                        active={city && city !== 'Berlin'}
                        onClick={()=>this.handleBerlinBasedClick(false)}
                        color='teal'
                        basic >No</StyledButton>
                  </SuiButton.Group>
                </Section>
                <Section>
                  <h2>I would like my content advertised on Pictyr.</h2>
                  <SuiButton.Group fluid basic size='massive'>
                    <StyledButton
                        inverted
                        onClick={()=>this.handlePublicProfileClick(true)}
                        active={publicProfile}
                        color='teal'
                        basic >Yes</StyledButton>
                    <StyledButton
                        inverted
                        active={publicProfile === false}
                        onClick={()=>this.handlePublicProfileClick(false)}
                        color='teal'
                        basic >No</StyledButton>
                  </SuiButton.Group>
                </Section>
                <Section>
                  <h2>I have read and I agree to the terms of agreements of Pictyr</h2>
                  <SuiButton.Group fluid basic size='massive'>
                    <StyledButton
                        fluid
                        onClick={this.handleTermsClick}
                        active={termsConsent}
                        inverted
                        color='purple'
                        basic >Yes</StyledButton>
                  </SuiButton.Group>
                </Section>
              </Grid.Column>
            </Grid>
            <CenteredFixedButton color='teal' onClick={this.handleSubmit} disabled={!this.validated()} text="Continue"></CenteredFixedButton>
          </Container>
        </Layout>
    )
  }
}
export default sizeMe()(OnboardPage)
