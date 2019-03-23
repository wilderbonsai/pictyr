import React from 'react'
import { Modal as SuiModal, TransitionablePortal } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledModal = styled(SuiModal)`
&&&& {border-radius:0px;background-color:black;}
  &&&& .close {
    background-color:black;
    color:white;
    z-index:100000;
    position:fixed;
  }
`




const Modal = (props) => {
  return(

      <StyledModal style={{zIndex:'1000'}} size={props.size} open={props.open} onClose={props.onClose}>
            {props.children}
      </StyledModal>
    )
}

export default Modal