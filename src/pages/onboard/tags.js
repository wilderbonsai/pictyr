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
import TagInput from 'components/TagInput'
import getUserById from 'util/Users/fetchById'
import linkTagsToUser from 'util/Tags/linkTagsToUser'
const Auth = new AuthService()


class OnboardPage extends Component {
  state = {
    selectedTags: []
  }


  handleTagSelect = (tags) => {
    this.setState({selectedTags: tags})
  }

  handleSubmit = async () => {
    const { selectedTags } = this.state
    const userInfo = await getUserById(Auth.getUserId())
    const userGraphId = userInfo.id
    try {
      await linkTagsToUser(selectedTags, userGraphId)
    } catch(e) {
      console.log(e)
    }
    navigate('onboard/communication')
  }

  render() {
    const {size, location} = this.props
    const { selectedTags } = this.state
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
                <h1>Sweet, let's get you set up.</h1>
                  <TagInput allowCreate={true} handleChange={this.handleTagSelect} placeholder="Choose or Create Your Tags" />
                  <h4>Tags are how people find and get an impression of you. The more quality tags you have, the better your chances of being discovered.</h4>
                  <h6>e.g Musician, Programmer, Friendly, Fluent German, Artist, Violinist, Waiter, Service, Builder, Crafter, Restauraunt, Retail.</h6>
                  <Button onClick={this.handleSubmit} size="large" fluid color='teal' text="Continue"></Button>
              </Grid.Column>
              </Grid>

          </Container>
        </Layout>
    )
  }
}
export default sizeMe()(OnboardPage)
