import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import styled from 'styled-components'


const StyledMenu = styled(Menu)`

`
export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'Info' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
          <StyledMenu  fluid inverted pointing secondary>
            <Menu.Item name='Info' active={activeItem === 'Info'} onClick={this.handleItemClick} />
            <Menu.Item
                name='Tags'
                active={activeItem === 'Tags'}
                onClick={this.handleItemClick}
            />
            <Menu.Item
                name='Communication Preferences'
                active={activeItem === 'Communication Preferences'}
                onClick={this.handleItemClick}
            />
          </StyledMenu>
    )
  }
}