import React, { Component } from 'react'
import styled from 'styled-components'
import { removeImage, isSelected, addImage } from 'store/selectedImages'
const ShadowBox = styled.div`

position: relative;
z-index:0;

/* Fade in the pseudo-element with the bigger shadow */

cursor:pointer;
&:hover {
  -webkit-box-shadow: 2px 2px 30px -4px rgba(0,0,0,0.75);
-moz-box-shadow: 2px 2px 30px -4px rgba(0,0,0,0.75);
box-shadow: 2px 2px 30px -4px rgba(0,0,0,0.75);
    z-index:100
  }
  overflow:auto;
  
transition: all 0.3s ease-in-out;
`

const Overlay = styled.div`
  position:absolute;
  top:0;
  width:100%;
  height:100%;
  background-color:${({selected}) => selected ? 'rgba(157,199,149,0.6)' : 'rgba(0,0,0,0)'};

  ${({selected}) => selected ? 'border: 15px solid #9dc795' : 'border: 0px solid'}
  
  &:hover {
  transition: all 0.3s ease-in-out;
  }
  transition: all 0.3s ease-in-out;
  
`

class SelectableImage extends Component {
  state = {
    selected: false
  }


  componentDidMount() {
    const { id } = this.props;
    if(isSelected(id)) {
      this.setState({selected: true})
    }
  }

  handleClick = () => {
    const { id, userId, url } = this.props;
    const { selected } = this.state;
    if(selected){
      removeImage(id)
    } else {
      addImage(id, userId, url)
    }

    this.setState({selected:!selected})
  }

  render() {
    const { url, id} = this.props
    const { selected } = this.state

    return (
        <ShadowBox  width={[1,1/2,1/3, 1/4, 1/5]} onClick={this.handleClick}>
          <img height="auto" src={url} id={id}/>
          <Overlay selected={selected} id={id}/>
        </ShadowBox>
    )
  }
}

export default SelectableImage