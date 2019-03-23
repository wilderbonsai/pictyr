import styled from 'styled-components'
import { Card } from 'semantic-ui-react'
const StyledCard = styled(Card)`
border-radius: 0;

  &&& {
    border-radius: 0;
    border: ${({selected}) => selected ? '5px solid yellow' : 'none'};
    box-shadow: none;
    transition: all 0.3s ease-in-out;
  }

   &&&&:hover {
    -webkit-box-shadow: 2px 2px 30px -4px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 2px 30px -4px rgba(0,0,0,0.75);
    box-shadow: 2px 2px 30px -4px rgba(0,0,0,0.75);
    transform:none;
    transition: all 0.3s ease-in-out;
  
   }
 
  && .button {
    margin: 0px;
    width: auto;
  }
`
export default StyledCard