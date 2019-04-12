import React, { Component } from "react"
import { navigate } from "gatsby"
import Layout from "components/layout"
import SEO from "components/seo"
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import Button from 'components/Button'
import { Grid } from 'semantic-ui-react'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'
import { teal } from 'const/colors'
import AuthService from 'util/Auth/AuthService'
import axios from 'axios'
import getUserById from 'util/Users/fetchById'
import ToggleButton from 'components/Button/Toggle'
import saveCommPreferences from 'util/CommPreferences/save'
import {
    MARKETING,
    GENERAL,
    PAID,
    COLLABORATION
} from 'const/commPrefKeys'
const Auth = new AuthService()


class OnboardPage extends Component {
  state = {
      email: null,
      paid: false,
      general: false,
      collaboration: false,
      marketing: false
    }



  componentDidMount = async () => {
    const user = await getUserById(Auth.getUserId())
    this.setState({email:user.email})
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

  handleSubmit = async () => {
    const { marketing, general, paid, collaboration } = this.state
    console.log('submit')
    console.log(this.state)
    await saveCommPreferences(Auth.getUserId(), marketing, paid, collaboration, general)
    navigate('/')
  }

  render() {
    const {location} = this.props
    const { email, paid, collaboration, general, marketing } = this.state

    return (
        <Layout location={location}>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Container>
            <Grid stackable centered columns={2}>
              <Grid.Column>
                <h1>Almost there.</h1>
                <h2>Let us know your preferences.</h2>
                <h3>Which apply to you?</h3>
                <ToggleButton
                    fluid
                    inverted
                    onClick={()=>{this.setState({paid:!paid})}}
                    active={paid}
                    size='massive'
                    color='teal'
                    basic >I am open for paid opportunities.</ToggleButton>
                <ToggleButton
                    fluid
                    inverted
                    onClick={()=>{this.setState({collaboration:!collaboration})}}
                    active={collaboration}
                    color='teal'
                    size='massive'
                    basic >I am open for potential collaborations.</ToggleButton>
                <ToggleButton
                    fluid
                    inverted
                    onClick={()=>{this.setState({general:!general})}}
                    active={general}
                    size='massive'
                    color="teal"
                    basic >I am open for general inquiries.</ToggleButton>
                <ToggleButton
                    fluid
                    inverted
                    onClick={()=>{this.setState({marketing:!marketing})}}
                    active={marketing}
                    size='massive'
                    color="teal"
                    basic >I want to be in the loop about the latest from Scoutyr.</ToggleButton>

                <h6>We will send you email notifications, connecting you with people that want to contact you.</h6>
                <Button onClick={this.handleSubmit} size="large" fluid color='teal' text="Continue"></Button>

              </Grid.Column>
            </Grid>

          </Container>
        </Layout>
    )
  }
}
export default sizeMe()(OnboardPage)
