import React, { Component } from "react"
import Layout from "components/layout"
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import { Grid } from 'semantic-ui-react'

import { teal, purple } from 'const/colors'

import Menu from 'components/Menu'

class IndexPage extends Component {
  state = {
    selected: 'photographer',
    color: 'teal'
  }


  render() {
    return (
        <Layout {...this.props}>
            <Container>
              <Grid stackable centered columns={2}>
                <Grid.Column>
                  <h2>Your Profile</h2>
                  <Menu />
                </Grid.Column>
              </Grid>

            </Container>
        </Layout>
    )
  }
}



export default IndexPage
