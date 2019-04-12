import React, { Component } from 'react'
import { Dropdown, Form, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import getAllTags from 'util/Tags/getAll'
import { EXISTING_ID_IDENTIFIER }  from  'util/Tags/const'
const StyledDropdown = styled(Dropdown)`
  &&&&  { border-radius: 0px; }
`


class DropdownExampleAllowAdditions extends Component {
  state = { options: [{key:' ', value: ' ', text: ''}] }


  componentDidMount = async () => {
    const tagOptions = await this.getTagOptions()
    this.setState({options: tagOptions})
  }


  //TODO create option from tags in another util file or somewhere
  getTagOptions = async () => {
    const { allowCreate } = this.props
    const tags = await getAllTags();
    const options = [];
    tags.forEach((tag) => {
      const key = tag.key
      let value = tag.id
      if(allowCreate) value += EXISTING_ID_IDENTIFIER
      options.push({key:key, text:key, value:value })
    })
    return options
  }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleChange = (e, { value }) => {
    const { handleChange } = this.props
    this.setState({ currentValues: value })
    if(handleChange) handleChange(value)
  }

  handleClose = (e) => {
    const { handleClose } = this.props
    if(handleClose) handleClose()
  }


  render() {
    const { currentValues } = this.state
    const { allowCreate, sideButton, placeholder, existingTags } = this.props
    return (
        <Form fluid simple size="large">
          <Button  as='div' labelPosition='left' fluid>
          <StyledDropdown
              options={this.state.options}
              placeholder={placeholder}
              defaultValue={existingTags}
              search
              selection
              fluid
              multiple
              size="massive"
              allowAdditions={true}
              value={currentValues}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
              onClose={this.handleClose}

         />
            {sideButton && <Button color="teal">Search</Button> }
          </Button>

        </Form>
    )
  }
}

export default DropdownExampleAllowAdditions