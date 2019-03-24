import React from 'react'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import styled from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group' // ES6


const Transition = styled(CSSTransitionGroup)`

& .example-appear {
  opacity: 0.01;
}

& .example-appear.example-appear-active {
  opacity: 1;
  transition: opacity .5s ease-in;
}
`

const StyledMasonry = ({children}) => {
  return (
      <Transition
          transitionName="example"
          transitionAppearTimeout={500}
          transitionAppear={true}>

        <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        >
          <Masonry
              gutter="4px">
            {children}
            </Masonry>
          </ResponsiveMasonry>
        </Transition>

  )
}

export default StyledMasonry;