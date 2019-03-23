import styled from 'styled-components'

const Overlay = styled.div`
  position:absolute;
  top:0;
  width:100%;
  height:100%;
  background-color:${({selected}) => selected ? 'rgba(157,199,149,0.6)' : 'rgba(0,0,0,0)'};
  pointer-events: ${({selected}) => selected ? 'auto' : 'none'};
  ${({selected}) => selected ? 'border: 15px solid #9dc795' : 'border: 0px solid'}

  &:hover {
  transition: all 0.3s ease-in-out;
  }
  transition: all 0.3s ease-in-out;
  
  &&& {
    border-radius: 0 !important; 
  }
`

export default Overlay