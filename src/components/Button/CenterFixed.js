import React from 'react'
import styled from 'styled-components'
import  Button  from 'components/Button'

const Wrapper = styled.div`
  position: fixed;
  width:300px;
  bottom:10px;
  right: calc(50% - 150px);
  color:white;
  z-index:1000;
  text-align: center;
 
  && button {
    border-radius: 0px;
  }
  

`



const CenterFixed = (props) => (
  <Wrapper>
    <Button fluid icon='right arrow'  labelPosition='right' {...props} />
  </Wrapper>
)

export default CenterFixed