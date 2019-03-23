import styled from 'styled-components'
import { teal } from 'const/colors'

const Text = styled.span`
  color: ${({color}) => color || 'inherit'}
  text-decoration: ${({underline}) => underline ? 'underline' : 'none'};
  cursor: ${({pointer}) => pointer? 'pointer' : 'default'}
`

export default Text