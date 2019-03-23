import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from '@rebass/grid'

const StyledBox = styled(Box)`
  ${({ width }) => width != 1 ? "float:left" : null};
  background: ${({ bgColor }) => bgColor};
  background-color: ${({ bgColor }) => bgColor ? bgColor : "inherit"};
  color: ${({ color }) => color ? color : "inherit"};
   
  a {
    color: ${({ color }) => color ? color : "inherit"};
  }
`

const Section = (props) => {
  let width = props.width
  if (!props.width) width = 1

  return (
    <StyledBox className={props.className} width={width} bgColor={props.bgColor} color={props.color} {...props}>
      {props.children}
    </StyledBox>
  )
}

Section.propTypes = {
  children: PropTypes.object,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
}

export default Section