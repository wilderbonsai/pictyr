import React from 'react'
import styled from 'styled-components'
import { Button as SuiButton } from 'semantic-ui-react'
import { navigate } from "gatsby"
const StyledButton = styled(SuiButton)`
  &&&&&& { transition: all 0.3s ease-in-out;  border-radius: 0px;}
  
`

const Button = (props) => {

  const handleClick = (e) => {
    console.log(props.onClick)
    if (props.onClick) {
      props.onClick(e)
    }

    if(props.to) {
      navigate(props.to)
    }
  }

  return (
    <StyledButton {...props} onClick={(e) => {handleClick(e)}} color={props.color ? props.color : 'teal'} content={props.text} />
  )
}

export default Button