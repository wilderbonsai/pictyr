import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledMenu = styled(Menu)`
  &&&&& .item {
    width: 50%
  }
`
export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'Tags' }

  handleItemClick = (e, { name }) => {
    const { onTabChange } = this.props
    this.setState({ activeItem: name })
    if(onTabChange) onTabChange(name)
  }

  render() {
    const { activeItem } = this.state

    return (
        <StyledMenu  fluid inverted pointing secondary>
          <Menu.Item
              name='Tags'
              active={activeItem === 'Tags'}
              onClick={this.handleItemClick}
              fitted="horizontally"
          />
          <Menu.Item
              name='Preferences'
              active={activeItem === 'Preferences'}
              onClick={this.handleItemClick}
          />
        </StyledMenu>
    )
  }
}