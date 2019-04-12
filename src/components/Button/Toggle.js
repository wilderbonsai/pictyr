import React, { Component } from 'react'
import Button from './index'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  
  &&&&&&&&:focus {
    box-shadow: 0 0 0 2px rgba(255,255,255,.5) inset!important;
    color:#fff!important;
  }
  
  &&&&&.purple:hover, &&&&&.teal:hover, &&&&&:hover {
    box-shadow: 0 0 0 5px #fff inset!important;
    color: #fff!important;
  }
`

class ToggleButton extends Component {


  handleClick = (e) => {
    const { onClick } = this.props
    e.preventDefault()

    if(onClick) {
      onClick(e);
    }
  }

  render() {
    const { active } = this.props
    return (<StyledButton {...this.props} toggle active={active} onClick={(e) => {this.handleClick(e)}}/>)
  }
}

export default ToggleButton