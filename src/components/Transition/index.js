import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import styled from 'styled-components'

const StyledTransition = styled(CSSTransitionGroup)`

& .example-appear {
  opacity: 0.01;
}

& .example-appear.example-appear-active {
  opacity: 1;
  transition: opacity .5s ease-in;
}
`

const Transition = ({children}) => {
  return (
      <StyledTransition
          transitionName="example"
          transitionAppearTimeout={500}
          transitionAppear={true}>
        {children}
        </StyledTransition>

      )
}

export default Transition;