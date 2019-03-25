import React, { Component } from "react"
import { Link } from "gatsby"
import { view } from 'react-easy-state'
import Layout from "components/layout"
import SEO from "components/seo"
import sizeMe from 'react-sizeme';
import Container from 'components/Container'
import 'react-selectize/dist/index.min.css'
import 'react-selectize/themes/index.css'
import { teal } from 'const/colors'
import { Dropdown, Form, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

import Button from 'components/Button'
const typeOptions = [
  { key: 'event', text: 'Event', value: 'event' },
  { key: 'wedding', text: 'Wedding', value: 'wedding' },
  { key: 'portrait', text: 'Portait', value: 'portrait' },
  { key: 'art', text: 'Art', value: 'art' },
  { key: 'product', text: 'Product', value: 'product' },
  { key: 'food', text: 'Food', value: 'food' },
]

const budgetOptions = [
  { key: 'low', text: '€ : Less than €75 per hour or image ', value: 'low' },
  { key: 'medium', text: '€€ : €75 - 200€ per hour or image: ', value: 'medium' },
  { key: 'high', text: '€€€ : €200 - 500 per hour or image', value: 'high' },
  { key: 'premium', text: '€€€€ : €500 + per hour or image ', value: 'premium' },
]


const StyledFrom = styled(Form)`

`

const StyledDropdown = styled(Dropdown)`
 &&&& {border-radius:0px;}
`

class FilterPage extends Component {
  state = {
    types: [],
    budgets: []
  }

  handleTypeChange  = (e, { value }) => this.setState({ types: value })
  handleBudgetChange = (e, { value }) => this.setState({ budgets: value })
  render() {
    const { size } = this.props;
    const { types, budgets} = this.state;
    console.log(types.length, budgets.length, 'state')
    const width = size.width
    let colWidth = '25%';
    if (width < 1300)  colWidth = '33%';
    if (width < 900)  colWidth = '50%';
    if (width < 550)  colWidth = '100%';
    return (
        <Layout>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
          <Container>
            <Grid stackable centered columns={2}>
              <Grid.Column>
                <h2>What types of photographers are you looking for?</h2>
                <StyledFrom size="large">
                  <h6>You can pick more than one.</h6>
                  <StyledDropdown  onChange={this.handleTypeChange} closeOnChange placeholder='Pick one or more types' fluid multiple selection options={typeOptions} />

                  <br/><br/>
                  <h2>In which price ranges?</h2>
                  <h6>You can pick more than one here too.</h6>
                  <StyledDropdown  onChange={this.handleBudgetChange} closeOnChange placeholder='Pick one or more price ranges' fluid multiple selection options={budgetOptions} />
                  <h6>These prices are generalizations to help you find a better match, and may vary depending on your specific needs.</h6>
                </StyledFrom>
                <Button size="large" fluid to="/pick/images" disabled={types.length == 0 || budgets.length == 0} text="Discover"></Button>
              </Grid.Column>
            </Grid>
          </Container>

        </Layout>
    )
  }
}

export default sizeMe()(FilterPage)
