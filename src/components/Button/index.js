import React from 'react'
import styled from 'styled-components'
import { Button as SuiButton } from 'semantic-ui-react'
const StyledButton = styled(SuiButton)`
  &&&&&& { transition: all 0.3s ease-in-out;  border-radius: 0px;}
  
`

const Button = (props) => (
  <StyledButton {...props} color={props.color ? props.color : 'teal'} content={props.text} />
)

export default Button