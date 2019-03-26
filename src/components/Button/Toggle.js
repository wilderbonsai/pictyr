import React, { Component } from 'react'
import Button from './index'
import styled from 'styled-components'

const StyledButton = styled(Button)`
 &&&&.teal:hover,  {
    box-shadow: 0 0 0 5px #fff inset!important;
    color: #fff!important;
  }
  
  &&&&&&&:focus {
  box-shadow: 0 0 0 2px rgba(255,255,255,.5) inset!important;
  color:#fff!important;
  }
  &&&&&.purple:hover {
    box-shadow: 0 0 0 5px #fff inset!important;
    color: #fff!important;
  }
`

class ToggleButton extends Component {

  state = {
    active : false
  }

  handleClick = (e) => {
    const { onClick } = this.props
    e.preventDefault()
    this.setState({ active: !this.state.active })

    if(onClick) {
      onClick(e);
    }
  }

  render() {
    const { active } = this.state
    return (<StyledButton {...this.props} toggle active={active} onClick={(e) => {this.handleClick(e)}}/>)
  }
}

export default ToggleButton