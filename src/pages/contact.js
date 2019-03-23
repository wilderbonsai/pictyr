import React, { Component } from "react"
import selectedUsers from 'store/selectedUsers'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from 'components/Card'
import {
   Form, Input, TextArea
} from 'formsy-semantic-ui-react';
import { Grid, Image, Label} from 'semantic-ui-react';
import Container from 'components/Container'
import styled from 'styled-components'
import sizeMe from 'react-sizeme';
import CenteredFixedButton from 'components/Button/CenterFixed'
import isValid from 'util/Messages/isValid'
import { navigate } from "gatsby"
const InputWrapper = styled.div`
  margin-bottom:20px
`

const UserPreview = styled(Grid.Column)`
  text-align:center;
`

const NoMarginGrid = styled(Grid)`
  && {margin:0;}
`

const StyledInput = styled(Input)`
  &&&& input {border-radius: 0px; background-color:rgba(255,255,255,0.95);}
`

const StyledTextArea = styled(TextArea)`
  &&&&& textarea {background-color:rgba(255,255,255,0.95); border-radius: 0px; font-size:1em;font-familty:'Lato';}
`

const StyledCard = styled(Card)`
  &&&&&& {background-color:rgba(255,255,255,0.95); color:white !important;}
  &&&&& .header, &&&& .description {
    ;
  }
`


class ContactPage extends Component {
  state = {
    message: {}
  }

  handleChange = (e) => {
    console.log(e.target.name)
    let message = this.state.message;
    message[e.target.name] = e.target.value

    this.setState({message:message})
  }


  successfulSubmit = () => {
    console.log('test')
    navigate("/")
  }
  render() {
    const { size } = this.props

    const users = selectedUsers.users
    console.log(size, 'size')
    let columns = 2;
    if(size.width < 800)  columns = 1;
    const errorLabel = <Label color="red"/>
    return (
        <Layout>
          <SEO title="Page two"/>
          <Form  onValidSubmit={this.successfulSubmit}>
          <Container centered>
            <h1>Last Step. <br/>Contact and connect.</h1>
            <Grid centered columns={columns}>
              <Grid.Column>
                <InputWrapper>
                  <StyledInput
                      name="name"
                      onChange={this.handleChange}
                      size='medium'
                      icon='user'
                      fluid
                      placeholder='Name'
                      required
                      min="2"
                  />
                </InputWrapper>

                <InputWrapper>
                  <StyledInput name='email'
                               size='medium'
                               icon='envelope outline'
                               onChange={this.handleChange}
                               fluid
                               placeholder='Email'
                               validations="isEmail"
                               validationErrors={{ isEmail: 'Email not valid' }}
                               errorLabel={ errorLabel }
                  />
                </InputWrapper>

                <InputWrapper>
                  <StyledInput name='phone'
                               onChange={this.handleChange}
                               size='medium'
                               icon='phone'
                               fluid
                               placeholder='Phone (Optional)' />
                </InputWrapper>
                <Form>
                  <StyledTextArea
                      name='body'
                      onChange={this.handleChange}
                      placeholder='Tell them a little more about your project or idea.'
                      style={{ minHeight: 150 }}/>
                </Form>
                <StyledCard fluid>
                  <Card.Content>
                    <Card.Header>Contacting</Card.Header>
                    <Card.Description>
                      <NoMarginGrid column="1">
                        {users.map(user =>
                            (<UserPreview width={4}><Image src={user.profileImageUrl} size='mini' circular /><br/>{user.fullName}</UserPreview>
                            )
                        )}
                      </NoMarginGrid>
                    </Card.Description>
                  </Card.Content>
                </StyledCard>
              </Grid.Column>

            </Grid>

          </Container>
            <CenteredFixedButton type="submit" onClick={this.submitForm}
                                 disabled={!isValid(this.state.message)} text="Contact"/>
        </Form>
        </Layout>
    )
  }
}

export default sizeMe()(ContactPage)
