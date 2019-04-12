import React from 'react'
import styled from 'styled-components'


const StyledOverlay = styled.div`
  position:absolute;
  top:0;
  width:100%;
  height:100%;
  background-color:${({selected, selectedColor}) => selected ? selectedColor : 'rgba(0,0,0,0)'};
  ${({selected, selectedBorderColor}) => selected ? `border: 15px solid ${selectedBorderColor}` : 'border: 0px solid'};
  pointer-events: ${({selected}) => selected ? 'auto' : 'none'};


  &:hover {
  transition: all 0.3s ease-in-out;
  }
  transition: all 0.3s ease-in-out;
  
  &&& {
    border-radius: 0 !important; 
  }
`


const Overlay = ({selected, color}) => {
  let selectedColor = 'rgba(157,199,149,0.6)'
  let selectedBorderColor = '#9dc795'

  if(color === 'purple') {
    selectedColor = 'rgba(143, 115, 160, 0.75)'
    selectedBorderColor = '#b895c7'
  }
  return (
    <StyledOverlay selected={selected} selectedColor={selectedColor} selectedBorderColor={selectedBorderColor}/>
  )
}

export default Overlay