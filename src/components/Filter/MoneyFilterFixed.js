import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import { teal } from 'const/colors'
import  { Popup } from 'semantic-ui-react'
const Wrapper = styled.div`
  position: fixed;
  border: 1px solid white;
  top:5px;
  right:5px;
  z-index:100000;
`

const FilterWrapper = styled.div`
  width:50px;
  height:50px;
  text-align: center
  float: left;
  border-right:1px solid white;
  background-color: ${({active})=> active ? teal : 'black'};
  position: relative;
  display: table;
  font-weight: bold;
  cursor: pointer; 
   transition: all 0.3s ease-in-out;
  
  & span {
  display: table-cell;
  vertical-align: middle;
}
`

class Filter extends Component {
  state = {
    active: false
  }

  handleClick = () => {
    console.log('click')
    const { active } = this.state;
    this.setState({active:!active})
  }

  render () {
    const { text } = this.props;
    const { active } = this.state;
    return (
        <FilterWrapper active={active} onClick={this.handleClick}><span>{text}</span></FilterWrapper>
    )
  }
}
const MoneyFilterFixed = () => {
  const contextRef = createRef()
  return (
      <Wrapper ref={contextRef}>
        <Filter text="€" />
        <Filter text="€€" />
        <Filter text="€€€" />
        <Filter text="€€€€" />
      </Wrapper>
  )

}

export default MoneyFilterFixed