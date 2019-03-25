import React, { Component } from "react"
import selectedUsers, {getIdList} from 'store/selectedUsers'
import Layout from "components/layout"
import SEO from "components/seo"
import Card from 'components/Card'
import {
    Form, Input, TextArea
} from 'formsy-semantic-ui-react';
import { Grid, Image, Label,  Dimmer, Loader, Checkbox} from 'semantic-ui-react';
import Container from 'components/Container'
import styled from 'styled-components'
import sizeMe from 'react-sizeme';
import CenteredFixedButton from 'components/Button/CenterFixed'
import isValid from 'util/Messages/isValid'
import { navigate } from "gatsby"
import Transition from 'components/Transition'
import sendMessage from 'util/Messages/send'
import {clearUsers} from 'store/selectedUsers'
import {clearImages} from 'store/selectedImages'

const StyledCheckbox = styled(Checkbox)`
  margin-bottom:20px;
  font-weight:bold;
  &&&& label { color:white; font-family:'Lato'; }
  &&& label:hover {
    color : white;
  }
  `
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

const TransitionContainer = styled(Container)`
  opacity:${({hide}) => hide ? '0': '1'};
  transition: all 0.7s ease-in-out;
`


class ContactPage extends Component {
  state = {
    message: {},
    loading: false,
    hide: false
  }

  handleChange = (e) => {
    console.log(e.target.name)
    let message = this.state.message;
    message[e.target.name] = e.target.value

    this.setState({message:message})
  }


  successfulSubmit = async () => {
    const { message } = this.state;
    console.log(message.body, 'message body')
    this.setState({loading:true, hide: true})
    await sendMessage(message.name, message.email, message.body, getIdList() )
    clearUsers();
    clearImages();
    navigate('/pick/success')
  }
  render() {
    const { size } = this.props
    const { loading, hide } = this.state
    const users = selectedUsers.users

    let columns = 2;
    if(size.width < 800)  columns = 1;
    const errorLabel = <Label color="red"/>
    return (
        <Layout>

          <SEO title="Page two"/>
          <Dimmer active={loading} page>
            <Loader size='big' />
          </Dimmer>
          <Form onValidSubmit={this.successfulSubmit}>
            <TransitionContainer centered hide={hide}>

              <h1>Last Step. <br/>Contact and connect.</h1>
              <Transition>
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
                    <StyledCheckbox label="I'm okay with similar photographers reaching out to me about their services." />
                    <StyledCheckbox label="I have read and agreed to the terms and conditions of this service."  />
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
              </Transition>

            </TransitionContainer>
            <CenteredFixedButton type="submit" onClick={this.submitForm}
                                 disabled={!isValid(this.state.message)} text="Contact"/>
          </Form>
        </Layout>
    )
  }
}

export default sizeMe()(ContactPage)
