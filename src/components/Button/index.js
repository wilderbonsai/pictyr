import React from 'react'
import styled from 'styled-components'
import { Button as SuiButton } from 'semantic-ui-react'
import { navigate } from "gatsby"
import {teal, purple} from 'const/colors'
const StyledButton = styled(SuiButton)`
  &&&&&& { transition: all 0.3s ease-in-out;  border-radius: 0px;}

  &&&&&.inverted:hover {
    box-shadow: 0 0 0 5px #fff inset!important;
    color: #fff !important;
  }
  
  
  &&&&&&&&.teal.active {
    box-shadow: 0 0 0 5px ${teal} inset!important;
    color: ${teal}!important;
  }
  
  &&&&&&&&.purple.active {
    box-shadow: 0 0 0 5px ${purple} inset!important;
    color: ${purple}!important;
  }
  
  &&&&&&&&.grey.active {
    box-shadow: 0 0 0 5px #ddd inset!important;
    color: #FFF!important;
  }
`

const Button = (props) => {

  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e)
    }

    if(props.to) {
      navigate(props.to)
    }
  }

  return (
    <StyledButton {...props} onClick={(e) => {handleClick(e)}} color={props.color ? props.color : 'basic'} content={props.text} />
  )
}

export default Button